// Turkish (tr). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - yerel ayar dosyaların için bir linter",
  "meta.description":
    "translint, yerel ayar dosyalarını bir temel dosyayla karşılaştırıp eksik anahtarları, yer tutucu uyuşmazlıklarını, boş değerleri ve çevrilmemiş metinleri işaretleyen, bağımlılığı olmayan bir CLI'dir. Tek bir Python dosyası, sadece standart kütüphane.",

  "skipLink": "Ana içeriğe geç",
  "nav.ariaLabel": "Web sitesi",
  "theme.switcherLabel": "Tema",
  "theme.ariaLabel": "Renk teması",
  "lang.switcherLabel": "Dil",
  "lang.ariaLabel": "Arayüz dili",

  "hero.tagline": "Eksik bir çeviri bir arayüz hatasıdır. Adı değiştirilmiş bir yer tutucu ise çökmedir.",
  "hero.description1":
    "translint, yerel ayar dosyalarını bir temel dosyayla karşılaştırır ve tam olarak şunu işaretler: eksik anahtarlar, geride kalmış fazladan anahtarlar, boş değerler, hâlâ çevrilmemiş görünen değerler ve temel metin ile çeviri arasında uyuşmayan yer tutucular - yani bir uygulamayı gerçekten çökerten şey. Tek bir Python dosyası, sadece standart kütüphane, sıfır bağımlılık.",
  "hero.description2":
    "Elle CLI olarak, bir pre-commit hook içinde, CI'yi kilitleyen bir GitHub Action olarak, ya da Claude Code'un (veya açık Agent Skills standardını kullanan herhangi bir ajanın) sana bir PR döndürmeden önce kendi i18n değişikliklerini kontrol etmesi için bir agent skill olarak çalıştır.",

  "install.heading": "Kurulum",
  "install.altIntro": "Ya da kurulumu tamamen atla, çünkü bağımlılığı olmayan tek bir dosya:",

  "usage.heading": "Kullanım",
  "usage.exitCodes":
    "--base varsayılan olarak en'dir - bulunan her diğer dosyanın karşılaştırıldığı yerel ayar adı (uzantısız dosya adı). Çıkış kodu her şey temizse 0, translint düzeltilecek bir şey bulduysa 1, bir yol hiç okunamadıysa veya ayrıştırılamadıysa 2'dir - bozuk bir JSON hatasıyla gerçek bir lint bulgusu bir betik için asla aynı görünmez.",

  "demo.heading": "Bir şeyi yakalarken izle",
  "demo.intro":
    "Bu gerçek bir çıktı, kurgu değil. Depodaki examples/locales/ klasörü bir temel dosya (en.json) ve iki çeviri (fr.json, de.json) içerir; bunlarda bilerek yerleştirilmiş birkaç gerçek sorun vardır. Aşağıda translint bunlara karşı çalıştırılmış, olduğu gibi kopyalanmış hâlde - kırmızı kategoriler çalışmayı varsayılan olarak başarısız kılar, kehribar olanlar sadece bildirilir ve yalnızca --strict ile başarısız olur.",
  "demo.terminalAriaLabel": "translint'in terminal çıktısı",
  "demo.note":
    "translint, düzeltilecek bir şey olduğunda 1 ile çıkar. 0 ile çıkmak her yerel ayarın temiz olduğu, 2 ile çıkmak bir yolun okunamadığı ya da ayrıştırılamadığı anlamına gelir. Aynı dosyalara karşı kendin dene: translint examples/locales --base en.",

  "features.heading": "Neyi kontrol eder",

  "features.missingKeys.title": "Eksik anahtarlar",
  "features.missingKeys.desc": "Temel yerel ayarda var olan ama hiçbir zaman bir çeviriye giremeyen bir anahtar.",

  "features.placeholderMismatches.title": "Yer tutucu uyuşmazlıkları",
  "features.placeholderMismatches.desc":
    "{amount}, {total} oldu - gerçek enterpolasyon verisi geçmeyen her testte sorunsuz çalışan, ama biri geçtiği anda çöken hata.",

  "features.emptyValues.title": "Boş değerler",
  "features.emptyValues.desc": "Var olan ama hiç doldurulmamış bir anahtar.",

  "features.extraKeys.title": "Fazladan anahtarlar",
  "features.extraKeys.desc": "Bir yeniden adlandırmadan kalan. Bildirilir, ama --strict geçirmediğin sürece çalışmayı başarısız kılmaz.",

  "features.possiblyUntranslated.title": "Muhtemelen çevrilmemiş",
  "features.possiblyUntranslated.desc":
    "Bir sezgisel yöntem: değer, yer tutucular, noktalama ve rakamlar çıkarıldıktan sonra hâlâ temelle bayt bayt aynı okunuyor. Gerçek eşleşmelere --allow-identical veya --do-not-translate ile izin ver.",

  "features.fileFormats.title": "Üç dosya biçimi",
  "features.fileFormats.desc":
    "JSON (iç içe geçmiş ya da nokta gösterimli düz anahtarlar), gettext .po/.pot ve Java .properties, uzantıya göre otomatik algılanır.",

  "features.placeholderStyles.title": "Beş yer tutucu stili",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s ve ${name}/$name, çoğaltılmış bir yer tutucunun gözden kaçmaması için çoklu küme olarak karşılaştırılır.",

  "features.scriptableOutput.title": "Betiklenebilir çıktı",
  "features.scriptableOutput.desc":
    "--json makine tarafından okunabilir sonuçlar basar. Çıkış kodları da tıpkı öyle betik dostudur: 0 temiz, 1 bulgu, 2 okunamadı veya ayrıştırılamadı.",

  "features.runsThreeWays.title": "Üç şekilde çalışır",
  "features.runsThreeWays.desc":
    "Elle CLI olarak ya da bir pre-commit hook içinde, CI'yi kilitleyen bir GitHub Action olarak, ya da kod yazan bir ajanın bir PR döndürmeden önce kendi i18n değişikliklerini kontrol etmesi için Claude Code / Agent Skills skill'i olarak.",

  "limits.heading": "Neyi yapmaz",
  "limits.noYaml": "YAML yerel ayar dosyası yok. YAML'ı güvenli şekilde ayrıştırmak bir bağımlılık gerektirir, ve translint bilerek sadece-stdlib'dir.",
  "limits.heuristicOnly":
    "Çevrilmemiş değer kontrolü bir sezgisel yöntemdir, katı bir kural değil. Çevrilmemiş görünen şeyi işaretler; hiçbir şey kanıtlamaz.",
  "limits.noTranslationQuality":
    "Hiçbir şeyi çevirmez ve çeviri kalitesini doğrulamaz - sadece yapıyı doğrular: anahtarlar, yer tutucular, değerlerin boş olup olmadığı.",
  "limits.nonRecursive":
    "Özyinelemesiz dizin taraması. Bir dizine yönlendir, doğrudan içindeki dosyaları kontrol eder, alt dizinleri değil.",

  "footer.license": "Prosperity Public License 3.0.0 - ticari olmayan kullanım için serbest.",
};
