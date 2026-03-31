#!/bin/bash
# 在服务器上运行此脚本来更新TTS下载页面

echo "=== 更新TTS下载页面 ==="
echo ""

# GitHub原始文件URL
GITHUB_RAW_URL="https://raw.githubusercontent.com/mafeicnnui/PrajnaReader/main/tts-server/public/index.html"
TARGET_DIR="/usr/share/nginx/prajna"
TARGET_PATH="${TARGET_DIR}/index.html"

# 0. 创建目录
echo "0. 检查并创建目录..."
if [ ! -d "$TARGET_DIR" ]; then
    mkdir -p "$TARGET_DIR"
    echo "✅ 目录已创建: $TARGET_DIR"
else
    echo "✅ 目录已存在: $TARGET_DIR"
fi

# 1. 备份现有文件
echo ""
echo "1. 备份现有文件..."
if [ -f "$TARGET_PATH" ]; then
    cp "$TARGET_PATH" "${TARGET_PATH}.bak.$(date +%Y%m%d_%H%M%S)"
    echo "✅ 备份完成"
else
    echo "⚠️  原文件不存在，跳过备份"
fi

# 2. 下载最新文件
echo ""
echo "2. 从GitHub下载最新文件..."
if curl -L -o "${TARGET_PATH}.new" "$GITHUB_RAW_URL"; then
    echo "✅ 下载成功"
else
    echo "❌ 下载失败"
    exit 1
fi

# 3. 替换文件
echo ""
echo "3. 替换文件..."
mv "${TARGET_PATH}.new" "$TARGET_PATH"
chmod 644 "$TARGET_PATH"

echo "✅ 文件已更新"

# 4. 验证
echo ""
echo "4. 验证文件..."
ls -lh "$TARGET_PATH"

echo ""
echo "=== 更新完成 ==="
echo ""
echo "请访问 https://tts.zhdnpx.cn 测试（可能需要强制刷新 Ctrl+F5）"
