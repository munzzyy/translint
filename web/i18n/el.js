// Greek (el). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - ένα linter για τα αρχεία locale σου",
  "meta.description":
    "Το translint είναι ένα CLI χωρίς εξαρτήσεις που ελέγχει αρχεία locale σε σχέση με ένα βασικό αρχείο και επισημαίνει κλειδιά που λείπουν, ασυμφωνίες placeholder, κενές τιμές και αμετάφραστες συμβολοσειρές. Ένα μόνο αρχείο Python, μόνο η βασική βιβλιοθήκη.",

  "skipLink": "Μετάβαση στο κύριο περιεχόμενο",
  "nav.ariaLabel": "Ιστότοπος",
  "theme.switcherLabel": "Θέμα",
  "theme.ariaLabel": "Χρωματικό θέμα",
  "lang.switcherLabel": "Γλώσσα",
  "lang.ariaLabel": "Γλώσσα διεπαφής",

  "hero.tagline": "Μια μετάφραση που λείπει είναι bug διεπαφής. Ένα μετονομασμένο placeholder είναι crash.",
  "hero.description1":
    "Το translint ελέγχει τα αρχεία locale σου σε σχέση με ένα βασικό αρχείο και επισημαίνει ακριβώς αυτό: κλειδιά που λείπουν, παλιά περιττά κλειδιά, κενές τιμές, τιμές που ακόμα φαίνονται αμετάφραστες, και placeholder που δεν ταιριάζουν μεταξύ της βασικής συμβολοσειράς και της μετάφρασης - αυτό που πραγματικά ρίχνει μια εφαρμογή. Ένα μόνο αρχείο Python, μόνο η βασική βιβλιοθήκη, καμία εξάρτηση.",
  "hero.description2":
    "Τρέξε το ως CLI με το χέρι ή σε ένα pre-commit hook, ως GitHub Action που μπλοκάρει το CI, ή ως agent skill ώστε το Claude Code (ή οποιοσδήποτε agent χρησιμοποιεί το ανοιχτό πρότυπο Agent Skills) να ελέγχει τις δικές του αλλαγές i18n πριν σου επιστρέψει ένα PR.",

  "install.heading": "Εγκατάσταση",
  "install.altIntro": "Ή παράλειψε την εγκατάσταση, αφού είναι ένα μόνο αρχείο χωρίς εξαρτήσεις:",

  "usage.heading": "Χρήση",
  "usage.exitCodes":
    "Το --base είναι εξ ορισμού en - το όνομα locale (το όνομα αρχείου χωρίς επέκταση) με το οποίο ελέγχεται κάθε άλλο αρχείο που εντοπίζεται. Ο κωδικός εξόδου είναι 0 όταν όλα είναι καθαρά, 1 όταν το translint βρήκε κάτι προς διόρθωση, 2 αν μια διαδρομή δεν μπόρεσε καν να διαβαστεί ή να αναλυθεί - ένα σφάλμα κατεστραμμένου JSON και ένα πραγματικό εύρημα lint δεν φαίνονται ποτέ ίδια σε ένα script.",

  "demo.heading": "Δες το να εντοπίζει κάτι",
  "demo.intro":
    "Αυτό είναι πραγματικό αποτέλεσμα, όχι mockup. Ο φάκελος examples/locales/ στο repo περιέχει ένα βασικό αρχείο (en.json) και δύο μεταφράσεις (fr.json, de.json) με μερικά πραγματικά, εσκεμμένα τοποθετημένα προβλήματα. Παρακάτω είναι το translint εκτελεσμένο σε αυτά, αντιγραμμένο αυτούσιο - οι κόκκινες κατηγορίες κάνουν την εκτέλεση να αποτυγχάνει εξ ορισμού, οι κεχριμπαρί αναφέρονται αλλά αποτυγχάνουν μόνο με --strict.",
  "demo.terminalAriaLabel": "Έξοδος τερματικού από το translint",
  "demo.note":
    "Το translint βγαίνει με 1 όποτε υπάρχει κάτι προς διόρθωση. Έξοδος με 0 σημαίνει ότι κάθε locale είναι καθαρό· έξοδος με 2 σημαίνει ότι μια διαδρομή δεν μπόρεσε καν να διαβαστεί ή να αναλυθεί. Δοκίμασέ το μόνος σου στα ίδια αρχεία: translint examples/locales --base en.",

  "features.heading": "Τι ελέγχει",

  "features.missingKeys.title": "Κλειδιά που λείπουν",
  "features.missingKeys.desc": "Ένα κλειδί που υπάρχει στο βασικό locale αλλά δεν έφτασε ποτέ σε μια μετάφραση.",

  "features.placeholderMismatches.title": "Ασυμφωνίες placeholder",
  "features.placeholderMismatches.desc":
    "Το {amount} έγινε {total} - το bug που περνάει μια χαρά σε κάθε test που δεν στέλνει πραγματικά δεδομένα παρεμβολής, και ρίχνει το πρόγραμμα τη στιγμή που κάποιο το κάνει.",

  "features.emptyValues.title": "Κενές τιμές",
  "features.emptyValues.desc": "Ένα κλειδί που υπάρχει αλλά δεν συμπληρώθηκε ποτέ.",

  "features.extraKeys.title": "Περιττά κλειδιά",
  "features.extraKeys.desc": "Απομεινάρι από μια μετονομασία. Αναφέρεται, αλλά δεν κάνει την εκτέλεση να αποτύχει εκτός αν περάσεις --strict.",

  "features.possiblyUntranslated.title": "Πιθανώς αμετάφραστο",
  "features.possiblyUntranslated.desc":
    "Μια ευρετική μέθοδος: η τιμή εξακολουθεί να διαβάζεται πανομοιότυπη, byte προς byte, με τη βάση αφού αφαιρεθούν τα placeholder, η στίξη και οι αριθμοί. Επίτρεψε τις πραγματικές αντιστοιχίες με --allow-identical ή --do-not-translate.",

  "features.fileFormats.title": "Τρεις μορφές αρχείων",
  "features.fileFormats.desc":
    "JSON (ένθετα ή επίπεδα κλειδιά με σημειογραφία τελείας), gettext .po/.pot, και Java .properties, εντοπίζονται αυτόματα βάσει επέκτασης.",

  "features.placeholderStyles.title": "Πέντε στυλ placeholder",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, και ${name}/$name, συγκρίνονται ως multiset ώστε ένα διπλασιασμένο placeholder να μην ξεφύγει απαρατήρητο.",

  "features.scriptableOutput.title": "Έξοδος κατάλληλη για scripting",
  "features.scriptableOutput.desc":
    "Το --json τυπώνει αποτελέσματα αναγνώσιμα από μηχανή. Οι κωδικοί εξόδου είναι εξίσου φιλικοί προς τα scripts: 0 καθαρό, 1 ευρήματα, 2 δεν μπόρεσε να διαβαστεί ή να αναλυθεί.",

  "features.runsThreeWays.title": "Τρέχει με τρεις τρόπους",
  "features.runsThreeWays.desc":
    "Ως CLI με το χέρι ή σε ένα pre-commit hook, ως GitHub Action που μπλοκάρει το CI, ή ως skill Claude Code / Agent Skills, ώστε ένας agent προγραμματισμού να ελέγχει τις δικές του αλλαγές i18n πριν επιστρέψει ένα PR.",

  "limits.heading": "Τι δεν κάνει",
  "limits.noYaml": "Κανένα αρχείο locale σε YAML. Η ασφαλής ανάλυση YAML χρειάζεται μια εξάρτηση, και το translint είναι σκόπιμα μόνο-stdlib.",
  "limits.heuristicOnly":
    "Ο έλεγχος αμετάφραστων τιμών είναι μια ευρετική μέθοδος, όχι αυστηρός κανόνας. Επισημαίνει ό,τι φαίνεται αμετάφραστο· δεν αποδεικνύει τίποτα.",
  "limits.noTranslationQuality":
    "Δεν μεταφράζει τίποτα, και δεν επικυρώνει την ποιότητα της μετάφρασης - μόνο τη δομή: κλειδιά, placeholder, το αν οι τιμές δεν είναι κενές.",
  "limits.nonRecursive":
    "Μη αναδρομική σάρωση καταλόγου. Δείξε το σε έναν κατάλογο και ελέγχει τα αρχεία που βρίσκονται απευθείας μέσα σε αυτόν, όχι τους υποφακέλους.",

  "footer.license": "Prosperity Public License 3.0.0 - ελεύθερη για μη εμπορική χρήση.",
};
