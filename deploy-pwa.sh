#!/bin/bash
# PWA快速部署脚本

echo "=== 般若伴读 PWA 部署脚本 ==="
echo ""

# 检查参数
if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
    echo "用法："
    echo "  ./deploy-pwa.sh                 # 部署到服务器"
    echo "  ./deploy-pwa.sh --local         # 仅本地构建"
    echo ""
    echo "前提条件："
    echo "  1. 已配置SSH密钥到服务器"
    echo "  2. 服务器地址在脚本中配置"
    echo "  3. 已准备好PWA图标文件"
    exit 0
fi

# 配置（请修改为你的服务器信息）
SERVER_USER="root"
SERVER_HOST="your-server"
SERVER_PATH="/opt/nginx/app"

# 步骤1: 检查图标文件
echo "1. 检查PWA图标..."
REQUIRED_ICONS=(
    "prajna-buddy/public/pwa-192x192.png"
    "prajna-buddy/public/pwa-512x512.png"
    "prajna-buddy/public/apple-touch-icon.png"
    "prajna-buddy/public/favicon.ico"
)

MISSING_ICONS=()
for icon in "${REQUIRED_ICONS[@]}"; do
    if [ ! -f "$icon" ]; then
        MISSING_ICONS+=("$icon")
    fi
done

if [ ${#MISSING_ICONS[@]} -gt 0 ]; then
    echo "⚠️  警告：缺少以下图标文件："
    for icon in "${MISSING_ICONS[@]}"; do
        echo "  - $icon"
    done
    echo ""
    echo "请先准备图标文件，参考："
    echo "  prajna-buddy/public/ICONS_README.md"
    echo ""
    read -p "是否继续部署？(y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 步骤2: 安装依赖
echo ""
echo "2. 安装依赖..."
cd prajna-buddy
npm install

# 步骤3: 构建PWA
echo ""
echo "3. 构建PWA..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建成功"

# 如果只是本地构建，到此结束
if [ "$1" == "--local" ]; then
    echo ""
    echo "=== 本地构建完成 ==="
    echo "构建文件位置: prajna-buddy/dist/"
    echo ""
    echo "手动部署命令："
    echo "  scp -r dist/* ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/"
    exit 0
fi

# 步骤4: 打包
echo ""
echo "4. 打包部署文件..."
cd dist
tar -czf ../pwa-dist.tar.gz .
cd ..
echo "✅ 打包完成: pwa-dist.tar.gz"

# 步骤5: 上传到服务器
echo ""
echo "5. 上传到服务器..."
scp pwa-dist.tar.gz ${SERVER_USER}@${SERVER_HOST}:/tmp/

if [ $? -ne 0 ]; then
    echo "❌ 上传失败，请检查SSH配置"
    exit 1
fi

echo "✅ 上传成功"

# 步骤6: 在服务器上解压
echo ""
echo "6. 部署到服务器..."
ssh ${SERVER_USER}@${SERVER_HOST} << 'EOF'
    mkdir -p /opt/nginx/app
    cd /opt/nginx/app
    tar -xzf /tmp/pwa-dist.tar.gz
    rm /tmp/pwa-dist.tar.gz
    echo "✅ 部署完成"
    ls -lh /opt/nginx/app/ | head -10
EOF

# 步骤7: 更新nginx配置
echo ""
echo "7. 更新nginx配置..."
scp ../nginx-config/app.zhdnpx.cn.conf ${SERVER_USER}@${SERVER_HOST}:/opt/nginx/conf.d/

ssh ${SERVER_USER}@${SERVER_HOST} << 'EOF'
    docker exec sub-nginx nginx -t
    if [ $? -eq 0 ]; then
        docker exec sub-nginx nginx -s reload
        echo "✅ nginx配置已更新"
    else
        echo "❌ nginx配置测试失败"
        exit 1
    fi
EOF

# 步骤8: 更新下载页面
echo ""
echo "8. 更新下载页面..."
scp ../tts-server/public/index.html ${SERVER_USER}@${SERVER_HOST}:/opt/nginx/prajna/

# 清理
echo ""
echo "9. 清理临时文件..."
rm pwa-dist.tar.gz
cd ..

echo ""
echo "=== 部署完成 ==="
echo ""
echo "✅ PWA已部署到: https://app.zhdnpx.cn"
echo "✅ 下载页面已更新: https://tts.zhdnpx.cn"
echo ""
echo "验证命令："
echo "  curl -I https://app.zhdnpx.cn"
echo "  curl https://app.zhdnpx.cn/manifest.json"
echo ""
echo "iOS用户使用："
echo "  1. Safari访问 https://app.zhdnpx.cn"
echo "  2. 点击分享 → 添加到主屏幕"
echo ""
