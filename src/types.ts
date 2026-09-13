export type Stage = '기' | '승' | '전' | '결'
export type Panel = {
  stage: Stage
  sentence: string
  scene: string
  illustration: string
}
export type Note = {
  id: number
  title: string
  author: string
  read_date: string
  created_at: string
  updated_at: string
}
export const STAGES: { stage: Stage; subtitle: string; prompt: string }[] = [
  { stage: '기', subtitle: '이야기의 시작', prompt: '누가, 어디에서, 어떤 일을 시작하나요?' },
  { stage: '승', subtitle: '점점 커지는 흐름', prompt: '어떤 일이 이어지고 있나요?' },
  { stage: '전', subtitle: '가장 큰 변화', prompt: '갈등이나 전환점은 무엇인가요?' },
  { stage: '결', subtitle: '마무리와 여운', prompt: '이야기는 어떻게 끝나나요?' },
]
export const emptyPanels = (): Panel[] => STAGES.map(({ stage }) => ({
  stage, sentence: '', scene: '', illustration: 'book',
}))
export const emptyNote = (): Omit<Note, 'id' | 'created_at' | 'updated_at'> => ({
  title: '', author: '', read_date: '', panels: emptyPanels(),
})
export const formatDate = (iso: string) => {
  if (!iso) return '오늘'
  try {
    return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(iso))
  } catch { return iso }
}
