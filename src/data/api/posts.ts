// src/data/api/posts.ts
import { serverFetch } from '@/lib/server/api';

export const getLatestArticles = async () => {
  try {
    const data = await serverFetch.get<{ data: any[] }>('/api/frontend/latest-articles', {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch latest articles:', error);
    return { data: [] };
  }
};

// islam for beginners under articles
export const getIslamForBeginners = async () => {
  try {
    const response = await serverFetch.get<{ data: { latestArticles: any[] } }>('/api/frontend/islam-for-beginners', {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    return response?.data?.latestArticles || [];
  } catch (error) {
    console.error('Failed to fetch islam for beginners articles', error);
    return [];
  }
};