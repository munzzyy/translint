// Indonesian (id). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - linter untuk file locale kamu",
  "meta.description":
    "translint adalah CLI tanpa dependensi yang memeriksa file locale terhadap file dasar dan menandai kunci yang hilang, ketidakcocokan placeholder, nilai kosong, dan string yang belum diterjemahkan. Satu file Python, hanya pustaka standar.",

  "skipLink": "Lompat ke konten utama",
  "nav.ariaLabel": "Situs",
  "theme.switcherLabel": "Tema",
  "theme.ariaLabel": "Tema warna",
  "lang.switcherLabel": "Bahasa",
  "lang.ariaLabel": "Bahasa antarmuka",

  "hero.tagline": "Terjemahan yang hilang adalah bug UI. Placeholder yang berganti nama adalah crash.",
  "hero.description1":
    "translint memeriksa file locale kamu terhadap file dasar dan menandai persis itu: kunci yang hilang, kunci berlebih yang tertinggal, nilai kosong, nilai yang masih terlihat belum diterjemahkan, dan placeholder yang tidak cocok antara string dasar dan terjemahan - yang benar-benar bisa merusak sebuah aplikasi. Satu file Python, hanya pustaka standar, tanpa dependensi.",
  "hero.description2":
    "Jalankan sebagai CLI secara manual atau di pre-commit hook, sebagai GitHub Action yang mengunci CI, atau sebagai agent skill supaya Claude Code (atau agen apa pun yang menggunakan standar terbuka Agent Skills) memeriksa perubahan i18n miliknya sendiri sebelum mengembalikan PR ke kamu.",

  "install.heading": "Instalasi",
  "install.altIntro": "Atau lewati instalasinya, karena ini cuma satu file tanpa dependensi:",

  "usage.heading": "Penggunaan",
  "usage.exitCodes":
    "--base secara default adalah en - nama locale (nama file tanpa ekstensi) yang menjadi acuan setiap file lain yang ditemukan. Kode keluar adalah 0 saat semuanya bersih, 1 saat translint menemukan sesuatu untuk diperbaiki, 2 jika sebuah path sama sekali tidak bisa dibaca atau di-parse - error JSON yang rusak dan temuan lint yang sebenarnya tidak pernah terlihat sama bagi sebuah skrip.",

  "demo.heading": "Lihat cara ia menangkap sesuatu",
  "demo.intro":
    "Ini output nyata, bukan mockup. examples/locales/ di repo berisi satu file dasar (en.json) dan dua terjemahan (fr.json, de.json) dengan beberapa masalah nyata yang sengaja ditanam. Di bawah ini adalah translint yang dijalankan terhadap file-file itu, disalin apa adanya - kategori merah membuat proses gagal secara default, yang kuning hanya dilaporkan tapi hanya gagal dengan --strict.",
  "demo.terminalAriaLabel": "Output terminal dari translint",
  "demo.note":
    "translint keluar dengan kode 1 setiap kali ada sesuatu untuk diperbaiki. Keluar dengan 0 berarti setiap locale bersih; keluar dengan 2 berarti sebuah path bahkan tidak bisa dibaca atau di-parse. Coba sendiri terhadap file yang sama: translint examples/locales --base en.",

  "features.heading": "Apa yang diperiksa",

  "features.missingKeys.title": "Kunci yang hilang",
  "features.missingKeys.desc": "Kunci yang ada di locale dasar tapi tidak pernah sampai ke terjemahan.",

  "features.placeholderMismatches.title": "Ketidakcocokan placeholder",
  "features.placeholderMismatches.desc":
    "{amount} berubah jadi {total} - bug yang berjalan mulus di setiap test yang tidak mengirim data interpolasi sungguhan, dan crash begitu ada yang mengirimnya.",

  "features.emptyValues.title": "Nilai kosong",
  "features.emptyValues.desc": "Kunci yang ada tapi tidak pernah diisi.",

  "features.extraKeys.title": "Kunci berlebih",
  "features.extraKeys.desc": "Sisa dari sebuah penggantian nama. Dilaporkan, tapi tidak membuat proses gagal kecuali kamu memakai --strict.",

  "features.possiblyUntranslated.title": "Kemungkinan belum diterjemahkan",
  "features.possiblyUntranslated.desc":
    "Sebuah heuristik: nilainya masih terbaca identik byte demi byte dengan dasar setelah placeholder, tanda baca, dan angka dihapus. Izinkan kecocokan yang memang sungguhan dengan --allow-identical atau --do-not-translate.",

  "features.fileFormats.title": "Tiga format file",
  "features.fileFormats.desc":
    "JSON (kunci bersarang atau datar dengan notasi titik), gettext .po/.pot, dan Java .properties, terdeteksi otomatis berdasarkan ekstensi.",

  "features.placeholderStyles.title": "Lima gaya placeholder",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, dan ${name}/$name, dibandingkan sebagai multiset supaya placeholder yang terduplikasi tidak lolos.",

  "features.scriptableOutput.title": "Output yang bisa di-scripting",
  "features.scriptableOutput.desc":
    "--json mencetak hasil yang bisa dibaca mesin. Kode keluar juga sama ramahnya untuk skrip: 0 bersih, 1 temuan, 2 tidak bisa dibaca atau di-parse.",

  "features.runsThreeWays.title": "Berjalan dengan tiga cara",
  "features.runsThreeWays.desc":
    "Sebagai CLI secara manual atau di pre-commit hook, sebagai GitHub Action yang mengunci CI, atau sebagai skill Claude Code / Agent Skills, supaya agen coding memeriksa perubahan i18n miliknya sendiri sebelum mengembalikan PR.",

  "limits.heading": "Apa yang tidak dilakukannya",
  "limits.noYaml": "Tidak ada file locale YAML. Mem-parse YAML dengan aman butuh dependensi, dan translint sengaja hanya-stdlib.",
  "limits.heuristicOnly":
    "Pemeriksaan nilai yang belum diterjemahkan adalah heuristik, bukan aturan pasti. Ia menandai apa yang terlihat belum diterjemahkan; ia tidak membuktikan apa pun.",
  "limits.noTranslationQuality":
    "Ia tidak menerjemahkan apa pun, dan tidak memvalidasi kualitas terjemahan - hanya struktur: kunci, placeholder, apakah nilainya tidak kosong.",
  "limits.nonRecursive":
    "Pemindaian direktori non-rekursif. Arahkan ke sebuah direktori dan ia memeriksa file yang langsung ada di dalamnya, bukan subdirektori.",

  "footer.license": "Prosperity Public License 3.0.0 - bebas untuk penggunaan nonkomersial.",
};
