# iOS音频播放修复方案

## 问题描述

在iPhone上测试原生App时发现以下问题：

1. ✅ PWA版本（app.zhdnpx.cn）音频播放正常
2. ❌ 原生App版本音频播放超时（10秒）
3. ❌ 测试页面显示URL测试失败、CORS测试失败、Range请求失败

## 问题原因

iOS原生App使用WKWebView，对网络请求有更严格的安全限制：

1. **App Transport Security (ATS)** - iOS要求所有网络请求使用HTTPS
2. **CORS策略** - 原生App的CORS检查比浏览器更严格
3. **超时时间** - 原生App的网络请求可能需要更长时间
4. **媒体播放策略** - iOS对音频/视频播放有特殊限制

## 解决方案

### 1. 更新Capacitor配置

已更新 `prajna-buddy/capacitor.config.ts`：

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: '般若阅读',
  webDir: 'dist',
  server: {
    // 允许访问外部URL
    allowNavigation: [
      'https://tts.zhdnpx.cn',
      'https://app.zhdnpx.cn'
    ],
    // iOS需要明确允许HTTP请求（如果有的话）
    cleartext: true
  },
  ios: {
    // 配置内容安全策略
    contentInset: 'always',
    // 允许内联播放
    allowsInlineMediaPlayback: true,
    // 配置scheme
    scheme: 'https'
  }
};

export default config;
```

### 2. 增加音频加载超时时间

已更新 `prajna-buddy/src/pages/SutraChapterReader.tsx`：

- 超时时间从10秒增加到30秒
- 添加 `loadeddata` 事件监听（iOS有时不触发canplay）
- 改进错误处理和日志

### 3. 配置iOS Info.plist

需要在iOS项目中配置App Transport Security。

#### 步骤1：添加iOS平台

```bash
cd prajna-buddy
npm run cap:add:ios
```

#### 步骤2：编辑Info.plist

编辑 `prajna-buddy/ios/App/App/Info.plist`，添加以下配置：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- 现有配置... -->
    
    <!-- App Transport Security 配置 -->
    <key>NSAppTransportSecurity</key>
    <dict>
        <!-- 允许所有HTTP请求（开发环境） -->
        <!-- 生产环境应该只允许特定域名 -->
        <key>NSAllowsArbitraryLoads</key>
        <false/>
        
        <!-- 允许特定域名 -->
        <key>NSExceptionDomains</key>
        <dict>
            <!-- TTS服务器 -->
            <key>tts.zhdnpx.cn</key>
            <dict>
                <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <false/>
                <key>NSIncludesSubdomains</key>
                <true/>
                <key>NSExceptionRequiresForwardSecrecy</key>
                <false/>
            </dict>
            
            <!-- PWA应用 -->
            <key>app.zhdnpx.cn</key>
            <dict>
                <key>NSExceptionAllowsInsecureHTTPLoads</key>
                <false/>
                <key>NSIncludesSubdomains</key>
                <true/>
                <key>NSExceptionRequiresForwardSecrecy</key>
                <false/>
            </dict>
        </dict>
    </dict>
    
    <!-- 音频播放权限 -->
    <key>UIBackgroundModes</key>
    <array>
        <string>audio</string>
    </array>
    
    <!-- 允许内联播放 -->
    <key>WKWebViewConfiguration</key>
    <dict>
        <key>allowsInlineMediaPlayback</key>
        <true/>
        <key>mediaTypesRequiringUserActionForPlayback</key>
        <string>none</string>
    </dict>
</dict>
</plist>
```

### 4. 更新nginx CORS配置

确保TTS服务器的CORS配置允许原生App访问。

编辑 `nginx-config/tts.zhdnpx.cn.conf`，确保有以下配置：

```nginx
# CORS配置 - 允许跨域访问
add_header 'Access-Control-Allow-Origin' '*' always;
add_header 'Access-Control-Allow-Methods' 'GET, POST, HEAD, OPTIONS' always;
add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept, Range, Authorization' always;
add_header 'Access-Control-Expose-Headers' 'Content-Length, Content-Range, Content-Type' always;
add_header 'Access-Control-Max-Age' '1728000' always;
```

### 5. 重新构建和同步

```bash
cd prajna-buddy

# 构建Web资源
npm run build

# 同步到iOS
npx cap sync ios

# 打开Xcode
npx cap open ios
```

### 6. 在Xcode中配置

1. 打开Xcode项目
2. 选择项目 -> Signing & Capabilities
3. 添加 Background Modes capability
4. 勾选 Audio, AirPlay, and Picture in Picture
5. 清理构建（Product -> Clean Build Folder）
6. 重新构建并运行

## 测试步骤

### 1. 测试音频URL可访问性

在Safari中直接访问音频URL：
```
https://tts.zhdnpx.cn/tts/section/mp3?section_id=ch1-1&voice=male
```

应该能直接播放或下载音频文件。

### 2. 测试PWA版本

在iPhone Safari中访问：
```
https://app.zhdnpx.cn
```

测试音频播放是否正常。

### 3. 测试原生App

1. 通过Xcode安装App到iPhone
2. 打开App
3. 进入经典阅读 -> 地藏经 -> 任意章节
4. 点击播放按钮
5. 查看是否能正常播放

### 4. 查看日志

在Xcode中查看Console输出：
- Window -> Devices and Simulators
- 选择设备
- 查看Console日志

## 常见问题

### Q1: 仍然显示"Load failed"

**可能原因**：
- ATS配置不正确
- 域名拼写错误
- SSL证书问题

**解决方案**：
1. 检查Info.plist配置
2. 确认域名正确
3. 测试SSL证书：`openssl s_client -connect tts.zhdnpx.cn:443`

### Q2: 音频加载很慢

**可能原因**：
- 网络速度慢
- TTS服务器响应慢
- 音频文件太大

**解决方案**：
1. 增加超时时间（已改为30秒）
2. 优化TTS服务器性能
3. 添加音频缓存

### Q3: 只有第一次播放失败

**可能原因**：
- iOS的自动播放限制
- 需要用户交互才能播放

**解决方案**：
- 确保播放是由用户点击触发的
- 不要在页面加载时自动播放

### Q4: 后台播放不工作

**可能原因**：
- 没有配置Background Modes
- 音频会话配置不正确

**解决方案**：
1. 在Info.plist中添加Background Modes
2. 在Xcode中启用Audio capability

## 调试技巧

### 1. 启用详细日志

在代码中添加更多日志：

```typescript
console.log('[音频] 开始加载:', audioUrl);
console.log('[音频] 网络状态:', navigator.onLine);
console.log('[音频] 用户代理:', navigator.userAgent);
```

### 2. 使用Safari Web Inspector

1. iPhone设置 -> Safari -> 高级 -> 启用Web检查器
2. Mac上Safari -> 开发 -> [你的iPhone] -> [App名称]
3. 查看Console和Network标签

### 3. 使用Charles Proxy

1. 在Mac上安装Charles
2. 配置iPhone使用Mac作为代理
3. 查看所有网络请求

### 4. 测试不同网络环境

- WiFi
- 4G/5G
- 飞行模式后重新连接

## 性能优化建议

### 1. 音频预加载

```typescript
// 预加载下一段音频
const preloadNext = () => {
  if (currentSectionIndex < sections.length - 1) {
    const nextSection = sections[currentSectionIndex + 1];
    const nextUrl = getSectionAudioUrl(nextSection.id, voice);
    const preloadAudio = new Audio(nextUrl);
    preloadAudio.preload = 'auto';
  }
};
```

### 2. 音频缓存

使用Capacitor的Filesystem API缓存音频文件：

```typescript
import { Filesystem, Directory } from '@capacitor/filesystem';

const cacheAudio = async (url: string, sectionId: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);
    
    await Filesystem.writeFile({
      path: `audio/${sectionId}.mp3`,
      data: base64,
      directory: Directory.Cache
    });
  } catch (error) {
    console.error('缓存音频失败:', error);
  }
};
```

### 3. 降低音频质量

在TTS服务器端提供不同质量的音频：
- 高质量：128kbps（WiFi）
- 标准质量：64kbps（移动网络）
- 低质量：32kbps（弱网络）

## 相关文档

- [iOS测试问题修复方案](./iOS测试问题修复方案.md)
- [iOS应用发布方案](./iOS应用发布方案.md)
- [TTS服务器部署说明](./TTS服务器部署说明.md)

## 参考资料

- [Capacitor iOS Configuration](https://capacitorjs.com/docs/ios/configuration)
- [Apple App Transport Security](https://developer.apple.com/documentation/security/preventing_insecure_network_connections)
- [WKWebView Media Playback](https://developer.apple.com/documentation/webkit/wkwebview)
- [iOS Background Audio](https://developer.apple.com/documentation/avfoundation/media_playback_and_selection/creating_a_basic_video_player_ios_and_tvos/playing_audio_from_a_video_asset_in_the_background)
