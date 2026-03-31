#!/bin/bash
# 修复APK下载问题

echo "=== 修复APK下载问题 ==="
echo ""

NGINX_CONTAINER="sub-nginx"

echo "1. 检查nginx容器挂载："
echo "---"
docker inspect ${NGINX_CONTAINER} | grep -A 20 "Mounts"

echo ""
echo "2. 检查nginx容器内的目录："
echo "---"
docker exec ${NGINX_CONTAINER} ls -lh /opt/nginx/prajna/downloads/ 2>&1

echo ""
echo "3. 检查nginx配置文件："
echo "---"
docker exec ${NGINX_CONTAINER} cat /etc/nginx/conf.d/tts.zhdnpx.cn.conf | grep -A 15 "location /downloads/"

echo ""
echo "4. 检查/usr/share/nginx/prajna目录："
echo "---"
docker exec ${NGINX_CONTAINER} ls -lh /usr/share/nginx/prajna/ 2>&1

echo ""
echo "=== 诊断完成 ==="
echo ""
echo "如果容器内没有挂载 /opt/nginx/prajna，需要重新创建容器并挂载该目录"
