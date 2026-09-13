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

/* 벡터 타입 그래픽 캐릭터 컴포넌트 */
function DetailedPerson({ character, action, mood, side = 'center' }: { character: Character; action: Action; mood: Mood; side?: 'left' | 'center' | 'right' }) {
  return (
    <div className={`art-person char-${character} act-${action} mood-${mood} pos-${side}`}>
      <svg viewBox="0 0 100 120" className="person-svg">
        {/* 그림자 */}
        <ellipse cx="50" cy="115" rx="25" ry="5" fill="rgba(0,0,0,0.15)" />
        
        {/* 신체 구조 */}
        <g className="person-body-group">
          {/* 다리 */}
          <rect x="40" y="80" width="8" height="30" rx="4" fill="#333" className="leg left" />
          <rect x="52" y="80" width="8" height="30" rx="4" fill="#333" className="leg right" />
          
          {/* 상체/옷 */}
          <path d="M30,50 L70,50 L65,85 L35,85 Z" fill={character === 'girl' ? '#ff6b81' : '#4b7bec'} className="torso" />
          
          {/* 팔 */}
          <rect x="22" y="52" width="8" height="25" rx="4" fill="#ffd3b6" className="arm left" />
          <rect x="70" y="52" width="8" height="25" rx="4" fill="#ffd3b6" className="arm right" />
          
          {/* 머리 및 얼굴 */}
          <circle cx="50" cy="35" r="18" fill="#ffd3b6" />
          
          {/* 헤어 스타일 */}
          <path d="M32,32 C32,18 68,18 68,32 C68,24 32,24 32,32 Z" fill="#4a3000" />
          
          {/* 표정 디테일 */}
          <circle cx="44" cy="35" r="2" fill="#222" />
          <circle cx="56" cy="35" r="2" fill="#222" />
          <path d={mood === 'happy' ? "M44,42 Q50,47 56,42" : mood === 'sad' ? "M44,45 Q50,40 56,45" : "M44,43 L56,43"} stroke="#222" strokeWidth="2" fill="none" />
        </g>
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
  const rain = has(text, /비|빗물|장마|폭풍/)
  const snow = has(text, /눈|겨울|눈송이/)
  const empty = !sentence.trim()

  return (
    <div className={`art-scene-container ${night ? 'is-night' : 'is-day'} ${rain ? 'is-rain' : ''} ${snow ? 'is-snow' : ''}`}>
      {/* 1. 배경 하늘 & 원경 레이어 */}
      <div className="sky-bg">
        {night ? (
          <div className="moon" />
        ) : (
          <div className="sun" />
        )}
        <div className="clouds">
          <span className="cloud c1" />
          <span className="cloud c2" />
        </div>
      </div>

      {/* 2. 중경 배경 (지형 및 건물/나무) */}
      <div className="midground">
        {kind === 'farm' && (
          <div className="farm-art">
            <div className="barn-house" />
            <div className="fences" />
          </div>
        )}
        {kind === 'forest' && (
          <div className="forest-art">
            <div className="tree t1" />
            <div className="tree t2" />
            <div className="tree t3" />
          </div>
        )}
        {kind === 'city' && (
          <div className="city-art">
            <div className="building b1" />
            <div className="building b2" />
          </div>
        )}
        {kind === 'home' && (
          <div className="home-art">
            <div className="room-wall" />
            <div className="window-frame" />
          </div>
        )}
      </div>

      {/* 3. 근경 (땅/바닥) */}
      <div className="ground" />

      {/* 4. 캐릭터 및 정밀 사물 레이어 */}
      <div className="foreground-objects">
        {character !== 'none' && kind !== 'farm' && (
          <DetailedPerson character={character} action={action} mood={mood} side={character === 'pair' ? 'left' : 'center'} />
        )}
        {character === 'pair' && kind !== 'farm' && (
          <DetailedPerson character="boy" action={action} mood={mood} side="right" />
        )}
      </div>

      {empty && (
        <div className="empty-notice">
          <span>이야기를 적으면 만화 장면이 생성됩니다</span>
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
