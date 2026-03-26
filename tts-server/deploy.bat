@echo off
REM TTS服务器部署脚本 (Windows)
REM 用于快速部署TTS服务到Docker

setlocal enabledelayedexpansion

echo === TTS服务器部署脚本 ===

REM 检查是否在tts-server目录
if not exist "main.py" (
    echo 错误: 请在tts-server目录下运行此脚本
    exit /b 1
)

REM 配置变量
set CONTAINER_NAME=prajna-tts-server
set IMAGE_NAME=prajna-tts-server:latest
set NETWORK_NAME=web
set HOST_PORT=8000
set CONTAINER_PORT=8000

REM 可选：代理配置（如果需要，取消注释）
REM set PROXY_URL=http://proxy.example.com:7890

echo 步骤1: 检查Docker网络
docker network inspect %NETWORK_NAME% >nul 2>&1
if errorlevel 1 (
    echo 创建Docker网络: %NETWORK_NAME%
    docker network create %NETWORK_NAME%
) else (
    echo Docker网络已存在: %NETWORK_NAME%
)

echo 步骤2: 准备数据文件
if not exist "data\sections.json" (
    echo 生成sections.json...
    python export_sections.py
) else (
    echo sections.json已存在
)

echo 步骤3: 构建Docker镜像
docker build -t %IMAGE_NAME% .

echo 步骤4: 停止并删除旧容器（如果存在）
docker ps -a | findstr %CONTAINER_NAME% >nul 2>&1
if not errorlevel 1 (
    echo 停止旧容器...
    docker stop %CONTAINER_NAME% 2>nul
    echo 删除旧容器...
    docker rm %CONTAINER_NAME% 2>nul
)

echo 步骤5: 启动新容器

REM 构建docker run命令
set DOCKER_CMD=docker run -d --name %CONTAINER_NAME% --restart unless-stopped --network %NETWORK_NAME% -p %HOST_PORT%:%CONTAINER_PORT% -v %cd%\cache:/app/cache -v %cd%\data:/app/data:ro

REM 如果设置了代理，添加环境变量
if defined PROXY_URL (
    set DOCKER_CMD=!DOCKER_CMD! -e HTTPS_PROXY=%PROXY_URL% -e HTTP_PROXY=%PROXY_URL% -e TTS_PROXY=%PROXY_URL%
)

set DOCKER_CMD=!DOCKER_CMD! %IMAGE_NAME%

REM 执行命令
%DOCKER_CMD%

echo 步骤6: 等待服务启动
timeout /t 3 /nobreak >nul

echo 步骤7: 验证服务

REM 检查容器是否运行
docker ps | findstr %CONTAINER_NAME% >nul 2>&1
if errorlevel 1 (
    echo × 容器未运行
    docker logs %CONTAINER_NAME%
    exit /b 1
) else (
    echo √ 容器运行正常
)

REM 测试健康检查
echo 测试健康检查...
curl -f http://localhost:%HOST_PORT%/health >nul 2>&1
if errorlevel 1 (
    echo × 健康检查失败
    docker logs %CONTAINER_NAME%
    exit /b 1
) else (
    echo √ 健康检查通过
)

REM 测试API
echo 测试API接口...
curl -f http://localhost:%HOST_PORT%/sections >nul 2>&1
if errorlevel 1 (
    echo ⚠ API接口测试失败（可能是数据文件问题）
) else (
    echo √ API接口正常
)

echo.
echo === 部署完成 ===
echo.
echo 容器信息:
docker ps | findstr %CONTAINER_NAME%
echo.
echo 访问地址:
echo   - 健康检查: http://localhost:%HOST_PORT%/health
echo   - API文档: http://localhost:%HOST_PORT%/docs
echo   - 列出sections: http://localhost:%HOST_PORT%/sections
echo.
echo 查看日志:
echo   docker logs -f %CONTAINER_NAME%
echo.
echo 停止服务:
echo   docker stop %CONTAINER_NAME%
echo.
echo 重启服务:
echo   docker restart %CONTAINER_NAME%
echo.

endlocal
