import { SutraSection, dizangSutraTitle, dizangSections } from './dizang';

export type VoiceId = 'male' | 'female';

export interface ChapterAudio {
  male?: string;
  female?: string;
}

export interface SutraChapter {
  id: string;
  title: string;
  sectionIds: string[];
  audio?: ChapterAudio;
}

export interface SutraBook {
  id: string;
  title: string;
  chapters: SutraChapter[];
}

export const defaultAudioBaseUrl: string = '';

export function resolveAudioUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  const base: string = defaultAudioBaseUrl || '';
  if (!base) return url;
  return `${base.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}

export const dizangBook: SutraBook = {
  id: 'dizang',
  title: dizangSutraTitle,
  chapters: [
    {
      id: 'xiangzan',
      title: '香赞',
      sectionIds: ['preface-1'],
    },
    {
      id: 'juelinpusajie',
      title: '觉林菩萨偈',
      sectionIds: ['preface-2'],
    },
    {
      id: 'zan',
      title: '赞',
      sectionIds: ['preface-3'],
    },
    {
      id: 'kaijingji',
      title: '开经偈',
      sectionIds: ['preface-4'],
    },
    {
      id: 'chapter-1',
      title: '第一品 忉利天宫神通品',
      sectionIds: [
        'ch1-1', 'ch1-2', 'ch1-3', 'ch1-4', 'ch1-5', 'ch1-6', 'ch1-7',
        'ch1-8', 'ch1-9', 'ch1-10', 'ch1-11', 'ch1-12', 'ch1-13', 'ch1-14',
        'ch1-15', 'ch1-16', 'ch1-17', 'ch1-18', 'ch1-19', 'ch1-20', 'ch1-21'
      ],
    },
    {
      id: 'chapter-2',
      title: '第二品 分身集会品',
      sectionIds: ['ch2-1', 'ch2-2'],
    },
    {
      id: 'chapter-3',
      title: '第三品 观众生业缘品',
      sectionIds: ['ch3-1', 'ch3-2'],
    },
    {
      id: 'chapter-4',
      title: '第四品 阎浮众生业感品',
      sectionIds: ['ch4-1', 'ch4-2'],
    },
    {
      id: 'chapter-5',
      title: '第五品 地狱名号品',
      sectionIds: ['ch5-1', 'ch5-2'],
    },
    {
      id: 'chapter-6',
      title: '第六品 如来赞叹品',
      sectionIds: ['ch6-1', 'ch6-2'],
    },
    {
      id: 'chapter-7',
      title: '第七品 利益存亡品',
      sectionIds: ['ch7-1'],
    },
    {
      id: 'chapter-8',
      title: '第八品 阎罗王众赞叹品',
      sectionIds: ['ch8-1', 'ch8-2'],
    },
    {
      id: 'chapter-9',
      title: '第九品 称佛名号品',
      sectionIds: ['ch9-1', 'ch9-2'],
    },
    {
      id: 'chapter-10',
      title: '第十品 校量布施功德缘品',
      sectionIds: ['ch10-1'],
    },
    {
      id: 'chapter-11',
      title: '第十一品 地神护法品',
      sectionIds: ['ch11-1', 'ch11-2'],
    },
    {
      id: 'chapter-12',
      title: '第十二品 见闻利益品',
      sectionIds: ['ch12-1', 'ch12-2'],
    },
    {
      id: 'chapter-13',
      title: '第十三品 嘱累人天品',
      sectionIds: ['ch13-1', 'ch13-2', 'ch13-3'],
    },
    {
      id: 'huixiangji',
      title: '回向偈',
      sectionIds: ['dedication-1'],
    },
    {
      id: 'sanguiyi',
      title: '三皈依',
      sectionIds: ['dedication-2'],
    },
    {
      id: 'huixiang',
      title: '回向',
      sectionIds: ['dedication-3'],
    },
  ],
};

export function getChapter(chapterId: string | undefined): SutraChapter | undefined {
  return dizangBook.chapters.find((c) => c.id === chapterId);
}

export function getSectionsByIds(sectionIds: string[]): SutraSection[] {
  const map = new Map(dizangSections.map((s) => [s.id, s] as const));
  return sectionIds.map((id) => map.get(id)).filter(Boolean) as SutraSection[];
}
