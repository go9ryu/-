import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { api } from './lib/api'
import ComicPanel from './components/ComicPanel'
import NoteCard from './components/NoteCard'
import { emptyNote, formatDate, Note, Panel, STAGES } from './types'
type View = 'list' | 'editor'
type Draft = ReturnType<typeof emptyNote> & { id?: number; created_at?: string; updated_at?: string }
const toDraft = (note?: Note): Draft => note ? ({ id: note.id, title: note.title, author: note.author, read_date: note.read_date, panels: note.panels, created_at: note.created_at, updated_at: note.updated_at }) : emptyNote()
export default function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [view, setView] = useState<View>('list')
  const [draft, setDraft] = useState<Draft>(emptyNote())
  const [activeStage, setActiveStage] = useState('기')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedText, setSavedText] = useState('')
  const [error, setError] = useState('')
  const fieldRefs = useRef<Record<string, HTMLElement | null>>({})
  const loadNotes = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const response = await api('notes')
      if (!response.ok) throw new Error()
      setNotes(await response.json())
    } catch { setError('기록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { loadNotes() }, [loadNotes])
  const illustrationFromScene = (scene: string) => {
    if (/밤|별|달|어둠/.test(scene)) return 'night'
    if (/숲|나무|풀|자연/.test(scene)) return 'forest'
    if (/바다|물|파도|강/.test(scene)) return 'sea'
    if (/학교|교실|도서관/.test(scene)) return 'school'
    if (/집|방|창문/.test(scene)) return 'home'
    return 'book'
  }
  const setPanel = (stage: string, key: keyof Panel, value: string) => {
    setDraft(current => ({ ...current, panels: current.panels.map(panel => panel.stage === stage ? {
      ...panel,
      [key]: value,
      ...(key === 'sentence' ? { illustration: illustrationFromScene(value) } : {}),
    } : panel) }))
    setSavedText('')
  }
  const openEditor = (note?: Note) => { setDraft(toDraft(note)); setSavedText(''); setError(''); setActiveStage('기'); setView('editor') }
  const focusStage = (stage: string) => { setActiveStage(stage); fieldRefs.current[stage]?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
  const saveNote = async () => {
    if (!draft.title.trim()) { setError('책 제목을 먼저 적어 주세요.'); return }
    if (!draft.author.trim()) { setError('작가 이름을 적어 주세요.'); return }
    setSaving(true); setError(''); setSavedText('')
    try {
      const method = draft.id ? 'PUT' : 'POST'
      const response = await api(draft.id ? `notes/${draft.id}` : 'notes', {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: draft.title, author: draft.author, read_date: draft.read_date, panels: draft.panels }),
      })
      if (!response.ok) throw new Error()
      const saved = await response.json()
      setDraft(current => ({ ...current, ...saved, created_at: current.created_at || saved.created_at }))
      setSavedText('✓ 저장되었어요')
      await loadNotes()
    } catch { setError('저장하지 못했어요. 다시 한 번 눌러 주세요.') }
    finally { setSaving(false) }
  }
  const deleteNote = async (note: Note) => {
    if (!window.confirm(`「${note.title || '제목 없는 독서록'}」을 지울까요?`)) return
    try {
      const response = await api(`notes/${note.id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error()
      await loadNotes()
    } catch { setError('기록을 지우지 못했어요. 다시 시도해 주세요.') }
  }
  const panelMap = useMemo(() => Object.fromEntries(draft.panels.map(panel => [panel.stage, panel])), [draft.panels])
  if (view === 'list') return (
    <div className="app-shell list-page">
      <header className="topbar"><div className="brand"><span className="brand-mark">▤</span><div><strong>네컷 독서록</strong><small>읽은 이야기를 네 장면으로</small></div></div><div className="editor-actions"><button className="primary-button" onClick={() => openEditor()}>+ 새 독서록 만들기</button></div></header>
      <main className="list-main">
        <section className="list-intro"><p className="eyebrow">MY READING MOMENTS</p><h1>이야기를 <em>네 장면</em>으로<br />차곡차곡 남겨요.</h1><p>기·승·전·결의 흐름을 따라 쓰면, 나만의 작은 독서 만화가 완성돼요.</p></section>
        {error && <p className="notice error">{error}</p>}
        {loading ? <div className="state-card">독서록을 꺼내 보고 있어요…</div> : notes.length === 0 ? <section className="empty-state"><span>▤</span><h2>아직 만든 독서록이 없어요</h2><p>처음 읽은 이야기를 네 컷으로 기록해 볼까요?</p><button className="primary-button" onClick={() => openEditor()}>첫 독서록 만들기</button></section> : <section className="notes-grid">{notes.map(note => <NoteCard key={note.id} note={note} onOpen={() => openEditor(note)} onDelete={() => deleteNote(note)} />)}</section>}
      </main>
    </div>
  )
  return <div className="app-shell editor-page">
    <header className="topbar"><div className="brand"><span className="brand-mark">▤</span><div><strong>네컷 독서록</strong><small>읽은 이야기를 네 장면으로</small></div></div><div className="editor-actions"><span className={`save-status ${savedText ? 'done' : ''}`}>{saving ? '저장하는 중…' : savedText || (draft.updated_at ? `마지막 저장 ${formatDate(draft.updated_at)}` : '아직 저장 전')}</span><button className="text-button" onClick={() => window.print()}>▣ 네 컷만 출력</button><button className="text-button" onClick={() => setView('list')}>← 목록으로</button><button className="primary-button" onClick={saveNote} disabled={saving}>{saving ? '저장 중' : '저장하기'}</button></div></header>
    <main className="editor-main">
      <section className="editor-intro"><div><p className="eyebrow">FOUR SCENES, ONE STORY</p><h1>한 권의 이야기를<br /><em>네 컷</em>에 담아 보세요.</h1></div><p>왼쪽에 적는 순간, 오른쪽 만화가 바로 바뀌어요.<br />마음에 드는 장면을 눌러 다시 다듬어도 좋아요.</p></section>
      {error && <p className="notice error">{error}</p>}
      <div className="workspace">
        <section className="notebook" aria-label="독서록 입력 영역">
          <div className="book-fields"><label>책 제목<input value={draft.title} onChange={e => { setDraft({ ...draft, title: e.target.value }); setSavedText('') }} placeholder="읽은 책의 제목" /></label><label>작가<input value={draft.author} onChange={e => { setDraft({ ...draft, author: e.target.value }); setSavedText('') }} placeholder="글쓴이 이름" /></label></div>
          <label className="read-date-field">📅 이 책을 읽은 날짜<input type="date" value={draft.read_date || ''} onChange={e => { setDraft({ ...draft, read_date: e.target.value }); setSavedText('') }} aria-label="읽은 날짜" /></label>
          <div className="stage-list">{STAGES.map(({ stage, subtitle, prompt }, index) => { const panel = panelMap[stage]; return <article className={`stage-form ${activeStage === stage ? 'is-active' : ''}`} key={stage} ref={el => { fieldRefs.current[stage] = el }}><div className="stage-number">0{index + 1}</div><div className="stage-copy"><h2>{stage} <span>{subtitle}</span></h2><p>{prompt} 장소·인물·행동을 함께 적으면 그림이 더 자세해져요.</p></div><div className="form-grid"><label>이야기 문장<textarea value={panel?.sentence || ''} onFocus={() => setActiveStage(stage)} onChange={e => setPanel(stage, 'sentence', e.target.value)} placeholder={`${stage} 단계의 이야기를 장소·인물·행동과 함께 한두 문장으로 적어 보세요.`} /></label></div></article> })}</div>
        </section>
        <aside className="comic-preview"><div className="preview-heading"><div><p className="eyebrow">LIVE COMIC</p><h2>{draft.title || '나의 네컷 독서록'}</h2><p>{draft.author || '작가 이름을 적어 주세요'}</p></div><span>눌러서 수정하기 ↙</span></div><div className="comic-grid">{STAGES.map(({ stage, subtitle }) => <ComicPanel key={stage} panel={panelMap[stage]} subtitle={subtitle} active={activeStage === stage} onClick={() => focusStage(stage)} />)}</div></aside>
      </div>
    </main>
  </div>
}
