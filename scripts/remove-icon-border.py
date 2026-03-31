#!/usr/bin/env python3
"""
去除图标白边的Python脚本
需要安装: pip install Pillow
"""

from PIL import Image, ImageChops
import sys

def trim_whitespace(image):
    """去除图片周围的白边"""
    # 转换为RGBA
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # 获取图片的边界框（去除透明和白色部分）
    bg = Image.new('RGBA', image.size, (255, 255, 255, 0))
    diff = ImageChops.difference(image, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    
    if bbox:
        return image.crop(bbox)
    return image

def process_icon(input_path, output_path, size=(180, 180)):
    """处理图标：去白边 + 调整大小"""
    print(f"读取图标: {input_path}")
    
    # 打开图片
    img = Image.open(input_path)
    print(f"原始尺寸: {img.size}")
    
    # 去除白边
    print("去除白边...")
    img_trimmed = trim_whitespace(img)
    print(f"裁剪后尺寸: {img_trimmed.size}")
    
    # 调整大小（保持比例）
    print(f"调整大小到: {size}")
    img_trimmed.thumbnail(size, Image.Resampling.LANCZOS)
    
    # 创建新画布（居中）
    final_img = Image.new('RGBA', size, (0, 0, 0, 0))
    offset = ((size[0] - img_trimmed.size[0]) // 2,
              (size[1] - img_trimmed.size[1]) // 2)
    final_img.paste(img_trimmed, offset, img_trimmed)
    
    # 保存
    print(f"保存到: {output_path}")
    final_img.save(output_path, 'PNG')
    print("✅ 完成!")

if __name__ == '__main__':
    try:
        input_file = 'tts-server/public/pwa-192x192.png'
        output_file = 'prajna-buddy/public/apple-touch-icon-fixed.png'
        
        print("=== 去除图标白边 ===\n")
        process_icon(input_file, output_file)
        
        # 复制到其他位置
        print("\n复制到其他位置...")
        import shutil
        shutil.copy(output_file, 'prajna-buddy/public/apple-touch-icon.png')
        shutil.copy(output_file, 'prajna-buddy/public/pwa-192x192.png')
        shutil.copy(output_file, 'prajna-buddy/public/pwa-512x512.png')
        print("✅ 已更新所有图标文件")
        
        print("\n=== 完成 ===")
        print("\n下一步:")
        print("1. cd prajna-buddy")
        print("2. npm run build")
        print("3. 上传dist到服务器")
        
    except ImportError:
        print("❌ 未安装Pillow库")
        print("\n请安装: pip install Pillow")
        sys.exit(1)
    except Exception as e:
        print(f"❌ 错误: {e}")
        sys.exit(1)
