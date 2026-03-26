# TTS Server - 地藏经音频生成服务

基于 FastAPI 和 edge-tts 的文本转语音服务，支持实时生成和缓存音频文件。

## 功能特性

- ✅ 支持男声和女声两种音色
- ✅ 支持按小段（section）实时生成音频
- ✅ 支持任意文本转语音
- ✅ 自动缓存生成的音频文件
- ✅ 支持HTTP Range请求（流式播放）
- ✅ CORS跨域支持
- ✅ Docker容器化部署
- ✅ 健康检查和监控

## 快速开始

### 方式1: 本地运行

#### 1. 安装依赖

```bash
cd tts-server
pip install -r requirements.txt
```

#### 2. 准备数据文件

确保 `data/sections.json` 文件存在（通过 `export_sections.py` 生成）：

```bash
python export_sections.py
```

#### 3. 启动服务

```bash
# 开发模式（自动重载）
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# 生产模式
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

#### 4. 访问API文档

打开浏览器访问：http://localhost:8000/docs

### 方式2: Docker运行

#### 1. 构建镜像

```bash
cd tts-server
docker build -t prajna-tts-server .
```

#### 2. 运行容器

```bash
docker run -d \
  --name prajna-tts-server \
  --network web \
  -p 8000:8000 \
  -v $(pwd)/cache:/app/cache \
  -v $(pwd)/data:/app/data:ro \
  prajna-tts-server
```

#### 3. 使用docker-compose（推荐）

```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

## API接口说明

### 1. 健康检查

```
GET /health
```

返回服务健康状态。

### 2. 获取可用声音

```
GET /voices
```

返回支持的男声和女声配置。

### 3. 列出所有sections

```
GET /sections
```

返回所有可用的section列表及其基本信息。

### 4. 获取section详情

```
GET /section/{section_id}
```

返回指定section的完整信息（包括文本、拼音、白话文等）。

### 5. 生成section音频（推荐）

```
GET /tts/section/mp3?section_id={section_id}&voice={voice}&force={force}
```

参数：
- `section_id`: section的ID，如 `ch1-1`, `preface-1` 等（必填）
- `voice`: 声音类型，`male` 或 `female`（默认：male）
- `force`: 是否强制重新生成，`true` 或 `false`（默认：false）

返回：mp3音频文件（支持Range请求，适合HTML5 audio标签）

示例：
```bash
# 生成第一品第一段的男声音频
curl "http://localhost:8000/tts/section/mp3?section_id=ch1-1&voice=male" -o ch1-1_male.mp3

# 生成香赞的女声音频
curl "http://localhost:8000/tts/section/mp3?section_id=preface-1&voice=female" -o preface-1_female.mp3
```

### 6. 流式生成section音频

```
GET /tts/section/stream?section_id={section_id}&voice={voice}
```

实时流式返回音频数据，不使用缓存。

### 7. 任意文本转语音

```
GET /tts/text/mp3?text={text}&voice={voice}&force={force}
```

参数：
- `text`: 要转换的文本（必填，最长5000字符）
- `voice`: 声音类型，`male` 或 `female`（默认：male）
- `force`: 是否强制重新生成（默认：false）

示例：
```bash
curl "http://localhost:8000/tts/text/mp3?text=南无地藏王菩萨&voice=male" -o test.mp3
```

## 前端集成

### 环境变量配置

在前端项目中配置TTS API地址：

#### 开发环境 (`.env.development`)

```env
# 使用本地TTS服务实时生成
VITE_TTS_API_URL=http://localhost:8000

# 或使用本地静态文件
# VITE_TTS_API_URL=
# VITE_AUDIO_BASE_URL=
```

#### 生产环境 (`.env.production`)

```env
# 使用远程TTS服务
VITE_TTS_API_URL=https://tts.zhdnpx.cn

# 或使用静态文件服务器
# VITE_TTS_API_URL=
# VITE_AUDIO_BASE_URL=https://files.zhdnpx.cn
```

### 使用示例

前端代码会自动根据配置选择音频源：

```typescript
// 优先级：TTS API > 远程静态文件 > 本地静态文件
const getSectionAudioUrl = (sectionId: string, voiceType: VoiceId): string => {
  const ttsApiUrl = import.meta.env.VITE_TTS_API_URL;
  const audioBaseUrl = import.meta.env.VITE_AUDIO_BASE_URL || '';
  
  if (ttsApiUrl) {
    // 使用TTS API实时生成
    return `${ttsApiUrl}/tts/section/mp3?section_id=${sectionId}&voice=${voiceType}`;
  }
  
  // 使用静态文件
  return `${audioBaseUrl}/audio/sutras/dizang/sections/${sectionId}_${voiceType}.mp3`;
};
```

## 批量生成音频文件

如果需要预先生成所有音频文件（用于静态文件服务器）：

```bash
# 生成所有section的音频文件
python generate_sections.py

# 只生成男声
python generate_sections.py --voice male

# 只生成指定的sections
python generate_sections.py --sections ch1-1 ch1-2 ch1-3

# 使用代理
python generate_sections.py --proxy http://127.0.0.1:7890
```

## 部署建议

### 开发环境

使用本地TTS服务实时生成，方便调试和测试：
- 启动本地TTS服务：`uvicorn main:app --reload`
- 前端配置：`VITE_TTS_API_URL=http://localhost:8000`

### 生产环境

根据实际情况选择：

#### 方案1: TTS API服务（推荐用于小规模）

优点：
- 按需生成，节省存储空间
- 自动缓存，提高响应速度
- 易于扩展新内容

缺点：
- 首次访问需要生成时间（约1-3秒）
- 需要服务器运行TTS服务

部署：
```bash
# 使用docker-compose部署
cd tts-server
docker-compose up -d

# 配置nginx反向代理
# 域名：tts.zhdnpx.cn -> http://localhost:8000
```

#### 方案2: 静态文件服务器（推荐用于大规模）

优点：
- 响应速度快
- 可使用CDN加速
- 服务器负载低

缺点：
- 需要预先生成所有文件
- 占用存储空间（约14MB/经典）

部署：
```bash
# 1. 批量生成音频文件
python generate_sections.py

# 2. 上传到静态文件服务器
rsync -avz prajna-buddy/public/audio/sutras/ \
    user@server:/opt/nginx/files/audio/sutras/

# 3. 前端配置
# VITE_AUDIO_BASE_URL=https://files.zhdnpx.cn
```

#### 方案3: 混合模式（最佳实践）

- 常用内容：预先生成，使用静态文件服务器
- 新增内容：使用TTS API实时生成
- 前端自动fallback：API失败时使用静态文件

## 性能优化

### 1. 缓存策略

TTS服务会自动缓存生成的音频文件：
- 缓存目录：`cache/`
- 缓存键：基于文本内容和声音类型的hash
- 缓存有效期：永久（除非手动清理或force=true）

### 2. 并发处理

生产环境建议使用多worker：

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### 3. 代理配置

如果服务器访问edge-tts需要代理：

```bash
# 方式1: 环境变量
export HTTPS_PROXY=http://127.0.0.1:7890
uvicorn main:app --host 0.0.0.0 --port 8000

# 方式2: docker-compose.yml
environment:
  HTTPS_PROXY: "http://proxy.example.com:7890"
```

## 监控和维护

### 查看日志

```bash
# Docker
docker-compose logs -f tts-server

# 本地
# 日志会输出到控制台
```

### 清理缓存

```bash
# 清理所有缓存
rm -rf cache/*.mp3

# 清理特定section的缓存
rm cache/section_ch1-1_*.mp3
```

### 健康检查

```bash
curl http://localhost:8000/health
```

## 故障排查

### 问题1: 音频生成失败

检查：
- 网络连接是否正常
- 是否需要配置代理
- edge-tts服务是否可访问

### 问题2: 缓存占用空间过大

解决：
- 定期清理旧缓存
- 使用静态文件服务器代替TTS API

### 问题3: 响应速度慢

优化：
- 增加worker数量
- 使用静态文件服务器
- 启用CDN加速

## 相关文档

- [音频生成说明](../docs/音频生成说明.md)
- [音频文件服务器部署说明](../docs/音频文件服务器部署说明.md)
- [快速开始指南](./QUICKSTART.md)
