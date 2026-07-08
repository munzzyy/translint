// Japanese (ja). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - ロケールファイル用のリンター",
  "meta.description":
    "translintは依存関係ゼロのCLIで、ロケールファイルをベースと比較し、欠落キー、プレースホルダーの不一致、空の値、未翻訳の文字列を検出します。Pythonファイル1つ、標準ライブラリのみ。",

  "skipLink": "メインコンテンツへスキップ",
  "nav.ariaLabel": "サイト",
  "theme.switcherLabel": "テーマ",
  "theme.ariaLabel": "カラーテーマ",
  "lang.switcherLabel": "言語",
  "lang.ariaLabel": "表示言語",

  "hero.tagline": "翻訳漏れはUIのバグ。プレースホルダーの名前変更はクラッシュ。",
  "hero.description1":
    "translintはロケールファイルをベースファイルと比較し、まさにそれを検出します - 欠落キー、使われなくなった余分なキー、空の値、まだ未翻訳に見える値、そしてベース文字列と翻訳の間でプレースホルダーが一致しない箇所です。最後のものが実際にアプリを落とすバグです。Pythonファイル1つ、標準ライブラリのみ、依存関係ゼロ。",
  "hero.description2":
    "手動でCLIとして実行するか、pre-commitフックの中で実行するか、CIをゲートするGitHub Actionとして実行するか、あるいはagent skillとして組み込んでClaude Code(またはオープンなAgent Skills標準を使う任意のエージェント)がPRを返す前に自分自身のi18nの変更をチェックするようにできます。",

  "install.heading": "インストール",
  "install.altIntro": "あるいは、依存関係のない1ファイルなので、インストール自体を省略してもかまいません:",

  "usage.heading": "使い方",
  "usage.exitCodes":
    "--baseのデフォルトはenです - これは、見つかった他のすべてのファイルの照合先となるロケール名(拡張子を除いたファイル名)です。終了コードは、すべて問題ない場合は0、translintが修正すべき何かを見つけた場合は1、パスをまったく読み込めなかった・パースできなかった場合は2です。壊れたJSONのエラーと実際のリントの検出結果は、スクリプトから見ると決して同じには見えません。",

  "demo.heading": "実際に検出される様子",
  "demo.intro":
    "これは作り物ではなく、実際の出力です。リポジトリ内のexamples/locales/には、ベースファイル(en.json)1つと2つの翻訳(fr.json、de.json)が含まれており、意図的に仕込まれた実際の問題がいくつかあります。以下はそれらに対してtranslintを実行した結果をそのままコピーしたものです - 赤色のカテゴリはデフォルトで実行を失敗させ、黄色のカテゴリは報告はされますが--strictを指定したときだけ失敗します。",
  "demo.terminalAriaLabel": "translintのターミナル出力",
  "demo.note":
    "translintは修正すべき何かがあると必ず終了コード1で終了します。終了コード0はすべてのロケールが問題ないことを意味し、終了コード2はパスをまったく読み込めなかった・パースできなかったことを意味します。同じファイルに対して自分でも試してみてください: translint examples/locales --base en。",

  "features.heading": "チェックする内容",

  "features.missingKeys.title": "欠落キー",
  "features.missingKeys.desc": "ベースロケールには存在するのに、翻訳には一度も反映されなかったキー。",

  "features.placeholderMismatches.title": "プレースホルダーの不一致",
  "features.placeholderMismatches.desc":
    "{amount}が{total}になってしまう - 実際の補間データを渡さないテストではきれいに通ってしまい、渡した瞬間にエラーになるバグです。",

  "features.emptyValues.title": "空の値",
  "features.emptyValues.desc": "存在はするが、一度も値が入力されなかったキー。",

  "features.extraKeys.title": "余分なキー",
  "features.extraKeys.desc": "リネームの後に残ったもの。報告はされますが、--strictを指定しない限り実行を失敗させません。",

  "features.possiblyUntranslated.title": "未翻訳の可能性",
  "features.possiblyUntranslated.desc":
    "ヒューリスティック(発見的手法): プレースホルダー、句読点、数字を取り除いた後もベースとバイト単位で完全に一致する値です。本当に一致してよいものは--allow-identicalまたは--do-not-translateで許可リストに登録してください。",

  "features.fileFormats.title": "3つのファイル形式",
  "features.fileFormats.desc":
    "JSON(ネストまたはドット区切りのフラットなキー)、gettextの.po/.pot、Javaの.propertiesに対応し、拡張子から自動検出します。",

  "features.placeholderStyles.title": "5つのプレースホルダー形式",
  "features.placeholderStyles.desc":
    "{name}、{{name}}、%s/%d/%1$s、%(name)s、そして${name}/$name を、多重集合として比較するので、重複したプレースホルダーも見逃しません。",

  "features.scriptableOutput.title": "スクリプト対応の出力",
  "features.scriptableOutput.desc":
    "--jsonは機械可読な結果を出力します。終了コードも同様にスクリプトフレンドリーです: 0は問題なし、1は検出あり、2は読み込み・パース不可を意味します。",

  "features.runsThreeWays.title": "3通りの実行方法",
  "features.runsThreeWays.desc":
    "手動でのCLI実行、pre-commitフックの中での実行、CIをゲートするGitHub Actionとしての実行に加え、Claude Code / Agent Skillsのskillとしても動作するので、コーディングエージェントがPRを返す前に自分自身のi18nの変更をチェックできます。",

  "limits.heading": "できないこと",
  "limits.noYaml": "YAML形式のロケールファイルには対応していません。YAMLを安全にパースするには依存関係が必要になるため、translintは意図的にstdlibのみで構成されています。",
  "limits.heuristicOnly":
    "未翻訳値のチェックはヒューリスティックであり、絶対的なルールではありません。未翻訳に見えるものにフラグを立てるだけで、それを証明するものではありません。",
  "limits.noTranslationQuality":
    "翻訳自体は行わず、翻訳の品質も検証しません - チェックするのはあくまで構造、つまりキー、プレースホルダー、値が空でないかどうかだけです。",
  "limits.nonRecursive":
    "ディレクトリの走査は再帰的ではありません。ディレクトリを指定すると、その直下にあるファイルだけをチェックし、サブディレクトリはチェックしません。",

  "footer.license": "Prosperity Public License 3.0.0 - 非営利目的での利用は自由です。",
};
