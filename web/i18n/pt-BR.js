// Brazilian Portuguese (pt-BR). See GLOSSARY.md for term choices and the
// do-not-translate list (translint, CLI flags, filenames, extensions,
// exit-code digits, and the literal curly-brace examples in the two
// placeholder-syntax keys).

export default {
  "meta.title": "translint - um linter para seus arquivos de locale",
  "meta.description":
    "translint é uma CLI sem dependências que verifica arquivos de locale em relação a uma base e sinaliza chaves ausentes, incompatibilidades de placeholder, valores vazios e strings não traduzidas. Um único arquivo Python, só biblioteca padrão.",

  "skipLink": "Pular para o conteúdo principal",
  "nav.ariaLabel": "Site",
  "theme.switcherLabel": "Tema",
  "theme.ariaLabel": "Tema de cor",
  "lang.switcherLabel": "Idioma",
  "lang.ariaLabel": "Idioma da interface",

  "hero.tagline": "Uma tradução faltando é um bug de interface. Um placeholder renomeado é um crash.",
  "hero.description1":
    "translint verifica seus arquivos de locale em relação a um arquivo base e sinaliza exatamente isso: chaves ausentes, chaves extras esquecidas, valores vazios, valores que ainda parecem não traduzidos, e placeholders que não correspondem entre a string base e a tradução - o que realmente derruba um app. Um único arquivo Python, só biblioteca padrão, zero dependências.",
  "hero.description2":
    "Use como CLI manualmente ou em um hook de pre-commit, como uma GitHub Action que trava a CI, ou como um agent skill para que o Claude Code (ou qualquer agente que use o padrão aberto Agent Skills) confira suas próprias mudanças de i18n antes de te devolver um PR.",

  "install.heading": "Instalação",
  "install.altIntro": "Ou pule a instalação, já que é um único arquivo sem dependências:",

  "usage.heading": "Uso",
  "usage.exitCodes":
    "--base usa en por padrão - o nome do locale (nome do arquivo sem extensão) contra o qual cada outro arquivo encontrado é verificado. O código de saída é 0 quando está tudo limpo, 1 quando o translint encontrou algo para corrigir, 2 se um caminho não pôde ser lido ou parseado - um erro de JSON quebrado e um achado real do lint nunca parecem iguais para um script.",

  "demo.heading": "Veja ele pegar algo",
  "demo.intro":
    "Essa é uma saída real, não um mockup. examples/locales/ no repositório traz um arquivo base (en.json) e duas traduções (fr.json, de.json) com alguns problemas reais, plantados de propósito. Abaixo está o translint rodando contra eles, copiado ao pé da letra - categorias em vermelho fazem a execução falhar por padrão, as âmbar são reportadas mas só falham com --strict.",
  "demo.terminalAriaLabel": "Saída de terminal do translint",
  "demo.note":
    "translint sai com 1 sempre que há algo para corrigir. Sair com 0 significa que todo locale está limpo; sair com 2 significa que nem foi possível ler ou parsear um caminho. Teste você mesmo contra esses mesmos arquivos: translint examples/locales --base en.",

  "features.heading": "O que ele verifica",

  "features.missingKeys.title": "Chaves ausentes",
  "features.missingKeys.desc": "Uma chave que existe no locale base mas nunca chegou a uma tradução.",

  "features.placeholderMismatches.title": "Incompatibilidades de placeholder",
  "features.placeholderMismatches.desc":
    "{amount} virou {total} - o bug que passa liso em qualquer teste que não usa dados reais de interpolação, e quebra no instante em que um usa.",

  "features.emptyValues.title": "Valores vazios",
  "features.emptyValues.desc": "Uma chave que existe mas nunca foi preenchida.",

  "features.extraKeys.title": "Chaves extras",
  "features.extraKeys.desc": "Sobra de uma renomeação. É reportada, mas só faz a execução falhar se você passar --strict.",

  "features.possiblyUntranslated.title": "Possivelmente não traduzido",
  "features.possiblyUntranslated.desc":
    "Uma heurística: o valor ainda lê idêntico, byte a byte, à base depois de remover placeholders, pontuação e números. Libere correspondências reais com --allow-identical ou --do-not-translate.",

  "features.fileFormats.title": "Três formatos de arquivo",
  "features.fileFormats.desc":
    "JSON (chaves aninhadas ou planas com notação de ponto), gettext .po/.pot, e Java .properties, detectados automaticamente pela extensão.",

  "features.placeholderStyles.title": "Cinco estilos de placeholder",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, e ${name}/$name, comparados como um multiset para que um placeholder duplicado não passe despercebido.",

  "features.scriptableOutput.title": "Saída scriptável",
  "features.scriptableOutput.desc":
    "--json imprime resultados legíveis por máquina. Os códigos de saída são igualmente amigáveis para scripts: 0 limpo, 1 achados, 2 não deu para ler ou parsear.",

  "features.runsThreeWays.title": "Funciona de três formas",
  "features.runsThreeWays.desc":
    "Como CLI manualmente ou em um hook de pre-commit, como uma GitHub Action que trava a CI, ou como um skill de Claude Code / Agent Skills, para que um agente de código confira suas próprias mudanças de i18n antes de devolver um PR.",

  "limits.heading": "O que ele não faz",
  "limits.noYaml": "Sem arquivos de locale em YAML. Parsear YAML com segurança precisa de uma dependência, e translint é propositalmente só-stdlib.",
  "limits.heuristicOnly":
    "A verificação de valores não traduzidos é uma heurística, não uma regra rígida. Ela sinaliza o que parece não traduzido; não prova nada.",
  "limits.noTranslationQuality":
    "Ele não traduz nada, e não valida a qualidade da tradução - só a estrutura: chaves, placeholders, valores não vazios.",
  "limits.nonRecursive":
    "Varredura de diretório não recursiva. Aponte para um diretório e ele verifica os arquivos diretamente dentro dele, não as subpastas.",

  "footer.license": "Prosperity Public License 3.0.0 - livre para uso não comercial.",
};
