# Changelog

The same notes ship as [GitHub releases](https://github.com/munzzyy/translint/releases).

## v0.4.0 (unreleased)

`--fix` - scoped narrowly on purpose. It inserts a key that's entirely missing
from a locale file, tagged with an unmissable `[UNTRANSLATED]` marker (`.po`
gets its own `fuzzy` flag instead, which `parse_po` already treats as not a
live translation, so a fixed key still reads back as missing until someone
actually translates it). It never writes real translated text, never touches
a key that already exists - not a placeholder mismatch, not an empty value,
and never the identical-to-base heuristic, which stays report-only forever -
and never reformats a file: new keys are appended, so the diff a fix produces
is exactly the new key(s) and nothing else. `--fix --dry-run` previews what
would land without writing. Default behavior (report-only, no writes) is
unchanged; `--fix` is opt-in.

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

Repo hygiene in the same release:

- The README says `pip install translint` - it's been on PyPI since 0.3.0 -
  and stopped promising a paste-your-files browser playground the site doesn't
  have yet.
- ci.yml pins its actions to full commit SHAs like the other workflows, and a
  new CI job fails the build when the version strings in pyproject.toml,
  translint.py, plugin.json, and the site wordmark disagree. That drift
  shipped once already; plugin.json sat on 0.1.0 for two releases.
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
