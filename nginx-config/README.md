# Nginx配置文件说明

本目录包含项目所需的nginx配置文件。

## 配置文件列表

### 1. tts.zhdnpx.cn.conf
TTS API服务器的反向代理配置。

**功能**：
- 反向代理到Docker容器 `prajna-tts-server`
- HTTP自动重定向到HTTPS
- CORS跨域支持
- SSL/TLS配置
- 健康检查
- API文档访问

**上游服务**：
- 容器名称：`prajna-tts-server`
- 端口：8000
- 网络：web

### 2. files.zhdnpx.cn.conf
静态文件服务器配置。

**功能**：
- 提供音频文件的静态文件服务
- HTTP自动重定向到HTTPS
- CORS跨域支持
- Range请求支持（音频流式播放）
- 长期缓存配置
- 目录浏览（可选）

**文件目录**：
- 根目录：`/usr/share/nginx/files`
- 音频目录：`/usr/share/nginx/files/audio/sutras/`

## 部署步骤

### 前置条件

1. Docker网络 `web` 已创建：
```bash
docker network create web
```

2. SSL证书已准备：
- `/opt/hysteria2/certs/tts.zhdnpx.cn.crt`
- `/opt/hysteria2/certs/tts.zhdnpx.cn.key`
- `/opt/hysteria2/certs/files.zhdnpx.cn.crt`
- `/opt/hysteria2/certs/files.zhdnpx.cn.key`

### 步骤1: 部署TTS服务

#### 方式1: 使用docker run（推荐用于生产环境）

```bash
# 1. 进入tts-server目录
cd tts-server

# 2. 准备数据文件
python export_sections.py

# 3. 构建镜像
docker build -t prajna-tts-server:latest .

# 4. 运行容器
docker run -d \
  --name prajna-tts-server \
  --restart unless-stopped \
  --network web \
  -p 8000:8000 \
  -v $(pwd)/cache:/app/cache \
  -v $(pwd)/data:/app/data:ro \
  prajna-tts-server:latest

# 如果需要代理，添加环境变量：
# -e HTTPS_PROXY=http://proxy.example.com:7890 \
# -e HTTP_PROXY=http://proxy.example.com:7890 \

# 5. 验证服务运行
docker ps | grep prajna-tts-server
docker logs prajna-tts-server

# 6. 测试健康检查（通过宿主机端口）
curl http://localhost:8000/health

# 7. 测试健康检查（通过容器内部）
docker exec prajna-tts-server curl http://localhost:8000/health
```

#### 方式2: 使用docker-compose（推荐用于开发环境）

```bash
# 1. 进入tts-server目录
cd tts-server

# 2. 准备数据文件
python export_sections.py

# 3. 启动TTS服务（会自动加入web网络）
docker-compose up -d

# 4. 验证服务运行
docker ps | grep prajna-tts-server
docker logs prajna-tts-server

# 5. 测试健康检查
docker exec prajna-tts-server curl -f http://localhost:8000/health
```

### 步骤2: 部署nginx配置

```bash
# 1. 复制配置文件到服务器
scp nginx-config/tts.zhdnpx.cn.conf user@server:/opt/nginx/conf.d/
scp nginx-config/files.zhdnpx.cn.conf user@server:/opt/nginx/conf.d/

# 2. SSH登录到服务器
ssh user@server

# 3. 验证配置文件语法
docker exec sub-nginx nginx -t

# 4. 重启nginx
docker restart sub-nginx

# 5. 查看日志确认启动成功
docker logs sub-nginx
```

### 步骤3: 测试访问

```bash
# 测试TTS服务
curl -I https://tts.zhdnpx.cn/health
curl "https://tts.zhdnpx.cn/tts/section/mp3?section_id=ch1-1&voice=male" -o test.mp3

# 测试静态文件服务
curl -I https://files.zhdnpx.cn/audio/sutras/dizang/sections/ch1-1_male.mp3
```

## 网络架构

```
Internet
    ↓
[nginx容器 (sub-nginx)]
    ↓ (web网络 - 容器间通信)
[TTS服务容器 (prajna-tts-server:8000)]
    ↓ (可选：宿主机端口映射)
宿主机:8000 (用于直接测试)
```

### Docker网络配置

nginx容器和TTS服务容器都在 `web` 网络中：

```bash
# 查看web网络
docker network inspect web

# 应该看到两个容器：
# - sub-nginx
# - prajna-tts-server
```

### 容器间通信

在 `web` 网络中，容器可以通过容器名称互相访问：
- nginx访问TTS服务：`http://prajna-tts-server:8000`
  - 这里的 `:8000` 是容器内部端口
  - 不需要通过宿主机的端口映射
  - 直接在Docker网络内部通信

### 端口说明

1. **容器内部端口**：8000
   - TTS服务在容器内监听8000端口
   - nginx通过Docker网络访问这个端口

2. **宿主机端口映射**：`-p 8000:8000`（可选）
   - 将容器的8000端口映射到宿主机的8000端口
   - 用途：方便直接测试TTS服务
   - nginx不需要这个映射，因为它通过Docker网络访问

3. **访问方式对比**：
   ```bash
   # 通过宿主机端口访问（需要-p 8000:8000）
   curl http://localhost:8000/health
   
   # 通过Docker网络访问（nginx使用这种方式）
   docker exec sub-nginx curl http://prajna-tts-server:8000/health
   ```

## 配置说明

### TTS服务配置要点

1. **上游服务器**：
```nginx
upstream tts_backend {
    server prajna-tts-server:8000;  # 使用容器名称
    keepalive 32;
}
```

2. **超时设置**：
```nginx
proxy_connect_timeout 60s;  # 音频生成可能需要时间
proxy_read_timeout 60s;
```

3. **缓冲设置**：
```nginx
proxy_buffering off;  # 流式响应不缓冲
proxy_request_buffering off;
```

4. **CORS配置**：
```nginx
add_header 'Access-Control-Allow-Origin' '*' always;
```

### 静态文件服务配置要点

1. **Range请求支持**：
```nginx
add_header Accept-Ranges bytes;
```

2. **缓存配置**：
```nginx
expires 30d;  # 音频文件长期缓存
add_header Cache-Control "public, immutable";
```

3. **目录浏览**（可选）：
```nginx
autoindex on;
```

## 监控和维护

### 查看日志

```bash
# TTS服务日志
docker logs -f prajna-tts-server

# Nginx访问日志
docker exec sub-nginx tail -f /var/log/nginx/tts.zhdnpx.cn.access.log

# Nginx错误日志
docker exec sub-nginx tail -f /var/log/nginx/tts.zhdnpx.cn.error.log
```

### 性能监控

```bash
# 查看TTS服务资源使用
docker stats prajna-tts-server

# 查看nginx连接数
docker exec sub-nginx netstat -an | grep :443 | wc -l
```

### 重启服务

```bash
# 重启TTS服务
docker-compose -f tts-server/docker-compose.yml restart

# 重启nginx
docker restart sub-nginx

# 重新加载nginx配置（不中断服务）
docker exec sub-nginx nginx -s reload
```

## 故障排查

### 问题1: 502 Bad Gateway

检查：
```bash
# 1. TTS服务是否运行
docker ps | grep prajna-tts-server

# 2. TTS服务是否在web网络中
docker network inspect web

# 3. TTS服务健康检查
docker exec prajna-tts-server curl http://localhost:8000/health

# 4. nginx是否能访问TTS服务
docker exec sub-nginx curl http://prajna-tts-server:8000/health
```

### 问题2: SSL证书错误

检查：
```bash
# 1. 证书文件是否存在
docker exec sub-nginx ls -l /certs/tts.zhdnpx.cn.*

# 2. 证书是否有效
docker exec sub-nginx openssl x509 -in /certs/tts.zhdnpx.cn.crt -noout -dates

# 3. 证书权限
docker exec sub-nginx ls -l /certs/
```

### 问题3: CORS错误

检查：
```bash
# 测试CORS头部
curl -I -H "Origin: https://your-app.com" https://tts.zhdnpx.cn/health

# 应该看到：
# Access-Control-Allow-Origin: *
```

### 问题4: 音频生成超时

调整nginx超时设置：
```nginx
proxy_read_timeout 120s;  # 增加到120秒
```

## 安全建议

1. **限制访问频率**：
```nginx
limit_req_zone $binary_remote_addr zone=tts_limit:10m rate=10r/s;
limit_req zone=tts_limit burst=20 nodelay;
```

2. **IP白名单**（如果需要）：
```nginx
allow 1.2.3.4;
deny all;
```

3. **防止DDoS**：
```nginx
limit_conn_zone $binary_remote_addr zone=addr:10m;
limit_conn addr 10;
```

4. **定期更新SSL证书**

5. **监控异常访问**

## 相关文档

- [TTS服务器部署说明](../docs/TTS服务器部署说明.md)
- [音频文件服务器部署说明](../docs/音频文件服务器部署说明.md)
- [音频系统架构说明](../docs/音频系统架构说明.md)
