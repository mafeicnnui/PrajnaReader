#!/bin/bash

# iOS音频播放问题快速修复脚本
# 用途：更新Nginx配置以支持iOS PWA音频播放

set -e

echo "=== iOS音频播放问题修复脚本 ==="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否在正确的目录
if [ ! -f "nginx-config/tts.zhdnpx.cn.conf" ]; then
    echo -e "${RED}错误: 请在项目根目录运行此脚本${NC}"
    exit 1
fi

echo -e "${YELLOW}步骤1: 备份当前Nginx配置${NC}"
cp nginx-config/tts.zhdnpx.cn.conf nginx-config/tts.zhdnpx.cn.conf.backup.$(date +%Y%m%d_%H%M%S)
echo -e "${GREEN}✓ 配置已备份${NC}"
echo ""

echo -e "${YELLOW}步骤2: 更新CORS配置以支持iOS PWA${NC}"
# 这里我们需要手动编辑配置文件
cat > /tmp/nginx_cors_fix.txt << 'EOF'

请手动更新 nginx-config/tts.zhdnpx.cn.conf 中的CORS配置：

在 server { ... } 块中，将：
    add_header 'Access-Control-Allow-Origin' '*' always;

替换为：
    # iOS PWA需要明确的域名
    set $cors_origin "";
    if ($http_origin ~* "^https://(app|tts|files)\.zhdnpx\.cn$") {
        set $cors_origin $http_origin;
    }
    add_header 'Access-Control-Allow-Origin' $cors_origin always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;

并确保 Access-Control-Expose-Headers 包含所有必要的头部：
    add_header 'Access-Control-Expose-Headers' 'Content-Length, Content-Range, Content-Type, Accept-Ranges' always;

EOF

cat /tmp/nginx_cors_fix.txt
echo ""

echo -e "${YELLOW}步骤3: 检查TTS服务器配置${NC}"
echo "请确保 tts-server 的CORS配置也已更新"
echo "参考文档: docs/iOS测试问题修复方案.md"
echo ""

echo -e "${YELLOW}步骤4: 重启Nginx服务${NC}"
echo "运行以下命令重启Nginx:"
echo "  docker restart nginx-proxy"
echo "或者:"
echo "  ./update-nginx-config.sh"
echo ""

echo -e "${YELLOW}步骤5: 清除iOS设备缓存${NC}"
echo "1. 在iOS设备上删除桌面图标"
echo "2. 在Safari中清除网站数据: 设置 > Safari > 高级 > 网站数据"
echo "3. 重新访问 https://app.zhdnpx.cn"
echo "4. 重新添加到主屏幕"
echo ""

echo -e "${YELLOW}步骤6: 测试验证${NC}"
echo "1. 在Safari中访问: https://app.zhdnpx.cn/ios-audio-test.html"
echo "2. 运行所有测试，确保都通过"
echo "3. 从主屏幕打开PWA，再次运行测试"
echo "4. 测试实际音频播放功能"
echo ""

echo -e "${GREEN}=== 修复步骤已列出，请按照提示操作 ===${NC}"
echo ""
echo "详细文档: docs/iOS测试问题修复方案.md"
echo "诊断工具: https://app.zhdnpx.cn/ios-audio-test.html"
