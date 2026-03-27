// 地藏菩萨本愿经 - 类型定义

export interface SutraSection {
  id: string;
  title?: string;
  text: string;
  pinyin: string;
  meaning: string;
}

export interface ChapterInfo {
  chapterId: number;
  chapterTitle: string;
  description: string;
}
