from __future__ import annotations

import json
from pathlib import Path
from typing import Literal, Optional

import edge_tts
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.responses import JSONResponse, StreamingResponse

APP_DIR = Path(__file__).resolve().parent
DATA_FILE = APP_DIR / "data" / "dizang_sample.json"
CACHE_DIR = APP_DIR / "cache"
CACHE_DIR.mkdir(parents=True, exist_ok=True)

VoiceId = Literal["male", "female"]

VOICE_MAP: dict[VoiceId, str] = {
    "male": "zh-CN-YunxiNeural",
    "female": "zh-CN-XiaoxiaoNeural",
}

app = FastAPI(title="PrajnaReader TTS", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _load_book() -> dict:
    if not DATA_FILE.exists():
        raise RuntimeError(f"Missing data file: {DATA_FILE}")
    return json.loads(DATA_FILE.read_text(encoding="utf-8"))


def _find_chapter_text(chapter_id: str) -> Optional[str]:
    book = _load_book()
    for ch in book.get("chapters", []):
        if ch.get("id") == chapter_id:
            return ch.get("text")
    return None


def _cache_key(text: str, voice: VoiceId) -> str:
    import hashlib

    h = hashlib.sha256()
    h.update(voice.encode("utf-8"))
    h.update(b"\n")
    h.update(text.encode("utf-8"))
    return h.hexdigest()


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/voices")
def voices():
    return JSONResponse(
        {
            "male": VOICE_MAP["male"],
            "female": VOICE_MAP["female"],
        }
    )


@app.get("/chapter")
def chapter(chapter_id: str = Query(..., min_length=1)):
    text = _find_chapter_text(chapter_id)
    if text is None:
        raise HTTPException(status_code=404, detail="chapter not found")
    return {"chapterId": chapter_id, "text": text}


@app.get("/tts/stream")
async def tts_stream(
    text: str = Query(..., min_length=1),
    voice: VoiceId = Query("male"),
):
    voice_name = VOICE_MAP.get(voice)
    if not voice_name:
        raise HTTPException(status_code=400, detail="invalid voice")

    async def gen():
        communicate = edge_tts.Communicate(text=text, voice=voice_name)
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                yield chunk["data"]

    return StreamingResponse(gen(), media_type="audio/mpeg")


@app.get("/tts/chapter/stream")
async def tts_chapter_stream(
    chapter_id: str = Query(..., min_length=1),
    voice: VoiceId = Query("male"),
):
    text = _find_chapter_text(chapter_id)
    if text is None:
        raise HTTPException(status_code=404, detail="chapter not found")

    voice_name = VOICE_MAP.get(voice)
    if not voice_name:
        raise HTTPException(status_code=400, detail="invalid voice")

    async def gen():
        communicate = edge_tts.Communicate(text=text, voice=voice_name)
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                yield chunk["data"]

    return StreamingResponse(gen(), media_type="audio/mpeg")


@app.get("/tts/chapter/file")
async def tts_chapter_file(
    chapter_id: str = Query(..., min_length=1),
    voice: VoiceId = Query("male"),
    force: bool = Query(False),
):
    text = _find_chapter_text(chapter_id)
    if text is None:
        raise HTTPException(status_code=404, detail="chapter not found")

    voice_name = VOICE_MAP.get(voice)
    if not voice_name:
        raise HTTPException(status_code=400, detail="invalid voice")

    key = _cache_key(text, voice)
    out = CACHE_DIR / f"{chapter_id}-{voice}-{key[:12]}.mp3"

    if out.exists() and not force:
        return {"chapterId": chapter_id, "voice": voice, "file": str(out)}

    communicate = edge_tts.Communicate(text=text, voice=voice_name)
    await communicate.save(str(out))

    return {"chapterId": chapter_id, "voice": voice, "file": str(out)}


@app.get("/tts/chapter/mp3")
async def tts_chapter_mp3(
    chapter_id: str = Query(..., min_length=1),
    voice: VoiceId = Query("male"),
    force: bool = Query(False),
):
    """Return an actual mp3 file response (Range-friendly) for <audio> playback."""

    text = _find_chapter_text(chapter_id)
    if text is None:
        raise HTTPException(status_code=404, detail="chapter not found")

    voice_name = VOICE_MAP.get(voice)
    if not voice_name:
        raise HTTPException(status_code=400, detail="invalid voice")

    key = _cache_key(text, voice)
    out = CACHE_DIR / f"{chapter_id}-{voice}-{key[:12]}.mp3"

    if (not out.exists()) or force:
        communicate = edge_tts.Communicate(text=text, voice=voice_name)
        await communicate.save(str(out))

    # FileResponse in Starlette supports Range requests which makes browsers happier.
    return FileResponse(path=str(out), media_type="audio/mpeg", filename=f"{chapter_id}_{voice}.mp3")
