// Hungarian (hu). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - linter a locale fájljaidhoz",
  "meta.description":
    "A translint egy függőségmentes CLI, amely a locale fájlokat egy alaphoz hasonlítja, és jelzi a hiányzó kulcsokat, a helyőrző-eltéréseket, az üres értékeket és a lefordítatlan szövegeket. Egyetlen Python-fájl, csak a szabványos könyvtár.",

  "skipLink": "Ugrás a fő tartalomra",
  "nav.ariaLabel": "Webhely",
  "theme.switcherLabel": "Téma",
  "theme.ariaLabel": "Színtéma",
  "lang.switcherLabel": "Nyelv",
  "lang.ariaLabel": "Felület nyelve",

  "hero.tagline": "A hiányzó fordítás felületi hiba. Az átnevezett helyőrző összeomlás.",
  "hero.description1":
    "A translint a locale fájljaidat egy alapfájlhoz hasonlítja, és pontosan ezt jelzi: hiányzó kulcsokat, ottmaradt felesleges kulcsokat, üres értékeket, még lefordítatlannak tűnő értékeket, és olyan helyőrzőket, amelyek nem egyeznek az alapszöveg és a fordítás között - ez utóbbi az, ami valóban le tudja állítani az alkalmazást. Egyetlen Python-fájl, csak a szabványos könyvtár, nulla függőség.",
  "hero.description2":
    "Futtasd CLI-ként kézzel, vagy egy pre-commit hookban, GitHub Actionként, amely blokkolja a CI-t, vagy agent skillként, hogy a Claude Code (vagy bármely, a nyílt Agent Skills szabványt használó ügynök) ellenőrizze a saját i18n-módosításait, mielőtt visszaadna neked egy PR-t.",

  "install.heading": "Telepítés",
  "install.altIntro": "Vagy hagyd ki a telepítést, mivel ez egyetlen, függőségek nélküli fájl:",

  "usage.heading": "Használat",
  "usage.exitCodes":
    "A --base alapértelmezetten en - ez az a locale-név (a fájlnév kiterjesztés nélkül), amelyhez minden más megtalált fájlt hasonlítja. A kilépési kód 0, ha minden tiszta, 1, ha a translint talált valamit, amit javítani kell, 2, ha egy útvonalat egyáltalán nem sikerült beolvasni vagy feldolgozni - egy hibás JSON-hiba és egy valódi lint-találat egy szkript számára soha nem néz ki ugyanúgy.",

  "demo.heading": "Nézd meg, ahogy talál valamit",
  "demo.intro":
    "Ez valódi kimenet, nem makett. A repó examples/locales/ mappája tartalmaz egy alapfájlt (en.json) és két fordítást (fr.json, de.json), néhány valódi, szándékosan elültetett hibával. Lent a translint fut ezek ellen, szó szerint másolva - a piros kategóriák alapértelmezetten elbuktatják a futást, a borostyánszínűek csak jelentve lesznek, és csak --strict mellett buktatják el.",
  "demo.terminalAriaLabel": "A translint terminálkimenete",
  "demo.note":
    "A translint 1-es kóddal lép ki, valahányszor van mit javítani. A 0-s kilépés azt jelenti, hogy minden locale tiszta; a 2-es kilépés azt jelenti, hogy egy útvonalat még beolvasni vagy feldolgozni sem sikerült. Próbáld ki magad is ugyanezeken a fájlokon: translint examples/locales --base en.",

  "features.heading": "Mit ellenőriz",

  "features.missingKeys.title": "Hiányzó kulcsok",
  "features.missingKeys.desc": "Olyan kulcs, amely létezik az alap locale-ban, de sosem került be egy fordításba.",

  "features.placeholderMismatches.title": "Helyőrző-eltérések",
  "features.placeholderMismatches.desc":
    "{amount}-ból {total} lett - ez az a hiba, amely simán lefut minden olyan teszten, amely nem ad át valódi interpolációs adatot, és pontosan akkor omlik össze, amikor egy mégis megteszi.",

  "features.emptyValues.title": "Üres értékek",
  "features.emptyValues.desc": "Olyan kulcs, amely létezik, de sosem lett kitöltve.",

  "features.extraKeys.title": "Felesleges kulcsok",
  "features.extraKeys.desc": "Egy átnevezés maradéka. Jelentve lesz, de nem buktatja el a futást, hacsak nem adod meg a --strict kapcsolót.",

  "features.possiblyUntranslated.title": "Feltehetően lefordítatlan",
  "features.possiblyUntranslated.desc":
    "Egy heurisztika: az érték a helyőrzők, az írásjelek és a számok eltávolítása után is bájtra pontosan megegyezik az alappal. Engedélyezd a valódi egyezéseket a --allow-identical vagy a --do-not-translate kapcsolóval.",

  "features.fileFormats.title": "Három fájlformátum",
  "features.fileFormats.desc":
    "JSON (beágyazott vagy lapos, pontozott jelölésű kulcsok), gettext .po/.pot, és Java .properties, automatikusan felismerve a kiterjesztés alapján.",

  "features.placeholderStyles.title": "Öt helyőrző-stílus",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, és ${name}/$name, multihalmazként összehasonlítva, hogy egy duplázott helyőrző se csússzon át észrevétlenül.",

  "features.scriptableOutput.title": "Szkriptelhető kimenet",
  "features.scriptableOutput.desc":
    "A --json gépileg olvasható eredményeket ír ki. A kilépési kódok ugyanolyan szkriptbarátok: 0 tiszta, 1 találat, 2 nem sikerült beolvasni vagy feldolgozni.",

  "features.runsThreeWays.title": "Háromféleképpen fut",
  "features.runsThreeWays.desc":
    "CLI-ként kézzel vagy egy pre-commit hookban, GitHub Actionként, amely blokkolja a CI-t, vagy Claude Code / Agent Skills skillként, hogy egy kódoló ügynök ellenőrizze a saját i18n-módosításait, mielőtt visszaadna egy PR-t.",

  "limits.heading": "Amit nem csinál",
  "limits.noYaml": "Nincsenek YAML locale fájlok. A YAML biztonságos feldolgozása egy függőséget igényelne, a translint pedig szándékosan csak-stdlib.",
  "limits.heuristicOnly":
    "A lefordítatlan értékek ellenőrzése egy heurisztika, nem szigorú szabály. Megjelöli, ami lefordítatlannak tűnik; semmit sem bizonyít.",
  "limits.noTranslationQuality":
    "Nem fordít semmit, és nem ellenőrzi a fordítás minőségét - csak a szerkezetet: kulcsokat, helyőrzőket, azt, hogy az értékek nem üresek-e.",
  "limits.nonRecursive":
    "Nem rekurzív könyvtárvizsgálat. Mutass rá egy könyvtárra, és a közvetlenül benne lévő fájlokat ellenőrzi, nem az alkönyvtárakat.",

  "footer.license": "Prosperity Public License 3.0.0 - szabadon használható nem kereskedelmi célra.",
};
