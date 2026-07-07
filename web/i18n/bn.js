// Bengali (bn). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - আপনার locale ফাইলের জন্য একটি লিন্টার",
  "meta.description":
    "translint হলো একটি নির্ভরতাবিহীন CLI, যা locale ফাইলগুলোকে একটি মূল ফাইলের সাথে মিলিয়ে দেখে এবং অনুপস্থিত কী, প্লেসহোল্ডার অমিল, ফাঁকা মান, এবং অননূদিত স্ট্রিং চিহ্নিত করে। একটিমাত্র Python ফাইল, শুধু স্ট্যান্ডার্ড লাইব্রেরি।",

  "skipLink": "মূল বিষয়বস্তুতে যান",
  "nav.ariaLabel": "সাইট",
  "theme.switcherLabel": "থিম",
  "theme.ariaLabel": "রঙের থিম",
  "lang.switcherLabel": "ভাষা",
  "lang.ariaLabel": "ইন্টারফেসের ভাষা",

  "hero.tagline": "একটি অনুপস্থিত অনুবাদ একটি UI বাগ। নাম বদলানো প্লেসহোল্ডার একটি ক্র্যাশ।",
  "hero.description1":
    "translint আপনার locale ফাইলগুলোকে একটি মূল ফাইলের সাথে মিলিয়ে দেখে এবং ঠিক এগুলোই চিহ্নিত করে: অনুপস্থিত কী, রয়ে যাওয়া বাড়তি কী, ফাঁকা মান, এমন মান যা এখনও অনূদিত হয়নি বলে মনে হয়, এবং মূল স্ট্রিং ও অনুবাদের মধ্যে অমিল হওয়া প্লেসহোল্ডার - এটাই সেই বাগ যা সত্যিই একটি অ্যাপ ক্র্যাশ করিয়ে দেয়। একটিমাত্র Python ফাইল, শুধু স্ট্যান্ডার্ড লাইব্রেরি, কোনো নির্ভরতা ছাড়াই।",
  "hero.description2":
    "এটিকে হাতে CLI হিসেবে চালান, বা একটি pre-commit hook-এ, CI আটকে রাখা একটি GitHub Action হিসেবে, অথবা একটি agent skill হিসেবে, যাতে Claude Code (বা খোলা Agent Skills মান ব্যবহার করা যেকোনো agent) আপনাকে একটি PR ফেরত দেওয়ার আগে নিজের i18n পরিবর্তনগুলো নিজেই যাচাই করে নেয়।",

  "install.heading": "ইনস্টল",
  "install.altIntro": "অথবা ইনস্টল করাটাই বাদ দিন, যেহেতু এটি নির্ভরতাবিহীন একটিমাত্র ফাইল:",

  "usage.heading": "ব্যবহার",
  "usage.exitCodes":
    "--base ডিফল্টভাবে en হয় - সেই locale নাম (এক্সটেনশন বাদে ফাইলের নাম) যার বিপরীতে খুঁজে পাওয়া প্রতিটি অন্য ফাইল যাচাই করা হয়। এক্সিট কোড 0 হয় যখন সবকিছু পরিষ্কার থাকে, 1 হয় যখন translint ঠিক করার মতো কিছু খুঁজে পায়, 2 হয় যদি কোনো path একেবারেই পড়া বা পার্স করা না যায় - একটি ভাঙা JSON এরর আর একটি আসল lint ফাইন্ডিং কোনো স্ক্রিপ্টের কাছে কখনো একরকম দেখায় না।",

  "demo.heading": "এটাকে কিছু ধরতে দেখুন",
  "demo.intro":
    "এটা আসল আউটপুট, কোনো মকআপ নয়। রিপোর মধ্যে examples/locales/-এ একটি মূল ফাইল (en.json) আর দুটো অনুবাদ (fr.json, de.json) আছে, যেখানে ইচ্ছাকৃতভাবে বসানো কিছু আসল সমস্যা রয়েছে। নিচে সেগুলোর বিপরীতে translint চালানোর ফলাফল, হুবহু কপি করা - লাল ক্যাটেগরিগুলো ডিফল্টভাবে রান ফেল করায়, অ্যাম্বার রঙেরগুলো শুধু রিপোর্ট করা হয় আর --strict দিলে তবেই ফেল করে।",
  "demo.terminalAriaLabel": "translint থেকে টার্মিনাল আউটপুট",
  "demo.note":
    "ঠিক করার মতো কিছু থাকলেই translint 1 নিয়ে এক্সিট করে। 0 দিয়ে এক্সিট মানে প্রতিটি locale পরিষ্কার; 2 দিয়ে এক্সিট মানে কোনো path একেবারেই পড়া বা পার্স করা যায়নি। একই ফাইলগুলোর বিপরীতে নিজেই চেষ্টা করে দেখুন: translint examples/locales --base en।",

  "features.heading": "এটা কী যাচাই করে",

  "features.missingKeys.title": "অনুপস্থিত কী",
  "features.missingKeys.desc": "একটি কী যা মূল locale-এ আছে কিন্তু কোনো অনুবাদে কখনো পৌঁছায়নি।",

  "features.placeholderMismatches.title": "প্লেসহোল্ডার অমিল",
  "features.placeholderMismatches.desc":
    "{amount} হয়ে গেছে {total} - এই বাগটা আসল ইন্টারপোলেশন ডেটা পাস না করা প্রতিটি টেস্টে একদম ঠিকভাবে চলে, আর যে মুহূর্তে কেউ তা করে, ক্র্যাশ করে বসে।",

  "features.emptyValues.title": "ফাঁকা মান",
  "features.emptyValues.desc": "একটি কী যা আছে কিন্তু কখনো পূরণ করা হয়নি।",

  "features.extraKeys.title": "বাড়তি কী",
  "features.extraKeys.desc": "নাম বদলানোর পর রয়ে যাওয়া। রিপোর্ট করা হয়, কিন্তু আপনি --strict না দিলে রান ফেল করায় না।",

  "features.possiblyUntranslated.title": "সম্ভবত অনূদিত হয়নি",
  "features.possiblyUntranslated.desc":
    "একটা হিউরিস্টিক: প্লেসহোল্ডার, যতিচিহ্ন, আর সংখ্যা বাদ দেওয়ার পরও মানটা এখনও মূলের সাথে বাইট-বাই-বাইট অভিন্ন থেকে যায়। --allow-identical বা --do-not-translate দিয়ে আসল মিলগুলোকে অনুমতি দিন।",

  "features.fileFormats.title": "তিনটি ফাইল ফরম্যাট",
  "features.fileFormats.desc":
    "JSON (নেস্টেড বা ডট-নোটেশনের ফ্ল্যাট কী), gettext-এর .po/.pot, আর Java-র .properties, এক্সটেনশন দেখে স্বয়ংক্রিয়ভাবে শনাক্ত হয়।",

  "features.placeholderStyles.title": "পাঁচটি প্লেসহোল্ডার স্টাইল",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, আর ${name}/$name, একটি multiset হিসেবে তুলনা করা হয় যাতে ডুপ্লিকেট প্লেসহোল্ডার ফসকে না যায়।",

  "features.scriptableOutput.title": "স্ক্রিপ্টযোগ্য আউটপুট",
  "features.scriptableOutput.desc":
    "--json মেশিন-পাঠযোগ্য ফলাফল প্রিন্ট করে। এক্সিট কোডগুলোও ঠিক ততটাই স্ক্রিপ্ট-বান্ধব: 0 পরিষ্কার, 1 ফাইন্ডিংস, 2 পড়া বা পার্স করা যায়নি।",

  "features.runsThreeWays.title": "তিনভাবে চলে",
  "features.runsThreeWays.desc":
    "হাতে বা একটি pre-commit hook-এ CLI হিসেবে, CI আটকে রাখা একটি GitHub Action হিসেবে, অথবা Claude Code / Agent Skills-এর একটি skill হিসেবে, যাতে একটি কোডিং agent PR ফেরত দেওয়ার আগে নিজের i18n পরিবর্তনগুলো যাচাই করে নেয়।",

  "limits.heading": "এটা কী করে না",
  "limits.noYaml": "কোনো YAML locale ফাইল নেই। YAML নিরাপদে পার্স করতে একটি নির্ভরতা লাগে, আর translint ইচ্ছাকৃতভাবে শুধু-stdlib।",
  "limits.heuristicOnly":
    "অননূদিত-মান যাচাই একটি হিউরিস্টিক, কোনো কঠোর নিয়ম নয়। এটা যা অনূদিত হয়নি বলে মনে হয় তা চিহ্নিত করে; এটা কিছু প্রমাণ করে না।",
  "limits.noTranslationQuality":
    "এটা কিছুই অনুবাদ করে না, আর অনুবাদের মান যাচাই করে না - শুধু গঠন যাচাই করে: কী, প্লেসহোল্ডার, আর মান ফাঁকা কিনা।",
  "limits.nonRecursive":
    "নন-রিকার্সিভ ডিরেক্টরি স্ক্যান। একটি ডিরেক্টরির দিকে এটাকে নির্দেশ করুন, আর এটা সরাসরি তার ভেতরের ফাইলগুলো যাচাই করবে, সাব-ডিরেক্টরি নয়।",

  "footer.license": "Prosperity Public License 3.0.0 - অ-বাণিজ্যিক ব্যবহারের জন্য মুক্ত।",
};
