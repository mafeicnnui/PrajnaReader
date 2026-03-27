#!/bin/bash
# 设置APK自动同步

echo "=== 设置APK自动同步 ==="

# 1. 创建必要的目录
echo "1. 创建目录..."
sudo mkdir -p /opt/nginx/prajna/downloads
sudo mkdir -p /var/log

# 2. 复制同步脚本
echo "2. 复制同步脚本..."
sudo cp sync_apk.sh /usr/local/bin/sync_apk.sh
sudo chmod +x /usr/local/bin/sync_apk.sh

# 3. 首次同步
echo "3. 执行首次同步..."
sudo /usr/local/bin/sync_apk.sh

# 4. 设置定时任务（每天凌晨2点同步）
echo "4. 设置定时任务..."
CRON_JOB="0 2 * * * /usr/local/bin/sync_apk.sh"

# 检查cron任务是否已存在
if ! crontab -l 2>/dev/null | grep -q "sync_apk.sh"; then
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    echo "✅ 定时任务已添加（每天凌晨2点同步）"
else
    echo "ℹ️  定时任务已存在"
fi

# 5. 显示结果
echo ""
echo "=== 设置完成 ==="
echo "APK存储位置: /opt/nginx/prajna/downloads/Prajna-Reader.apk"
echo "日志文件: /var/log/apk-sync.log"
echo "定时任务: 每天凌晨2点自动同步"
echo ""
echo "手动同步命令: sudo /usr/local/bin/sync_apk.sh"
echo "查看日志: tail -f /var/log/apk-sync.log"
echo "查看定时任务: crontab -l"
echo ""

# 6. 检查文件
if [ -f "/opt/nginx/prajna/downloads/Prajna-Reader.apk" ]; then
    echo "✅ APK文件已就绪："
    ls -lh /opt/nginx/prajna/downloads/Prajna-Reader.apk
    echo ""
    echo "下载地址: https://tts.zhdnpx.cn/downloads/Prajna-Reader.apk"
else
    echo "❌ APK文件不存在，请检查同步日志"
fi
