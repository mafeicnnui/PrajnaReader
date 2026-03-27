// 地藏菩萨本愿经数据
// 本文件从模块化的 dizang/ 目录导出完整的地藏经数据

export type { SutraSection, ChapterInfo } from './dizang/types';
export { 
  dizangSutraTitle, 
  dizangChapters
} from './dizang/metadata';

// 导出完整的经文数据（使用新的模块化结构）
export { dizangFullSections as dizangSections } from './dizang/index';
