// Arabic (ar) - RTL. See GLOSSARY.md for term choices and the do-not-
// translate list (translint, CLI flags, filenames, extensions, exit-code
// digits, and the literal curly-brace examples in the two placeholder-
// syntax keys). Embedded Latin-script tokens (en.json, --strict, etc.)
// render correctly inline via the browser's own bidi algorithm - no manual
// direction marks needed.

export default {
  "meta.title": "translint - أداة فحص لملفات اللغة لديك",
  "meta.description":
    "translint هي أداة CLI بلا أي تبعيات، تفحص ملفات اللغة مقارنةً بملف أساسي وتكشف عن المفاتيح الناقصة وعدم تطابق العناصر النائبة والقيم الفارغة والنصوص غير المترجمة. ملف Python واحد فقط، يعتمد على المكتبة القياسية حصرًا.",

  "skipLink": "الانتقال إلى المحتوى الرئيسي",
  "nav.ariaLabel": "الموقع",
  "theme.switcherLabel": "المظهر",
  "theme.ariaLabel": "مظهر الألوان",
  "lang.switcherLabel": "اللغة",
  "lang.ariaLabel": "لغة الواجهة",

  "hero.tagline": "الترجمة الناقصة عِلّة في الواجهة. والعنصر النائب المُعاد تسميته يتسبب في انهيار التطبيق.",
  "hero.description1":
    "يفحص translint ملفات اللغة لديك مقارنةً بملف أساسي، ويكشف تحديدًا عن: المفاتيح الناقصة، والمفاتيح الزائدة المتبقية من تغييرات سابقة، والقيم الفارغة، والقيم التي ما زالت تبدو غير مترجمة، والعناصر النائبة التي لا تتطابق بين النص الأساسي والترجمة - وهذه الأخيرة هي التي تُسقط التطبيق فعليًا. ملف Python واحد فقط، يعتمد على المكتبة القياسية حصرًا، وبلا أي تبعيات.",
  "hero.description2":
    "شغّله كأداة CLI يدويًا أو داخل خطاف pre-commit، أو كإجراء GitHub Action يمنع دمج الكود عند وجود مشكلات في CI، أو كـ agent skill بحيث يتحقق Claude Code (أو أي عامل ذكي يستخدم معيار Agent Skills المفتوح) من تغييرات i18n الخاصة به قبل أن يُرجع لك طلب دمج (PR).",

  "install.heading": "التثبيت",
  "install.altIntro": "أو تجاوز التثبيت تمامًا، فهو ملف واحد بلا أي تبعيات:",

  "usage.heading": "الاستخدام",
  "usage.exitCodes":
    "القيمة الافتراضية لـ --base هي en - وهي اسم اللغة (اسم الملف بلا امتداد) الذي يُقارَن به كل ملف آخر يتم اكتشافه. رمز الخروج هو 0 عندما يكون كل شيء سليمًا، و1 عندما يعثر translint على ما يجب إصلاحه، و2 إذا تعذّرت قراءة مسار ما أو تحليله على الإطلاق - فخطأ JSON تالف واكتشاف فحص حقيقي لا يبدوان أبدًا متماثلين بالنسبة إلى أي سكربت.",

  "demo.heading": "شاهده يكتشف مشكلة فعلية",
  "demo.intro":
    "هذا ناتج حقيقي، وليس نموذجًا تجريبيًا. يحتوي مجلد examples/locales/ في المستودع على ملف أساسي واحد (en.json) وترجمتين (fr.json وde.json) وبهما عدد من المشكلات الحقيقية المزروعة عمدًا. وفيما يلي نتيجة تشغيل translint عليها، منسوخة حرفيًا - الفئات الحمراء تُفشل التشغيل افتراضيًا، أما الفئات الكهرمانية فتُذكر في التقرير فقط ولا تُفشل التشغيل إلا مع --strict.",
  "demo.terminalAriaLabel": "ناتج الطرفية من translint",
  "demo.note":
    "يخرج translint برمز 1 كلما وُجد ما يجب إصلاحه. رمز الخروج 0 يعني أن كل لغة سليمة؛ ورمز الخروج 2 يعني أن مسارًا ما تعذّرت قراءته أو تحليله من الأساس. جرّبه بنفسك على هذه الملفات ذاتها: translint examples/locales --base en.",

  "features.heading": "ما الذي يفحصه",

  "features.missingKeys.title": "المفاتيح الناقصة",
  "features.missingKeys.desc": "مفتاح موجود في اللغة الأساسية لكنه لم يصل قط إلى الترجمة.",

  "features.placeholderMismatches.title": "عدم تطابق العناصر النائبة",
  "features.placeholderMismatches.desc":
    "تحوّل {amount} إلى {total} - وهو الخلل الذي يمر بسلام في أي اختبار لا يمرّر بيانات استبدال حقيقية، وينهار في اللحظة التي يفعل فيها أحدهم ذلك.",

  "features.emptyValues.title": "القيم الفارغة",
  "features.emptyValues.desc": "مفتاح موجود لكن لم يُملأ قط.",

  "features.extraKeys.title": "المفاتيح الزائدة",
  "features.extraKeys.desc": "متبقية من عملية إعادة تسمية. تُذكر في التقرير، لكنها لا تُفشل التشغيل إلا إذا مرّرت --strict.",

  "features.possiblyUntranslated.title": "يُحتمل أنه غير مترجم",
  "features.possiblyUntranslated.desc":
    "فحص استدلالي: لا تزال القيمة مطابقة تمامًا للأساس، بايتًا ببايت، بعد إزالة العناصر النائبة وعلامات الترقيم والأرقام. اسمح بالتطابقات الحقيقية عبر --allow-identical أو --do-not-translate.",

  "features.fileFormats.title": "ثلاث صيغ ملفات",
  "features.fileFormats.desc":
    "JSON (مفاتيح متداخلة أو مسطّحة بترميز النقاط)، وصيغة gettext ‏.po/.pot، وصيغة Java ‏.properties، ويُكتشف النوع تلقائيًا حسب الامتداد.",

  "features.placeholderStyles.title": "خمسة أنماط للعناصر النائبة",
  "features.placeholderStyles.desc":
    "{name}، و{{name}}، و%s/%d/%1$s، و%(name)s، و${name}/$name، تتم مقارنتها كمجموعة متعددة (multiset) بحيث لا يفلت أي عنصر نائب مكرر.",

  "features.scriptableOutput.title": "ناتج قابل للبرمجة",
  "features.scriptableOutput.desc":
    "يطبع --json نتائج قابلة لقراءة الآلة. ورموز الخروج مناسبة للسكربتات بالقدر نفسه: 0 سليم، و1 وُجدت ملاحظات، و2 تعذّرت القراءة أو التحليل.",

  "features.runsThreeWays.title": "يعمل بثلاث طرق",
  "features.runsThreeWays.desc":
    "كأداة CLI يدويًا أو داخل خطاف pre-commit، أو كإجراء GitHub Action يمنع دمج الكود عند وجود مشكلات في CI، أو كـ skill من Claude Code / Agent Skills، بحيث يتحقق العامل الذكي المبرمِج من تغييرات i18n الخاصة به قبل إرجاع طلب الدمج (PR).",

  "limits.heading": "ما لا يفعله",
  "limits.noYaml": "لا يدعم ملفات اللغة بصيغة YAML. تحليل YAML بأمان يتطلب تبعية خارجية، وtranslint مصمم عمدًا للاعتماد على المكتبة القياسية فقط.",
  "limits.heuristicOnly":
    "فحص القيم غير المترجمة هو أسلوب استدلالي، وليس قاعدة قطعية. فهو يُشير إلى ما يبدو غير مترجم، لكنه لا يثبت شيئًا.",
  "limits.noTranslationQuality":
    "لا يترجم أي شيء، ولا يتحقق من جودة الترجمة - بل يفحص البنية فقط: المفاتيح والعناصر النائبة وعدم وجود قيم فارغة.",
  "limits.nonRecursive":
    "فحص غير تكراري للمجلدات. وجّهه إلى مجلد وسيفحص الملفات الموجودة مباشرة بداخله فقط، وليس المجلدات الفرعية.",

  "footer.license": "Prosperity Public License 3.0.0 - مجاني للاستخدام غير التجاري.",
};
