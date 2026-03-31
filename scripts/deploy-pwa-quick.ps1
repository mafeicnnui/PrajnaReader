# 快速部署PWA到服务器 (Windows PowerShell版本)

$SERVER = "root@app.zhdnpx.cn"
$REMOTE_PATH = "/usr/share/nginx/app"
$LOCAL_DIST = "prajna-buddy\dist"

Write-Host "=== 快速部署PWA ===" -ForegroundColor Cyan
Write-Host ""

# 1. 检查本地构建产物
if (-not (Test-Path $LOCAL_DIST)) {
    Write-Host "❌ 构建产物不存在: $LOCAL_DIST" -ForegroundColor Red
    Write-Host "请先运行: cd prajna-buddy; npm run build"
    exit 1
}

Write-Host "1. 打包构建产物..." -ForegroundColor Yellow
Set-Location prajna-buddy
tar -czf dist.tar.gz dist/
Set-Location ..
Write-Host "✅ 打包完成" -ForegroundColor Green

Write-Host ""
Write-Host "2. 上传到服务器..." -ForegroundColor Yellow
scp prajna-buddy/dist.tar.gz "${SERVER}:/tmp/"
Write-Host "✅ 上传完成" -ForegroundColor Green

Write-Host ""
Write-Host "3. 在服务器上部署..." -ForegroundColor Yellow
$deployScript = @'
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
'@

ssh $SERVER $deployScript
Write-Host "✅ 服务器部署完成" -ForegroundColor Green

Write-Host ""
Write-Host "4. 清理本地临时文件..." -ForegroundColor Yellow
Remove-Item prajna-buddy/dist.tar.gz -ErrorAction SilentlyContinue
Write-Host "✅ 清理完成" -ForegroundColor Green

Write-Host ""
Write-Host "=== 部署完成 ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "请在iPhone上测试：" -ForegroundColor Yellow
Write-Host "1. 打开Safari，访问 https://app.zhdnpx.cn"
Write-Host "2. 强制刷新（下拉页面）"
Write-Host "3. 如果已添加到主屏幕，删除后重新添加"
Write-Host "4. 测试音频播放"
