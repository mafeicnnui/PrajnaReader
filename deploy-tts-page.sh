#!/bin/bash
# 部署TTS下载页面到服务器

SERVER="root@tts.zhdnpx.cn"
REMOTE_PATH="/usr/share/nginx/prajna"

echo "=== 部署TTS下载页面 ==="
echo ""

# 1. 检查本地文件
if [ ! -f "tts-server/public/index.html" ]; then
    echo "❌ 本地文件不存在: tts-server/public/index.html"
    exit 1
fi

echo "1. 上传index.html到服务器..."
scp tts-server/public/index.html ${SERVER}:${REMOTE_PATH}/index.html.new

# 2. 在服务器上备份和替换
echo ""
echo "2. 在服务器上备份和替换文件..."
ssh ${SERVER} << 'ENDSSH'
cd /usr/share/nginx/prajna

# 备份旧文件
if [ -f "index.html" ]; then
    cp index.html index.html.bak.$(date +%Y%m%d_%H%M%S)
    echo "✅ 已备份旧文件"
fi

# 替换新文件
mv index.html.new index.html
chmod 644 index.html

echo "✅ 文件已更新"
ls -lh index.html

ENDSSH

echo ""
echo "=== 部署完成 ==="
echo ""
echo "请访问 https://tts.zhdnpx.cn 测试"
