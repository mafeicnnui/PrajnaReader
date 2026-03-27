#!/bin/bash
# 从Android项目复制图标到PWA

echo "=== 从Android复制图标到PWA ==="
echo ""

# Android图标路径
ANDROID_ICON_XXXHDPI="android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png"
ANDROID_ICON_XXHDPI="android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png"

# PWA目标路径
PUBLIC_DIR="public"

# 检查Android图标是否存在
if [ ! -f "$ANDROID_ICON_XXXHDPI" ]; then
    echo "❌ 找不到Android图标: $ANDROID_ICON_XXXHDPI"
    exit 1
fi

echo "✅ 找到Android图标"

# 复制图标
echo ""
echo "复制图标文件..."

# 1. 复制xxxhdpi (192x192) 作为 pwa-192x192.png
if [ -f "$ANDROID_ICON_XXXHDPI" ]; then
    cp "$ANDROID_ICON_XXXHDPI" "$PUBLIC_DIR/pwa-192x192.png"
    echo "✅ pwa-192x192.png"
fi

# 2. 复制xxxhdpi作为512x512的基础（需要用工具调整大小，或直接使用）
cp "$ANDROID_ICON_XXXHDPI" "$PUBLIC_DIR/pwa-512x512.png"
echo "✅ pwa-512x512.png (使用xxxhdpi图标)"

# 3. 复制作为maskable图标
cp "$ANDROID_ICON_XXXHDPI" "$PUBLIC_DIR/maskable-icon-512x512.png"
echo "✅ maskable-icon-512x512.png"

# 4. 复制作为iOS图标 (180x180)
cp "$ANDROID_ICON_XXXHDPI" "$PUBLIC_DIR/apple-touch-icon.png"
echo "✅ apple-touch-icon.png"

# 5. 如果有favicon，也复制
if [ -f "android/app/src/main/res/mipmap-mdpi/ic_launcher.png" ]; then
    cp "android/app/src/main/res/mipmap-mdpi/ic_launcher.png" "$PUBLIC_DIR/favicon.png"
    echo "✅ favicon.png"
fi

echo ""
echo "=== 图标复制完成 ==="
echo ""
echo "已创建的文件："
ls -lh "$PUBLIC_DIR"/*.png 2>/dev/null | grep -E "(pwa|apple|favicon|maskable)"

echo ""
echo "⚠️  注意："
echo "1. 如果图标尺寸不是512x512，建议使用图片编辑工具调整"
echo "2. maskable图标建议添加安全区（中心内容在320x320区域内）"
echo "3. 可以使用在线工具优化图标："
echo "   https://realfavicongenerator.net/"
echo ""
echo "现在可以构建PWA了："
echo "  npm run build"
