#!/bin/bash
# 检查APK下载配置

echo "=== 检查APK文件 ==="
echo ""

echo "1. 检查本地APK文件："
if [ -f "/opt/nginx/prajna/downloads/Prajna-Reader.apk" ]; then
    ls -lh /opt/nginx/prajna/downloads/Prajna-Reader.apk
    echo "✅ APK文件存在"
else
    echo "❌ APK文件不存在"
fi

echo ""
echo "2. 测试下载链接（HTTP）："
curl -I http://tts.zhdnpx.cn/downloads/Prajna-Reader.apk 2>&1 | head -20

echo ""
echo "3. 测试下载链接（HTTPS）："
curl -I https://tts.zhdnpx.cn/downloads/Prajna-Reader.apk 2>&1 | head -20

echo ""
echo "4. 检查nginx配置："
docker exec nginx-proxy cat /etc/nginx/conf.d/tts.zhdnpx.cn.conf | grep -A 10 "location /downloads/"

echo ""
echo "5. 检查nginx容器中的文件："
docker exec nginx-proxy ls -lh /opt/nginx/prajna/downloads/ 2>&1

echo ""
echo "=== 检查完成 ==="
