import { Panel } from '../types' type Props = { panel: Panel; subtitle: string; active?: boolean; compact?: boolean; onClick?: () => void } type SceneKind = 'farm' | 'sea' | 'forest' | 'school' | 'home' | 'city' | 'garden' | 'castle' | 'space' | 'cave' | 'hospital' | 'market' | 'winter' | 'book' type Character = 'girl' | 'boy' | 'adult' | 'pair' | 'none' type Action = 'read' | 'run' | 'look' | 'sit' | 'walk' | 'give' | 'hide' | 'sleep' | 'point' | 'carry' | 'fight' | 'dance' | 'cry' type Mood = 'happy' | 'sad' | 'surprised' | 'brave' | 'angry' | 'normal' const has = (text: string, words: RegExp) => words.test(text) function sceneKind(text: string): SceneKind { if (has(text, /농장|헛간|돼지|말|당나귀|가축|닭|양|소|목장/)) return 'farm' if (has(text, /우주|로켓|별나라|외계|행성|달나라|은하/)) return 'space' if (has(text, /성|궁전|왕국|왕자|공주|마법사|용|기사/)) return 'castle' if (has(text, /병원|의사|간호사|환자|진료|약국/)) return 'hospital' if (has(text, /시장|가게|마트|상점|빵집|식당|카페|음식점/)) return 'market' if (has(text, /동굴|광산|터널|지하|비밀방/)) return 'cave' if (has(text, /눈밭|스키|얼음|빙판|눈사람|겨울왕국/)) return 'winter' if (has(text, /바다|해변|파도|강|호수|항구|섬|배|수영|물고기/)) return 'sea' if (has(text, /학교|교실|도서관|운동장|선생님|학생|유치원/)) return 'school' if (has(text, /집|방|거실|부엌|침대|마당|창문|가족/)) return 'home' if (has(text, /도시|거리|골목|역|버스|자동차|신호등|빌딩|공원/)) return 'city' if (has(text, /정원|꽃밭|꽃|봄|나비|화단/)) return 'garden' if (has(text, /숲|나무|풀|산|언덕|숲길|캠핑|계곡/)) return 'forest' return 'book' } function characterFrom(text: string): Character { if (has(text, /친구들|아이들|두 사람|둘이|함께|소녀와|소년과|엄마와|아빠와|형제|자매|가족/)) return 'pair' if (has(text, /할머니|할아버지|엄마|아빠|선생님|의사|간호사|어른|아저씨|아주머니|왕|여왕|마법사|기사/)) return 'adult' if (has(text, /소녀|여자아이|그녀|공주|딸/)) return 'girl' if (has(text, /소년|남자아이|그|왕자|아들/)) return 'boy' if (has(text, /아이|주인공|사람|친구/)) return 'girl' return 'none' } function actionFrom(text: string): Action { if (has(text, /잠들|잠을 자|꿈을 꾸|누워/)) return 'sleep' if (has(text, /울|눈물|흐느|슬퍼해/)) return 'cry' if (has(text, /춤|노래|파티|축제/)) return 'dance' if (has(text, /싸우|맞서|공격|전투|물리치|이겨/)) return 'fight' if (has(text, /들고|메고|옮기|가방|상자를 들/)) return 'carry' if (has(text, /가리키|손짓|알려|보여 줘/)) return 'point' if (has(text, /읽|독서|펴|공부|글을 보/)) return 'read' if (has(text, /주|건네|선물|나눠/)) return 'give' if (has(text, /숨|몰래|피해/)) return 'hide' if (has(text, /달리|뛰|도망|급히|쫓/)) return 'run' if (has(text, /발견|바라|찾|살펴|올려다|만나|듣|구경/)) return 'look' if (has(text, /앉|쉬|기다/)) return 'sit' return 'walk' } function moodFrom(text: string): Mood { if (has(text, /화나|분노|미워|짜증/)) return 'angry' if (has(text, /기뻐|웃|축하|행복|즐거|환호|신나/)) return 'happy' if (has(text, /슬프|울|외로|눈물|아쉬|걱정/)) return 'sad' if (has(text, /놀라|깜짝|무서|두려|위험|겁/)) return 'surprised' if (has(text, /용기|결심|맞서|구하|이겨/)) return 'brave' return 'normal' } function Person({ character, action, mood, side = 'center' }: { character: Character; action: Action; mood: Mood; side?: 'left' | 'center' | 'right' }) { const moodEmoji = mood === 'happy' ? '✨' : mood === 'sad' ? '💧' : mood === 'angry' ? '💢' : mood === 'surprised' ? '❗' : mood === 'brave' ? '🔥' : '' return ( <div className={story-person character-${character} action-${action} mood-${mood} side-${side}}> {moodEmoji && <span className="person-mood-badge">{moodEmoji}</span>} <i className="person-avatar" aria-hidden="true"> <b className="person-head"><b className="person-face" /><b className="person-hair" /></b> <b className="person-body"><b className="person-torso" /><b className="person-arm left-arm" /><b className="person-arm right-arm" /></b> <b className="person-legs"><b className="person-leg left-leg" /><b className="person-leg right-leg" /></b> </i> </div> ) } function FarmScene({ text }: { text: string }) { const ruler = has(text, /주인|인간.*얼굴|탐욕|부려먹/) const oppress = has(text, /억압|희생|팔려|괴롭|강요|힘들/) const celebrate = has(text, /기뻐|축하|몰아내|자유|환호/) const moment = ruler ? 'ruler' : oppress ? 'oppress' : celebrate ? 'celebrate' : 'calm' return ( <div className={farm-scene farm-${moment}}> <div className="farm-bg-layer"> <i className="farm-barn">🛖</i> <i className="farm-fence">🪵🪵🪵</i> <i className="farm-hill" /> </div> <div className="farm-animal-layer"> {moment === 'calm' && ( <> <span className="farm-animal cow" title="소">🐄</span> <span className="farm-animal sheep" title="양">🐑</span> <span className="farm-animal hen" title="닭">🐔</span> </> )} {moment === 'celebrate' && ( <> <span className="farm-crowd">🥳 🐮 🐖 🐓</span> <span className="farm-flag">🚩</span> <span className="farm-sparkles">✨ 🎊</span> </> )} {moment === 'oppress' && ( <> <span className="farm-animal horse" title="말">🐴</span> <i className="farm-cart">🛒</i> <div className="farm-shadow-overlay" /> </> )} {moment === 'ruler' && ( <> <span className="farm-animal pig-boss" title="나폴레옹 돼지">🐷👑</span> <span className="farm-workers">👨‍🌾 🔨</span> </> )} </div> </div> ) } function SceneDetails({ sentence, kind }: { sentence: string; kind: SceneKind }) { const text = sentence.toLowerCase() const character = characterFrom(text) const action = actionFrom(text) const mood = moodFrom(text) const night = has(text, /밤|별|달|어둠|새벽/) const morning = has(text, /아침|해돋|새벽/) const sunset = has(text, /노을|해질|저녁/) const rain = has(text, /비|빗물|장마|폭풍/) const snow = has(text, /눈|겨울|눈송이/) const wind = has(text, /바람|흩날|날리|태풍/) const book = has(text, /책|독서|읽|동화|일기|사전/) const letter = has(text, /편지|지도|쪽지|초대장|메모/) const key = has(text, /열쇠|자물쇠/) const treasure = has(text, /보물|상자|금화|보석|다이아/) const flower = has(text, /꽃|봄|정원|꽃밭|나비|장미|튤립/) const mountain = has(text, /산|언덕|절벽|계곡/) const lamp = has(text, /등불|램프|불빛|촛불|손전등/) const umbrella = has(text, /우산/) const boat = has(text, /배|항해|돛|카누/) const food = has(text, /빵|케이크|사과|음식|식사|쿠키|과자|주스/) const phone = has(text, /전화|휴대폰|메시지|문자/) const crown = has(text, /왕관|왕|여왕|공주|왕자/) const magic = has(text, /마법|요정|주문|지팡이|마법진/) const fire = has(text, /불|화재|불꽃|모닥불|용암/) const rainbow = has(text, /무지개/) const cloud = has(text, /구름|흐린/) const vehicle = has(text, /자동차|버스|기차|자전거|비행기|택시/) const clock = has(text, /시계|시간|약속/) const balloon = has(text, /풍선/) const music = has(text, /음악|노래|피아노|기타|연주/) const camera = has(text, /사진|카메라/) const gift = has(text, /선물|리본/) const weapon = has(text, /칼|검|방패|활|화살/) const monster = has(text, /괴물|용|마녀|유령|외계인/) const pet = has(text, /고양이|강아지|토끼|여우|늑대|곰|사자|호랑이|새|물고기|동물/) const animalIcon = has(text, /고양이/) ? '🐱' : has(text, /강아지|개/) ? '🐶' : has(text, /토끼/) ? '🐰' : has(text, /여우/) ? '🦊' : has(text, /새/) ? '🕊️' : has(text, /물고기/) ? '🐠' : '🐾' const empty = !sentence.trim() return ( <> <div className={scene-atmosphere ${night ? 'is-night' : ''} ${morning ? 'is-morning' : ''} ${sunset ? 'is-sunset' : ''} ${rain ? 'is-rainy' : ''} ${snow ? 'is-snowy' : ''} ${cloud ? 'is-cloudy' : ''}} /> {/* 배경 구성 */} <div className="scene-bg"> {kind === 'farm' && <FarmScene text={text} />} {kind === 'forest' && <><i className="story-tree left">🌲</i><i className="story-tree right">🌳</i><i className="story-path" /></>} {kind === 'garden' && <><i className="story-tree left">🌳</i><span className="story-flowerbed">🌸🌻🌹</span></>} {kind === 'sea' && <><i className="story-island">🏝️</i><div className="story-waves">🌊🌊</div>{boat && <span className="story-boat">⛵</span>}</>} {kind === 'school' && <><i className="story-school">🏫</i><i className="story-ground" /></>} {kind === 'home' && <><i className="story-home">🏠</i><span className="story-window">🪟</span></>} {kind === 'city' && <><div className="story-city">🏢🏣🏢</div><i className="story-crosswalk" /></>} {kind === 'castle' && <i className="story-castle">🏰</i>} {kind === 'space' && <><i className="story-planet">🪐</i><span className="story-rocket">🚀</span></>} {kind === 'cave' && <><i className="story-cave">🕳️</i><span className="story-crystals">💎✨</span></>} {kind === 'hospital' && <><i className="story-hospital">🏥</i></>} {kind === 'market' && <><i className="story-shop">🏪</i><span className="story-awning">🎪</span></>} {kind === 'winter' && <><span className="story-snowman">☃️</span><i className="story-pine">🌲</i></>} {kind === 'book' && <><i className="story-shelf">📚</i><i className="story-table">🛋️</i></>} {mountain && <span className="story-mountain">⛰️</span>} {night && <><span className="story-moon">🌙</span><span className="story-stars">✨⭐</span></>} {morning && <span className="story-sun">🌅</span>} {rain && <div className="story-rain">🌧️</div>} {snow && <div className="story-snow">❄️</div>} {wind && <div className="story-wind">🍃</div>} {rainbow && <span className="story-rainbow">🌈</span>} </div> {/* 캐릭터 및 오브젝트 레이어 */} <div className="scene-objects"> {flower && kind !== 'garden' && <span className="story-flowers">💐</span>} {character !== 'none' && kind !== 'farm' && <Person character={character} action={action} mood={mood} side={character === 'pair' ? 'left' : 'center'} />} {character === 'pair' && kind !== 'farm' && <Person character="boy" action={action} mood={mood} side="right" />} {book && <span className="story-item book">📖</span>} {letter && <span className="story-item letter">✉️</span>} {key && <span className="story-item key">🔑</span>} {treasure && <span className="story-item treasure">💎</span>} {pet && kind !== 'farm' && <span className="story-item animal">{animalIcon}</span>} {umbrella && <span className="story-item umbrella">☂️</span>} {lamp && <span className="story-item lamp">💡</span>} {food && <span className="story-item food">🍎</span>} {phone && <span className="story-item phone">📱</span>} {crown && <span className="story-item crown">👑</span>} {magic && <span className="story-item magic">🪄✨</span>} {fire && <span className="story-item fire">🔥</span>} {vehicle && <span className="story-item vehicle">🚗</span>} {clock && <span className="story-item clock">⏰</span>} {balloon && <span className="story-item balloon">🎈</span>} {music && <span className="story-item music">🎵</span>} {camera && <span className="story-item camera">📷</span>} {gift && <span className="story-item gift">🎁</span>} {weapon && <span className="story-item weapon">⚔️</span>} {monster && <span className="story-item monster">👾</span>} </div> {empty && ( <div className="scene-empty"> <span className="scene-empty-icon">🎨</span> <span className="scene-empty-text">이야기 문장을 적으면 그림이 완성돼요</span> </div> )} </> ) } export default function ComicPanel({ panel, subtitle, active, compact, onClick }: Props) { const kind = sceneKind(panel.sentence) return ( <button type="button" className={comic-panel ${compact ? 'compact' : ''} ${active ? 'is-active' : ''}} onClick={onClick} aria-label={${panel.stage} 단계 입력란으로 이동}> <span className="panel-label"> <strong>{panel.stage}</strong> · {subtitle} </span> <div className={scene scene-${kind}}> <SceneDetails sentence={panel.sentence} kind={kind} /> </div> <div className="speech-bubble">{panel.sentence || '이야기 문장을 적어 주세요.'}</div> </button> ) }







import { Panel } from '../types'

type Props = {
  panel: Panel
  subtitle: string
  active?: boolean
  compact?: boolean
  onClick?: () => void
}

/* =========================================================
 * Types
 * ======================================================= */

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
  | 'pair'
  | 'none'

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
  | 'none'

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
  | 'cry'

type Mood =
  | 'happy'
  | 'sad'
  | 'surprised'
  | 'brave'
  | 'angry'
  | 'normal'

type Direction = 'left' | 'center' | 'right'

/* =========================================================
 * Utility
 * ======================================================= */

const matches = (text: string, pattern: RegExp) => pattern.test(text)

const includesAny = (text: string, keywords: string[]) =>
  keywords.some(keyword => text.includes(keyword))

const emptyText = (text: string) => !text.trim()

/* =========================================================
 * Scene detection
 * ======================================================= */

const SCENE_RULES: Array<[SceneKind, RegExp]> = [
  ['farm', /농장|헛간|돼지|말|당나귀|가축|닭|양|소|목장|농부|축사/],
  ['space', /우주|로켓|별나라|외계|행성|달나라|은하|우주선/],
  ['castle', /성|궁전|왕국|왕자|공주|마법사|용|기사|왕|여왕/],
  ['hospital', /병원|의사|간호사|환자|진료|약국|응급실/],
  ['market', /시장|가게|마트|상점|빵집|식당|카페|음식점|편의점/],
  ['cave', /동굴|광산|터널|지하|비밀방|보물동굴/],
  ['winter', /눈밭|스키|얼음|빙판|눈사람|겨울왕국|눈보라/],
  ['sea', /바다|해변|파도|강|호수|항구|섬|배|수영|물고기|해수욕장/],
  ['school', /학교|교실|도서관|운동장|선생님|학생|유치원|학원/],
  ['home', /집|방|거실|부엌|침대|마당|창문|가족|아파트/],
  ['city', /도시|거리|골목|역|버스|자동차|신호등|빌딩|공원|횡단보도/],
  ['garden', /정원|꽃밭|꽃|봄|나비|화단|장미|튤립/],
  ['forest', /숲|나무|풀|산|언덕|숲길|캠핑|계곡|등산/],
]

function sceneKind(text: string): SceneKind {
  const rule = SCENE_RULES.find(([, pattern]) => matches(text, pattern))
  return rule?.[0] ?? 'book'
}

/* =========================================================
 * Character detection
 * ======================================================= */

const CHARACTER_RULES: Array<[Character, RegExp]> = [
  [
    'pair',
    /친구들|아이들|두 사람|둘이|함께|소녀와|소년과|엄마와|아빠와|형제|자매|남매/,
  ],
  ['grandmother', /할머니|외할머니|할머님/],
  ['grandfather', /할아버지|외할아버지|할아버님/],
  ['mother', /엄마|어머니|어머님|맘/],
  ['father', /아빠|아버지|아버님|아빠와/],
  ['teacher', /선생님|교사|담임/],
  ['doctor', /의사|간호사|의료진/],
  ['knight', /기사|전사|용사/],
  ['king', /왕|국왕/],
  ['queen', /여왕|왕비/],
  ['wizard', /마법사|현자|마법소녀|마녀/],
  ['girl', /소녀|여자아이|그녀|공주|딸/],
  ['boy', /소년|남자아이|그|왕자|아들/],
  ['girl', /아이|주인공|사람|친구/],
]

function characterFrom(text: string): Character {
  const rule = CHARACTER_RULES.find(([, pattern]) =>
    matches(text, pattern),
  )

  return rule?.[0] ?? 'none'
}

/* =========================================================
 * Action detection
 * ======================================================= */

const ACTION_RULES: Array<[Action, RegExp]> = [
  ['sleep', /잠들|잠을 자|꿈을 꾸|누워|잠자/],
  ['cry', /울|눈물|흐느|슬퍼해|훌쩍/],
  ['dance', /춤|노래|파티|축제|춤추/],
  ['fight', /싸우|맞서|공격|전투|물리치|이겨|싸움/],
  ['carry', /들고|메고|옮기|가방|상자를 들|업고/],
  ['point', /가리키|손짓|알려|보여 줘|설명/],
  ['read', /읽|독서|펴|공부|글을 보|책을 보/],
  ['give', /주|건네|선물|나눠|전해/],
  ['hide', /숨|몰래|피해|숨어/],
  ['run', /달리|뛰|도망|급히|쫓|달아나/],
  ['look', /발견|바라|찾|살펴|올려다|만나|듣|구경/],
  ['sit', /앉|쉬|기다|휴식/],
]

function actionFrom(text: string): Action {
  const rule = ACTION_RULES.find(([, pattern]) =>
    matches(text, pattern),
  )

  return rule?.[0] ?? 'walk'
}

/* =========================================================
 * Mood detection
 * ======================================================= */

const MOOD_RULES: Array<[Mood, RegExp]> = [
  ['angry', /화나|분노|미워|짜증|화가/],
  ['happy', /기뻐|웃|축하|행복|즐거|환호|신나|기쁜/],
  ['sad', /슬프|울|외로|눈물|아쉬|걱정|속상/],
  ['surprised', /놀라|깜짝|무서|두려|위험|겁|놀람/],
  ['brave', /용기|결심|맞서|구하|이겨|당당/],
]

function moodFrom(text: string): Mood {
  const rule = MOOD_RULES.find(([, pattern]) =>
    matches(text, pattern),
  )

  return rule?.[0] ?? 'normal'
}

/* =========================================================
 * Animal detection
 * ======================================================= */

const ANIMAL_RULES: Array<[Animal, RegExp]> = [
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

const ANIMAL_ICONS: Record<Animal, string> = {
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
  none: '',
}

function animalFrom(text: string): Animal {
  const rule = ANIMAL_RULES.find(([, pattern]) =>
    matches(text, pattern),
  )

  return rule?.[0] ?? 'none'
}

/* =========================================================
 * Atmosphere
 * ======================================================= */

function Atmosphere({ text }: { text: string }) {
  const night = matches(text, /밤|별|달|어둠/)
  const morning = matches(text, /아침|해돋|새벽/)
  const sunset = matches(text, /노을|해질|저녁/)
  const rain = matches(text, /비|빗물|장마|폭풍/)
  const snow = matches(text, /눈|겨울|눈송이|눈보라/)
  const wind = matches(text, /바람|흩날|날리|태풍/)
  const cloud = matches(text, /구름|흐린|흐림/)

  return (
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
    >
      {night && (
        <>
          <span className="story-moon">🌙</span>
          <span className="story-stars">✨⭐🌟</span>
        </>
      )}

      {morning && <span className="story-sun">🌅</span>}
      {rain && <div className="story-rain">🌧️</div>}
      {snow && <div className="story-snow">❄️</div>}
      {wind && <div className="story-wind">🍃</div>}
    </div>
  )
}

/* =========================================================
 * Person
 * ======================================================= */

const CHARACTER_ICONS: Record<Character, string> = {
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
  pair: '🧒',
  none: '',
}

function Person({
  character,
  action,
  mood,
  side = 'center',
}: {
  character: Character
  action: Action
  mood: Mood
  side?: Direction
}) {
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
className={`story-person character-${character} action-${action} mood-${mood}`}
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

      {/* 기존 CSS 캐릭터가 있다면 계속 사용할 수 있도록 유지 */}
      <i className="person-avatar" aria-hidden="true">
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
 * Farm Scene
 * ======================================================= */

function FarmScene({ text }: { text: string }) {
  const ruler = matches(text, /주인|인간.*얼굴|탐욕|부려먹/)
  const oppressed = matches(
    text,
    /억압|희생|팔려|괴롭|강요|힘들/,
  )
  const celebrate = matches(
    text,
    /기뻐|축하|몰아내|자유|환호/,
  )

  const moment = ruler
    ? 'ruler'
    : oppressed
      ? 'oppress'
      : celebrate
        ? 'celebrate'
        : 'calm'

  return (
    <div className={`farm-scene farm-${moment}`}>
      <div className="farm-bg-layer">
        <i className="farm-barn">🛖</i>
        <i className="farm-fence">🪵🪵🪵🪵</i>
        <i className="farm-hill" />
      </div>

      <div className="farm-animal-layer">
        {moment === 'calm' && (
          <>
            <span className="farm-animal cow">🐄</span>
            <span className="farm-animal sheep">🐑</span>
            <span className="farm-animal hen">🐔</span>
            <span className="farm-animal pig">🐷</span>
            <span className="farm-animal horse">🐴</span>
            <span className="farm-animal duck">🦆</span>
          </>
        )}

        {moment === 'celebrate' && (
          <>
            <span className="farm-crowd">
              🥳 🐮 🐷 🐔 🐑 🐴
            </span>
            <span className="farm-flag">🚩</span>
            <span className="farm-sparkles">✨🎊🎉</span>
          </>
        )}

        {moment === 'oppress' && (
          <>
            <span className="farm-animal horse">🐴</span>
            <span className="farm-animal cow">🐄</span>
            <i className="farm-cart">🛒</i>
            <div className="farm-shadow-overlay" />
          </>
        )}

        {moment === 'ruler' && (
          <>
            <span className="farm-animal pig-boss">
              🐷👑
            </span>
            <span className="farm-workers">
              👨‍🌾 🔨
            </span>
            <span className="farm-animal sheep">🐑</span>
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
  const boat = matches(text, /배|항해|돛|카누/)
  const mountain = matches(text, /산|언덕|절벽|계곡/)
  const flower = matches(
    text,
    /꽃|봄|정원|꽃밭|나비|장미|튤립/,
  )
  const rainbow = matches(text, /무지개/)
  const vehicle = matches(
    text,
    /자동차|버스|기차|자전거|비행기|택시/,
  )

  return (
    <div className="scene-bg">
      {kind === 'farm' && (
        <FarmScene text={text} />
      )}

      {kind === 'forest' && (
        <>
          <i className="story-tree left">🌲</i>
          <i className="story-tree center">🌳</i>
          <i className="story-tree right">🌲</i>
          <i className="story-path" />
        </>
      )}

      {kind === 'garden' && (
        <>
          <i className="story-tree left">🌳</i>
          <i className="story-tree right">🌳</i>
          <span className="story-flowerbed">
            🌸🌻🌹🌷🦋
          </span>
        </>
      )}

      {kind === 'sea' && (
        <>
          <i className="story-island">🏝️</i>
          <div className="story-waves">🌊🌊🌊</div>
          {boat && (
            <span className="story-boat">⛵</span>
          )}
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
          <div className="story-city">
            🏢🏣🏬🏢
          </div>
          <i className="story-crosswalk" />
          {vehicle && (
            <span className="story-city-car">
              🚗
            </span>
          )}
        </>
      )}

      {kind === 'castle' && (
        <>
          <i className="story-castle">🏰</i>
          <span className="story-castle-flag">
            🚩
          </span>
        </>
      )}

      {kind === 'space' && (
        <>
          <i className="story-planet">🪐</i>
          <span className="story-rocket">🚀</span>
          <span className="story-space-star">
            ⭐✨🌟
          </span>
        </>
      )}

      {kind === 'cave' && (
        <>
          <i className="story-cave">🕳️</i>
          <span className="story-crystals">
            💎✨💎
          </span>
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
          <i className="story-pine second">🌲</i>
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

      {flower && kind !== 'garden' && (
        <span className="story-flowers">
          💐🌷🌻
        </span>
      )}

      {rainbow && (
        <span className="story-rainbow">🌈</span>
      )}
    </div>
  )
}

/* =========================================================
 * Story Objects
 * ======================================================= */

function StoryObjects({
  text,
  kind,
}: {
  text: string
  kind: SceneKind
}) {
  const book = matches(
    text,
    /책|독서|읽|동화|일기|사전/,
  )

  const letter = matches(
    text,
    /편지|지도|쪽지|초대장|메모/,
  )

  const key = matches(
    text,
    /열쇠|자물쇠/,
  )

  const treasure = matches(
    text,
    /보물|상자|금화|보석|다이아/,
  )

  const umbrella = matches(text, /우산/)
  const lamp = matches(
    text,
    /등불|램프|불빛|촛불|손전등/,
  )

  const food = matches(
    text,
    /빵|케이크|사과|음식|식사|쿠키|과자|주스|아이스크림/,
  )

  const phone = matches(
    text,
    /전화|휴대폰|메시지|문자/,
  )

  const crown = matches(
    text,
    /왕관|왕|여왕|공주|왕자/,
  )

  const magic = matches(
    text,
    /마법|요정|주문|지팡이|마법진/,
  )

  const fire = matches(
    text,
    /불|화재|불꽃|모닥불|용암/,
  )

  const clock = matches(
    text,
    /시계|시간|약속/,
  )

  const balloon = matches(text, /풍선/)
  const music = matches(
    text,
    /음악|노래|피아노|기타|연주/,
  )

  const camera = matches(
    text,
    /사진|카메라|촬영/,
  )

  const gift = matches(
    text,
    /선물|리본/,
  )

  const weapon = matches(
    text,
    /칼|검|방패|활|화살/,
  )

  const monster = matches(
    text,
    /괴물|용|마녀|유령|외계인/,
  )

  const vehicle = matches(
    text,
    /자동차|버스|기차|자전거|비행기|택시/,
  )

  const animal = animalFrom(text)

  const character = characterFrom(text)
  const action = actionFrom(text)
  const mood = moodFrom(text)

  return (
    <div className="scene-objects">
      {/* 캐릭터 */}
      {character !== 'none' &&
        kind !== 'farm' && (
          <Person
            character={character}
            action={action}
            mood={mood}
            side={
              character === 'pair'
                ? 'left'
                : 'center'
            }
          />
        )}

      {character === 'pair' &&
        kind !== 'farm' && (
          <Person
            character="boy"
            action={action}
            mood={mood}
            side="right"
          />
        )}

      {/* 동물 */}
      {animal !== 'none' &&
        kind !== 'farm' && (
          <span
            className={`story-item animal animal-${animal}`}
            title={animal}
          >
            {ANIMAL_ICONS[animal]}
          </span>
        )}

      {/* 사물 */}
      {book && (
        <span className="story-item book">
          📖
        </span>
      )}

      {letter && (
        <span className="story-item letter">
          ✉️
        </span>
      )}

      {key && (
        <span className="story-item key">
          🔑
        </span>
      )}

      {treasure && (
        <span className="story-item treasure">
          💎
        </span>
      )}

      {umbrella && (
        <span className="story-item umbrella">
          ☂️
        </span>
      )}

      {lamp && (
        <span className="story-item lamp">
          💡
        </span>
      )}

      {food && (
        <span className="story-item food">
          🍎
        </span>
      )}

      {phone && (
        <span className="story-item phone">
          📱
        </span>
      )}

      {crown && (
        <span className="story-item crown">
          👑
        </span>
      )}

      {magic && (
        <span className="story-item magic">
          🪄✨
        </span>
      )}

      {fire && (
        <span className="story-item fire">
          🔥
        </span>
      )}

      {vehicle && (
        <span className="story-item vehicle">
          🚗
        </span>
      )}

      {clock && (
        <span className="story-item clock">
          ⏰
        </span>
      )}

      {balloon && (
        <span className="story-item balloon">
          🎈
        </span>
      )}

      {music && (
        <span className="story-item music">
          🎵
        </span>
      )}

      {camera && (
        <span className="story-item camera">
          📷
        </span>
      )}

      {gift && (
        <span className="story-item gift">
          🎁
        </span>
      )}

      {weapon && (
        <span className="story-item weapon">
          ⚔️
        </span>
      )}

      {monster && (
        <span className="story-item monster">
          👾
        </span>
      )}
    </div>
  )
}

/* =========================================================
 * Scene Details
 * ======================================================= */

function SceneDetails({
  sentence,
  kind,
}: {
  sentence: string
  kind: SceneKind
}) {
  const text = sentence.toLowerCase()

  return (
    <>
      <Atmosphere text={text} />

      <SceneBackground
        text={text}
        kind={kind}
      />

      <StoryObjects
        text={text}
        kind={kind}
      />

      {emptyText(sentence) && (
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
 * Main Component
 * ======================================================= */

export default function ComicPanel({
  panel,
  subtitle,
  active,
  compact,
  onClick,
}: Props) {
  const kind = sceneKind(panel.sentence)

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
        <strong>{panel.stage}</strong>
        {' · '}
        {subtitle}
      </span>

      <div className={`scene scene-${kind}`}>
        <SceneDetails
          sentence={panel.sentence}
          kind={kind}
        />
      </div>

      <div className="speech-bubble">
        {panel.sentence ||
          '이야기 문장을 적어 주세요.'}
      </div>
    </button>
  )
}
