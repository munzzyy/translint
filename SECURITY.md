# Security

translint is a single-file offline linter. It reads the locale files you point
it at (JSON, Flutter .arb, .po, .properties and YAML) and prints a report to
stdout. It doesn't make network calls and doesn't read credentials. Parsing
never uses `eval`/`exec`. JSON and .arb go through `json.loads`. YAML goes
through PyYAML's `yaml.safe_load` and never `yaml.load`, which can build
arbitrary Python objects. The .po and .properties parsers are plain text and
regex processing. A malicious locale file can't run code through translint.
YAML aliases can make a few hundred bytes expand to millions of keys, so a
YAML file that expands past a million is refused before it can stall a CI run.

By default it doesn't write anything besides its own stdout. The one opt-in
exception is `--fix`, which rewrites the locale files you pass it. It only
ever inserts a key that's entirely missing, tagged with an unmissable marker.
In JSON the key goes into the object its path names. In .po and .properties it
goes at the end of the file (see the README's "Fix mode" section). It never
overwrites an existing key, never runs code from the file it's editing and
never touches the network. `--fix --dry-run` shows exactly what it would write
without touching disk.

The realistic attack surface is small. If you find something, here's how to
report it.

## Reporting a vulnerability

Please don't open a public issue for security problems. Use GitHub's
private reporting instead:

https://github.com/munzzyy/translint/security/advisories/new

That goes straight to the maintainer and isn't visible publicly until
it's resolved. Include what you found, how to reproduce it, and the
impact you'd expect.

## Supported versions

This project doesn't maintain long-term release branches. Fixes land on
the latest tagged version; there's no backport policy.
