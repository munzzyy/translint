// German (de). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - ein Linter für deine Locale-Dateien",
  "meta.description":
    "translint ist eine CLI ohne Abhängigkeiten, die Locale-Dateien gegen eine Basisdatei prüft und fehlende Schlüssel, abweichende Platzhalter, leere Werte und unübersetzte Zeichenketten meldet. Eine einzige Python-Datei, nur mit der Standardbibliothek.",

  "skipLink": "Zum Hauptinhalt springen",
  "nav.ariaLabel": "Website",
  "theme.switcherLabel": "Design",
  "theme.ariaLabel": "Farbdesign",
  "lang.switcherLabel": "Sprache",
  "lang.ariaLabel": "Oberflächensprache",

  "hero.tagline": "Eine fehlende Übersetzung ist ein UI-Bug. Ein umbenannter Platzhalter ist ein Absturz.",
  "hero.description1":
    "translint prüft deine Locale-Dateien gegen eine Basisdatei und meldet genau das: fehlende Schlüssel, übrig gebliebene Schlüssel, leere Werte, Werte, die noch unübersetzt aussehen, und Platzhalter, die zwischen dem Basisstring und der Übersetzung nicht übereinstimmen - der Bug, der eine App wirklich lahmlegt. Eine einzige Python-Datei, nur mit der Standardbibliothek, keine Abhängigkeiten.",
  "hero.description2":
    "Nutze es als CLI von Hand oder in einem Pre-Commit-Hook, als GitHub Action, die die CI absichert, oder als Agent Skill, damit Claude Code (oder jeder Agent, der den offenen Agent-Skills-Standard nutzt) seine eigenen i18n-Änderungen prüft, bevor er dir einen PR übergibt.",

  "install.heading": "Installation",
  "install.altIntro": "Oder verzichte ganz auf die Installation, da es nur eine Datei ohne Abhängigkeiten ist:",

  "usage.heading": "Verwendung",
  "usage.exitCodes":
    "--base ist standardmäßig en - der Locale-Name (der Dateiname ohne Endung), gegen den jede andere gefundene Datei geprüft wird. Der Exit-Code ist 0, wenn alles sauber ist, 1, wenn translint etwas zu beheben gefunden hat, 2, wenn ein Pfad gar nicht gelesen oder geparst werden konnte - ein kaputtes JSON und ein echter Lint-Fund sehen für ein Skript nie gleich aus.",

  "demo.heading": "Sieh zu, wie es etwas findet",
  "demo.intro":
    "Das ist eine echte Ausgabe, kein Mockup. examples/locales/ im Repo enthält eine Basisdatei (en.json) und zwei Übersetzungen (fr.json, de.json) mit ein paar echten, absichtlich eingebauten Problemen. Unten läuft translint gegen sie, wortwörtlich kopiert - rote Kategorien lassen den Lauf standardmäßig fehlschlagen, gelbe werden gemeldet, schlagen aber nur mit --strict fehl.",
  "demo.terminalAriaLabel": "Terminal-Ausgabe von translint",
  "demo.note":
    "translint beendet sich mit 1, sobald es etwas zu beheben gibt. Exit-Code 0 bedeutet, jedes Locale ist sauber; Exit-Code 2 bedeutet, ein Pfad konnte nicht einmal gelesen oder geparst werden. Probier es selbst gegen dieselben Dateien aus: translint examples/locales --base en.",

  "features.heading": "Was geprüft wird",

  "features.missingKeys.title": "Fehlende Schlüssel",
  "features.missingKeys.desc": "Ein Schlüssel, der im Basis-Locale existiert, aber es nie in eine Übersetzung geschafft hat.",

  "features.placeholderMismatches.title": "Abweichende Platzhalter",
  "features.placeholderMismatches.desc":
    "Aus {amount} wurde {total} - der Bug, der in jedem Test sauber durchläuft, der keine echten Interpolationsdaten übergibt, und der genau in dem Moment crasht, in dem einer das tut.",

  "features.emptyValues.title": "Leere Werte",
  "features.emptyValues.desc": "Ein Schlüssel, der existiert, aber nie befüllt wurde.",

  "features.extraKeys.title": "Überzählige Schlüssel",
  "features.extraKeys.desc": "Überbleibsel einer Umbenennung. Wird gemeldet, lässt den Lauf aber nur mit --strict fehlschlagen.",

  "features.possiblyUntranslated.title": "Möglicherweise unübersetzt",
  "features.possiblyUntranslated.desc":
    "Eine Heuristik: Der Wert liest sich byteidentisch zur Basis, nachdem Platzhalter, Satzzeichen und Zahlen entfernt wurden. Echte Treffer mit --allow-identical oder --do-not-translate zulassen.",

  "features.fileFormats.title": "Drei Dateiformate",
  "features.fileFormats.desc":
    "JSON (verschachtelte oder flache Schlüssel mit Punktnotation), gettext .po/.pot und Java .properties, automatisch anhand der Endung erkannt.",

  "features.placeholderStyles.title": "Fünf Platzhalter-Stile",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s und ${name}/$name, als Multiset verglichen, damit ein doppelter Platzhalter nicht durchrutscht.",

  "features.scriptableOutput.title": "Skriptfähige Ausgabe",
  "features.scriptableOutput.desc":
    "--json gibt maschinenlesbare Ergebnisse aus. Die Exit-Codes sind genauso skriptfreundlich: 0 sauber, 1 Funde, 2 konnte nicht gelesen oder geparst werden.",

  "features.runsThreeWays.title": "Läuft auf drei Arten",
  "features.runsThreeWays.desc":
    "Als CLI von Hand oder in einem Pre-Commit-Hook, als GitHub Action, die die CI absichert, oder als Claude-Code-/Agent-Skills-Skill, damit ein Coding-Agent seine eigenen i18n-Änderungen prüft, bevor er einen PR zurückgibt.",

  "limits.heading": "Was es nicht tut",
  "limits.noYaml": "Keine YAML-Locale-Dateien. YAML sicher zu parsen braucht eine Abhängigkeit, und translint ist absichtlich nur-stdlib.",
  "limits.heuristicOnly":
    "Die Prüfung auf unübersetzte Werte ist eine Heuristik, keine feste Regel. Sie markiert, was unübersetzt aussieht; sie beweist nichts.",
  "limits.noTranslationQuality":
    "Es übersetzt nichts und prüft nicht die Übersetzungsqualität - nur die Struktur: Schlüssel, Platzhalter, Nicht-Leersein.",
  "limits.nonRecursive":
    "Nicht rekursiver Verzeichnis-Scan. Zeig damit auf ein Verzeichnis, und es prüft die Dateien direkt darin, nicht die Unterordner.",

  "footer.license": "Prosperity Public License 3.0.0 - frei nutzbar für nicht-kommerzielle Zwecke.",
};
