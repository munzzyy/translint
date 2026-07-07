// Swedish (sv). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - en linter för dina locale-filer",
  "meta.description":
    "translint är en CLI utan beroenden som kontrollerar locale-filer mot en bas och flaggar saknade nycklar, platshållare som inte matchar, tomma värden och oöversatta strängar. En enda Python-fil, bara standardbiblioteket.",

  "skipLink": "Hoppa till huvudinnehåll",
  "nav.ariaLabel": "Webbplats",
  "theme.switcherLabel": "Tema",
  "theme.ariaLabel": "Färgtema",
  "lang.switcherLabel": "Språk",
  "lang.ariaLabel": "Gränssnittsspråk",

  "hero.tagline": "En saknad översättning är en UI-bugg. En omdöpt platshållare är en krasch.",
  "hero.description1":
    "translint kontrollerar dina locale-filer mot en basfil och flaggar precis det: saknade nycklar, kvarblivna extra nycklar, tomma värden, värden som fortfarande ser oöversatta ut, och platshållare som inte matchar mellan bassträngen och översättningen - den som faktiskt kraschar en app. En enda Python-fil, bara standardbiblioteket, noll beroenden.",
  "hero.description2":
    "Kör det som CLI för hand eller i en pre-commit-hook, som en GitHub Action som blockerar CI, eller som en agent skill så att Claude Code (eller vilken agent som helst som använder den öppna Agent Skills-standarden) kontrollerar sina egna i18n-ändringar innan den lämnar tillbaka en PR till dig.",

  "install.heading": "Installera",
  "install.altIntro": "Eller hoppa över installationen, eftersom det är en enda fil utan beroenden:",

  "usage.heading": "Användning",
  "usage.exitCodes":
    "--base är som standard en - locale-namnet (filnamnet utan ändelse) som varje annan hittad fil kontrolleras mot. Exitkoden är 0 när allt är rent, 1 när translint hittade något att fixa, 2 om en sökväg inte alls gick att läsa eller tolka - ett trasigt JSON-fel och ett riktigt lint-fynd ser aldrig likadana ut för ett skript.",

  "demo.heading": "Se det upptäcka något",
  "demo.intro":
    "Det här är riktig output, inte en mockup. examples/locales/ i repot innehåller en basfil (en.json) och två översättningar (fr.json, de.json) med några riktiga, avsiktligt inplanterade problem. Nedan är translint kört mot dem, kopierat ordagrant - röda kategorier gör att körningen misslyckas som standard, gula rapporteras men gör bara att den misslyckas med --strict.",
  "demo.terminalAriaLabel": "Terminalutdata från translint",
  "demo.note":
    "translint avslutas med 1 så fort det finns något att fixa. Exit 0 betyder att varje locale är ren; exit 2 betyder att en sökväg inte ens gick att läsa eller tolka. Testa själv mot samma filer: translint examples/locales --base en.",

  "features.heading": "Vad den kontrollerar",

  "features.missingKeys.title": "Saknade nycklar",
  "features.missingKeys.desc": "En nyckel som finns i baslocale men aldrig kom med i en översättning.",

  "features.placeholderMismatches.title": "Platshållare som inte matchar",
  "features.placeholderMismatches.desc":
    "{amount} blev {total} - buggen som fungerar perfekt i varje test som inte skickar riktig interpoleringsdata, och kraschar i samma stund som något gör det.",

  "features.emptyValues.title": "Tomma värden",
  "features.emptyValues.desc": "En nyckel som finns men aldrig fylldes i.",

  "features.extraKeys.title": "Extra nycklar",
  "features.extraKeys.desc": "Kvarleva från ett namnbyte. Rapporteras, men gör inte att körningen misslyckas om du inte anger --strict.",

  "features.possiblyUntranslated.title": "Möjligen oöversatt",
  "features.possiblyUntranslated.desc":
    "En heuristik: värdet läser fortfarande byte-identiskt med basen efter att platshållare, skiljetecken och siffror tagits bort. Tillåt riktiga träffar med --allow-identical eller --do-not-translate.",

  "features.fileFormats.title": "Tre filformat",
  "features.fileFormats.desc":
    "JSON (nästlade eller platta nycklar med punktnotation), gettext .po/.pot, och Java .properties, autodetekterade via filändelsen.",

  "features.placeholderStyles.title": "Fem platshållarstilar",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, och ${name}/$name, jämförda som en multiset så att en dubblerad platshållare inte slinker igenom.",

  "features.scriptableOutput.title": "Skriptbar output",
  "features.scriptableOutput.desc":
    "--json skriver ut maskinläsbara resultat. Exitkoderna är precis lika skriptvänliga: 0 rent, 1 fynd, 2 gick inte att läsa eller tolka.",

  "features.runsThreeWays.title": "Fungerar på tre sätt",
  "features.runsThreeWays.desc":
    "Som CLI för hand eller i en pre-commit-hook, som en GitHub Action som blockerar CI, eller som en Claude Code / Agent Skills-skill, så att en kodande agent kontrollerar sina egna i18n-ändringar innan den lämnar tillbaka en PR.",

  "limits.heading": "Vad den inte gör",
  "limits.noYaml": "Inga YAML-locale-filer. Att tolka YAML säkert kräver ett beroende, och translint är avsiktligt bara-stdlib.",
  "limits.heuristicOnly":
    "Kontrollen av oöversatta värden är en heuristik, inte en fast regel. Den flaggar det som ser oöversatt ut; den bevisar ingenting.",
  "limits.noTranslationQuality":
    "Den översätter ingenting, och den validerar inte översättningskvalitet - bara struktur: nycklar, platshållare, att värden inte är tomma.",
  "limits.nonRecursive":
    "Icke-rekursiv katalogskanning. Peka den mot en katalog så kontrollerar den filerna direkt inuti, inte underkataloger.",

  "footer.license": "Prosperity Public License 3.0.0 - fri för icke-kommersiellt bruk.",
};
