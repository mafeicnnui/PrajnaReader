# 使用ImageMagick去除图标白边

$inputFile = "tts-server/public/pwa-192x192.png"
$outputFile = "prajna-buddy/public/apple-touch-icon-fixed.png"

Write-Host "=== 去除图标白边 ===" -ForegroundColor Cyan
Write-Host ""

# 检查ImageMagick是否安装
try {
    $magickVersion = magick -version 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "ImageMagick not found"
    }
    Write-Host "✅ ImageMagick已安装" -ForegroundColor Green
} catch {
    Write-Host "❌ 未安装ImageMagick" -ForegroundColor Red
    Write-Host ""
    Write-Host "请安装ImageMagick:" -ForegroundColor Yellow
    Write-Host "1. 访问: https://imagemagick.org/script/download.php#windows"
    Write-Host "2. 下载并安装Windows版本"
    Write-Host "3. 重新运行此脚本"
    exit 1
}

Write-Host ""
Write-Host "处理图标..." -ForegroundColor Yellow

# 方案1: 裁剪白边 + 调整大小
magick $inputFile `
    -trim `
    +repage `
    -resize 180x180 `
    -gravity center `
    -extent 180x180 `
    $outputFile

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 图标处理完成" -ForegroundColor Green
    Write-Host ""
    Write-Host "输出文件: $outputFile" -ForegroundColor Cyan
    
    # 复制到其他位置
    Copy-Item $outputFile "prajna-buddy/public/apple-touch-icon.png" -Force
    Copy-Item $outputFile "prajna-buddy/public/pwa-192x192.png" -Force
    Copy-Item $outputFile "prajna-buddy/public/pwa-512x512.png" -Force
    
    Write-Host "✅ 已更新所有图标文件" -ForegroundColor Green
} else {
    Write-Host "❌ 图标处理失败" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== 完成 ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "下一步:" -ForegroundColor Yellow
Write-Host "1. cd prajna-buddy"
Write-Host "2. npm run build"
Write-Host "3. 上传dist到服务器"
