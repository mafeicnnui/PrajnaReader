// 地藏菩萨本愿经 - 主索引文件
// 导入所有章节并导出完整数据

import { SutraSection } from './types';
import { dizangSutraTitle, dizangChapters } from './metadata';
import { incensePraise, juelinBodhisattvaVerse, praise, openingSutra } from './preface';
import { chapter1Sections } from './chapter01';
import { chapter2Sections } from './chapter02';
import { chapter3Sections } from './chapter03';
import { chapter4Sections } from './chapter04';
import { chapter5Sections } from './chapter05';
import { chapter6Sections } from './chapter06';
import { chapter7Sections } from './chapter07';
import { chapter8Sections } from './chapter08';
import { chapter9Sections } from './chapter09';
import { chapter10Sections } from './chapter10';
import { chapter11Sections } from './chapter11';
import { chapter12Sections } from './chapter12';
import { chapter13Sections } from './chapter13';
import { dedication, threeRefuges, finalDedication } from './dedication';

// 导出标题和章节信息
export { dizangSutraTitle, dizangChapters };

// 导出类型
export type { SutraSection, ChapterInfo } from './types';

// 序文部分
export const prefaceSections: SutraSection[] = [
  incensePraise,
  juelinBodhisattvaVerse,
  praise,
  openingSutra,
];

// 回向部分
export const dedicationSections: SutraSection[] = [
  dedication,
  threeRefuges,
  finalDedication,
];

// 完整经文数据（按顺序）
export const dizangFullSections: SutraSection[] = [
  ...prefaceSections,
  ...chapter1Sections,
  ...chapter2Sections,
  ...chapter3Sections,
  ...chapter4Sections,
  ...chapter5Sections,
  ...chapter6Sections,
  ...chapter7Sections,
  ...chapter8Sections,
  ...chapter9Sections,
  ...chapter10Sections,
  ...chapter11Sections,
  ...chapter12Sections,
  ...chapter13Sections,
  ...dedicationSections,
];

// 按章节导出
export {
  incensePraise,
  juelinBodhisattvaVerse,
  praise,
  openingSutra,
  chapter1Sections,
  chapter2Sections,
  chapter3Sections,
  chapter4Sections,
  chapter5Sections,
  chapter6Sections,
  chapter7Sections,
  chapter8Sections,
  chapter9Sections,
  chapter10Sections,
  chapter11Sections,
  chapter12Sections,
  chapter13Sections,
  dedication,
  threeRefuges,
  finalDedication,
};
