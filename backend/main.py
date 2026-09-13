import json
import os
import sqlite3
from datetime import datetime, timezone
from typing import Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.post("/api/save")
def save_report(data: BookReportSchema):
    return {"message": "success"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "data", "app.db")

STAGES = ["기", "승", "전", "결"]
def get_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn
def init_db():
    with get_db() as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS reading_notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL DEFAULT '',
            author TEXT NOT NULL DEFAULT '',
            panels_json TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )''')
        conn.execute("ALTER TABLE reading_notes ADD COLUMN read_date TEXT NOT NULL DEFAULT ''") if "read_date" not in {row[1] for row in conn.execute("PRAGMA table_info(reading_notes)").fetchall()} else None
        note_count = conn.execute("SELECT COUNT(*) FROM reading_notes").fetchone()[0]
        if note_count == 0:
            timestamp = now_iso()
            starter_panels = [
                {"stage": "기", "sentence": "작은 마을의 소녀가 낡은 책 한 권을 발견해요.", "scene": "햇살이 비치는 도서관 창가에서 책을 발견한 소녀", "illustration": "book"},
                {"stage": "승", "sentence": "책 속 지도를 따라 신비로운 숲으로 향해요.", "scene": "나무가 우거진 숲길을 걷는 소녀", "illustration": "forest"},
                {"stage": "전", "sentence": "깊은 밤, 길을 잃었지만 별빛이 방향을 알려 줘요.", "scene": "별과 달이 떠 있는 밤의 숲", "illustration": "night"},
                {"stage": "결", "sentence": "소녀는 용기를 얻어 집으로 돌아와 이야기를 나눠요.", "scene": "따뜻한 집 창가에서 책을 읽는 소녀", "illustration": "home"},
            ]
            conn.execute(
                "INSERT INTO reading_notes (title, author, read_date, panels_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
                ("별빛을 따라간 소녀", "네컷 독서록", timestamp[:10], json.dumps(starter_panels, ensure_ascii=False), timestamp, timestamp),
            )
def now_iso():
    return datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")
def default_panels():
    return [
        {"stage": stage, "sentence": "", "scene": "", "illustration": "book"}
        for stage in STAGES
    ]
def normalize_panels(panels):
    lookup = {item.get("stage"): item for item in (panels or []) if isinstance(item, dict)}
    result = []
    for stage in STAGES:
        panel = lookup.get(stage, {})
        result.append({
            "stage": stage,
            "sentence": str(panel.get("sentence", ""))[:500],
            "scene": str(panel.get("scene", ""))[:500],
            "illustration": str(panel.get("illustration", "book"))[:40] or "book",
        })
    return result
class PanelInput(BaseModel):
    stage: str
    sentence: str = Field(default="", max_length=500)
    scene: str = Field(default="", max_length=500)
    illustration: str = Field(default="book", max_length=40)
class NoteInput(BaseModel):
    title: str = Field(default="", max_length=160)
    author: str = Field(default="", max_length=120)
    read_date: str = Field(default="", max_length=10)
    panels: list[PanelInput] = Field(default_factory=list)
app = FastAPI()
init_db()
@app.get("/api/health")
def health():
    return {"ok": True}
@app.get("/api/notes")
def list_notes():
    with get_db() as conn:
        rows = conn.execute("SELECT * FROM reading_notes ORDER BY updated_at DESC, id DESC").fetchall()
    return [
        {
            "id": row["id"], "title": row["title"], "author": row["author"], "read_date": row["read_date"],
            "panels": json.loads(row["panels_json"]), "created_at": row["created_at"], "updated_at": row["updated_at"],
        }
        for row in rows
    ]
@app.get("/api/notes/{note_id}")
def get_note(note_id: int):
    with get_db() as conn:
        row = conn.execute("SELECT * FROM reading_notes WHERE id = ?", (note_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="기록을 찾을 수 없어요.")
    return {
        "id": row["id"], "title": row["title"], "author": row["author"], "read_date": row["read_date"],
        "panels": json.loads(row["panels_json"]), "created_at": row["created_at"], "updated_at": row["updated_at"],
    }
@app.post("/api/notes")
def create_note(note: NoteInput):
    timestamp = now_iso()
    panels = normalize_panels([panel.model_dump() for panel in note.panels])
    with get_db() as conn:
        cursor = conn.execute(
            "INSERT INTO reading_notes (title, author, read_date, panels_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
            (note.title.strip(), note.author.strip(), note.read_date.strip(), json.dumps(panels, ensure_ascii=False), timestamp, timestamp),
        )
        note_id = cursor.lastrowid
    return {"id": note_id, "title": note.title.strip(), "author": note.author.strip(), "read_date": note.read_date.strip(), "panels": panels, "created_at": timestamp, "updated_at": timestamp}
@app.put("/api/notes/{note_id}")
def update_note(note_id: int, note: NoteInput):
    timestamp = now_iso()
    panels = normalize_panels([panel.model_dump() for panel in note.panels])
    with get_db() as conn:
        cursor = conn.execute(
            "UPDATE reading_notes SET title = ?, author = ?, read_date = ?, panels_json = ?, updated_at = ? WHERE id = ?",
            (note.title.strip(), note.author.strip(), note.read_date.strip(), json.dumps(panels, ensure_ascii=False), timestamp, note_id),
        )
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="기록을 찾을 수 없어요.")
    return {"id": note_id, "title": note.title.strip(), "author": note.author.strip(), "read_date": note.read_date.strip(), "panels": panels, "updated_at": timestamp}
@app.delete("/api/notes/{note_id}")
def delete_note(note_id: int):
    with get_db() as conn:
        cursor = conn.execute("DELETE FROM reading_notes WHERE id = ?", (note_id,))
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="기록을 찾을 수 없어요.")
    return {"ok": True}
