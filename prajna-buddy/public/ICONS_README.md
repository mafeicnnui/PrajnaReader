# PWA图标生成说明

## 需要的图标

1. `pwa-192x192.png` - 192x192像素
2. `pwa-512x512.png` - 512x512像素
3. `maskable-icon-512x512.png` - 512x512像素（带安全区）
4. `apple-touch-icon.png` - 180x180像素（iOS）
5. `favicon.ico` - 32x32像素

## 快速生成方法

### 方法1: 使用在线工具（推荐）

访问：https://realfavicongenerator.net/

1. 上传一张512x512的PNG图片（建议使用🙏emoji或佛教图标）
2. 选择所有平台
3. 下载生成的图标包
4. 将文件复制到 `public/` 目录

### 方法2: 使用PWA Asset Generator

```bash
npm install -g pwa-asset-generator

# 准备一张1024x1024的源图片 source.png
pwa-asset-generator source.png public/ --icon-only --favicon
```

### 方法3: 手动创建（临时方案）

如果暂时没有设计资源，可以使用emoji：

1. 访问：https://favicon.io/emoji-favicons/folded-hands/
2. 下载🙏（祈祷）emoji图标
3. 重命名文件：
   - `android-chrome-192x192.png` → `pwa-192x192.png`
   - `android-chrome-512x512.png` → `pwa-512x512.png`
   - `apple-touch-icon.png` → `apple-touch-icon.png`
   - `favicon.ico` → `favicon.ico`

## 图标设计建议

### 主图标（pwa-192x192.png, pwa-512x512.png）
- 使用🙏emoji或佛教相关图标
- 背景色：#667eea（紫色渐变）
- 图标颜色：白色或金色
- 简洁明了，易于识别

### Maskable图标（maskable-icon-512x512.png）
- 在512x512画布上
- 主要内容在中心320x320区域内（安全区）
- 四周留白，避免被裁切
- 背景填充满整个画布

### iOS图标（apple-touch-icon.png）
- 180x180像素
- 圆角会自动添加，设计时使用方形
- 避免使用透明背景

## 当前状态

⚠️ 需要创建以下图标文件：
- [ ] pwa-192x192.png
- [ ] pwa-512x512.png
- [ ] maskable-icon-512x512.png
- [ ] apple-touch-icon.png
- [ ] favicon.ico

## 临时解决方案

在图标准备好之前，可以先使用文字图标：

```bash
# 使用ImageMagick创建临时图标
convert -size 512x512 xc:#667eea -gravity center -pointsize 200 -fill white -annotate +0+0 "🙏" pwa-512x512.png
convert pwa-512x512.png -resize 192x192 pwa-192x192.png
convert pwa-512x512.png -resize 180x180 apple-touch-icon.png
```

或者使用在线工具快速生成：
https://www.favicon-generator.org/
