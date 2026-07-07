// Simplified Chinese (zh-Hans). See GLOSSARY.md for term choices and the
// do-not-translate list (translint, CLI flags, filenames, extensions,
// exit-code digits, and the literal curly-brace examples in the two
// placeholder-syntax keys).

export default {
  "meta.title": "translint - 面向语言文件的检查工具",
  "meta.description":
    "translint 是一个零依赖的 CLI 工具,用于将语言文件与基准文件比对,检测缺失的键、占位符不匹配、空值以及未翻译的字符串。单个 Python 文件,仅使用标准库。",

  "skipLink": "跳到主要内容",
  "nav.ariaLabel": "网站",
  "theme.switcherLabel": "主题",
  "theme.ariaLabel": "配色主题",
  "lang.switcherLabel": "语言",
  "lang.ariaLabel": "界面语言",

  "hero.tagline": "缺失的翻译是界面上的 bug。改名的占位符会导致崩溃。",
  "hero.description1":
    "translint 会将你的语言文件与基准文件比对,并精确检测出这些问题:缺失的键、遗留的多余键、空值、看起来仍未翻译的值,以及基准字符串和译文之间不匹配的占位符——最后一种才是真正会让应用崩溃的问题。单个 Python 文件,仅使用标准库,零依赖。",
  "hero.description2":
    "你可以手动以 CLI 方式运行它、放进 pre-commit 钩子里运行、作为在 CI 中把关的 GitHub Action 运行,也可以作为 agent skill 使用,让 Claude Code(或任何遵循开放的 Agent Skills 标准的智能体)在把 PR 交给你之前先检查自己改动的 i18n。",

  "install.heading": "安装",
  "install.altIntro": "或者干脆不安装,反正它只是一个没有依赖的文件:",

  "usage.heading": "用法",
  "usage.exitCodes":
    "--base 默认是 en——也就是每个被发现的其他文件都要据以检查的区域设置名称(文件名去掉扩展名)。退出码为 0 表示一切正常,1 表示 translint 发现了需要修复的问题,2 表示某个路径根本无法读取或解析——损坏的 JSON 报错和真正的检查结果,对脚本来说永远不会是同一回事。",

  "demo.heading": "看它抓出问题",
  "demo.intro":
    "这是真实输出,不是模拟效果。仓库中的 examples/locales/ 目录提供了一个基准文件(en.json)和两个译文文件(fr.json、de.json),里面有几个真实的、故意埋下的问题。下面是对它们运行 translint 的结果,原样复制——红色类别默认会让运行失败,琥珀色类别只会被报告,只有加上 --strict 才会失败。",
  "demo.terminalAriaLabel": "translint 的终端输出",
  "demo.note":
    "只要有需要修复的问题,translint 就会以退出码 1 结束。退出码 0 表示所有语言文件都干净;退出码 2 表示某个路径连读取或解析都做不到。你也可以对着同样的文件自己试试:translint examples/locales --base en。",

  "features.heading": "它会检查什么",

  "features.missingKeys.title": "缺失的键",
  "features.missingKeys.desc": "存在于基准语言文件中,却始终没有进入译文的键。",

  "features.placeholderMismatches.title": "占位符不匹配",
  "features.placeholderMismatches.desc":
    "{amount} 变成了 {total}——这种 bug 在任何不传入真实插值数据的测试中都表现正常,一旦真的传入数据就会报错。",

  "features.emptyValues.title": "空值",
  "features.emptyValues.desc": "存在但从未被填写的键。",

  "features.extraKeys.title": "多余的键",
  "features.extraKeys.desc": "重命名后遗留下来的键。会被报告,但除非加上 --strict,否则不会让运行失败。",

  "features.possiblyUntranslated.title": "可能未翻译",
  "features.possiblyUntranslated.desc":
    "一种启发式检测:去掉占位符、标点和数字之后,该值仍然与基准逐字节相同。可以用 --allow-identical 或 --do-not-translate 把真正符合预期的匹配加入白名单。",

  "features.fileFormats.title": "三种文件格式",
  "features.fileFormats.desc":
    "JSON(嵌套或使用点号分隔的扁平键)、gettext 的 .po/.pot,以及 Java 的 .properties,均根据扩展名自动识别。",

  "features.placeholderStyles.title": "五种占位符风格",
  "features.placeholderStyles.desc":
    "{name}、{{name}}、%s/%d/%1$s、%(name)s,以及 ${name}/$name,都会按多重集合的方式比对,因此重复的占位符也不会被漏掉。",

  "features.scriptableOutput.title": "可编写脚本的输出",
  "features.scriptableOutput.desc":
    "--json 会输出机器可读的结果。退出码同样适合写脚本:0 表示干净,1 表示有检查结果,2 表示无法读取或解析。",

  "features.runsThreeWays.title": "三种运行方式",
  "features.runsThreeWays.desc":
    "可以手动以 CLI 方式运行、放进 pre-commit 钩子,也可以作为在 CI 中把关的 GitHub Action 运行,或者作为 Claude Code / Agent Skills 的 skill,让编码智能体在交回 PR 之前先检查自己改动的 i18n。",

  "limits.heading": "它不会做什么",
  "limits.noYaml": "不支持 YAML 格式的语言文件。安全解析 YAML 需要额外依赖,而 translint 就是刻意只依赖标准库。",
  "limits.heuristicOnly":
    "未翻译值的检测只是一种启发式方法,不是硬性规则。它只是标记出看起来未翻译的内容,并不能证明什么。",
  "limits.noTranslationQuality":
    "它不会翻译任何内容,也不检查翻译质量——只检查结构:键、占位符,以及是否为空。",
  "limits.nonRecursive":
    "目录扫描不是递归的。指定一个目录后,它只检查该目录下的文件,不会检查子目录。",

  "footer.license": "Prosperity Public License 3.0.0——仅限非商业用途免费使用。",
};
