#!/bin/bash
# 更新TTS服务器的index.html

echo "=== 更新TTS下载页面 ==="
echo ""

# 1. 备份现有文件
echo "1. 备份现有文件..."
if [ -f "/usr/share/nginx/prajna/index.html" ]; then
    sudo cp /usr/share/nginx/prajna/index.html /usr/share/nginx/prajna/index.html.bak.$(date +%Y%m%d_%H%M%S)
    echo "✅ 备份完成"
else
    echo "⚠️  原文件不存在，跳过备份"
fi

# 2. 复制新文件
echo ""
echo "2. 复制新文件..."
sudo cp tts-server/public/index.html /usr/share/nginx/prajna/index.html
sudo chmod 644 /usr/share/nginx/prajna/index.html

echo "✅ 文件已更新"

# 3. 验证
echo ""
echo "3. 验证文件..."
ls -lh /usr/share/nginx/prajna/index.html

echo ""
echo "=== 更新完成 ==="
echo ""
echo "请访问 https://tts.zhdnpx.cn 测试"
