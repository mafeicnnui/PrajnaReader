#!/bin/bash
# 检查500错误的原因

echo "=== 1. 查看nginx错误日志 ==="
docker logs sub-nginx 2>&1 | tail -30

echo -e "\n=== 2. 检查文件是否存在 ==="
docker exec sub-nginx ls -la /usr/share/nginx/prajna/

echo -e "\n=== 3. 检查文件内容 ==="
docker exec sub-nginx head -5 /usr/share/nginx/prajna/index.html

echo -e "\n=== 4. 检查根路径配置 ==="
docker exec sub-nginx cat /etc/nginx/conf.d/tts.zhdnpx.cn.conf | grep -A 5 "location = /"

echo -e "\n=== 5. 测试从容器内访问文件 ==="
docker exec sub-nginx cat /usr/share/nginx/prajna/index.html > /dev/null && echo "文件可读" || echo "文件不可读"

echo -e "\n=== 6. 检查文件权限 ==="
docker exec sub-nginx stat /usr/share/nginx/prajna/index.html
