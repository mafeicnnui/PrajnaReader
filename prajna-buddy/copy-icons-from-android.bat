@echo off
REM 从Android项目复制图标到PWA (Windows版本)

echo === 从Android复制图标到PWA ===
echo.

REM Android图标路径
set ANDROID_ICON=android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png
set PUBLIC_DIR=public

REM 检查Android图标是否存在
if not exist "%ANDROID_ICON%" (
    echo ❌ 找不到Android图标: %ANDROID_ICON%
    exit /b 1
)

echo ✅ 找到Android图标
echo.
echo 复制图标文件...

REM 复制图标
copy "%ANDROID_ICON%" "%PUBLIC_DIR%\pwa-192x192.png" >nul
echo ✅ pwa-192x192.png

copy "%ANDROID_ICON%" "%PUBLIC_DIR%\pwa-512x512.png" >nul
echo ✅ pwa-512x512.png

copy "%ANDROID_ICON%" "%PUBLIC_DIR%\maskable-icon-512x512.png" >nul
echo ✅ maskable-icon-512x512.png

copy "%ANDROID_ICON%" "%PUBLIC_DIR%\apple-touch-icon.png" >nul
echo ✅ apple-touch-icon.png

REM 复制favicon
if exist "android\app\src\main\res\mipmap-mdpi\ic_launcher.png" (
    copy "android\app\src\main\res\mipmap-mdpi\ic_launcher.png" "%PUBLIC_DIR%\favicon.png" >nul
    echo ✅ favicon.png
)

echo.
echo === 图标复制完成 ===
echo.
echo 已创建的文件：
dir /b "%PUBLIC_DIR%\pwa-*.png" "%PUBLIC_DIR%\apple-*.png" "%PUBLIC_DIR%\maskable-*.png" 2>nul

echo.
echo ⚠️  注意：
echo 1. 如果图标尺寸不是512x512，建议使用图片编辑工具调整
echo 2. maskable图标建议添加安全区（中心内容在320x320区域内）
echo 3. 可以使用在线工具优化图标：
echo    https://realfavicongenerator.net/
echo.
echo 现在可以构建PWA了：
echo   npm run build
echo.
pause
