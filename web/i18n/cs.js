// Czech (cs). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - linter pro vaše soubory locale",
  "meta.description":
    "translint je CLI bez závislostí, které kontroluje soubory locale oproti základnímu souboru a označuje chybějící klíče, neshody placeholderů, prázdné hodnoty a nepřeložené řetězce. Jeden soubor Python, jen standardní knihovna.",

  "skipLink": "Přejít na hlavní obsah",
  "nav.ariaLabel": "Web",
  "theme.switcherLabel": "Motiv",
  "theme.ariaLabel": "Barevný motiv",
  "lang.switcherLabel": "Jazyk",
  "lang.ariaLabel": "Jazyk rozhraní",

  "hero.tagline": "Chybějící překlad je chyba UI. Přejmenovaný placeholder je pád aplikace.",
  "hero.description1":
    "translint kontroluje vaše soubory locale oproti základnímu souboru a označuje přesně tohle: chybějící klíče, zbylé nadbytečné klíče, prázdné hodnoty, hodnoty, které stále vypadají nepřeložené, a placeholdery, které si neodpovídají mezi základním řetězcem a překladem - ten, který opravdu shodí aplikaci. Jeden soubor Python, jen standardní knihovna, žádné závislosti.",
  "hero.description2":
    "Spouštějte ho jako CLI ručně nebo v pre-commit hooku, jako GitHub Action, který blokuje CI, nebo jako agent skill, aby Claude Code (nebo jakýkoli agent používající otevřený standard Agent Skills) zkontroloval vlastní i18n změny předtím, než vám vrátí PR.",

  "install.heading": "Instalace",
  "install.altIntro": "Nebo instalaci úplně přeskočte, protože je to jeden soubor bez závislostí:",

  "usage.heading": "Použití",
  "usage.exitCodes":
    "--base je ve výchozím stavu en - název locale (jméno souboru bez přípony), oproti kterému se kontroluje každý další nalezený soubor. Návratový kód je 0, když je vše v pořádku, 1, když translint našel něco k opravě, 2, pokud se cestu vůbec nepodařilo přečíst nebo naparsovat - chyba poškozeného JSON a skutečný nález lintu nikdy nevypadají pro skript stejně.",

  "demo.heading": "Podívejte se, jak něco odhalí",
  "demo.intro":
    "Tohle je skutečný výstup, ne maketa. examples/locales/ v repozitáři obsahuje jeden základní soubor (en.json) a dva překlady (fr.json, de.json) s několika skutečnými, záměrně nastrčenými problémy. Níže je translint spuštěný proti nim, zkopírovaný doslovně - červené kategorie ve výchozím stavu způsobí selhání běhu, jantarové se jen hlásí a selžou pouze s --strict.",
  "demo.terminalAriaLabel": "Výstup terminálu z translint",
  "demo.note":
    "translint skončí s kódem 1, kdykoli je něco k opravě. Ukončení s 0 znamená, že každá locale je čistá; ukončení s 2 znamená, že se cestu ani nepodařilo přečíst nebo naparsovat. Vyzkoušejte si to sami na stejných souborech: translint examples/locales --base en.",

  "features.heading": "Co kontroluje",

  "features.missingKeys.title": "Chybějící klíče",
  "features.missingKeys.desc": "Klíč, který existuje v základní locale, ale nikdy se nedostal do překladu.",

  "features.placeholderMismatches.title": "Neshody placeholderů",
  "features.placeholderMismatches.desc":
    "{amount} se změnil na {total} - chyba, která v každém testu bez skutečných interpolačních dat proběhne v pořádku, a spadne ve chvíli, kdy nějaký takový test přijde.",

  "features.emptyValues.title": "Prázdné hodnoty",
  "features.emptyValues.desc": "Klíč, který existuje, ale nikdy nebyl vyplněn.",

  "features.extraKeys.title": "Nadbytečné klíče",
  "features.extraKeys.desc": "Zbytek po přejmenování. Hlásí se, ale běh neshodí, pokud nepoužijete --strict.",

  "features.possiblyUntranslated.title": "Možná nepřeloženo",
  "features.possiblyUntranslated.desc":
    "Heuristika: hodnota po odstranění placeholderů, interpunkce a čísel stále čte bajt po bajtu shodně se základní hodnotou. Skutečné shody povolte pomocí --allow-identical nebo --do-not-translate.",

  "features.fileFormats.title": "Tři formáty souborů",
  "features.fileFormats.desc":
    "JSON (vnořené nebo ploché klíče s tečkovou notací), gettext .po/.pot a Java .properties, automaticky rozpoznané podle přípony.",

  "features.placeholderStyles.title": "Pět stylů placeholderů",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s a ${name}/$name, porovnávané jako multimnožina, aby zdvojený placeholder neproklouzl.",

  "features.scriptableOutput.title": "Skriptovatelný výstup",
  "features.scriptableOutput.desc":
    "--json vypíše strojově čitelné výsledky. Návratové kódy jsou stejně vhodné pro skripty: 0 čisto, 1 nálezy, 2 se nepodařilo přečíst nebo naparsovat.",

  "features.runsThreeWays.title": "Funguje třemi způsoby",
  "features.runsThreeWays.desc":
    "Jako CLI ručně nebo v pre-commit hooku, jako GitHub Action, který blokuje CI, nebo jako skill Claude Code / Agent Skills, aby programující agent zkontroloval vlastní i18n změny předtím, než vrátí PR.",

  "limits.heading": "Co nedělá",
  "limits.noYaml": "Žádné soubory locale ve formátu YAML. Bezpečné parsování YAML vyžaduje závislost, a translint je záměrně jen-stdlib.",
  "limits.heuristicOnly":
    "Kontrola nepřeložených hodnot je heuristika, ne pevné pravidlo. Označuje to, co vypadá nepřeloženě; nic tím nedokazuje.",
  "limits.noTranslationQuality":
    "Nic nepřekládá a neověřuje kvalitu překladu - jen strukturu: klíče, placeholdery, to, zda hodnoty nejsou prázdné.",
  "limits.nonRecursive":
    "Nerekurzivní procházení adresáře. Nasměrujte ho na adresář a zkontroluje soubory přímo v něm, ne podadresáře.",

  "footer.license": "Prosperity Public License 3.0.0 - volná pro nekomerční použití.",
};
