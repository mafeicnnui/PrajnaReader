# App下载页面部署说明

## 概述

在 `tts.zhdnpx.cn` 域名下部署App介绍和下载页面，用户可以通过这个页面了解App功能并下载APK。

## 页面特性

- 📱 App介绍和功能展示
- ⬇️ 直接下载APK（链接到GitHub Releases）
- 📷 二维码扫描下载
- 📚 使用说明和常见问题
- 🎨 响应式设计，支持手机和电脑访问

## 部署步骤

### 1. 创建静态文件目录

在服务器上创建目录存放页面文件：

```bash
# SSH登录到服务器
ssh user@your-server

# 创建目录
sudo mkdir -p /opt/nginx/prajna
sudo chown -R nginx:nginx /opt/nginx/prajna
sudo chmod 755 /opt/nginx/prajna
```

### 2. 上传页面文件

将页面文件上传到服务器：

```bash
# 从本地上传
scp tts-server/public/index.html user@server:/opt/nginx/prajna/

# 或者在服务器上直接创建
ssh user@server
sudo nano /opt/nginx/prajna/index.html
# 粘贴页面内容
```

### 3. 更新nginx配置

nginx配置文件已更新（`nginx-config/tts.zhdnpx.cn.conf`），需要：

1. 上传新配置：
```bash
scp nginx-config/tts.zhdnpx.cn.conf user@server:/opt/nginx/conf.d/
```

2. 更新Docker挂载（如果还没有）：
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

注意新增的挂载：`-v /opt/nginx/prajna:/usr/share/nginx/prajna:ro`

3. 测试配置：
```bash
docker exec sub-nginx nginx -t
```

4. 重新加载：
```bash
docker exec sub-nginx nginx -s reload
```

### 4. 验证部署

访问页面：
```
https://tts.zhdnpx.cn/
```

应该看到App介绍页面。

## 页面结构

```
/opt/nginx/prajna/
├── index.html          # 主页面
└── static/            # 静态资源（可选）
    ├── images/        # 截图等图片
    └── css/           # 额外的CSS（如果需要）
```

## 自定义页面

### 1. 修改App信息

编辑 `index.html`，修改以下内容：

```html
<!-- App名称 -->
<h1>般若伴读</h1>

<!-- 版本号 -->
<span class="version">v1.0.0</span>

<!-- 下载链接 -->
<a href="https://github.com/mafeicnnui/PrajnaReader/releases/latest/download/Prajna-Reader.apk">

<!-- 文件大小 -->
文件大小: 3.74 MB
```

### 2. 添加截图

1. 准备截图（建议尺寸：1080x1920或类似比例）
2. 上传到服务器：
```bash
scp screenshots/*.png user@server:/opt/nginx/prajna/static/images/
```

3. 在HTML中添加：
```html
<div class="screenshot-grid">
    <div class="screenshot">
        <img src="/static/images/screenshot1.png" alt="主界面">
    </div>
    <div class="screenshot">
        <img src="/static/images/screenshot2.png" alt="阅读界面">
    </div>
</div>
```

### 3. 修改颜色主题

在 `<style>` 标签中修改：

```css
/* 主色调 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 可以改为其他颜色，例如： */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
```

## GitHub Releases配置

### 1. 自动发布APK

在项目中添加GitHub Actions工作流：

创建 `.github/workflows/build-apk.yml`：

```yaml
name: Build Android APK

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd prajna-buddy
          npm install
      
      - name: Build
        run: |
          cd prajna-buddy
          npm run build
      
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'
      
      - name: Build APK
        run: |
          cd prajna-buddy
          npx cap sync android
          cd android
          ./gradlew assembleRelease
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: prajna-buddy/android/app/build/outputs/apk/release/app-release.apk
          name: Prajna Reader ${{ github.ref_name }}
          body: |
            ## 般若伴读 ${{ github.ref_name }}
            
            ### 下载
            - [下载 APK](https://github.com/${{ github.repository }}/releases/download/${{ github.ref_name }}/app-release.apk)
            
            ### 更新内容
            请查看提交记录
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 2. 手动上传APK

1. 在GitHub项目页面，点击 "Releases"
2. 点击 "Create a new release"
3. 填写版本号（如 v1.0.0）
4. 上传APK文件
5. 填写更新说明
6. 点击 "Publish release"

### 3. 获取下载链接

发布后，下载链接格式为：
```
https://github.com/用户名/项目名/releases/download/版本号/文件名.apk

例如：
https://github.com/mafeicnnui/PrajnaReader/releases/download/v1.0.0/Prajna-Reader.apk

或使用latest自动指向最新版本：
https://github.com/mafeicnnui/PrajnaReader/releases/latest/download/Prajna-Reader.apk
```

## 更新页面

### 方式1: 直接编辑

```bash
ssh user@server
sudo nano /opt/nginx/prajna/index.html
# 修改内容
# 保存退出

# 不需要重启nginx，静态文件会立即生效
```

### 方式2: 重新上传

```bash
# 本地修改后上传
scp tts-server/public/index.html user@server:/opt/nginx/prajna/
```

## 监控和统计

### 1. 查看访问日志

```bash
# 查看页面访问
docker logs sub-nginx 2>&1 | grep "GET / "

# 查看下载点击（如果配置了统计）
docker logs sub-nginx 2>&1 | grep "download"
```

### 2. 添加Google Analytics（可选）

在 `</head>` 前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. 添加下载统计

可以使用第三方服务（如umami、plausible）或自建统计系统。

## 测试清单

部署后测试：

- [ ] 访问 `https://tts.zhdnpx.cn/` 显示页面
- [ ] 页面在手机上显示正常
- [ ] 页面在电脑上显示正常
- [ ] 下载按钮可以点击
- [ ] 二维码可以扫描
- [ ] 二维码扫描后可以下载APK
- [ ] TTS API仍然正常工作（`https://tts.zhdnpx.cn/health`）
- [ ] 所有链接都可以正常访问

## 故障排查

### 问题1: 页面404

检查：
```bash
# 检查文件是否存在
docker exec sub-nginx ls -l /usr/share/nginx/prajna/

# 检查nginx配置
docker exec sub-nginx cat /etc/nginx/conf.d/tts.zhdnpx.cn.conf | grep "location = /"
```

### 问题2: 页面显示但样式错乱

- 检查HTML文件是否完整
- 检查浏览器控制台是否有错误
- 清除浏览器缓存

### 问题3: 二维码不显示

- 检查网络连接（需要加载CDN资源）
- 检查浏览器控制台错误
- 可以使用本地qrcode.js文件

### 问题4: 下载链接失效

- 检查GitHub Release是否存在
- 检查APK文件名是否正确
- 尝试访问链接查看具体错误

## 优化建议

### 1. 添加CDN加速

使用Cloudflare或其他CDN服务加速页面访问。

### 2. 压缩资源

```bash
# 启用gzip压缩（nginx配置）
gzip on;
gzip_types text/html text/css application/javascript;
```

### 3. 添加缓存

```nginx
location = / {
    root /usr/share/nginx/prajna;
    index index.html;
    expires 1h;
    add_header Cache-Control "public";
}
```

### 4. 添加更多功能

- 版本历史
- 用户评价
- 使用教程视频
- 在线预览（Web版）

## 相关文档

- [TTS服务器部署说明](./TTS服务器部署说明.md)
- [音频文件服务器部署说明](./音频文件服务器部署说明.md)
- [Nginx配置说明](../nginx-config/README.md)
