// Traditional Chinese (zh-Hant), Taiwan tech terminology - not a mechanical
// simplified-to-traditional character conversion of zh-Hans.js (e.g. 資料
// not 数据, 程式碼 not 代码, 支援 not 支持, 檔案 not 文件, 字串 not
// 字符串). See GLOSSARY.md for term choices and the do-not-translate list
// (translint, CLI flags, filenames, extensions, exit-code digits, and the
// literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - 針對語言檔案的檢查工具",
  "meta.description":
    "translint 是一個零依賴的 CLI 工具,會將語言檔案與基準檔案比對,並檢查出缺少的鍵、佔位符不匹配、空值,以及尚未翻譯的字串。只有一個 Python 檔案,只使用標準函式庫。",

  "skipLink": "跳到主要內容",
  "nav.ariaLabel": "網站",
  "theme.switcherLabel": "主題",
  "theme.ariaLabel": "配色主題",
  "lang.switcherLabel": "語言",
  "lang.ariaLabel": "介面語言",

  "hero.tagline": "缺少的翻譯是介面上的 bug。改名的佔位符會導致當機。",
  "hero.description1":
    "translint 會將你的語言檔案與基準檔案比對,並精確檢查出這些問題:缺少的鍵、遺留的多餘鍵、空值、看起來仍未翻譯的值,以及基準字串與譯文之間不匹配的佔位符——最後一種才是真正會讓應用程式當機的問題。只有一個 Python 檔案,只使用標準函式庫,零依賴。",
  "hero.description2":
    "你可以手動以 CLI 方式執行,或放進 pre-commit 鉤子裡執行,也可以作為在 CI 中把關的 GitHub Action 執行,或是作為 agent skill 使用,讓 Claude Code(或任何遵循開放 Agent Skills 標準的代理)在把 PR 交還給你之前,先檢查自己所做的 i18n 變更。",

  "install.heading": "安裝",
  "install.altIntro": "或者乾脆不安裝,反正它只是一個沒有依賴的檔案:",

  "usage.heading": "用法",
  "usage.exitCodes":
    "--base 預設是 en——也就是每個被發現的其他檔案都要拿來比對的地區設定名稱(檔名去掉副檔名)。結束碼是 0 表示一切正常,1 表示 translint 找到需要修正的問題,2 表示某個路徑完全無法讀取或解析——損毀的 JSON 錯誤和真正的檢查結果,對腳本來說永遠不會是同一回事。",

  "demo.heading": "看它抓出問題",
  "demo.intro":
    "這是真實輸出,不是模擬效果。儲存庫中的 examples/locales/ 目錄提供了一個基準檔案(en.json)和兩個譯文檔案(fr.json、de.json),裡面有幾個真實、故意埋下的問題。下面是針對它們執行 translint 的結果,原樣複製——紅色類別預設會讓執行失敗,琥珀色類別只會被回報,只有加上 --strict 才會失敗。",
  "demo.terminalAriaLabel": "translint 的終端機輸出",
  "demo.note":
    "只要有需要修正的問題,translint 就會以結束碼 1 結束執行。結束碼 0 表示所有地區設定檔案都乾淨;結束碼 2 表示某個路徑連讀取或解析都做不到。你也可以拿同樣的檔案自己試試看:translint examples/locales --base en。",

  "features.heading": "它會檢查什麼",

  "features.missingKeys.title": "缺少的鍵",
  "features.missingKeys.desc": "存在於基準地區設定中,卻始終沒有進入譯文的鍵。",

  "features.placeholderMismatches.title": "佔位符不匹配",
  "features.placeholderMismatches.desc":
    "{amount} 變成了 {total}——這種 bug 在任何不傳入真實插值資料的測試中都表現正常,一旦真的傳入資料就會出錯。",

  "features.emptyValues.title": "空值",
  "features.emptyValues.desc": "存在但從未被填寫的鍵。",

  "features.extraKeys.title": "多餘的鍵",
  "features.extraKeys.desc": "重新命名後遺留下來的鍵。會被回報,但除非加上 --strict,否則不會讓執行失敗。",

  "features.possiblyUntranslated.title": "可能尚未翻譯",
  "features.possiblyUntranslated.desc":
    "一種啟發式檢查:去掉佔位符、標點符號和數字之後,該值仍然與基準逐位元組相同。可以用 --allow-identical 或 --do-not-translate,把真正符合預期的相符項目加入允許清單。",

  "features.fileFormats.title": "三種檔案格式",
  "features.fileFormats.desc":
    "JSON(巢狀或使用點號分隔的扁平鍵)、gettext 的 .po/.pot,以及 Java 的 .properties,都會根據副檔名自動辨識。",

  "features.placeholderStyles.title": "五種佔位符樣式",
  "features.placeholderStyles.desc":
    "{name}、{{name}}、%s/%d/%1$s、%(name)s,以及 ${name}/$name,都會以多重集合的方式比對,因此重複的佔位符也不會被漏掉。",

  "features.scriptableOutput.title": "可寫成腳本的輸出",
  "features.scriptableOutput.desc":
    "--json 會輸出機器可讀的結果。結束碼同樣適合寫腳本:0 表示乾淨,1 表示有檢查結果,2 表示無法讀取或解析。",

  "features.runsThreeWays.title": "三種執行方式",
  "features.runsThreeWays.desc":
    "可以手動以 CLI 方式執行、放進 pre-commit 鉤子,也可以作為在 CI 中把關的 GitHub Action 執行,或是作為 Claude Code / Agent Skills 的 skill,讓撰寫程式碼的代理在交回 PR 之前,先檢查自己所做的 i18n 變更。",

  "limits.heading": "它不會做什麼",
  "limits.noYaml": "不支援 YAML 格式的地區設定檔案。安全解析 YAML 需要額外依賴,而 translint 就是刻意只依賴標準函式庫。",
  "limits.heuristicOnly":
    "尚未翻譯值的檢查只是一種啟發式方法,不是硬性規則。它只會標記出看起來尚未翻譯的內容,並不能證明什麼。",
  "limits.noTranslationQuality":
    "它不會翻譯任何內容,也不檢查翻譯品質——只檢查結構:鍵、佔位符,以及值是否為空。",
  "limits.nonRecursive":
    "目錄掃描不是遞迴的。指定一個目錄後,它只會檢查該目錄底下的檔案,不會檢查子目錄。",

  "footer.license": "Prosperity Public License 3.0.0——僅限非商業用途免費使用。",
};
