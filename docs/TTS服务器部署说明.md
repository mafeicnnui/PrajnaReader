# TTS服务器部署说明

## 概述

本文档说明如何部署TTS（文本转语音）服务器，用于实时生成地藏经音频。

## 部署方案对比

### 方案1: TTS API服务（实时生成）

适用场景：
- 开发测试环境
- 内容频繁更新
- 存储空间有限
- 用户量较小

优点：
- 按需生成，节省存储
- 自动缓存，提高效率
- 易于扩展新内容
- 无需预先生成

缺点：
- 首次访问需等待（1-3秒）
- 需要服务器运行服务
- 依赖网络连接

### 方案2: 静态文件服务器

适用场景：
- 生产环境
- 内容相对稳定
- 用户量较大
- 需要CDN加速

优点：
- 响应速度快
- 可使用CDN
- 服务器负载低
- 稳定可靠

缺点：
- 需要预先生成
- 占用存储空间
- 更新内容需重新生成

### 方案3: 混合模式（推荐）

结合两种方案的优点：
- 常用内容使用静态文件
- 新增内容使用TTS API
- 前端自动fallback

## Docker部署TTS服务

### 1. 准备工作

#### 1.1 准备数据文件

```bash
cd tts-server

# 导出sections数据
python export_sections.py

# 确认数据文件存在
ls -lh data/sections.json
```

#### 1.2 配置环境变量（可选）

如果需要使用代理，创建 `.env` 文件：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# 代理设置（如果需要）
HTTPS_PROXY=http://127.0.0.1:7890
HTTP_PROXY=http://127.0.0.1:7890
TTS_PROXY=http://127.0.0.1:7890

# 日志级别
LOG_LEVEL=info
```

### 2. 使用Docker Compose部署（推荐）

#### 2.1 启动服务

```bash
cd tts-server

# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 查看服务状态
docker-compose ps
```

#### 2.2 测试服务

```bash
# 健康检查
curl http://localhost:8000/health

# 测试生成音频
curl "http://localhost:8000/tts/section/mp3?section_id=ch1-1&voice=male" -o test.mp3

# 播放测试（Linux/Mac）
mpg123 test.mp3
```

#### 2.3 停止服务

```bash
docker-compose down

# 停止并删除数据卷
docker-compose down -v
```

### 3. 使用Docker直接部署

#### 3.1 构建镜像

```bash
cd tts-server
docker build -t prajna-tts-server:latest .
```

#### 3.2 运行容器

```bash
docker run -d \
  --name prajna-tts-server \
  --restart unless-stopped \
  -p 8000:8000 \
  -v $(pwd)/cache:/app/cache \
  -v $(pwd)/data:/app/data:ro \
  -e HTTPS_PROXY=http://proxy.example.com:7890 \
  prajna-tts-server:latest
```

#### 3.3 查看日志

```bash
docker logs -f prajna-tts-server
```

#### 3.4 停止和删除

```bash
docker stop prajna-tts-server
docker rm prajna-tts-server
```

## 配置Nginx反向代理

### 1. 创建nginx配置文件

创建 `/opt/nginx/conf.d/tts.zhdnpx.cn.conf`：

```nginx
# TTS API服务器配置
# 域名: tts.zhdnpx.cn

upstream tts_backend {
    server localhost:8000;
    keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name tts.zhdnpx.cn;

    # HTTP重定向到HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name tts.zhdnpx.cn;

    # SSL证书配置
    ssl_certificate /certs/tts.zhdnpx.cn.crt;
    ssl_certificate_key /certs/tts.zhdnpx.cn.key;
    
    # SSL优化
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # 日志
    access_log /var/log/nginx/tts.zhdnpx.cn.access.log;
    error_log /var/log/nginx/tts.zhdnpx.cn.error.log;

    # CORS配置
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Methods' 'GET, HEAD, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept, Range' always;
    add_header 'Access-Control-Expose-Headers' 'Content-Length, Content-Range' always;

    # OPTIONS预检请求
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, HEAD, OPTIONS';
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
    }

    # 代理到TTS服务
    location / {
        proxy_pass http://tts_backend;
        proxy_http_version 1.1;
        
        # 代理头部
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket支持（如果需要）
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # 超时设置（音频生成可能需要较长时间）
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # 缓冲设置
        proxy_buffering off;
        proxy_request_buffering off;
    }

    # 健康检查端点（不记录日志）
    location /health {
        proxy_pass http://tts_backend;
        access_log off;
    }

    # API文档
    location /docs {
        proxy_pass http://tts_backend;
    }

    location /openapi.json {
        proxy_pass http://tts_backend;
    }
}
```

### 2. 重启nginx

```bash
docker restart sub-nginx

# 查看日志确认配置正确
docker logs sub-nginx
```

### 3. 测试访问

```bash
# 测试HTTP重定向
curl -I http://tts.zhdnpx.cn

# 测试HTTPS访问
curl -I https://tts.zhdnpx.cn/health

# 测试音频生成
curl "https://tts.zhdnpx.cn/tts/section/mp3?section_id=ch1-1&voice=male" -o test.mp3
```

## 前端配置

### 开发环境

创建 `prajna-buddy/.env.development`：

```env
# 使用本地TTS服务
VITE_TTS_API_URL=http://localhost:8000
```

### 生产环境

创建 `prajna-buddy/.env.production`：

```env
# 使用远程TTS服务
VITE_TTS_API_URL=https://tts.zhdnpx.cn

# 或使用静态文件服务器（fallback）
VITE_AUDIO_BASE_URL=https://files.zhdnpx.cn
```

## 监控和维护

### 1. 查看服务状态

```bash
# Docker Compose
docker-compose ps

# Docker
docker ps | grep prajna-tts-server

# 健康检查
curl http://localhost:8000/health
```

### 2. 查看日志

```bash
# 实时日志
docker-compose logs -f tts-server

# 最近100行
docker-compose logs --tail=100 tts-server

# nginx日志
docker exec sub-nginx tail -f /var/log/nginx/tts.zhdnpx.cn.access.log
```

### 3. 监控缓存使用

```bash
# 查看缓存大小
du -sh tts-server/cache

# 查看缓存文件数量
ls -1 tts-server/cache/*.mp3 | wc -l

# 清理缓存
rm -rf tts-server/cache/*.mp3
```

### 4. 性能监控

```bash
# 查看容器资源使用
docker stats prajna-tts-server

# 查看API响应时间
curl -w "@curl-format.txt" -o /dev/null -s "http://localhost:8000/tts/section/mp3?section_id=ch1-1&voice=male"
```

创建 `curl-format.txt`：

```
    time_namelookup:  %{time_namelookup}\n
       time_connect:  %{time_connect}\n
    time_appconnect:  %{time_appconnect}\n
   time_pretransfer:  %{time_pretransfer}\n
      time_redirect:  %{time_redirect}\n
 time_starttransfer:  %{time_starttransfer}\n
                    ----------\n
         time_total:  %{time_total}\n
```

## 故障排查

### 问题1: 容器启动失败

检查：
```bash
# 查看容器日志
docker logs prajna-tts-server

# 检查端口占用
netstat -tlnp | grep 8000

# 检查数据文件
ls -lh tts-server/data/sections.json
```

### 问题2: 音频生成失败

检查：
```bash
# 查看详细日志
docker logs -f prajna-tts-server

# 测试网络连接
docker exec prajna-tts-server curl -I https://speech.platform.bing.com

# 检查代理配置
docker exec prajna-tts-server env | grep PROXY
```

### 问题3: 响应速度慢

优化：
```bash
# 增加worker数量
# 修改 docker-compose.yml 中的启动命令
command: ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]

# 重启服务
docker-compose restart
```

### 问题4: 缓存占用空间过大

解决：
```bash
# 定期清理旧缓存（保留最近7天）
find tts-server/cache -name "*.mp3" -mtime +7 -delete

# 或使用cron定时清理
# 添加到crontab: 0 2 * * * find /path/to/tts-server/cache -name "*.mp3" -mtime +7 -delete
```

## 安全建议

1. 限制API访问频率（使用nginx rate limiting）
2. 配置防火墙规则
3. 定期更新Docker镜像
4. 监控异常访问
5. 备份重要数据

## 性能优化建议

1. 使用多worker提高并发处理能力
2. 配置合理的缓存策略
3. 使用CDN加速静态文件
4. 启用gzip压缩
5. 监控并优化慢查询

## 相关文档

- [TTS Server README](../tts-server/README.md)
- [音频文件服务器部署说明](./音频文件服务器部署说明.md)
- [音频生成说明](./音频生成说明.md)
