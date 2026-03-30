// 测试脚本：验证地藏经数据是否完整
import { dizangSections, dizangChapters } from './src/data/dizang.ts';

console.log('=== 地藏经数据验证 ===\n');
console.log(`总段落数: ${dizangSections.length}`);
console.log(`总章节数: ${dizangChapters.length}\n`);

// 按章节统计段落数
const chapterStats = {};
dizangSections.forEach(section => {
  const chapterId = section.id.split('-')[0]; // 提取章节ID，如 'ch1', 'ch2'
  if (!chapterStats[chapterId]) {
    chapterStats[chapterId] = 0;
  }
  chapterStats[chapterId]++;
});

console.log('各章节段落数统计:');
Object.keys(chapterStats).sort().forEach(chapterId => {
  const count = chapterStats[chapterId];
  const chapter = dizangChapters.find(c => c.id === chapterId);
  const title = chapter ? chapter.title : '未知';
  console.log(`  ${chapterId}: ${count} 段 - ${title}`);
});

console.log('\n=== 第2品详细内容 ===');
const ch2Sections = dizangSections.filter(s => s.id.startsWith('ch2-'));
console.log(`第2品段落数: ${ch2Sections.length}`);
ch2Sections.forEach(s => {
  console.log(`  ${s.id}: ${s.title}`);
  console.log(`    文本长度: ${s.text.length} 字符`);
});
