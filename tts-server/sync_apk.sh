#!/bin/bash
# APK同步脚本 - 从GitHub下载最新APK到本地服务器

# 配置
GITHUB_REPO="mafeicnnui/PrajnaReader"
APK_NAME="Prajna-Reader.apk"
LOCAL_DIR="/opt/nginx/prajna/downloads"
LOG_FILE="/var/log/apk-sync.log"

# 创建目录
mkdir -p "$LOCAL_DIR"

# 日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "开始同步APK..."

# 获取最新Release的下载URL
DOWNLOAD_URL="https://github.com/${GITHUB_REPO}/releases/latest/download/${APK_NAME}"

log "下载URL: $DOWNLOAD_URL"

# 下载APK到临时文件
TEMP_FILE="${LOCAL_DIR}/${APK_NAME}.tmp"
if curl -L -o "$TEMP_FILE" "$DOWNLOAD_URL" 2>&1 | tee -a "$LOG_FILE"; then
    # 检查文件是否有效（大于1MB）
    FILE_SIZE=$(stat -f%z "$TEMP_FILE" 2>/dev/null || stat -c%s "$TEMP_FILE" 2>/dev/null)
    if [ "$FILE_SIZE" -gt 1048576 ]; then
        # 移动到正式位置
        mv "$TEMP_FILE" "${LOCAL_DIR}/${APK_NAME}"
        log "✅ APK同步成功！文件大小: $(numfmt --to=iec-i --suffix=B $FILE_SIZE 2>/dev/null || echo ${FILE_SIZE} bytes)"
        
        # 设置权限
        chmod 644 "${LOCAL_DIR}/${APK_NAME}"
        
        # 获取文件信息
        ls -lh "${LOCAL_DIR}/${APK_NAME}" | tee -a "$LOG_FILE"
    else
        log "❌ 下载的文件太小，可能下载失败"
        rm -f "$TEMP_FILE"
        exit 1
    fi
else
    log "❌ 下载失败"
    rm -f "$TEMP_FILE"
    exit 1
fi

log "同步完成"
