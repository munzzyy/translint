// Hindi (hi). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - आपकी locale फ़ाइलों के लिए एक लिंटर",
  "meta.description":
    "translint एक शून्य-डिपेंडेंसी वाला CLI है जो locale फ़ाइलों की तुलना एक आधार फ़ाइल से करता है और गायब कुंजियाँ, प्लेसहोल्डर बेमेल, खाली मान, और अनुवाद न की गई स्ट्रिंग्स को चिह्नित करता है। एक ही Python फ़ाइल, सिर्फ़ स्टैंडर्ड लाइब्रेरी।",

  "skipLink": "मुख्य सामग्री पर जाएँ",
  "nav.ariaLabel": "साइट",
  "theme.switcherLabel": "थीम",
  "theme.ariaLabel": "रंग थीम",
  "lang.switcherLabel": "भाषा",
  "lang.ariaLabel": "इंटरफ़ेस भाषा",

  "hero.tagline": "एक गायब अनुवाद एक UI बग है। नाम बदला हुआ प्लेसहोल्डर एक क्रैश है।",
  "hero.description1":
    "translint आपकी locale फ़ाइलों की तुलना एक आधार फ़ाइल से करता है और ठीक यही चिह्नित करता है: गायब कुंजियाँ, बची हुई फ़ालतू कुंजियाँ, खाली मान, ऐसे मान जो अब भी अनुवाद न हुए जैसे लगते हैं, और आधार स्ट्रिंग और अनुवाद के बीच बेमेल प्लेसहोल्डर - वही जो असल में ऐप को क्रैश करता है। एक ही Python फ़ाइल, सिर्फ़ स्टैंडर्ड लाइब्रेरी, शून्य डिपेंडेंसी।",
  "hero.description2":
    "इसे हाथ से CLI के तौर पर चलाएँ, या pre-commit hook में, CI को रोकने वाले GitHub Action के तौर पर, या agent skill के तौर पर ताकि Claude Code (या खुले Agent Skills स्टैंडर्ड का उपयोग करने वाला कोई भी agent) आपको PR वापस देने से पहले अपने खुद के i18n बदलावों की जाँच कर सके।",

  "install.heading": "इंस्टॉल",
  "install.altIntro": "या इंस्टॉल करना ही छोड़ दें, क्योंकि यह बिना किसी डिपेंडेंसी वाली एक ही फ़ाइल है:",

  "usage.heading": "उपयोग",
  "usage.exitCodes":
    "--base डिफ़ॉल्ट रूप से en होता है - वह locale नाम (एक्सटेंशन हटाकर फ़ाइल नाम) जिसके ख़िलाफ़ हर दूसरी मिली फ़ाइल जाँची जाती है। एग्ज़िट कोड 0 होता है जब सब कुछ साफ़ हो, 1 जब translint को कुछ ठीक करने लायक मिले, 2 अगर कोई path बिल्कुल पढ़ा या पार्स ही न किया जा सके - एक ख़राब JSON एरर और एक असली lint फ़ाइंडिंग किसी स्क्रिप्ट के लिए कभी एक जैसे नहीं दिखते।",

  "demo.heading": "इसे कुछ पकड़ते हुए देखें",
  "demo.intro":
    "यह असली आउटपुट है, कोई मॉकअप नहीं। रेपो में examples/locales/ एक आधार फ़ाइल (en.json) और दो अनुवाद (fr.json, de.json) देता है, जिनमें जान-बूझकर लगाई गई कुछ असली समस्याएँ हैं। नीचे translint को इन पर चलाकर मिला नतीजा है, ज्यों का त्यों कॉपी किया हुआ - लाल कैटेगरी डिफ़ॉल्ट रूप से रन को फ़ेल करती हैं, एम्बर वाली सिर्फ़ रिपोर्ट होती हैं और सिर्फ़ --strict के साथ फ़ेल होती हैं।",
  "demo.terminalAriaLabel": "translint से टर्मिनल आउटपुट",
  "demo.note":
    "जब भी कुछ ठीक करने लायक हो, translint 1 के साथ एग्ज़िट होता है। 0 के साथ एग्ज़िट का मतलब है हर locale साफ़ है; 2 के साथ एग्ज़िट का मतलब है कोई path पढ़ा या पार्स तक नहीं किया जा सका। इन्हीं फ़ाइलों पर ख़ुद आज़माएँ: translint examples/locales --base en।",

  "features.heading": "यह क्या जाँचता है",

  "features.missingKeys.title": "गायब कुंजियाँ",
  "features.missingKeys.desc": "एक कुंजी जो आधार locale में मौजूद है लेकिन कभी किसी अनुवाद में नहीं पहुँची।",

  "features.placeholderMismatches.title": "प्लेसहोल्डर बेमेल",
  "features.placeholderMismatches.desc":
    "{amount}, {total} बन गया - वह बग जो असली इंटरपोलेशन डेटा न भेजने वाले हर टेस्ट में बिल्कुल ठीक चलता है, और जिस पल कोई भेजता है, क्रैश हो जाता है।",

  "features.emptyValues.title": "खाली मान",
  "features.emptyValues.desc": "एक कुंजी जो मौजूद है लेकिन कभी भरी नहीं गई।",

  "features.extraKeys.title": "फ़ालतू कुंजियाँ",
  "features.extraKeys.desc": "नाम बदलने के बाद बची हुई। रिपोर्ट होती है, लेकिन जब तक आप --strict न दें, रन को फ़ेल नहीं करती।",

  "features.possiblyUntranslated.title": "शायद अनुवाद न हुआ",
  "features.possiblyUntranslated.desc":
    "एक ह्यूरिस्टिक: प्लेसहोल्डर, विराम चिह्न, और अंक हटाने के बाद भी मान बाइट-दर-बाइट आधार जैसा ही पढ़ा जाता है। असली मैच को --allow-identical या --do-not-translate से अनुमति दें।",

  "features.fileFormats.title": "तीन फ़ाइल फ़ॉर्मैट",
  "features.fileFormats.desc":
    "JSON (नेस्टेड या डॉट-नोटेशन वाली फ़्लैट कुंजियाँ), gettext की .po/.pot, और Java की .properties, एक्सटेंशन के आधार पर अपने-आप पहचानी जाती हैं।",

  "features.placeholderStyles.title": "पाँच प्लेसहोल्डर स्टाइल",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, और ${name}/$name की तुलना एक multiset की तरह की जाती है, ताकि कोई डुप्लिकेट प्लेसहोल्डर छूट न जाए।",

  "features.scriptableOutput.title": "स्क्रिप्ट के लायक आउटपुट",
  "features.scriptableOutput.desc":
    "--json मशीन द्वारा पढ़े जा सकने वाले नतीजे प्रिंट करता है। एग्ज़िट कोड भी उतने ही स्क्रिप्ट-फ़्रेंडली हैं: 0 साफ़, 1 फ़ाइंडिंग्स, 2 पढ़ा या पार्स नहीं हो सका।",

  "features.runsThreeWays.title": "तीन तरीक़ों से चलता है",
  "features.runsThreeWays.desc":
    "हाथ से या pre-commit hook में CLI के तौर पर, CI को रोकने वाले GitHub Action के तौर पर, या Claude Code / Agent Skills के skill के तौर पर, ताकि कोई कोडिंग agent PR वापस देने से पहले अपने ख़ुद के i18n बदलावों की जाँच कर सके।",

  "limits.heading": "यह क्या नहीं करता",
  "limits.noYaml": "कोई YAML locale फ़ाइलें नहीं। YAML को सुरक्षित रूप से पार्स करने के लिए एक डिपेंडेंसी चाहिए, और translint जान-बूझकर सिर्फ़-stdlib है।",
  "limits.heuristicOnly":
    "अनुवाद-न-हुए मान की जाँच एक ह्यूरिस्टिक है, कोई पक्का नियम नहीं। यह उसे चिह्नित करता है जो अनुवाद न हुआ जैसा दिखे; यह कुछ साबित नहीं करता।",
  "limits.noTranslationQuality":
    "यह कुछ भी अनुवाद नहीं करता, और अनुवाद की गुणवत्ता को सत्यापित नहीं करता - सिर्फ़ ढाँचे को: कुंजियाँ, प्लेसहोल्डर, और मान ख़ाली हैं या नहीं।",
  "limits.nonRecursive":
    "नॉन-रिकर्सिव डायरेक्टरी स्कैन। इसे किसी डायरेक्टरी की ओर इशारा करें और यह सीधे उसके अंदर मौजूद फ़ाइलों की जाँच करता है, सब-डायरेक्टरी की नहीं।",

  "footer.license": "Prosperity Public License 3.0.0 - ग़ैर-व्यावसायिक उपयोग के लिए मुफ़्त।",
};
