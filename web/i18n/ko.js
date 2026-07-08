// Korean (ko). See GLOSSARY.md for term choices and the do-not-translate
// list (translint, CLI flags, filenames, extensions, exit-code digits, and
// the literal curly-brace examples in the two placeholder-syntax keys).

export default {
  "meta.title": "translint - 로케일 파일을 위한 린터",
  "meta.description":
    "translint는 의존성이 없는 CLI로, 로케일 파일을 기준 파일과 비교해 누락된 키, 플레이스홀더 불일치, 빈 값, 번역되지 않은 문자열을 찾아냅니다. 단일 Python 파일, 표준 라이브러리만 사용합니다.",

  "skipLink": "본문으로 건너뛰기",
  "nav.ariaLabel": "사이트",
  "theme.switcherLabel": "테마",
  "theme.ariaLabel": "색상 테마",
  "lang.switcherLabel": "언어",
  "lang.ariaLabel": "인터페이스 언어",

  "hero.tagline": "누락된 번역은 UI 버그입니다. 이름이 바뀐 플레이스홀더는 크래시입니다.",
  "hero.description1":
    "translint는 로케일 파일을 기준 파일과 비교해 정확히 이것들을 찾아냅니다: 누락된 키, 남아있는 불필요한 키, 빈 값, 여전히 번역되지 않은 것처럼 보이는 값, 그리고 기준 문자열과 번역 사이에서 일치하지 않는 플레이스홀더 - 이 마지막 것이 실제로 앱을 다운시키는 버그입니다. 단일 Python 파일, 표준 라이브러리만 사용, 의존성 제로.",
  "hero.description2":
    "손으로 직접 CLI로 실행하거나, pre-commit 훅 안에서, CI를 막는 GitHub Action으로, 아니면 agent skill로 실행해서 Claude Code(또는 개방형 Agent Skills 표준을 사용하는 모든 에이전트)가 PR을 돌려주기 전에 자기 자신의 i18n 변경 사항을 검사하게 할 수 있습니다.",

  "install.heading": "설치",
  "install.altIntro": "아니면 설치 자체를 건너뛰세요, 의존성 없는 파일 하나일 뿐이니까요:",

  "usage.heading": "사용법",
  "usage.exitCodes":
    "--base의 기본값은 en입니다 - 발견된 다른 모든 파일이 비교 대상으로 삼는 로케일 이름(확장자를 뺀 파일명)입니다. 종료 코드는 모든 것이 깨끗할 때 0, translint가 고칠 것을 찾았을 때 1, 경로를 아예 읽거나 파싱할 수 없을 때 2입니다 - 깨진 JSON 오류와 진짜 린트 발견 사항은 스크립트 입장에서 절대 같아 보이지 않습니다.",

  "demo.heading": "뭔가를 잡아내는 모습 보기",
  "demo.intro":
    "이것은 목업이 아니라 실제 출력입니다. 저장소의 examples/locales/에는 기준 파일 하나(en.json)와 두 개의 번역(fr.json, de.json)이 들어 있고, 의도적으로 심어둔 진짜 문제가 몇 가지 있습니다. 아래는 이 파일들을 대상으로 translint를 실행한 결과를 그대로 복사한 것입니다 - 빨간색 카테고리는 기본적으로 실행을 실패시키고, 호박색 카테고리는 보고만 되며 --strict를 줘야만 실패합니다.",
  "demo.terminalAriaLabel": "translint의 터미널 출력",
  "demo.note":
    "translint는 고칠 것이 있을 때마다 1로 종료합니다. 0으로 종료하면 모든 로케일이 깨끗하다는 뜻이고, 2로 종료하면 경로를 아예 읽거나 파싱할 수 없었다는 뜻입니다. 같은 파일로 직접 시도해 보세요: translint examples/locales --base en.",

  "features.heading": "검사하는 항목",

  "features.missingKeys.title": "누락된 키",
  "features.missingKeys.desc": "기준 로케일에는 존재하지만 번역에는 한 번도 들어가지 못한 키.",

  "features.placeholderMismatches.title": "플레이스홀더 불일치",
  "features.placeholderMismatches.desc":
    "{amount}가 {total}이 되어버린 것 - 실제 보간 데이터를 넘기지 않는 테스트에서는 멀쩡히 통과하다가, 누군가 그렇게 하는 순간 터지는 버그입니다.",

  "features.emptyValues.title": "빈 값",
  "features.emptyValues.desc": "존재하지만 한 번도 채워진 적 없는 키.",

  "features.extraKeys.title": "불필요한 키",
  "features.extraKeys.desc": "이름 변경 후 남은 것. 보고는 되지만, --strict를 주지 않는 한 실행을 실패시키지는 않습니다.",

  "features.possiblyUntranslated.title": "번역되지 않았을 가능성",
  "features.possiblyUntranslated.desc":
    "하나의 휴리스틱입니다: 플레이스홀더, 문장 부호, 숫자를 제거한 뒤에도 값이 기준과 바이트 단위로 여전히 동일하게 읽힙니다. --allow-identical 또는 --do-not-translate로 진짜 일치하는 항목을 허용 목록에 추가하세요.",

  "features.fileFormats.title": "세 가지 파일 형식",
  "features.fileFormats.desc":
    "JSON(중첩되거나 점으로 구분된 평면 키), gettext의 .po/.pot, 그리고 Java의 .properties를 확장자로 자동 감지합니다.",

  "features.placeholderStyles.title": "다섯 가지 플레이스홀더 스타일",
  "features.placeholderStyles.desc":
    "{name}, {{name}}, %s/%d/%1$s, %(name)s, 그리고 ${name}/$name 을 멀티셋으로 비교해서 중복된 플레이스홀더도 놓치지 않습니다.",

  "features.scriptableOutput.title": "스크립트 가능한 출력",
  "features.scriptableOutput.desc":
    "--json은 기계가 읽을 수 있는 결과를 출력합니다. 종료 코드도 마찬가지로 스크립트 친화적입니다: 0 깨끗함, 1 발견 사항 있음, 2 읽거나 파싱하지 못함.",

  "features.runsThreeWays.title": "세 가지 방식으로 실행",
  "features.runsThreeWays.desc":
    "손으로 직접 또는 pre-commit 훅 안에서 CLI로, CI를 막는 GitHub Action으로, 아니면 Claude Code / Agent Skills의 skill로 실행해서, 코딩 에이전트가 PR을 돌려주기 전에 자기 자신의 i18n 변경 사항을 검사하게 합니다.",

  "limits.heading": "하지 않는 일",
  "limits.noYaml": "YAML 로케일 파일은 지원하지 않습니다. YAML을 안전하게 파싱하려면 의존성이 필요한데, translint는 의도적으로 stdlib만 사용합니다.",
  "limits.heuristicOnly":
    "번역되지 않은 값 검사는 휴리스틱이지, 확고한 규칙이 아닙니다. 번역되지 않은 것처럼 보이는 것을 표시할 뿐, 아무것도 증명하지 않습니다.",
  "limits.noTranslationQuality":
    "아무것도 번역하지 않고, 번역 품질도 검증하지 않습니다 - 오직 구조만 봅니다: 키, 플레이스홀더, 값이 비어 있지 않은지 여부.",
  "limits.nonRecursive":
    "비재귀적 디렉터리 스캔입니다. 디렉터리를 가리키면 그 안에 바로 있는 파일만 검사하고, 하위 디렉터리는 검사하지 않습니다.",

  "footer.license": "Prosperity Public License 3.0.0 - 비상업적 용도로 자유롭게 사용 가능.",
};
