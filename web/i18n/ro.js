// Romanian (ro). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - un linter pentru fișierele tale de locale",
  "meta.description":
    "translint este o CLI fără dependențe care verifică fișierele de locale față de unul de bază și semnalează chei lipsă, nepotriviri de placeholder, valori goale și șiruri netraduse. Un singur fișier Python, doar biblioteca standard.",

  "skipLink": "Sari la conținutul principal",
  "nav.ariaLabel": "Site",
  "theme.switcherLabel": "Temă",
  "theme.ariaLabel": "Temă de culoare",
  "lang.switcherLabel": "Limbă",
  "lang.ariaLabel": "Limba interfeței",

  "hero.tagline": "O traducere lipsă e un bug de interfață. Un placeholder redenumit e un crash.",
  "hero.description1":
    "translint verifică fișierele tale de locale față de un fișier de bază și semnalează exact asta: chei lipsă, chei suplimentare rămase, valori goale, valori care încă par netraduse, și placeholdere care nu se potrivesc între șirul de bază și traducere - cel care chiar dărâmă o aplicație. Un singur fișier Python, doar biblioteca standard, zero dependențe.",
  "hero.description2":
    "Rulează-l ca CLI manual sau într-un hook pre-commit, ca o GitHub Action care blochează CI-ul, sau ca agent skill, ca Claude Code (sau orice agent care folosește standardul deschis Agent Skills) să își verifice propriile modificări de i18n înainte să îți returneze un PR.",

  "install.heading": "Instalare",
  "install.altIntro": "Sau sari peste instalare, fiindcă e un singur fișier fără dependențe:",

  "usage.heading": "Utilizare",
  "usage.exitCodes":
    "--base este implicit en - numele de locale (numele fișierului fără extensie) față de care este verificat fiecare alt fișier găsit. Codul de ieșire este 0 când totul e curat, 1 când translint a găsit ceva de corectat, 2 dacă o cale nu a putut fi citită sau parsată deloc - o eroare de JSON invalid și o descoperire reală de lint nu arată niciodată la fel pentru un script.",

  "demo.heading": "Vezi-l cum prinde ceva",
  "demo.intro":
    "Acesta este un rezultat real, nu un mockup. examples/locales/ din repo conține un fișier de bază (en.json) și două traduceri (fr.json, de.json) cu câteva probleme reale, plantate intenționat. Mai jos este translint rulat împotriva lor, copiat exact - categoriile roșii fac ca rularea să eșueze implicit, cele chihlimbarii sunt raportate dar eșuează doar cu --strict.",
  "demo.terminalAriaLabel": "Rezultatul terminalului de la translint",
  "demo.note":
    "translint iese cu 1 de fiecare dată când există ceva de corectat. Ieșirea cu 0 înseamnă că fiecare locale e curat; ieșirea cu 2 înseamnă că o cale nici măcar nu a putut fi citită sau parsată. Încearcă singur pe aceleași fișiere: translint examples/locales --base en.",

  "features.heading": "Ce verifică",

  "features.missingKeys.title": "Chei lipsă",
  "features.missingKeys.desc": "O cheie care există în locale-ul de bază dar nu a ajuns niciodată într-o traducere.",

  "features.placeholderMismatches.title": "Nepotriviri de placeholder",
  "features.placeholderMismatches.desc":
    "{amount} a devenit {total} - bug-ul care merge perfect în orice test care nu trimite date reale de interpolare, și pică exact în momentul în care unul o face.",

  "features.emptyValues.title": "Valori goale",
  "features.emptyValues.desc": "O cheie care există dar nu a fost niciodată completată.",

  "features.extraKeys.title": "Chei suplimentare",
  "features.extraKeys.desc": "Rămasă în urma unei redenumiri. Este raportată, dar nu face rularea să eșueze decât dacă folosești --strict.",

  "features.possiblyUntranslated.title": "Posibil netradus",
  "features.possiblyUntranslated.desc":
    "O euristică: valoarea încă se citește identic, octet cu octet, cu baza după eliminarea placeholderelor, a punctuației și a numerelor. Permite potrivirile reale cu --allow-identical sau --do-not-translate.",

  "features.fileFormats.title": "Trei formate de fișier",
  "features.fileFormats.desc":
    "JSON (chei imbricate sau plate cu notație cu puncte), gettext .po/.pot, și Java .properties, detectate automat după extensie.",

  "features.placeholderStyles.title": "Cinci stiluri de placeholder",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, și ${name}/$name, comparate ca un multiset ca un placeholder dublat să nu scape.",

  "features.scriptableOutput.title": "Rezultat scriptabil",
  "features.scriptableOutput.desc":
    "--json afișează rezultate lizibile de o mașină. Codurile de ieșire sunt la fel de prietenoase cu scripturile: 0 curat, 1 descoperiri, 2 nu s-a putut citi sau parsa.",

  "features.runsThreeWays.title": "Funcționează în trei moduri",
  "features.runsThreeWays.desc":
    "Ca CLI manual sau într-un hook pre-commit, ca o GitHub Action care blochează CI-ul, sau ca skill Claude Code / Agent Skills, ca un agent de codare să își verifice propriile modificări de i18n înainte să returneze un PR.",

  "limits.heading": "Ce nu face",
  "limits.noYaml": "Fără fișiere de locale YAML. Parsarea în siguranță a YAML necesită o dependență, iar translint este intenționat doar-stdlib.",
  "limits.heuristicOnly":
    "Verificarea valorilor netraduse este o euristică, nu o regulă fixă. Semnalează ce pare netradus; nu dovedește nimic.",
  "limits.noTranslationQuality":
    "Nu traduce nimic, și nu validează calitatea traducerii - doar structura: chei, placeholdere, dacă valorile nu sunt goale.",
  "limits.nonRecursive":
    "Scanare de director nerecursivă. Îndreaptă-l spre un director și verifică fișierele direct din interior, nu subdirectoarele.",

  "footer.license": "Prosperity Public License 3.0.0 - liberă pentru uz necomercial.",
};
