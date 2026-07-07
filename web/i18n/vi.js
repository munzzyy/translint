// Vietnamese (vi). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - trình kiểm tra cho các tệp locale của bạn",
  "meta.description":
    "translint là một CLI không phụ thuộc, kiểm tra các tệp locale so với tệp gốc và báo các khóa bị thiếu, placeholder không khớp, giá trị trống, và chuỗi chưa được dịch. Một tệp Python duy nhất, chỉ dùng thư viện chuẩn.",

  "skipLink": "Chuyển đến nội dung chính",
  "nav.ariaLabel": "Trang web",
  "theme.switcherLabel": "Giao diện",
  "theme.ariaLabel": "Giao diện màu",
  "lang.switcherLabel": "Ngôn ngữ",
  "lang.ariaLabel": "Ngôn ngữ giao diện",

  "hero.tagline": "Một bản dịch bị thiếu là lỗi giao diện. Một placeholder bị đổi tên là một lần sập.",
  "hero.description1":
    "translint kiểm tra các tệp locale của bạn so với một tệp gốc và báo chính xác điều đó: khóa bị thiếu, khóa dư thừa còn sót lại, giá trị trống, giá trị vẫn trông như chưa được dịch, và các placeholder không khớp giữa chuỗi gốc và bản dịch - lỗi thực sự có thể làm sập một ứng dụng. Một tệp Python duy nhất, chỉ dùng thư viện chuẩn, không phụ thuộc gì cả.",
  "hero.description2":
    "Chạy nó như một CLI thủ công hoặc trong một pre-commit hook, như một GitHub Action chặn CI, hoặc như một agent skill để Claude Code (hoặc bất kỳ agent nào dùng chuẩn mở Agent Skills) tự kiểm tra các thay đổi i18n của chính nó trước khi trả lại cho bạn một PR.",

  "install.heading": "Cài đặt",
  "install.altIntro": "Hoặc bỏ qua việc cài đặt, vì nó chỉ là một tệp duy nhất không phụ thuộc gì:",

  "usage.heading": "Cách dùng",
  "usage.exitCodes":
    "--base mặc định là en - tên locale (tên tệp không có phần mở rộng) mà mọi tệp khác được phát hiện sẽ được đối chiếu với. Mã thoát là 0 khi mọi thứ sạch sẽ, 1 khi translint tìm thấy điều gì đó cần sửa, 2 nếu một đường dẫn hoàn toàn không đọc được hoặc không phân tích cú pháp được - một lỗi JSON hỏng và một phát hiện lint thật sự không bao giờ trông giống nhau đối với một script.",

  "demo.heading": "Xem nó bắt lỗi",
  "demo.intro":
    "Đây là output thật, không phải là bản mô phỏng. examples/locales/ trong repo chứa một tệp gốc (en.json) và hai bản dịch (fr.json, de.json) với một vài vấn đề thật, được cố ý cài vào. Bên dưới là translint chạy trên các tệp đó, sao chép nguyên văn - các nhóm màu đỏ làm lần chạy thất bại theo mặc định, nhóm màu hổ phách chỉ được báo cáo nhưng chỉ thất bại khi có --strict.",
  "demo.terminalAriaLabel": "Output terminal từ translint",
  "demo.note":
    "translint thoát với mã 1 bất cứ khi nào có điều gì đó cần sửa. Thoát với 0 nghĩa là mọi locale đều sạch; thoát với 2 nghĩa là một đường dẫn thậm chí còn không đọc được hoặc phân tích cú pháp được. Hãy tự thử với chính các tệp này: translint examples/locales --base en.",

  "features.heading": "Những gì nó kiểm tra",

  "features.missingKeys.title": "Khóa bị thiếu",
  "features.missingKeys.desc": "Một khóa tồn tại trong locale gốc nhưng chưa bao giờ xuất hiện trong bản dịch.",

  "features.placeholderMismatches.title": "Placeholder không khớp",
  "features.placeholderMismatches.desc":
    "{amount} biến thành {total} - lỗi vẫn chạy êm trong mọi bài test không truyền dữ liệu nội suy thật, và sập ngay khi có bài test làm vậy.",

  "features.emptyValues.title": "Giá trị trống",
  "features.emptyValues.desc": "Một khóa tồn tại nhưng chưa bao giờ được điền.",

  "features.extraKeys.title": "Khóa dư thừa",
  "features.extraKeys.desc": "Còn sót lại sau một lần đổi tên. Được báo cáo, nhưng không làm lần chạy thất bại trừ khi bạn dùng --strict.",

  "features.possiblyUntranslated.title": "Có thể chưa được dịch",
  "features.possiblyUntranslated.desc":
    "Một phương pháp phỏng đoán: giá trị vẫn đọc giống hệt, từng byte một, với bản gốc sau khi loại bỏ placeholder, dấu câu và số. Cho phép các trùng khớp thật với --allow-identical hoặc --do-not-translate.",

  "features.fileFormats.title": "Ba định dạng tệp",
  "features.fileFormats.desc":
    "JSON (khóa lồng nhau hoặc phẳng theo ký hiệu dấu chấm), gettext .po/.pot, và Java .properties, được tự động nhận diện theo phần mở rộng.",

  "features.placeholderStyles.title": "Năm kiểu placeholder",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, và ${name}/$name, được so sánh như một multiset để một placeholder bị nhân đôi không lọt qua được.",

  "features.scriptableOutput.title": "Output có thể viết script",
  "features.scriptableOutput.desc":
    "--json in ra kết quả máy đọc được. Mã thoát cũng thân thiện với script không kém: 0 sạch, 1 có phát hiện, 2 không đọc được hoặc không phân tích cú pháp được.",

  "features.runsThreeWays.title": "Chạy theo ba cách",
  "features.runsThreeWays.desc":
    "Là CLI thủ công hoặc trong pre-commit hook, là GitHub Action chặn CI, hoặc là skill Claude Code / Agent Skills, để một agent viết code tự kiểm tra các thay đổi i18n của chính nó trước khi trả lại một PR.",

  "limits.heading": "Những gì nó không làm",
  "limits.noYaml": "Không có tệp locale YAML. Phân tích cú pháp YAML an toàn cần một phụ thuộc, và translint cố tình chỉ dùng thư viện chuẩn.",
  "limits.heuristicOnly":
    "Việc kiểm tra giá trị chưa dịch là một phương pháp phỏng đoán, không phải quy tắc cứng. Nó chỉ ra thứ trông như chưa được dịch; nó không chứng minh điều gì cả.",
  "limits.noTranslationQuality":
    "Nó không dịch bất cứ thứ gì, và không xác thực chất lượng bản dịch - chỉ kiểm tra cấu trúc: khóa, placeholder, việc giá trị có trống hay không.",
  "limits.nonRecursive":
    "Quét thư mục không đệ quy. Trỏ nó vào một thư mục và nó sẽ kiểm tra các tệp nằm trực tiếp bên trong, không phải các thư mục con.",

  "footer.license": "Prosperity Public License 3.0.0 - miễn phí cho mục đích sử dụng phi thương mại.",
};
