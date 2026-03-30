"""
为地藏经每个小段（section）生成音频文件
支持男声和女声，输出到 cache 目录
文件名格式与 TTS 服务器一致：section_{section_id}_{voice}_{hash}.mp3
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import sys
from pathlib import Path
from typing import Literal

import edge_tts
from aiohttp.client_exceptions import WSServerHandshakeError

VoiceId = Literal["male", "female"]

VOICE_MAP: dict[VoiceId, str] = {
    "male": "zh-CN-YunxiNeural",
    "female": "zh-CN-XiaoxiaoNeural",
}


def _cache_key(text: str, voice: VoiceId) -> str:
    """生成缓存key（与 main.py 保持一致）"""
    return hashlib.sha256(f"{text}:{voice}".encode()).hexdigest()


def load_sections_from_ts(ts_file: Path) -> list[dict]:
    """从 TypeScript 文件中提取 section 数据"""
    sections = []
    
    # 这里我们需要从 dizang-full.ts 中提取数据
    # 由于是 TS 文件，我们需要解析它
    # 简单起见，我们可以创建一个 JSON 数据文件
    print(f"请先运行 export_sections.py 生成 sections.json 文件")
    return sections


def load_sections_from_json(json_file: Path) -> list[dict]:
    """从 JSON 文件加载 section 数据"""
    data = json.loads(json_file.read_text(encoding="utf-8"))
    return data.get("sections", [])


async def synth_to_file(text: str, voice: VoiceId, out_file: Path):
    """合成语音并保存到文件"""
    out_file.parent.mkdir(parents=True, exist_ok=True)
    voice_name = VOICE_MAP[voice]
    proxy = os.environ.get("TTS_PROXY") or os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY")
    
    try:
        try:
            communicate = edge_tts.Communicate(text=text, voice=voice_name, proxy=proxy)
        except TypeError:
            communicate = edge_tts.Communicate(text=text, voice=voice_name)
        await communicate.save(str(out_file))
        print(f"✓ Generated: {out_file.name}")
    except WSServerHandshakeError as e:
        raise RuntimeError(
            f"edge-tts WebSocket handshake failed: {e.status}. "
            "This is commonly caused by network restrictions. "
            "Try setting HTTPS_PROXY/HTTP_PROXY or TTS_PROXY."
        ) from e
    except Exception as e:
        print(f"✗ Failed to generate {out_file.name}: {e}", file=sys.stderr)


async def main():
    parser = argparse.ArgumentParser(description="为地藏经每个小段生成音频文件")
    parser.add_argument(
        "--data", 
        default=str(Path(__file__).parent / "data" / "sections.json"),
        help="sections.json 数据文件路径"
    )
    parser.add_argument(
        "--out", 
        default=str(Path(__file__).parent / "cache"),
        help="输出目录（默认为 cache 目录）"
    )
    parser.add_argument(
        "--proxy", 
        default="", 
        help="代理 URL, 例如 http://127.0.0.1:7890"
    )
    parser.add_argument(
        "--voice",
        choices=["male", "female", "both"],
        default="both",
        help="生成的语音类型"
    )
    parser.add_argument(
        "--sections",
        nargs="+",
        help="只生成指定的 section IDs，例如: ch1-1 ch1-2"
    )
    args = parser.parse_args()

    if args.proxy:
        os.environ["TTS_PROXY"] = args.proxy
        os.environ.setdefault("HTTPS_PROXY", args.proxy)
        os.environ.setdefault("HTTP_PROXY", args.proxy)

    data_file = Path(args.data)
    if not data_file.exists():
        print(f"错误: 数据文件不存在: {data_file}")
        print(f"请先运行: python export_sections.py")
        return

    out_dir = Path(args.out)
    sections = load_sections_from_json(data_file)

    if not sections:
        print("错误: 没有找到任何 section 数据")
        return

    # 过滤要生成的 sections
    if args.sections:
        sections = [s for s in sections if s.get("id") in args.sections]
        if not sections:
            print(f"错误: 没有找到指定的 sections: {args.sections}")
            return

    print(f"准备生成 {len(sections)} 个 section 的音频文件...")
    print(f"输出目录: {out_dir}")
    print()

    voices_to_generate = []
    if args.voice in ["male", "both"]:
        voices_to_generate.append("male")
    if args.voice in ["female", "both"]:
        voices_to_generate.append("female")

    total = len(sections) * len(voices_to_generate)
    current = 0

    for section in sections:
        section_id = section.get("id")
        text = section.get("text")
        title = section.get("title", "")
        
        if not section_id or not text:
            print(f"⚠ 跳过无效 section: {section_id or '(无ID)'}")
            continue

        print(f"[{section_id}] {title}")

        for voice in voices_to_generate:
            current += 1
            
            # 生成与 TTS 服务器一致的文件名
            key = _cache_key(text, voice)
            out_file = out_dir / f"section_{section_id}_{voice}_{key[:8]}.mp3"
            
            # 如果文件已存在，跳过
            if out_file.exists():
                print(f"  ⊙ 已存在: {out_file.name} ({current}/{total})")
                continue
            
            print(f"  → 生成 {voice} 音频... ({current}/{total})")
            await synth_to_file(text, voice, out_file)

        print()

    print(f"✓ 完成！共生成 {total} 个音频文件")
    print(f"输出目录: {out_dir}")


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
