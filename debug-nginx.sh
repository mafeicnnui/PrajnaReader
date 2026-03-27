#!/bin/bash
# Nginx 404错误排查脚本

echo "=== 1. 检查文件是否存在 ==="
docker exec sub-nginx ls -la /usr/share/nginx/prajna/

echo -e "\n=== 2. 检查nginx配置中的根路径配置 ==="
docker exec sub-nginx cat /etc/nginx/conf.d/tts.zhdnpx.cn.conf | grep -A 5 "location = /"

echo -e "\n=== 3. 检查nginx配置语法 ==="
docker exec sub-nginx nginx -t

echo -e "\n=== 4. 检查nginx错误日志 ==="
docker logs sub-nginx 2>&1 | tail -20

echo -e "\n=== 5. 测试从容器内部访问文件 ==="
docker exec sub-nginx cat /usr/share/nginx/prajna/index.html | head -20

echo -e "\n=== 6. 检查文件权限 ==="
docker exec sub-nginx stat /usr/share/nginx/prajna/index.html

echo -e "\n=== 7. 测试curl访问 ==="
curl -I https://tts.zhdnpx.cn/

echo -e "\n=== 8. 检查完整的location配置 ==="
docker exec sub-nginx cat /etc/nginx/conf.d/tts.zhdnpx.cn.conf | grep -B 2 -A 10 "location"
