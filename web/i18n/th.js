// Thai (th). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - ตัวตรวจสอบไฟล์ locale ของคุณ",
  "meta.description":
    "translint เป็น CLI ที่ไม่มี dependency คอยตรวจสอบไฟล์ locale เทียบกับไฟล์หลัก แล้วรายงานคีย์ที่ขาดหาย, placeholder ที่ไม่ตรงกัน, ค่าว่าง และข้อความที่ยังไม่ได้แปล ไฟล์ Python เดียว ใช้แค่ไลบรารีมาตรฐาน",

  "skipLink": "ข้ามไปเนื้อหาหลัก",
  "nav.ariaLabel": "เว็บไซต์",
  "theme.switcherLabel": "ธีม",
  "theme.ariaLabel": "ธีมสี",
  "lang.switcherLabel": "ภาษา",
  "lang.ariaLabel": "ภาษาของอินเทอร์เฟซ",

  "hero.tagline": "การแปลที่ขาดหายคือบั๊กของ UI ส่วน placeholder ที่ถูกเปลี่ยนชื่อคือแอปพัง",
  "hero.description1":
    "translint ตรวจสอบไฟล์ locale ของคุณเทียบกับไฟล์หลัก แล้วรายงานสิ่งเหล่านี้อย่างตรงจุด: คีย์ที่ขาดหาย, คีย์ส่วนเกินที่หลงเหลืออยู่, ค่าว่าง, ค่าที่ยังดูเหมือนไม่ได้แปล และ placeholder ที่ไม่ตรงกันระหว่างข้อความหลักกับคำแปล - ตัวที่ทำให้แอปพังจริง ๆ ไฟล์ Python เดียว ใช้แค่ไลบรารีมาตรฐาน ไม่มี dependency เลย",
  "hero.description2":
    "รันมันเป็น CLI ด้วยมือ หรือใน pre-commit hook เป็น GitHub Action ที่คอยกัน CI หรือเป็น agent skill เพื่อให้ Claude Code (หรือ agent ใด ๆ ที่ใช้มาตรฐานเปิด Agent Skills) ตรวจสอบการเปลี่ยนแปลง i18n ของตัวเองก่อนส่ง PR กลับมาให้คุณ",

  "install.heading": "ติดตั้ง",
  "install.altIntro": "หรือข้ามการติดตั้งไปเลย เพราะมันมีแค่ไฟล์เดียวไม่มี dependency:",

  "usage.heading": "การใช้งาน",
  "usage.exitCodes":
    "--base ค่าเริ่มต้นคือ en - ชื่อ locale (ชื่อไฟล์แบบไม่มีนามสกุล) ที่ไฟล์อื่น ๆ ที่พบทั้งหมดจะถูกเทียบด้วย exit code เป็น 0 เมื่อทุกอย่างสะอาด, 1 เมื่อ translint เจอสิ่งที่ต้องแก้, 2 ถ้าอ่านหรือแปลงข้อมูล path นั้นไม่ได้เลย - ข้อผิดพลาด JSON เสียกับผลตรวจจริงจาก lint ไม่มีทางดูเหมือนกันสำหรับสคริปต์",

  "demo.heading": "ดูมันจับอะไรบางอย่างได้",
  "demo.intro":
    "นี่คือผลลัพธ์จริง ไม่ใช่ mockup examples/locales/ ในโปรเจกต์มีไฟล์หลักหนึ่งไฟล์ (en.json) และคำแปลสองไฟล์ (fr.json, de.json) พร้อมปัญหาจริงที่ปลูกไว้โดยตั้งใจอยู่ไม่กี่จุด ด้านล่างคือ translint ที่รันกับไฟล์เหล่านั้น คัดลอกมาแบบคำต่อคำ - หมวดหมู่สีแดงทำให้การรันล้มเหลวโดยค่าเริ่มต้น หมวดหมู่สีอำพันแค่ถูกรายงานแต่จะล้มเหลวก็ต่อเมื่อใส่ --strict",
  "demo.terminalAriaLabel": "ผลลัพธ์ terminal จาก translint",
  "demo.note":
    "translint จะออกด้วยรหัส 1 ทุกครั้งที่มีอะไรต้องแก้ ออกด้วย 0 หมายความว่าทุก locale สะอาด ส่วนออกด้วย 2 หมายความว่าอ่านหรือแปลง path นั้นไม่ได้เลยด้วยซ้ำ ลองเองได้กับไฟล์ชุดเดียวกันนี้: translint examples/locales --base en",

  "features.heading": "สิ่งที่มันตรวจสอบ",

  "features.missingKeys.title": "คีย์ที่ขาดหาย",
  "features.missingKeys.desc": "คีย์ที่มีอยู่ใน locale หลักแต่ไม่เคยไปถึงคำแปลเลย",

  "features.placeholderMismatches.title": "placeholder ที่ไม่ตรงกัน",
  "features.placeholderMismatches.desc":
    "{amount} กลายเป็น {total} - บั๊กที่ผ่านฉลุยในทุกการทดสอบที่ไม่ได้ส่งข้อมูล interpolation จริง แล้วพังทันทีที่มีการทดสอบไหนส่งจริง ๆ",

  "features.emptyValues.title": "ค่าว่าง",
  "features.emptyValues.desc": "คีย์ที่มีอยู่แต่ไม่เคยถูกใส่ค่าเลย",

  "features.extraKeys.title": "คีย์ส่วนเกิน",
  "features.extraKeys.desc": "หลงเหลือจากการเปลี่ยนชื่อ ถูกรายงาน แต่ไม่ทำให้การรันล้มเหลวเว้นแต่คุณจะใส่ --strict",

  "features.possiblyUntranslated.title": "อาจจะยังไม่ได้แปล",
  "features.possiblyUntranslated.desc":
    "เป็นการตรวจแบบ heuristic: ค่ายังคงเหมือนกันทุกไบต์กับค่าหลัก หลังจากตัด placeholder เครื่องหมายวรรคตอน และตัวเลขออกไปแล้ว อนุญาตให้ค่าที่ตรงกันจริง ๆ ผ่านได้ด้วย --allow-identical หรือ --do-not-translate",

  "features.fileFormats.title": "สามรูปแบบไฟล์",
  "features.fileFormats.desc":
    "JSON (คีย์แบบซ้อนกันหรือแบบแบนด้วย dot notation), gettext .po/.pot และ Java .properties ตรวจจับอัตโนมัติจากนามสกุลไฟล์",

  "features.placeholderStyles.title": "placeholder ห้ารูปแบบ",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s และ ${name}/$name เทียบกันแบบ multiset เพื่อไม่ให้ placeholder ที่ซ้ำกันหลุดรอดไปได้",

  "features.scriptableOutput.title": "เอาต์พุตที่เขียนสคริปต์ต่อได้",
  "features.scriptableOutput.desc":
    "--json พิมพ์ผลลัพธ์ที่เครื่องอ่านได้ exit code ก็เป็นมิตรกับสคริปต์เหมือนกัน: 0 สะอาด, 1 พบปัญหา, 2 อ่านหรือแปลงข้อมูลไม่ได้",

  "features.runsThreeWays.title": "ใช้งานได้สามแบบ",
  "features.runsThreeWays.desc":
    "เป็น CLI ด้วยมือหรือใน pre-commit hook, เป็น GitHub Action ที่คอยกัน CI, หรือเป็น skill ของ Claude Code / Agent Skills เพื่อให้ agent ที่เขียนโค้ดตรวจสอบการเปลี่ยนแปลง i18n ของตัวเองก่อนส่ง PR กลับไป",

  "limits.heading": "สิ่งที่มันไม่ทำ",
  "limits.noYaml": "ไม่รองรับไฟล์ locale แบบ YAML การแปลง YAML อย่างปลอดภัยต้องใช้ dependency และ translint ตั้งใจใช้แค่ stdlib เท่านั้น",
  "limits.heuristicOnly":
    "การตรวจค่าที่ยังไม่ได้แปลเป็นแค่ heuristic ไม่ใช่กฎตายตัว มันแค่ทำเครื่องหมายสิ่งที่ดูเหมือนยังไม่ได้แปล ไม่ได้พิสูจน์อะไรเลย",
  "limits.noTranslationQuality":
    "มันไม่แปลอะไรเลย และไม่ได้ตรวจสอบคุณภาพของคำแปล - ตรวจแค่โครงสร้าง: คีย์, placeholder, ค่าว่างหรือไม่",
  "limits.nonRecursive":
    "การสแกนไดเรกทอรีแบบไม่วนซ้ำลงลึก ชี้ไปที่ไดเรกทอรีแล้วมันจะตรวจไฟล์ที่อยู่ข้างในโดยตรงเท่านั้น ไม่ตรวจไดเรกทอรีย่อย",

  "footer.license": "Prosperity Public License 3.0.0 - ใช้งานฟรีสำหรับจุดประสงค์ที่ไม่ใช่เชิงพาณิชย์",
};
