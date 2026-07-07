// Norwegian Bokmål (nb). See GLOSSARY.md for term choices and the
// do-not-translate list (translint, CLI flags, filenames, extensions,
// exit-code digits, and the literal curly-brace examples in the two
// placeholder-syntax keys).

export default {
  "meta.title": "translint - en linter for locale-filene dine",
  "meta.description":
    "translint er en CLI uten avhengigheter som sjekker locale-filer mot en grunnfil og flagger manglende nøkler, plassholdere som ikke stemmer, tomme verdier og uoversatte strenger. Én Python-fil, bare standardbiblioteket.",

  "skipLink": "Hopp til hovedinnhold",
  "nav.ariaLabel": "Nettsted",
  "theme.switcherLabel": "Tema",
  "theme.ariaLabel": "Fargetema",
  "lang.switcherLabel": "Språk",
  "lang.ariaLabel": "Grensesnittspråk",

  "hero.tagline": "En manglende oversettelse er en UI-bug. En omdøpt plassholder er en krasj.",
  "hero.description1":
    "translint sjekker locale-filene dine mot en grunnfil og flagger nettopp det: manglende nøkler, gjenglemte overflødige nøkler, tomme verdier, verdier som fortsatt ser uoversatte ut, og plassholdere som ikke stemmer overens mellom grunnstrengen og oversettelsen - den som faktisk krasjer en app. Én Python-fil, bare standardbiblioteket, null avhengigheter.",
  "hero.description2":
    "Kjør det som CLI for hånd eller i en pre-commit-hook, som en GitHub Action som sperrer CI, eller som en agent skill slik at Claude Code (eller en hvilken som helst agent som bruker den åpne Agent Skills-standarden) sjekker sine egne i18n-endringer før den leverer en PR tilbake til deg.",

  "install.heading": "Installasjon",
  "install.altIntro": "Eller hopp over installasjonen, siden det er én fil uten avhengigheter:",

  "usage.heading": "Bruk",
  "usage.exitCodes":
    "--base er som standard en - locale-navnet (filnavnet uten filtype) som hver andre oppdagede fil sjekkes mot. Avslutningskoden er 0 når alt er rent, 1 når translint fant noe å fikse, 2 hvis en sti ikke kunne leses eller tolkes i det hele tatt - en ødelagt JSON-feil og et ekte lint-funn ser aldri like ut for et skript.",

  "demo.heading": "Se det oppdage noe",
  "demo.intro":
    "Dette er ekte output, ikke en mockup. examples/locales/ i repoet inneholder én grunnfil (en.json) og to oversettelser (fr.json, de.json) med noen ekte, bevisst plantede problemer. Under er translint kjørt mot dem, kopiert ordrett - røde kategorier gjør at kjøringen feiler som standard, gule blir rapportert men feiler bare med --strict.",
  "demo.terminalAriaLabel": "Terminalutdata fra translint",
  "demo.note":
    "translint avslutter med 1 hver gang det er noe å fikse. Avslutning med 0 betyr at hver locale er ren; avslutning med 2 betyr at en sti ikke engang kunne leses eller tolkes. Prøv det selv mot de samme filene: translint examples/locales --base en.",

  "features.heading": "Hva den sjekker",

  "features.missingKeys.title": "Manglende nøkler",
  "features.missingKeys.desc": "En nøkkel som finnes i grunnlocalen, men som aldri kom med i en oversettelse.",

  "features.placeholderMismatches.title": "Plassholdere som ikke stemmer",
  "features.placeholderMismatches.desc":
    "{amount} ble til {total} - buggen som ser helt fin ut i enhver test som ikke sender ekte interpoleringsdata, og krasjer i samme øyeblikk som en gjør det.",

  "features.emptyValues.title": "Tomme verdier",
  "features.emptyValues.desc": "En nøkkel som finnes, men som aldri ble fylt ut.",

  "features.extraKeys.title": "Overflødige nøkler",
  "features.extraKeys.desc": "Rest fra en omdøping. Blir rapportert, men gjør ikke at kjøringen feiler med mindre du bruker --strict.",

  "features.possiblyUntranslated.title": "Mulig uoversatt",
  "features.possiblyUntranslated.desc":
    "En heuristikk: verdien leser fortsatt byte-for-byte identisk med grunnverdien etter at plassholdere, tegnsetting og tall er fjernet. Tillat ekte treff med --allow-identical eller --do-not-translate.",

  "features.fileFormats.title": "Tre filformater",
  "features.fileFormats.desc":
    "JSON (nøstede eller flate nøkler med punktnotasjon), gettext .po/.pot, og Java .properties, autodetektert ut fra filtypen.",

  "features.placeholderStyles.title": "Fem plassholderstiler",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, og ${name}/$name, sammenlignet som en multi-mengde slik at en duplisert plassholder ikke slipper gjennom.",

  "features.scriptableOutput.title": "Skriptbar output",
  "features.scriptableOutput.desc":
    "--json skriver ut maskinlesbare resultater. Avslutningskodene er like skriptvennlige: 0 rent, 1 funn, 2 kunne ikke leses eller tolkes.",

  "features.runsThreeWays.title": "Fungerer på tre måter",
  "features.runsThreeWays.desc":
    "Som CLI for hånd eller i en pre-commit-hook, som en GitHub Action som sperrer CI, eller som en Claude Code / Agent Skills-skill, slik at en kodende agent sjekker sine egne i18n-endringer før den leverer tilbake en PR.",

  "limits.heading": "Hva den ikke gjør",
  "limits.noYaml": "Ingen YAML-locale-filer. Å tolke YAML trygt krever en avhengighet, og translint er bevisst bare-stdlib.",
  "limits.heuristicOnly":
    "Sjekken av uoversatte verdier er en heuristikk, ikke en fast regel. Den flagger det som ser uoversatt ut; den beviser ingenting.",
  "limits.noTranslationQuality":
    "Den oversetter ingenting, og den validerer ikke oversettelseskvalitet - bare struktur: nøkler, plassholdere, at verdier ikke er tomme.",
  "limits.nonRecursive":
    "Ikke-rekursivt katalogsøk. Pek det mot en katalog, så sjekker det filene direkte inni den, ikke undermapper.",

  "footer.license": "Prosperity Public License 3.0.0 - fri for ikke-kommersiell bruk.",
};
