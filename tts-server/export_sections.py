"""
从 prajna-buddy/src/data/dizang-full.ts 导出 sections 数据为 JSON
供 generate_sections.py 使用
"""
import json
import re
from pathlib import Path


def extract_sections_from_ts(ts_file: Path) -> list[dict]:
    """从 TypeScript 文件中提取 section 数据"""
    content = ts_file.read_text(encoding="utf-8")
    sections = []
    
    # 使用更简单的方法：查找所有导出的常量
    # 匹配 export const xxx: SutraSection = { ... }
    
    # 先找到所有单独定义的 section
    single_section_pattern = r'export const \w+: SutraSection = \{([^}]+(?:\{[^}]*\}[^}]*)*)\};'
    
    for match in re.finditer(single_section_pattern, content, re.DOTALL):
        section_content = match.group(1)
        section = extract_section_data(section_content)
        if section:
            sections.append(section)
    
    # 再找数组中的 sections
    # 匹配 chapter1Sections, chapter2Sections 等数组
    array_pattern = r'export const chapter\d+Sections: SutraSection\[\] = \[(.*?)\];'
    
    for match in re.finditer(array_pattern, content, re.DOTALL):
        array_content = match.group(1)
        # 分割每个对象
        objects = split_objects(array_content)
        for obj in objects:
            section = extract_section_data(obj)
            if section:
                sections.append(section)
    
    return sections


def split_objects(content: str) -> list[str]:
    """分割数组中的对象"""
    objects = []
    current_obj = []
    brace_count = 0
    in_string = False
    escape_next = False
    
    for char in content:
        if escape_next:
            current_obj.append(char)
            escape_next = False
            continue
            
        if char == '\\':
            escape_next = True
            current_obj.append(char)
            continue
        
        if char in ['"', "'"]:
            in_string = not in_string
            current_obj.append(char)
            continue
        
        if not in_string:
            if char == '{':
                brace_count += 1
                current_obj.append(char)
            elif char == '}':
                brace_count -= 1
                current_obj.append(char)
                if brace_count == 0:
                    # 对象结束
                    obj_str = ''.join(current_obj).strip()
                    if obj_str:
                        objects.append(obj_str)
                    current_obj = []
            elif brace_count > 0:
                current_obj.append(char)
        else:
            current_obj.append(char)
    
    return objects


def extract_section_data(section_str: str) -> dict:
    """从 section 字符串中提取数据"""
    section = {}
    
    # 提取 id
    id_match = re.search(r'id:\s*[\'"]([^\'"]+)[\'"]', section_str)
    if id_match:
        section['id'] = id_match.group(1)
    else:
        return None
    
    # 提取 title (可选)
    title_match = re.search(r'title:\s*[\'"]([^\'"]*?)[\'"]', section_str)
    if title_match:
        section['title'] = title_match.group(1)
    else:
        section['title'] = ''
    
    # 提取 text
    # 需要处理多行字符串和转义字符
    text_match = re.search(r'text:\s*[\'"](.+?)[\'"](?:\s*,|\s*})', section_str, re.DOTALL)
    if text_match:
        text = text_match.group(1)
        # 处理转义的换行符
        text = text.replace('\\n', '\n')
        # 处理其他转义字符
        text = text.replace('\\\'', "'")
        text = text.replace('\\"', '"')
        section['text'] = text
    else:
        return None
    
    return section


def main():
    # 定位 dizang-full.ts 文件
    ts_file = Path(__file__).resolve().parents[1] / "prajna-buddy" / "src" / "data" / "dizang-full.ts"
    
    if not ts_file.exists():
        print(f"错误: 找不到文件 {ts_file}")
        return
    
    print(f"读取文件: {ts_file}")
    sections = extract_sections_from_ts(ts_file)
    
    if not sections:
        print("警告: 没有提取到任何 section 数据")
        print("尝试使用备用方法...")
        
        # 备用方法：直接读取并手动解析
        content = ts_file.read_text(encoding="utf-8")
        
        # 查找所有包含 id: 的行
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if "id: '" in line or 'id: "' in line:
                print(f"  找到 id 在第 {i+1} 行: {line.strip()[:80]}")
        
        return
    
    print(f"提取到 {len(sections)} 个 sections")
    
    # 输出到 JSON 文件
    output_file = Path(__file__).parent / "data" / "sections.json"
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    data = {
        "bookId": "dizang",
        "title": "地藏菩萨本愿经",
        "sections": sections
    }
    
    output_file.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✓ 已导出到: {output_file}")
    print(f"\n前5个 sections:")
    for i, section in enumerate(sections[:5]):
        print(f"  {i+1}. [{section['id']}] {section.get('title', '(无标题)')}")
        print(f"     文本长度: {len(section['text'])} 字符")


if __name__ == "__main__":
    main()
