# Nginx服务器部署说明

本文档说明如何部署和管理nginx反向代理服务器，包括SSL证书更新和容器管理。

## 目录

- [服务器架构](#服务器架构)
- [SSL证书管理](#ssl证书管理)
- [Nginx容器管理](#nginx容器管理)
- [配置文件说明](#配置文件说明)
- [常见问题](#常见问题)

## 服务器架构

### 域名列表

当前服务器管理以下域名：

- `hy2.zhdnpx.cn` - Hysteria2代理服务
- `admin.hy2.zhdnpx.cn` - Hysteria2管理后台
- `wiki.zhdnpx.cn` - Wiki文档
- `py3.zhdnpx.cn` - Python3服务
- `dbeaver.zhdnpx.cn` - DBeaver数据库管理
- `exam.zhdnpx.cn` - 考试系统
- `files.zhdnpx.cn` - 文件服务器
- `tts.zhdnpx.cn` - TTS语音服务和APK下载
- `app.zhdnpx.cn` - 般若伴读PWA应用

### 容器架构

```
┌─────────────────────────────────────────────────────────────┐
│                        sub-nginx                             │
│                    (nginx:alpine)                            │
│                                                              │
│  端口映射:                                                    │
│    - 80:80   (HTTP)                                          │
│    - 443:443 (HTTPS)                                         │
│                                                              │
│  挂载目录:                                                    │
│    - /opt/nginx/nginx.conf → /etc/nginx/nginx.conf          │
│    - /opt/nginx/conf.d → /etc/nginx/conf.d                  │
│    - /opt/nginx/prajna → /usr/share/nginx/prajna            │
│    - /opt/nginx/app → /usr/share/nginx/app                  │
│    - /opt/subscription/www → /usr/share/nginx/html          │
│    - /opt/hysteria2/certs → /certs                          │
│                                                              │
│  网络: web                                                    │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 反向代理
                            ▼
        ┌──────────────────────────────────────┐
        │                                      │
        │  prajna-tts-server:8000             │
        │  (TTS语音服务)                       │
        │                                      │
        └──────────────────────────────────────┘
```

## SSL证书管理

### 证书更新流程

SSL证书使用Let's Encrypt，每90天需要更新一次。

#### 1. 停止nginx容器

```bash
docker stop sub-nginx
```

> 注意：必须停止nginx才能让certbot使用80端口进行验证

#### 2. 申请/更新证书

```bash
sudo certbot certonly --standalone \
  -d hy2.zhdnpx.cn \
  -d admin.hy2.zhdnpx.cn \
  -d wiki.zhdnpx.cn \
  -d py3.zhdnpx.cn \
  -d dbeaver.zhdnpx.cn \
  -d exam.zhdnpx.cn \
  -d files.zhdnpx.cn \
  -d tts.zhdnpx.cn \
  -d app.zhdnpx.cn
```

证书文件位置：`/etc/letsencrypt/live/hy2.zhdnpx.cn-0001/`

#### 3. 复制证书到Hysteria2目录

```bash
sudo cp -L /etc/letsencrypt/live/hy2.zhdnpx.cn-0001/fullchain.pem /opt/hysteria2/certs/fullchain.pem
sudo cp -L /etc/letsencrypt/live/hy2.zhdnpx.cn-0001/privkey.pem /opt/hysteria2/certs/privkey.pem
```

> 注意：使用 `-L` 参数跟随符号链接，复制实际文件

#### 4. 启动nginx容器

```bash
docker start sub-nginx
```

#### 5. 重新加载nginx配置

```bash
docker exec -it sub-nginx nginx -s reload
```

### 证书自动更新

可以设置cron任务自动更新证书：

```bash
# 编辑crontab
crontab -e

# 添加以下任务（每月1号凌晨2点执行）
0 2 1 * * /root/scripts/renew-ssl.sh >> /var/log/ssl-renew.log 2>&1
```

创建自动更新脚本 `/root/scripts/renew-ssl.sh`：

```bash
#!/bin/bash
# SSL证书自动更新脚本

echo "=== SSL证书更新 $(date) ==="

# 1. 停止nginx
docker stop sub-nginx

# 2. 更新证书
certbot renew

# 3. 复制证书
cp -L /etc/letsencrypt/live/hy2.zhdnpx.cn-0001/fullchain.pem /opt/hysteria2/certs/fullchain.pem
cp -L /etc/letsencrypt/live/hy2.zhdnpx.cn-0001/privkey.pem /opt/hysteria2/certs/privkey.pem

# 4. 启动nginx
docker start sub-nginx

# 5. 等待nginx启动
sleep 5

# 6. 重新加载配置
docker exec sub-nginx nginx -s reload

echo "=== 更新完成 ==="
```

## Nginx容器管理

### 创建/重建容器

如果需要重建nginx容器（例如更新挂载目录或配置）：

```bash
# 1. 停止并删除旧容器
docker stop sub-nginx
docker rm sub-nginx

# 2. 创建新容器
docker run -d \
  --name sub-nginx \
  --restart unless-stopped \
  --network web \
  -p 80:80/tcp \
  -p 443:443/tcp \
  -v /opt/nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v /opt/nginx/conf.d:/etc/nginx/conf.d:ro \
  -v /opt/nginx/prajna:/usr/share/nginx/prajna:ro \
  -v /opt/nginx/app:/usr/share/nginx/app:ro \
  -v /opt/subscription/www:/usr/share/nginx/html:ro \
  -v /opt/hysteria2/certs:/certs:ro \
  nginx:alpine
```

### 容器启动参数说明

| 参数 | 说明 |
|------|------|
| `--name sub-nginx` | 容器名称 |
| `--restart unless-stopped` | 自动重启策略（除非手动停止） |
| `--network web` | 连接到web网络（用于与其他容器通信） |
| `-p 80:80/tcp` | 映射HTTP端口 |
| `-p 443:443/tcp` | 映射HTTPS端口 |
| `-v ... :ro` | 只读挂载（安全性） |

### 常用管理命令

```bash
# 查看容器状态
docker ps | grep sub-nginx

# 查看容器日志
docker logs sub-nginx
docker logs -f sub-nginx  # 实时查看

# 进入容器
docker exec -it sub-nginx sh

# 重新加载nginx配置（不停机）
docker exec sub-nginx nginx -s reload

# 测试nginx配置
docker exec sub-nginx nginx -t

# 查看nginx版本
docker exec sub-nginx nginx -v

# 重启容器
docker restart sub-nginx

# 停止容器
docker stop sub-nginx

# 启动容器
docker start sub-nginx
```

## 配置文件说明

### 主配置文件

- `/opt/nginx/nginx.conf` - nginx主配置文件
- `/opt/nginx/conf.d/*.conf` - 各域名的虚拟主机配置

### 虚拟主机配置

每个域名都有独立的配置文件：

```
/opt/nginx/conf.d/
├── tts.zhdnpx.cn.conf      # TTS服务和APK下载
├── app.zhdnpx.cn.conf      # PWA应用
├── files.zhdnpx.cn.conf    # 文件服务器
└── ...
```

### SSL证书配置

在虚拟主机配置中，SSL证书路径为：

```nginx
ssl_certificate /certs/fullchain.pem;
ssl_certificate_key /certs/privkey.pem;
```

这些路径对应容器内的挂载点，实际文件在：
- 宿主机：`/opt/hysteria2/certs/`
- 容器内：`/certs/`

### 静态文件目录

| 宿主机路径 | 容器内路径 | 用途 |
|-----------|-----------|------|
| `/opt/nginx/prajna/` | `/usr/share/nginx/prajna/` | 般若伴读相关文件 |
| `/opt/nginx/prajna/downloads/` | `/usr/share/nginx/prajna/downloads/` | APK下载目录 |
| `/opt/nginx/app/` | `/usr/share/nginx/app/` | PWA应用文件 |
| `/opt/subscription/www/` | `/usr/share/nginx/html/` | 订阅服务页面 |

## 健康检查

### 检查TTS服务连接

```bash
# 从nginx容器内测试TTS服务
docker exec sub-nginx curl http://prajna-tts-server:8000/health
```

如果返回 `{"status":"healthy"}` 说明连接正常。

### 检查域名访问

```bash
# 测试HTTP（应该重定向到HTTPS）
curl -I http://tts.zhdnpx.cn

# 测试HTTPS
curl -I https://tts.zhdnpx.cn

# 测试APK下载
curl -I https://tts.zhdnpx.cn/downloads/Prajna-Reader.apk
```

### 检查SSL证书

```bash
# 查看证书有效期
openssl s_client -connect tts.zhdnpx.cn:443 -servername tts.zhdnpx.cn < /dev/null 2>/dev/null | openssl x509 -noout -dates

# 或使用certbot
sudo certbot certificates
```

## 常见问题

### 1. APK下载失败

**症状**：浏览器显示"失败 - 本页面没有文件"

**原因**：nginx配置中的路径错误，或APK文件不存在

**解决方案**：

```bash
# 1. 检查APK文件是否存在
ls -lh /opt/nginx/prajna/downloads/Prajna-Reader.apk

# 2. 检查容器内的文件
docker exec sub-nginx ls -lh /usr/share/nginx/prajna/downloads/

# 3. 检查nginx配置
docker exec sub-nginx cat /etc/nginx/conf.d/tts.zhdnpx.cn.conf | grep -A 5 "location /downloads/"

# 4. 确保配置中使用容器内路径
# 正确: alias /usr/share/nginx/prajna/downloads/;
# 错误: alias /opt/nginx/prajna/downloads/;
```

### 2. 502 Bad Gateway

**症状**：访问TTS服务时返回502错误

**原因**：nginx无法连接到后端TTS服务

**解决方案**：

```bash
# 1. 检查TTS容器是否运行
docker ps | grep prajna-tts-server

# 2. 检查网络连接
docker exec sub-nginx ping prajna-tts-server

# 3. 检查TTS服务健康状态
docker exec sub-nginx curl http://prajna-tts-server:8000/health

# 4. 查看TTS容器日志
docker logs prajna-tts-server
```

### 3. SSL证书过期

**症状**：浏览器显示证书过期警告

**解决方案**：

```bash
# 手动更新证书
docker stop sub-nginx
sudo certbot renew
sudo cp -L /etc/letsencrypt/live/hy2.zhdnpx.cn-0001/fullchain.pem /opt/hysteria2/certs/fullchain.pem
sudo cp -L /etc/letsencrypt/live/hy2.zhdnpx.cn-0001/privkey.pem /opt/hysteria2/certs/privkey.pem
docker start sub-nginx
docker exec sub-nginx nginx -s reload
```

### 4. 配置更新后不生效

**症状**：修改了配置文件但访问时没有变化

**解决方案**：

```bash
# 1. 测试配置是否正确
docker exec sub-nginx nginx -t

# 2. 重新加载配置
docker exec sub-nginx nginx -s reload

# 3. 如果还不生效，重启容器
docker restart sub-nginx

# 4. 清除浏览器缓存
# 在浏览器中按 Ctrl+Shift+Delete 或 Ctrl+F5 强制刷新
```

### 5. 添加新域名

**步骤**：

1. 在certbot命令中添加新域名
2. 创建新的nginx配置文件
3. 重新申请证书
4. 重新加载nginx

```bash
# 1. 停止nginx
docker stop sub-nginx

# 2. 申请证书（添加新域名）
sudo certbot certonly --standalone \
  -d hy2.zhdnpx.cn \
  -d admin.hy2.zhdnpx.cn \
  -d wiki.zhdnpx.cn \
  -d py3.zhdnpx.cn \
  -d dbeaver.zhdnpx.cn \
  -d exam.zhdnpx.cn \
  -d files.zhdnpx.cn \
  -d tts.zhdnpx.cn \
  -d app.zhdnpx.cn \
  -d new-domain.zhdnpx.cn  # 新域名

# 3. 复制证书
sudo cp -L /etc/letsencrypt/live/hy2.zhdnpx.cn-0001/fullchain.pem /opt/hysteria2/certs/fullchain.pem
sudo cp -L /etc/letsencrypt/live/hy2.zhdnpx.cn-0001/privkey.pem /opt/hysteria2/certs/privkey.pem

# 4. 创建nginx配置
sudo nano /opt/nginx/conf.d/new-domain.zhdnpx.cn.conf

# 5. 启动nginx
docker start sub-nginx

# 6. 测试配置
docker exec sub-nginx nginx -t

# 7. 重新加载
docker exec sub-nginx nginx -s reload
```

## 监控和日志

### 查看访问日志

```bash
# 实时查看所有访问日志
docker logs -f sub-nginx

# 查看最近100行日志
docker logs --tail 100 sub-nginx

# 查看特定时间的日志
docker logs --since "2026-03-31T00:00:00" sub-nginx
```

### 日志格式

nginx配置了详细的日志格式，包含：
- 客户端IP
- 请求时间
- 请求方法和URL
- 响应状态码
- 响应时间
- 上游服务器响应时间

### 性能监控

```bash
# 查看nginx进程状态
docker exec sub-nginx ps aux

# 查看连接数
docker exec sub-nginx netstat -an | grep :80 | wc -l
docker exec sub-nginx netstat -an | grep :443 | wc -l

# 查看容器资源使用
docker stats sub-nginx
```

## 备份和恢复

### 备份配置文件

```bash
# 备份nginx配置
tar -czf nginx-config-backup-$(date +%Y%m%d).tar.gz /opt/nginx/

# 备份SSL证书
tar -czf ssl-certs-backup-$(date +%Y%m%d).tar.gz /opt/hysteria2/certs/
```

### 恢复配置

```bash
# 恢复nginx配置
tar -xzf nginx-config-backup-20260331.tar.gz -C /

# 恢复SSL证书
tar -xzf ssl-certs-backup-20260331.tar.gz -C /

# 重启nginx
docker restart sub-nginx
```

## 安全建议

1. **定期更新**：定期更新nginx镜像和SSL证书
2. **最小权限**：使用只读挂载（`:ro`）保护配置文件
3. **防火墙**：只开放必要的端口（80, 443）
4. **日志监控**：定期检查访问日志，发现异常访问
5. **备份**：定期备份配置文件和证书
6. **HTTPS强制**：所有HTTP请求重定向到HTTPS
7. **安全头部**：配置HSTS、CSP等安全头部

## 相关文档

- [TTS服务器部署说明](./TTS服务器部署说明.md)
- [PWA部署指南](./PWA部署指南.md)
- [快速部署指南](./快速部署指南.md)

## 联系方式

如有问题，请在GitHub项目中提交Issue：
https://github.com/mafeicnnui/PrajnaReader/issues
