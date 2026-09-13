const STORAGE_KEY = 'reading_notes'

const getStoredNotes = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

const setStoredNotes = (notes: any[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export async function api(endpoint: string, options: RequestInit = {}) {
  const method = options.method || 'GET'
  const notes = getStoredNotes()

  // 목록 조회 (GET /notes)
  if (endpoint === 'notes' && method === 'GET') {
    return new Response(JSON.stringify(notes), { status: 200 })
  }

  // 등록 (POST /notes)
  if (endpoint === 'notes' && method === 'POST') {
    const body = JSON.parse(options.body as string)
    const now = new Date().toISOString()
    const newNote = {
      ...body,
      id: Date.now(),
      created_at: now,
      updated_at: now,
    }
    notes.unshift(newNote)
    setStoredNotes(notes)
    return new Response(JSON.stringify(newNote), { status: 201 })
  }

  // 수정 (PUT /notes/:id)
  if (endpoint.startsWith('notes/') && method === 'PUT') {
    const id = Number(endpoint.split('/')[1])
    const body = JSON.parse(options.body as string)
    const now = new Date().toISOString()
    const index = notes.findIndex((n: any) => n.id === id)

    if (index !== -1) {
      notes[index] = { ...notes[index], ...body, updated_at: now }
      setStoredNotes(notes)
      return new Response(JSON.stringify(notes[index]), { status: 200 })
    }
  }

  // 삭제 (DELETE /notes/:id)
  if (endpoint.startsWith('notes/') && method === 'DELETE') {
    const id = Number(endpoint.split('/')[1])
    const filtered = notes.filter((n: any) => n.id !== id)
    setStoredNotes(filtered)
    return new Response(null, { status: 200 })
  }

  return new Response(null, { status: 404 })
}
