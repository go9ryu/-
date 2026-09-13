import { Panel } from '../types'

type Props = { panel: Panel; subtitle: string; active?: boolean; compact?: boolean; onClick?: () => void }
type SceneKind = 'farm' | 'sea' | 'forest' | 'school' | 'home' | 'city' | 'garden' | 'castle' | 'space' | 'cave' | 'hospital' | 'market' | 'winter' | 'book'
type Character = 'girl' | 'boy' | 'adult' | 'pair' | 'none'
type Action = 'read' | 'run' | 'look' | 'sit' | 'walk' | 'give' | 'hide' | 'sleep' | 'point' | 'carry' | 'fight' | 'dance' | 'cry'
type Mood = 'happy' | 'sad' | 'surprised' | 'brave' | 'angry' | 'normal'

const has = (text: string, words: RegExp) => words.test(text)

function sceneKind(text: string): SceneKind {
  if (has(text, /농장|헛간|돼지|말|당나귀|가축|닭|양|소|목장/)) return 'farm'
  if (has(text, /우주|로켓|별나라|외계|행성|달나라|은하/)) return 'space'
  if (has(text, /성|궁전|왕국|왕자|공주|마법사|용|기사/)) return 'castle'
  if (has(text, /병원|의사|간호사|환자|진료|약국/)) return 'hospital'
  if (has(text, /시장|가게|마트|상점|빵집|식당|카페|음식점/)) return 'market'
  if (has(text, /동굴|광산|터널|지하|비밀방/)) return 'cave'
  if (has(text, /눈밭|스키|얼음|빙판|눈사람|겨울왕국/)) return 'winter'
  if (has(text, /바다|해변|파도|강|호수|항구|섬|배|수영|물고기/)) return 'sea'
  if (has(text, /학교|교실|도서관|운동장|선생님|학생|유치원/)) return 'school'
  if (has(text, /집|방|거실|부엌|침대|마당|창문|가족/)) return 'home'
  if (has(text, /도시|거리|골목|역|버스|자동차|신호등|빌딩|공원/)) return 'city'
  if (has(text, /정원|꽃밭|꽃|봄|나비|화단/)) return 'garden'
  if (has(text, /숲|나무|풀|산|언덕|숲길|캠핑|계곡/)) return 'forest'
  return 'book'
}

function characterFrom(text: string): Character {
  if (has(text, /친구들|아이들|두 사람|둘이|함께|소녀와|소년과|엄마와|아빠와|형제|자매|가족/)) return 'pair'
  if (has(text, /할머니|할아버지|엄마|아빠|선생님|의사|간호사|어른|아저씨|아주머니|왕|여왕|마법사|기사/)) return 'adult'
  if (has(text, /소녀|여자아이|그녀|공주|딸/)) return 'girl'
  if (has(text, /소년|남자아이|그|왕자|아들/)) return 'boy'
  if (has(text, /아이|주인공|사람|친구/)) return 'girl'
  return 'none'
}

function actionFrom(text: string): Action {
  if (has(text, /잠들|잠을 자|꿈을 꾸|누워/)) return 'sleep'
  if (has(text, /울|눈물|흐느|슬퍼해/)) return 'cry'
  if (has(text, /춤|노래|파티|축제/)) return 'dance'
  if (has(text, /싸우|맞서|공격|전투|물리치|이겨/)) return 'fight'
  if (has(text, /들고|메고|옮기|가방|상자를 들/)) return 'carry'
  if (has(text, /가리키|손짓|알려|보여 줘/)) return 'point'
  if (has(text, /읽|독서|펴|공부|글을 보/)) return 'read'
  if (has(text, /주|건네|선물|나눠/)) return 'give'
  if (has(text, /숨|몰래|피해/)) return 'hide'
  if (has(text, /달리|뛰|도망|급히|쫓/)) return 'run'
  if (has(text, /발견|바라|찾|살펴|올려다|만나|듣|구경/)) return 'look'
  if (has(text, /앉|쉬|기다/)) return 'sit'
  return 'walk'
}

function moodFrom(text: string): Mood {
  if (has(text, /화나|분노|미워|짜증/)) return 'angry'
  if (has(text, /기뻐|웃|축하|행복|즐거|환호|신나/)) return 'happy'
  if (has(text, /슬프|울|외로|눈물|아쉬|걱정/)) return 'sad'
  if (has(text, /놀라|깜짝|무서|두려|위험|겁/)) return 'surprised'
  if (has(text, /용기|결심|맞서|구하|이겨/)) return 'brave'
  return 'normal'
}

/* SVG 그래픽 기반의 캐릭터 컴포넌트 */
function Person({ character, action, mood, side = 'center' }: { character: Character; action: Action; mood: Mood; side?: 'left' | 'center' | 'right' }) {
  const isGirl = character === 'girl' || character === 'pair'
  const shirtColor = isGirl ? '#FF7675' : character === 'adult' ? '#6C5CE7' : '#0984E3'
  const hairColor = character === 'adult' ? '#636E72' : isGirl ? '#D63031' : '#2D3436'

  return (
    <div className={`story-person character-${character} action-${action} mood-${mood} side-${side}`}>
      <svg viewBox="0 0 100 120" className="person-svg" width="70" height="90">
        <ellipse cx="50" cy="112" rx="22" ry="5" fill="rgba(0,0,0,0.15)" />
        <g className="person-body-group">
          {/* 머리카락 (뒷모습 레이어) */}
          {isGirl && <path d="M26 35 C18 55 22 78 30 82 C35 60 38 45 34 35 Z M74 35 C82 55 78 78 70 82 C65 60 62 45 66 35 Z" fill={hairColor} />}
          
          {/* 몸통 및 옷 */}
          <path d="M34 52 L66 52 L62 88 L38 88 Z" fill={shirtColor} rx="3" />
          
          {/* 다리 */}
          <rect x="40" y="86" width="7" height="24" rx="3" fill="#2D3436" className="leg left" />
          <rect x="53" y="86" width="7" height="24" rx="3" fill="#2D3436" className="leg right" />
          <ellipse cx="43" cy="109" rx="5.5" ry="3" fill="#D63031" />
          <ellipse cx="56" cy="109" rx="5.5" ry="3" fill="#D63031" />

          {/* 팔 */}
          <rect x="24" y="54" width="8" height="22" rx="4" fill="#FFEAA7" className="arm left" />
          <rect x="68" y="54" width="8" height="22" rx="4" fill="#FFEAA7" className="arm right" />

          {/* 얼굴 */}
          <circle cx="50" cy="35" r="18" fill="#FFEAA7" />
          
          {/* 윗머리 */}
          <path d="M32 30 C32 16 68 16 68 30 C60 20 40 20 32 30 Z" fill={hairColor} />

          {/* 눈 및 표정 */}
          <circle cx="43" cy="35" r="2.2" fill="#2D3436" />
          <circle cx="57" cy="35" r="2.2" fill="#2D3436" />
          <circle cx="44" cy="34" r="0.8" fill="#FFFFFF" />
          <circle cx="58" cy="34" r="0.8" fill="#FFFFFF" />

          {/* 볼터치 */}
          <ellipse cx="40" cy="39" rx="3" ry="1.5" fill="#FF7675" opacity="0.6" />
          <ellipse cx="60" cy="39" rx="3" ry="1.5" fill="#FF7675" opacity="0.6" />

          {/* 입 모양 */}
          {mood === 'happy' && <path d="M44 41 Q50 47 56 41" stroke="#2D3436" strokeWidth="2" fill="none" strokeLinecap="round" />}
          {mood === 'sad' && <path d="M44 45 Q50 40 56 45" stroke="#2D3436" strokeWidth="2" fill="none" strokeLinecap="round" />}
          {mood === 'angry' && <path d="M44 44 L56 42" stroke="#2D3436" strokeWidth="2" fill="none" strokeLinecap="round" />}
          {(mood === 'normal' || mood === 'surprised' || mood === 'brave') && <path d="M45 43 L55 43" stroke="#2D3436" strokeWidth="2" fill="none" strokeLinecap="round" />}
        </g>
      </svg>
    </div>
  )
}

/* 벡터 그래픽으로 구현한 농장 배경 */
function FarmScene({ text }: { text: string }) {
  const ruler = has(text, /주인|인간.*얼굴|탐욕|부려먹/)
  const oppress = has(text, /억압|희생|팔려|괴롭|강요|힘들/)
  const celebrate = has(text, /기뻐|축하|몰아내|자유|환호/)
  const moment = ruler ? 'ruler' : oppress ? 'oppress' : celebrate ? 'celebrate' : 'calm'

  return (
    <div className={`farm-scene farm-${moment}`}>
      <svg className="farm-svg" viewBox="0 0 300 180" preserveAspectRatio="xMidYMid slice">
        <path d="M0 100 Q90 75 190 95 T300 85 L300 180 L0 180 Z" fill="#55EFC4" />
        <path d="M0 125 Q130 105 300 125 L300 180 L0 180 Z" fill="#00B894" />

        {/* 붉은 헛간 */}
        <g transform="translate(15, 45)">
          <path d="M10 40 L40 15 L70 40 L70 90 L10 90 Z" fill="#D63031" stroke="#2D3436" strokeWidth="2" />
          <path d="M5 40 L40 10 L75 40" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <rect x="30" y="60" width="20" height="30" fill="#636E72" />
          <path d="M30 60 L50 90 M50 60 L30 90" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* 울타리 */}
        <path d="M90 135 L280 135 M90 145 L280 145" stroke="#FFEAA7" strokeWidth="3" />
        <path d="M100 128 L100 152 M140 128 L140 152 M180 128 L180 152 M220 128 L220 152 M260 128 L260 152" stroke="#FFEAA7" strokeWidth="3.5" strokeLinecap="round" />

        {/* 동적으로 묘사되는 상징 및 동물 */}
        {moment === 'calm' && (
          <g transform="translate(120, 110)">
            <rect x="10" y="10" width="28" height="18" rx="5" fill="#FFFFFF" stroke="#2D3436" strokeWidth="1.5" />
            <circle cx="17" cy="17" r="3.5" fill="#2D3436" />
            <circle cx="30" cy="20" r="2.5" fill="#2D3436" />
            <circle cx="34" cy="11" r="6" fill="#FFFFFF" stroke="#2D3436" strokeWidth="1.5" />
          </g>
        )}
        {moment === 'ruler' && (
          <g transform="translate(170, 100)">
            <ellipse cx="25" cy="25" rx="16" ry="13" fill="#FF7675" stroke="#2D3436" strokeWidth="1.5" />
            <circle cx="37" cy="22" r="8" fill="#FF7675" stroke="#2D3436" strokeWidth="1.5" />
            <path d="M30 11 L34 3 L38 9 L42 3 L46 11 Z" fill="#FDCB6E" stroke="#2D3436" strokeWidth="1" />
          </g>
        )}
      </svg>
    </div>
  )
}

function SceneDetails({ sentence, kind }: { sentence: string; kind: SceneKind }) {
  const text = sentence.toLowerCase()
  const character = characterFrom(text)
  const action = actionFrom(text)
  const mood = moodFrom(text)

  const night = has(text, /밤|별|달|어둠|새벽/)
  const morning = has(text, /아침|해돋|새벽/)
  const sunset = has(text, /노을|해질|저녁/)
  const rain = has(text, /비|빗물|장마|폭풍/)
  const snow = has(text, /눈|겨울|눈송이/)
  const wind = has(text, /바람|흩날|날리|태풍/)

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
  const crown = has(text, /왕관|왕|여왕|공주|왕자/)
  const magic = has(text, /마법|요정|주문|지팡이|마법진/)
  const fire = has(text, /불|화재|불꽃|모닥불|용암/)
  const rainbow = has(text, /무지개/)
  const cloud = has(text, /구름|흐린/)
  const vehicle = has(text, /자동차|버스|기차|자전거|비행기|택시/)
  const clock = has(text, /시계|시간|약속/)
  const balloon = has(text, /풍선/)
  const music = has(text, /음악|노래|피아노|기타|연주/)
  const camera = has(text, /사진|카메라/)
  const gift = has(text, /선물|리본/)
  const weapon = has(text, /칼|검|방패|활|화살/)
  const monster = has(text, /괴물|용|마녀|유령|외계인/)
  const pet = has(text, /고양이|강아지|토끼|여우|늑대|곰|사자|호랑이|새|물고기|동물/)

  const animalIcon = has(text, /고양이/) ? '🐱' : has(text, /강아지|개/) ? '🐶' : has(text, /토끼/) ? '🐰' : has(text, /여우/) ? '🦊' : has(text, /새/) ? '🕊️' : has(text, /물고기/) ? '🐠' : '🐾'
  const empty = !sentence.trim()

  return (
    <>
      <div className={`scene-atmosphere ${night ? 'is-night' : ''} ${morning ? 'is-morning' : ''} ${sunset ? 'is-sunset' : ''} ${rain ? 'is-rainy' : ''} ${snow ? 'is-snowy' : ''} ${cloud ? 'is-cloudy' : ''}`} />

      {/* 배경 구성 */}
      <div className="scene-bg">
        {kind === 'farm' && <FarmScene text={text} />}
        {kind === 'forest' && <><i className="story-tree left">🌲</i><i className="story-tree right">🌳</i><i className="story-path" /></>}
        {kind === 'garden' && <><i className="story-tree left">🌳</i><span className="story-flowerbed">🌸🌻🌹</span></>}
        {kind === 'sea' && <><i className="story-island">🏝️</i><div className="story-waves">🌊🌊</div>{boat && <span className="story-boat">⛵</span>}</>}
        {kind === 'school' && <><i className="story-school">🏫</i><i className="story-ground" /></>}
        {kind === 'home' && <><i className="story-home">🏠</i><span className="story-window">🪟</span></>}
        {kind === 'city' && <><div className="story-city">🏢🏣🏢</div><i className="story-crosswalk" /></>}
        {kind === 'castle' && <i className="story-castle">🏰</i>}
        {kind === 'space' && <><i className="story-planet">🪐</i><span className="story-rocket">🚀</span></>}
        {kind === 'cave' && <><i className="story-cave">🕳️</i><span className="story-crystals">💎✨</span></>}
        {kind === 'hospital' && <><i className="story-hospital">🏥</i></>}
        {kind === 'market' && <><i className="story-shop">🏪</i><span className="story-awning">🎪</span></>}
        {kind === 'winter' && <><span className="story-snowman">☃️</span><i className="story-pine">🌲</i></>}
        {kind === 'book' && <><i className="story-shelf">📚</i><i className="story-table">🛋️</i></>}

        {mountain && <span className="story-mountain">⛰️</span>}
        {night && <><span className="story-moon">🌙</span><span className="story-stars">✨⭐</span></>}
        {morning && <span className="story-sun">🌅</span>}
        {rain && <div className="story-rain">🌧️</div>}
        {snow && <div className="story-snow">❄️</div>}
        {wind && <div className="story-wind">🍃</div>}
        {rainbow && <span className="story-rainbow">🌈</span>}
      </div>

      {/* 캐릭터 및 오브젝트 레이어 */}
      <div className="scene-objects">
        {flower && kind !== 'garden' && <span className="story-flowers">💐</span>}
        {character !== 'none' && kind !== 'farm' && <Person character={character} action={action} mood={mood} side={character === 'pair' ? 'left' : 'center'} />}
        {character === 'pair' && kind !== 'farm' && <Person character="boy" action={action} mood={mood} side="right" />}

        {book && <span className="story-item book">📖</span>}
        {letter && <span className="story-item letter">✉️</span>}
        {key && <span className="story-item key">🔑</span>}
        {treasure && <span className="story-item treasure">💎</span>}
        {pet && kind !== 'farm' && <span className="story-item animal">{animalIcon}</span>}
        {umbrella && <span className="story-item umbrella">☂️</span>}
        {lamp && <span className="story-item lamp">💡</span>}
        {food && <span className="story-item food">🍎</span>}
        {phone && <span className="story-item phone">📱</span>}
        {crown && <span className="story-item crown">👑</span>}
        {magic && <span className="story-item magic">🪄✨</span>}
        {fire && <span className="story-item fire">🔥</span>}
        {vehicle && <span className="story-item vehicle">🚗</span>}
        {clock && <span className="story-item clock">⏰</span>}
        {balloon && <span className="story-item balloon">🎈</span>}
        {music && <span className="story-item music">🎵</span>}
        {camera && <span className="story-item camera">📷</span>}
        {gift && <span className="story-item gift">🎁</span>}
        {weapon && <span className="story-item weapon">⚔️</span>}
        {monster && <span className="story-item monster">👾</span>}
      </div>

      {empty && (
        <div className="scene-empty">
          <span className="scene-empty-icon">🎨</span>
          <span className="scene-empty-text">이야기 문장을 적으면 그림이 완성돼요</span>
        </div>
      )}
    </>
  )
}

export default function ComicPanel({ panel, subtitle, active, compact, onClick }: Props) {
  const kind = sceneKind(panel.sentence)
  return (
    <button type="button" className={`comic-panel ${compact ? 'compact' : ''} ${active ? 'is-active' : ''}`} onClick={onClick} aria-label={`${panel.stage} 단계 입력란으로 이동`}>
      <span className="panel-label">
        <strong>{panel.stage}</strong> · {subtitle}
      </span>
      <div className={`scene scene-${kind}`}>
        <SceneDetails sentence={panel.sentence} kind={kind} />
      </div>
      <div className="speech-bubble">{panel.sentence || '이야기 문장을 적어 주세요.'}</div>
    </button>
  )
}
