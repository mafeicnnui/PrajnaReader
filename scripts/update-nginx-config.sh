#!/bin/bash
# 更新nginx配置的步骤

echo "=== 步骤1: 备份当前配置 ==="
cp /opt/nginx/conf.d/tts.zhdnpx.cn.conf /opt/nginx/conf.d/tts.zhdnpx.cn.conf.backup.$(date +%Y%m%d_%H%M%S)

echo -e "\n=== 步骤2: 从本地上传新配置 ==="
echo "请在本地执行："
echo "scp nginx-config/tts.zhdnpx.cn.conf root@your-server:/opt/nginx/conf.d/"

echo -e "\n=== 步骤3: 验证配置 ==="
echo "docker exec sub-nginx nginx -t"

echo -e "\n=== 步骤4: 重新加载nginx ==="
echo "docker exec sub-nginx nginx -s reload"

echo -e "\n=== 步骤5: 验证访问 ==="
echo "curl -I https://tts.zhdnpx.cn/"
