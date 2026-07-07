// Persian (fa) - RTL. See GLOSSARY.md for term choices and the do-not-
// translate list (translint, CLI flags, filenames, extensions, exit-code
// digits, and the literal curly-brace examples in the two placeholder-
// syntax keys). "locale" and "placeholder" stay in Latin script embedded in
// the Persian prose (common Pinglish code-switching for these two technical
// nouns), matching GLOSSARY.md's term table. Embedded Latin-script tokens
// render correctly inline via the browser's own bidi algorithm.

export default {
  "meta.title": "translint - یک linter برای فایل‌های locale شما",
  "meta.description":
    "translint یک CLI بدون هیچ وابستگی است که فایل‌های locale را با یک فایل پایه مقایسه می‌کند و کلیدهای گم‌شده، ناهماهنگی placeholder، مقادیر خالی و رشته‌های ترجمه‌نشده را مشخص می‌کند. فقط یک فایل Python، فقط با کتابخانه استاندارد.",

  "skipLink": "پرش به محتوای اصلی",
  "nav.ariaLabel": "سایت",
  "theme.switcherLabel": "پوسته",
  "theme.ariaLabel": "پوسته رنگی",
  "lang.switcherLabel": "زبان",
  "lang.ariaLabel": "زبان رابط کاربری",

  "hero.tagline": "یک ترجمه‌ی گم‌شده یک باگ در رابط کاربری است. یک placeholder که تغییر نام داده، یک کرش است.",
  "hero.description1":
    "translint فایل‌های locale شما را با یک فایل پایه مقایسه می‌کند و دقیقاً همین‌ها را مشخص می‌کند: کلیدهای گم‌شده، کلیدهای اضافیِ باقی‌مانده، مقادیر خالی، مقادیری که هنوز ترجمه‌نشده به نظر می‌رسند، و placeholder‌هایی که بین رشته‌ی پایه و ترجمه با هم مطابقت ندارند - همان چیزی که واقعاً یک اپ را از کار می‌اندازد. فقط یک فایل Python، فقط با کتابخانه استاندارد، بدون هیچ وابستگی.",
  "hero.description2":
    "آن را به‌صورت CLI و دستی اجرا کنید، یا در یک pre-commit hook، یا به‌عنوان یک GitHub Action که CI را کنترل می‌کند، یا به‌عنوان یک agent skill تا Claude Code (یا هر عاملی که از استاندارد باز Agent Skills استفاده می‌کند) تغییرات i18n خودش را پیش از برگرداندن یک PR به شما بررسی کند.",

  "install.heading": "نصب",
  "install.altIntro": "یا اصلاً نصبش نکنید، چون فقط یک فایل بدون هیچ وابستگی است:",

  "usage.heading": "نحوه استفاده",
  "usage.exitCodes":
    "مقدار پیش‌فرض --base برابر با en است - یعنی نام locale (نام فایل بدون پسوند) که هر فایل دیگری که پیدا شود با آن مقایسه می‌شود. کد خروج برابر 0 است وقتی همه‌چیز تمیز است، 1 وقتی translint چیزی برای اصلاح پیدا کرده، و 2 اگر یک مسیر اصلاً قابل خواندن یا تجزیه نبوده - یک خطای JSON خراب و یک یافته‌ی واقعیِ lint هرگز برای یک اسکریپت یکسان به نظر نمی‌رسند.",

  "demo.heading": "ببینید چطور یک مشکل را پیدا می‌کند",
  "demo.intro":
    "این یک خروجی واقعی است، نه یک نمونه‌ی ساختگی. پوشه‌ی examples/locales/ در ریپو یک فایل پایه (en.json) و دو ترجمه (fr.json، de.json) دارد که چند مشکل واقعی و عمداً کاشته‌شده در آن‌ها وجود دارد. در زیر translint روی همین فایل‌ها اجرا شده و خروجی‌اش عیناً کپی شده - دسته‌های قرمز به‌طور پیش‌فرض باعث شکست اجرا می‌شوند، دسته‌های کهربایی فقط گزارش می‌شوند و تنها با --strict باعث شکست می‌شوند.",
  "demo.terminalAriaLabel": "خروجی ترمینال از translint",
  "demo.note":
    "translint هر وقت چیزی برای اصلاح وجود داشته باشد با کد 1 خارج می‌شود. خروج با 0 یعنی هر locale تمیز است؛ خروج با 2 یعنی حتی نتوانسته یک مسیر را بخواند یا تجزیه کند. خودتان روی همین فایل‌ها امتحان کنید: translint examples/locales --base en.",

  "features.heading": "چه چیزی را بررسی می‌کند",

  "features.missingKeys.title": "کلیدهای گم‌شده",
  "features.missingKeys.desc": "کلیدی که در locale پایه وجود دارد اما هرگز به یک ترجمه راه پیدا نکرده.",

  "features.placeholderMismatches.title": "ناهماهنگی‌های placeholder",
  "features.placeholderMismatches.desc":
    "{amount} تبدیل شده به {total} - باگی که در هر تستی که داده‌ی واقعیِ درون‌گذاری را پاس نمی‌دهد کاملاً درست کار می‌کند، و درست همان لحظه‌ای که یکی این کار را بکند، خراب می‌شود.",

  "features.emptyValues.title": "مقادیر خالی",
  "features.emptyValues.desc": "کلیدی که وجود دارد اما هرگز پر نشده.",

  "features.extraKeys.title": "کلیدهای اضافی",
  "features.extraKeys.desc": "باقی‌مانده از یک تغییر نام. گزارش می‌شود، اما باعث شکست اجرا نمی‌شود مگر اینکه --strict را پاس دهید.",

  "features.possiblyUntranslated.title": "احتمالاً ترجمه‌نشده",
  "features.possiblyUntranslated.desc":
    "یک روش ابتکاری: مقدار پس از حذف placeholder‌ها، علائم نگارشی و اعداد، هنوز بایت‌به‌بایت با مقدار پایه یکسان خوانده می‌شود. با --allow-identical یا --do-not-translate به تطابق‌های واقعی اجازه دهید.",

  "features.fileFormats.title": "سه قالب فایل",
  "features.fileFormats.desc":
    "JSON (کلیدهای تودرتو یا مسطح با نشانه‌گذاری نقطه‌ای)، .po/.pot از gettext، و .properties از Java، که همه بر اساس پسوند به‌طور خودکار شناسایی می‌شوند.",

  "features.placeholderStyles.title": "پنج سبک placeholder",
  "features.placeholderStyles.desc":
    "{name}، {{name}}، %s/%d/%1$s، %(name)s، و ${name}/$name، که به‌صورت یک multiset مقایسه می‌شوند تا یک placeholder تکراری از دست نرود.",

  "features.scriptableOutput.title": "خروجی قابل اسکریپت‌نویسی",
  "features.scriptableOutput.desc":
    "--json نتایج قابل‌خواندن برای ماشین چاپ می‌کند. کدهای خروج هم به همان اندازه برای اسکریپت مناسب‌اند: 0 تمیز، 1 یافته، 2 قابل خواندن یا تجزیه نبوده.",

  "features.runsThreeWays.title": "به سه روش اجرا می‌شود",
  "features.runsThreeWays.desc":
    "به‌صورت CLI و دستی یا در یک pre-commit hook، به‌عنوان یک GitHub Action که CI را کنترل می‌کند، یا به‌عنوان یک skill از Claude Code / Agent Skills، تا یک عامل کدنویس پیش از برگرداندن یک PR تغییرات i18n خودش را بررسی کند.",

  "limits.heading": "چه کاری انجام نمی‌دهد",
  "limits.noYaml": "هیچ فایل locale به فرمت YAML پشتیبانی نمی‌شود. تجزیه‌ی امن YAML به یک وابستگی نیاز دارد، و translint عمداً فقط-stdlib است.",
  "limits.heuristicOnly":
    "بررسی مقادیر ترجمه‌نشده یک روش ابتکاری است، نه یک قاعده‌ی قطعی. آنچه را که ترجمه‌نشده به نظر می‌رسد مشخص می‌کند؛ چیزی را ثابت نمی‌کند.",
  "limits.noTranslationQuality":
    "این ابزار چیزی را ترجمه نمی‌کند و کیفیت ترجمه را هم بررسی نمی‌کند - فقط ساختار را بررسی می‌کند: کلیدها، placeholder‌ها، و اینکه مقادیر خالی نباشند.",
  "limits.nonRecursive":
    "پویش دایرکتوری غیربازگشتی. آن را به یک دایرکتوری اشاره دهید تا فقط فایل‌های مستقیماً داخل آن را بررسی کند، نه زیردایرکتوری‌ها را.",

  "footer.license": "Prosperity Public License 3.0.0 - رایگان برای استفاده‌ی غیرتجاری.",
};
