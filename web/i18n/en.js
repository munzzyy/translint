// English (en) - the canonical i18n catalog. Every other locale file MUST
// export exactly this key set (see GLOSSARY.md) - no missing keys, no extra
// keys. This file is also the template a future locale is copied from.
//
// ---------------------------------------------------------------------------
// TRANSLATION RULES (binding for every locale file, not just this one):
//
// 1. Do NOT translate "translint" - it's a proper noun (the product name).
//    Every locale keeps the literal word "translint" wherever English has it.
//
// 2. Do NOT translate CLI flags, filenames, file extensions, or exit-code
//    digits embedded in a sentence (--base, --strict, --json,
//    --allow-identical, --do-not-translate, en.json, fr.json, de.json,
//    examples/locales/, .po, .pot, .properties, the digits 0/1/2). These are
//    literal, must-not-vary tokens - keep them byte-identical to English,
//    embedded plainly in the translated sentence around them.
//
// 3. Keep general dev/i18n jargon recognizable rather than over-localized:
//    "CLI" and "JSON" stay as the English acronym in every language (that's
//    how developers everywhere actually write them). For "locale", "key",
//    "placeholder", "base" - use whatever term a real developer writing in
//    that language actually uses (sometimes a native word, sometimes the
//    English loanword); don't invent a stiff dictionary translation nobody
//    in that dev community would recognize. See GLOSSARY.md for the actual
//    term picked per locale.
//
// 4. `features.placeholderMismatches.desc` and `features.placeholderStyles.
//    desc` contain LITERAL curly-brace example text ("{amount}", "{name}",
//    "{{name}}", "${name}") that must render as-is, not be treated as real
//    {placeholder} interpolation. app.js calls these two keys via `t(key)`
//    with no params argument, so index.js's interpolate() short-circuits
//    and returns the template unprocessed - keep it that way; never pass a
//    params object to either of these two specific keys.
//
// 5. House voice: plain and direct, developer-to-developer, never stiff or
//    machine-translated. This is marketing/docs copy for a dev tool, not a
//    legal document - write like the README already reads.
// ---------------------------------------------------------------------------

export default {
  // ---- Meta / SEO ---------------------------------------------------------
  "meta.title": "translint - a linter for your locale files",
  "meta.description":
    "translint is a zero-dependency CLI that checks locale files against a base and flags missing keys, placeholder mismatches, empty values, and untranslated strings. One Python file, standard library only.",

  // ---- Header / global controls --------------------------------------------
  "skipLink": "Skip to main content",
  "nav.ariaLabel": "Site",
  "theme.switcherLabel": "Theme",
  "theme.ariaLabel": "Color theme",
  "lang.switcherLabel": "Language",
  "lang.ariaLabel": "Interface language",

  // ---- Hero -----------------------------------------------------------------
  "hero.tagline": "A missing translation is a UI bug. A renamed placeholder is a crash.",
  "hero.description1":
    "translint checks your locale files against a base file and flags exactly that: missing keys, stale extra keys, empty values, values that still look untranslated, and placeholder tokens that don't match between the base string and the translation - the one that actually takes an app down. One Python file, standard library only, zero dependencies.",
  "hero.description2":
    "Run it as a CLI by hand or in a pre-commit hook, as a GitHub Action that gates CI, or as an agent skill so Claude Code (or any agent using the open Agent Skills standard) checks its own i18n changes before handing a PR back to you.",

  // ---- Install --------------------------------------------------------------
  "install.heading": "Install",
  "install.altIntro": "Or skip installing it, since it's one file with no dependencies:",

  // ---- Usage ------------------------------------------------------------------
  "usage.heading": "Usage",
  "usage.exitCodes":
    "--base defaults to en - the locale name (filename stem) every other discovered file gets checked against. Exit code is 0 when everything's clean, 1 when translint found something to fix, 2 if a path couldn't be read or parsed at all - a bad-JSON error and a real lint finding never look the same to a script.",

  // ---- Demo -------------------------------------------------------------------
  "demo.heading": "See it catch something",
  "demo.intro":
    "This is real output, not a mockup. examples/locales/ in the repo ships one base file (en.json) and two translations (fr.json, de.json) with a handful of real, intentionally planted problems. Below is translint run against them, copied verbatim - red categories fail the run by default, amber ones are reported but only fail under --strict.",
  "demo.terminalAriaLabel": "Terminal output from translint",
  "demo.note":
    "translint exits 1 whenever there's something to fix. Exit 0 means every locale is clean; exit 2 means a path couldn't even be read or parsed. Try it yourself against these same files: translint examples/locales --base en.",

  // ---- Features -----------------------------------------------------------------
  "features.heading": "What it checks",

  "features.missingKeys.title": "Missing keys",
  "features.missingKeys.desc": "A key that exists in the base locale but never made it into a translation.",

  "features.placeholderMismatches.title": "Placeholder mismatches",
  "features.placeholderMismatches.desc":
    "{amount} became {total} - the bug that renders fine in every test that doesn't pass real interpolation data, and throws the moment one does.",

  "features.emptyValues.title": "Empty values",
  "features.emptyValues.desc": "A key that exists but was never filled in.",

  "features.extraKeys.title": "Extra keys",
  "features.extraKeys.desc": "Left over from a rename. Reported, but doesn't fail the run unless you pass --strict.",

  "features.possiblyUntranslated.title": "Possibly untranslated",
  "features.possiblyUntranslated.desc":
    "A heuristic: the value still reads byte-identical to the base after stripping placeholders, punctuation, and numbers. Allowlist real matches with --allow-identical or --do-not-translate.",

  "features.fileFormats.title": "Three file formats",
  "features.fileFormats.desc":
    "JSON (nested or flat dot-namespaced keys), gettext .po/.pot, and Java .properties, auto-detected by extension.",

  "features.placeholderStyles.title": "Five placeholder styles",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, and ${name}/$name, diffed as a multiset so a doubled placeholder doesn't slip through.",

  "features.scriptableOutput.title": "Scriptable output",
  "features.scriptableOutput.desc":
    "--json prints machine-readable results. Exit codes are just as script-friendly: 0 clean, 1 findings, 2 couldn't read or parse.",

  "features.runsThreeWays.title": "Runs three ways",
  "features.runsThreeWays.desc":
    "CLI by hand or in a pre-commit hook, a GitHub Action that gates CI, or a Claude Code / Agent Skills skill, so a coding agent checks its own i18n changes before handing back a PR.",

  // ---- Limits -------------------------------------------------------------------
  "limits.heading": "What it doesn't do",
  "limits.noYaml": "No YAML locale files. Parsing YAML safely needs a dependency, and translint is stdlib-only on purpose.",
  "limits.heuristicOnly":
    "The untranslated-value check is a heuristic, not a hard rule. It flags what looks untranslated; it doesn't prove anything.",
  "limits.noTranslationQuality":
    "It doesn't translate anything, and it doesn't validate translation quality - just structure: keys, placeholders, non-empty-ness.",
  "limits.nonRecursive":
    "Non-recursive directory scan. Point it at a directory and it checks the files directly inside, not subdirectories.",

  // ---- Footer ---------------------------------------------------------------------
  "footer.license": "Prosperity Public License 3.0.0 - free for noncommercial use.",
};
