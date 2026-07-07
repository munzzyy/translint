// French (fr). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - un linter pour vos fichiers de locale",
  "meta.description":
    "translint est une CLI sans dépendances qui vérifie les fichiers de locale par rapport à un fichier de base et détecte les clés manquantes, les placeholders qui ne correspondent pas, les valeurs vides et les chaînes non traduites. Un seul fichier Python, uniquement la bibliothèque standard.",

  "skipLink": "Passer au contenu principal",
  "nav.ariaLabel": "Site",
  "theme.switcherLabel": "Thème",
  "theme.ariaLabel": "Thème de couleur",
  "lang.switcherLabel": "Langue",
  "lang.ariaLabel": "Langue de l'interface",

  "hero.tagline": "Une traduction manquante est un bug d'interface. Un placeholder renommé, c'est un crash.",
  "hero.description1":
    "translint vérifie vos fichiers de locale par rapport à un fichier de base et détecte exactement ça : les clés manquantes, les clés en trop laissées par un renommage, les valeurs vides, les valeurs qui ont toujours l'air non traduites, et les placeholders qui ne correspondent pas entre la chaîne de base et la traduction - celui qui fait vraiment planter une appli. Un seul fichier Python, uniquement la bibliothèque standard, zéro dépendance.",
  "hero.description2":
    "Utilisez-le en CLI à la main ou dans un hook pre-commit, comme une GitHub Action qui bloque la CI, ou comme un agent skill pour que Claude Code (ou tout agent utilisant le standard ouvert Agent Skills) vérifie ses propres changements d'i18n avant de vous renvoyer une PR.",

  "install.heading": "Installation",
  "install.altIntro": "Ou passez l'installation, puisque c'est un seul fichier sans dépendances :",

  "usage.heading": "Utilisation",
  "usage.exitCodes":
    "--base vaut en par défaut - le nom de locale (nom de fichier sans extension) auquel chaque autre fichier détecté est comparé. Le code de sortie est 0 quand tout est propre, 1 quand translint a trouvé quelque chose à corriger, 2 si un chemin n'a pas pu être lu ou parsé du tout - une erreur de JSON invalide et un vrai résultat de lint ne se ressemblent jamais pour un script.",

  "demo.heading": "Voyez-le détecter un problème",
  "demo.intro":
    "C'est une vraie sortie, pas une maquette. examples/locales/ dans le dépôt contient un fichier de base (en.json) et deux traductions (fr.json, de.json) avec quelques vrais problèmes plantés intentionnellement. Voici translint exécuté contre eux, copié tel quel - les catégories en rouge font échouer l'exécution par défaut, celles en ambre sont signalées mais ne font échouer l'exécution qu'avec --strict.",
  "demo.terminalAriaLabel": "Sortie terminal de translint",
  "demo.note":
    "translint sort avec le code 1 dès qu'il y a quelque chose à corriger. Le code 0 veut dire que chaque locale est propre ; le code 2 veut dire qu'un chemin n'a même pas pu être lu ou parsé. Essayez vous-même sur ces mêmes fichiers : translint examples/locales --base en.",

  "features.heading": "Ce qu'il vérifie",

  "features.missingKeys.title": "Clés manquantes",
  "features.missingKeys.desc": "Une clé qui existe dans la locale de base mais qui n'a jamais atterri dans une traduction.",

  "features.placeholderMismatches.title": "Placeholders qui ne correspondent pas",
  "features.placeholderMismatches.desc":
    "{amount} est devenu {total} - le bug qui passe très bien dans tous les tests qui ne passent pas de vraies données d'interpolation, et qui plante dès que l'un d'eux le fait.",

  "features.emptyValues.title": "Valeurs vides",
  "features.emptyValues.desc": "Une clé qui existe mais qui n'a jamais été remplie.",

  "features.extraKeys.title": "Clés en trop",
  "features.extraKeys.desc": "Reste d'un renommage. Signalé, mais ne fait échouer l'exécution que si vous passez --strict.",

  "features.possiblyUntranslated.title": "Potentiellement non traduit",
  "features.possiblyUntranslated.desc":
    "Une heuristique : la valeur reste identique, octet pour octet, à la base après suppression des placeholders, de la ponctuation et des chiffres. Autorisez les vraies correspondances avec --allow-identical ou --do-not-translate.",

  "features.fileFormats.title": "Trois formats de fichier",
  "features.fileFormats.desc":
    "JSON (clés imbriquées ou à plat en notation pointée), gettext .po/.pot, et Java .properties, détectés automatiquement par extension.",

  "features.placeholderStyles.title": "Cinq styles de placeholder",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, et ${name}/$name, comparés comme un multi-ensemble pour qu'un placeholder en double ne passe pas inaperçu.",

  "features.scriptableOutput.title": "Sortie scriptable",
  "features.scriptableOutput.desc":
    "--json affiche des résultats lisibles par une machine. Les codes de sortie sont tout aussi adaptés aux scripts : 0 propre, 1 des résultats trouvés, 2 lecture ou parsing impossible.",

  "features.runsThreeWays.title": "Fonctionne de trois façons",
  "features.runsThreeWays.desc":
    "En CLI à la main ou dans un hook pre-commit, comme une GitHub Action qui bloque la CI, ou comme un skill Claude Code / Agent Skills, pour qu'un agent de codage vérifie ses propres changements d'i18n avant de renvoyer une PR.",

  "limits.heading": "Ce qu'il ne fait pas",
  "limits.noYaml": "Pas de fichiers de locale YAML. Parser YAML en toute sécurité nécessite une dépendance, et translint est volontairement stdlib uniquement.",
  "limits.heuristicOnly":
    "La vérification des valeurs non traduites est une heuristique, pas une règle stricte. Elle signale ce qui semble non traduit ; elle ne prouve rien.",
  "limits.noTranslationQuality":
    "Il ne traduit rien, et ne valide pas la qualité de la traduction - juste la structure : clés, placeholders, valeurs non vides.",
  "limits.nonRecursive":
    "Scan de répertoire non récursif. Pointez-le vers un répertoire et il vérifie les fichiers directement dedans, pas les sous-répertoires.",

  "footer.license": "Prosperity Public License 3.0.0 - libre pour un usage non commercial.",
};
