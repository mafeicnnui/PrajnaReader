# Prajna Buddy (般若伴读)

本仓库用于开发 **Prajna Buddy（般若伴读）** Android App（技术栈：**Ionic React + Capacitor**）。

## 项目结构

- `prajna-buddy/`
  - Ionic React 主工程（Web 代码 + Capacitor 原生壳）
  - Android 工程会生成在 `prajna-buddy/android/`

## 为什么代码在 `prajna-buddy/` 目录下？

Ionic 的脚手架默认会创建一个 **项目目录**（这里是 `prajna-buddy`），而不是把所有文件直接铺在仓库根目录。

为了满足“在仓库根目录一键构建”的使用习惯，根目录提供了一个轻量的 `package.json` 作为 **代理脚本**，把命令转发到 `prajna-buddy/` 下执行。

## 环境要求

- Node.js（你机器上已可用）
- Android Studio + Android SDK（用于运行/打包 Android 工程）

## 根目录一键工作流（推荐）

以下命令都在仓库根目录（`PrajnaReader/`）执行。

- Web 预览（开发服务器）

  `npm run dev`

- 构建 Web 资源（生成 `dist/`）

  `npm run build`

- 同步 Web 资源到 Android（Capacitor）

  `npm run cap:sync:android`

- 添加 Android 平台（首次执行一次即可）

  `npm run cap:add:android`

- 打开 Android Studio 工程

  `npm run android:open`

## GitHub Actions 自动构建 APK

本仓库已包含 GitHub Actions 工作流：`.github/workflows/android-debug-apk.yml`。

- **触发方式**
  - `push` 到 `main`
  - 对 `main` 的 `pull_request`
  - 手动触发（`workflow_dispatch`）

- **产物**
  - Actions 会构建并上传 **Release APK** 作为 Artifact：`Prajna-Reader-apk`
  - 下载路径：GitHub 仓库 -> Actions -> 选择一次运行 -> Artifacts
  - 下载后得到：`Prajna-Reader.apk`

## Android 签名（用于可覆盖安装/升级）

为了保证手机上安装的 APK 可以持续升级（避免“签名不一致无法覆盖安装”），Release 构建使用固定 keystore 签名。

- 本机构建：在 `prajna-buddy/android/` 下准备 `keystore.properties`（已被 `.gitignore` 忽略，勿提交）
- CI 构建：在 GitHub 仓库 Secrets 中配置：
  - `ANDROID_KEYSTORE_BASE64`
  - `ANDROID_KEYSTORE_PASSWORD`
  - `ANDROID_KEY_ALIAS`
  - `ANDROID_KEY_PASSWORD`

## 当前功能（MVP）

- 视频
  - 分类入口
  - 分类视频列表
  - MP4 播放（HTML5 `<video>`）

- 经典阅读
  - 经典列表 -> 章节列表 -> 章节阅读
  - 目前内置：《地藏菩萨本愿经》（样例数据）
  - 模式：经文 / 拼音 / 白话
  - 背诵模式：点击段落显示/隐藏
  - 段落收藏：星标按钮
  - 章节切换：工具栏弹出章节列表
  - 音频：章节朗读（支持循环）

## 内容配置

- 视频清单：`prajna-buddy/src/data/content.ts`
- 《地藏经》样例内容：`prajna-buddy/src/data/dizang.ts`

后续会把这些清单迁移为从 OSS/NAS 拉取的远程 JSON，方便你在线更新内容。
