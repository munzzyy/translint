// Polish (pl). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - linter do plików locale",
  "meta.description":
    "translint to CLI bez zależności, które sprawdza pliki locale względem pliku bazowego i zgłasza brakujące klucze, niezgodności placeholderów, puste wartości oraz nieprzetłumaczone ciągi znaków. Jeden plik Pythona, tylko biblioteka standardowa.",

  "skipLink": "Przejdź do głównej treści",
  "nav.ariaLabel": "Witryna",
  "theme.switcherLabel": "Motyw",
  "theme.ariaLabel": "Motyw kolorystyczny",
  "lang.switcherLabel": "Język",
  "lang.ariaLabel": "Język interfejsu",

  "hero.tagline": "Brakujące tłumaczenie to błąd interfejsu. Zmieniona nazwa placeholdera to crash.",
  "hero.description1":
    "translint sprawdza twoje pliki locale względem pliku bazowego i zgłasza dokładnie to: brakujące klucze, zbędne pozostawione klucze, puste wartości, wartości które nadal wyglądają na nieprzetłumaczone, oraz placeholdery które nie zgadzają się między ciągiem bazowym a tłumaczeniem - ten, który naprawdę wywraca aplikację. Jeden plik Pythona, tylko biblioteka standardowa, zero zależności.",
  "hero.description2":
    "Uruchamiaj go jako CLI ręcznie albo w hooku pre-commit, jako GitHub Action blokujący CI, albo jako agent skill, żeby Claude Code (albo dowolny agent korzystający z otwartego standardu Agent Skills) sprawdzał własne zmiany i18n, zanim odda ci PR-a.",

  "install.heading": "Instalacja",
  "install.altIntro": "Albo pomiń instalację, bo to jeden plik bez zależności:",

  "usage.heading": "Użycie",
  "usage.exitCodes":
    "--base domyślnie to en - nazwa locale (nazwa pliku bez rozszerzenia), z którą porównywany jest każdy inny znaleziony plik. Kod wyjścia to 0, gdy wszystko jest czyste, 1, gdy translint znalazł coś do poprawienia, 2, gdy ścieżki w ogóle nie dało się odczytać ani sparsować - błąd zepsutego JSON-a i prawdziwe znalezisko lintera nigdy nie wyglądają tak samo dla skryptu.",

  "demo.heading": "Zobacz, jak coś wyłapuje",
  "demo.intro":
    "To prawdziwy output, nie makieta. examples/locales/ w repo zawiera jeden plik bazowy (en.json) i dwa tłumaczenia (fr.json, de.json) z garścią prawdziwych, celowo podrzuconych problemów. Poniżej translint uruchomiony na nich, skopiowany dosłownie - kategorie na czerwono domyślnie powodują niepowodzenie uruchomienia, te na bursztynowo są tylko zgłaszane i kończą się niepowodzeniem wyłącznie z --strict.",
  "demo.terminalAriaLabel": "Output terminala z translint",
  "demo.note":
    "translint kończy działanie z kodem 1 za każdym razem, gdy jest coś do poprawienia. Kod 0 oznacza, że każde locale jest czyste; kod 2 oznacza, że ścieżki w ogóle nie dało się odczytać ani sparsować. Wypróbuj sam na tych samych plikach: translint examples/locales --base en.",

  "features.heading": "Co sprawdza",

  "features.missingKeys.title": "Brakujące klucze",
  "features.missingKeys.desc": "Klucz, który istnieje w locale bazowym, ale nigdy nie trafił do tłumaczenia.",

  "features.placeholderMismatches.title": "Niezgodności placeholderów",
  "features.placeholderMismatches.desc":
    "{amount} zmieniło się w {total} - błąd, który działa świetnie w każdym teście, który nie przekazuje prawdziwych danych interpolacji, i wysypuje się w chwili, gdy jakiś to zrobi.",

  "features.emptyValues.title": "Puste wartości",
  "features.emptyValues.desc": "Klucz, który istnieje, ale nigdy nie został uzupełniony.",

  "features.extraKeys.title": "Zbędne klucze",
  "features.extraKeys.desc": "Pozostałość po zmianie nazwy. Zgłaszane, ale nie powoduje niepowodzenia uruchomienia, chyba że użyjesz --strict.",

  "features.possiblyUntranslated.title": "Prawdopodobnie nieprzetłumaczone",
  "features.possiblyUntranslated.desc":
    "Heurystyka: wartość nadal jest identyczna bajt w bajt z bazową po usunięciu placeholderów, interpunkcji i liczb. Zezwól na prawdziwe zgodności za pomocą --allow-identical lub --do-not-translate.",

  "features.fileFormats.title": "Trzy formaty plików",
  "features.fileFormats.desc":
    "JSON (zagnieżdżone lub płaskie klucze z notacją kropkową), gettext .po/.pot oraz Java .properties, wykrywane automatycznie na podstawie rozszerzenia.",

  "features.placeholderStyles.title": "Pięć stylów placeholderów",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s oraz ${name}/$name, porównywane jako multizbiór, żeby zdublowany placeholder się nie prześlizgnął.",

  "features.scriptableOutput.title": "Output do skryptów",
  "features.scriptableOutput.desc":
    "--json wypisuje wyniki czytelne maszynowo. Kody wyjścia są równie przyjazne skryptom: 0 czysto, 1 znaleziska, 2 nie dało się odczytać ani sparsować.",

  "features.runsThreeWays.title": "Działa na trzy sposoby",
  "features.runsThreeWays.desc":
    "Jako CLI ręcznie albo w hooku pre-commit, jako GitHub Action blokujący CI, albo jako skill Claude Code / Agent Skills, żeby agent kodujący sprawdzał własne zmiany i18n, zanim odda PR-a.",

  "limits.heading": "Czego nie robi",
  "limits.noYaml": "Żadnych plików locale w YAML. Bezpieczne parsowanie YAML wymaga zależności, a translint celowo korzysta tylko z biblioteki standardowej.",
  "limits.heuristicOnly":
    "Sprawdzanie nieprzetłumaczonych wartości to heurystyka, nie sztywna reguła. Zaznacza to, co wygląda na nieprzetłumaczone; niczego nie dowodzi.",
  "limits.noTranslationQuality":
    "Niczego nie tłumaczy i nie sprawdza jakości tłumaczenia - tylko strukturę: klucze, placeholdery, to, czy wartości nie są puste.",
  "limits.nonRecursive":
    "Nierekursywne skanowanie katalogu. Wskaż mu katalog, a sprawdzi pliki znajdujące się bezpośrednio w nim, nie podkatalogi.",

  "footer.license": "Prosperity Public License 3.0.0 - wolna do użytku niekomercyjnego.",
};
