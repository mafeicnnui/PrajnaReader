# GitHub Release 发布指南

## 当前状态

- ✅ GitHub Actions 已配置，可以自动构建APK
- ⏳ 需要创建正式的Release并上传APK
- ⏳ 下载页面临时指向Actions页面

## 如何从GitHub Actions下载APK

### 方式1: 通过Actions页面下载

1. 访问：https://github.com/mafeicnnui/PrajnaReader/actions
2. 点击最新的成功构建（绿色✓）
3. 滚动到页面底部的 "Artifacts" 部分
4. 点击 "Prajna-Reader-apk" 下载zip文件
5. 解压zip文件，得到 `Prajna-Reader.apk`

### 方式2: 通过直接链接下载

从图2可以看到，文件路径是：
```
github.com/mafeicnnui/PrajnaReader/actions/runs/[run_id]/artifacts/[artifact_id]
```

但这个链接需要登录GitHub才能访问，不适合公开分发。

## 创建正式Release的步骤

### 步骤1: 下载APK文件

按照上面的方式1，从GitHub Actions下载最新的APK文件。

### 步骤2: 创建Release

1. 访问：https://github.com/mafeicnnui/PrajnaReader/releases
2. 点击右上角的 "Create a new release" 按钮
3. 填写以下信息：

#### Tag版本号
```
v1.0.0
```
点击 "Create new tag: v1.0.0 on publish"

#### Release标题
```
般若伴读 v1.0.0 - 首次发布
```

#### 描述内容
```markdown
## 🎉 般若伴读 v1.0.0

这是般若伴读的首个正式版本！

### ✨ 主要功能

- 📖 完整的地藏经13品内容
- 🙏 前置章节：香赞、觉林菩萨偈、赞、开经偈
- 🔄 结尾章节：回向偈、三皈依、回向
- 🔊 段落级音频播放（男声、女声）
- 🎵 连续播放和单段循环
- 👁️ 拼音显示/隐藏
- 📝 背诵模式
- ⭐ 段落收藏功能

### 📊 内容统计

- 20个章节（4个前置 + 13品 + 3个回向）
- 51个段落
- 2种音色（男声、女声）

### 🔧 技术特性

- 基于 Ionic + Vue 3 开发
- 使用 TTS API 实时生成音频
- 支持离线阅读（音频需联网）
- 响应式设计，适配各种屏幕

### 📱 系统要求

- Android 5.0 及以上版本
- 建议 Android 8.0 以上以获得最佳体验

### 📥 下载

点击下方的 `Prajna-Reader.apk` 文件下载安装包。

### 🐛 已知问题

- 首次播放音频需要联网生成，可能需要等待1-3秒
- 部分Android系统可能需要手动允许安装未知来源应用

### 🔗 相关链接

- 项目主页：https://github.com/mafeicnnui/PrajnaReader
- App介绍页面：https://tts.zhdnpx.cn/
- 问题反馈：https://github.com/mafeicnnui/PrajnaReader/issues

---

**安装说明**：下载APK文件后，在手机上打开即可安装。如果提示"未知来源"，请在设置中允许安装。
```

### 步骤3: 上传APK文件

1. 在 "Attach binaries" 区域，点击或拖拽上传文件
2. 选择从Actions下载并解压的 `Prajna-Reader.apk` 文件
3. 等待上传完成

### 步骤4: 发布Release

1. 确认所有信息无误
2. 点击 "Publish release" 按钮
3. 发布成功！

## 发布后的验证

### 1. 验证下载链接

发布后，以下链接应该可以正常访问：

```bash
# 最新版本（自动重定向）
https://github.com/mafeicnnui/PrajnaReader/releases/latest/download/Prajna-Reader.apk

# 特定版本
https://github.com/mafeicnnui/PrajnaReader/releases/download/v1.0.0/Prajna-Reader.apk
```

测试命令：
```bash
curl -I https://github.com/mafeicnnui/PrajnaReader/releases/latest/download/Prajna-Reader.apk
# 应该返回 302 Found（重定向到实际文件）
```

### 2. 更新下载页面

发布Release后，需要更新下载页面的链接：

```bash
cd /root/PrajnaReader
git pull

# 编辑 tts-server/public/index.html
# 将下载链接改回：
# https://github.com/mafeicnnui/PrajnaReader/releases/latest/download/Prajna-Reader.apk

# 上传到服务器
cp tts-server/public/index.html /opt/nginx/prajna/
```

### 3. 测试完整流程

1. 访问 https://tts.zhdnpx.cn/
2. 点击下载按钮
3. 应该能正常下载APK文件
4. 扫描二维码也应该能访问下载页面

## 后续版本发布流程

### 自动化方式（推荐）

如果配置了GitHub Actions自动发布，只需：

1. 更新代码
2. 创建新的tag：
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```
3. GitHub Actions会自动构建并创建Release

### 手动方式

1. 从Actions下载最新APK
2. 创建新的Release
3. 上传APK文件
4. 发布

## 常见问题

### Q1: 为什么不能直接使用Actions的artifact链接？

A: Actions的artifact需要登录GitHub才能下载，不适合公开分发。Release的文件是公开的，任何人都可以下载。

### Q2: 如何让用户总是下载最新版本？

A: 使用 `/releases/latest/download/` 路径，GitHub会自动重定向到最新版本。

### Q3: 可以删除旧版本的Release吗？

A: 可以，但建议保留历史版本供用户选择。如果要删除，在Release页面点击对应版本的"Delete"按钮。

### Q4: APK文件大小限制是多少？

A: GitHub Release单个文件最大2GB，APK文件通常远小于这个限制。

### Q5: 如何统计下载次数？

A: GitHub会自动统计Release的下载次数，在Release页面可以看到每个文件的下载次数。

## 自动化发布配置（可选）

如果想要自动化发布流程，可以修改 `.github/workflows/android-debug-apk.yml`：

```yaml
name: Build and Release Android APK

on:
  push:
    tags:
      - 'v*'  # 当推送v开头的tag时触发

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      # ... 构建步骤 ...
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: prajna-buddy/android/app/build/outputs/apk/release/app-release.apk
          name: 般若伴读 ${{ github.ref_name }}
          body: |
            ## 般若伴读 ${{ github.ref_name }}
            
            自动构建的Release版本。
            
            ### 下载
            点击下方的APK文件下载安装包。
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 相关文档

- [GitHub Releases文档](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [GitHub Actions Artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts)
- [App下载页面部署说明](./App下载页面部署说明.md)

---

最后更新：2026年3月27日
