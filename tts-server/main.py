from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Literal, Optional

import edge_tts
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.responses import JSONResponse, StreamingResponse

APP_DIR = Path(__file__).resolve().parent
DATA_FILE = APP_DIR / "data" / "dizang_sample.json"
SECTIONS_FILE = APP_DIR / "data" / "sections.json"
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


def _load_sections() -> dict:
    """加载sections数据"""
    if not SECTIONS_FILE.exists():
        return {"sections": []}
    return json.loads(SECTIONS_FILE.read_text(encoding="utf-8"))


def _find_section_text(section_id: str) -> Optional[str]:
    """根据section_id查找对应的文本"""
    data = _load_sections()
    for section in data.get("sections", []):
        if section.get("id") == section_id:
            return section.get("text")
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


# ==================== 小段音频生成API ====================

@app.get("/sections")
def list_sections():
    """列出所有可用的sections"""
    data = _load_sections()
    sections = data.get("sections", [])
    return {
        "total": len(sections),
        "sections": [
            {
                "id": s.get("id"),
                "title": s.get("title", ""),
                "textLength": len(s.get("text", "")),
            }
            for s in sections
        ],
    }


@app.get("/section/{section_id}")
def get_section(section_id: str):
    """获取指定section的详细信息"""
    data = _load_sections()
    for section in data.get("sections", []):
        if section.get("id") == section_id:
            return section
    raise HTTPException(status_code=404, detail="section not found")


@app.get("/tts/section/stream")
async def tts_section_stream(
    section_id: str = Query(..., min_length=1),
    voice: VoiceId = Query("male"),
):
    """流式返回section音频（实时生成）"""
    text = _find_section_text(section_id)
    if text is None:
        raise HTTPException(status_code=404, detail="section not found")

    voice_name = VOICE_MAP.get(voice)
    if not voice_name:
        raise HTTPException(status_code=400, detail="invalid voice")

    async def gen():
        communicate = edge_tts.Communicate(text=text, voice=voice_name)
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                yield chunk["data"]

    return StreamingResponse(gen(), media_type="audio/mpeg")


@app.get("/tts/section/mp3")
async def tts_section_mp3(
    section_id: str = Query(..., min_length=1),
    voice: VoiceId = Query("male"),
    force: bool = Query(False),
):
    """
    返回section的mp3文件（支持Range请求，适合<audio>标签播放）
    
    参数:
    - section_id: section的ID，如 ch1-1, preface-1 等
    - voice: 声音类型，male 或 female
    - force: 是否强制重新生成（默认false，使用缓存）
    """
    text = _find_section_text(section_id)
    if text is None:
        raise HTTPException(status_code=404, detail="section not found")

    voice_name = VOICE_MAP.get(voice)
    if not voice_name:
        raise HTTPException(status_code=400, detail="invalid voice")

    # 使用section_id和voice作为缓存文件名
    key = _cache_key(text, voice)
    out = CACHE_DIR / f"section_{section_id}_{voice}_{key[:8]}.mp3"

    # 如果缓存不存在或强制重新生成，则生成音频
    if (not out.exists()) or force:
        # 检查是否设置了代理
        proxy = os.environ.get("TTS_PROXY") or os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY")
        try:
            if proxy:
                communicate = edge_tts.Communicate(text=text, voice=voice_name, proxy=proxy)
            else:
                communicate = edge_tts.Communicate(text=text, voice=voice_name)
        except TypeError:
            # 旧版本edge-tts不支持proxy参数
            communicate = edge_tts.Communicate(text=text, voice=voice_name)
        
        await communicate.save(str(out))

    # 返回mp3文件，支持Range请求（用于音频流式播放）
    return FileResponse(
        path=str(out),
        media_type="audio/mpeg",
        filename=f"{section_id}_{voice}.mp3",
    )


@app.get("/tts/text/mp3")
async def tts_text_mp3(
    text: str = Query(..., min_length=1, max_length=5000),
    voice: VoiceId = Query("male"),
    force: bool = Query(False),
):
    """
    根据任意文本生成mp3音频（支持Range请求）
    
    参数:
    - text: 要转换的文本（最长5000字符）
    - voice: 声音类型，male 或 female
    - force: 是否强制重新生成（默认false，使用缓存）
    """
    voice_name = VOICE_MAP.get(voice)
    if not voice_name:
        raise HTTPException(status_code=400, detail="invalid voice")

    # 使用文本hash作为缓存文件名
    key = _cache_key(text, voice)
    out = CACHE_DIR / f"text_{key}.mp3"

    # 如果缓存不存在或强制重新生成，则生成音频
    if (not out.exists()) or force:
        proxy = os.environ.get("TTS_PROXY") or os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY")
        try:
            if proxy:
                communicate = edge_tts.Communicate(text=text, voice=voice_name, proxy=proxy)
            else:
                communicate = edge_tts.Communicate(text=text, voice=voice_name)
        except TypeError:
            communicate = edge_tts.Communicate(text=text, voice=voice_name)
        
        await communicate.save(str(out))

    return FileResponse(
        path=str(out),
        media_type="audio/mpeg",
        filename=f"audio_{voice}.mp3",
    )
