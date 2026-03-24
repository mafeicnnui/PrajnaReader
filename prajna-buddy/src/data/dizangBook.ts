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
      id: 'kaijingji',
      title: '开经偈',
      sectionIds: ['preface-1'],
      audio: {
        male: '/audio/dizang/kaijingji_male.mp3',
        female: '/audio/dizang/kaijingji_female.mp3',
      },
    },
    {
      id: 'chapter-1',
      title: '第一品 忉利天宫神通品（节选）',
      sectionIds: ['chapter-1-1', 'chapter-1-2'],
      audio: {
        male: '/audio/dizang/chapter-1_male.mp3',
        female: '/audio/dizang/chapter-1_female.mp3',
      },
    },
    {
      id: 'huixiangji',
      title: '回向偈（占位）',
      sectionIds: [],
      audio: {
        male: '/audio/dizang/huixiangji_male.mp3',
        female: '/audio/dizang/huixiangji_female.mp3',
      },
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
