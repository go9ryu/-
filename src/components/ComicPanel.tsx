import { Panel } from '../types'

/* =========================================================
 * Types
 * ======================================================= */

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
  | 'knight'
  | 'king'
  | 'queen'
  | 'wizard'

type Animal =
  | 'cat'
  | 'dog'
  | 'rabbit'
  | 'fox'
  | 'bear'
  | 'panda'
  | 'lion'
  | 'tiger'
  | 'elephant'
  | 'giraffe'
  | 'monkey'
  | 'frog'
  | 'penguin'
  | 'owl'
  | 'deer'
  | 'wolf'
  | 'squirrel'
  | 'hedgehog'
  | 'cow'
  | 'pig'
  | 'sheep'
  | 'chicken'
  | 'horse'
  | 'duck'

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

type TimeOfDay =
  | 'morning'
  | 'day'
  | 'sunset'
  | 'night'

type Weather =
  | 'clear'
  | 'rain'
  | 'snow'
  | 'wind'
  | 'cloudy'

type Direction = 'left' | 'center' | 'right'

type StoryCharacter = {
  character: Character
  action: Action
  mood: Mood
  side: Direction
}

type StoryAnimal = {
  animal: Animal
  side: Direction
  action: Action
}

type StoryObject = {
  type: string
  icon: string
  side?: Direction
}

/* =========================================================
 * Generic keyword helpers
 * ======================================================= */

const has = (text: string, pattern: RegExp) =>
  pattern.test(text)

const hasAny = (
  text: string,
  keywords: string[],
) =>
  keywords.some(keyword =>
    text.includes(keyword),
  )

const firstMatch = <T,>(
  text: string,
  rules: Array<[T, RegExp]>,
): T | undefined => {
  return rules.find(([, pattern]) =>
    pattern.test(text),
  )?.[0]
}

/* =========================================================
 * Scene
 * ======================================================= */

const SCENE_RULES: Array<
  [SceneKind, RegExp]
> = [
  [
    'farm',
    /농장|농촌|헛간|목장|축사|농부|가축|논|밭/,
  ],
  [
    'castle',
    /성|궁전|왕국|왕자|공주|기사|왕|여왕|마법/,
  ],
  [
    'space',
    /우주|로켓|행성|달나라|은하|우주선|외계/,
  ],
  [
    'hospital',
    /병원|의사|간호사|환자|진료|응급실/,
  ],
  [
    'market',
    /시장|가게|마트|상점|빵집|식당|카페|편의점/,
  ],
  [
    'cave',
    /동굴|광산|터널|지하|비밀방|보물동굴/,
  ],
  [
    'winter',
    /겨울|눈밭|스키|얼음|빙판|눈사람|눈보라/,
  ],
  [
    'sea',
    /바다|해변|파도|강|호수|항구|섬|수영|해수욕장/,
  ],
  [
    'school',
    /학교|교실|도서관|운동장|학생|유치원|학원/,
  ],
  [
    'home',
    /집|방|거실|부엌|침대|마당|창문|가족|아파트/,
  ],
  [
    'city',
    /도시|거리|골목|역|버스|자동차|신호등|빌딩|횡단보도/,
  ],
  [
    'garden',
    /정원|꽃밭|화단|꽃|나비|장미|튤립/,
  ],
  [
    'forest',
    /숲|숲길|나무|풀|산|언덕|캠핑|계곡|등산/,
  ],
]

function getSceneKind(
  text: string,
): SceneKind {
  return (
    firstMatch(text, SCENE_RULES) ??
    'book'
  )
}

/* =========================================================
 * Time
 * ======================================================= */

const TIME_RULES: Array<
  [TimeOfDay, RegExp]
> = [
  ['night', /밤|한밤중|어두운|달빛/],
  ['morning', /아침|새벽|해돋이|동이 틀/],
  ['sunset', /노을|해질|저녁|해질녘/],
]

function getTimeOfDay(
  text: string,
): TimeOfDay {
  return (
    firstMatch(text, TIME_RULES) ??
    'day'
  )
}

/* =========================================================
 * Weather
 * ======================================================= */

const WEATHER_RULES: Array<
  [Weather, RegExp]
> = [
  ['rain', /비|빗물|장마|폭우|소나기|폭풍/],
  ['snow', /눈|눈송이|눈보라|함박눈/],
  ['wind', /바람|강풍|흩날|날아가/],
  ['cloudy', /구름|흐린|흐림|먹구름/],
]

function getWeather(
  text: string,
): Weather {
  return (
    firstMatch(text, WEATHER_RULES) ??
    'clear'
  )
}

/* =========================================================
 * Characters
 * ======================================================= */

const CHARACTER_RULES: Array<
  [Character, RegExp]
> = [
  ['grandmother', /할머니|외할머니/],
  ['grandfather', /할아버지|외할아버지/],
  ['mother', /엄마|어머니|어머님/],
  ['father', /아빠|아버지|아버님/],
  ['teacher', /선생님|교사|담임/],
  ['doctor', /의사|의료진/],
  ['knight', /기사|전사|용사/],
  ['king', /왕|국왕/],
  ['queen', /여왕|왕비/],
  ['wizard', /마법사|현자|마녀/],
  ['girl', /소녀|여자아이|여자 아이|그녀|공주|딸/],
  ['boy', /소년|남자아이|남자 아이|그|왕자|아들/],
]

function detectCharacters(
  text: string,
): Character[] {
  const result: Character[] = []

  for (const [character, pattern] of CHARACTER_RULES) {
    if (pattern.test(text)) {
      result.push(character)
    }
  }

  /*
   * 일반적인 '아이', '주인공'은
   * 성별을 알 수 없으므로 여자아이를 기본 캐릭터로 사용
   */
  if (
    result.length === 0 &&
    has(text, /아이|주인공|친구/)
  ) {
    result.push('girl')
  }

  return result
}

/* =========================================================
 * Actions
 * ======================================================= */

const ACTION_RULES: Array<
  [Action, RegExp]
> = [
  ['sleep', /잠들|잠을 자|꿈을 꾸|누워|잠자/],
  ['dance', /춤|춤추|파티|축제|노래/],
  ['fight', /싸우|전투|공격|물리치|맞서|싸움/],
  ['carry', /들고|메고|옮기|상자를 들|업고/],
  ['point', /가리키|손짓|알려|보여|설명/],
  ['read', /읽|독서|공부|책을 보|글을 보/],
  ['give', /주|건네|선물|나눠|전해/],
  ['hide', /숨|몰래|숨어|피해/],
  ['run', /달리|뛰|도망|급히|쫓|달아나/],
  ['look', /발견|바라|찾|살펴|올려다|구경|만나/],
  ['sit', /앉|쉬|기다|휴식/],
]

function getAction(
  text: string,
): Action {
  return (
    firstMatch(text, ACTION_RULES) ??
    'walk'
  )
}

/* =========================================================
 * Mood
 * ======================================================= */

const MOOD_RULES: Array<
  [Mood, RegExp]
> = [
  ['angry', /화나|분노|미워|짜증|화가/],
  [
    'happy',
    /기뻐|웃|축하|행복|즐거|환호|신나|기쁜/,
  ],
  [
    'sad',
    /슬프|울|외로|눈물|아쉬|걱정|속상/,
  ],
  [
    'surprised',
    /놀라|깜짝|무서|두려|위험|겁/,
  ],
  [
    'brave',
    /용기|결심|맞서|구하|이겨|당당/,
  ],
]

function getMood(
  text: string,
): Mood {
  return (
    firstMatch(text, MOOD_RULES) ??
    'normal'
  )
}

/* =========================================================
 * Animals
 * ======================================================= */

const ANIMAL_RULES: Array<
  [Animal, RegExp]
> = [
  ['cat', /고양이|냥이|야옹/],
  ['dog', /강아지|개|멍멍/],
  ['rabbit', /토끼|깡총/],
  ['fox', /여우/],
  ['bear', /곰|곰돌이/],
  ['panda', /판다/],
  ['lion', /사자/],
  ['tiger', /호랑이/],
  ['elephant', /코끼리/],
  ['giraffe', /기린/],
  ['monkey', /원숭이/],
  ['frog', /개구리/],
  ['penguin', /펭귄/],
  ['owl', /부엉이|올빼미/],
  ['deer', /사슴/],
  ['wolf', /늑대/],
  ['squirrel', /다람쥐/],
  ['hedgehog', /고슴도치/],
  ['cow', /소/],
  ['pig', /돼지/],
  ['sheep', /양/],
  ['chicken', /닭|병아리/],
  ['horse', /말/],
  ['duck', /오리/],
]

const ANIMAL_ICONS: Record<
  Animal,
  string
> = {
  cat: '🐱',
  dog: '🐶',
  rabbit: '🐰',
  fox: '🦊',
  bear: '🐻',
  panda: '🐼',
  lion: '🦁',
  tiger: '🐯',
  elephant: '🐘',
  giraffe: '🦒',
  monkey: '🐵',
  frog: '🐸',
  penguin: '🐧',
  owl: '🦉',
  deer: '🦌',
  wolf: '🐺',
  squirrel: '🐿️',
  hedgehog: '🦔',
  cow: '🐄',
  pig: '🐷',
  sheep: '🐑',
  chicken: '🐔',
  horse: '🐴',
  duck: '🦆',
}

function detectAnimals(
  text: string,
): Animal[] {
  return ANIMAL_RULES
    .filter(([, pattern]) =>
      pattern.test(text),
    )
    .map(([animal]) => animal)
}

/* =========================================================
 * Character / animal arrangement
 * ======================================================= */

function makeCharacterScenes(
  text: string,
): StoryCharacter[] {
  const characters =
    detectCharacters(text)

  const action = getAction(text)
  const mood = getMood(text)

  const sides: Direction[] = [
    'left',
    'center',
    'right',
  ]

  return characters
    .slice(0, 3)
    .map((character, index) => ({
      character,
      action,
      mood,
      side: sides[index],
    }))
}

function makeAnimalScenes(
  text: string,
): StoryAnimal[] {
  const animals =
    detectAnimals(text)

  const sides: Direction[] = [
    'right',
    'left',
    'center',
  ]

  return animals
    .slice(0, 3)
    .map((animal, index) => ({
      animal,
      side: sides[index],
      action: getAction(text),
    }))
}

/* =========================================================
 * Story objects
 * ======================================================= */

const OBJECT_RULES: Array<
  [string, RegExp, string]
> = [
  ['book', /책|독서|동화|일기|사전/, '📖'],
  ['letter', /편지|쪽지|초대장|메모/, '✉️'],
  ['map', /지도|보물지도/, '🗺️'],
  ['key', /열쇠|자물쇠/, '🔑'],
  ['treasure', /보물|금화|보석|다이아/, '💎'],
  ['apple', /사과/, '🍎'],
  ['cake', /케이크/, '🍰'],
  ['bread', /빵/, '🍞'],
  ['cookie', /쿠키|과자/, '🍪'],
  ['icecream', /아이스크림/, '🍦'],
  ['phone', /전화|휴대폰|문자|메시지/, '📱'],
  ['crown', /왕관/, '👑'],
  ['magic', /마법|주문|지팡이|마법진/, '🪄'],
  ['fire', /불꽃|모닥불|용암|화재/, '🔥'],
  ['lamp', /등불|램프|촛불|손전등/, '🏮'],
  ['umbrella', /우산/, '☂️'],
  ['clock', /시계|시간|약속/, '⏰'],
  ['balloon', /풍선/, '🎈'],
  ['music', /음악|노래|피아노|기타|연주/, '🎵'],
  ['camera', /사진|카메라|촬영/, '📷'],
  ['gift', /선물|리본/, '🎁'],
  ['weapon', /칼|검|방패|활|화살/, '⚔️'],
  ['vehicle', /자동차|버스|기차|자전거|비행기|택시/, '🚗'],
]

function detectObjects(
  text: string,
): StoryObject[] {
  const objects =
    OBJECT_RULES.filter(([, pattern]) =>
      pattern.test(text),
    )

  const sides: Direction[] = [
    'left',
    'right',
    'center',
  ]

  return objects
    .slice(0, 5)
    .map(
      ([type, , icon], index) => ({
        type,
        icon,
        side: sides[index % sides.length],
      }),
    )
}

/* =========================================================
 * Character icon
 * ======================================================= */

const CHARACTER_ICONS: Record<
  Character,
  string
> = {
  girl: '👧',
  boy: '👦',
  mother: '👩',
  father: '👨',
  grandmother: '👵',
  grandfather: '👴',
  teacher: '🧑‍🏫',
  doctor: '🧑‍⚕️',
  knight: '🛡️',
  king: '🤴',
  queen: '👸',
  wizard: '🧙',
}

/* =========================================================
 * Person
 * ======================================================= */

function Person({
  data,
}: {
  data: StoryCharacter
}) {
  const {
    character,
    action,
    mood,
    side,
  } = data

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
      className={[
        'story-person',
        `character-${character}`,
        `action-${action}`,
        `mood-${mood}`,
        `side-${side}`,
      ].join(' ')}
    >
      {moodEmoji && (
        <span className="person-mood-badge">
          {moodEmoji}
        </span>
      )}

      <span
        className="person-character-icon"
        aria-hidden="true"
      >
        {CHARACTER_ICONS[character]}
      </span>

      <i
        className="person-avatar"
        aria-hidden="true"
      >
        <b className="person-head">
          <b className="person-face" />
          <b className="person-hair" />
        </b>

        <b className="person-body">
          <b className="person-torso" />
          <b className="person-arm left-arm" />
          <b className="person-arm right-arm" />
        </b>

        <b className="person-legs">
          <b className="person-leg left-leg" />
          <b className="person-leg right-leg" />
        </b>
      </i>
    </div>
  )
}

/* =========================================================
 * Animal
 * ======================================================= */

function AnimalSprite({
  data,
}: {
  data: StoryAnimal
}) {
  return (
    <span
      className={[
        'story-animal',
        `animal-${data.animal}`,
        `animal-side-${data.side}`,
        `animal-action-${data.action}`,
      ].join(' ')}
      aria-label={data.animal}
    >
      {ANIMAL_ICONS[data.animal]}
    </span>
  )
}

/* =========================================================
 * Atmosphere
 * ======================================================= */

function Atmosphere({
  text,
}: {
  text: string
}) {
  const time =
    getTimeOfDay(text)

  const weather =
    getWeather(text)

  return (
    <div
      className={[
        'scene-atmosphere',
        `time-${time}`,
        `weather-${weather}`,
      ].join(' ')}
    >
      {time === 'night' && (
        <>
          <span className="story-moon">
            🌙
          </span>

          <span className="story-stars">
            ✨⭐🌟
          </span>
        </>
      )}

      {time === 'morning' && (
        <span className="story-sun">
          🌅
        </span>
      )}

      {time === 'sunset' && (
        <span className="story-sunset">
          🌇
        </span>
      )}

      {weather === 'rain' && (
        <div className="story-rain">
          🌧️
        </div>
      )}

      {weather === 'snow' && (
        <div className="story-snow">
          ❄️
        </div>
      )}

      {weather === 'wind' && (
        <div className="story-wind">
          🍃🍂
        </div>
      )}

      {weather === 'cloudy' && (
        <div className="story-cloud">
          ☁️☁️
        </div>
      )}
    </div>
  )
}

/* =========================================================
 * Farm
 * ======================================================= */

function FarmScene({
  text,
}: {
  text: string
}) {
  const isRuler = has(
    text,
    /주인|농장주|탐욕|부려먹/,
  )

  const isHard = has(
    text,
    /억압|희생|팔려|괴롭|강요|힘들/,
  )

  const isFree = has(
    text,
    /자유|해방|환호|축하|몰아내/,
  )

  const mode = isRuler
    ? 'ruler'
    : isHard
      ? 'oppress'
      : isFree
        ? 'celebrate'
        : 'calm'

  return (
    <div
      className={`farm-scene farm-${mode}`}
    >
      <div className="farm-bg-layer">
        <i className="farm-barn">
          🛖
        </i>

        <i className="farm-fence">
          🪵🪵🪵🪵
        </i>

        <i className="farm-hill" />
      </div>

      <div className="farm-animal-layer">
        {mode === 'calm' && (
          <>
            <span className="farm-animal cow">
              🐄
            </span>
            <span className="farm-animal sheep">
              🐑
            </span>
            <span className="farm-animal hen">
              🐔
            </span>
            <span className="farm-animal pig">
              🐷
            </span>
            <span className="farm-animal horse">
              🐴
            </span>
            <span className="farm-animal duck">
              🦆
            </span>
          </>
        )}

        {mode === 'celebrate' && (
          <span className="farm-crowd">
            🐮 🐷 🐔 🐑 🐴 🦆
          </span>
        )}

        {mode === 'ruler' && (
          <>
            <span className="farm-animal pig-boss">
              🐷👑
            </span>

            <span className="farm-workers">
              👨‍🌾🔨
            </span>
          </>
        )}

        {mode === 'oppress' && (
          <>
            <span className="farm-animal horse">
              🐴
            </span>

            <span className="farm-animal cow">
              🐄
            </span>

            <i className="farm-cart">
              🛒
            </i>

            <div className="farm-shadow-overlay" />
          </>
        )}
      </div>
    </div>
  )
}

/* =========================================================
 * Background
 * ======================================================= */

function SceneBackground({
  text,
  kind,
}: {
  text: string
  kind: SceneKind
}) {
  const showBoat = has(
    text,
    /배|항해|돛|카누/,
  )

  const showMountain = has(
    text,
    /산|언덕|절벽|계곡/,
  )

  const showRainbow = has(
    text,
    /무지개/,
  )

  return (
    <div className="scene-bg">
      {kind === 'farm' && (
        <FarmScene text={text} />
      )}

      {kind === 'forest' && (
        <>
          <i className="story-tree left">
            🌲
          </i>

          <i className="story-tree center">
            🌳
          </i>

          <i className="story-tree right">
            🌲
          </i>

          <i className="story-path" />
        </>
      )}

      {kind === 'garden' && (
        <>
          <i className="story-tree left">
            🌳
          </i>

          <i className="story-tree right">
            🌳
          </i>

          <span className="story-flowerbed">
            🌸🌻🌹🌷🦋
          </span>
        </>
      )}

      {kind === 'sea' && (
        <>
          <i className="story-island">
            🏝️
          </i>

          <div className="story-waves">
            🌊🌊🌊
          </div>

          {showBoat && (
            <span className="story-boat">
              ⛵
            </span>
          )}
        </>
      )}

      {kind === 'school' && (
        <>
          <i className="story-school">
            🏫
          </i>

          <i className="story-ground" />
        </>
      )}

      {kind === 'home' && (
        <>
          <i className="story-home">
            🏠
          </i>

          <span className="story-window">
            🪟
          </span>
        </>
      )}

      {kind === 'city' && (
        <>
          <div className="story-city">
            🏢🏣🏬🏢
          </div>

          <i className="story-crosswalk" />

          <span className="story-city-car">
            🚗
          </span>
        </>
      )}

      {kind === 'castle' && (
        <>
          <i className="story-castle">
            🏰
          </i>

          <span className="story-castle-flag">
            🚩
          </span>
        </>
      )}

      {kind === 'space' && (
        <>
          <i className="story-planet">
            🪐
          </i>

          <span className="story-rocket">
            🚀
          </span>

          <span className="story-space-star">
            ⭐✨🌟
          </span>
        </>
      )}

      {kind === 'cave' && (
        <>
          <i className="story-cave">
            🕳️
          </i>

          <span className="story-crystals">
            💎✨💎
          </span>
        </>
      )}

      {kind === 'hospital' && (
        <i className="story-hospital">
          🏥
        </i>
      )}

      {kind === 'market' && (
        <>
          <i className="story-shop">
            🏪
          </i>

          <span className="story-awning">
            🎪
          </span>
        </>
      )}

      {kind === 'winter' && (
        <>
          <span className="story-snowman">
            ☃️
          </span>

          <i className="story-pine">
            🌲
          </i>

          <i className="story-pine second">
            🌲
          </i>
        </>
      )}

      {kind === 'book' && (
        <>
          <i className="story-shelf">
            📚
          </i>

          <i className="story-table">
            🛋️
          </i>
        </>
      )}

      {showMountain && (
        <span className="story-mountain">
          ⛰️
        </span>
      )}

      {showRainbow && (
        <span className="story-rainbow">
          🌈
        </span>
      )}
    </div>
  )
}

/* =========================================================
 * Objects
 * ======================================================= */

function StoryObjects({
  text,
}: {
  text: string
}) {
  const objects =
    detectObjects(text)

  return (
    <>
      {objects.map(
        (object, index) => (
          <span
            key={`${object.type}-${index}`}
            className={[
              'story-item',
              `object-${object.type}`,
              `object-side-${object.side}`,
            ].join(' ')}
          >
            {object.icon}
          </span>
        ),
      )}
    </>
  )
}

/* =========================================================
 * Main scene
 * ======================================================= */

function SceneDetails({
  sentence,
  kind,
}: {
  sentence: string
  kind: SceneKind
}) {
  const text =
    sentence.toLowerCase()

  const characters =
    makeCharacterScenes(text)

  const animals =
    makeAnimalScenes(text)

  const empty =
    !sentence.trim()

  return (
    <>
      <Atmosphere text={text} />

      <SceneBackground
        text={text}
        kind={kind}
      />

      {/* 인물 */}
      <div className="scene-character-layer">
        {characters.map(
          (character, index) => (
            <Person
              key={`${character.character}-${index}`}
              data={character}
            />
          ),
        )}
      </div>

      {/* 동물 */}
      <div className="scene-animal-layer">
        {animals.map(
          (animal, index) => (
            <AnimalSprite
              key={`${animal.animal}-${index}`}
              data={animal}
            />
          ),
        )}
      </div>

      {/* 소품 */}
      <div className="scene-object-layer">
        <StoryObjects text={text} />
      </div>

      {empty && (
        <div className="scene-empty">
          <span className="scene-empty-icon">
            🎨
          </span>

          <span className="scene-empty-text">
            이야기를 적으면 그림이 완성돼요
          </span>
        </div>
      )}
    </>
  )
}

/* =========================================================
 * Main component
 * ======================================================= */

export default function ComicPanel({
  panel,
  subtitle,
  active,
  compact,
  onClick,
}: Props) {
  const sentence =
    panel.sentence ?? ''

  const kind =
    getSceneKind(sentence)

  const className = [
    'comic-panel',
    compact && 'compact',
    active && 'is-active',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={`${panel.stage} 단계 입력란으로 이동`}
    >
      <span className="panel-label">
        <strong>
          {panel.stage}
        </strong>

        {' · '}

        {subtitle}
      </span>

      <div
        className={[
          'scene',
          `scene-${kind}`,
        ].join(' ')}
      >
        <SceneDetails
          sentence={sentence}
          kind={kind}
        />
      </div>

      <div className="speech-bubble">
        {sentence ||
          '이야기 문장을 적어 주세요.'}
      </div>
    </button>
  )
}
