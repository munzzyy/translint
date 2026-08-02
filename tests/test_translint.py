import contextlib
import io
import json
import os
import tempfile

import pytest

import translint


FIXTURES = os.path.join(os.path.dirname(__file__), "fixtures")


def run_cli(argv):
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        code = translint.main(argv)
    return code, buf.getvalue()


def run_cli_err(argv):
    out, err = io.StringIO(), io.StringIO()
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
        code = translint.main(argv)
    return code, out.getvalue(), err.getvalue()


# ---------------------------------------------------------------------------
# extract_placeholders: each style in isolation, plus the multiset and
# overlap edge cases that broke during development.
# ---------------------------------------------------------------------------


def test_brace_style():
    style, tokens = translint.extract_placeholders("Hello {name}, you have {count} items")
    assert style == "brace"
    assert tokens == ("{count}", "{name}")


def test_brace_style_numeric():
    # java.text.MessageFormat-style positional braces, common in .properties
    style, tokens = translint.extract_placeholders("Hello {0}, you have {1} items")
    assert style == "brace"
    assert tokens == ("{0}", "{1}")


def test_doublebrace_style():
    style, tokens = translint.extract_placeholders("Hi {{userName}}, welcome back")
    assert style == "doublebrace"
    assert tokens == ("{{userName}}",)


def test_doublebrace_does_not_also_register_as_brace():
    # the inner {name} half of {{name}} must not also count as a lone
    # {name}-style token - this is the first bug caught while building this
    style, tokens = translint.extract_placeholders("Hallo {{name}}, du hast {{count}} Elemente")
    assert style == "doublebrace"
    assert tokens == ("{{count}}", "{{name}}")


def test_printf_bare_style():
    style, tokens = translint.extract_placeholders("Hello %s, you have %d items")
    assert style == "printf"
    assert tokens == ("%d", "%s")


def test_printf_numbered_style():
    style, tokens = translint.extract_placeholders("%1$s uploaded %2$d files")
    assert style == "printf"
    assert tokens == ("%1$s", "%2$d")


def test_printf_numbered_does_not_also_register_as_dollar():
    # the "$s" / "$d" tail of a numbered printf token must not also count
    # as a bare $name template-literal placeholder - the second bug caught
    style, tokens = translint.extract_placeholders("%1$s uploaded %2$d files")
    assert "dollar" not in style


def test_pynamed_style():
    style, tokens = translint.extract_placeholders("Hello %(name)s, you have %(count)d items")
    assert style == "pynamed"
    assert tokens == ("%(count)d", "%(name)s")


def test_dollar_brace_style():
    style, tokens = translint.extract_placeholders("Order #${orderId} shipped to $city")
    assert style == "dollar"
    assert sorted(tokens) == sorted(("${orderId}", "$city"))


def test_dollar_brace_does_not_also_register_as_brace():
    # ${name}'s {name}-shaped inner substring must not also count as a
    # lone {name} brace token - the third bug caught while building this
    style, tokens = translint.extract_placeholders("Hello ${name}, you have $count items")
    assert style == "dollar"
    assert tokens == ("$count", "${name}")


def test_no_placeholders():
    style, tokens = translint.extract_placeholders("No placeholders at all here")
    assert style == "none"
    assert tokens == ()


def test_dollar_amount_is_not_a_placeholder():
    # "$5" is money, not a $name template token - a plain price string must
    # not register any placeholder at all, or every currency reorder in a
    # translation ("5 $" in French/German typography) hard-fails CI
    style, tokens = translint.extract_placeholders("Costs $5")
    assert style == "none"
    assert tokens == ()


def test_dollar_name_with_trailing_digits_still_detected():
    # narrowing $-detection to a letter/underscore start must not lose real
    # identifiers that merely contain digits
    style, tokens = translint.extract_placeholders("Hi $user2, see ${step3}")
    assert style == "dollar"
    assert tokens == ("$user2", "${step3}")


def test_currency_reorder_is_not_a_mismatch():
    base = {"price": "Costs $5"}
    loc = {"price": "Coûte 5 $"}
    r = translint.check_locale(base, loc, "fr", "fr.json", "json")
    assert r["placeholder_mismatches"] == []


def test_printf_width_precision_and_flag_forms():
    # %.2f / %5d / %-10s are the printf forms that actually show up in real
    # catalogs - dropping one in a translation is exactly the crash class
    # translint exists to catch, so they must be extracted, not invisible
    style, tokens = translint.extract_placeholders("Total: %.2f (%5d items, %-10s)")
    assert style == "printf"
    assert tokens == ("%-10s", "%.2f", "%5d")


def test_printf_numbered_width_precision_forms():
    style, tokens = translint.extract_placeholders("%1$-10s owes %2$.2f")
    assert style == "printf"
    assert tokens == ("%1$-10s", "%2$.2f")


@pytest.mark.parametrize("value", [
    "20%off",
    "50%discount",
    "100%",
    "Save 20%off today",
    "20% off",
    "Up to 70%savings",
])
def test_percent_sign_in_prose_is_not_a_printf_placeholder(value):
    # A discount string is the common case here, and a placeholder mismatch
    # is a hard failure with no allowlist, so reading "20%off" as a "%o"
    # octal conversion fails CI on a perfectly good string.
    assert translint.extract_placeholders(value) == ("none", ())


@pytest.mark.parametrize("value,tokens", [
    ("%s items", ("%s",)),
    ("Got %d of %d", ("%d", "%d")),
    ("%.2f", ("%.2f",)),
    ("%-10s", ("%-10s",)),
    ("%05d", ("%05d",)),
    ("%1$s %2$d", ("%1$s", "%2$d")),
    ("%lu bytes", ("%lu",)),
    # A digit in front only disqualifies the bare form. Anything carrying a
    # flag, width, precision, length modifier or argument number is a real
    # placeholder wherever it sits.
    ("50%2$s", ("%2$s",)),
    ("50%-10s", ("%-10s",)),
    ("50%.2f", ("%.2f",)),
])
def test_real_printf_placeholders_still_extract(value, tokens):
    style, found = translint.extract_placeholders(value)
    assert style == "printf"
    assert found == tokens


def test_percent_prose_agrees_between_placeholder_and_untranslated_engines():
    # The two regexes used to be separate copies and drifted. If the strip
    # pass still eats "%o" out of "20%off", a German "20%Rabatt" strips to
    # "ff" vs "Rabatt" while the placeholder engine sees no token at all.
    base = {"promo": "20%off"}
    loc = {"promo": "20%Rabatt"}
    r = translint.check_locale(base, loc, "de", "de.json", "json")
    assert r["placeholder_mismatches"] == []
    assert translint._strip_for_untranslated_check("20%off", []) == "off"


def test_printf_dropped_precision_token_is_a_mismatch():
    base = {"total": "Total: %.2f"}
    loc = {"total": "Insgesamt:"}
    r = translint.check_locale(base, loc, "de", "de.json", "json")
    assert r["placeholder_mismatches"] == [
        {"key": "total", "base": ["%.2f"], "locale": []}
    ]


def test_printf_numbered_reorder_of_bare_base_is_not_a_mismatch():
    # gettext explicitly blesses this: a bare-form msgid reordered with
    # numbered arguments in the msgstr. msgfmt -c accepts it; so must we.
    base = {"k": "%s received %d files"}
    loc = {"k": "%2$d archivos recibió %1$s"}
    r = translint.check_locale(base, loc, "es", "es.po", "po")
    assert r["placeholder_mismatches"] == []


def test_printf_numbered_reorder_with_wrong_conversions_still_flags():
    # the bare/numbered equivalence is by conversion-char multiset - a
    # numbered set with different conversions is still a real mismatch
    base = {"k": "%s uploaded %d files"}
    loc = {"k": "%1$s subió %2$s archivos"}
    r = translint.check_locale(base, loc, "es", "es.po", "po")
    assert len(r["placeholder_mismatches"]) == 1


def test_printf_numbered_reorder_with_missing_token_still_flags():
    base = {"k": "%s has %s"}
    loc = {"k": "%1$s"}
    r = translint.check_locale(base, loc, "es", "es.po", "po")
    assert len(r["placeholder_mismatches"]) == 1


def test_bare_printf_reorder_with_type_change_is_a_mismatch():
    # base uses %s then %d; the translation swaps the order without also
    # swapping which value goes where - same multiset ({%s, %d}) so the
    # sorted-tuple comparison alone sees no mismatch, but base's (name, age)
    # tuple applied to the reordered string is a real TypeError at runtime,
    # unlike a numbered reorder (%2$d ... %1$s), which is explicitly safe
    base = {"k": "Hi %s, you are %d years old"}
    loc = {"k": "Tem %d anos, %s"}
    r = translint.check_locale(base, loc, "pt", "pt.po", "po")
    assert len(r["placeholder_mismatches"]) == 1


def test_bare_printf_same_order_is_not_a_mismatch():
    # the safe counterpart to the reorder case above - identical bare
    # conversions in the same order must stay clean
    base = {"k": "Hi %s, you are %d years old"}
    loc = {"k": "Olá %s, você tem %d anos"}
    r = translint.check_locale(base, loc, "pt", "pt.po", "po")
    assert r["placeholder_mismatches"] == []


def test_placeholder_multiset_order_independent():
    # {a}{b} and {b}{a} use the same placeholders, order shouldn't matter
    a = translint.extract_placeholders("{a} then {b}")[1]
    b = translint.extract_placeholders("{b} then {a}")[1]
    assert sorted(a) == sorted(b)


def test_placeholder_multiset_counts_repeats():
    # %s used twice is two tokens, not one - a real repeat-count mismatch
    # (base uses %s once, translation uses it twice) must be visible
    _, tokens = translint.extract_placeholders("%s and %s again")
    assert tokens == ("%s", "%s")


def test_placeholder_count_mismatch_is_a_mismatch():
    base = {"k": "You have {count} item"}
    loc = {"k": "Tienes un elemento"}
    r = translint.check_locale(base, loc, "es", "es.json", "json")
    assert r["placeholder_mismatches"] == [{"key": "k", "base": ["{count}"], "locale": []}]


# ---------------------------------------------------------------------------
# Format parsers
# ---------------------------------------------------------------------------


def test_flatten_json_nests_with_dots():
    nested = {"app": {"title": "Hi", "nav": {"home": "Home"}}}
    flat = translint.flatten_json(nested)
    assert flat == {"app.title": "Hi", "app.nav.home": "Home"}


def test_flatten_json_flat_input_is_unchanged():
    flat_in = {"already.flat": "value", "other": "thing"}
    assert translint.flatten_json(flat_in) == flat_in


def test_parse_properties_handles_comments_and_separators():
    text = (
        "# a comment\n"
        "! also a comment\n"
        "app.title=Hello World\n"
        "app.greeting: Hi there\n"
    )
    result = translint.parse_properties(text, "x.properties")
    assert result == {"app.title": "Hello World", "app.greeting": "Hi there"}


def test_parse_properties_accepts_whitespace_only_separator():
    # java.util.Properties.load() allows a bare-whitespace separator with
    # no = or : at all - "key value" is just as valid as "key=value" and
    # must not be silently dropped
    text = "greeting Hello there\nfarewell=Goodbye\n"
    result = translint.parse_properties(text, "x.properties")
    assert result == {"greeting": "Hello there", "farewell": "Goodbye"}


def test_parse_properties_whitespace_separator_does_not_affect_equals_values():
    # a value with internal spaces after a real = separator must still be
    # taken whole - the new bare-whitespace branch must not eat into it
    text = "app.title=Hello there World\n"
    result = translint.parse_properties(text, "x.properties")
    assert result["app.title"] == "Hello there World"


def test_parse_properties_handles_line_continuation():
    text = "app.multi=line one \\\n    continues here\n"
    result = translint.parse_properties(text, "x.properties")
    assert result["app.multi"] == "line one continues here"


def test_parse_properties_continues_on_odd_trailing_backslashes():
    # three trailing backslashes = one escaped backslash + the continuation marker
    text = "app.multi=one\\\\\\\n    two\n"
    result = translint.parse_properties(text, "x.properties")
    assert result["app.multi"] == "one\\two"


def test_parse_properties_stops_on_even_trailing_backslashes():
    text = "app.solo=ends with backslash\\\\\napp.next=other\n"
    result = translint.parse_properties(text, "x.properties")
    assert result["app.solo"] == "ends with backslash\\"
    assert result["app.next"] == "other"


def test_parse_properties_handles_escaped_separator_in_key():
    text = r"app.colon\:escaped=value with = inside" + "\n"
    result = translint.parse_properties(text, "x.properties")
    assert result["app.colon:escaped"] == "value with = inside"


def test_parse_properties_decodes_unicode_escapes():
    # native2ascii-era files are still everywhere: é must come back as
    # the actual character, not the literal string "u00e9"
    text = "app.greeting=caf\\u00e9 \\u00C9l\\u00e9gant\n"
    result = translint.parse_properties(text, "x.properties")
    assert result["app.greeting"] == "café Élégant"


def test_parse_properties_decodes_unicode_escapes_in_keys():
    text = "caf\\u00e9.label=value\n"
    result = translint.parse_properties(text, "x.properties")
    assert result == {"café.label": "value"}


def test_parse_properties_decodes_whitespace_escapes():
    # java.util.Properties turns \t \n \r \f into the real characters
    text = "app.multi=line one\\nline two\\tend\n"
    result = translint.parse_properties(text, "x.properties")
    assert result["app.multi"] == "line one\nline two\tend"


def test_parse_properties_invalid_unicode_escape_degrades_quietly():
    # a malformed \uZZZZ shouldn't crash the parse; the backslash drops and
    # the rest stays, same as any other unknown escape
    text = "app.bad=\\uZZZZ\n"
    result = translint.parse_properties(text, "x.properties")
    assert result["app.bad"] == "uZZZZ"


def test_parse_po_basic_pairs():
    text = (
        'msgid ""\n'
        'msgstr ""\n'
        '"Content-Type: text/plain; charset=UTF-8\\n"\n'
        "\n"
        'msgid "app.title"\n'
        'msgstr "Hello World"\n'
    )
    result = translint.parse_po(text, "x.po")
    assert result == {"app.title": "Hello World"}


def test_parse_po_skips_header_block():
    text = 'msgid ""\nmsgstr ""\n"Content-Type: text/plain\\n"\n'
    result = translint.parse_po(text, "x.po")
    assert result == {}


def test_parse_po_concatenates_multiline_strings():
    text = (
        'msgid "app.multiline"\n'
        'msgstr ""\n'
        '"first part "\n'
        '"second part"\n'
    )
    result = translint.parse_po(text, "x.po")
    assert result["app.multiline"] == "first part second part"


def test_parse_po_plural_uses_msgstr_zero():
    text = (
        'msgid "app.plural"\n'
        'msgid_plural "app.plurals"\n'
        'msgstr[0] "one item"\n'
        'msgstr[1] "%(count)d items"\n'
    )
    result = translint.parse_po(text, "x.po")
    assert result == {"app.plural": "one item"}


def test_parse_po_msgctxt_disambiguates_same_msgid():
    # "Close" the verb and "Close" the adjective need different French
    # translations - without msgctxt in the key, the second entry silently
    # overwrites the first and "Fermer" vanishes from every check
    text = (
        'msgctxt "verb"\n'
        'msgid "Close"\n'
        'msgstr "Fermer"\n'
        "\n"
        'msgctxt "adjective"\n'
        'msgid "Close"\n'
        'msgstr "Proche"\n'
    )
    result = translint.parse_po(text, "x.po")
    assert result == {("verb", "Close"): "Fermer", ("adjective", "Close"): "Proche"}


def test_parse_po_without_msgctxt_still_keys_by_bare_msgid():
    # the overwhelmingly common case - no msgctxt anywhere - must keep
    # working exactly as before, plain string keys and all
    text = 'msgid "app.title"\nmsgstr "Hello World"\n'
    result = translint.parse_po(text, "x.po")
    assert result == {"app.title": "Hello World"}


def test_check_locale_handles_mixed_msgctxt_and_plain_keys():
    # real .po files mix untouched entries (bare msgid key) with the rare
    # msgctxt-disambiguated pair - check_locale's key sorting has to
    # tolerate str and tuple keys together, not just an all-one-shape dict
    base = {"plain": "Hello", ("verb", "Close"): "Close", ("adjective", "Close"): "Closed"}
    loc = {"plain": "Bonjour", ("verb", "Close"): "Fermer", ("adjective", "Close"): "Proche"}
    r = translint.check_locale(base, loc, "fr", "fr.po", "po")
    assert r["ok"] is True
    assert r["missing_keys"] == []


def test_parse_po_skips_obsolete_entries():
    text = '#~ msgid "app.gone"\n#~ msgstr "no longer used"\n'
    result = translint.parse_po(text, "x.po")
    assert result == {}


def test_parse_po_skips_fuzzy_entries():
    # msgfmt doesn't compile fuzzy entries, so they aren't live translations
    # and must not be linted as if they were - the docstring has promised
    # this all along
    text = (
        '#, fuzzy\n'
        'msgid "app.title"\n'
        'msgstr "old draft translation"\n'
        "\n"
        'msgid "app.kept"\n'
        'msgstr "live translation"\n'
    )
    result = translint.parse_po(text, "x.po")
    assert result == {"app.kept": "live translation"}


def test_parse_po_fuzzy_skip_needs_the_flag_not_the_word():
    # "#," is the flag comment; "fuzzy" inside a translator comment or a
    # different flag list must not hide a live entry
    text = (
        '# this one felt fuzzy to write\n'
        '#, c-format\n'
        'msgid "app.title"\n'
        'msgstr "Hello"\n'
    )
    result = translint.parse_po(text, "x.po")
    assert result == {"app.title": "Hello"}


def test_parse_po_fuzzy_flag_among_other_flags():
    text = '#, c-format, fuzzy\nmsgid "app.title"\nmsgstr "draft"\n'
    result = translint.parse_po(text, "x.po")
    assert result == {}


def test_parse_json_rejects_non_object_top_level():
    try:
        translint.parse_json("[1, 2, 3]", "x.json")
        assert False, "expected ValueError"
    except ValueError as exc:
        assert "top level must be a JSON object" in str(exc)


def test_parse_json_rejects_invalid_json():
    try:
        translint.parse_json("not json", "x.json")
        assert False, "expected ValueError"
    except ValueError as exc:
        assert "invalid JSON" in str(exc)


# ---------------------------------------------------------------------------
# check_locale: each issue type, plus the allowlist/heuristic-guard behavior
# ---------------------------------------------------------------------------


def test_missing_keys():
    base = {"a": "Hello", "b": "World"}
    loc = {"a": "Bonjour"}
    r = translint.check_locale(base, loc, "fr", "fr.json", "json")
    assert r["missing_keys"] == ["b"]
    assert r["ok"] is False


def test_extra_keys():
    base = {"a": "Hello world"}
    loc = {"a": "Hello world translated", "stale": "leftover"}
    r = translint.check_locale(base, loc, "de", "de.json", "json")
    assert r["extra_keys"] == ["stale"]


def test_empty_value_flagged_and_excluded_from_untranslated():
    base = {"a": "This has real content"}
    loc = {"a": ""}
    r = translint.check_locale(base, loc, "de", "de.json", "json")
    assert r["empty_values"] == ["a"]
    assert r["untranslated_values"] == []


def test_untranslated_heuristic_flags_identical_prose():
    base = {"a": "Welcome to the app"}
    loc = {"a": "Welcome to the app"}
    r = translint.check_locale(base, loc, "de", "de.json", "json")
    assert r["untranslated_values"] == ["a"]


def test_untranslated_heuristic_guard_skips_short_content():
    # values that strip down to under 3 letters of real prose (a bare unit
    # symbol, a lone number) legitimately match across every locale and
    # must not be flagged - mirrors liftmath's ">=3 letters" guard
    base = {"unit": "kg"}
    loc = {"unit": "kg"}
    r = translint.check_locale(base, loc, "de", "de.json", "json")
    assert r["untranslated_values"] == []


def test_untranslated_heuristic_respects_do_not_translate_tokens():
    base = {"tagline": "MyApp keeps your data safe"}
    loc = {"tagline": "MyApp halten Ihre Daten sicher"}
    r = translint.check_locale(base, loc, "de", "de.json", "json",
                                do_not_translate=["MyApp"])
    assert r["untranslated_values"] == []


def test_untranslated_heuristic_allowlist_suppresses_true_positive():
    base = {"brand": "Acme"}
    loc = {"brand": "Acme"}
    without = translint.check_locale(base, loc, "de", "de.json", "json")
    assert without["untranslated_values"] == ["brand"]
    with_allow = translint.check_locale(base, loc, "de", "de.json", "json",
                                         allow_identical=["brand"])
    assert with_allow["untranslated_values"] == []


def test_clean_locale_is_ok():
    base = {"a": "Hello {name}", "b": "World"}
    loc = {"a": "Bonjour {name}", "b": "Monde"}
    r = translint.check_locale(base, loc, "fr", "fr.json", "json")
    assert r["ok"] is True
    assert not any([r["missing_keys"], r["extra_keys"], r["placeholder_mismatches"],
                    r["empty_values"], r["untranslated_values"]])


def test_json_schema_keys_are_stable():
    r = translint.check_locale({"a": "Hello"}, {"a": "Bonjour"}, "fr", "fr.json", "json")
    assert set(r.keys()) == translint.JSON_SCHEMA_KEYS


# ---------------------------------------------------------------------------
# is_failing: hard vs strict-only issues
# ---------------------------------------------------------------------------


def test_is_failing_missing_key_always_fails():
    r = translint.check_locale({"a": "Hi"}, {}, "fr", "fr.json", "json")
    assert translint.is_failing(r, strict=False) is True
    assert translint.is_failing(r, strict=True) is True


def test_is_failing_extra_key_only_fails_strict():
    r = translint.check_locale({"a": "Hi there"}, {"a": "Hi there translated", "b": "stale"},
                                "fr", "fr.json", "json")
    assert translint.is_failing(r, strict=False) is False
    assert translint.is_failing(r, strict=True) is True


def test_is_failing_untranslated_only_fails_strict():
    r = translint.check_locale({"a": "Hello there friend"}, {"a": "Hello there friend"},
                                "fr", "fr.json", "json")
    assert translint.is_failing(r, strict=False) is False
    assert translint.is_failing(r, strict=True) is True


def test_is_failing_placeholder_mismatch_always_fails():
    r = translint.check_locale({"a": "Hi {name}"}, {"a": "Hi"}, "fr", "fr.json", "json")
    assert translint.is_failing(r, strict=False) is True
    assert translint.is_failing(r, strict=True) is True


def test_is_failing_clean_locale_never_fails():
    r = translint.check_locale({"a": "Hello"}, {"a": "Bonjour"}, "fr", "fr.json", "json")
    assert translint.is_failing(r, strict=False) is False
    assert translint.is_failing(r, strict=True) is False


# ---------------------------------------------------------------------------
# Fixture directories: full pipeline through the CLI, one per format
# ---------------------------------------------------------------------------


def test_json_fixtures_pin_every_issue_type():
    code, out = run_cli([os.path.join(FIXTURES, "json"), "--base", "en", "--json"])
    assert code == 1
    results = {r["locale"]: r for r in json.loads(out)}

    fr = results["fr"]
    assert fr["missing_keys"] == ["nav.settings"]
    assert fr["extra_keys"] == ["nav.legacyStale"]
    assert fr["placeholder_mismatches"] == [
        {"key": "app.greeting", "base": ["{count}", "{name}"], "locale": ["{name}", "{total}"]}
    ]
    assert fr["empty_values"] == ["errors.generic"]
    assert fr["untranslated_values"] == ["app.brand"]

    de = results["de"]
    assert de["missing_keys"] == []
    assert de["extra_keys"] == []
    assert de["placeholder_mismatches"] == []
    assert de["empty_values"] == []
    assert sorted(de["untranslated_values"]) == ["app.brand", "app.title"]


def test_json_fixtures_de_only_fails_under_strict():
    # de.json has zero hard issues, only two untranslated-heuristic hits -
    # isolate it by running just en+de so fr's hard issues can't also
    # explain a non-zero exit code
    d = os.path.join(FIXTURES, "json")
    code_lax, _ = run_cli([os.path.join(d, "en.json"), os.path.join(d, "de.json"),
                            "--base", "en"])
    code_strict, _ = run_cli([os.path.join(d, "en.json"), os.path.join(d, "de.json"),
                               "--base", "en", "--strict"])
    assert code_lax == 0
    assert code_strict == 1


def test_po_fixtures_pin_every_issue_type():
    code, out = run_cli([os.path.join(FIXTURES, "po"), "--base", "en", "--json"])
    assert code == 1
    results = {r["locale"]: r for r in json.loads(out)}
    es = results["es"]
    assert es["missing_keys"] == ["nav.settings"]
    assert es["extra_keys"] == ["nav.oldMenuKey"]
    assert es["placeholder_mismatches"] == [
        {"key": "app.greeting", "base": ["%d", "%s"], "locale": ["%s", "%s"]}
    ]
    assert es["empty_values"] == ["errors.generic"]
    assert es["untranslated_values"] == ["app.brand"]
    assert all(r["format"] == "po" for r in results.values())


def test_properties_fixtures_pin_every_issue_type():
    code, out = run_cli([os.path.join(FIXTURES, "properties"), "--base", "en", "--json"])
    assert code == 1
    results = {r["locale"]: r for r in json.loads(out)}
    ja = results["ja"]
    assert ja["missing_keys"] == ["nav.settings"]
    assert ja["extra_keys"] == ["nav.staleKey"]
    assert ja["placeholder_mismatches"] == [
        {"key": "app.greeting", "base": ["{0}", "{1}"], "locale": ["{0}", "{2}"]}
    ]
    assert ja["empty_values"] == ["errors.generic"]
    assert sorted(ja["untranslated_values"]) == ["app.brand", "errors.notFound"]
    assert all(r["format"] == "properties" for r in results.values())


def test_nested_fixtures_cover_doublebrace_dollar_and_pynamed():
    code, out = run_cli([os.path.join(FIXTURES, "nested"), "--base", "en", "--json"])
    assert code == 1
    results = {r["locale"]: r for r in json.loads(out)}
    de = results["de"]
    mismatched_keys = {m["key"] for m in de["placeholder_mismatches"]}
    assert mismatched_keys == {"welcome.handlebars", "pynamed.summary"}
    assert de["untranslated_values"] == ["brand.wordmark"]


def test_nested_fixtures_allow_identical_suppresses_brand_hit():
    code, out = run_cli([os.path.join(FIXTURES, "nested"), "--base", "en",
                          "--allow-identical", "brand.wordmark", "--json"])
    assert code == 1  # placeholder mismatches still present
    results = {r["locale"]: r for r in json.loads(out)}
    assert results["de"]["untranslated_values"] == []


# ---------------------------------------------------------------------------
# CLI plumbing
# ---------------------------------------------------------------------------


def test_cli_happy_path_clean_locale_exits_zero():
    d = os.path.join(FIXTURES, "cli")
    code, out = run_cli([os.path.join(d, "en.json"), os.path.join(d, "clean.json"), "--base", "en"])
    assert code == 0
    assert "clean" in out.lower()


def test_cli_json_output_is_a_list_for_multiple_locales():
    d = os.path.join(FIXTURES, "cli")
    code, out = run_cli([d, "--base", "en", "--json"])
    data = json.loads(out)
    assert isinstance(data, list)
    assert {r["locale"] for r in data} == {"clean", "extra_only"}


def test_cli_strict_flag_fails_on_extra_keys_only():
    d = os.path.join(FIXTURES, "cli")
    code_default, _ = run_cli([os.path.join(d, "en.json"), os.path.join(d, "extra_only.json"),
                                "--base", "en"])
    code_strict, _ = run_cli([os.path.join(d, "en.json"), os.path.join(d, "extra_only.json"),
                               "--base", "en", "--strict"])
    assert code_default == 0
    assert code_strict == 1


def test_cli_directory_scan_finds_all_locale_files():
    d = os.path.join(FIXTURES, "cli")
    code, out = run_cli([d, "--base", "en", "--json"])
    data = json.loads(out)
    assert len(data) == 2  # clean.json and extra_only.json, base excluded


def test_cli_missing_base_errors_cleanly():
    d = os.path.join(FIXTURES, "cli")
    code, out, err = run_cli_err([d, "--base", "nonexistent-locale"])
    assert code == 2
    assert out == ""
    assert "nonexistent-locale" in err


def test_cli_only_base_present_errors_cleanly():
    with tempfile.TemporaryDirectory() as d:
        with open(os.path.join(d, "en.json"), "w", encoding="utf-8") as fh:
            json.dump({"a": "Hello"}, fh)
        code, out, err = run_cli_err([d, "--base", "en"])
        assert code == 2
        assert "nothing to check" in err


def test_cli_no_locale_files_found_errors_cleanly():
    with tempfile.TemporaryDirectory() as d:
        code, out, err = run_cli_err([d, "--base", "en"])
        assert code == 2
        assert "no locale files found" in err


def test_cli_unrecognized_extension_errors_cleanly():
    with tempfile.TemporaryDirectory() as d:
        p = os.path.join(d, "en.yaml")
        with open(p, "w", encoding="utf-8") as fh:
            fh.write("a: Hello\n")
        code, out, err = run_cli_err([p, "--base", "en"])
        assert code == 2
        assert "can't detect format" in err


def test_cli_format_flag_forces_parser():
    with tempfile.TemporaryDirectory() as d:
        base_path = os.path.join(d, "en.txt")
        loc_path = os.path.join(d, "de.txt")
        with open(base_path, "w", encoding="utf-8") as fh:
            json.dump({"a": "Hello"}, fh)
        with open(loc_path, "w", encoding="utf-8") as fh:
            json.dump({"a": "Bonjour"}, fh)
        code, out = run_cli([base_path, loc_path, "--base", "en", "--format", "json"])
        assert code == 0


def test_cli_quiet_flag_reports_which_locales_have_issues():
    d = os.path.join(FIXTURES, "cli")
    code, out = run_cli([os.path.join(d, "en.json"), os.path.join(d, "extra_only.json"),
                          "--base", "en", "--quiet", "--strict"])
    assert code == 1
    assert "extra_only" in out


def test_cli_invalid_json_locale_errors_cleanly():
    with tempfile.TemporaryDirectory() as d:
        with open(os.path.join(d, "en.json"), "w", encoding="utf-8") as fh:
            json.dump({"a": "Hello"}, fh)
        with open(os.path.join(d, "de.json"), "w", encoding="utf-8") as fh:
            fh.write("{not valid json")
        code, out, err = run_cli_err([d, "--base", "en"])
        assert code == 2
        assert "invalid JSON" in err


def test_cli_glob_argument_is_expanded():
    # PowerShell/cmd.exe don't expand wildcards before argv reaches us
    d = os.path.join(FIXTURES, "cli")
    code, out = run_cli([os.path.join(d, "*.json"), "--base", "en", "--json"])
    data = json.loads(out)
    assert {r["locale"] for r in data} == {"clean", "extra_only"}


def test_cli_glob_matching_nothing_errors_cleanly():
    with tempfile.TemporaryDirectory() as d:
        code, out, err = run_cli_err([os.path.join(d, "*.json"), "--base", "en"])
        assert code == 2
        assert "no files match" in err


def test_cli_allow_identical_flag_is_repeatable():
    with tempfile.TemporaryDirectory() as d:
        with open(os.path.join(d, "en.json"), "w", encoding="utf-8") as fh:
            json.dump({"a": "Brand One", "b": "Brand Two"}, fh)
        with open(os.path.join(d, "de.json"), "w", encoding="utf-8") as fh:
            json.dump({"a": "Brand One", "b": "Brand Two"}, fh)
        code, out = run_cli([d, "--base", "en", "--strict",
                              "--allow-identical", "a", "--allow-identical", "b"])
        assert code == 0


def test_cli_config_file_supplies_allow_identical_and_do_not_translate():
    with tempfile.TemporaryDirectory() as d:
        with open(os.path.join(d, ".translintrc.json"), "w", encoding="utf-8") as fh:
            json.dump({"allow_identical": ["brand"], "do_not_translate": ["Acme"]}, fh)
        with open(os.path.join(d, "en.json"), "w", encoding="utf-8") as fh:
            json.dump({"brand": "Acme", "tagline": "Acme delivers results fast"}, fh)
        with open(os.path.join(d, "de.json"), "w", encoding="utf-8") as fh:
            json.dump({"brand": "Acme", "tagline": "Acme liefert schnell Ergebnisse"}, fh)
        code, out = run_cli([d, "--base", "en", "--strict"])
        assert code == 0


def test_cli_explicit_config_path_missing_errors_cleanly():
    with tempfile.TemporaryDirectory() as d:
        with open(os.path.join(d, "en.json"), "w", encoding="utf-8") as fh:
            json.dump({"a": "Hello"}, fh)
        code, out, err = run_cli_err([d, "--base", "en", "--config",
                                       os.path.join(d, "nope.json")])
        assert code == 2


def test_cli_version_flag():
    # argparse's built-in "version" action prints and calls sys.exit(0)
    # directly rather than returning, so it has to be caught, not read
    # off main()'s return value like every other flag here
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        with pytest.raises(SystemExit) as exc_info:
            translint.main(["--version"])
    assert exc_info.value.code == 0
    assert "translint" in buf.getvalue()


def test_importable_api_returns_structured_result_without_cli():
    # the whole point of check_locale() being separate from main(): any
    # importer (an agent skill, another script) can call it directly
    base = {"greeting": "Hello {name}"}
    locale = {"greeting": "Bonjour {name}"}
    r = translint.check_locale(base, locale, "fr", "fr.json", "json")
    assert r["ok"] is True
    assert isinstance(r, dict)


# ---------------------------------------------------------------------------
# --fix: insertion functions in isolation, each format
# ---------------------------------------------------------------------------


def test_fix_json_inserts_missing_key_with_marker():
    text = '{\n  "a": "Hello"\n}\n'
    base = {"a": "Hello", "b": "World"}
    new_text = translint.fix_missing_keys_json(text, ["b"], base)
    assert new_text == '{\n  "a": "Hello",\n  "b": "[UNTRANSLATED] World"\n}\n'
    assert translint.parse_json(new_text, "x.json") == {
        "a": "Hello", "b": "[UNTRANSLATED] World",
    }


def test_fix_json_only_appends_every_original_line_stays_verbatim():
    # every existing line is untouched, except the one line that was
    # previously last and needs a trailing comma now that a sibling
    # follows it - that's the one mechanically-necessary edit valid JSON
    # requires, not a rewrite of its content
    text = '{\n  "a": "Bonjour",\n  "c": "Hello {name}"\n}\n'
    base = {"a": "Hello", "b": "World", "c": "Hello {name}"}
    new_text = translint.fix_missing_keys_json(text, ["b"], base)
    old_lines, new_lines = text.splitlines(), new_text.splitlines()
    assert new_lines[:2] == old_lines[:2]  # "{" and the untouched "a" line
    assert new_lines[2] == old_lines[2] + ","  # "c" line, comma appended
    assert new_lines[-1] == old_lines[-1]  # closing "}"


def test_fix_json_nested_key_lands_inside_the_matching_object():
    # a literal top-level "nav.settings" member is invisible to i18next,
    # vue-i18n and every other runtime that walks the nested object for
    # t("nav.settings"), so a nested file has to get a nested member
    text = '{\n  "nav": {\n    "home": "Home"\n  }\n}\n'
    base = {"nav.home": "Home", "nav.settings": "Settings"}
    new_text = translint.fix_missing_keys_json(text, ["nav.settings"], base)
    data = json.loads(new_text)
    assert "nav.settings" not in data
    assert data["nav"]["settings"] == "[UNTRANSLATED] Settings"
    assert translint.parse_json(new_text, "x.json") == {
        "nav.home": "Home", "nav.settings": "[UNTRANSLATED] Settings",
    }


def test_fix_json_nested_insert_leaves_every_other_line_verbatim():
    text = '{\n  "nav": {\n    "home": "Home"\n  },\n  "title": "Shop"\n}\n'
    base = {"nav.home": "Home", "nav.settings": "Settings", "title": "Shop"}
    new_text = translint.fix_missing_keys_json(text, ["nav.settings"], base)
    assert new_text == (
        '{\n'
        '  "nav": {\n'
        '    "home": "Home",\n'
        '    "settings": "[UNTRANSLATED] Settings"\n'
        '  },\n'
        '  "title": "Shop"\n'
        '}\n'
    )


def test_fix_json_creates_intermediate_objects_for_a_missing_branch():
    text = '{\n  "nav": {\n    "home": "Home"\n  }\n}\n'
    base = {"nav.home": "Home", "nav.menu.file.open": "Open"}
    new_text = translint.fix_missing_keys_json(text, ["nav.menu.file.open"], base)
    data = json.loads(new_text)
    assert data["nav"]["menu"]["file"]["open"] == "[UNTRANSLATED] Open"


def test_fix_json_two_keys_under_one_new_parent_share_that_object():
    text = '{\n  "nav": {\n    "home": "Home"\n  }\n}\n'
    base = {"nav.home": "Home", "nav.menu.new": "New", "nav.menu.open": "Open"}
    new_text = translint.fix_missing_keys_json(
        text, ["nav.menu.new", "nav.menu.open"], base
    )
    data = json.loads(new_text)
    assert data["nav"]["menu"] == {
        "new": "[UNTRANSLATED] New", "open": "[UNTRANSLATED] Open",
    }


def test_fix_json_keys_for_several_objects_in_one_pass():
    text = ('{\n  "nav": {\n    "home": "Home"\n  },\n'
            '  "checkout": {\n    "pay": "Pay"\n  }\n}\n')
    base = {"nav.home": "Home", "nav.settings": "Settings",
            "checkout.pay": "Pay", "checkout.done": "Done"}
    new_text = translint.fix_missing_keys_json(
        text, ["checkout.done", "nav.settings"], base
    )
    data = json.loads(new_text)
    assert data["nav"]["settings"] == "[UNTRANSLATED] Settings"
    assert data["checkout"]["done"] == "[UNTRANSLATED] Done"
    assert data["nav"]["home"] == "Home" and data["checkout"]["pay"] == "Pay"


def test_fix_json_flat_file_keeps_getting_flat_keys():
    text = '{\n  "nav.home": "Startseite"\n}\n'
    base = {"nav.home": "Home", "nav.settings": "Settings"}
    new_text = translint.fix_missing_keys_json(text, ["nav.settings"], base)
    data = json.loads(new_text)
    assert data == {"nav.home": "Startseite", "nav.settings": "[UNTRANSLATED] Settings"}


def test_fix_json_shapeless_file_follows_the_base_shape():
    # an empty locale file has no shape to read, so the base decides -
    # otherwise a brand new de.json next to a nested en.json gets flat keys
    # the app can't resolve
    base = {"nav.settings": "Settings"}
    nested = translint.fix_missing_keys_json(
        "{}\n", ["nav.settings"], base, base_nested=True
    )
    assert json.loads(nested) == {"nav": {"settings": "[UNTRANSLATED] Settings"}}
    flat = translint.fix_missing_keys_json(
        "{}\n", ["nav.settings"], base, base_nested=False
    )
    assert json.loads(flat) == {"nav.settings": "[UNTRANSLATED] Settings"}


def test_fix_json_multiple_missing_keys_in_one_pass():
    text = '{\n  "a": "Hello"\n}\n'
    base = {"a": "Hello", "b": "World", "c": "Foo"}
    new_text = translint.fix_missing_keys_json(text, ["b", "c"], base)
    assert translint.parse_json(new_text, "x.json") == {
        "a": "Hello",
        "b": "[UNTRANSLATED] World",
        "c": "[UNTRANSLATED] Foo",
    }


def test_fix_json_empty_object():
    new_text = translint.fix_missing_keys_json("{}\n", ["a"], {"a": "Hello"})
    assert translint.parse_json(new_text, "x.json") == {"a": "[UNTRANSLATED] Hello"}


def test_fix_json_empty_base_value_marker_has_no_dangling_space():
    new_text = translint.fix_missing_keys_json("{}\n", ["a"], {"a": ""})
    assert translint.parse_json(new_text, "x.json") == {"a": "[UNTRANSLATED]"}


def test_fix_properties_appends_missing_key_with_marker():
    text = "app.title=Hello\n"
    base = {"app.title": "Hello", "app.greeting": "Hi there"}
    new_text = translint.fix_missing_keys_properties(text, ["app.greeting"], base)
    assert new_text == "app.title=Hello\napp.greeting=[UNTRANSLATED] Hi there\n"
    assert translint.parse_properties(new_text, "x.properties") == {
        "app.title": "Hello", "app.greeting": "[UNTRANSLATED] Hi there",
    }


def test_fix_properties_only_appends_existing_line_untouched():
    text = "app.title=Bonjour\n"
    base = {"app.title": "Hello", "app.greeting": "Hi there"}
    new_text = translint.fix_missing_keys_properties(text, ["app.greeting"], base)
    assert new_text.startswith("app.title=Bonjour\n")


def test_fix_properties_escapes_backslash_and_control_chars_in_inserted_value():
    # a base value with a literal backslash and newline must round-trip
    # back to the exact same string through parse_properties/_properties_unescape
    text = "a=Hello\n"
    base = {"a": "Hello", "b": "Line one\nLine two \\ end"}
    new_text = translint.fix_missing_keys_properties(text, ["b"], base)
    result = translint.parse_properties(new_text, "x.properties")
    assert result["b"] == "[UNTRANSLATED] Line one\nLine two \\ end"


def test_fix_po_inserts_fuzzy_entry_for_missing_key():
    text = 'msgid "app.title"\nmsgstr "Bonjour"\n'
    base = {"app.title": "Hello", "app.greeting": "Hi there"}
    new_text = translint.fix_missing_keys_po(text, ["app.greeting"], base)
    assert "#, fuzzy" in new_text
    assert 'msgid "app.greeting"' in new_text
    assert 'msgstr "Hi there"' in new_text
    # a fuzzy entry is invisible to parse_po, exactly like msgfmt treats it -
    # the fixed key still reads back as missing until someone actually
    # translates it and drops the fuzzy flag, so --fix can never make a
    # still-untranslated .po key look finished
    assert translint.parse_po(new_text, "x.po") == {"app.title": "Bonjour"}


def test_fix_po_only_appends_existing_entry_untouched():
    text = 'msgid "app.title"\nmsgstr "Bonjour"\n'
    base = {"app.title": "Hello", "app.greeting": "Hi there"}
    new_text = translint.fix_missing_keys_po(text, ["app.greeting"], base)
    assert new_text.startswith('msgid "app.title"\nmsgstr "Bonjour"\n')


def test_fix_po_msgctxt_key_round_trips():
    text = 'msgid "plain"\nmsgstr "Bonjour"\n'
    base = {"plain": "Hello", ("verb", "Close"): "Close"}
    new_text = translint.fix_missing_keys_po(text, [("verb", "Close")], base)
    assert 'msgctxt "verb"' in new_text
    assert 'msgid "Close"' in new_text
    assert "#, fuzzy" in new_text


# ---------------------------------------------------------------------------
# --fix: CLI end-to-end, on real files on disk
# ---------------------------------------------------------------------------


def test_cli_default_never_writes_a_file():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.json")
        de_path = os.path.join(d, "de.json")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hello",\n  "b": "World"\n}\n')
        with open(de_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hallo"\n}\n')
        before = open(de_path, encoding="utf-8").read()

        run_cli([d, "--base", "en"])  # no --fix at all

        after = open(de_path, encoding="utf-8").read()
        assert after == before


def test_cli_dry_run_without_fix_errors_cleanly():
    with tempfile.TemporaryDirectory() as d:
        with open(os.path.join(d, "en.json"), "w", encoding="utf-8") as fh:
            json.dump({"a": "Hello"}, fh)
        code, out, err = run_cli_err([d, "--base", "en", "--dry-run"])
        assert code == 2
        assert "--dry-run" in err


def test_cli_fix_dry_run_writes_nothing_but_reports_what_it_would_insert():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.json")
        de_path = os.path.join(d, "de.json")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hello",\n  "b": "World"\n}\n')
        with open(de_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hallo"\n}\n')
        before = open(de_path, encoding="utf-8").read()

        code, out, err = run_cli_err([d, "--base", "en", "--fix", "--dry-run"])
        assert code == 1  # nothing was actually inserted, "b" is still missing

        after = open(de_path, encoding="utf-8").read()
        assert after == before  # byte-for-byte unchanged on disk
        assert "would insert" in err
        assert "[UNTRANSLATED]" not in after  # confirms it really wasn't written


def test_cli_fix_on_a_nested_file_survives_the_translator():
    # the whole failure this guards: --fix used to write a flat
    # "nav.settings" member next to the "nav" object. translint read it as
    # fixed, the translator replaced the marker with a real translation,
    # and the app still had no string at nav.settings - a missing key the
    # tool had turned invisible to itself.
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.json")
        de_path = os.path.join(d, "de.json")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "nav": {\n    "home": "Home",\n    "settings": "Settings"\n  }\n}\n')
        with open(de_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "nav": {\n    "home": "Startseite"\n  }\n}\n')

        code, out, err = run_cli_err([d, "--base", "en", "--fix"])
        assert code == 1  # the marker itself is a finding

        written = json.loads(open(de_path, encoding="utf-8").read())
        assert "nav.settings" not in written
        assert written["nav"]["settings"] == "[UNTRANSLATED] Settings"

        # now do what a translator does, and check the run is honestly clean
        text = open(de_path, encoding="utf-8").read()
        with open(de_path, "w", encoding="utf-8") as fh:
            fh.write(text.replace("[UNTRANSLATED] Settings", "Einstellungen"))
        code, out, err = run_cli_err([d, "--base", "en"])
        assert code == 0
        assert json.loads(open(de_path, encoding="utf-8").read())["nav"]["settings"] == (
            "Einstellungen"
        )


def test_cli_fix_inserts_missing_key_minimal_diff():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.json")
        de_path = os.path.join(d, "de.json")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hello",\n  "b": "World"\n}\n')
        with open(de_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hallo"\n}\n')

        # --fix inserts the key marked [UNTRANSLATED], which is still a
        # finding (it's not a real translation yet), so the run that inserted
        # it does not report clean - exit 1, matching the README's promise
        # that the marker reads back as still-missing on the very next run.
        code, out = run_cli([d, "--base", "en", "--fix"])
        assert code == 1

        fixed = open(de_path, encoding="utf-8").read()
        assert fixed == '{\n  "a": "Hallo",\n  "b": "[UNTRANSLATED] World"\n}\n'


def test_cli_fix_then_recheck_reports_the_inserted_marker_not_clean():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.json")
        de_path = os.path.join(d, "de.json")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hello",\n  "b": "World"\n}\n')
        with open(de_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hallo"\n}\n')

        run_cli([d, "--base", "en", "--fix"])
        code, out = run_cli([d, "--base", "en", "--json"])

        results = json.loads(out)
        # No longer "missing" - the key is in the file now - but flagged as a
        # leftover [UNTRANSLATED] marker instead, so a plain recheck after
        # --fix is not clean (README Fix mode).
        assert results[0]["missing_keys"] == []
        assert results[0]["untranslated_markers"] == ["b"]
        assert code == 1


def test_cli_fix_never_touches_the_identical_to_base_finding():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.json")
        de_path = os.path.join(d, "de.json")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "brand": "Acme",\n  "missing": "New Key"\n}\n')
        with open(de_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "brand": "Acme"\n}\n')

        code, out = run_cli([d, "--base", "en", "--fix", "--json"])

        fixed = open(de_path, encoding="utf-8").read()
        # "brand": "Acme" is the identical-to-base heuristic hit - still
        # flagged every run (see the assertion below), and --fix must never
        # rewrite it - there's exactly one copy, untouched, in the file
        assert fixed.count('"brand": "Acme"') == 1
        results = json.loads(out)
        assert results[0]["untranslated_values"] == ["brand"]


def test_cli_fix_never_overwrites_an_existing_placeholder_mismatch():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.json")
        de_path = os.path.join(d, "de.json")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hi {name}",\n  "b": "New Key"\n}\n')
        with open(de_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hallo"\n}\n')  # dropped the {name} placeholder

        code, out = run_cli([d, "--base", "en", "--fix", "--json"])
        results = json.loads(out)
        assert results[0]["placeholder_mismatches"] != []  # still flagged, untouched

        fixed = open(de_path, encoding="utf-8").read()
        assert '"a": "Hallo"' in fixed  # exact original value, byte for byte


def test_cli_fix_with_nothing_missing_is_a_no_op():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.json")
        de_path = os.path.join(d, "de.json")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hello"\n}\n')
        with open(de_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hallo"\n}\n')
        before = open(de_path, encoding="utf-8").read()

        code, out = run_cli([d, "--base", "en", "--fix"])
        assert code == 0

        after = open(de_path, encoding="utf-8").read()
        assert after == before


def test_cli_fix_summary_prints_to_stderr_json_output_stays_pure():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.json")
        de_path = os.path.join(d, "de.json")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hello",\n  "b": "World"\n}\n')
        with open(de_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hallo"\n}\n')

        code, out, err = run_cli_err([d, "--base", "en", "--fix", "--json"])
        json.loads(out)  # still pure, parseable JSON - didn't get the summary mixed in
        assert "b" in err  # the human summary landed on stderr instead


def test_cli_fix_po_writes_fuzzy_entry_leaves_existing_entry_untouched():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.po")
        es_path = os.path.join(d, "es.po")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write('msgid "a"\nmsgstr "Hello"\n\nmsgid "b"\nmsgstr "World"\n')
        with open(es_path, "w", encoding="utf-8") as fh:
            fh.write('msgid "a"\nmsgstr "Hola"\n')

        run_cli([d, "--base", "en", "--fix"])

        fixed = open(es_path, encoding="utf-8").read()
        assert fixed.startswith('msgid "a"\nmsgstr "Hola"\n')
        assert "#, fuzzy" in fixed
        assert 'msgid "b"' in fixed


def test_cli_fix_properties_writes_marked_line_leaves_existing_line_untouched():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.properties")
        ja_path = os.path.join(d, "ja.properties")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write("a=Hello\nb=World\n")
        with open(ja_path, "w", encoding="utf-8") as fh:
            fh.write("a=Konnichiwa\n")

        run_cli([d, "--base", "en", "--fix"])

        fixed = open(ja_path, encoding="utf-8").read()
        assert fixed.startswith("a=Konnichiwa\n")
        assert "b=[UNTRANSLATED] World" in fixed


# ---------------------------------------------------------------------------
# Regression tests for confirmed bugs.
# ---------------------------------------------------------------------------


def test_pynamed_with_flags_width_precision_is_extracted():
    # %(price).2f / %(done)3d - a mapping key with the full flag/width/
    # precision grammar, not a bare conversion right after the ')'
    style, tokens = translint.extract_placeholders("Total: %(price).2f, %(done)3d")
    assert style == "pynamed"
    assert tokens == ("%(done)3d", "%(price).2f")


def test_pynamed_rename_with_precision_is_a_mismatch():
    base = {"total": "Total: %(price).2f"}
    loc = {"total": "Total: %(prix).2f"}
    r = translint.check_locale(base, loc, "fr", "fr.json", "json")
    assert len(r["placeholder_mismatches"]) == 1


def test_pynamed_dropped_width_token_is_a_mismatch():
    base = {"pct": "Done: %(done)3d"}
    loc = {"pct": "Fertig:"}
    r = translint.check_locale(base, loc, "de", "de.json", "json")
    assert r["placeholder_mismatches"] == [
        {"key": "pct", "base": ["%(done)3d"], "locale": []}
    ]


def test_printf_length_modifiers_are_extracted():
    # %lu / %ld / %zd / %zu / %u / %c - C gettext catalog conversions that
    # were invisible before, so a dropped or swapped one passed clean
    style, tokens = translint.extract_placeholders("read %zd of %zu, %lu done, %c, %u")
    assert style == "printf"
    assert tokens == ("%c", "%lu", "%u", "%zd", "%zu")


def test_printf_length_modifier_dropped_placeholder_is_a_mismatch():
    base = {"k": "%lu bytes copied"}
    loc = {"k": "Bytes kopiert"}  # placeholder dropped
    r = translint.check_locale(base, loc, "de", "de.po", "po")
    assert r["placeholder_mismatches"] == [
        {"key": "k", "base": ["%lu"], "locale": []}
    ]


def test_printf_length_modifier_type_swap_is_a_mismatch():
    # %zd / %zu is the same multiset both ways, but swapping their order
    # against the base's argument tuple is a real runtime bug
    base = {"k": "read %zd of %zu"}
    loc = {"k": "%zu von %zd gelesen"}
    r = translint.check_locale(base, loc, "de", "de.po", "po")
    assert len(r["placeholder_mismatches"]) == 1


def test_icu_plural_select_correct_translation_is_clean():
    # a correctly translated ICU plural/select message is not a placeholder
    # mismatch and not "possibly untranslated" - only the argument name is a
    # token, the branch bodies are translatable prose
    base = {
        "files": "{count, plural, one {file} other {files}}",
        "who": "{gender, select, male {He} female {She} other {They}}",
    }
    loc = {
        "files": "{count, plural, one {fichier} other {fichiers}}",
        "who": "{gender, select, male {Il} female {Elle} other {Iel}}",
    }
    r = translint.check_locale(base, loc, "fr", "fr.json", "json")
    assert r["placeholder_mismatches"] == []
    assert r["untranslated_values"] == []
    assert r["ok"] is True


def test_icu_argument_name_is_the_only_token():
    style, tokens = translint.extract_placeholders(
        "{count, plural, one {file} other {files}}"
    )
    assert style == "icu"
    assert tokens == ("{count}",)


def test_icu_nested_placeholder_in_branch_is_still_caught():
    style, tokens = translint.extract_placeholders(
        "{count, plural, other {There are {count} files}}"
    )
    assert "icu" in style
    assert "{count}" in tokens


def test_icu_untranslated_branch_body_still_flagged():
    # a French locale that left the English branch text in place should still
    # register as possibly untranslated under the heuristic
    base = {"files": "{count, plural, one {file} other {files}}"}
    loc = {"files": "{count, plural, one {file} other {files}}"}
    r = translint.check_locale(base, loc, "fr", "fr.json", "json")
    assert r["untranslated_values"] == ["files"]


def test_parse_po_splits_entries_not_separated_by_blank_lines():
    # a new msgid while the current entry already has a msgstr starts a fresh
    # entry - matching gettext's own delimiting, not only blank lines
    po = 'msgid "hello"\nmsgstr "Hello"\nmsgid "bye"\nmsgstr "Goodbye"\n'
    assert translint.parse_po(po, "x.po") == {"hello": "Hello", "bye": "Goodbye"}


def test_parse_po_unseparated_fuzzy_comment_attaches_to_next_entry():
    # the "#, fuzzy" belongs to entry "b", not "a" - "a" stays live
    po = 'msgid "a"\nmsgstr "A"\n#, fuzzy\nmsgid "b"\nmsgstr "B"\n'
    assert translint.parse_po(po, "x.po") == {"a": "A"}


def test_check_locale_flags_leftover_untranslated_marker():
    base = {"a": "Hello", "b": "World"}
    loc = {"a": "Hallo", "b": "[UNTRANSLATED] World"}
    r = translint.check_locale(base, loc, "de", "de.json", "json")
    assert r["untranslated_markers"] == ["b"]
    assert r["missing_keys"] == []
    assert r["ok"] is False


def test_untranslated_marker_fails_even_without_strict():
    base = {"a": "Hello", "b": "World"}
    loc = {"a": "Hallo", "b": "[UNTRANSLATED] World"}
    r = translint.check_locale(base, loc, "de", "de.json", "json")
    assert translint.is_failing(r, strict=False) is True


def test_cli_fix_refuses_non_utf8_file_and_leaves_it_untouched():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.properties")
        fr_path = os.path.join(d, "fr.properties")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write("a=Hello\nb=World\n")
        # Latin-1 "Déjà vu" - not valid UTF-8
        with open(fr_path, "wb") as fh:
            fh.write(b"a=D\xe9j\xe0 vu\n")
        before = open(fr_path, "rb").read()

        code, out, err = run_cli_err([d, "--base", "en", "--fix"])
        assert code == 2
        assert "not UTF-8" in err
        assert open(fr_path, "rb").read() == before  # byte-for-byte untouched


def test_cli_fix_preserves_a_utf8_bom():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.json")
        de_path = os.path.join(d, "de.json")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write('{\n  "a": "Hello",\n  "b": "World"\n}\n')
        with open(de_path, "wb") as fh:
            fh.write(b"\xef\xbb\xbf{\n  \"a\": \"Hallo\"\n}\n")

        run_cli([d, "--base", "en", "--fix"])

        raw = open(de_path, "rb").read()
        assert raw.startswith(b"\xef\xbb\xbf")  # BOM survived the rewrite
        assert b"[UNTRANSLATED] World" in raw


def test_cli_accepts_existing_path_with_glob_metacharacters():
    with tempfile.TemporaryDirectory() as d:
        sub = os.path.join(d, "loc[1]")
        os.mkdir(sub)
        with open(os.path.join(sub, "en.json"), "w", encoding="utf-8") as fh:
            fh.write('{"a": "Hi"}')
        with open(os.path.join(sub, "de.json"), "w", encoding="utf-8") as fh:
            fh.write('{"a": "Hallo"}')

        code, out, err = run_cli_err([sub, "--base", "en"])
        assert code == 0  # the directory really exists, don't glob it away
        assert "no files match" not in err


def test_msgctxt_key_display_in_text_report():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.po")
        de_path = os.path.join(d, "de.po")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write('msgctxt "verb"\nmsgid "Close"\nmsgstr "Close"\n\n'
                     'msgid "Hi"\nmsgstr "Hi"\n')
        with open(de_path, "w", encoding="utf-8") as fh:
            fh.write('msgid "Hi"\nmsgstr "Salut"\n')

        code, out = run_cli([d, "--base", "en"])
        assert "Close (msgctxt=verb)" in out  # not a raw ('verb', 'Close') tuple
        assert "('verb'" not in out


def test_msgctxt_key_serialized_as_string_in_json():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.po")
        de_path = os.path.join(d, "de.po")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write('msgctxt "verb"\nmsgid "Close"\nmsgstr "Close"\n\n'
                     'msgid "Hi"\nmsgstr "Hi"\n')
        with open(de_path, "w", encoding="utf-8") as fh:
            fh.write('msgid "Hi"\nmsgstr "Salut"\n')

        code, out = run_cli([d, "--base", "en", "--json"])
        results = json.loads(out)
        # every key is a string, the msgctxt one via gettext's EOT convention
        assert results[0]["missing_keys"] == ["verb\x04Close"]
        assert all(isinstance(k, str) for k in results[0]["missing_keys"])


def test_properties_bare_key_line_is_empty_value_not_missing():
    # "flag.beta" alone on a line is a valid Java empty-value key - it must
    # parse as a present key with "", so it lands in empty_values rather than
    # being dropped and mis-reported as missing
    result = translint.parse_properties("a=Hallo\nflag.beta\n", "de.properties")
    assert result == {"a": "Hallo", "flag.beta": ""}


def test_properties_bare_key_categorized_as_empty_end_to_end():
    with tempfile.TemporaryDirectory() as d:
        en_path = os.path.join(d, "en.properties")
        de_path = os.path.join(d, "de.properties")
        with open(en_path, "w", encoding="utf-8") as fh:
            fh.write("a=Hello\nflag.beta=New\n")
        with open(de_path, "w", encoding="utf-8") as fh:
            fh.write("a=Hallo\nflag.beta\n")

        code, out = run_cli([d, "--base", "en", "--json"])
        results = json.loads(out)
        assert results[0]["empty_values"] == ["flag.beta"]
        assert results[0]["missing_keys"] == []


# ---------------------------------------------------------------------------
# Discovery: --recursive, --locale-from dir, and --format on a directory
# ---------------------------------------------------------------------------


def write_tree(root, files):
    for rel, text in files.items():
        path = os.path.join(root, *rel.split("/"))
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(text)


NS_TREE = {
    "en/common.json": '{\n  "nav": {\n    "home": "Home",\n    "settings": "Settings"\n  }\n}\n',
    "en/footer.json": '{\n  "copy": "All rights reserved"\n}\n',
    "de/common.json": '{\n  "nav": {\n    "home": "Startseite"\n  }\n}\n',
    "de/footer.json": '{\n  "copy": "Alle Rechte vorbehalten"\n}\n',
}


def test_cli_recursive_locale_from_dir_checks_the_nested_layout():
    # public/locales/<lang>/<namespace>.json, what next-i18next and
    # i18next-fs-backend ship by default
    with tempfile.TemporaryDirectory() as d:
        write_tree(d, NS_TREE)
        code, out = run_cli([d, "--base", "en", "--recursive",
                             "--locale-from", "dir", "--json"])
        assert code == 1
        results = json.loads(out)
        assert [r["locale"] for r in results] == ["de", "de"]
        by_path = {os.path.basename(r["path"]): r for r in results}
        assert by_path["common.json"]["missing_keys"] == ["nav.settings"]
        # footer.json is a complete translation and must not pick up the
        # other namespace's keys as missing or extra
        assert by_path["footer.json"]["missing_keys"] == []
        assert by_path["footer.json"]["extra_keys"] == []


def test_cli_locale_from_dir_never_compares_across_namespaces():
    with tempfile.TemporaryDirectory() as d:
        write_tree(d, NS_TREE)
        # a complete German translation of both namespaces: nothing should
        # be reported, and in particular footer's key must not read as
        # missing from common or extra in footer
        write_tree(d, {"de/common.json":
                       '{\n  "nav": {\n    "home": "Startseite",\n'
                       '    "settings": "Einstellungen"\n  }\n}\n'})
        code, out = run_cli([d, "--base", "en", "--recursive",
                             "--locale-from", "dir", "--strict", "--json"])
        assert code == 0
        for r in json.loads(out):
            assert r["missing_keys"] == [] and r["extra_keys"] == []


def test_cli_locale_from_dir_works_on_explicitly_listed_files():
    with tempfile.TemporaryDirectory() as d:
        write_tree(d, NS_TREE)
        code, out = run_cli([os.path.join(d, "en", "common.json"),
                             os.path.join(d, "de", "common.json"),
                             "--base", "en", "--locale-from", "dir", "--json"])
        assert code == 1
        results = json.loads(out)
        assert len(results) == 1
        assert results[0]["locale"] == "de"
        assert results[0]["missing_keys"] == ["nav.settings"]


def test_cli_directory_scan_is_still_non_recursive_by_default():
    with tempfile.TemporaryDirectory() as d:
        write_tree(d, NS_TREE)
        code, out, err = run_cli_err([d, "--base", "en"])
        assert code == 2
        assert "no locale files found" in err


def test_cli_recursive_alone_still_names_locales_by_stem():
    with tempfile.TemporaryDirectory() as d:
        write_tree(d, {
            "en.json": '{"a": "Hello"}',
            "extra/de.json": '{"a": "Hallo"}',
        })
        code, out = run_cli([d, "--base", "en", "--recursive", "--json"])
        assert code == 0
        assert [r["locale"] for r in json.loads(out)] == ["de"]


def test_cli_locale_from_dir_missing_base_names_the_namespace():
    with tempfile.TemporaryDirectory() as d:
        write_tree(d, {
            "en/common.json": '{"a": "Hello"}',
            "de/common.json": '{"a": "Hallo"}',
            "de/footer.json": '{"c": "Alle Rechte vorbehalten"}',
        })
        code, out, err = run_cli_err([d, "--base", "en", "--recursive",
                                      "--locale-from", "dir"])
        assert code == 2
        assert "footer" in err and "'en'" in err


def test_cli_fix_in_the_nested_layout_writes_into_the_right_file():
    with tempfile.TemporaryDirectory() as d:
        write_tree(d, NS_TREE)
        footer_before = open(os.path.join(d, "de", "footer.json"), encoding="utf-8").read()
        code, out, err = run_cli_err([d, "--base", "en", "--recursive",
                                      "--locale-from", "dir", "--fix"])
        assert code == 1
        common = json.loads(open(os.path.join(d, "de", "common.json"), encoding="utf-8").read())
        assert common["nav"]["settings"] == "[UNTRANSLATED] Settings"
        after = open(os.path.join(d, "de", "footer.json"), encoding="utf-8").read()
        assert after == footer_before


def test_cli_format_flag_rescues_an_unrecognized_extension_in_a_directory():
    # the README calls --format the escape hatch for a non-standard
    # extension; before this it only worked for explicitly listed files and
    # reported "no locale files found" for a whole directory of them
    with tempfile.TemporaryDirectory() as d:
        write_tree(d, {"en.lang": '{"a": "Hello", "b": "World"}',
                       "de.lang": '{"a": "Hallo"}'})
        code, out = run_cli([d, "--base", "en", "--format", "json", "--json"])
        assert code == 1
        results = json.loads(out)
        assert results[0]["locale"] == "de"
        assert results[0]["missing_keys"] == ["b"]


def test_discover_skips_dotfiles_but_keeps_an_explicitly_named_one():
    with tempfile.TemporaryDirectory() as d:
        write_tree(d, {"en.json": "{}", ".translintrc.json": "{}"})
        found = [p for p, _root in translint.discover_locale_files([d])]
        assert found == [os.path.join(d, "en.json")]
        cfg = os.path.join(d, ".translintrc.json")
        assert [p for p, _root in translint.discover_locale_files([cfg])] == [cfg]


def test_discover_recursive_skips_dot_directories():
    with tempfile.TemporaryDirectory() as d:
        write_tree(d, {"en.json": "{}", ".git/en.json": "{}"})
        found = [p for p, _root in translint.discover_locale_files([d], recursive=True)]
        assert found == [os.path.join(d, "en.json")]


def test_locale_and_namespace_splits_a_lang_directory_layout():
    root = os.path.join("pub", "locales")
    path = os.path.join(root, "de", "common.json")
    assert translint.locale_and_namespace(path, root, "dir") == ("de", "common")
    deep = os.path.join(root, "de", "admin", "billing.json")
    assert translint.locale_and_namespace(deep, root, "dir") == ("de", "admin/billing")
    assert translint.locale_and_namespace(path, root, "stem") == ("common", "")
