#!/usr/bin/env python3
"""
放大图标内容，让它填满画布，减少周围的透明区域
需要安装: pip install Pillow
"""

from PIL import Image
import sys

def enlarge_icon_content(input_path, output_path, scale=1.3, size=(180, 180)):
    """
    放大图标内容
    scale: 放大倍数，1.3表示放大30%
    """
    print(f"读取图标: {input_path}")
    
    # 打开图片
    img = Image.open(input_path)
    print(f"原始尺寸: {img.size}")
    
    # 计算放大后的尺寸
    new_size = (int(img.size[0] * scale), int(img.size[1] * scale))
    print(f"放大到: {new_size} (放大{scale}倍)")
    
    # 放大图片（使用高质量重采样）
    img_enlarged = img.resize(new_size, Image.Resampling.LANCZOS)
    
    # 创建目标尺寸的画布（透明背景）
    final_img = Image.new('RGBA', size, (0, 0, 0, 0))
    
    # 计算居中位置
    offset = ((size[0] - new_size[0]) // 2,
              (size[1] - new_size[1]) // 2)
    
    # 将放大后的图片粘贴到画布中心
    # 如果放大后超出画布，会自动裁剪
    if new_size[0] > size[0] or new_size[1] > size[1]:
        # 需要裁剪
        crop_box = (
            max(0, -offset[0]),
            max(0, -offset[1]),
            min(new_size[0], new_size[0] - offset[0] + size[0]),
            min(new_size[1], new_size[1] - offset[1] + size[1])
        )
        img_enlarged = img_enlarged.crop(crop_box)
        offset = (max(0, offset[0]), max(0, offset[1]))
    
    final_img.paste(img_enlarged, offset, img_enlarged)
    
    # 保存
    print(f"保存到: {output_path}")
    final_img.save(output_path, 'PNG')
    print("✅ 完成!")
    
    return final_img

def add_background_color(img, color=(102, 126, 234, 255)):
    """
    添加背景色（可选）
    color: RGBA颜色，默认是品牌色 #667eea
    """
    bg = Image.new('RGBA', img.size, color)
    bg.paste(img, (0, 0), img)
    return bg

if __name__ == '__main__':
    try:
        input_file = 'tts-server/public/pwa-192x192.png'
        
        print("=== 放大图标内容 ===\n")
        print("选择处理方式:")
        print("1. 放大内容，保持透明背景（推荐）")
        print("2. 放大内容 + 添加品牌色背景")
        print("3. 放大内容 + 添加渐变背景")
        
        choice = input("\n请选择 (1/2/3，默认1): ").strip() or "1"
        
        if choice == "1":
            # 方案1: 只放大，保持透明
            output_file = 'prajna-buddy/public/apple-touch-icon-enlarged.png'
            img = enlarge_icon_content(input_file, output_file, scale=1.4)
            
        elif choice == "2":
            # 方案2: 放大 + 品牌色背景
            output_file = 'prajna-buddy/public/apple-touch-icon-with-bg.png'
            img = enlarge_icon_content(input_file, output_file, scale=1.3)
            img = add_background_color(img, (102, 126, 234, 255))
            img.save(output_file, 'PNG')
            print("✅ 已添加品牌色背景")
            
        elif choice == "3":
            # 方案3: 放大 + 渐变背景
            print("渐变背景需要更复杂的处理，建议使用图像编辑器")
            sys.exit(0)
        
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
        print("4. 在iPhone上测试")
        
    except ImportError:
        print("❌ 未安装Pillow库")
        print("\n请安装: pip install Pillow")
        sys.exit(1)
    except Exception as e:
        print(f"❌ 错误: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
