# PWA部署指南

## 概述

将般若伴读配置为PWA（渐进式Web应用），支持iOS和Android用户直接通过浏览器使用，无需下载安装。

## 已完成的配置

✅ 安装vite-plugin-pwa插件
✅ 配置vite.config.ts
✅ 创建manifest.json
✅ 更新index.html元数据
✅ 配置Service Worker缓存策略

## 部署步骤

### 1. 安装依赖

```bash
cd prajna-buddy
npm install
```

这会安装新添加的 `vite-plugin-pwa` 插件。

### 2. 准备PWA图标

需要创建以下图标文件并放到 `prajna-buddy/public/` 目录：

- `pwa-192x192.png` (192x192像素)
- `pwa-512x512.png` (512x512像素)
- `maskable-icon-512x512.png` (512x512像素，带安全区)
- `apple-touch-icon.png` (180x180像素)
- `favicon.ico` (32x32像素)

#### 快速生成图标

**方法1: 使用在线工具（推荐）**

1. 访问：https://realfavicongenerator.net/
2. 上传一张512x512的图片（可以使用🙏emoji）
3. 下载生成的图标包
4. 将文件复制到 `prajna-buddy/public/`

**方法2: 使用emoji图标（临时方案）**

1. 访问：https://favicon.io/emoji-favicons/folded-hands/
2. 下载🙏emoji图标包
3. 重命名并复制到 `public/` 目录

详细说明见：`prajna-buddy/public/ICONS_README.md`

### 3. 构建PWA

```bash
cd prajna-buddy
npm run build
```

构建完成后，`dist/` 目录包含：
- 所有静态文件
- Service Worker (sw.js)
- Workbox配置
- PWA manifest

### 4. 部署到服务器

#### 方案A: 部署到独立域名（推荐）

```bash
# 在服务器上创建目录
ssh root@your-server
mkdir -p /opt/nginx/app

# 从本地上传构建文件
cd prajna-buddy
scp -r dist/* root@your-server:/opt/nginx/app/
```

#### 方案B: 部署到子目录

```bash
# 上传到现有网站的子目录
scp -r dist/* root@your-server:/opt/nginx/prajna/app/
```

### 5. 配置nginx

#### 独立域名配置（app.zhdnpx.cn）

创建 `nginx-config/app.zhdnpx.cn.conf`：

```nginx
# HTTP重定向到HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name app.zhdnpx.cn;
    return 301 https://$server_name$request_uri;
}

# HTTPS服务器
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name app.zhdnpx.cn;

    # SSL证书
    ssl_certificate /certs/fullchain.pem;
    ssl_certificate_key /certs/privkey.pem;
    
    # SSL优化
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # 根目录
    root /usr/share/nginx/app;
    index index.html;

    # PWA相关头部
    add_header Cache-Control "public, max-age=0, must-revalidate" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Service Worker必须使用正确的MIME类型
    location ~ ^/(sw|workbox|manifest).*\.(js|json)$ {
        add_header Cache-Control "public, max-age=0, must-revalidate" always;
        add_header Service-Worker-Allowed "/" always;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 安全配置
    location ~ /\. {
        deny all;
    }
}
```

上传并应用配置：

```bash
# 上传配置
scp nginx-config/app.zhdnpx.cn.conf root@your-server:/opt/nginx/conf.d/

# 测试配置
docker exec sub-nginx nginx -t

# 重新加载
docker exec sub-nginx nginx -s reload
```

#### 更新nginx容器挂载

如果nginx容器还没有挂载 `/opt/nginx/app`：

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
  -v /opt/nginx/app:/usr/share/nginx/app:ro \
  -v /opt/subscription/www:/usr/share/nginx/html:ro \
  -v /opt/hysteria2/certs:/certs:ro \
  nginx:alpine
```

### 6. 配置DNS

添加A记录：
```
app.zhdnpx.cn  →  服务器IP
```

### 7. 验证部署

```bash
# 测试HTTPS访问
curl -I https://app.zhdnpx.cn

# 检查Service Worker
curl https://app.zhdnpx.cn/sw.js

# 检查manifest
curl https://app.zhdnpx.cn/manifest.json
```

## 用户使用指南

### iOS用户

1. 使用Safari浏览器访问：`https://app.zhdnpx.cn`
2. 点击底部的"分享"按钮（方框带向上箭头）
3. 向下滚动，选择"添加到主屏幕"
4. 点击"添加"
5. 在主屏幕上会出现"般若伴读"图标
6. 点击图标即可使用，体验类似原生App

### Android用户

1. 使用Chrome浏览器访问：`https://app.zhdnpx.cn`
2. 浏览器会自动提示"添加到主屏幕"
3. 点击"安装"或"添加"
4. 在主屏幕上会出现"般若伴读"图标
5. 点击图标即可使用

### 桌面用户

1. 使用Chrome/Edge浏览器访问：`https://app.zhdnpx.cn`
2. 地址栏右侧会出现"安装"图标
3. 点击安装
4. 可以像桌面应用一样使用

## 更新下载页面

在 `tts-server/public/index.html` 中添加iOS支持说明：

```html
<!-- 在下载区域后添加 -->
<div class="info-section">
    <h2>📱 iOS用户</h2>
    <p>iOS用户可以通过PWA方式使用：</p>
    <ol style="margin-left: 30px; line-height: 2;">
        <li>使用Safari浏览器访问：<a href="https://app.zhdnpx.cn" target="_blank">https://app.zhdnpx.cn</a></li>
        <li>点击底部"分享"按钮</li>
        <li>选择"添加到主屏幕"</li>
        <li>点击"添加"</li>
        <li>在主屏幕上打开"般若伴读"</li>
    </ol>
    <p style="margin-top: 20px;">
        <strong>优势：</strong>无需下载安装，直接使用，体验类似原生App！
    </p>
</div>
```

## PWA功能特性

### ✅ 已实现

- 离线访问（Service Worker缓存）
- 添加到主屏幕
- 全屏显示（无浏览器地址栏）
- 启动画面
- 音频缓存（TTS API响应）
- 自动更新

### ⚠️ 限制

- iOS不支持后台音频播放（需要保持App在前台）
- iOS不支持推送通知
- 部分原生功能受限

### 💡 优化建议

- 音频播放时提示用户保持App在前台
- 使用Web Audio API优化音频体验
- 添加离线提示

## 监控和维护

### 检查Service Worker状态

在浏览器开发者工具中：
1. 打开 Application/应用程序 标签
2. 查看 Service Workers
3. 确认状态为 "activated and running"

### 查看缓存

1. 打开 Application/应用程序 标签
2. 查看 Cache Storage
3. 应该看到：
   - workbox-precache（静态资源）
   - tts-audio-cache（音频缓存）
   - api-cache（API响应）

### 更新PWA

当发布新版本时：
1. 构建新版本：`npm run build`
2. 上传到服务器
3. Service Worker会自动检测更新
4. 用户下次访问时自动更新

### 强制更新

如果需要立即更新所有用户：
1. 修改 `vite.config.ts` 中的版本号
2. 重新构建和部署
3. Service Worker会在后台更新

## 测试清单

部署后测试：

- [ ] HTTPS访问正常
- [ ] manifest.json可访问
- [ ] Service Worker注册成功
- [ ] 图标显示正常
- [ ] iOS Safari可以"添加到主屏幕"
- [ ] Android Chrome可以安装
- [ ] 离线模式可以访问
- [ ] 音频可以播放和缓存
- [ ] 页面路由正常工作
- [ ] 更新机制正常

## 故障排查

### 问题1: Service Worker注册失败

检查：
- HTTPS是否正确配置
- sw.js文件是否可访问
- 浏览器控制台错误信息

### 问题2: 无法添加到主屏幕

检查：
- manifest.json是否正确
- 图标文件是否存在
- HTTPS是否启用

### 问题3: 离线不工作

检查：
- Service Worker是否激活
- 缓存策略是否正确
- 网络请求是否被缓存

### 问题4: iOS不显示图标

检查：
- apple-touch-icon.png是否存在
- 图标尺寸是否正确（180x180）
- meta标签是否正确

## 性能优化

### 预缓存策略

- 静态资源：precache（构建时缓存）
- TTS音频：CacheFirst（优先使用缓存）
- API请求：NetworkFirst（优先使用网络）

### 缓存大小控制

- 音频缓存：最多100个文件，7天过期
- API缓存：最多50个响应，1天过期

### 更新策略

- 自动更新：检测到新版本自动下载
- 用户无感知：后台更新，下次访问生效

## 相关资源

- [PWA文档](https://web.dev/progressive-web-apps/)
- [Vite PWA插件](https://vite-pwa-org.netlify.app/)
- [Workbox文档](https://developers.google.com/web/tools/workbox)
- [iOS PWA支持](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

---

最后更新：2026年3月27日
