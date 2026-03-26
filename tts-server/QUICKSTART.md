# 快速开始 - 生成地藏经音频

## 一键生成所有音频

```bash
# 1. 进入 tts-server 目录
cd tts-server

# 2. 导出 sections 数据
python export_sections.py

# 3. 生成所有音频（男声+女声）
python generate_sections.py
```

## 如果网络受限

```bash
# 使用代理
python generate_sections.py --proxy http://127.0.0.1:7890
```

## 只生成第一品的音频

```bash
# 生成第一品的所有21个小段
python generate_sections.py --sections preface-4 ch1-1 ch1-2 ch1-3 ch1-4 ch1-5 ch1-6 ch1-7 ch1-8 ch1-9 ch1-10 ch1-11 ch1-12 ch1-13 ch1-14 ch1-15 ch1-16 ch1-17 ch1-18 ch1-19 ch1-20 ch1-21
```

或者使用通配符（需要先生成所有，然后删除不需要的）：

```bash
# 生成所有
python generate_sections.py

# 然后手动删除不需要的文件
```

## 查看生成的文件

```bash
# Windows
dir ..\prajna-buddy\public\audio\dizang\sections

# Linux/Mac
ls -lh ../prajna-buddy/public/audio/dizang/sections/
```

## 测试音频

生成后，可以直接在浏览器中打开测试：

```
http://localhost:8100/audio/dizang/sections/ch1-1_male.mp3
```

或者在前端应用中测试播放功能。

## 预计时间

- 导出数据：< 1 秒
- 生成第一品音频（21段 × 2声音 = 42个文件）：约 3-5 分钟
- 生成完整地藏经音频（约200个文件）：约 15-20 分钟

## 存储空间

- 每个音频文件：约 50-200KB
- 第一品总计：约 5-10MB
- 完整地藏经：约 20-40MB
