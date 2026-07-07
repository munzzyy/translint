# translint i18n glossary

Term reference for the 31 non-English locales in `web/i18n/*.js`, plus the checklist for
adding one more later.

## Do-not-translate list (byte-identical in every locale file)

These stay exactly as written, in every language, because they're literal tokens a
translation would break, not prose:

- **Product name**: `translint` (proper noun, never translated or transliterated).
- **CLI flags**: `--base`, `--strict`, `--json`, `--allow-identical`, `--do-not-translate`.
- **Filenames / paths**: `en.json`, `fr.json`, `de.json`, `examples/locales/`.
- **File extensions**: `.po`, `.pot`, `.properties`.
- **Exit-code digits**: `0`, `1`, `2` (as CLI exit codes, not as prose numbers).
- **Acronyms**: `CLI`, `JSON` (kept as the English acronym everywhere - nobody translates
  these, in any language).
- **Proper nouns**: `GitHub`, `GitHub Action`, `Claude Code`, `Agent Skills`.
- **Literal placeholder-syntax examples**: the curly-brace text inside
  `features.placeholderMismatches.desc` (`{amount}`, `{total}`) and
  `features.placeholderStyles.desc` (`{name}`, `{{name}}`, `%s`, `%d`, `%1$s`, `%(name)s`,
  `${name}`, `$name`) - these are showing what placeholder syntax looks like, not real
  `{placeholder}` interpolation. `app.js` calls both of those two keys via `t(key)` with no
  `params` argument, so `i18n/index.js`'s `interpolate()` short-circuits and returns the
  string unprocessed. Never pass a `params` object to either key.

A locale file that translates any of these has a bug.

## Core term glossary (recurring dev/i18n nouns, one consistent choice per locale)

The task brief for this catalog is explicit: this is a developer audience, so keep jargon
recognizable rather than over-localized. Concretely: `CLI` and `JSON` are never translated.
For `locale`, `key`, `placeholder`, and `base` (the noun/adjective describing the reference
file everything else is checked against), pick whatever a real developer writing in that
language actually says - sometimes that's a native word, sometimes it's the English
loanword. Use the SAME choice everywhere within one locale file (don't say "clave" in one
key and "llave" in another).

| Locale | locale | key | placeholder | base (adj.) | heuristic |
|---|---|---|---|---|---|
| es | locale | clave | placeholder | base | heurística |
| de | Locale | Schlüssel | Platzhalter | Basis- | Heuristik |
| ru | локаль | ключ | плейсхолдер | базовый | эвристика |
| ja | ロケール | キー | プレースホルダー | ベース | ヒューリスティック |
| zh-Hans | 区域设置 | 键 | 占位符 | 基准 | 启发式 |
| ar | الإعدادات المحلية | مفتاح | العنصر النائب | الأساسي | استدلالي |
| pt-BR | locale | chave | placeholder | base | heurística |
| fr | locale | clé | placeholder | de base | heuristique |
| it | locale | chiave | placeholder | di base | euristica |
| nl | locale | sleutel | placeholder | basis- | heuristiek |
| sv | locale | nyckel | platshållare | bas- | heuristik |
| nb | locale | nøkkel | plassholder | grunn- | heuristikk |
| da | locale | nøgle | pladsholder | basis- | heuristik |
| fi | locale | avain | paikkamerkki | perus- | heuristiikka |
| pl | locale | klucz | placeholder | bazowy | heurystyka |
| cs | locale | klíč | placeholder | základní | heuristika |
| hu | locale | kulcs | helyőrző | alap- | heurisztika |
| ro | locale | cheie | placeholder | de bază | euristică |
| uk | локаль | ключ | заповнювач | базовий | евристика |
| el | locale | κλειδί | placeholder | βασικό | ευρετικός |
| tr | yerel ayar | anahtar | yer tutucu | temel | sezgisel |
| id | locale | kunci | placeholder | dasar | heuristik |
| vi | locale | khóa | placeholder | gốc | phỏng đoán |
| tl | locale | key | placeholder | pangunahing | heuristic |
| zh-Hant | 地區設定 | 鍵 | 佔位符 | 基準 | 啟發式 |
| ko | 로케일 | 키 | 플레이스홀더 | 기준 | 휴리스틱 |
| th | locale | คีย์ | placeholder | หลัก | ฮิวริสติก |
| hi | लोकेल | कुंजी | प्लेसहोल्डर | आधार | ह्यूरिस्टिक |
| bn | লোকেল | কী | প্লেসহোল্ডার | মূল | হিউরিস্টিক |
| fa | locale (Latin script embedded in Persian prose) | کلید | placeholder (Latin script) | پایه | ابتکاری |
| he | לוקאל | מפתח | ממלא מקום | בסיס | היוריסטי |

Notes on choices that aren't the most literal option:

- **Many European dev communities** (es, pt-BR, fr, it, nl, sv, nb, da, fi, pl, cs, hu, ro,
  id, vi, tl, th) keep `locale` and/or `placeholder` as English loanwords rather than a
  native calque, because that's genuinely what developers writing in those languages say -
  a dictionary-native translation would read as stiffer and less recognizable than the
  loanword, which is the opposite of what this audience wants.
- **Filipino (tl)** uses natural Taglish code-switching (`key`, `placeholder`, `heuristic`
  kept in English mid-sentence) - this is how real Filipino developer writing reads, not a
  translation shortcut.
- **Persian (fa)** keeps `locale` and `placeholder` in Latin script embedded in the Persian
  sentence - common practice in Persian developer writing for specific technical nouns
  ("Pinglish" code-switching), rather than the bureaucratic ICU term "زبان و منطقه."
- **Hungarian (hu), Turkish (tr), Ukrainian (uk), Hebrew (he)** have clean, well-established
  native terms for "placeholder" (`helyőrző`, `yer tutucu`, `заповнювач`, `ממלא מקום`) from
  Microsoft/Google localization glossaries for those languages, so those use the native term
  instead of the loanword.
- **Arabic (ar)** uses the standard ICU/Microsoft Arabic terms for `locale` and `placeholder`
  (`الإعدادات المحلية`, `العنصر النائب`) since Modern Standard Arabic tech vocabulary is more
  standardized around these than code-switched loanwords for a formal register.

## Adding one more locale later

1. Copy `web/i18n/en.js` to `web/i18n/<code>.js`. Translate every value; keep every key name
   and every `{placeholder}` token exactly as in `en.js` (see the do-not-translate list and
   the `interpolate()` short-circuit note above for the two keys with literal curly braces).
2. Register it in `web/i18n/index.js`: add `<code>: () => import("./<code>.js"),` to
   `REGISTRY` and `<code>: "<Autonym>",` to `AUTONYMS`. If it's RTL, add it to `RTL_LOCALES`
   too.
3. Add a `<option value="<code>">Autonym</option>` to `#lang-select` in `index.html`, in the
   same relative position as `REGISTRY`/`AUTONYMS`.
4. Verify: every `en.js` key exists in the new file (no missing, no extra), the file passes
   `node --check`, and a manual spot-check in a browser confirms the layout doesn't break -
   RTL locales especially need a visual check (the demo/code blocks stay LTR by design, see
   `styles.css`'s `dir="ltr"` on `.terminal`/`pre` - only the surrounding prose flips).
