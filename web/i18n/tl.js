// Filipino (tl). Natural Taglish code-switching (key, placeholder, heuristic
// stay in English mid-sentence, as real Filipino developer writing does).
// See GLOSSARY.md for term choices and the do-not-translate list (translint,
// CLI flags, filenames, extensions, exit-code digits, and the literal
// curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - isang linter para sa mga locale file mo",
  "meta.description":
    "Ang translint ay isang CLI na walang dependencies na nagche-check ng mga locale file laban sa isang base file at nagfa-flag ng mga missing key, placeholder mismatches, empty na values, at mga hindi pa isinaling strings. Isang Python file lang, standard library lang.",

  "skipLink": "Lumaktaw sa pangunahing content",
  "nav.ariaLabel": "Site",
  "theme.switcherLabel": "Tema",
  "theme.ariaLabel": "Kulay ng tema",
  "lang.switcherLabel": "Wika",
  "lang.ariaLabel": "Wika ng interface",

  "hero.tagline": "Ang nawawalang translation ay isang UI bug. Ang pinalitan ng pangalan na placeholder ay isang crash.",
  "hero.description1":
    "Chine-check ng translint ang mga locale file mo laban sa isang base file at ino-flag talaga ito: mga missing key, mga natirang extra key, empty na values, mga value na parang hindi pa rin isinalin, at mga placeholder na hindi tugma sa pagitan ng base string at ng translation - yung isa na talagang nagpapabagsak ng app. Isang Python file lang, standard library lang, zero dependencies.",
  "hero.description2":
    "Patakbuhin mo ito bilang CLI nang manual o sa loob ng pre-commit hook, bilang isang GitHub Action na nagbabantay sa CI, o bilang agent skill para ma-check ni Claude Code (o kahit anong agent na gumagamit ng open na Agent Skills standard) ang sarili niyang mga pagbabago sa i18n bago ka bigyan ng PR.",

  "install.heading": "Pag-install",
  "install.altIntro": "O laktawan na lang ang pag-install, dahil isang file lang naman ito na walang dependencies:",

  "usage.heading": "Paggamit",
  "usage.exitCodes":
    "Ang --base ay en bilang default - ang locale name (pangalan ng file na walang extension) na kinukumpara sa bawat ibang natagpuang file. Ang exit code ay 0 kapag malinis ang lahat, 1 kapag may nakita ang translint na dapat ayusin, 2 kapag talagang hindi na-read o na-parse ang isang path - hindi kailanman magkamukha para sa isang script ang isang sirang JSON error at isang totoong lint finding.",

  "demo.heading": "Panoorin itong makahuli ng problema",
  "demo.intro":
    "Totoong output ito, hindi mockup. May isang base file (en.json) at dalawang translation (fr.json, de.json) ang examples/locales/ sa repo, may ilang totoo at sadyang inilagay na problema. Nasa baba ang translint na pinatakbo laban sa mga ito, kinopya nang verbatim - ang mga kategoryang pula ang nagpapabagsak sa run bilang default, ang mga amber ay ripor-ted lang pero bumabagsak lang kapag may --strict.",
  "demo.terminalAriaLabel": "Terminal output mula sa translint",
  "demo.note":
    "Nag-e-exit ang translint nang may 1 tuwing may dapat ayusin. Ang exit na 0 ay nangangahulugang malinis ang bawat locale; ang exit na 2 ay nangangahulugang hindi man lang na-read o na-parse ang isang path. Subukan mo mismo laban sa parehong mga file na ito: translint examples/locales --base en.",

  "features.heading": "Ano ang chine-check nito",

  "features.missingKeys.title": "Mga missing key",
  "features.missingKeys.desc": "Isang key na meron sa base locale pero hindi kailanman naisama sa isang translation.",

  "features.placeholderMismatches.title": "Mga placeholder mismatch",
  "features.placeholderMismatches.desc":
    "Naging {total} ang {amount} - ang bug na maayos na tumatakbo sa bawat test na hindi nagpapasa ng totoong interpolation data, at bumabagsak sa mismong sandaling may gumawa nito.",

  "features.emptyValues.title": "Mga empty na value",
  "features.emptyValues.desc": "Isang key na meron pero hindi kailanman napunan.",

  "features.extraKeys.title": "Mga extra key",
  "features.extraKeys.desc": "Naiwan mula sa isang rename. Ripor-ted, pero hindi nito pinapabagsak ang run maliban kung gagamit ka ng --strict.",

  "features.possiblyUntranslated.title": "Posibleng hindi pa isinalin",
  "features.possiblyUntranslated.desc":
    "Isang heuristic: mukhang byte-for-byte pa ring kapareho ng base ang value pagkatapos alisin ang mga placeholder, punctuation, at numero. Payagan ang mga totoong match gamit ang --allow-identical o --do-not-translate.",

  "features.fileFormats.title": "Tatlong file format",
  "features.fileFormats.desc":
    "JSON (nested o flat na keys na may dot notation), gettext .po/.pot, at Java .properties, awtomatikong nadidetect ayon sa extension.",

  "features.placeholderStyles.title": "Limang placeholder style",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, at ${name}/$name, kinukumpara bilang multiset para hindi makalusot ang isang duplicate na placeholder.",

  "features.scriptableOutput.title": "Output na pwedeng i-script",
  "features.scriptableOutput.desc":
    "Nagpi-print ang --json ng mga resultang machine-readable. Kasing-script-friendly rin ng mga exit code: 0 malinis, 1 may findings, 2 hindi na-read o na-parse.",

  "features.runsThreeWays.title": "Tumatakbo sa tatlong paraan",
  "features.runsThreeWays.desc":
    "Bilang CLI nang manual o sa loob ng pre-commit hook, bilang isang GitHub Action na nagbabantay sa CI, o bilang skill ng Claude Code / Agent Skills, para ma-check ng isang coding agent ang sarili niyang mga pagbabago sa i18n bago magbalik ng PR.",

  "limits.heading": "Ano ang hindi nito ginagawa",
  "limits.noYaml": "Walang YAML locale file. Ang secure na pag-parse ng YAML ay nangangailangan ng dependency, at ang translint ay sadyang stdlib-only lang.",
  "limits.heuristicOnly":
    "Ang pag-check ng mga hindi isinaling value ay isang heuristic, hindi isang mahigpit na rule. Ino-flag nito kung ano ang mukhang hindi pa isinalin; wala itong pinapatunayan.",
  "limits.noTranslationQuality":
    "Hindi ito nagsasalin ng kahit ano, at hindi rin nito vine-verify ang kalidad ng translation - structure lang: mga key, placeholder, kung hindi empty ang mga value.",
  "limits.nonRecursive":
    "Non-recursive na pag-scan ng directory. Ituro mo ito sa isang directory at che-check-in nito ang mga file na direktang nasa loob, hindi ang mga subdirectory.",

  "footer.license": "Prosperity Public License 3.0.0 - libre para sa non-commercial na paggamit.",
};
