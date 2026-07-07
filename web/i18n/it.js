// Italian (it). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - un linter per i tuoi file di locale",
  "meta.description":
    "translint è una CLI senza dipendenze che confronta i file di locale con uno di base e segnala chiavi mancanti, placeholder che non corrispondono, valori vuoti e stringhe non tradotte. Un solo file Python, solo libreria standard.",

  "skipLink": "Vai al contenuto principale",
  "nav.ariaLabel": "Sito",
  "theme.switcherLabel": "Tema",
  "theme.ariaLabel": "Tema colore",
  "lang.switcherLabel": "Lingua",
  "lang.ariaLabel": "Lingua dell'interfaccia",

  "hero.tagline": "Una traduzione mancante è un bug dell'interfaccia. Un placeholder rinominato è un crash.",
  "hero.description1":
    "translint confronta i tuoi file di locale con un file di base e segnala esattamente questo: chiavi mancanti, chiavi in eccesso rimaste da un rinomino, valori vuoti, valori che sembrano ancora non tradotti, e placeholder che non corrispondono tra la stringa di base e la traduzione - quello che manda davvero in crash un'app. Un solo file Python, solo libreria standard, zero dipendenze.",
  "hero.description2":
    "Usalo come CLI a mano o in un hook pre-commit, come una GitHub Action che blocca la CI, o come agent skill così che Claude Code (o qualsiasi agente che usa lo standard aperto Agent Skills) controlli le proprie modifiche i18n prima di restituirti una PR.",

  "install.heading": "Installazione",
  "install.altIntro": "Oppure salta l'installazione, visto che è un solo file senza dipendenze:",

  "usage.heading": "Utilizzo",
  "usage.exitCodes":
    "--base per impostazione predefinita è en - il nome della locale (nome del file senza estensione) con cui viene confrontato ogni altro file trovato. Il codice di uscita è 0 quando è tutto pulito, 1 quando translint ha trovato qualcosa da correggere, 2 se un percorso non può essere letto o analizzato del tutto - un errore di JSON non valido e un vero risultato del lint non sembrano mai uguali per uno script.",

  "demo.heading": "Guardalo scovare qualcosa",
  "demo.intro":
    "Questo è un output reale, non un mockup. examples/locales/ nel repo include un file di base (en.json) e due traduzioni (fr.json, de.json) con alcuni problemi reali, piantati apposta. Di seguito translint eseguito contro di essi, copiato alla lettera - le categorie in rosso fanno fallire l'esecuzione per impostazione predefinita, quelle in ambra vengono segnalate ma fanno fallire l'esecuzione solo con --strict.",
  "demo.terminalAriaLabel": "Output del terminale da translint",
  "demo.note":
    "translint esce con 1 ogni volta che c'è qualcosa da correggere. Uscire con 0 significa che ogni locale è pulita; uscire con 2 significa che un percorso non è stato nemmeno leggibile o analizzabile. Provalo tu stesso su questi stessi file: translint examples/locales --base en.",

  "features.heading": "Cosa controlla",

  "features.missingKeys.title": "Chiavi mancanti",
  "features.missingKeys.desc": "Una chiave che esiste nella locale di base ma che non è mai arrivata in una traduzione.",

  "features.placeholderMismatches.title": "Placeholder non corrispondenti",
  "features.placeholderMismatches.desc":
    "{amount} è diventato {total} - il bug che nei test funziona benissimo finché non si passano dati reali di interpolazione, e che va in crash nel momento in cui succede.",

  "features.emptyValues.title": "Valori vuoti",
  "features.emptyValues.desc": "Una chiave che esiste ma che non è mai stata compilata.",

  "features.extraKeys.title": "Chiavi in eccesso",
  "features.extraKeys.desc": "Rimasta da un rinomino. Viene segnalata, ma non fa fallire l'esecuzione a meno che tu non passi --strict.",

  "features.possiblyUntranslated.title": "Possibilmente non tradotto",
  "features.possiblyUntranslated.desc":
    "Un'euristica: il valore risulta ancora identico byte per byte alla base dopo aver rimosso placeholder, punteggiatura e numeri. Consenti le corrispondenze reali con --allow-identical o --do-not-translate.",

  "features.fileFormats.title": "Tre formati di file",
  "features.fileFormats.desc":
    "JSON (chiavi annidate o piatte con notazione a punti), gettext .po/.pot, e Java .properties, rilevati automaticamente in base all'estensione.",

  "features.placeholderStyles.title": "Cinque stili di placeholder",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, e ${name}/$name, confrontati come un multiset così che un placeholder duplicato non passi inosservato.",

  "features.scriptableOutput.title": "Output scriptabile",
  "features.scriptableOutput.desc":
    "--json stampa risultati leggibili da una macchina. I codici di uscita sono altrettanto adatti agli script: 0 pulito, 1 risultati trovati, 2 lettura o analisi non riuscita.",

  "features.runsThreeWays.title": "Funziona in tre modi",
  "features.runsThreeWays.desc":
    "Come CLI a mano o in un hook pre-commit, come una GitHub Action che blocca la CI, o come skill di Claude Code / Agent Skills, così che un agente di coding controlli le proprie modifiche i18n prima di restituire una PR.",

  "limits.heading": "Cosa non fa",
  "limits.noYaml": "Nessun file di locale YAML. Analizzare YAML in modo sicuro richiede una dipendenza, e translint è volutamente solo-stdlib.",
  "limits.heuristicOnly":
    "Il controllo dei valori non tradotti è un'euristica, non una regola rigida. Segnala ciò che sembra non tradotto; non dimostra nulla.",
  "limits.noTranslationQuality":
    "Non traduce nulla, e non valida la qualità della traduzione - solo la struttura: chiavi, placeholder, valori non vuoti.",
  "limits.nonRecursive":
    "Scansione della cartella non ricorsiva. Puntalo a una cartella e controlla i file direttamente al suo interno, non le sottocartelle.",

  "footer.license": "Prosperity Public License 3.0.0 - libero per uso non commerciale.",
};
