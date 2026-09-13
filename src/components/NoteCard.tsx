import { Note, STAGES } from '../types'
import ComicPanel from './ComicPanel'
type Props = { note: Note; onOpen: () => void; onDelete: () => void }
export default function NoteCard({ note, onOpen, onDelete }: Props) {
  return (
    <article className="note-card">
      <button type="button" className="note-card-main" onClick={onOpen}>
        <div className="note-card-head">
          <span className="paper-pin">✦</span>
          <div><h2>{note.title || '제목 없는 독서록'}</h2><p>{note.author || '작가 미입력'} · 읽은 날 {note.read_date ? new Date(`${note.read_date}T00:00:00`).toLocaleDateString('ko-KR') : new Date(note.created_at).toLocaleDateString('ko-KR')}</p></div>
          <span className="open-mark">열기 →</span>
        </div>
        <div className="mini-comic" aria-label="네컷 미리보기">
          {note.panels.map((panel, index) => <ComicPanel key={panel.stage} panel={panel} subtitle={STAGES[index].subtitle} compact />)}
        </div>
      </button>
      <button type="button" className="delete-button" onClick={onDelete}>기록 지우기</button>
    </article>
  )
}
