#!/usr/bin/env python3
"""translint - catch broken translations before they ship.

Reads a base locale file plus one or more other locale files covering the
same keys and reports what's wrong: keys missing from a translation, keys
left over from a rename, placeholder tokens that don't match between the
base and the translation (the kind of bug that throws a runtime
KeyError/IndexError the first time that string actually renders), empty
values, and values that still look untranslated.

Supports JSON (nested or flat dot-namespaced keys), gettext .po, and Java
.properties files, auto-detected by extension. Standard library only. No
network, no dependencies, no eval/exec on file contents.

Usage:
  translint locales/                         # scan a directory, base=en
  translint locales/ --base fr                # use fr.json as the reference
  translint locales/en.json locales/de.json   # specific files
  translint locales/ --json                   # machine-readable
  translint locales/ --strict                 # also fail on extra/untranslated
  translint locales/ --allow-identical brand.name   # suppress one heuristic hit

Exit code is 0 when every locale is clean, 1 when translint found something
to fix, and 2 if a path couldn't be read or parsed at all - so a crash and
a lint finding never look the same to a script.
"""
import argparse
import glob
import json
import os
import re
import sys

__version__ = "0.1.0"

# check_locale()'s return dict is translint's only machine-readable contract.
# If you add, rename, or remove a top-level key, update this set and bump
# the version - anything parsing --json is relying on these names staying put.
JSON_SCHEMA_KEYS = {
    "locale", "path", "format", "missing_keys", "extra_keys",
    "placeholder_mismatches", "empty_values", "untranslated_values", "ok",
}

SUPPORTED_FORMATS = ("json", "po", "properties")

EXT_TO_FORMAT = {
    ".json": "json",
    ".po": "po",
    ".pot": "po",
    ".properties": "properties",
}

# ---------------------------------------------------------------------------
# Placeholder detection
#
# Five interpolation styles. A value is scanned with every style; whichever
# styles have at least one match are the ones used, so a project that only
# ever uses `{name}` doesn't get phantom checks run against `%s` syntax it
# never uses. If a value matches more than one style (rare, but plain-text
# next to a templated one happens), tokens from every style that matches are
# unioned - better a token set that's a little too broad than one that
# silently drops a real placeholder.
#
# Two pairs overlap syntactically and need one pattern's matches excluded
# from the other so a single token isn't counted twice:
#   - {{name}} (doublebrace) contains a {name}-shaped substring, which
#     "brace" would otherwise also match on its own.
#   - ${name} (dollar's brace form) ALSO contains that same {name}-shaped
#     substring, for the same reason.
#   - %1$s / %2$d (printf, numbered form) contains a $s / $d substring,
#     which "dollar" would otherwise also match as a bare $name token.
# Each exclusion works the same way: find the wider pattern's spans first,
# then drop any narrower match that falls entirely inside one of them. This
# is why doublebrace/dollar run before brace, and printf runs before dollar.
# ---------------------------------------------------------------------------

_RX_DOUBLEBRACE = re.compile(r"\{\{\s*([\w.]+)\s*\}\}")
_RX_BRACE = re.compile(r"\{([A-Za-z_][\w.]*|\d*)\}")
_RX_PYNAMED = re.compile(r"%\((\w+)\)[sdifr%]")
_RX_PRINTF = re.compile(r"%(\d+\$)?[sdifgeExXo]")
_RX_DOLLAR = re.compile(r"\$\{(\w+)\}|\$(\w+)")


def _spans_contain(spans, m):
    return any(s <= m.start() and m.end() <= e for s, e in spans)


def extract_placeholders(value):
    """Return (style_name, multiset-as-sorted-tuple) for the interpolation
    style(s) found in value. A value can use more than one style at once
    (uncommon, but not invalid), in which case every token from every style
    that matched is included in one combined multiset and style_name is a
    "+"-joined label of every style that fired, so the caller has one
    consistent set to diff regardless of how many styles were in play.

    Returns ("none", ()) when no placeholder syntax is present at all -
    the overwhelmingly common case for short UI strings, and correctly not
    flagged as a mismatch against another value that also has none.
    """
    tokens = []
    styles_hit = []

    doublebrace_matches = list(_RX_DOUBLEBRACE.finditer(value))
    if doublebrace_matches:
        tokens += [f"{{{{{m.group(1)}}}}}" for m in doublebrace_matches]
        styles_hit.append("doublebrace")

    pynamed_matches = list(_RX_PYNAMED.finditer(value))
    if pynamed_matches:
        tokens += [m.group(0) for m in pynamed_matches]
        styles_hit.append("pynamed")

    printf_matches = list(_RX_PRINTF.finditer(value))
    if printf_matches:
        tokens += [m.group(0) for m in printf_matches]
        styles_hit.append("printf")
    printf_spans = [m.span() for m in printf_matches]

    dollar_matches = [m for m in _RX_DOLLAR.finditer(value)
                       if not _spans_contain(printf_spans, m)]
    if dollar_matches:
        tokens += [m.group(0) for m in dollar_matches]
        styles_hit.append("dollar")

    exclude_spans = [m.span() for m in doublebrace_matches] + [m.span() for m in dollar_matches]
    brace_matches = [m for m in _RX_BRACE.finditer(value)
                      if not _spans_contain(exclude_spans, m)]
    if brace_matches:
        tokens += [f"{{{m.group(1)}}}" for m in brace_matches]
        styles_hit.append("brace")

    if not tokens:
        return "none", ()
    return "+".join(styles_hit), tuple(sorted(tokens))


# ---------------------------------------------------------------------------
# Format parsers. Each returns a flat dict of {dotted.key: string value},
# already flattened for nested formats, plus the raw key order isn't
# preserved (dict order is, which is good enough - comparisons are by key,
# not position).
# ---------------------------------------------------------------------------


def flatten_json(obj, prefix=""):
    """Flatten a nested JSON object into dot-namespaced keys. A flat file
    that's already dot-namespaced round-trips unchanged. Lists are treated
    as leaf values (joined by index: key.0, key.1, ...) rather than
    unsupported, since locale files occasionally use arrays for things like
    ordinal-plural forms and dropping them silently would hide real content."""
    out = {}
    if isinstance(obj, dict):
        for k, v in obj.items():
            key = f"{prefix}.{k}" if prefix else str(k)
            out.update(flatten_json(v, key))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            key = f"{prefix}.{i}" if prefix else str(i)
            out.update(flatten_json(v, key))
    else:
        out[prefix] = "" if obj is None else str(obj)
    return out


def parse_json(text, path):
    try:
        data = json.loads(text)
    except json.JSONDecodeError as exc:
        raise ValueError(f"{path}: invalid JSON ({exc})")
    if not isinstance(data, dict):
        raise ValueError(f"{path}: top level must be a JSON object")
    return flatten_json(data)


def parse_properties(text, path):
    """Java .properties: key=value or key:value, one per logical line.
    A trailing unescaped backslash continues the value onto the next line
    (the standard .properties continuation rule). '#' and '!' start a
    comment when they're the first non-whitespace character on a line.
    Leading whitespace on a continuation line is stripped, matching how
    java.util.Properties reads it."""
    out = {}
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.lstrip()
        if not stripped or stripped[0] in "#!":
            i += 1
            continue
        # Gather continuation lines first, since the split point between
        # key and value must not be searched for inside an escaped
        # separator (\\= or \\:), and continuations can carry those too.
        full = line
        while full.endswith("\\") and not full.endswith("\\\\"):
            i += 1
            if i >= len(lines):
                break
            full = full[:-1] + lines[i].lstrip()
        m = re.match(r"\s*((?:[^\\=: \t]|\\.)+)\s*[=:]\s*(.*)$", full)
        if not m:
            i += 1
            continue
        key = m.group(1).strip()
        key = re.sub(r"\\(.)", r"\1", key)
        value = m.group(2)
        value = re.sub(r"\\(.)", r"\1", value)
        out[key] = value
        i += 1
    return out


def parse_po(text, path):
    """gettext .po: msgid/msgstr pairs. Multi-line strings (adjacent quoted
    literals) are concatenated. Plural forms (msgid_plural/msgstr[n]) use
    msgstr[0] as the value to check, since that's the form that corresponds
    to msgid the same way a singular translation would - msgstr[1..] are
    the plural variants and aren't compared against msgid directly. Entries
    with an empty msgid (the .po header block) are skipped. Fuzzy/obsolete
    (#~) entries are skipped since they aren't live translations."""
    out = {}

    def unquote(raw):
        # .po string literals use C-style escapes inside double quotes;
        # json.loads handles that escaping correctly without reimplementing
        # it, since .po's rules are the same subset json uses.
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            return raw

    entry_lines = []
    entries = []
    for raw_line in text.splitlines() + [""]:
        line = raw_line.strip()
        if line == "" and entry_lines:
            entries.append(entry_lines)
            entry_lines = []
        elif line:
            entry_lines.append(line)
    if entry_lines:
        entries.append(entry_lines)

    for entry in entries:
        if any(line.startswith("#~") for line in entry):
            continue
        msgid_parts, msgstr_parts = [], []
        target = None
        for line in entry:
            if line.startswith("#"):
                continue
            if line.startswith("msgid_plural"):
                target = None
                continue
            if line.startswith("msgid "):
                target = msgid_parts
                msgid_parts.append(line[len("msgid "):].strip())
                continue
            if line.startswith("msgid"):
                target = msgid_parts
                continue
            if re.match(r'^msgstr\[0\]', line):
                target = msgstr_parts
                rest = re.sub(r'^msgstr\[0\]\s*', '', line)
                msgstr_parts.append(rest)
                continue
            if re.match(r'^msgstr\[\d+\]', line):
                target = None  # msgstr[1..]: plural variants, not compared
                continue
            if line.startswith("msgstr "):
                target = msgstr_parts
                msgstr_parts.append(line[len("msgstr "):].strip())
                continue
            if line.startswith("msgstr"):
                target = msgstr_parts
                continue
            if line.startswith('"') and target is not None:
                target.append(line)
        msgid = "".join(unquote(p) for p in msgid_parts)
        msgstr = "".join(unquote(p) for p in msgstr_parts)
        if msgid == "":
            continue  # header block
        out[msgid] = msgstr
    return out


PARSERS = {"json": parse_json, "po": parse_po, "properties": parse_properties}


def detect_format(path):
    ext = os.path.splitext(path)[1].lower()
    return EXT_TO_FORMAT.get(ext)


def load_locale(path, fmt=None):
    """Read and parse a locale file. fmt overrides extension-based
    detection. Raises ValueError with a plain message (no traceback) on an
    unrecognized extension or a parse failure, so main() can report it and
    exit 2 instead of crashing."""
    fmt = fmt or detect_format(path)
    if fmt not in PARSERS:
        raise ValueError(
            f"{path}: can't detect format from extension, pass --format "
            f"({'/'.join(SUPPORTED_FORMATS)})"
        )
    with open(path, "r", encoding="utf-8-sig", errors="replace") as fh:
        text = fh.read()
    return PARSERS[fmt](text, path), fmt


# ---------------------------------------------------------------------------
# The untranslated-value heuristic
# ---------------------------------------------------------------------------

# Stripped out of both the base and translation values before the
# "identical to base" untranslated check runs, so a value that legitimately
# still contains a placeholder, a number, or ordinary punctuation doesn't
# make an otherwise-translated string register as a false match, and so a
# short value that's ALL punctuation/placeholder (and therefore has no real
# prose to translate in the first place) doesn't get flagged at all - see
# the ">= 3 letters of remaining content" guard in find_untranslated below.
_STRIP_PLACEHOLDER_RX = re.compile(
    r"\{\{[\w.]+\}\}|\{[\w.]*\}|%\(\w+\)[sdifr%]|%\d+\$[sdifgeExXo]|%[sdifgeExXo]|"
    r"\$\{[\w]+\}|\$\w+"
)
_STRIP_PUNCT_RX = re.compile(r"[0-9%.,()/\-+×~\"'`:;!?\s]")


def _strip_for_untranslated_check(value, do_not_translate):
    out = value
    for tok in do_not_translate:
        out = out.replace(tok, "")
    out = _STRIP_PLACEHOLDER_RX.sub("", out)
    out = _STRIP_PUNCT_RX.sub("", out)
    return out


def _letter_count(s):
    return sum(1 for ch in s if ch.isalpha())


# ---------------------------------------------------------------------------
# Core check
# ---------------------------------------------------------------------------


def check_locale(base, locale_dict, locale_name, path, fmt,
                  do_not_translate=None, allow_identical=None):
    """Compare one locale's flat {key: value} dict against the base's.
    Returns a result dict matching JSON_SCHEMA_KEYS. Pure function - no I/O,
    so it's the same entry point the CLI and any importer (agent skill,
    another script) both call.

    do_not_translate: substrings stripped before the untranslated-value
    heuristic runs (brand names, program names, unit symbols - the same
    idea as liftmath's DO_NOT_TRANSLATE list).
    allow_identical: key names exempt from the untranslated-value heuristic
    entirely (liftmath's IDENTICAL_BY_DESIGN) - for values that legitimately
    render the same in every language (a brand name split across markup,
    a cross-language cognate, a deliberate loanword).
    """
    do_not_translate = do_not_translate or []
    allow_identical = set(allow_identical or [])

    base_keys = set(base.keys())
    locale_keys = set(locale_dict.keys())

    missing_keys = sorted(base_keys - locale_keys)
    extra_keys = sorted(locale_keys - base_keys)

    placeholder_mismatches = []
    empty_values = []
    untranslated_values = []

    for key in sorted(base_keys & locale_keys):
        base_val = base[key]
        loc_val = locale_dict[key]

        if base_val.strip() and not loc_val.strip():
            # Report this as "empty," not also as a placeholder mismatch -
            # an empty value trivially has no tokens, so it would always
            # register as a mismatch too, and that's a less useful, more
            # confusing way to say the same single thing: translate it.
            empty_values.append(key)
            continue

        _, base_tokens = extract_placeholders(base_val)
        _, loc_tokens = extract_placeholders(loc_val)
        if sorted(base_tokens) != sorted(loc_tokens):
            placeholder_mismatches.append({
                "key": key,
                "base": sorted(base_tokens),
                "locale": sorted(loc_tokens),
            })

        if key in allow_identical:
            continue
        base_stripped = _strip_for_untranslated_check(base_val, do_not_translate)
        loc_stripped = _strip_for_untranslated_check(loc_val, do_not_translate)
        if _letter_count(base_stripped) >= 3 and base_stripped == loc_stripped:
            untranslated_values.append(key)

    ok = not (missing_keys or placeholder_mismatches or empty_values)

    return {
        "locale": locale_name,
        "path": path,
        "format": fmt,
        "missing_keys": missing_keys,
        "extra_keys": extra_keys,
        "placeholder_mismatches": placeholder_mismatches,
        "empty_values": empty_values,
        "untranslated_values": untranslated_values,
        "ok": ok,
    }


def is_failing(result, strict=False):
    """Whether a single locale's result should make the run exit non-zero.
    Missing keys, placeholder mismatches, and empty values always fail.
    Extra keys and untranslated values (a heuristic) only fail under
    --strict, since they're much more likely to have a legitimate reason
    behind them (a value someone intentionally left alone, a key mid-removal)."""
    hard = bool(result["missing_keys"] or result["placeholder_mismatches"] or result["empty_values"])
    if not strict:
        return hard
    return hard or bool(result["extra_keys"] or result["untranslated_values"])


# ---------------------------------------------------------------------------
# Discovery + reporting
# ---------------------------------------------------------------------------


def discover_locale_files(paths):
    """Given a list of files and/or directories, return a sorted list of
    locale file paths, expanding directories to every file with a
    recognized extension in them (non-recursive - locale directories are
    conventionally flat, and recursing risks pulling in unrelated JSON).
    A file passed explicitly (not discovered via a directory) is always
    included as given, even if its name would otherwise be excluded below -
    only directory-scan discovery applies the dotfile/config-name filter.
    Dotfiles (.translintrc.json and friends) are skipped during discovery
    so a config file sitting next to the locale files it configures doesn't
    get treated as a locale itself just because it shares the extension."""
    out = []
    for p in paths:
        if os.path.isdir(p):
            # normpath so a directory argument given with forward slashes
            # (common even on Windows, and the norm in cross-platform docs)
            # doesn't produce a display path that mixes separators once
            # joined with a filename below.
            base_dir = os.path.normpath(p)
            for name in sorted(os.listdir(base_dir)):
                if name.startswith("."):
                    continue
                full = os.path.join(base_dir, name)
                if os.path.isfile(full) and detect_format(full):
                    out.append(full)
        else:
            out.append(p)
    return out


def locale_name_from_path(path):
    return os.path.splitext(os.path.basename(path))[0]


def find_base(files, base_name):
    """Pick the base file out of a discovered file list by locale name
    (filename stem), preferring an exact stem match. Returns None if no
    file's stem matches base_name."""
    for f in files:
        if locale_name_from_path(f) == base_name:
            return f
    return None


def report(results, quiet=False):
    lines = []
    any_issues = False
    for r in results:
        issues = (bool(r["missing_keys"]) + bool(r["extra_keys"])
                  + bool(r["placeholder_mismatches"]) + bool(r["empty_values"])
                  + bool(r["untranslated_values"]))
        if issues == 0:
            lines.append(f"{r['locale']} ({r['path']}): clean")
            continue
        any_issues = True
        lines.append(f"{r['locale']} ({r['path']}):")
        if r["missing_keys"]:
            lines.append(f"  missing keys ({len(r['missing_keys'])}):")
            for k in r["missing_keys"]:
                lines.append(f"    - {k}")
        if r["extra_keys"]:
            lines.append(f"  extra keys ({len(r['extra_keys'])}):")
            for k in r["extra_keys"]:
                lines.append(f"    - {k}")
        if r["placeholder_mismatches"]:
            lines.append(f"  placeholder mismatches ({len(r['placeholder_mismatches'])}):")
            for m in r["placeholder_mismatches"]:
                lines.append(f"    - {m['key']}: base has {m['base']}, locale has {m['locale']}")
        if r["empty_values"]:
            lines.append(f"  empty values ({len(r['empty_values'])}):")
            for k in r["empty_values"]:
                lines.append(f"    - {k}")
        if r["untranslated_values"]:
            lines.append(f"  possibly untranslated ({len(r['untranslated_values'])}, heuristic):")
            for k in r["untranslated_values"]:
                lines.append(f"    - {k}")
        lines.append("")
    if not any_issues:
        lines.append("")
        lines.append("All locales clean.")
    return "\n".join(lines).rstrip("\n") + "\n"


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def main(argv=None):
    ap = argparse.ArgumentParser(
        prog="translint",
        description="Check locale files for missing keys, placeholder mismatches, "
                     "empty values, and untranslated strings.",
    )
    ap.add_argument("paths", nargs="*", default=["."], metavar="path",
                    help="a directory of locale files, or specific files (default: .)")
    ap.add_argument("--base", default="en", metavar="LOCALE",
                    help="locale name (filename stem) to treat as the reference (default: en)")
    ap.add_argument("--format", choices=SUPPORTED_FORMATS, default=None,
                    help="force a format instead of detecting from extension")
    ap.add_argument("--json", action="store_true", help="machine-readable output")
    ap.add_argument("--strict", action="store_true",
                    help="also fail on extra keys and untranslated-value hits (default: only "
                         "missing keys, placeholder mismatches, and empty values fail)")
    ap.add_argument("--allow-identical", action="append", default=[], metavar="KEY",
                    help="key exempt from the untranslated-value heuristic (repeatable)")
    ap.add_argument("--do-not-translate", action="append", default=[], metavar="TOKEN",
                    help="substring stripped before the untranslated-value heuristic runs, "
                         "e.g. a brand name (repeatable)")
    ap.add_argument("--config", metavar="PATH",
                    help="path to a .translintrc.json with allow_identical/do_not_translate "
                         "lists (default: .translintrc.json in the scanned directory, if present)")
    ap.add_argument("--quiet", action="store_true", help="summary line only")
    ap.add_argument("--version", action="version", version=f"translint {__version__}")
    args = ap.parse_args(argv)

    allow_identical = list(args.allow_identical)
    do_not_translate = list(args.do_not_translate)

    config_path = args.config
    if config_path is None:
        for p in args.paths:
            candidate = os.path.join(p, ".translintrc.json") if os.path.isdir(p) else None
            if candidate and os.path.isfile(candidate):
                config_path = candidate
                break
    if config_path:
        try:
            with open(config_path, "r", encoding="utf-8-sig") as fh:
                cfg = json.load(fh)
        except (OSError, json.JSONDecodeError) as exc:
            print(f"translint: {config_path}: {exc}", file=sys.stderr)
            return 2
        if not isinstance(cfg, dict):
            print(f"translint: {config_path}: top level must be a JSON object", file=sys.stderr)
            return 2
        allow_identical += list(cfg.get("allow_identical", []))
        do_not_translate += list(cfg.get("do_not_translate", []))

    # Expand glob arguments ourselves - PowerShell and cmd.exe don't expand
    # wildcards before argv reaches us, unlike POSIX shells.
    expanded = []
    for p in args.paths:
        if any(ch in p for ch in "*?["):
            matches = sorted(glob.glob(p))
            if not matches:
                print(f"translint: {p}: no files match", file=sys.stderr)
                return 2
            expanded.extend(matches)
        else:
            expanded.append(p)

    files = discover_locale_files(expanded)
    if not files:
        print(f"translint: no locale files found in {' '.join(args.paths)}", file=sys.stderr)
        return 2

    base_path = find_base(files, args.base)
    if base_path is None:
        print(f"translint: no file named '{args.base}' found among: "
              f"{', '.join(locale_name_from_path(f) for f in files)}", file=sys.stderr)
        return 2

    try:
        base_dict, _base_fmt = load_locale(base_path, fmt=args.format)
    except (ValueError, OSError) as exc:
        print(f"translint: {exc}", file=sys.stderr)
        return 2

    results = []
    for f in files:
        if f == base_path:
            continue
        try:
            locale_dict, fmt = load_locale(f, fmt=args.format)
        except (ValueError, OSError) as exc:
            print(f"translint: {exc}", file=sys.stderr)
            return 2
        r = check_locale(
            base_dict, locale_dict, locale_name_from_path(f), f, fmt,
            do_not_translate=do_not_translate, allow_identical=allow_identical,
        )
        results.append(r)

    if not results:
        print(f"translint: only the base locale ('{args.base}') was found, nothing to check",
              file=sys.stderr)
        return 2

    if args.json:
        print(json.dumps(results, indent=2))
    else:
        text = report(results, quiet=args.quiet)
        if args.quiet:
            failing = [r["locale"] for r in results if is_failing(r, strict=args.strict)]
            if failing:
                print(f"translint: issues in {', '.join(failing)}")
            else:
                print("translint: all locales clean")
        else:
            sys.stdout.write(text)

    return 1 if any(is_failing(r, strict=args.strict) for r in results) else 0


if __name__ == "__main__":
    sys.exit(main())
