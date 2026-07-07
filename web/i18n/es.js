// Spanish (es). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - un linter para tus archivos de locale",
  "meta.description":
    "translint es una CLI sin dependencias que revisa los archivos de locale contra una base y detecta claves faltantes, placeholders que no coinciden, valores vacíos y cadenas sin traducir. Un solo archivo de Python, solo con la biblioteca estándar.",

  "skipLink": "Saltar al contenido principal",
  "nav.ariaLabel": "Sitio",
  "theme.switcherLabel": "Tema",
  "theme.ariaLabel": "Tema de color",
  "lang.switcherLabel": "Idioma",
  "lang.ariaLabel": "Idioma de la interfaz",

  "hero.tagline": "Una traducción faltante es un bug de la interfaz. Un placeholder renombrado es un crash.",
  "hero.description1":
    "translint revisa tus archivos de locale contra un archivo base y detecta justamente eso: claves faltantes, claves sobrantes, valores vacíos, valores que todavía parecen sin traducir, y placeholders que no coinciden entre la cadena base y la traducción - el que de verdad tumba una app. Un solo archivo de Python, solo con la biblioteca estándar, cero dependencias.",
  "hero.description2":
    "Úsalo como CLI a mano o en un hook de pre-commit, como una GitHub Action que bloquea el CI, o como un agent skill para que Claude Code (o cualquier agente que use el estándar abierto Agent Skills) revise sus propios cambios de i18n antes de devolverte un PR.",

  "install.heading": "Instalación",
  "install.altIntro": "O sáltate la instalación, ya que es un solo archivo sin dependencias:",

  "usage.heading": "Uso",
  "usage.exitCodes":
    "--base usa en por defecto - el nombre del locale (el nombre del archivo sin extensión) contra el que se revisa cada otro archivo encontrado. El código de salida es 0 cuando todo está limpio, 1 cuando translint encontró algo que corregir, 2 si no se pudo leer o parsear una ruta - un error de JSON mal formado y un hallazgo real del linter nunca se ven igual para un script.",

  "demo.heading": "Míralo detectar algo",
  "demo.intro":
    "Esto es una salida real, no una simulación. examples/locales/ en el repo incluye un archivo base (en.json) y dos traducciones (fr.json, de.json) con varios problemas reales, plantados a propósito. Abajo se muestra translint ejecutado contra ellos, copiado tal cual - las categorías en rojo hacen fallar la ejecución por defecto, las ámbar se reportan pero solo fallan con --strict.",
  "demo.terminalAriaLabel": "Salida de terminal de translint",
  "demo.note":
    "translint sale con 1 cada vez que hay algo que corregir. Salir con 0 significa que todos los locales están limpios; salir con 2 significa que ni siquiera se pudo leer o parsear una ruta. Pruébalo tú mismo contra estos mismos archivos: translint examples/locales --base en.",

  "features.heading": "Qué revisa",

  "features.missingKeys.title": "Claves faltantes",
  "features.missingKeys.desc": "Una clave que existe en el locale base pero nunca llegó a una traducción.",

  "features.placeholderMismatches.title": "Placeholders que no coinciden",
  "features.placeholderMismatches.desc":
    "{amount} se convirtió en {total} - el bug que se ve bien en cualquier prueba que no pase datos reales de interpolación, y explota en el momento en que sí lo hace.",

  "features.emptyValues.title": "Valores vacíos",
  "features.emptyValues.desc": "Una clave que existe pero nunca se llenó.",

  "features.extraKeys.title": "Claves sobrantes",
  "features.extraKeys.desc": "Sobras de un renombrado. Se reportan, pero no hacen fallar la ejecución a menos que uses --strict.",

  "features.possiblyUntranslated.title": "Posiblemente sin traducir",
  "features.possiblyUntranslated.desc":
    "Una heurística: el valor todavía se lee idéntico, byte a byte, al de la base después de quitar placeholders, puntuación y números. Permite coincidencias reales con --allow-identical o --do-not-translate.",

  "features.fileFormats.title": "Tres formatos de archivo",
  "features.fileFormats.desc":
    "JSON (claves anidadas o planas con notación de puntos), gettext .po/.pot, y Java .properties, detectados automáticamente por extensión.",

  "features.placeholderStyles.title": "Cinco estilos de placeholder",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, y ${name}/$name, comparados como multiconjunto para que un placeholder duplicado no se escape.",

  "features.scriptableOutput.title": "Salida programable",
  "features.scriptableOutput.desc":
    "--json imprime resultados legibles por máquina. Los códigos de salida son igual de amigables para scripts: 0 limpio, 1 hallazgos, 2 no se pudo leer o parsear.",

  "features.runsThreeWays.title": "Funciona de tres formas",
  "features.runsThreeWays.desc":
    "Como CLI a mano o en un hook de pre-commit, como una GitHub Action que bloquea el CI, o como un skill de Claude Code / Agent Skills, para que un agente revise sus propios cambios de i18n antes de devolver un PR.",

  "limits.heading": "Qué no hace",
  "limits.noYaml": "No hay archivos de locale en YAML. Parsear YAML de forma segura necesita una dependencia, y translint es solo-stdlib a propósito.",
  "limits.heuristicOnly":
    "La revisión de valores sin traducir es una heurística, no una regla estricta. Marca lo que parece sin traducir; no demuestra nada.",
  "limits.noTranslationQuality":
    "No traduce nada, y no valida la calidad de la traducción - solo la estructura: claves, placeholders, que no estén vacíos.",
  "limits.nonRecursive":
    "Escaneo no recursivo de directorios. Apúntalo a un directorio y revisa los archivos que están directamente adentro, no las subcarpetas.",

  "footer.license": "Prosperity Public License 3.0.0 - de uso libre para fines no comerciales.",
};
