# APK代理下载部署说明

## 问题背景

国内用户无法直接从GitHub下载APK文件，需要翻墙。为了解决这个问题，我们在美国云主机上部署APK代理下载服务。

## 解决方案

通过定时任务从GitHub同步APK到云主机，用户直接从云主机下载，无需翻墙。

## 架构说明

```
GitHub Release (APK源)
    ↓ (定时同步，每天凌晨2点)
宿主机 /opt/nginx/prajna/downloads/ (宿主机文件系统)
    ↓ (nginx容器挂载该目录)
nginx容器 /usr/share/nginx/prajna/downloads/
    ↓ (nginx提供下载)
用户手机 (无需翻墙)
```

**重要说明**：
- TTS服务运行在容器中（`/opt/tts-server`）
- APK同步脚本运行在宿主机上（不在容器中）
- APK文件存储在宿主机的 `/opt/nginx/prajna/downloads/`
- nginx容器通过挂载访问该目录

## 部署步骤

### 0. 确认目录结构

在服务器上确认目录：
```bash
# TTS服务代码（容器中运行）
ls /opt/tts-server

# nginx配置和静态文件（宿主机）
ls /opt/nginx/prajna
```

### 1. 上传脚本到服务器

```bash
# 在本地
cd PrajnaReader
git pull

# 上传脚本到服务器（注意：上传到宿主机，不是容器）
scp tts-server/sync_apk.sh root@your-server:/root/
scp tts-server/setup_apk_sync.sh root@your-server:/root/
```

### 2. 在服务器上执行设置脚本

```bash
# SSH到服务器
ssh root@your-server

# 进入目录
cd /root

# 给脚本执行权限
chmod +x sync_apk.sh setup_apk_sync.sh

# 执行设置脚本（在宿主机上运行，不是容器中）
./setup_apk_sh
```

这个脚本会：
- 在宿主机上创建 `/opt/nginx/prajna/downloads/` 目录
- 复制同步脚本到 `/usr/local/bin/sync_apk.sh`
- 执行首次APK同步（从GitHub下载到宿主机）
- 设置定时任务（在宿主机的crontab中）

### 3. 确认nginx容器挂载

检查nginx容器是否已挂载 `/opt/nginx/prajna` 目录：

```bash
# 检查容器挂载
docker inspect sub-nginx | grep prajna

# 应该看到类似：
# "/opt/nginx/prajna:/usr/share/nginx/prajna:ro"
```

如果没有挂载，需要重新创建nginx容器：

```bash
docker stop sub-nginx
docker rm sub-nginx

docker run -d \
  --name sub-nginx \
  --restart unless-stopped \
  --network web \
  -p 80:80/tcp \
  -p 443:443/tcp \
  -v /opt/nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
  -v /opt/nginx/conf.d:/etc/nginx/conf.d:ro \
  -v /opt/nginx/prajna:/usr/share/nginx/prajna:ro \
  -v /opt/subscription/www:/usr/share/nginx/html:ro \
  -v /opt/hysteria2/certs:/certs:ro \
  nginx:alpine
```

**注意**：`/opt/nginx/prajna` 目录包含：
- `index.html` - 下载页面
- `downloads/` - APK文件目录
- `static/` - 其他静态资源（如果有）

### 4. 更新nginx配置

```bash
# 更新配置文件（在宿主机上）
cp /root/PrajnaReader/nginx-config/tts.zhdnpx.cn.conf /opt/nginx/conf.d/

# 测试配置
docker exec sub-nginx nginx -t

# 重新加载
docker exec sub-nginx nginx -s reload
```

### 5. 更新下载页面

```bash
# 更新页面（在宿主机上）
cp /root/PrajnaReader/tts-server/public/index.html /opt/nginx/prajna/
```

### 6. 验证部署

```bash
# 1. 检查APK文件是否存在（宿主机）
ls -lh /opt/nginx/prajna/downloads/Prajna-Reader.apk

# 2. 检查容器内是否能访问
docker exec sub-nginx ls -lh /usr/share/nginx/prajna/downloads/Prajna-Reader.apk

# 3. 测试下载
curl -I https://tts.zhdnpx.cn/downloads/Prajna-Reader.apk

# 应该返回 200 OK 和文件大小信息

# 4. 测试完整下载
curl -o test.apk https://tts.zhdnpx.cn/downloads/Prajna-Reader.apk
ls -lh test.apk
rm test.apk
```

## 目录结构说明

```
宿主机:
/opt/
├── tts-server/              # TTS服务代码（容器运行）
│   ├── main.py
│   ├── cache/
│   └── data/
├── nginx/
│   ├── nginx.conf
│   ├── conf.d/
│   │   └── tts.zhdnpx.cn.conf
│   └── prajna/              # 静态文件目录（挂载到nginx容器）
│       ├── index.html       # 下载页面
│       ├── downloads/       # APK下载目录
│       │   └── Prajna-Reader.apk
│       └── static/          # 其他静态资源
└── hysteria2/
    └── certs/

nginx容器内:
/usr/share/nginx/prajna/     # 挂载自宿主机 /opt/nginx/prajna
├── index.html
├── downloads/
│   └── Prajna-Reader.apk
└── static/
```

## 使用说明

### 手动同步APK

如果发布了新版本，想立即同步：

```bash
sudo /usr/local/bin/sync_apk.sh
```

### 查看同步日志

```bash
tail -f /var/log/apk-sync.log
```

### 查看定时任务

```bash
crontab -l
```

### 修改同步时间

```bash
# 编辑crontab
crontab -e

# 修改时间（例如改为每天凌晨3点）
0 3 * * * /usr/local/bin/sync_apk.sh
```

## 下载地址

- 网页下载：https://tts.zhdnpx.cn/
- 直接下载：https://tts.zhdnpx.cn/downloads/Prajna-Reader.apk
- 二维码：扫描页面上的二维码

## 优势

1. ✅ 国内用户无需翻墙即可下载
2. ✅ 下载速度快（美国服务器带宽好）
3. ✅ 自动同步最新版本
4. ✅ 支持断点续传
5. ✅ 稳定可靠

## 监控和维护

### 检查同步状态

```bash
# 查看最后一次同步时间
ls -lh /opt/nginx/prajna/downloads/Prajna-Reader.apk

# 查看同步日志
tail -20 /var/log/apk-sync.log
```

### 磁盘空间

APK文件约4MB，不会占用太多空间。如果需要清理旧版本：

```bash
# 只保留最新版本（脚本已自动处理）
ls -lh /opt/nginx/prajna/downloads/
```

### 故障排查

#### 问题1: 同步失败

```bash
# 查看日志
tail -50 /var/log/apk-sync.log

# 手动测试下载
curl -L -I https://github.com/mafeicnnui/PrajnaReader/releases/latest/download/Prajna-Reader.apk

# 检查网络
ping github.com
```

#### 问题2: 下载404

```bash
# 检查文件是否存在
ls -l /opt/nginx/prajna/downloads/Prajna-Reader.apk

# 检查nginx配置
docker exec sub-nginx cat /etc/nginx/conf.d/tts.zhdnpx.cn.conf | grep downloads

# 检查权限
ls -la /opt/nginx/prajna/downloads/
```

#### 问题3: 定时任务不执行

```bash
# 检查cron服务
systemctl status cron

# 查看cron日志
grep CRON /var/log/syslog

# 手动执行测试
/usr/local/bin/sync_apk.sh
```

## 高级配置

### 配置代理（如果服务器需要）

编辑 `/usr/local/bin/sync_apk.sh`，在curl命令中添加代理：

```bash
curl -x http://proxy.example.com:7890 -L -o "$TEMP_FILE" "$DOWNLOAD_URL"
```

### 同步多个版本

如果需要保留历史版本：

```bash
# 修改脚本，添加版本号
APK_NAME="Prajna-Reader-v1.0.0.apk"
```

### 添加下载统计

可以在nginx配置中添加日志分析：

```nginx
location /downloads/ {
    alias /opt/nginx/prajna/downloads/;
    access_log /var/log/nginx/downloads.log;
    # ...
}
```

然后分析下载次数：

```bash
grep "Prajna-Reader.apk" /var/log/nginx/downloads.log | wc -l
```

## 更新流程

当发布新版本时：

1. 在GitHub上创建新的Release
2. 等待定时任务自动同步（凌晨2点）
3. 或手动执行同步：`sudo /usr/local/bin/sync_apk.sh`
4. 更新下载页面的版本号信息

## 安全考虑

1. APK文件只读权限（644）
2. 同步脚本需要root权限
3. 定期检查文件完整性
4. 建议配置HTTPS（已配置）

## 成本分析

- 存储空间：约4MB/版本
- 带宽消耗：取决于下载次数
- 维护成本：几乎为零（自动化）

## 相关文档

- [GitHub Release发布指南](./GitHub_Release发布指南.md)
- [App下载页面部署说明](./App下载页面部署说明.md)
- [TTS服务器部署说明](./TTS服务器部署说明.md)

---

最后更新：2026年3月27日
