#!/bin/bash
# APK代理下载 - 快速部署脚本
# 在服务器宿主机上运行（不是容器中）

echo "=== APK代理下载 - 快速部署 ==="
echo ""

# 检查是否在容器中
if [ -f /.dockerenv ]; then
    echo "❌ 错误：此脚本应在宿主机上运行，不是容器中！"
    exit 1
fi

# 1. 创建目录
echo "1. 创建目录..."
mkdir -p /opt/nginx/prajna/downloads
mkdir -p /var/log

# 2. 下载APK同步脚本
echo "2. 设置APK同步脚本..."
cat > /usr/local/bin/sync_apk.sh << 'EOF'
#!/bin/bash
# APK同步脚本 - 从GitHub下载最新APK到本地服务器

GITHUB_REPO="mafeicnnui/PrajnaReader"
APK_NAME="Prajna-Reader.apk"
LOCAL_DIR="/opt/nginx/prajna/downloads"
LOG_FILE="/var/log/apk-sync.log"

mkdir -p "$LOCAL_DIR"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "开始同步APK..."

DOWNLOAD_URL="https://github.com/${GITHUB_REPO}/releases/latest/download/${APK_NAME}"
log "下载URL: $DOWNLOAD_URL"

TEMP_FILE="${LOCAL_DIR}/${APK_NAME}.tmp"
if curl -L -o "$TEMP_FILE" "$DOWNLOAD_URL" 2>&1 | tee -a "$LOG_FILE"; then
    FILE_SIZE=$(stat -c%s "$TEMP_FILE" 2>/dev/null || stat -f%z "$TEMP_FILE" 2>/dev/null)
    if [ "$FILE_SIZE" -gt 1048576 ]; then
        mv "$TEMP_FILE" "${LOCAL_DIR}/${APK_NAME}"
        log "✅ APK同步成功！文件大小: ${FILE_SIZE} bytes"
        chmod 644 "${LOCAL_DIR}/${APK_NAME}"
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
EOF

chmod +x /usr/local/bin/sync_apk.sh

# 3. 首次同步
echo "3. 执行首次同步..."
/usr/local/bin/sync_apk.sh

# 4. 设置定时任务
echo "4. 设置定时任务..."
CRON_JOB="0 2 * * * /usr/local/bin/sync_apk.sh"

if ! crontab -l 2>/dev/null | grep -q "sync_apk.sh"; then
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    echo "✅ 定时任务已添加（每天凌晨2点同步）"
else
    echo "ℹ️  定时任务已存在"
fi

# 5. 检查nginx容器挂载
echo ""
echo "5. 检查nginx容器挂载..."
if docker inspect sub-nginx 2>/dev/null | grep -q "/opt/nginx/prajna"; then
    echo "✅ nginx容器已正确挂载 /opt/nginx/prajna"
else
    echo "⚠️  警告：nginx容器可能未挂载 /opt/nginx/prajna 目录"
    echo "请检查容器配置，确保包含："
    echo "  -v /opt/nginx/prajna:/usr/share/nginx/prajna:ro"
fi

# 6. 更新nginx配置
echo ""
echo "6. 更新nginx配置..."
if [ -f "/root/PrajnaReader/nginx-config/tts.zhdnpx.cn.conf" ]; then
    cp /root/PrajnaReader/nginx-config/tts.zhdnpx.cn.conf /opt/nginx/conf.d/
    echo "✅ nginx配置已更新"
    
    # 测试配置
    if docker exec sub-nginx nginx -t 2>&1 | grep -q "successful"; then
        echo "✅ nginx配置测试通过"
        docker exec sub-nginx nginx -s reload
        echo "✅ nginx已重新加载"
    else
        echo "❌ nginx配置测试失败"
    fi
else
    echo "⚠️  找不到nginx配置文件，请手动更新"
fi

# 7. 更新下载页面
echo ""
echo "7. 更新下载页面..."
if [ -f "/root/PrajnaReader/tts-server/public/index.html" ]; then
    cp /root/PrajnaReader/tts-server/public/index.html /opt/nginx/prajna/
    echo "✅ 下载页面已更新"
else
    echo "⚠️  找不到下载页面，请手动更新"
fi

# 8. 显示结果
echo ""
echo "=== 部署完成 ==="
echo ""
echo "📁 APK存储位置: /opt/nginx/prajna/downloads/Prajna-Reader.apk"
echo "📝 日志文件: /var/log/apk-sync.log"
echo "⏰ 定时任务: 每天凌晨2点自动同步"
echo ""
echo "🔧 常用命令："
echo "  手动同步: /usr/local/bin/sync_apk.sh"
echo "  查看日志: tail -f /var/log/apk-sync.log"
echo "  查看定时任务: crontab -l"
echo ""

# 9. 验证
if [ -f "/opt/nginx/prajna/downloads/Prajna-Reader.apk" ]; then
    echo "✅ APK文件已就绪："
    ls -lh /opt/nginx/prajna/downloads/Prajna-Reader.apk
    echo ""
    echo "🌐 下载地址："
    echo "  网页: https://tts.zhdnpx.cn/"
    echo "  直接: https://tts.zhdnpx.cn/downloads/Prajna-Reader.apk"
    echo ""
    echo "🧪 测试下载："
    echo "  curl -I https://tts.zhdnpx.cn/downloads/Prajna-Reader.apk"
else
    echo "❌ APK文件不存在，请检查同步日志："
    echo "  tail -50 /var/log/apk-sync.log"
fi
