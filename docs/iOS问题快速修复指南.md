# iOS问题快速修复指南

## 问题概述

根据提供的截图，iOS端存在两个主要问题：

### 1. 图标白边问题 ⚠️
- **现象**：iOS桌面图标外围有白色边框
- **影响**：视觉体验差，与Android不一致
- **优先级**：中等（不影响功能）

### 2. 音频播放失败 🔴
- **现象**：PWA模式下显示"音频加载失败，请检查网络连接"
- **影响**：核心功能无法使用
- **优先级**：高（严重影响用户体验）

## 快速修复步骤

### 第一步：诊断问题（5分钟）

1. 在iOS设备上访问诊断工具：
   ```
   https://app.zhdnpx.cn/ios-audio-test.html
   ```

2. 在Safari浏览器中运行所有测试，记录结果

3. 添加到主屏幕，从PWA模式再次运行测试

4. 对比两次结果，确定具体问题

### 第二步：修复音频问题（15分钟）

#### 方案A：更新Nginx CORS配置（推荐）

1. 编辑 `nginx-config/tts.zhdnpx.cn.conf`

2. 找到CORS配置部分，替换为：

```nginx
# iOS PWA需要明确的域名配置
set $cors_origin "";
if ($http_origin ~* "^https://(app|tts|files)\.zhdnpx\.cn$") {
    set $cors_origin $http_origin;
}

add_header 'Access-Control-Allow-Origin' $cors_origin always;
add_header 'Access-Control-Allow-Methods' 'GET, POST, HEAD, OPTIONS' always;
add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept, Range, Authorization' always;
add_header 'Access-Control-Expose-Headers' 'Content-Length, Content-Range, Content-Type, Accept-Ranges' always;
add_header 'Access-Control-Allow-Credentials' 'true' always;
add_header 'Access-Control-Max-Age' '1728000' always;
```

3. 在 `/tts/` location块中，确保有：

```nginx
location /tts/ {
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' $cors_origin always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Range, Content-Type, Authorization' always;
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
    }
    
    # ... 其他配置 ...
    
    # 支持Range请求（iOS音频播放必需）
    proxy_set_header Range $http_range;
    proxy_set_header If-Range $http_if_range;
    proxy_http_version 1.1;
}
```

4. 重启Nginx：
```bash
docker restart nginx-proxy
# 或
./update-nginx-config.sh
```

#### 方案B：前端添加iOS兼容处理

如果Nginx配置无法修改，可以在前端添加兼容代码：

1. 编辑 `prajna-buddy/src/pages/SutraChapterReader.tsx`

2. 在文件开头添加iOS检测函数：

```typescript
// iOS PWA检测
const isIOSPWA = () => {
  return (
    window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches
  ) && /iPhone|iPad|iPod/.test(navigator.userAgent);
};
```

3. 修改 `getSectionAudioUrl` 函数：

```typescript
const getSectionAudioUrl = (sectionId: string, voiceType: VoiceId): string => {
  const ttsApiUrl = import.meta.env.VITE_TTS_API_URL || 'https://tts.zhdnpx.cn';
  
  // iOS PWA模式下添加时间戳避免缓存
  const timestamp = isIOSPWA() ? `&t=${Date.now()}` : '';
  const url = `${ttsApiUrl}/tts/section/mp3?section_id=${sectionId}&voice=${voiceType}${timestamp}`;
  
  return url;
};
```

4. 修改 `playSection` 函数，添加重试机制：

```typescript
const playSection = async (sectionId: string, retryCount = 0) => {
  const audioUrl = getSectionAudioUrl(sectionId, voice);
  const audio = audioRef.current;
  if (!audio) return;

  try {
    setCurrentSectionId(sectionId);
    setAudioError(undefined);
    
    audio.src = audioUrl;
    
    // iOS需要短暂延迟
    if (isIOSPWA()) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    await audio.play();
    scrollToSection(sectionId);
  } catch (error) {
    console.error('播放失败:', error, '重试:', retryCount);
    
    // 最多重试3次
    if (retryCount < 3) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return playSection(sectionId, retryCount + 1);
    }
    
    setAudioError('音频加载失败');
    presentToast({
      message: 'iOS音频加载失败，请尝试在Safari中打开',
      duration: 3000,
      color: 'danger'
    });
  }
};
```

5. 重新构建并部署：
```bash
cd prajna-buddy
npm run build
./deploy-pwa.sh
```

### 第三步：修复图标问题（10分钟）

1. 使用图像编辑工具（如Photoshop、Figma）打开当前图标

2. 创建新的180x180px画布，背景色使用 `#667eea`（或渐变）

3. 将图标内容放大到填满画布的90%

4. 确保没有透明区域

5. 导出为PNG，命名为 `apple-touch-icon.png`

6. 替换 `prajna-buddy/public/apple-touch-icon.png`

7. 可选：生成多个尺寸（120x120, 152x152, 180x180）

8. 更新 `prajna-buddy/index.html`：

```html
<!-- iOS图标 -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

9. 重新部署前端

### 第四步：测试验证（10分钟）

1. **清除iOS缓存**：
   - 删除主屏幕上的旧图标
   - Safari > 设置 > 高级 > 网站数据 > 删除所有数据

2. **测试Safari浏览器**：
   - 访问 `https://app.zhdnpx.cn`
   - 测试音频播放
   - 运行诊断工具

3. **测试PWA模式**：
   - 添加到主屏幕
   - 检查图标是否正常（无白边）
   - 从主屏幕打开
   - 测试音频播放
   - 运行诊断工具

4. **对比测试结果**：
   - Safari和PWA模式应该都能正常播放
   - 图标应该无白边

## 常见问题

### Q1: 修改后仍然有白边？
A: 确保图标文件没有透明区域，使用在线工具检查：https://realfavicongenerator.net/

### Q2: 音频仍然无法播放？
A: 
1. 检查浏览器控制台错误信息
2. 运行诊断工具查看具体失败原因
3. 检查TTS服务器日志
4. 确认HTTPS证书有效

### Q3: Safari正常但PWA失败？
A: 这是典型的CORS或Service Worker问题，需要：
1. 更新CORS配置
2. 清除Service Worker缓存
3. 检查PWA manifest配置

### Q4: 如何查看详细错误？
A: 
1. iOS Safari: 设置 > Safari > 高级 > Web检查器
2. Mac上使用Safari开发菜单连接iOS设备
3. 查看控制台和网络请求

## 验证清单

修复完成后，请确认以下项目：

- [ ] Safari浏览器中音频播放正常
- [ ] PWA模式下音频播放正常
- [ ] 桌面图标无白边，与Android一致
- [ ] PWA启动速度正常
- [ ] 诊断工具所有测试通过
- [ ] 网络错误提示友好
- [ ] Android设备功能正常（回归测试）

## 相关资源

- 详细修复方案：`docs/iOS测试问题修复方案.md`
- 诊断工具：`https://app.zhdnpx.cn/ios-audio-test.html`
- 修复脚本：`./fix-ios-audio.sh`
- Nginx配置：`nginx-config/tts.zhdnpx.cn.conf`

## 预计时间

- 诊断：5分钟
- 修复音频：15分钟
- 修复图标：10分钟
- 测试验证：10分钟
- **总计：约40分钟**

## 注意事项

1. 修改Nginx配置后必须重启服务
2. iOS设备必须清除缓存才能看到效果
3. 建议在真实iOS设备上测试，模拟器可能不准确
4. 保留配置文件备份，以便回滚
5. 修改后建议在Android设备上回归测试

## 更新日期
2026-03-27
