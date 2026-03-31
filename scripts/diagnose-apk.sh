#!/bin/bash
# 诊断APK下载问题

echo "=== 诊断APK下载问题 ==="
echo ""

echo "1. 检查APK文件是否存在："
echo "---"
if [ -f "/opt/nginx/prajna/downloads/Prajna-Reader.apk" ]; then
    ls -lh /opt/nginx/prajna/downloads/Prajna-Reader.apk
    echo "✅ APK文件存在"
else
    echo "❌ APK文件不存在: /opt/nginx/prajna/downloads/Prajna-Reader.apk"
fi

echo ""
echo "2. 检查目录内容："
echo "---"
ls -lh /opt/nginx/prajna/downloads/ 2>&1 || echo "目录不存在"

echo ""
echo "3. 检查nginx容器挂载："
echo "---"
docker inspect nginx-proxy | grep -A 10 "Mounts" | head -20

echo ""
echo "4. 检查nginx容器内的文件："
echo "---"
docker exec nginx-proxy ls -lh /opt/nginx/prajna/downloads/ 2>&1 || echo "容器内目录不存在"

echo ""
echo "5. 测试下载URL（本地）："
echo "---"
curl -I http://localhost/downloads/Prajna-Reader.apk 2>&1 | head -10

echo ""
echo "6. 检查nginx配置："
echo "---"
docker exec nginx-proxy cat /etc/nginx/conf.d/tts.zhdnpx.cn.conf | grep -A 15 "location /downloads/"

echo ""
echo "=== 诊断完成 ==="
