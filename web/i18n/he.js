// Hebrew (he) - RTL. See GLOSSARY.md for term choices and the do-not-
// translate list (translint, CLI flags, filenames, extensions, exit-code
// digits, and the literal curly-brace examples in the two placeholder-
// syntax keys). Embedded Latin-script tokens (en.json, --strict, etc.)
// render correctly inline via the browser's own bidi algorithm - no manual
// direction marks needed.

export default {
  "meta.title": "translint - לינטר לקובצי הלוקאל שלך",
  "meta.description":
    "translint הוא CLI ללא תלויות שבודק קובצי לוקאל מול קובץ בסיס ומסמן מפתחות חסרים, אי-התאמות בממלאי מקום, ערכים ריקים ומחרוזות שלא תורגמו. קובץ Python אחד בלבד, רק ספריית התקן.",

  "skipLink": "דלג לתוכן הראשי",
  "nav.ariaLabel": "אתר",
  "theme.switcherLabel": "ערכת נושא",
  "theme.ariaLabel": "ערכת צבעים",
  "lang.switcherLabel": "שפה",
  "lang.ariaLabel": "שפת הממשק",

  "hero.tagline": "תרגום חסר הוא באג בממשק. ממלא מקום ששונה שמו הוא קריסה.",
  "hero.description1":
    "translint בודק את קובצי הלוקאל שלך מול קובץ בסיס ומסמן בדיוק את זה: מפתחות חסרים, מפתחות מיותרים שנשארו מאחור, ערכים ריקים, ערכים שעדיין נראים כלא מתורגמים, וממלאי מקום שלא תואמים בין המחרוזת הבסיסית לתרגום - זה שבאמת מפיל אפליקציה. קובץ Python אחד בלבד, רק ספריית התקן, בלי שום תלות.",
  "hero.description2":
    "הריצו אותו כ-CLI ידנית או בתוך pre-commit hook, כ-GitHub Action שחוסם את ה-CI, או כ-agent skill כדי ש-Claude Code (או כל agent שמשתמש בתקן הפתוח Agent Skills) יבדוק את שינויי ה-i18n שלו לפני שהוא מחזיר לכם PR.",

  "install.heading": "התקנה",
  "install.altIntro": "או שדלגו על ההתקנה לגמרי, כי זה קובץ אחד בלי תלויות:",

  "usage.heading": "שימוש",
  "usage.exitCodes":
    "ברירת המחדל של --base היא en - שם הלוקאל (שם הקובץ בלי הסיומת) שכל קובץ אחר שנמצא נבדק מולו. קוד היציאה הוא 0 כשהכול נקי, 1 כש-translint מצא משהו לתקן, 2 אם נתיב לא היה ניתן לקריאה או לפענוח בכלל - שגיאת JSON פגום וממצא lint אמיתי לעולם לא נראים אותו דבר מבחינת סקריפט.",

  "demo.heading": "תראו אותו תופס משהו",
  "demo.intro":
    "זו פלט אמיתי, לא דמו מבוים. התיקייה examples/locales/ במאגר כוללת קובץ בסיס אחד (en.json) ושני תרגומים (fr.json, de.json) עם כמה בעיות אמיתיות שנשתלו בכוונה. למטה מוצג translint שהורץ מולם, מועתק כלשונו - קטגוריות באדום מכשילות את הריצה כברירת מחדל, קטגוריות בענבר רק מדווחות ונכשלות רק תחת --strict.",
  "demo.terminalAriaLabel": "פלט מסוף מ-translint",
  "demo.note":
    "translint יוצא עם קוד 1 בכל פעם שיש משהו לתקן. יציאה עם 0 אומרת שכל לוקאל נקי; יציאה עם 2 אומרת שנתיב אפילו לא היה ניתן לקריאה או לפענוח. נסו בעצמכם על אותם קבצים: translint examples/locales --base en.",

  "features.heading": "מה הוא בודק",

  "features.missingKeys.title": "מפתחות חסרים",
  "features.missingKeys.desc": "מפתח שקיים בלוקאל הבסיס אבל מעולם לא הגיע לתרגום.",

  "features.placeholderMismatches.title": "אי-התאמות בממלאי מקום",
  "features.placeholderMismatches.desc":
    "{amount} הפך ל-{total} - הבאג שרץ מצוין בכל בדיקה שלא מעבירה נתוני אינטרפולציה אמיתיים, ומתרסק ברגע שמישהו כן עושה זאת.",

  "features.emptyValues.title": "ערכים ריקים",
  "features.emptyValues.desc": "מפתח שקיים אבל מעולם לא מולא.",

  "features.extraKeys.title": "מפתחות מיותרים",
  "features.extraKeys.desc": "שארית משינוי שם. מדווח, אבל לא מכשיל את הריצה אלא אם תעבירו --strict.",

  "features.possiblyUntranslated.title": "אולי לא מתורגם",
  "features.possiblyUntranslated.desc":
    "היוריסטיקה: הערך עדיין נקרא זהה בייט לבייט לבסיס אחרי הסרת ממלאי מקום, סימני פיסוק ומספרים. אפשרו התאמות אמיתיות עם --allow-identical או --do-not-translate.",

  "features.fileFormats.title": "שלושה פורמטים של קבצים",
  "features.fileFormats.desc":
    "JSON (מפתחות מקוננים או שטוחים בסימון נקודות), ‎.po/.pot של gettext, ו-‎.properties של Java, מזוהים אוטומטית לפי הסיומת.",

  "features.placeholderStyles.title": "חמישה סגנונות של ממלאי מקום",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, ו-${name}/$name, מושווים כמולטיסט כך שממלא מקום כפול לא יחמוק.",

  "features.scriptableOutput.title": "פלט הניתן לתסריט",
  "features.scriptableOutput.desc":
    "‎--json מדפיס תוצאות קריאות למכונה. קודי היציאה ידידותיים לתסריטים באותה מידה: 0 נקי, 1 ממצאים, 2 לא ניתן לקריאה או לפענוח.",

  "features.runsThreeWays.title": "פועל בשלוש דרכים",
  "features.runsThreeWays.desc":
    "כ-CLI ידנית או בתוך pre-commit hook, כ-GitHub Action שחוסם את ה-CI, או כ-skill של Claude Code / Agent Skills, כדי שסוכן שכותב קוד יבדוק את שינויי ה-i18n שלו לפני שהוא מחזיר PR.",

  "limits.heading": "מה הוא לא עושה",
  "limits.noYaml": "אין קובצי לוקאל בפורמט YAML. פענוח בטוח של YAML דורש תלות, ו-translint נשען בכוונה רק על ספריית התקן.",
  "limits.heuristicOnly":
    "בדיקת הערכים הלא מתורגמים היא היוריסטיקה, לא כלל נוקשה. היא מסמנת מה שנראה לא מתורגם; היא לא מוכיחה שום דבר.",
  "limits.noTranslationQuality":
    "הוא לא מתרגם שום דבר, ולא בודק את איכות התרגום - רק את המבנה: מפתחות, ממלאי מקום, ואם הערכים לא ריקים.",
  "limits.nonRecursive":
    "סריקת תיקיות לא רקורסיבית. הפנו אותו לתיקייה והוא יבדוק את הקבצים שנמצאים ישירות בתוכה, לא את תת-התיקיות.",

  "footer.license": "Prosperity Public License 3.0.0 - חופשי לשימוש לא מסחרי.",
};
