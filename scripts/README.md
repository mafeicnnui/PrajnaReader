# 脚本工具说明

本目录包含项目的各种部署和维护脚本。

## 目录

- [Nginx相关脚本](#nginx相关脚本)
- [TTS服务相关脚本](#tts服务相关脚本)
- [PWA部署脚本](#pwa部署脚本)
- [诊断和调试脚本](#诊断和调试脚本)
- [使用说明](#使用说明)

## Nginx相关脚本

### update-nginx-config.sh
更新nginx配置文件到服务器

**用途**：将本地的nginx配置文件上传到服务器并重新加载nginx

**使用方法**：
```bash
chmod +x scripts/update-nginx-config.sh
./scripts/update-nginx-config.sh
```

**注意事项**：
- 需要配置SSH免密登录
- 会自动备份原配置文件
- 会验证配置文件语法

### update-nginx-downloads.sh
修复APK下载路径配置

**用途**：更新nginx配置以修复APK下载路径问题

**使用方法**：
```bash
# 在服务器上运行
chmod +x update-nginx-downloads.sh
./update-nginx-downloads.sh
```

**功能**：
- 从GitHub下载最新配置
- 备份当前配置
- 验证配置语法
- 重新加载nginx
- 测试下载链接

### debug-nginx.sh
调试nginx配置和服务状态

**用途**：快速检查nginx的配置和运行状态

**使用方法**：
```bash
chmod +x scripts/debug-nginx.sh
./scripts/debug-nginx.sh
```

**检查项**：
- nginx容器状态
- 配置文件语法
- 端口监听情况
- 日志输出

## TTS服务相关脚本

### server-update-tts.sh
更新TTS下载页面

**用途**：从GitHub下载最新的TTS下载页面（index.html）并部署到服务器

**使用方法**：
```bash
# 在服务器上运行
chmod +x server-update-tts.sh
./server-update-tts.sh
```

**功能**：
- 创建必要的目录
- 从GitHub下载最新index.html
- 备份旧文件
- 设置正确的权限

### update-tts-index.sh
本地更新TTS页面（已废弃）

**说明**：此脚本用于在服务器本地更新，现已被 `server-update-tts.sh` 替代

### deploy-tts-page.sh
从本地部署TTS页面

**用途**：将本地的TTS页面文件上传到服务器

**使用方法**：
```bash
chmod +x scripts/deploy-tts-page.sh
./scripts/deploy-tts-page.sh
```

**注意事项**：
- 需要配置SSH免密登录
- 会自动备份服务器上的旧文件

## PWA部署脚本

### deploy-pwa.sh
部署PWA应用

**用途**：构建并部署PWA应用到服务器

**使用方法**：
```bash
chmod +x scripts/deploy-pwa.sh
./scripts/deploy-pwa.sh
```

**功能**：
1. 构建PWA应用（npm run build）
2. 打包构建产物
3. 上传到服务器
4. 解压并部署
5. 设置正确的权限

**注意事项**：
- 需要先安装依赖（npm install）
- 需要配置SSH免密登录
- 会自动备份旧版本

## 诊断和调试脚本

### diagnose-apk.sh
诊断APK下载问题

**用途**：全面检查APK下载相关的配置和文件

**使用方法**：
```bash
# 在服务器上运行
chmod +x diagnose-apk.sh
./diagnose-apk.sh
```

**检查项**：
- APK文件是否存在
- 文件权限和大小
- nginx容器挂载情况
- nginx配置正确性
- 下载URL可访问性

### fix-apk-download.sh
修复APK下载配置

**用途**：检查并修复APK下载相关的配置问题

**使用方法**：
```bash
# 在服务器上运行
chmod +x fix-apk-download.sh
./fix-apk-download.sh
```

**功能**：
- 检查nginx容器挂载
- 验证配置文件路径
- 检查文件权限
- 提供修复建议

### check-apk-download.sh
检查APK下载配置

**用途**：快速检查APK下载的各项配置

**使用方法**：
```bash
# 在服务器上运行
chmod +x check-apk-download.sh
./check-apk-download.sh
```

**检查项**：
- 本地APK文件
- HTTP/HTTPS下载链接
- nginx配置
- 容器内文件

### check-500-error.sh
检查500错误

**用途**：诊断服务器500错误的原因

**使用方法**：
```bash
chmod +x scripts/check-500-error.sh
./scripts/check-500-error.sh
```

**检查项**：
- 服务容器状态
- 错误日志
- 配置文件
- 网络连接

### fix-ios-audio.sh
修复iOS音频播放问题

**用途**：修复iOS设备上音频播放的兼容性问题

**使用方法**：
```bash
chmod +x scripts/fix-ios-audio.sh
./scripts/fix-ios-audio.sh
```

**功能**：
- 更新音频播放相关代码
- 修复iOS Safari兼容性
- 重新构建和部署

## 使用说明

### 前置要求

#### 本地机器
- Git
- Node.js 和 npm（用于PWA构建）
- SSH客户端
- 配置SSH免密登录到服务器

#### 服务器
- Docker
- nginx容器（sub-nginx）
- 必要的目录权限

### SSH免密登录配置

```bash
# 1. 生成SSH密钥（如果还没有）
ssh-keygen -t rsa -b 4096

# 2. 复制公钥到服务器
ssh-copy-id root@tts.zhdnpx.cn

# 3. 测试连接
ssh root@tts.zhdnpx.cn
```

### 脚本执行权限

所有脚本在首次使用前需要添加执行权限：

```bash
chmod +x scripts/*.sh
```

### 常见工作流程

#### 1. 更新TTS下载页面

```bash
# 方案1：在本地上传
./scripts/deploy-tts-page.sh

# 方案2：在服务器上从GitHub拉取
ssh root@tts.zhdnpx.cn
cd /path/to/scripts
./server-update-tts.sh
```

#### 2. 部署PWA应用

```bash
# 在本地项目目录
cd prajna-buddy
npm install
npm run build
cd ..
./scripts/deploy-pwa.sh
```

#### 3. 更新nginx配置

```bash
# 1. 修改配置文件
vim nginx-config/tts.zhdnpx.cn.conf

# 2. 提交到GitHub
git add nginx-config/
git commit -m "更新nginx配置"
git push

# 3. 部署到服务器
./scripts/update-nginx-config.sh
```

#### 4. 诊断问题

```bash
# 在服务器上运行诊断脚本
ssh root@tts.zhdnpx.cn

# 检查APK下载
./diagnose-apk.sh

# 检查nginx状态
./debug-nginx.sh

# 检查500错误
./check-500-error.sh
```

### 脚本变量配置

某些脚本需要配置服务器地址和路径，请根据实际情况修改：

```bash
# 服务器地址
SERVER="root@tts.zhdnpx.cn"

# 远程路径
REMOTE_PATH="/usr/share/nginx/prajna"

# nginx容器名称
NGINX_CONTAINER="sub-nginx"
```

### 日志和输出

大多数脚本会输出详细的执行日志，包括：
- ✅ 成功标记
- ❌ 错误标记
- ⚠️ 警告标记
- 详细的执行步骤

### 错误处理

如果脚本执行失败：

1. **检查错误信息**：仔细阅读脚本输出的错误信息
2. **检查权限**：确保有足够的权限执行操作
3. **检查网络**：确保能连接到服务器和GitHub
4. **检查路径**：确保文件路径正确
5. **查看日志**：检查相关服务的日志

### 备份策略

所有修改配置的脚本都会自动备份：

```bash
# 备份文件命名格式
原文件名.bak.YYYYMMDD_HHMMSS

# 例如
index.html.bak.20260331_170000
tts.zhdnpx.cn.conf.bak.20260331_170000
```

### 回滚操作

如果更新后出现问题，可以快速回滚：

```bash
# 1. 找到备份文件
ls -lt /path/to/file.bak.*

# 2. 恢复备份
cp /path/to/file.bak.20260331_170000 /path/to/file

# 3. 重新加载服务
docker exec sub-nginx nginx -s reload
```

## 安全注意事项

1. **权限控制**：脚本中的敏感操作使用sudo，确保只有授权用户可以执行
2. **备份验证**：重要操作前先备份，操作后验证
3. **配置验证**：nginx配置更新后先验证语法再重载
4. **日志审计**：定期检查脚本执行日志
5. **密钥管理**：SSH密钥妥善保管，不要提交到代码库

## 维护和更新

### 添加新脚本

1. 在scripts目录创建新脚本
2. 添加执行权限
3. 在本文档中添加说明
4. 提交到Git

### 更新现有脚本

1. 修改脚本文件
2. 测试功能
3. 更新文档说明
4. 提交到Git

### 废弃脚本

1. 在文档中标记为"已废弃"
2. 说明替代方案
3. 保留一段时间后删除

## 相关文档

- [Nginx服务器部署说明](../docs/Nginx服务器部署说明.md)
- [TTS服务器部署说明](../docs/TTS服务器部署说明.md)
- [PWA部署指南](../docs/PWA部署指南.md)
- [快速部署指南](../docs/快速部署指南.md)

## 问题反馈

如有问题或建议，请在GitHub项目中提交Issue：
https://github.com/mafeicnnui/PrajnaReader/issues
