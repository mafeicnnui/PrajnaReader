export type CategoryId =
  | 'sutra'
  | 'cartoon'
  | 'culture'
  | 'science'
  | 'movie';

export interface Category {
  id: CategoryId;
  title: string;
}

export interface VideoItem {
  id: string;
  categoryId: CategoryId;
  title: string;
  url: string;
  coverUrl?: string;
  description?: string;
}

export const categories: Category[] = [
  { id: 'sutra', title: '经典阅读' },
  { id: 'cartoon', title: '佛教动画故事' },
  { id: 'culture', title: '传统文化' },
  { id: 'science', title: '科学实验' },
  { id: 'movie', title: '佛教影视' },
];

export const videos: VideoItem[] = [
  {
    id: 'sample-mp4-1',
    categoryId: 'cartoon',
    title: 'Sample MP4 (replace with OSS/NAS URL)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Demo video link. Replace with your own mp4 URL from OSS/NAS.',
  },
];

export function getCategory(categoryId: string | undefined): Category | undefined {
  return categories.find((c) => c.id === categoryId);
}

export function getVideosByCategory(categoryId: string | undefined): VideoItem[] {
  return videos.filter((v) => v.categoryId === categoryId);
}

export function getVideo(videoId: string | undefined): VideoItem | undefined {
  return videos.find((v) => v.id === videoId);
}
