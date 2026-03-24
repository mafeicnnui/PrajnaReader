from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from typing import Literal

import edge_tts
from aiohttp.client_exceptions import WSServerHandshakeError

VoiceId = Literal["male", "female"]

VOICE_MAP: dict[VoiceId, str] = {
    "male": "zh-CN-YunxiNeural",
    "female": "zh-CN-XiaoxiaoNeural",
}


def load_book(data_file: Path) -> dict:
    return json.loads(data_file.read_text(encoding="utf-8"))


async def synth_to_file(text: str, voice: VoiceId, out_file: Path):
    out_file.parent.mkdir(parents=True, exist_ok=True)
    voice_name = VOICE_MAP[voice]
    proxy = os.environ.get("TTS_PROXY") or os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY")
    try:
        try:
            communicate = edge_tts.Communicate(text=text, voice=voice_name, proxy=proxy)
        except TypeError:
            communicate = edge_tts.Communicate(text=text, voice=voice_name)
        await communicate.save(str(out_file))
    except WSServerHandshakeError as e:
        raise RuntimeError(
            f"edge-tts WebSocket handshake failed: {e.status}. "
            "This is commonly caused by network restrictions. "
            "Try setting HTTPS_PROXY/HTTP_PROXY or TTS_PROXY."
        ) from e


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", default=str(Path(__file__).parent / "data" / "dizang_sample.json"))
    parser.add_argument("--out", default=str(Path(__file__).resolve().parents[1] / "prajna-buddy" / "public" / "audio" / "dizang"))
    parser.add_argument("--proxy", default="", help="Proxy URL, e.g. http://127.0.0.1:7890")
    args = parser.parse_args()

    if args.proxy:
        os.environ["TTS_PROXY"] = args.proxy
        os.environ.setdefault("HTTPS_PROXY", args.proxy)
        os.environ.setdefault("HTTP_PROXY", args.proxy)

    data_file = Path(args.data)
    out_dir = Path(args.out)

    book = load_book(data_file)
    chapters = book.get("chapters", [])

    import asyncio

    for ch in chapters:
        chapter_id = ch.get("id")
        text = ch.get("text")
        if not chapter_id or not text:
            continue

        male_out = out_dir / f"{chapter_id}_male.mp3"
        female_out = out_dir / f"{chapter_id}_female.mp3"

        await synth_to_file(text, "male", male_out)
        await synth_to_file(text, "female", female_out)

        print(f"Generated: {male_out}")
        print(f"Generated: {female_out}")


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
