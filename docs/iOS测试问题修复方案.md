# iOS测试问题修复方案

## 问题总结

### 问题1：iOS图标白边问题 ⚠️
**现象**：通过Safari浏览器添加至桌面后，图标与安卓不一致，苹果的图标多一圈白边

**截图对比**：
- 图1（安卓）：图标正常，无白边，圆角自然
- 图2（iOS）：图标外围有明显白色边框，看起来像是在白色方形背景上

**原因分析**：
- iOS对PWA图标有特殊要求，需要专门的`apple-touch-icon`
- 当前的`apple-touch-icon.png`包含透明背景，iOS自动填充为白色
- 图标内容没有填满整个画布，留有边距
- iOS会对透明背景的图标自动添加白色背景并保持方形

**解决方案**：
1. 重新设计`apple-touch-icon.png`，确保：
   - 尺寸：180x180px（推荐）或 192x192px
   - 格式：PNG，**必须使用不透明背景**（建议使用渐变背景色 #667eea）
   - 内容：图标应该填满整个画布，**不留任何边距**
   - 圆角：iOS会自动添加圆角，**不需要预先设计圆角**
   - 背景：使用与主题色相同的渐变背景，而不是透明或白色

2. 具体设计建议：
   ```
   - 背景：使用 #667eea 到 #764ba2 的渐变（与应用主题一致）
   - 图标内容：莲花+经书图案，占据画布的 85-90%
   - 确保图标边缘到画布边缘没有空白
   - 导出时选择"不透明"，填充背景色
   ```

3. 在`index.html`中添加多个尺寸的apple-touch-icon：
```html
<!-- iOS图标 - 多尺寸支持 -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

4. 验证方法：
   - 使用在线工具检查图标：https://realfavicongenerator.net/
   - 确保图标没有透明区域
   - 在iOS设备上删除旧图标，重新添加到桌面测试

### 问题2：iOS PWA模式下音频播放失败 🔴
**现象**：
- 在Safari浏览器中访问`app.zhdnpx.cn`正常，音频可以播放
- 通过桌面图标打开时，响应慢，播放时报"音频加载失败，请检查网络连接"（红色提示）
- 日志显示：`206 Partial Content`（这是正常的Range请求响应）
- 播放器显示时长 0:00，无法播放

**截图分析**（图3）：
- 顶部显示红色错误提示："音频加载失败，请检查网络连接"
- 播放器控制栏显示：音频 0:00 / 0:00
- 播放按钮无法点击
- 这表明音频资源完全无法加载

**原因分析**：
1. **iOS PWA Standalone模式的网络限制**：
   - iOS PWA在standalone模式下，网络请求的行为与Safari浏览器不同
   - 可能存在更严格的CORS检查
   - Service Worker的缓存策略可能影响音频加载

2. **Range请求处理问题**：
   - iOS音频播放器会发送Range请求（206 Partial Content）
   - 当前Nginx配置虽然转发了Range头，但可能没有正确处理响应
   - TTS服务器可能没有正确支持Range请求

3. **CORS配置不完整**：
   - 当前配置使用 `Access-Control-Allow-Origin: *`
   - iOS PWA可能需要更明确的域名配置
   - 缺少 `Access-Control-Allow-Credentials` 可能导致问题

4. **音频URL协议问题**：
   - PWA必须使用HTTPS
   - 如果有任何HTTP资源会被阻止

5. **Service Worker缓存问题**：
   - 音频资源可能被错误缓存
   - 206响应可能没有被正确处理

**解决方案**：

#### 方案A：修复TTS服务器CORS配置（推荐）

检查`tts-server`的CORS配置，确保包含：

```python
# tts-server/main.py 或相关文件
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://app.zhdnpx.cn",
        "https://tts.zhdnpx.cn",
        "https://files.zhdnpx.cn"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Range", "Accept-Ranges", "Content-Length"]
)
```

#### 方案B：添加音频预加载和错误处理

修改`prajna-buddy/src/pages/SutraChapterReader.tsx`：

```typescript
// 添加iOS特殊处理
const isIOSPWA = () => {
  return (
    window.navigator.standalone === true || // iOS PWA
    window.matchMedia('(display-mode: standalone)').matches
  );
};

// 修改音频URL构建
const getSectionAudioUrl = (sectionId: string, voiceType: VoiceId): string => {
  const ttsApiUrl = import.meta.env.VITE_TTS_API_URL || 'https://tts.zhdnpx.cn';
  
  // iOS PWA模式下，添加时间戳避免缓存问题
  const timestamp = isIOSPWA() ? `&t=${Date.now()}` : '';
  
  const url = `${ttsApiUrl}/tts/section/mp3?section_id=${sectionId}&voice=${voiceType}${timestamp}`;
  
  console.log('[音频URL]', {
    isIOSPWA: isIOSPWA(),
    url
  });
  
  return url;
};

// 添加音频加载重试机制
const playSection = async (sectionId: string, retryCount = 0) => {
  const audioUrl = getSectionAudioUrl(sectionId, voice);
  const audio = audioRef.current;
  if (!audio) return;

  try {
    setCurrentSectionId(sectionId);
    setAudioError(undefined);
    
    // iOS需要先设置src，等待一小段时间再播放
    audio.src = audioUrl;
    
    if (isIOSPWA()) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    await audio.play();
    scrollToSection(sectionId);
  } catch (error) {
    console.error('播放失败:', error, '重试次数:', retryCount);
    
    // 重试机制
    if (retryCount < 3) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return playSection(sectionId, retryCount + 1);
    }
    
    setAudioError('音频加载失败');
    presentToast({
      message: 'iOS音频加载失败，请检查网络连接或尝试在Safari中打开',
      duration: 3000,
      color: 'danger'
    });
  }
};
```

#### 方案C：Nginx配置优化

检查`nginx-config/tts.zhdnpx.cn.conf`，确保：

```nginx
location /tts/ {
    proxy_pass http://tts-server:8000/tts/;
    
    # CORS配置
    add_header 'Access-Control-Allow-Origin' 'https://app.zhdnpx.cn' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Range, Content-Type, Authorization' always;
    add_header 'Access-Control-Expose-Headers' 'Content-Range, Accept-Ranges, Content-Length' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;
    
    # 处理OPTIONS预检请求
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' 'https://app.zhdnpx.cn' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Range, Content-Type, Authorization' always;
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
    }
    
    # Range请求支持
    proxy_set_header Range $http_range;
    proxy_set_header If-Range $http_if_range;
    proxy_http_version 1.1;
    
    # 其他代理配置
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # 超时设置
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}
```

### 问题3：响应慢的问题
**现象**：桌面图标打开时明显响应慢

**原因分析**：
1. Service Worker缓存策略可能不当
2. 首次加载资源较多
3. iOS PWA模式下的网络请求限制

**解决方案**：

#### 优化Service Worker缓存策略

检查`prajna-buddy/vite.config.ts`中的PWA配置：

```typescript
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    // 运行时缓存策略
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/tts\.zhdnpx\.cn\/tts\/.*/i,
        handler: 'NetworkFirst', // 音频优先使用网络
        options: {
          cacheName: 'tts-audio-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 7 // 7天
          },
          cacheableResponse: {
            statuses: [0, 200, 206] // 支持206 Partial Content
          }
        }
      },
      {
        urlPattern: /^https:\/\/app\.zhdnpx\.cn\/.*/i,
        handler: 'CacheFirst', // 静态资源优先使用缓存
        options: {
          cacheName: 'app-static-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30 // 30天
          }
        }
      }
    ]
  }
})
```

## 快速诊断

在修复之前，建议先使用诊断工具确定具体问题：

### 使用诊断工具

1. 在iOS设备的Safari浏览器中访问：`https://app.zhdnpx.cn/ios-audio-test.html`
2. 依次点击各个测试按钮：
   - **环境检测**：自动运行，显示设备和PWA状态
   - **音频URL测试**：检查TTS服务器是否可访问
   - **CORS测试**：检查跨域配置是否正确
   - **Range请求测试**：检查是否支持206 Partial Content
   - **音频播放测试**：实际播放测试音频

3. 将桌面图标添加到主屏幕，然后从主屏幕打开，再次运行测试
4. 对比两次测试结果，找出PWA模式下的具体问题
5. 截图保存测试结果，用于问题分析

### 诊断结果分析

根据测试结果判断问题类型：

| 测试项 | Safari正常 | PWA失败 | 可能原因 |
|--------|-----------|---------|----------|
| 音频URL | ✓ | ✗ | HTTPS配置或网络问题 |
| CORS | ✓ | ✗ | CORS配置不支持PWA模式 |
| Range请求 | ✓ | ✗ | Range请求处理有问题 |
| 音频播放 | ✓ | ✗ | 综合问题，需要详细排查 |

## 实施步骤

### 第一步：修复图标问题
1. 使用图像编辑工具重新生成`apple-touch-icon.png`（180x180px，不透明背景）
2. 更新`index.html`中的图标链接
3. 清除iOS设备上的旧图标，重新添加到桌面

### 第二步：修复音频播放问题
1. 更新TTS服务器的CORS配置
2. 更新Nginx配置，确保正确处理Range请求
3. 在前端代码中添加iOS特殊处理和重试机制
4. 重启相关服务

### 第三步：优化性能
1. 更新Service Worker缓存策略
2. 测试PWA加载速度

### 第四步：测试验证
1. 在iOS Safari中测试音频播放
2. 添加到桌面后测试PWA模式
3. 验证图标显示正确
4. 验证音频播放正常
5. 检查响应速度

## 测试清单

- [ ] iOS Safari浏览器中音频播放正常
- [ ] iOS PWA模式下音频播放正常
- [ ] 桌面图标无白边
- [ ] PWA启动速度正常
- [ ] 网络错误提示友好
- [ ] 支持离线缓存
- [ ] Android设备功能正常（回归测试）

## 相关文件

- `prajna-buddy/index.html` - HTML配置
- `prajna-buddy/public/manifest.json` - PWA配置
- `prajna-buddy/src/pages/SutraChapterReader.tsx` - 音频播放逻辑
- `prajna-buddy/vite.config.ts` - PWA构建配置
- `nginx-config/tts.zhdnpx.cn.conf` - TTS服务器Nginx配置
- `tts-server/main.py` - TTS服务器CORS配置

## 注意事项

1. iOS对PWA的支持有限制，某些功能可能需要特殊处理
2. 修改后需要清除iOS设备缓存并重新添加到桌面
3. 音频Range请求是iOS的标准行为，服务器必须正确支持
4. CORS配置必须包含`expose_headers`，否则iOS无法读取Content-Range等头部
5. 建议在真实iOS设备上测试，模拟器可能表现不同

## 更新日期
2026-03-27
