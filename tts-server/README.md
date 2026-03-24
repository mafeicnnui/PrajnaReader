# TTS 服务（开发工具）

用于在开发阶段为《地藏经》按章节生成 **男声/女声 普通话**音频，或提供实时流式朗读 API。

## 依赖

- Python 3.10+

安装：

```bash
pip install -r requirements.txt
```

## 1) 启动流式 API

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

接口：

- `GET /tts/chapter/stream?chapter_id=kaijingji&voice=male`
  - 返回 `audio/mpeg` 流

- `GET /tts/stream?text=...&voice=female`
  - 直接朗读传入文本（audio/mpeg 流）

## 2) 批量生成每章 mp3（写入 Ionic public 目录）

默认会写到：`prajna-buddy/public/audio/dizang/`

```bash
python generate_chapters.py
```

输出文件名示例：

- `kaijingji_male.mp3`
- `kaijingji_female.mp3`

> 当前章节文本来源：`data/dizang_sample.json`（先用样例数据，后续会替换为全量 13 品+回向偈）。
