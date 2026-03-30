/**
 * 导出地藏经段落数据为 JSON 格式
 * 简单版本 - 直接从 TypeScript 源文件中提取数据
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取所有章节文件
const chapters = [];
for (let i = 1; i <= 13; i++) {
  const chapterFile = join(__dirname, 'src', 'data', 'dizang', `chapter${String(i).padStart(2, '0')}.ts`);
  chapters.push(readFileSync(chapterFile, 'utf-8'));
}

// 读取序文和回向
const prefaceFile = join(__dirname, 'src', 'data', 'dizang', 'preface.ts');
const dedicationFile = join(__dirname, 'src', 'data', 'dizang', 'dedication.ts');
const preface = readFileSync(prefaceFile, 'utf-8');
const dedication = readFileSync(dedicationFile, 'utf-8');

// 提取段落的简单正则表达式
function extractSections(content) {
  const sections = [];
  // 匹配 id: "xxx", title: "xxx", text: "xxx" 的模式
  const regex = /{\s*id:\s*['"]([^'"]+)['"]\s*,\s*title:\s*['"]([^'"]+)['"]\s*,\s*text:\s*['"]([^'"]+)['"]/gs;
  
  let match;
  while ((match = regex.exec(content)) !== null) {
    sections.push({
      id: match[1],
      title: match[2],
      text: match[3].replace(/\\n/g, '\n') // 转换换行符
    });
  }
  
  return sections;
}

// 提取所有段落
const allSections = [];

console.log('正在提取段落数据...\n');

// 序文
const prefaceSections = extractSections(preface);
console.log(`序文: ${prefaceSections.length} 段`);
allSections.push(...prefaceSections);

// 各章节
for (let i = 0; i < chapters.length; i++) {
  const chSections = extractSections(chapters[i]);
  console.log(`第${i + 1}品: ${chSections.length} 段`);
  allSections.push(...chSections);
}

// 回向
const dedicationSections = extractSections(dedication);
console.log(`回向: ${dedicationSections.length} 段`);
allSections.push(...dedicationSections);

console.log(`\n总计: ${allSections.length} 段\n`);

// 生成输出数据
const output = {
  bookId: 'dizang',
  title: '地藏菩萨本愿经',
  sections: allSections
};

// 写入文件
const outputPath = join(__dirname, '..', 'tts-server', 'data', 'sections.json');
writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

console.log('✓ 导出成功！');
console.log(`  输出文件: ${outputPath}`);
console.log('\n下一步:');
console.log('  1. 将 sections.json 上传到 TTS 服务器');
console.log('  2. 在服务器上运行: python generate_sections.py');
console.log('  3. 等待音频文件生成完成 (约需要几分钟)');
