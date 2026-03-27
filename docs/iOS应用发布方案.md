# iOS应用发布方案

## 项目现状

- 技术栈：Ionic + Vue 3 + Capacitor
- 已有Android APK
- 天然支持PWA（渐进式Web应用）

## 发布方案对比

### 方案1：PWA（渐进式Web应用）⭐⭐⭐⭐⭐ 推荐优先

#### 优势
- ✅ 完全免费，无需开发者账号
- ✅ 无需审核，立即上线
- ✅ 跨平台（iOS + Android + 桌面）
- ✅ 可添加到主屏幕，类似原生App
- ✅ 支持离线使用
- ✅ 自动更新
- ✅ 项目已支持，只需配置

#### 劣势
- ⚠️ 功能受限（但对阅读类App影响不大）
- ⚠️ 需要用户手动"添加到主屏幕"
- ⚠️ 无法在App Store搜索到

#### 实施步骤

##### 1. 配置PWA

编辑 `prajna-buddy/vite.config.ts`，添加PWA插件：

\`\`\`typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: '般若伴读',
        short_name: '般若伴读',
        description: '地藏菩萨本愿经阅读与诵读',
        theme_color: '#667eea',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/tts\.zhdnpx\.cn\/tts\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'tts-audio-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7天
              }
            }
          }
        ]
      }
    })
  ]
})
\`\`\`

##### 2. 安装依赖

\`\`\`bash
cd prajna-buddy
npm install -D vite-plugin-pwa
\`\`\`

##### 3. 准备图标

创建PWA图标（192x192 和 512x512）：
- 使用在线工具：https://realfavicongenerator.net/
- 或使用设计软件制作

##### 4. 构建和部署

\`\`\`bash
npm run build
\`\`\`

将 `dist/` 目录部署到服务器（如 `https://app.zhdnpx.cn`）

##### 5. 用户使用方式

iOS用户访问网站后：
1. 点击Safari底部的"分享"按钮
2. 选择"添加到主屏幕"
3. 点击添加
4. 在主屏幕上会出现App图标

---

### 方案2：App Store（正规渠道）⭐⭐⭐⭐

#### 优势
- ✅ 最正规、最权威
- ✅ 用户信任度最高
- ✅ 可在App Store搜索
- ✅ 自动更新
- ✅ 全球分发

#### 劣势
- ❌ 需要Apple Developer账号（$99/年）
- ❌ 审核严格（1-2周）
- ❌ 需要Mac电脑构建
- ❌ 宗教类App可能审核更严

#### 实施步骤

##### 1. 注册Apple Developer账号

访问：https://developer.apple.com/programs/
- 个人账号：$99/年
- 公司账号：$99/年（需要邓白氏编码）

##### 2. 准备Mac环境

需要：
- Mac电脑（或租用云Mac）
- Xcode（免费，从App Store下载）
- CocoaPods

##### 3. 配置iOS项目

\`\`\`bash
cd prajna-buddy

# 添加iOS平台
npx cap add ios

# 同步代码
npx cap sync ios

# 打开Xcode
npx cap open ios
\`\`\`

##### 4. 在Xcode中配置

- 设置Bundle ID（如：com.yourname.prajnabuddy）
- 配置签名证书
- 设置App图标和启动画面
- 配置权限（如网络访问）

##### 5. 构建和上传

\`\`\`bash
# 在Xcode中
# Product -> Archive
# 上传到App Store Connect
\`\`\`

##### 6. 提交审核

在App Store Connect中：
- 填写App信息
- 上传截图（必需）
- 填写描述
- 提交审核

##### 7. 审核注意事项

对于佛经类App：
- 明确说明是宗教/文化类应用
- 提供详细的功能说明
- 确保内容合规
- 可能需要提供额外说明

---

### 方案3：TestFlight（内测分发）⭐⭐⭐⭐

#### 优势
- ✅ 审核相对宽松
- ✅ 最多10,000个测试用户
- ✅ 快速迭代
- ✅ 可以收集反馈

#### 劣势
- ❌ 仍需要$99/年开发者账号
- ❌ 每个版本90天有效期
- ❌ 需要Mac电脑

#### 实施步骤

与App Store类似，但：
1. 在App Store Connect中选择"TestFlight"
2. 添加内部测试员（最多100人）或外部测试员（最多10,000人）
3. 分享测试链接给用户
4. 用户通过TestFlight App安装

---

### 方案4：企业签名（不推荐）⭐⭐

#### 优势
- ✅ 可以直接下载安装
- ✅ 不需要App Store审核

#### 劣势
- ❌ 需要企业账号（$299/年）或购买签名服务
- ❌ 签名容易被撤销（掉签）
- ❌ 用户需要信任证书
- ❌ 不稳定，不推荐

---

## 推荐实施路线

### 阶段1：立即上线（1周内）

**使用PWA方案**

1. 配置PWA（1天）
2. 准备图标和资源（1天）
3. 构建和部署（1天）
4. 测试和优化（2天）

成本：$0
用户：iOS + Android + 桌面

### 阶段2：正规发布（1-3个月）

**申请App Store**

1. 注册开发者账号（1周）
2. 准备Mac环境（如果没有）
3. 配置iOS项目（1周）
4. 提交审核（1-2周）
5. 上架成功

成本：$99/年
用户：iOS（App Store）

### 阶段3：持续运营

- PWA：持续更新，自动生效
- App Store：定期更新版本

---

## PWA vs 原生App 功能对比

| 功能 | PWA | 原生App |
|------|-----|---------|
| 文本阅读 | ✅ | ✅ |
| 音频播放 | ✅ | ✅ |
| 离线缓存 | ✅ | ✅ |
| 推送通知 | ⚠️ 受限 | ✅ |
| 后台播放 | ⚠️ 受限 | ✅ |
| 文件下载 | ✅ | ✅ |
| 分享功能 | ✅ | ✅ |
| 主屏幕图标 | ✅ | ✅ |

对于阅读类App，PWA完全够用！

---

## 成本对比

| 方案 | 初始成本 | 年度成本 | 开发时间 |
|------|----------|----------|----------|
| PWA | $0 | $0 | 1周 |
| TestFlight | $99 | $99 | 2-3周 |
| App Store | $99 | $99 | 3-4周 |
| 企业签名 | $299-$1000 | $299+ | 2周 |

---

## 下载页面优化

无论选择哪种方案，都可以在下载页面添加iOS支持：

### PWA方式

\`\`\`html
<div class="ios-section">
    <h3>📱 iOS用户</h3>
    <p>使用Safari浏览器访问：</p>
    <a href="https://app.zhdnpx.cn">https://app.zhdnpx.cn</a>
    <p>然后点击"分享" → "添加到主屏幕"</p>
</div>
\`\`\`

### App Store方式

\`\`\`html
<div class="ios-section">
    <h3>📱 iOS用户</h3>
    <a href="https://apps.apple.com/app/idXXXXXXXX">
        <img src="app-store-badge.svg" alt="Download on App Store">
    </a>
</div>
\`\`\`

---

## 常见问题

### Q1: PWA和原生App有什么区别？

A: PWA是网页应用，但可以像原生App一样使用。主要区别：
- PWA通过浏览器运行，原生App直接运行
- PWA功能略受限，但对阅读类App影响不大
- PWA无需审核，原生App需要审核

### Q2: 没有Mac怎么办？

A: 可以：
1. 租用云Mac服务（如MacStadium、MacinCloud）
2. 使用CI/CD服务（如GitHub Actions的macOS runner）
3. 借用朋友的Mac
4. 先用PWA，等有条件再做原生

### Q3: App Store审核会通过吗？

A: 佛经类App可以通过，但需要：
- 明确标注为宗教/文化类
- 内容合规，无敏感信息
- 功能完整，无bug
- 提供详细说明

### Q4: PWA性能如何？

A: 对于阅读类App，PWA性能完全够用：
- 文本渲染流畅
- 音频播放正常
- 离线缓存有效
- 用户体验良好

### Q5: 可以同时发布PWA和App Store吗？

A: 可以！推荐策略：
- PWA：快速上线，覆盖所有用户
- App Store：长期运营，提升品牌形象

---

## 推荐行动方案

### 立即行动（本周）

1. ✅ 配置PWA
2. ✅ 部署到 `https://app.zhdnpx.cn`
3. ✅ 更新下载页面，添加iOS说明
4. ✅ 测试iOS Safari访问

### 近期计划（1-2个月）

1. 注册Apple Developer账号
2. 准备Mac环境
3. 配置iOS项目
4. 提交App Store审核

### 长期运营

- PWA和App Store双线运营
- 定期更新内容
- 收集用户反馈
- 持续优化体验

---

## 相关资源

- [PWA文档](https://web.dev/progressive-web-apps/)
- [Ionic iOS部署](https://capacitorjs.com/docs/ios)
- [App Store审核指南](https://developer.apple.com/app-store/review/guidelines/)
- [TestFlight文档](https://developer.apple.com/testflight/)

---

最后更新：2026年3月27日
