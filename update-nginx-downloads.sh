#!/bin/bash
# 更新nginx配置以修复APK下载路径

echo "=== 更新nginx配置 ==="
echo ""

NGINX_CONTAINER="sub-nginx"
CONFIG_FILE="/opt/nginx/conf.d/tts.zhdnpx.cn.conf"

echo "1. 备份当前配置..."
cp ${CONFIG_FILE} ${CONFIG_FILE}.bak.$(date +%Y%m%d_%H%M%S)
echo "✅ 备份完成"

echo ""
echo "2. 下载最新配置..."
curl -L -o ${CONFIG_FILE} https://raw.githubusercontent.com/mafeicnnui/PrajnaReader/main/nginx-config/tts.zhdnpx.cn.conf
echo "✅ 配置已更新"

echo ""
echo "3. 验证nginx配置..."
docker exec ${NGINX_CONTAINER} nginx -t

if [ $? -eq 0 ]; then
    echo "✅ 配置验证通过"
    
    echo ""
    echo "4. 重新加载nginx..."
    docker exec ${NGINX_CONTAINER} nginx -s reload
    echo "✅ nginx已重新加载"
    
    echo ""
    echo "5. 测试下载链接..."
    sleep 2
    curl -I https://tts.zhdnpx.cn/downloads/Prajna-Reader.apk 2>&1 | head -15
else
    echo "❌ 配置验证失败，恢复备份"
    cp ${CONFIG_FILE}.bak.* ${CONFIG_FILE}
    exit 1
fi

echo ""
echo "=== 更新完成 ==="
echo ""
echo "请访问 https://tts.zhdnpx.cn 测试下载"
