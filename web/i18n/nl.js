// Dutch (nl). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - een linter voor je locale-bestanden",
  "meta.description":
    "translint is een CLI zonder dependencies die locale-bestanden vergelijkt met een basisbestand en ontbrekende sleutels, placeholder-mismatches, lege waarden en onvertaalde teksten signaleert. Eén Python-bestand, alleen de standaardbibliotheek.",

  "skipLink": "Naar hoofdinhoud",
  "nav.ariaLabel": "Site",
  "theme.switcherLabel": "Thema",
  "theme.ariaLabel": "Kleurthema",
  "lang.switcherLabel": "Taal",
  "lang.ariaLabel": "Interfacetaal",

  "hero.tagline": "Een ontbrekende vertaling is een UI-bug. Een hernoemde placeholder is een crash.",
  "hero.description1":
    "translint vergelijkt je locale-bestanden met een basisbestand en signaleert precies dat: ontbrekende sleutels, achtergebleven overtollige sleutels, lege waarden, waarden die er nog onvertaald uitzien, en placeholders die niet overeenkomen tussen de basisstring en de vertaling - degene die een app echt onderuit haalt. Eén Python-bestand, alleen de standaardbibliotheek, zero dependencies.",
  "hero.description2":
    "Draai het als CLI met de hand of in een pre-commit hook, als GitHub Action die de CI blokkeert, of als agent skill zodat Claude Code (of elke agent die de open Agent Skills-standaard gebruikt) zijn eigen i18n-wijzigingen controleert voordat hij je een PR teruggeeft.",

  "install.heading": "Installeren",
  "install.altIntro": "Of sla de installatie over, want het is maar één bestand zonder dependencies:",

  "usage.heading": "Gebruik",
  "usage.exitCodes":
    "--base staat standaard op en - de locale-naam (bestandsnaam zonder extensie) waartegen elk ander gevonden bestand wordt gecontroleerd. De exit-code is 0 als alles schoon is, 1 als translint iets heeft gevonden om te fixen, 2 als een pad helemaal niet gelezen of geparsed kon worden - een kapotte JSON-fout en een echte lint-bevinding zien er voor een script nooit hetzelfde uit.",

  "demo.heading": "Zie het iets vinden",
  "demo.intro":
    "Dit is echte output, geen mockup. examples/locales/ in de repo bevat één basisbestand (en.json) en twee vertalingen (fr.json, de.json) met een handvol echte, expres ingebouwde problemen. Hieronder staat translint tegen die bestanden uitgevoerd, letterlijk gekopieerd - rode categorieën laten de run standaard falen, amberkleurige worden gemeld maar falen alleen onder --strict.",
  "demo.terminalAriaLabel": "Terminaloutput van translint",
  "demo.note":
    "translint sluit af met 1 zodra er iets te fixen is. Exit 0 betekent dat elke locale schoon is; exit 2 betekent dat een pad zelfs niet gelezen of geparsed kon worden. Probeer het zelf tegen dezelfde bestanden: translint examples/locales --base en.",

  "features.heading": "Wat het controleert",

  "features.missingKeys.title": "Ontbrekende sleutels",
  "features.missingKeys.desc": "Een sleutel die in de basislocale bestaat maar nooit in een vertaling terecht is gekomen.",

  "features.placeholderMismatches.title": "Placeholder-mismatches",
  "features.placeholderMismatches.desc":
    "{amount} werd {total} - de bug die in elke test zonder echte interpolatiedata gewoon goed lijkt te gaan, en crasht zodra er wel een is.",

  "features.emptyValues.title": "Lege waarden",
  "features.emptyValues.desc": "Een sleutel die bestaat maar nooit is ingevuld.",

  "features.extraKeys.title": "Overtollige sleutels",
  "features.extraKeys.desc": "Restant van een hernoeming. Wordt gemeld, maar laat de run niet falen tenzij je --strict meegeeft.",

  "features.possiblyUntranslated.title": "Mogelijk onvertaald",
  "features.possiblyUntranslated.desc":
    "Een heuristiek: de waarde leest nog steeds byte-voor-byte identiek aan de basis nadat placeholders, leestekens en cijfers zijn weggehaald. Sta echte overeenkomsten toe met --allow-identical of --do-not-translate.",

  "features.fileFormats.title": "Drie bestandsformaten",
  "features.fileFormats.desc":
    "JSON (geneste of platte sleutels met puntnotatie), gettext .po/.pot, en Java .properties, automatisch gedetecteerd op basis van de extensie.",

  "features.placeholderStyles.title": "Vijf placeholder-stijlen",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, en ${name}/$name, vergeleken als multiset zodat een dubbele placeholder er niet doorheen glipt.",

  "features.scriptableOutput.title": "Scriptbare output",
  "features.scriptableOutput.desc":
    "--json print machineleesbare resultaten. Exit-codes zijn net zo scriptvriendelijk: 0 schoon, 1 bevindingen, 2 kon niet gelezen of geparsed worden.",

  "features.runsThreeWays.title": "Werkt op drie manieren",
  "features.runsThreeWays.desc":
    "Als CLI met de hand of in een pre-commit hook, als GitHub Action die de CI blokkeert, of als Claude Code / Agent Skills skill, zodat een coding agent zijn eigen i18n-wijzigingen controleert voordat hij een PR teruggeeft.",

  "limits.heading": "Wat het niet doet",
  "limits.noYaml": "Geen YAML-locale-bestanden. YAML veilig parsen vereist een dependency, en translint is met opzet alleen-stdlib.",
  "limits.heuristicOnly":
    "De controle op onvertaalde waarden is een heuristiek, geen harde regel. Hij signaleert wat er onvertaald uitziet; hij bewijst niets.",
  "limits.noTranslationQuality":
    "Het vertaalt niets, en het valideert geen vertaalkwaliteit - alleen structuur: sleutels, placeholders, niet-lege waarden.",
  "limits.nonRecursive":
    "Niet-recursieve directoryscan. Wijs het naar een directory en het controleert de bestanden die er direct in staan, niet de submappen.",

  "footer.license": "Prosperity Public License 3.0.0 - vrij voor niet-commercieel gebruik.",
};
