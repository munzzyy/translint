// Finnish (fi). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - linter locale-tiedostoillesi",
  "meta.description":
    "translint on riippuvuudeton CLI, joka tarkistaa locale-tiedostot perustiedostoa vasten ja merkitsee puuttuvat avaimet, paikkamerkkien ristiriidat, tyhjät arvot ja kääntämättömät merkkijonot. Yksi Python-tiedosto, vain vakiokirjasto.",

  "skipLink": "Siirry pääsisältöön",
  "nav.ariaLabel": "Sivusto",
  "theme.switcherLabel": "Teema",
  "theme.ariaLabel": "Väriteema",
  "lang.switcherLabel": "Kieli",
  "lang.ariaLabel": "Käyttöliittymän kieli",

  "hero.tagline": "Puuttuva käännös on käyttöliittymän bugi. Uudelleennimetty paikkamerkki on kaatuminen.",
  "hero.description1":
    "translint tarkistaa locale-tiedostosi perustiedostoa vasten ja merkitsee juuri sen: puuttuvat avaimet, jäljelle jääneet ylimääräiset avaimet, tyhjät arvot, arvot jotka näyttävät yhä kääntämättömiltä, ja paikkamerkit jotka eivät täsmää perusmerkkijonon ja käännöksen välillä - se joka oikeasti kaataa sovelluksen. Yksi Python-tiedosto, vain vakiokirjasto, ei riippuvuuksia.",
  "hero.description2":
    "Aja se CLI:nä käsin tai pre-commit-hookissa, GitHub Actionina joka lukitsee CI:n, tai agent skillinä, jotta Claude Code (tai mikä tahansa avointa Agent Skills -standardia käyttävä agentti) tarkistaa omat i18n-muutoksensa ennen kuin palauttaa sinulle PR:n.",

  "install.heading": "Asennus",
  "install.altIntro": "Tai ohita asennus kokonaan, koska se on yksi tiedosto ilman riippuvuuksia:",

  "usage.heading": "Käyttö",
  "usage.exitCodes":
    "--base on oletuksena en - locale-nimi (tiedostonimi ilman päätettä), johon jokaista muuta löydettyä tiedostoa verrataan. Poistumiskoodi on 0 kun kaikki on kunnossa, 1 kun translint löysi jotain korjattavaa, 2 jos polkua ei voitu lukea tai jäsentää lainkaan - rikkinäinen JSON-virhe ja aito lint-löydös eivät koskaan näytä samalta skriptin näkökulmasta.",

  "demo.heading": "Katso sen löytävän jotain",
  "demo.intro":
    "Tämä on aitoa tulostetta, ei mallinnos. Repon examples/locales/ sisältää yhden perustiedoston (en.json) ja kaksi käännöstä (fr.json, de.json), joissa on kourallinen aitoja, tarkoituksella istutettuja ongelmia. Alla translint ajettuna niitä vasten, kopioituna sanatarkasti - punaiset kategoriat kaatavat ajon oletuksena, keltaiset raportoidaan mutta kaatavat ajon vain --strict-lipulla.",
  "demo.terminalAriaLabel": "translintin pääteseloste",
  "demo.note":
    "translint päättyy koodilla 1 aina kun jotain on korjattavaa. Poistuminen koodilla 0 tarkoittaa, että jokainen locale on puhdas; poistuminen koodilla 2 tarkoittaa, ettei polkua edes pystytty lukemaan tai jäsentämään. Kokeile itse samoja tiedostoja vasten: translint examples/locales --base en.",

  "features.heading": "Mitä se tarkistaa",

  "features.missingKeys.title": "Puuttuvat avaimet",
  "features.missingKeys.desc": "Avain, joka on olemassa perus-localessa mutta ei ole koskaan päätynyt käännökseen.",

  "features.placeholderMismatches.title": "Paikkamerkkien ristiriidat",
  "features.placeholderMismatches.desc":
    "{amount} muuttui muotoon {total} - bugi, joka toimii moitteettomasti jokaisessa testissä, joka ei syötä aitoa interpolaatiodataa, ja kaatuu sillä hetkellä kun joku tekee niin.",

  "features.emptyValues.title": "Tyhjät arvot",
  "features.emptyValues.desc": "Avain, joka on olemassa, mutta jota ei ole koskaan täytetty.",

  "features.extraKeys.title": "Ylimääräiset avaimet",
  "features.extraKeys.desc": "Jäänne uudelleennimeämisestä. Raportoidaan, mutta ei kaada ajoa ellei käytä --strict-lippua.",

  "features.possiblyUntranslated.title": "Mahdollisesti kääntämätön",
  "features.possiblyUntranslated.desc":
    "Heuristiikka: arvo on yhä tavu tavulta identtinen perusarvon kanssa sen jälkeen kun paikkamerkit, välimerkit ja numerot on poistettu. Salli aidot osumat --allow-identical- tai --do-not-translate-lipulla.",

  "features.fileFormats.title": "Kolme tiedostomuotoa",
  "features.fileFormats.desc":
    "JSON (sisäkkäiset tai litteät pisteillä eritellyt avaimet), gettextin .po/.pot ja Javan .properties, tunnistetaan automaattisesti päätteen perusteella.",

  "features.placeholderStyles.title": "Viisi paikkamerkkityyliä",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s ja ${name}/$name, verrataan monijoukkona, jotta kahdentunut paikkamerkki ei pääse livahtamaan läpi.",

  "features.scriptableOutput.title": "Skriptattava tuloste",
  "features.scriptableOutput.desc":
    "--json tulostaa koneluettavia tuloksia. Poistumiskoodit ovat yhtä skriptiystävällisiä: 0 puhdas, 1 löydöksiä, 2 ei voitu lukea tai jäsentää.",

  "features.runsThreeWays.title": "Toimii kolmella tavalla",
  "features.runsThreeWays.desc":
    "CLI:nä käsin tai pre-commit-hookissa, GitHub Actionina joka lukitsee CI:n, tai Claude Code / Agent Skills -skillinä, jotta koodaava agentti tarkistaa omat i18n-muutoksensa ennen PR:n palauttamista.",

  "limits.heading": "Mitä se ei tee",
  "limits.noYaml": "Ei YAML-locale-tiedostoja. YAML:n turvallinen jäsentäminen vaatii riippuvuuden, ja translint on tarkoituksella vain-stdlib.",
  "limits.heuristicOnly":
    "Kääntämättömien arvojen tarkistus on heuristiikka, ei ehdoton sääntö. Se merkitsee sen, mikä näyttää kääntämättömältä; se ei todista mitään.",
  "limits.noTranslationQuality":
    "Se ei käännä mitään, eikä se validoi käännöksen laatua - vain rakenteen: avaimet, paikkamerkit, sen etteivät arvot ole tyhjiä.",
  "limits.nonRecursive":
    "Ei-rekursiivinen hakemistoskannaus. Osoita se hakemistoon, ja se tarkistaa suoraan sen sisällä olevat tiedostot, ei alihakemistoja.",

  "footer.license": "Prosperity Public License 3.0.0 - vapaa ei-kaupalliseen käyttöön.",
};
