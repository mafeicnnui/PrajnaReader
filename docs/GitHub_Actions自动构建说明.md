# GitHub Actions 自动构建说明

## 概述

项目配置了两个GitHub Actions工作流，用于自动构建Android APK和PWA。

## 工作流列表

### 1. Android Debug APK (android-debug-apk.yml)

**触发条件**：
- 推送到main分支
- 对main分支的Pull Request
- 手动触发

**构建内容**：
- Android Release APK
- 文件名：`Prajna-Reader.apk`

**下载方式**：
1. 访问：https://github.com/mafeicnnui/PrajnaReader/actions
2. 点击最新的成功构建
3. 滚动到底部的 "Artifacts" 部分
4. 下载 `Prajna-Reader-apk`

**自动同步到服务器**：
- 服务器上的定时任务会自动从GitHub Release同步APK
- 用户可以从 `https://tts.zhdnpx.cn/downloads/Prajna-Reader.apk` 下载

---

### 2. Build and Deploy PWA (build-pwa.yml) ⭐ 新增

**触发条件**：
- 推送到main分支
- 对main分支的Pull Request
- 手动触发

**构建内容**：
- PWA静态文件（dist目录）
- 压缩包：`pwa-dist.tar.gz`

**下载方式**：
1. 访问：https://github.com/mafeicnnui/PrajnaReader/actions
2. 点击 "Build and Deploy PWA" 工作流
3. 点击最新的成功构建
4. 下载 Artifacts：
   - `prajna-buddy-pwa` - 压缩包（用于部署）
   - `prajna-buddy-pwa-dist` - 完整dist目录（用于查看）

---

## 手动触发构建

### 方式1: 通过GitHub网页

1. 访问：https://github.com/mafeicnnui/PrajnaReader/actions
2. 选择要运行的工作流（Android或PWA）
3. 点击右侧的 "Run workflow" 按钮
4. 选择分支（通常是main）
5. 点击 "Run workflow"

### 方式2: 通过Git命令

```bash
# 推送代码会自动触发
git push origin main
```

---

## PWA部署流程

### 自动部署（可选，需要配置）

如果配置了服务器SSH密钥，PWA会自动部署到服务器。

**需要的Secrets**：
- `SERVER_HOST` - 服务器地址
- `SERVER_USER` - SSH用户名
- `SERVER_SSH_KEY` - SSH私钥

**配置步骤**：
1. 在GitHub仓库，进入 Settings → Secrets and variables → Actions
2. 添加上述三个secrets
3. 取消注释 `.github/workflows/build-pwa.yml` 中的 `deploy-pwa` job

### 手动部署（当前方式）

1. 从GitHub Actions下载 `prajna-buddy-pwa` artifact
2. 解压 `pwa-dist.tar.gz`
3. 上传到服务器：

```bash
# 下载并解压artifact
unzip prajna-buddy-pwa.zip
tar -xzf pwa-dist.tar.gz

# 上传到服务器
scp -r * root@your-server:/opt/nginx/app/
```

或使用一键脚本：

```bash
# 在服务器上
cd /opt/nginx/app
wget https://github.com/mafeicnnui/PrajnaReader/actions/runs/[run-id]/artifacts/[artifact-id]
tar -xzf pwa-dist.tar.gz
rm pwa-dist.tar.gz
```

---

## 构建状态徽章

可以在README.md中添加构建状态徽章：

```markdown
![Android APK](https://github.com/mafeicnnui/PrajnaReader/actions/workflows/android-debug-apk.yml/badge.svg)
![PWA Build](https://github.com/mafeicnnui/PrajnaReader/actions/workflows/build-pwa.yml/badge.svg)
```

效果：
![Android APK](https://github.com/mafeicnnui/PrajnaReader/actions/workflows/android-debug-apk.yml/badge.svg)
![PWA Build](https://github.com/mafeicnnui/PrajnaReader/actions/workflows/build-pwa.yml/badge.svg)

---

## 构建时间

- Android APK：约5-8分钟
- PWA：约2-3分钟

---

## 构建环境

### Android APK
- OS: Ubuntu Latest
- Node.js: 22
- Java: 21 (Temurin)
- Gradle: 自动

### PWA
- OS: Ubuntu Latest
- Node.js: 22
- Vite: 5.x

---

## 故障排查

### 问题1: 构建失败

查看构建日志：
1. 进入Actions页面
2. 点击失败的构建
3. 查看红色的步骤
4. 展开查看详细错误

常见原因：
- 依赖安装失败：检查package.json
- 构建错误：检查代码语法
- 签名失败：检查Secrets配置

### 问题2: Artifact下载失败

- Artifact保留90天后自动删除
- 需要登录GitHub才能下载
- 文件大小限制：2GB

### 问题3: PWA构建成功但无法访问

检查：
- 是否已部署到服务器
- nginx配置是否正确
- DNS是否解析
- HTTPS证书是否有效

---

## 优化建议

### 1. 启用缓存

已启用npm缓存，加快构建速度。

### 2. 并行构建

Android和PWA可以并行构建，互不影响。

### 3. 条件部署

只在main分支推送时部署，PR时只构建不部署。

### 4. 通知

可以配置构建失败时发送通知：

```yaml
- name: Notify on failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 成本

GitHub Actions免费额度：
- 公开仓库：无限制
- 私有仓库：2000分钟/月

当前使用：
- Android构建：约8分钟/次
- PWA构建：约3分钟/次
- 总计：约11分钟/次

如果每天推送5次，月使用约：11 × 5 × 30 = 1650分钟（在免费额度内）

---

## 相关文档

- [GitHub Actions文档](https://docs.github.com/en/actions)
- [Android构建指南](https://developer.android.com/studio/build)
- [PWA部署指南](./PWA部署指南.md)
- [APK代理下载部署说明](./APK代理下载部署说明.md)

---

最后更新：2026年3月27日
