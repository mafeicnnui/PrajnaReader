#!/bin/bash
# 快速部署PWA到服务器

SERVER="root@app.zhdnpx.cn"
REMOTE_PATH="/usr/share/nginx/app"
LOCAL_DIST="prajna-buddy/dist"

echo "=== 快速部署PWA ==="
echo ""

# 1. 检查本地构建产物
if [ ! -d "$LOCAL_DIST" ]; then
    echo "❌ 构建产物不存在: $LOCAL_DIST"
    echo "请先运行: cd prajna-buddy && npm run build"
    exit 1
fi

echo "1. 打包构建产物..."
cd prajna-buddy
tar -czf dist.tar.gz dist/
cd ..
echo "✅ 打包完成"

echo ""
echo "2. 上传到服务器..."
scp prajna-buddy/dist.tar.gz ${SERVER}:/tmp/
echo "✅ 上传完成"

echo ""
echo "3. 在服务器上部署..."
ssh ${SERVER} << 'ENDSSH'
# 备份旧版本
if [ -d "/usr/share/nginx/app" ]; then
    tar -czf /usr/share/nginx/app-backup-$(date +%Y%m%d_%H%M%S).tar.gz /usr/share/nginx/app
    echo "✅ 已备份旧版本"
fi

# 解压新版本
cd /tmp
tar -xzf dist.tar.gz

# 删除旧文件
rm -rf /usr/share/nginx/app/*

# 复制新文件
cp -r dist/* /usr/share/nginx/app/

# 设置权限
chmod -R 755 /usr/share/nginx/app
chown -R root:root /usr/share/nginx/app

# 清理
rm -f /tmp/dist.tar.gz
rm -rf /tmp/dist

echo "✅ 部署完成"
ls -lh /usr/share/nginx/app/ | head -10
ENDSSH

echo ""
echo "4. 清理本地临时文件..."
rm -f prajna-buddy/dist.tar.gz
echo "✅ 清理完成"

echo ""
echo "=== 部署完成 ==="
echo ""
echo "请在iPhone上测试："
echo "1. 打开Safari，访问 https://app.zhdnpx.cn"
echo "2. 强制刷新（下拉页面）"
echo "3. 如果已添加到主屏幕，删除后重新添加"
echo "4. 测试音频播放"
