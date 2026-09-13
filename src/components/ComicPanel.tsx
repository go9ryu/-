import { Panel } from '../types'

type Props = {
  panel: Panel
  subtitle: string
  active?: boolean
  compact?: boolean
  onClick?: () => void
}

type SceneKind =
  | 'farm'
  | 'sea'
  | 'forest'
  | 'school'
  | 'home'
  | 'city'
  | 'garden'
  | 'castle'
  | 'space'
  | 'cave'
  | 'hospital'
  | 'market'
  | 'winter'
  | 'book'

type Character =
  | 'girl'
  | 'boy'
  | 'mother'
  | 'father'
  | 'grandmother'
  | 'grandfather'
  | 'teacher'
  | 'doctor'
  | 'nurse'
  | 'knight'
  | 'king'
  | 'queen'
  | 'wizard'
  | 'fairy'
  | 'scientist'
  | 'farmer'

type AnimalKind =
  | 'cat'
  | 'dog'
  | 'rabbit'
  | 'fox'
  | 'wolf'
  | 'bear'
  | 'lion'
  | 'tiger'
  | 'elephant'
  | 'giraffe'
  | 'monkey'
  | 'panda'
  | 'deer'
  | 'squirrel'
  | 'hedgehog'
  | 'frog'
  | 'duck'
  | 'chicken'
  | 'cow'
  | 'sheep'
  | 'horse'
  | 'pig'
  | 'mouse'
  | 'bird'
  | 'fish'
  | 'dolphin'
  | 'penguin'

type Action =
  | 'read'
  | 'run'
  | 'look'
  | 'sit'
  | 'walk'
  | 'give'
  | 'hide'
  | 'sleep'
  | 'point'
  | 'carry'
  | 'fight'
  | 'dance'

type Mood =
  | 'happy'
  | 'sad'
  | 'surprised'
  | 'brave'
  | 'angry'
  | 'normal'

const has = (text: string, pattern: RegExp) => pattern.test(text)

/* --------------------------------------------------
 * 장면
 * -------------------------------------------------- */

const SCENE_RULES: Array<[RegExp, SceneKind]> = [
  [/농장|헛간|돼지|말|당나귀|가축|닭|양|소|목장|농부/, 'farm'],
  [/우주|로켓|별나라|외계|행성|달나라|은하/, 'space'],
  [/성(벽|문|안|에|으로|에서)?|궁전|왕국|왕자|공주|마법사|기사|성채/, 'castle'],
  [/병원|의사|간호사|환자|진료|약국/, 'hospital'],
  [/시장|가게|마트|상점|빵집|식당|카페|음식점/, 'market'],
  [/동굴|광산|터널|지하|비밀방/, 'cave'],
  [/눈밭|스키|얼음|빙판|눈사람|겨울왕국|겨울/, 'winter'],
  [/바다|해변|파도|강|호수|항구|섬|배|수영|물고기/, 'sea'],
  [/학교|교실|도서관|운동장|선생님|학생|유치원/, 'school'],
  [/집|방|거실|부엌|침대|마당|창문|가족/, 'home'],
  [/도시|거리|골목|역|버스|자동차|신호등|빌딩|공원/, 'city'],
  [/정원|꽃밭|꽃|봄|나비|화단/, 'garden'],
  [/숲|나무|풀|산|언덕|숲길|캠핑|계곡/, 'forest'],
]

function sceneKind(text: string): SceneKind {
  const rule = SCENE_RULES.find(([pattern]) => pattern.test(text))
  return rule?.[1] ?? 'book'
}

/* --------------------------------------------------
 * 등장인물
 * -------------------------------------------------- */

const CHARACTER_RULES: Array<{
  kind: Character
  pattern: RegExp
  icon: string
}> = [
  { kind: 'grandmother', pattern: /할머니/, icon: '👵' },
  { kind: 'grandfather', pattern: /할아버지/, icon: '👴' },
  { kind: 'mother', pattern: /엄마|어머니/, icon: '👩' },
  { kind: 'father', pattern: /아빠|아버지/, icon: '👨' },
  { kind: 'teacher', pattern: /선생님|교사/, icon: '👩‍🏫' },
  { kind: 'doctor', pattern: /의사/, icon: '👨‍⚕️' },
  { kind: 'nurse', pattern: /간호사/, icon: '👩‍⚕️' },
  { kind: 'knight', pattern: /기사/, icon: '🛡️' },
  { kind: 'king', pattern: /왕(자)?가 아닌|국왕|임금/, icon: '🤴' },
  { kind: 'queen', pattern: /여왕/, icon: '👸' },
  { kind: 'wizard', pattern: /마법사/, icon: '🧙' },
  { kind: 'fairy', pattern: /요정/, icon: '🧚' },
  { kind: 'scientist', pattern: /과학자|연구원/, icon: '🧑‍🔬' },
  { kind: 'farmer', pattern: /농부|농장주/, icon: '👨‍🌾' },
  { kind: 'girl', pattern: /소녀|여자아이|그녀|공주|딸/, icon: '👧' },
  { kind: 'boy', pattern: /소년|남자아이|왕자|아들/, icon: '👦' },
]

function charactersFrom(text: string): Character[] {
  const result = CHARACTER_RULES
    .filter(rule => rule.pattern.test(text))
    .map(rule => rule.kind)

  // 가족이라는 표현이면 가족을 간단하게 표현
  if (/가족/.test(text) && result.length === 0) {
    return ['mother', 'father', 'girl']
  }

  // "두 사람", "함께", "친구들"처럼 여러 명을 의미
  if (
    /친구들|아이들|두 사람|둘이|함께|두 명|친구와/.test(text) &&
    result.length === 0
  ) {
    return ['girl', 'boy']
  }

  // 특정 인물이 없지만 주인공/아이가 등장
  if (result.length === 0 && /아이|주인공|친구/.test(text)) {
    return ['girl']
  }

  return [...new Set(result)].slice(0, 4)
}

/* --------------------------------------------------
 * 동물
 * -------------------------------------------------- */

const ANIMAL_RULES: Array<{
  kind: AnimalKind
  pattern: RegExp
  icon: string
}> = [
  { kind: 'cat', pattern: /고양이|냥이/, icon: '🐱' },
  { kind: 'dog', pattern: /강아지|개/, icon: '🐶' },
  { kind: 'rabbit', pattern: /토끼/, icon: '🐰' },
  { kind: 'fox', pattern: /여우/, icon: '🦊' },
  { kind: 'wolf', pattern: /늑대/, icon: '🐺' },
  { kind: 'bear', pattern: /곰/, icon: '🐻' },
  { kind: 'lion', pattern: /사자/, icon: '🦁' },
  { kind: 'tiger', pattern: /호랑이/, icon: '🐯' },
  { kind: 'elephant', pattern: /코끼리/, icon: '🐘' },
  { kind: 'giraffe', pattern: /기린/, icon: '🦒' },
  { kind: 'monkey', pattern: /원숭이/, icon: '🐒' },
  { kind: 'panda', pattern: /판다/, icon: '🐼' },
  { kind: 'deer', pattern: /사슴/, icon: '🦌' },
  { kind: 'squirrel', pattern: /다람쥐/, icon: '🐿️' },
  { kind: 'hedgehog', pattern: /고슴도치/, icon: '🦔' },
  { kind: 'frog', pattern: /개구리/, icon: '🐸' },
  { kind: 'duck', pattern: /오리/, icon: '🦆' },
  { kind: 'chicken', pattern: /닭|병아리/, icon: '🐔' },
  { kind: 'cow', pattern: /소/, icon: '🐄' },
  { kind: 'sheep', pattern: /양/, icon: '🐑' },
  { kind: 'horse', pattern: /말|망아지/, icon: '🐴' },
  { kind: 'pig', pattern: /돼지/, icon: '🐷' },
  { kind: 'mouse', pattern: /쥐/, icon: '🐭' },
  { kind: 'bird', pattern: /새|참새|독수리|부엉이/, icon: '🕊️' },
  { kind: 'fish', pattern: /물고기|금붕어/, icon: '🐠' },
  { kind: 'dolphin', pattern: /돌고래/, icon: '🐬' },
  { kind: 'penguin', pattern: /펭귄/, icon: '🐧' },
]

function animalsFrom(text: string): AnimalKind[] {
  const result = ANIMAL_RULES
    .filter(rule => rule.pattern.test(text))
    .map(rule => rule.kind)

  // "동물들이"처럼 종류가 특정되지 않은 경우
  if (result.length === 0 && /동물|짐승/.test(text)) {
    return ['rabbit', 'dog', 'cat']
  }

  return [...new Set(result)].slice(0, 5)
}

function animalIcon(kind: AnimalKind): string {
  return ANIMAL_RULES.find(rule => rule.kind === kind)?.icon ?? '🐾'
}

/* --------------------------------------------------
 * 행동
 * -------------------------------------------------- */

function actionFrom(text: string): Action {
  if (has(text, /잠들|잠을 자|꿈을 꾸|누워|잠자/)) return 'sleep'
  if (has(text, /춤|노래|파티|축제|공연/)) return 'dance'
  if (has(text, /싸우|맞서|공격|전투|물리치|이겨/)) return 'fight'
  if (has(text, /들고|메고|옮기|가방|상자를 들|운반/)) return 'carry'
  if (has(text, /가리키|손짓|알려|보여 줘|가리켜/)) return 'point'
  if (has(text, /읽|독서|펴|공부|글을 보/)) return 'read'
  if (has(text, /건네|선물하|나눠|주었|주고|전해/)) return 'give'
  if (has(text, /숨|몰래|피해/)) return 'hide'
  if (has(text, /달리|뛰|도망|급히|쫓/)) return 'run'
  if (has(text, /발견|바라|찾|살펴|올려다|만나|듣|구경/)) return 'look'
  if (has(text, /앉|쉬|기다/)) return 'sit'

  return 'walk'
}

/* --------------------------------------------------
 * 감정
 * -------------------------------------------------- */

function moodFrom(text: string): Mood {
  if (has(text, /화나|분노|미워|짜증|화가/)) return 'angry'
  if (has(text, /기뻐|웃|축하|행복|즐거|환호|신나/)) return 'happy'
  if (has(text, /슬프|울|외로|눈물|아쉬|걱정/)) return 'sad'
  if (has(text, /놀라|깜짝|무서|두려|위험|겁/)) return 'surprised'
  if (has(text, /용기|결심|맞서|구하|이겨/)) return 'brave'

  return 'normal'
}

/* --------------------------------------------------
 * 인물 컴포넌트
 * -------------------------------------------------- */

function Person({
  character,
  action,
  mood,
  index,
}: {
  character: Character
  action: Action
  mood: Mood
  index: number
}) {
  const rule = CHARACTER_RULES.find(item => item.kind === character)

  const moodEmoji =
    mood === 'happy'
      ? '✨'
      : mood === 'sad'
        ? '💧'
        : mood === 'angry'
          ? '💢'
          : mood === 'surprised'
            ? '❗'
            : mood === 'brave'
              ? '🔥'
              : ''

  return (
    <div
      className={`story-person character-${character} action-${action} mood-${mood} person-index-${index}`}
    >
      {moodEmoji && (
        <span className="person-mood-badge">
          {moodEmoji}
        </span>
      )}

      <span className="person-character-icon">
        {rule?.icon ?? '🙂'}
      </span>

      <span className="person-shadow" />
    </div>
  )
}

/* --------------------------------------------------
 * 동물 컴포넌트
 * -------------------------------------------------- */

function Animal({
  kind,
  index,
}: {
  kind: AnimalKind
  index: number
}) {
  return (
    <span
      className={`story-animal animal-${kind} animal-index-${index}`}
      title={kind}
    >
      {animalIcon(kind)}
    </span>
  )
}

/* --------------------------------------------------
 * 농장 장면
 * -------------------------------------------------- */

function FarmScene({ text }: { text: string }) {
  const ruler = has(text, /주인|인간.*얼굴|탐욕|부려먹/)
  const oppress = has(text, /억압|희생|팔려|괴롭|강요|힘들/)
  const celebrate = has(text, /기뻐|축하|몰아내|자유|환호/)

  const moment = ruler
    ? 'ruler'
    : oppress
      ? 'oppress'
      : celebrate
        ? 'celebrate'
        : 'calm'

  const animals =
    animalsFrom(text).length > 0
      ? animalsFrom(text)
      : ['cow', 'sheep', 'chicken']

  return (
    <div className={`farm-scene farm-${moment}`}>
      <div className="farm-bg-layer">
        <i className="farm-barn">🛖</i>
        <i className="farm-fence">🪵 🪵 🪵</i>
        <i className="farm-hill" />
      </div>

      <div className="farm-animal-layer">
        {moment === 'calm' &&
          animals.slice(0, 4).map((animal, index) => (
            <Animal
              key={`${animal}-${index}`}
              kind={animal}
              index={index}
            />
          ))}

        {moment === 'celebrate' && (
          <>
            <span className="farm-crowd">🥳 🐮 🐖 🐓</span>
            <span className="farm-flag">🚩</span>
            <span className="farm-sparkles">✨ 🎊</span>
          </>
        )}

        {moment === 'oppress' && (
          <>
            <span className="farm-special-animal">🐴</span>
            <span className="farm-cart">🛒</span>
            <div className="farm-shadow-overlay" />
          </>
        )}

        {moment === 'ruler' && (
          <>
            <span className="farm-boss">🐷👑</span>
            <span className="farm-workers">👨‍🌾 🔨</span>
          </>
        )}
      </div>
    </div>
  )
}

/* --------------------------------------------------
 * 장면 상세
 * -------------------------------------------------- */

function SceneDetails({
  sentence,
  kind,
}: {
  sentence: string
  kind: SceneKind
}) {
  const text = sentence.toLowerCase()

  const characters = charactersFrom(text)
  const animals = animalsFrom(text)

  const action = actionFrom(text)
  const mood = moodFrom(text)

  const night = has(text, /밤|어둠/)
  const morning = has(text, /아침|해돋|새벽/)
  const sunset = has(text, /노을|해질|저녁/)
  const rain = has(text, /비|빗물|장마|폭풍/)
  const snow = has(text, /눈이|눈밭|눈사람|눈송이|겨울|스키|얼음|빙판/)
  const wind = has(text, /바람|흩날|날리|태풍/)
  const cloud = has(text, /구름|흐린/)

  const book = has(text, /책|독서|읽|동화|일기|사전/)
  const letter = has(text, /편지|지도|쪽지|초대장|메모/)
  const key = has(text, /열쇠|자물쇠/)
  const treasure = has(text, /보물|상자|금화|보석|다이아/)
  const flower = has(text, /꽃|봄|정원|꽃밭|나비|장미|튤립/)
  const mountain = has(text, /산|언덕|절벽|계곡/)
  const lamp = has(text, /등불|램프|불빛|촛불|손전등/)
  const umbrella = has(text, /우산/)
  const boat = has(text, /배|항해|돛|카누/)
  const food = has(text, /빵|케이크|사과|음식|식사|쿠키|과자|주스/)
  const phone = has(text, /전화|휴대폰|메시지|문자/)
  const crown = has(text, /왕관|여왕|국왕/)
  const magic = has(text, /마법|요정|주문|지팡이|마법진/)
  const fire = has(text, /불꽃|화재|모닥불|용암|불길|불이/)
  const rainbow = has(text, /무지개/)
  const vehicle = has(text, /자동차|버스|기차|자전거|비행기|택시/)
  const clock = has(text, /시계|시간|약속/)
  const balloon = has(text, /풍선/)
  const music = has(text, /음악|노래|피아노|기타|연주/)
  const camera = has(text, /사진|카메라/)
  const gift = has(text, /선물|리본/)
  const weapon = has(text, /칼|검|방패|활|화살/)
  const monster = has(text, /괴물|용|마녀|유령|외계인/)

  const empty = !sentence.trim()

  const objectList = [
    book && ['book', '📖'],
    letter && ['letter', '✉️'],
    key && ['key', '🔑'],
    treasure && ['treasure', '💎'],
    umbrella && ['umbrella', '☂️'],
    lamp && ['lamp', '💡'],
    food && ['food', '🍎'],
    phone && ['phone', '📱'],
    crown && ['crown', '👑'],
    magic && ['magic', '🪄✨'],
    fire && ['fire', '🔥'],
    vehicle && ['vehicle', '🚗'],
    clock && ['clock', '⏰'],
    balloon && ['balloon', '🎈'],
    music && ['music', '🎵'],
    camera && ['camera', '📷'],
    gift && ['gift', '🎁'],
    weapon && ['weapon', '⚔️'],
    monster && ['monster', '👾'],
  ].filter(Boolean) as Array<[string, string]>

  return (
    <>
      <div
        className={[
          'scene-atmosphere',
          night && 'is-night',
          morning && 'is-morning',
          sunset && 'is-sunset',
          rain && 'is-rainy',
          snow && 'is-snowy',
          cloud && 'is-cloudy',
        ]
          .filter(Boolean)
          .join(' ')}
      />

      <div className="scene-bg">
        {kind === 'farm' && <FarmScene text={text} />}

        {kind === 'forest' && (
          <>
            <i className="story-tree left">🌲</i>
            <i className="story-tree right">🌳</i>
            <i className="story-path" />
          </>
        )}

        {kind === 'garden' && (
          <>
            <i className="story-tree left">🌳</i>
            <span className="story-flowerbed">🌸 🌻 🌹</span>
          </>
        )}

        {kind === 'sea' && (
          <>
            <i className="story-island">🏝️</i>
            <div className="story-waves">🌊 🌊</div>
            {boat && <span className="story-boat">⛵</span>}
          </>
        )}

        {kind === 'school' && (
          <>
            <i className="story-school">🏫</i>
            <i className="story-ground" />
          </>
        )}

        {kind === 'home' && (
          <>
            <i className="story-home">🏠</i>
            <span className="story-window">🪟</span>
          </>
        )}

        {kind === 'city' && (
          <>
            <div className="story-city">🏢 🏣 🏢</div>
            <i className="story-crosswalk" />
          </>
        )}

        {kind === 'castle' && (
          <i className="story-castle">🏰</i>
        )}

        {kind === 'space' && (
          <>
            <i className="story-planet">🪐</i>
            <span className="story-rocket">🚀</span>
          </>
        )}

        {kind === 'cave' && (
          <>
            <i className="story-cave">🕳️</i>
            <span className="story-crystals">💎 ✨</span>
          </>
        )}

        {kind === 'hospital' && (
          <i className="story-hospital">🏥</i>
        )}

        {kind === 'market' && (
          <>
            <i className="story-shop">🏪</i>
            <span className="story-awning">🎪</span>
          </>
        )}

        {kind === 'winter' && (
          <>
            <span className="story-snowman">☃️</span>
            <i className="story-pine">🌲</i>
          </>
        )}

        {kind === 'book' && (
          <>
            <i className="story-shelf">📚</i>
            <i className="story-table">🛋️</i>
          </>
        )}

        {mountain && (
          <span className="story-mountain">⛰️</span>
        )}

        {night && (
          <>
            <span className="story-moon">🌙</span>
            <span className="story-stars">✨ ⭐</span>
          </>
        )}

        {morning && (
          <span className="story-sun">🌅</span>
        )}

        {rain && (
          <div className="story-rain">🌧️</div>
        )}

        {snow && (
          <div className="story-snow">❄️ ❄️ ❄️</div>
        )}

        {wind && (
          <div className="story-wind">🍃 🍃</div>
        )}

        {rainbow && (
          <span className="story-rainbow">🌈</span>
        )}
      </div>

      <div className="scene-character-layer">
        {characters.map((character, index) => (
          <Person
            key={`${character}-${index}`}
            character={character}
            action={action}
            mood={mood}
            index={index}
          />
        ))}
      </div>

      <div className="scene-animal-layer">
        {kind !== 'farm' &&
          animals.map((animal, index) => (
            <Animal
              key={`${animal}-${index}`}
              kind={animal}
              index={index}
            />
          ))}
      </div>

      <div className="scene-objects">
        {flower && kind !== 'garden' && (
          <span className="story-object flower">
            💐
          </span>
        )}

        {objectList.map(([objectKind, icon], index) => (
          <span
            key={`${objectKind}-${index}`}
            className={`story-object object-${objectKind} object-index-${index}`}
          >
            {icon}
          </span>
        ))}
      </div>

      {empty && (
        <div className="scene-empty">
          <span className="scene-empty-icon">🎨</span>
          <span className="scene-empty-text">
            이야기를 적으면 그림이 완성돼요
          </span>
        </div>
      )}
    </>
  )
}

/* --------------------------------------------------
 * 메인 패널
 * -------------------------------------------------- */

export default function ComicPanel({
  panel,
  subtitle,
  active,
  compact,
  onClick,
}: Props) {
  const kind = sceneKind(panel.sentence)

  return (
    <button
      type="button"
      className={[
        'comic-panel',
        compact && 'compact',
        active && 'is-active',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      aria-label={`${panel.stage} 단계 입력란으로 이동`}
    >
      <span className="panel-label">
        <strong>{panel.stage}</strong> · {subtitle}
      </span>

      <div className={`scene scene-${kind}`}>
        <SceneDetails
          sentence={panel.sentence}
          kind={kind}
        />
      </div>

      <div className="speech-bubble">
        {panel.sentence || '이야기 문장을 적어 주세요.'}
      </div>
    </button>
  )
}
