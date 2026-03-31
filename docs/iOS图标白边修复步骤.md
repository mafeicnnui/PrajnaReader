# iOS图标白边修复步骤

## 快速修复方案

### 步骤1：替换图标文件

在本地执行：

```powershell
# 备份旧图标
Copy-Item prajna-buddy/public/apple-touch-icon.png prajna-buddy/public/apple-touch-icon.png.bak

# 用pwa-192x192.png替换（假设这个没有白边）
Copy-Item prajna-buddy/public/pwa-192x192.png prajna-buddy/public/apple-touch-icon.png -Force
```

### 步骤2：重新构建

```powershell
cd prajna-buddy
npm run build
```

### 步骤3：上传到服务器

上传 `prajna-buddy/dist/` 目录到服务器的 `/usr/share/nginx/app/`

### 步骤4：在iPhone上测试

1. **删除旧的App**
   - 长按主屏幕上的"般若伴读"图标
   - 点击"删除App"

2. **清除Safari缓存**
   - 设置 → Safari → 清除历史记录与网站数据

3. **重新添加**
   - 打开Safari
   - 访问 https://app.zhdnpx.cn
   - 点击分享按钮
   - 选择"添加到主屏幕"

4. **检查图标**
   - 查看主屏幕上的图标是否还有白边

## 如果还有白边

### 方案A：使用图片编辑器手动处理

1. 打开 `prajna-buddy/public/pwa-192x192.png`
2. 检查是否有白边
3. 如果有，裁剪掉白边
4. 调整大小为 180x180 像素
5. 保存为 `apple-touch-icon.png`

### 方案B：提供无白边的原始图标

如果你有原始的无白边图标：

1. 将图标放到 `prajna-buddy/public/` 目录
2. 命名为 `apple-touch-icon.png`
3. 确保尺寸为 180x180 像素
4. 重新构建和部署

## iOS图标要求

- **尺寸**：180x180 像素（推荐）
- **格式**：PNG
- **圆角**：不需要（iOS会自动添加）
- **背景**：可以是透明或纯色
- **内容**：应该填满画布，不要有白边

## 验证图标

在上传前，可以在本地验证：

```powershell
# 查看图标信息
Get-Item prajna-buddy/public/apple-touch-icon.png | Select-Object Name, Length

# 如果安装了ImageMagick
magick identify prajna-buddy/public/apple-touch-icon.png
```

## 注意事项

1. **缓存问题**：iOS会缓存图标，必须删除App后重新添加
2. **文件名**：必须是 `apple-touch-icon.png`
3. **位置**：必须在 `public/` 目录下
4. **构建**：修改后必须重新构建

## 相关文档

- [修复iOS图标详细指南](../scripts/fix-ios-icon.md)
- [PWA部署指南](./PWA部署指南.md)
