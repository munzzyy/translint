---
name: translint
description: Check locale/i18n files for missing keys, extra keys, placeholder/interpolation mismatches, empty values, and untranslated strings before shipping translation changes. Use after adding or editing locale files (JSON, gettext .po, Java .properties), before finalizing a PR that touches i18n, or whenever a new locale key is added to a base file and other locales need to catch up. Catches the kind of placeholder bug that throws a runtime error the first time a translated string actually renders.
---

# translint

Run this after touching anything under a locale directory - a new key added to the base
file, a translation edited, a new locale added - and before handing the change back as
finished. It won't translate anything for you or guess at a fix; it tells you exactly
which key, in which locale, is broken and why.

## When to use it

After:
- adding a new key to the base locale file (every other locale is now missing it)
- editing an existing translated string (a placeholder can silently drop or get renamed)
- adding a brand-new locale file
- any PR that touches files under a locale/i18n directory

Before finalizing that work and handing it back.

## How to run it

```bash
python translint.py locales/ --base en --json
```

Point `paths` at the directory holding the locale files (or list specific files), and
`--base` at the locale name (the filename stem, e.g. `en` for `en.json`) that's the
reference every other locale gets checked against. Format is auto-detected from the
extension (`.json`, `.po`/`.pot`, `.properties`); pass `--format` to force one.

No `--json`? You get the same information as a grouped human-readable report instead,
which is easier to skim but not something to parse.

## Reading the result

Exit code is 0 when every locale is clean, 1 when translint found something to fix, 2 if
a path couldn't be read or parsed at all (bad JSON, unrecognized extension) - so a real
parse failure and a lint finding never look the same.

With `--json`, you get a list of one result object per locale (or a single object if only
one non-base locale was checked). Each result has:

- `missing_keys` - present in the base, absent here. Add the key.
- `extra_keys` - present here, not in the base. Probably a stale key from a rename;
  confirm before deleting, since the base might just be missing it instead.
- `placeholder_mismatches` - the interpolation tokens (`{name}`, `{{name}}`, `%s`,
  `%(name)s`, `${name}`) in the base value and the translated value don't match as a set.
  This is the one that actually crashes at runtime - a dropped or renamed placeholder
  throws a `KeyError`/`IndexError`/`undefined` the first time that string renders with
  real data. Each entry shows `base` and `locale` token lists so you can see exactly what
  differs.
- `empty_values` - the key exists but the value is blank.
- `untranslated_values` - the value is byte-identical to the base after stripping
  placeholders, punctuation, and any configured do-not-translate tokens. This is a
  **heuristic**, not proof - some strings (brand names, unit symbols, genuine
  cross-language cognates) are supposed to render the same in every locale. If a hit is
  legitimate, don't just leave it: either it's a project-wide token (add it to
  `--do-not-translate`) or a specific key (add it to `--allow-identical`), so the next run
  doesn't flag it again for the same reason.

`--strict` also fails the exit code on `extra_keys` and `untranslated_values` (both are
much more likely to have a legitimate reason than `missing_keys`/mismatches/empty values,
so they don't fail by default). Use it in CI once a project's locale files are clean and
you want to keep them that way.

## The rule

translint flags what's broken, it doesn't fix it. When it reports a missing key, add the
translation - don't invent a placeholder-value pair that merely makes the check pass. When
it reports a placeholder mismatch, look at what the base string actually interpolates and
fix the translation to match, not the other way around (the base is the source of truth).
When it reports something you're confident is a false positive on the untranslated-value
heuristic, use `--allow-identical`/`--do-not-translate` rather than ignoring the finding -
that keeps the check meaningful for the next change instead of training yourself to skim
past it.

No network access, no dependencies, nothing leaves the machine.
