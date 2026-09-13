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

/* 세밀한 SVG 일러스트 캐릭터 */
function Person({ character, action, mood, side = 'center' }: { character: Character; action: Action; mood: Mood; side?: 'left' | 'center' | 'right' }) {
  const isGirl = character === 'girl' || character === 'pair'
  const shirtColor = isGirl ? '#ff7675' : '#0984e3'
  const hairColor = character === 'adult' ? '#636e72' : '#2d3436'

  return (
    <div className={`story-person-wrapper side-${side} action-${action}`}>
      <svg className="person-svg" viewBox="0 0 100 120" width="70" height="90">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.2" />
          </filter>
        </defs>
        
        {/* 그림자 */}
        <ellipse cx="50" cy="112" rx="22" ry="5" fill="rgba(0,0,0,0.15)" />

        <g filter="url(#shadow)">
          {/* 머리카락 (뒷머리) */}
          {isGirl && <path d="M28 35 C20 55 25 75 32 80 C36 60 38 45 35 35 Z M72 35 C80 55 75 75 68 80 C64 60 62 45 65 35 Z" fill={hairColor} />}
          
          {/* 몸통/옷 */}
          <path d="M34 55 L66 55 L62 90 L38 90 Z" fill={shirtColor} rx="3" />
          
          {/* 다리 */}
          <rect x="40" y="88" width="7" height="22" rx="3" fill="#2d3436" />
          <rect x="53" y="88" width="7" height="22" rx="3" fill="#2d3436" />
          <ellipse cx="43" cy="110" rx="6" ry="3" fill="#d63031" />
          <ellipse cx="56" cy="110" rx="6" ry="3" fill="#d63031" />

          {/* 팔 */}
          <rect x="25" y="56" width="8" height="24" rx="4" fill="#ffeaa7" transform={action === 'run' ? 'rotate(30 29 56)' : 'rotate(-10 29 56)'} />
          <rect x="67" y="56" width="8" height="24" rx="4" fill="#ffeaa7" transform={action === 'run' ? 'rotate(-30 71 56)' : 'rotate(10 71 56)'} />

          {/* 머리 */}
          <circle cx="50" cy="36" r="18" fill="#ffeaa7" />
          
          {/* 윗머리 */}
          <path d="M32 32 C32 18 68 18 68 32 C60 22 40 22 32 32 Z" fill={hairColor} />

          {/* 눈 */}
          <circle cx="44" cy="36" r="2.2" fill="#2d3436" />
          <circle cx="56" cy="36" r="2.2" fill="#2d3436" />
          <circle cx="45" cy="35" r="0.7" fill="#ffffff" />
          <circle cx="57" cy="35" r="0.7" fill="#ffffff" />

          {/* 볼터치 */}
          <ellipse cx="41" cy="40" rx="3" ry="1.5" fill="#ff7675" opacity="0.6" />
          <ellipse cx="59" cy="40" rx="3" ry="1.5" fill="#ff7675" opacity="0.6" />

          {/* 입 (기분에 따른 변화) */}
          {mood === 'happy' && <path d="M44 42 Q50 48 56 42" stroke="#2d3436" strokeWidth="2" fill="none" strokeLinecap="round" />}
          {mood === 'sad' && <path d="M44 46 Q50 41 56 46" stroke="#2d3436" strokeWidth="2" fill="none" strokeLinecap="round" />}
          {mood === 'angry' && <path d="M44 45 L56 43" stroke="#2d3436" strokeWidth="2" fill="none" strokeLinecap="round" />}
          {(mood === 'normal' || mood === 'surprised' || mood === 'brave') && <path d="M46 44 L54 44" stroke="#2d3436" strokeWidth="2" fill="none" strokeLinecap="round" />}
        </g>
      </svg>
    </div>
  )
}

/* 디테일한 농장 배경 SVG 아트 */
function FarmScene({ text }: { text: string }) {
  const ruler = has(text, /주인|인간.*얼굴|탐욕|부려먹/)
  const oppress = has(text, /억압|희생|팔려|괴롭|강요|힘들/)
  const celebrate = has(text, /기뻐|축하|몰아내|자유|환호/)
  const moment = ruler ? 'ruler' : oppress ? 'oppress' : celebrate ? 'celebrate' : 'calm'

  return (
    <div className={`farm-scene-art moment-${moment}`}>
      <svg className="farm-svg" viewBox="0 0 300 180" preserveAspectRatio="xMidYMid slice">
        {/* 언덕 배경 */}
        <path d="M0 110 Q80 80 180 100 T300 90 L300 180 L0 180 Z" fill="#55efc4" />
        <path d="M0 130 Q120 110 300 130 L300 180 L0 180 Z" fill="#00b894" />

        {/* 빨간 헛간 (Barn) */}
        <g transform="translate(20, 50)">
          <path d="M10 40 L40 15 L70 40 L70 90 L10 90 Z" fill="#d63031" stroke="#2d3436" strokeWidth="2" />
          <path d="M5 40 L40 10 L75 40" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <rect x="30" y="60" width="20" height="30" fill="#636e72" />
          <path d="M30 60 L50 90 M50 60 L30 90" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        {/* 울타리 */}
        <path d="M100 135 L280 135 M100 145 L280 145" stroke="#ffeaa7" strokeWidth="3" />
        <path d="M110 128 L110 152 M150 128 L150 152 M190 128 L190 152 M230 128 L230 152 M270 128 L270 152" stroke="#ffeaa7" strokeWidth="3.5" strokeLinecap="round" />

        {/* 상황별 동물 디테일 */}
        {moment === 'calm' && (
          <g transform="translate(130, 115)">
            {/* 젖소 */}
            <rect x="10" y="10" width="30" height="20" rx="5" fill="#ffffff" stroke="#2d3436" strokeWidth="1.5" />
            <circle cx="18" cy="18" r="4" fill="#2d3436" />
            <circle cx="32" cy="22" r="3" fill="#2d3436" />
            <circle cx="36" cy="12" r="7" fill="#ffffff" stroke="#2d3436" strokeWidth="1.5" />
          </g>
        )}
        {moment === 'ruler' && (
          <g transform="translate(180, 105)">
            {/* 독재자 돼지 */}
            <ellipse cx="25" cy="25" rx="18" ry="14" fill="#ff7675" stroke="#2d3436" strokeWidth="1.5" />
            <circle cx="38" cy="22" r="9" fill="#ff7675" stroke="#2d3436" strokeWidth="1.5" />
            <ellipse cx="42" cy="23" rx="3" ry="2" fill="#d63031" />
            {/* 왕관 */}
            <path d="M32 12 L36 4 L40 10 L44 4 L48 12 Z" fill="#fdcb6e" stroke="#2d3436" strokeWidth="1" />
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
  const empty = !sentence.trim()

  return (
    <div className="scene-viewport">
      {/* 1. 분위기 그래픽 하늘 */}
      <div className={`scene-sky ${night ? 'sky-night' : morning ? 'sky-morning' : sunset ? 'sky-sunset' : 'sky-day'}`}>
        {night && (
          <svg className="sky-elements" viewBox="0 0 200 100">
            <path d="M160 20 A12 12 0 1 0 175 35 A15 15 0 1 1 160 20 Z" fill="#f1c40f" />
            <circle cx="30" cy="25" r="1.5" fill="#ffffff" opacity="0.8" />
            <circle cx="80" cy="15" r="2" fill="#ffffff" opacity="0.9" />
            <circle cx="120" cy="35" r="1" fill="#ffffff" opacity="0.7" />
          </svg>
        )}
        {!night && (
          <svg className="sky-elements" viewBox="0 0 200 100">
            <circle cx="170" cy="25" r="14" fill="#f39c12" opacity="0.9" />
            <path d="M20 40 Q35 25 50 40 Q65 25 80 40 Z" fill="#ffffff" opacity="0.7" />
          </svg>
        )}
      </div>

      {/* 2. 장소별 벡터 배경 */}
      <div className="scene-background-art">
        {kind === 'farm' && <FarmScene text={text} />}
        {kind === 'forest' && (
          <svg className="forest-svg" viewBox="0 0 300 180">
            <path d="M0 120 Q150 100 300 120 L300 180 L0 180 Z" fill="#2ecc71" />
            {/* 나무들 */}
            <g transform="translate(30, 60)">
              <rect x="16" y="50" width="8" height="30" fill="#795548" />
              <polygon points="20,10 0,60 40,60" fill="#27ae60" />
            </g>
            <g transform="translate(220, 50)">
              <rect x="16" y="50" width="8" height="30" fill="#795548" />
              <polygon points="20,10 0,60 40,60" fill="#27ae60" />
            </g>
          </svg>
        )}
        {kind === 'castle' && (
          <svg className="castle-svg" viewBox="0 0 300 180">
            <path d="M0 130 L300 130 L300 180 L0 180 Z" fill="#95a5a6" />
            <g transform="translate(100, 40)" fill="#7f8c8d">
              <rect x="0" y="30" width="100" height="60" />
              <rect x="-10" y="10" width="30" height="80" />
              <rect x="80" y="10" width="30" height="80" />
              <polygon points="5,-10 -10,10 20,10" fill="#e74c3c" />
              <polygon points="95,-10 80,10 110,10" fill="#e74c3c" />
            </g>
          </svg>
        )}
        {kind !== 'farm' && kind !== 'forest' && kind !== 'castle' && (
          <svg className="default-ground-svg" viewBox="0 0 300 180">
            <path d="M0 135 Q150 120 300 135 L300 180 L0 180 Z" fill="#7bed9f" />
          </svg>
        )}
      </div>

      {/* 3. 날씨 효과 (비/눈) */}
      {rain && <div className="weather-rain-overlay" />}
      {snow && <div className="weather-snow-overlay" />}

      {/* 4. 캐릭터 및 오브젝트 레이어 */}
      <div className="scene-characters-layer">
        {character !== 'none' && kind !== 'farm' && (
          <Person character={character} action={action} mood={mood} side={character === 'pair' ? 'left' : 'center'} />
        )}
        {character === 'pair' && kind !== 'farm' && (
          <Person character="boy" action={action} mood={mood} side="right" />
        )}
      </div>

      {empty && (
        <div className="empty-scene-guide">
          <div className="pencil-icon">✏️</div>
          <p>이야기를 입력하면 만화 그림이 그려집니다</p>
        </div>
      )}
    </div>
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
