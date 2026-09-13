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

function Person({ character, action, mood, side = 'center' }: { character: Character; action: Action; mood: Mood; side?: 'left' | 'center' | 'right' }) {
  return <i className={`story-person character-${character} action-${action} mood-${mood} side-${side}`} aria-hidden="true"><b className="person-face" /><b className="person-hair" /><b className="person-torso" /><b className="person-arm left-arm" /><b className="person-arm right-arm" /><b className="person-leg left-leg" /><b className="person-leg right-leg" /></i>
}

function FarmScene({ text }: { text: string }) {
  const ruler = has(text, /주인|인간.*얼굴|탐욕|부려먹/)
  const oppress = has(text, /억압|희생|팔려|괴롭|강요|힘들/)
  const celebrate = has(text, /기뻐|축하|몰아내|자유|환호/)
  const moment = ruler ? 'ruler' : oppress ? 'oppress' : celebrate ? 'celebrate' : 'calm'
  return <div className={`farm-scene farm-${moment}`}><i className="farm-barn" /><i className="farm-fence">╱╱╱╱</i><i className="farm-hill" />{moment === 'calm' && <><i className="farm-cow">♟</i><i className="farm-sheep">●</i><i className="farm-hen">⌁</i></>}{moment === 'celebrate' && <><i className="farm-crowd">♟ ♟ ♟</i><i className="farm-flag">⚑</i><i className="farm-sparkles">✦ ✧</i></>}{moment === 'oppress' && <><i className="farm-horse">♞</i><i className="farm-cart" /><i className="farm-shadow" /></>}{moment === 'ruler' && <><i className="farm-pig">●</i><i className="farm-pig-face">▰</i><i className="farm-cane">╱</i><i className="farm-workers">♟ ♟</i></>}</div>
}


function detailedElements(text: string) {
  const has = (words: RegExp) => words.test(text.toLowerCase());

  return {
    // 날씨/시간 상세
    isNight: has(/밤|별|달|어둠|새벽/),
    isMorning: has(/아침|해돋이|새벽/),
    isSunset: has(/노을|해질녘|저녁/),
    isRainy: has(/비|빗물|소나기|폭풍/),
    isSnowy: has(/눈|겨울|눈송이/),
    isWindy: has(/바람|흩날리|태풍/),
    isCloudy: has(/구름|흐린/),

    // 사물 상세
    hasBook: has(/책|독서|서재/),
    hasLetter: has(/편지|지도|쪽지|메모/),
    hasKey: has(/열쇠|자물쇠/),
    hasTreasure: has(/보물|상자|금화/),
    hasFlower: has(/꽃|봄|꽃밭|장미/),
    hasMountain: has(/산|언덕|절벽/),
    hasLamp: has(/등불|램프|촛불/),
    hasUmbrella: has(/우산/),
    hasBoat: has(/배|항해|카누/),
    hasFood: has(/빵|케이크|음식|식사/),
    hasPhone: has(/전화|휴대폰|메시지/),
    hasCrown: has(/왕관|왕|여왕/),
    hasMagic: has(/마법|지팡이|요정/),
    hasFire: has(/불|모닥불|용암/),
    hasRainbow: has(/무지개/),
    hasClock: has(/시계|시간/),
    hasMusic: has(/음악|노래|악기/),
    hasCamera: has(/사진|카메라/),
    hasGift: has(/선물|리본/),
    hasWeapon: has(/칼|검|방패|활/),
    hasMonster: has(/괴물|용|드래곤/),

    // 동물 상세
    hasCat: has(/고양이/),
    hasDog: has(/강아지|개/),
    hasRabbit: has(/토끼/),
    hasFox: has(/여우/),
    hasBird: has(/새/),
    hasFish: has(/물고기/),
  };
}

function SceneDetails({ sentence, kind }: { sentence: string; kind: SceneKind }) {
const details = detailedElements(sentence);

  return (
    <>
      {/* 배경/날씨 (상세화) */}
      <div className={`scene-atmosphere 
        ${details.isNight ? 'is-night' : ''} 
        ${details.isMorning ? 'is-morning' : ''} 
        ${details.isSunset ? 'is-sunset' : ''} 
        ${details.isRainy ? 'is-rainy' : ''} 
        ${details.isSnowy ? 'is-snowy' : ''} 
        ${details.isCloudy ? 'is-cloudy' : ''}`} 
      />
      
      {/* 장소 배경 (기본 제공 코드) */}
      {kind === 'farm' && <FarmScene text={text} />}
      {kind === 'forest' && <><i className="story-tree tree-back-left" /><i className="story-tree tree-back-right" /><i className="story-path" /></>}
      {kind === 'garden' && <><i className="story-tree tree-back-left" /><i className="story-flowerbed">✿ ✿ ✿</i><i className="story-path" /></>}
      {kind === 'sea' && <><i className="story-island" /><i className="story-waves">〰 〰 〰</i>{details.hasBoat && <i className="story-boat" />}</>}
      {kind === 'school' && <><i className="story-school"><b>BOOK</b></i><i className="story-ground" /></>}
      {kind === 'home' && <><i className="story-home" /><i className="story-window">✦</i></>}
      {kind === 'city' && <><i className="story-city"><b /><b /><b /></i><i className="story-crosswalk">═ ═ ═</i></>}
      {kind === 'castle' && <i className="story-castle">♜</i>}
      {kind === 'space' && <><i className="story-planet" /><i className="story-rocket">➤</i></>}
      {kind === 'cave' && <><i className="story-cave" /><i className="story-crystals">◆ ◆</i></>}
      {kind === 'hospital' && <><i className="story-hospital">✚</i><i className="story-ground" /></>}
      {kind === 'market' && <><i className="story-shop"><b>SHOP</b></i><i className="story-awning">▰▰▰</i></>}
      {kind === 'winter' && <><i className="story-snowman">☃</i><i className="story-pine">♠</i></>}
      {kind === 'book' && <><i className="story-shelf"><b /><b /><b /></i><i className="story-table" /></>}

      {/* 날씨/자연물 상세 */}
      {details.hasMountain && <i className="story-mountain" />}
      {details.isNight && <><i className="story-moon" /><i className="story-stars">✦ · ✧</i></>}
      {details.isMorning && <i className="story-sun">☀</i>}
      {details.isRainy && <i className="story-rain">╲ ╲ ╲</i>}
      {details.isSnowy && <i className="story-snow">✦ · ✦</i>}
      {details.isWindy && <i className="story-wind">⌁ ⌁</i>}
      {details.hasRainbow && <i className="story-rainbow">⌒</i>}
      {details.hasFlower && kind !== 'garden' && <i className="story-flowers">✿ ✿</i>}

      {/* 인물 (상세화) */}
      {character !== 'none' && kind !== 'farm' && (
        <Person character={character} action={action} mood={mood} side={character === 'pair' ? 'left' : 'center'} />
      )}
      {character === 'pair' && kind !== 'farm' && (
        <Person character="boy" action={action} mood={mood} side="right" />
      )}

      {/* 사물/소품 상세 */}
      {details.hasBook && <i className="story-book"><b>책</b></i>}
      {details.hasLetter && <i className="story-letter">✉</i>}
      {details.hasKey && <i className="story-key">⚿</i>}
      {details.hasTreasure && <i className="story-treasure">▣</i>}
      
      {/* 동물 상세 */}
      {(details.hasCat || details.hasDog || details.hasRabbit || details.hasFox || details.hasBird || details.hasFish) && kind !== 'farm' && (
        <i className="story-animal">
          {details.hasCat ? '⌁' : 
           details.hasDog ? '♧' : 
           details.hasRabbit ? '♙' : 
           details.hasFox ? '♜' : 
           details.hasBird ? '⌇' : 
           details.hasFish ? '〰' : '♟'}
        </i>
      )}

      {/* 기타 소품 상세 */}
      {details.hasUmbrella && <i className="story-umbrella">☂</i>}
      {details.hasLamp && <i className="story-lamp">✦</i>}
      {details.hasFood && <i className="story-food">●</i>}
      {details.hasPhone && <i className="story-phone">▯</i>}
      {details.hasCrown && <i className="story-crown">♕</i>}
      {details.hasMagic && <i className="story-magic">✧</i>}
      {details.hasFire && <i className="story-fire">♨</i>}
      {details.hasClock && <i className="story-clock">◷</i>}
      {details.hasMusic && <i className="story-music">♫</i>}
      {details.hasCamera && <i className="story-camera">▣</i>}
      {details.hasGift && <i className="story-gift">▣</i>}
      {details.hasWeapon && <i className="story-weapon">⚔</i>}
      {details.hasMonster && <i className="story-monster">♛</i>}

      {/* 빈 칸 안내 (기본 제공 코드) */}
      {empty && (
        <>
          <i className="scene-empty-book">▤</i>
          <span className="scene-empty-text">이야기 문장을 적으면 그림이 채워져요</span>
        </>
      )}
      <i className="story-foreground" />
    </>
  );
}

export default function ComicPanel({ panel, subtitle, active, compact, onClick }: Props) {
  const kind = sceneKind(panel.sentence)
  const isClimax = panel.stage === '전' // '전' 단계일 때 극적 연출 적용

return (
  <>
    <strong>{panel.stage}</strong> · {subtitle}
  </>
);
