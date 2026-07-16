# Contributing to translint

Thanks for looking at this. It's a small, single-maintainer project, so here's
what actually helps.

## What's wanted

- New placeholder styles, or fixes to the existing five. The most useful
  submissions include a real string in that style plus a test showing the
  extracted token set, since the placeholder check is the feature that
  actually catches runtime bugs and false positives there are the worst
  kind of bug this tool can have.
- Format support fixes: a .po or .properties edge case (multi-line values,
  escaped separators, plural forms) that doesn't parse the way it should.
- False-positive reports on the untranslated-value heuristic: a
  legitimately translated string that gets flagged anyway. Include the
  base value, the translated value, and whether `--allow-identical` or
  `--do-not-translate` would be the right fix for your case (if so, that's
  a config question, not necessarily a bug).
- Bug fixes, especially anything Windows-specific (this tool is used from
  PowerShell as much as bash, and path/encoding bugs tend to show up there
  first).
- Small, focused features. Check open issues first, there may already be
  one scoped out.

Things that are out of scope: YAML support (it needs a dependency, and
this tool is stdlib-only on purpose - see the README's "what it does NOT
do" section), an auto-translate mode of any kind (translint's job is to
tell you what's broken, not guess at a translation - `--fix` only ever
inserts a key that's missing entirely, tagged so it can never pass for a
real one, see the README's "Fix mode" section for the exact scoping),
and anything that adds a network call. A PR that adds a dependency, a
network call, or that widens `--fix` to touch a key that already
exists won't be merged, no matter how good the feature is.

## Dev setup

Clone it, no install needed:

```bash
git clone https://github.com/munzzyy/translint
cd translint
python -m pytest tests/ -q
```

That's it. Standard library only, so there's nothing to `pip install`
beyond `pytest` for running the test suite and `ruff` if you want to run
the same lint CI runs. Python 3.10+ (the CI matrix covers 3.10 through
3.14 on Ubuntu and Windows, check `.github/workflows/ci.yml` for the exact
matrix).

To try your change against a real locale set:

```bash
python translint.py tests/fixtures/json --base en
python translint.py tests/fixtures/json --base en --json
```

## Making a change

- `translint.py` is the whole tool. The parts you'll touch most:
  - `_RX_BRACE` / `_RX_DOUBLEBRACE` / `_RX_PYNAMED` / `_RX_PRINTF` /
    `_RX_DOLLAR` and `extract_placeholders()` - the five placeholder
    styles and how their matches get reconciled when two styles overlap
    syntactically (see the comment above them for the two known overlaps
    and why the match order matters).
  - `parse_json` / `parse_po` / `parse_properties` - one parser per
    format, each returning a flat `{dotted.key: value}` dict.
  - `check_locale()` - the comparison itself. Pure function, no I/O, so
    it's the same entry point the CLI and any importer call.
- Add fixtures under `tests/fixtures/` for anything format- or
  placeholder-related rather than only inline strings in the test file -
  the existing fixture directories (`json/`, `po/`, `properties/`,
  `nested/`) each pin a full set of planted issues end-to-end through the
  CLI, and a new format edge case usually fits best as one more locale
  file in an existing directory rather than a new top-level fixture set.
- Add a test in `tests/test_translint.py` for anything you change. Most
  tests call `check_locale()` or `extract_placeholders()` directly on a
  small dict/string, look at the existing tests for the pattern.
- Run the full suite and lint before opening the PR:

  ```bash
  python -m pytest tests/ -q
  python -m ruff check .
  ```

- Match the existing style: plain, direct comments, no type hints (the
  code doesn't use them anywhere), keep it stdlib-only. If a change needs
  a dependency, it's probably out of scope for this tool.

## Opening a PR

- Keep it focused. A parser fix and a new placeholder style in the same
  PR just makes it harder to review either.
- Explain what you tested it against, especially for placeholder-style or
  parser changes, since the risk is always a false positive/negative on a
  legitimate translation.
- I'll review these as I have time. This is a side project I maintain
  solo, so response time varies, don't read silence as a no. If it's been
  a couple weeks with no response, a polite bump is fine.

## Reporting bugs / requesting features

Use the issue templates, they ask for the couple of details that make a
report actionable (exact input, exact output, what you expected).

## License of contributions

translint is [MIT licensed](LICENSE). Opening a PR means you're offering your
change under the same MIT license.

## Security issues

Don't open a public issue for anything security-sensitive. See
[SECURITY.md](SECURITY.md).
