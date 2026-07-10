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
