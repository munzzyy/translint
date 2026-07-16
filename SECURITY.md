# Security

translint is a single-file, offline linter. It reads locale files you point
it at (JSON, .po, .properties) and prints a report to stdout. It doesn't
make network calls and doesn't read credentials. Parsing never uses
`eval`/`exec` - JSON goes through `json.loads`, and the .po/.properties
parsers are plain text/regex processing, so a malicious locale file can't
run code through translint.

By default it doesn't write anything besides its own stdout. The one
opt-in exception is `--fix`, which rewrites the locale files you pass it -
and only ever to append a key that's entirely missing, tagged with an
unmissable marker (see the README's "Fix mode" section). It never
overwrites an existing key, never runs code from the file it's editing,
and never touches the network. `--fix --dry-run` shows exactly what it
would write without touching disk.

The realistic attack surface is small, but if you find something, here's
how to report it.

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
