// Danish (da). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - en linter til dine locale-filer",
  "meta.description":
    "translint er en CLI uden afhængigheder, der tjekker locale-filer op mod en basisfil og markerer manglende nøgler, pladsholdere der ikke stemmer, tomme værdier og uoversatte strenge. Én Python-fil, kun standardbiblioteket.",

  "skipLink": "Spring til hovedindhold",
  "nav.ariaLabel": "Websted",
  "theme.switcherLabel": "Tema",
  "theme.ariaLabel": "Farvetema",
  "lang.switcherLabel": "Sprog",
  "lang.ariaLabel": "Grænsefladesprog",

  "hero.tagline": "En manglende oversættelse er en UI-bug. En omdøbt pladsholder er et nedbrud.",
  "hero.description1":
    "translint tjekker dine locale-filer op mod en basisfil og markerer netop det: manglende nøgler, glemte overskydende nøgler, tomme værdier, værdier der stadig ser uoversatte ud, og pladsholdere der ikke stemmer overens mellem basisstrengen og oversættelsen - den der faktisk vælter en app. Én Python-fil, kun standardbiblioteket, ingen afhængigheder.",
  "hero.description2":
    "Kør det som CLI i hånden eller i et pre-commit-hook, som en GitHub Action der spærrer CI, eller som en agent skill så Claude Code (eller enhver agent der bruger den åbne Agent Skills-standard) tjekker sine egne i18n-ændringer, før den afleverer en PR tilbage til dig.",

  "install.heading": "Installation",
  "install.altIntro": "Eller spring installationen over, siden det er én fil uden afhængigheder:",

  "usage.heading": "Brug",
  "usage.exitCodes":
    "--base er som standard en - locale-navnet (filnavnet uden filtype), som hver anden fundet fil tjekkes op imod. Afslutningskoden er 0, når alt er rent, 1, når translint fandt noget at rette, 2, hvis en sti slet ikke kunne læses eller parses - en ødelagt JSON-fejl og et rigtigt lint-fund ser aldrig ens ud for et script.",

  "demo.heading": "Se den fange noget",
  "demo.intro":
    "Det her er reel output, ikke en mockup. examples/locales/ i repoet indeholder én basisfil (en.json) og to oversættelser (fr.json, de.json) med en håndfuld reelle, bevidst plantede problemer. Nedenfor er translint kørt mod dem, kopieret ordret - røde kategorier fejler kørslen som standard, gule bliver rapporteret men fejler kun med --strict.",
  "demo.terminalAriaLabel": "Terminaloutput fra translint",
  "demo.note":
    "translint afslutter med 1, når som helst der er noget at rette. Exit 0 betyder, at hver locale er ren; exit 2 betyder, at en sti ikke engang kunne læses eller parses. Prøv det selv på de samme filer: translint examples/locales --base en.",

  "features.heading": "Hvad den tjekker",

  "features.missingKeys.title": "Manglende nøgler",
  "features.missingKeys.desc": "En nøgle, der findes i basis-locale'n, men aldrig kom med i en oversættelse.",

  "features.placeholderMismatches.title": "Pladsholdere der ikke stemmer",
  "features.placeholderMismatches.desc":
    "{amount} blev til {total} - fejlen der ser helt fin ud i enhver test, der ikke sender rigtige interpolationsdata, og som bryder sammen i samme øjeblik en gør.",

  "features.emptyValues.title": "Tomme værdier",
  "features.emptyValues.desc": "En nøgle, der findes, men aldrig blev udfyldt.",

  "features.extraKeys.title": "Overskydende nøgler",
  "features.extraKeys.desc": "Rest fra en omdøbning. Bliver rapporteret, men fejler ikke kørslen, medmindre du bruger --strict.",

  "features.possiblyUntranslated.title": "Muligvis uoversat",
  "features.possiblyUntranslated.desc":
    "En heuristik: værdien læser stadig byte-for-byte identisk med basis, efter pladsholdere, tegnsætning og tal er fjernet. Tillad rigtige match med --allow-identical eller --do-not-translate.",

  "features.fileFormats.title": "Tre filformater",
  "features.fileFormats.desc":
    "JSON (indlejrede eller flade nøgler med punktnotation), gettext .po/.pot, og Java .properties, autodetekteret ud fra filtypen.",

  "features.placeholderStyles.title": "Fem pladsholderstile",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, og ${name}/$name, sammenlignet som en multimængde, så en dubleret pladsholder ikke slipper igennem.",

  "features.scriptableOutput.title": "Scriptbar output",
  "features.scriptableOutput.desc":
    "--json udskriver maskinlæsbare resultater. Afslutningskoderne er lige så scriptvenlige: 0 rent, 1 fund, 2 kunne ikke læses eller parses.",

  "features.runsThreeWays.title": "Fungerer på tre måder",
  "features.runsThreeWays.desc":
    "Som CLI i hånden eller i et pre-commit-hook, som en GitHub Action der spærrer CI, eller som en Claude Code / Agent Skills-skill, så en kodende agent tjekker sine egne i18n-ændringer, før den afleverer en PR tilbage.",

  "limits.heading": "Hvad den ikke gør",
  "limits.noYaml": "Ingen YAML-locale-filer. At parse YAML sikkert kræver en afhængighed, og translint er bevidst kun-stdlib.",
  "limits.heuristicOnly":
    "Tjekket af uoversatte værdier er en heuristik, ikke en fast regel. Den markerer, hvad der ser uoversat ud; den beviser ingenting.",
  "limits.noTranslationQuality":
    "Den oversætter ingenting og validerer ikke oversættelseskvalitet - kun struktur: nøgler, pladsholdere, at værdier ikke er tomme.",
  "limits.nonRecursive":
    "Ikke-rekursiv mappescanning. Peg den på en mappe, så tjekker den filerne direkte i den, ikke undermapper.",

  "footer.license": "Prosperity Public License 3.0.0 - frit til ikke-kommerciel brug.",
};
