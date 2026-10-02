# Changelog

The same notes ship as [GitHub releases](https://github.com/munzzyy/translint/releases).

## v0.5.0 (unreleased)

**Licensing:** the 0.3.0 and 0.4.0 artifacts on PyPI, and the v0.4.0 tag, are
under the Prosperity Public License 3.0.0 - free for noncommercial use only.
The repository was MIT for a while after that, and is now GPL-3.0-or-later.
The old PyPI pages keep advertising Prosperity forever, so if you installed
translint from PyPI before this release, that's the license you got.

Fixed in 0.5.0:

- `--fix` on a nested JSON file wrote a flat `"nav.settings"` member next to
  the `nav` object. translint flattens both shapes so it read the file as
  fixed, but i18next and vue-i18n walk into the nested object and never find a
  top-level key with a dot in it. Once a translator replaced the marker the run
  reported clean, so a real missing key had been made invisible. A missing key
  now goes into the object its path names, creating intermediate objects where
  a branch is missing. Flat dot-namespaced files still get flat keys.
- The `public/locales/<lang>/<namespace>.json` layout can be linted at all now:
  `--recursive` walks subdirectories and `--locale-from dir` takes the locale
  from the directory instead of the filename, grouping files by namespace so
  `en/common.json` is only compared against `de/common.json`. Both are also
  available on the GitHub Action.
- A percent sign in ordinary prose is no longer a printf placeholder. `20%off`
  extracted as a `%o` token, and placeholder mismatches are a hard failure with
  no allowlist, so a discount string failed CI. Anything carrying a flag,
  width, precision, length modifier or argument number still matches.
- A `.properties` file that isn't valid UTF-8 is read, and rewritten by `--fix`,
  as ISO-8859-1, which is what `java.util.Properties` specifies. Reading one as
  UTF-8 turned accented bytes into U+FFFD, so two different words compared equal
  and a correct translation came back as possibly untranslated. `--encoding`
  names an encoding for everything else, and translint prints a line to stderr
  whenever a decode wasn't clean instead of degrading quietly.
- `--format` now also drops the extension filter on a directory scan. The README
  called it the escape hatch for a non-standard extension, but a directory of
  `en.lang` files still came back "no locale files found".
- The `--json` contract is documented: all ten keys, and what `ok` does and
  doesn't cover (hard findings only, so under `--strict` a locale can be
  `"ok": true` in a run that exits 1).
- The site's install command, usage list and footer license match the README
  again, and the example output uses the paths the CLI actually prints.
  Install points at the repo rather than PyPI, which is two releases behind
  and under the old license.
- `--fix` on a JSON array wrote a second `"days"` member holding
  `{"2": ...}` next to the existing array. JSON parsers keep the last of two
  duplicate members, so the translations already in the array disappeared.
  A missing element is now appended to the array, a missing array is written
  as an array, and a key that could only go in by shadowing a value of
  another shape is left out and named on stderr.
- Plural keys follow each locale's own CLDR plural forms. A correct Japanese
  file failed CI for lacking `file_one`, a correct Russian `file_few` came
  back as an extra key and its `{{count}}` as a placeholder mismatch, a
  Russian file missing `file_few` passed, and `--fix` stubbed a `file_one`
  into `ja.json`. Rails-style nested `one:`/`other:` sets get the same rules.
- Typed arguments are placeholders now: ICU and Java `MessageFormat`
  `{amount, number, currency}` and `{0,number,integer}`, plus i18next's
  `{{val, number}}` and `{{- name}}`. They used to produce no token at all, so
  a translation that dropped one passed. A value that is only `{{ name }}`
  (with spaces) is no longer called possibly untranslated.
- `--fix` works out every write before it makes any. A run that stopped with
  exit 2 on a later namespace (a file that won't decode, a YAML file) could
  already have rewritten the files that came before it.
- `--fix` no longer writes a second `msgid` for a `.po` entry that's already
  in the file as fuzzy or obsolete (`#~`), which is what msgmerge leaves
  behind, or for its own fuzzy entry on a second run. `msgfmt` stopped on the
  duplicate definition. Those keys are named on stderr instead.
- `--fix` on a `.properties` file whose last line ends in a continuation
  backslash puts a blank line first, so the new key no longer becomes part
  of that value. A dangling backslash at the very end of a file is dropped
  when reading, the way `java.util.Properties` does it.
- A YAML file whose aliases repeat it past a million keys exits 2 in under a
  second. 300 bytes of nested aliases used to run for minutes. Anchors and
  `<<: *defaults` merge keys load as before.
- `.translintrc.json` is checked. `"allow_identical": "brand"` exits 2
  instead of quietly becoming `["b", "r", "a", "n", "d"]`, and an unknown
  key like `allow-identical` gets a warning. The file is also found next to
  files named one by one or with a glob, so `translint 'locales/*.json'`
  gives the same verdict as `translint locales`.
- A path that doesn't exist says so, instead of "no file named 'en' found
  among: locale".
- `%(name)s` with flags, a width or a precision (`%(price).2f`) extracts a
  token. It extracted nothing, so a translation that dropped one passed.
- printf length modifiers (`%lu`, `%ld`, `%zd`, `%zu`) and the `%u`/`%c`
  conversions are recognized.
- ICU `plural`/`select`/`selectordinal` arguments count as one placeholder,
  the argument name. The branch text is prose to translate, so a correct
  French translation of the branches no longer reads as a placeholder
  mismatch or as untranslated.
- `.po` entries that aren't separated by a blank line (msgfmt accepts that)
  no longer merge into one garbage key.
- A path that exists but has glob characters in its name (`loc[1]`) is used
  as given instead of failing with "no files match".
- `msgctxt` keys print as `msgid (msgctxt=...)` in the report and as
  gettext's own `msgctxt\x04msgid` string in `--json`, instead of a raw
  tuple and a JSON array.
- A bare `.properties` key with no separator and no value is an empty value,
  not a missing key.
- pyproject.toml lost a leftover non-commercial license classifier that
  contradicted the license.

Added in 0.5.0:

- Flutter `.arb` files. `@`-prefixed metadata stays out of the comparison,
  the locale comes from `@@locale` or the end of the name (`app_de.arb`),
  and `--fix` adds a missing message without touching the metadata. Forcing
  `--format json` on them used to report the metadata as missing keys.
- `--fix`, scoped narrowly on purpose. It inserts a key that's entirely
  missing from a locale file, tagged with an unmissable `[UNTRANSLATED]`
  marker (`.po` gets its own `fuzzy` flag instead, which `parse_po` already
  treats as not a live translation). A key it inserted keeps failing the run
  as an `untranslated_markers` finding until someone translates it. It never
  writes real translated text and never touches a key that already exists:
  not a placeholder mismatch, not an empty value, and never the
  identical-to-base heuristic, which stays report-only. It never reformats a
  file either. A JSON key goes into the object its path names, a `.po` entry
  or `.properties` line goes at the end of the file, and the diff is the new
  key(s) plus the one comma JSON needs. It refuses to rewrite a file it can't
  decode instead of writing U+FFFD back, and keeps a UTF-8 byte-order mark.
  `--fix --dry-run` previews what would land without writing. Default
  behavior (report-only, no writes) is unchanged.
- YAML locale files (`.yml`/`.yaml`) - the default Rails i18n layout and a
  common Vue/Nuxt one. It's the one format that isn't zero-dependency:
  reading a `.yml` file needs `pip install translint[yaml]` (PyYAML), and
  `yaml` is only imported the moment a YAML file is actually loaded, so
  every other format still needs nothing. `--fix` doesn't write YAML back
  yet; missing keys in a `.yml` file are reported like any other finding.
  The `en:` root every Rails file starts with is read through when it names
  the file's own locale (`no:` for Norwegian too, which YAML reads as
  false), and `devise.de.yml` is compared against `devise.en.yml`. The
  pre-commit hook runs on `.yml`/`.yaml` changes (give it
  `additional_dependencies: ["PyYAML>=5.1"]`), and the GitHub Action takes
  `yaml: "true"` to install PyYAML on the runner. CI runs the YAML tests
  with PyYAML installed.

## v0.4.0 - 2026-07-15

Placeholder-engine correctness release. CONTRIBUTING.md calls placeholder false
positives the worst bug class this tool can have; an audit found five in the
flagship check, and all five are fixed here, each with its failing test written
first.

- "Costs $5" no longer reads as a `$5` placeholder, so a translation that
  reorders the currency symbol ("5 $" in French typography) stops hard-failing
  CI. Bare `$name` detection requires a letter or underscore after the `$` now.
- printf width/precision/flag forms - `%.2f`, `%5d`, `%-10s` - get extracted.
  A translation that dropped `%.2f` passed silently before, and that's exactly
  the crash this tool exists to catch.
- A bare-form base (`%s ... %d`) reordered with numbered arguments in the
  translation (`%2$d ... %1$s`) is accepted, matching `msgfmt -c`. A changed or
  missing conversion still flags.
- `.po` entries marked `#, fuzzy` are skipped, as the docstring always
  promised. msgfmt doesn't compile them, so they aren't live translations.
- `.properties` files decode `\uXXXX` escapes (plus `\t`, `\n`, `\r`, `\f`),
  so native2ascii-era Java bundles read as real characters instead of the
  literal string `u00e9`.

More fixes that shipped in the same tag:

- Two bare printf conversions of different types swapped around (`%s ... %d`
  to `%d ... %s`) are a mismatch. The token multiset is the same, so it read
  as clean, but the base's argument tuple crashes against the reordered
  string. A numbered reorder (`%2$d ... %1$s`) is still accepted.
- `.po` entries with a `msgctxt` are keyed by context and msgid, so two
  entries sharing one msgid ("Close" the verb and "Close" the adjective) no
  longer overwrite each other.
- `.properties` lines that separate key and value with plain whitespace
  (`key value`), which `java.util.Properties` accepts, are read instead of
  dropped.
- The report is printed as UTF-8, so a ja/ar/th run on a Windows console no
  longer dies partway through.

Repo hygiene in the same release:

- The README stopped promising a paste-your-files browser playground the site
  doesn't have yet, and gained a terminal demo.
- ci.yml pins its actions to full commit SHAs like the other workflows, and a
  new CI job fails the build when the version strings in pyproject.toml,
  translint.py, plugin.json, and the site wordmark disagree. That drift
  shipped once already; plugin.json sat on 0.1.0 for two releases.
- Checkout no longer persists credentials, and Dependabot bumps the pinned
  actions after a 7-day cooldown.
- Releases go to PyPI through a trusted-publishing workflow.
- CI runs translint over the site's own 32 catalogs.
- `report()` lost its dead `quiet` parameter; `--quiet` no longer builds a
  report it throws away.

## v0.3.0 - 2026-07-08

The site speaks 32 languages.

- https://munzzyy.github.io/translint/ reads in 32 languages, picked from the
  header and remembered on-device. Arabic, Hebrew, and Persian flip the whole
  layout right-to-left - except the embedded demo output, which stays
  left-to-right because that's literally what the CLI prints.
- A linter for translations should practice what it lints: the catalogs went
  through the same key-parity and placeholder discipline translint enforces on
  yours, and a review pass still caught real bugs - Turkish "Site" (a housing
  complex, not a website) and German compound hyphens reaching into the
  "Claude Code" and "Agent Skills" proper nouns.
- The linter itself is unchanged.

## v0.2.0 - 2026-07-07

A website and two fixes.

- https://munzzyy.github.io/translint/ - what it checks, how to install it,
  and a demo showing real output from the bundled examples. Nine switchable
  themes, works on a phone.
- .properties parsing: a value ending in an escaped backslash plus the
  continuation marker (three trailing backslashes) silently dropped its
  continuation line. Any odd trailing count continues now, matching
  java.util.Properties.
- The GitHub Action routes its inputs through env vars instead of splicing
  them into the shell script. Dynamic input values reach the script as data,
  not as shell text.

## v0.1.0 - 2026-07-07

First release. translint checks locale files against a base and flags missing
keys, placeholder mismatches, empty values, and values left identical to the
base (a heuristic, with a per-key allowlist). Works across JSON (nested or
flat), gettext .po, and Java .properties. One stdlib Python file, no
dependencies, no network. Runs four ways: CLI, pre-commit hook, GitHub Action,
agent skill. Exit 0 when clean, 1 when it finds problems, so it gates CI.
