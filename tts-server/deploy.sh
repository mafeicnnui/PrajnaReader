#!/bin/bash

# TTS服务器部署脚本
# 用于快速部署TTS服务到Docker

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== TTS服务器部署脚本 ===${NC}"

# 检查是否在tts-server目录
if [ ! -f "main.py" ]; then
    echo -e "${RED}错误: 请在tts-server目录下运行此脚本${NC}"
    exit 1
fi

# 配置变量
CONTAINER_NAME="prajna-tts-server"
IMAGE_NAME="prajna-tts-server:latest"
NETWORK_NAME="web"
HOST_PORT="8000"
CONTAINER_PORT="8000"

# 可选：代理配置（如果需要，取消注释）
# PROXY_URL="http://proxy.example.com:7890"

echo -e "${YELLOW}步骤1: 检查Docker网络${NC}"
if ! docker network inspect $NETWORK_NAME >/dev/null 2>&1; then
    echo "创建Docker网络: $NETWORK_NAME"
    docker network create $NETWORK_NAME
else
    echo "Docker网络已存在: $NETWORK_NAME"
fi

echo -e "${YELLOW}步骤2: 准备数据文件${NC}"
if [ ! -f "data/sections.json" ]; then
    echo "生成sections.json..."
    python export_sections.py
else
    echo "sections.json已存在"
fi

echo -e "${YELLOW}步骤3: 构建Docker镜像${NC}"
docker build -t $IMAGE_NAME .

echo -e "${YELLOW}步骤4: 停止并删除旧容器（如果存在）${NC}"
if docker ps -a | grep -q $CONTAINER_NAME; then
    echo "停止旧容器..."
    docker stop $CONTAINER_NAME || true
    echo "删除旧容器..."
    docker rm $CONTAINER_NAME || true
fi

echo -e "${YELLOW}步骤5: 启动新容器${NC}"

# 构建docker run命令
DOCKER_CMD="docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  --network $NETWORK_NAME \
  -p $HOST_PORT:$CONTAINER_PORT \
  -v $(pwd)/cache:/app/cache \
  -v $(pwd)/data:/app/data:ro"

# 如果设置了代理，添加环境变量
if [ ! -z "$PROXY_URL" ]; then
    DOCKER_CMD="$DOCKER_CMD \
  -e HTTPS_PROXY=$PROXY_URL \
  -e HTTP_PROXY=$PROXY_URL \
  -e TTS_PROXY=$PROXY_URL"
fi

DOCKER_CMD="$DOCKER_CMD \
  $IMAGE_NAME"

# 执行命令
eval $DOCKER_CMD

echo -e "${YELLOW}步骤6: 等待服务启动${NC}"
sleep 3

echo -e "${YELLOW}步骤7: 验证服务${NC}"

# 检查容器是否运行
if docker ps | grep -q $CONTAINER_NAME; then
    echo -e "${GREEN}✓ 容器运行正常${NC}"
else
    echo -e "${RED}✗ 容器未运行${NC}"
    docker logs $CONTAINER_NAME
    exit 1
fi

# 测试健康检查
echo "测试健康检查..."
if curl -f http://localhost:$HOST_PORT/health >/dev/null 2>&1; then
    echo -e "${GREEN}✓ 健康检查通过${NC}"
else
    echo -e "${RED}✗ 健康检查失败${NC}"
    docker logs $CONTAINER_NAME
    exit 1
fi

# 测试API
echo "测试API接口..."
if curl -f http://localhost:$HOST_PORT/sections >/dev/null 2>&1; then
    echo -e "${GREEN}✓ API接口正常${NC}"
else
    echo -e "${YELLOW}⚠ API接口测试失败（可能是数据文件问题）${NC}"
fi

echo ""
echo -e "${GREEN}=== 部署完成 ===${NC}"
echo ""
echo "容器信息:"
docker ps | grep $CONTAINER_NAME
echo ""
echo "访问地址:"
echo "  - 健康检查: http://localhost:$HOST_PORT/health"
echo "  - API文档: http://localhost:$HOST_PORT/docs"
echo "  - 列出sections: http://localhost:$HOST_PORT/sections"
echo ""
echo "查看日志:"
echo "  docker logs -f $CONTAINER_NAME"
echo ""
echo "停止服务:"
echo "  docker stop $CONTAINER_NAME"
echo ""
echo "重启服务:"
echo "  docker restart $CONTAINER_NAME"
echo ""
