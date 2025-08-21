// src/data/api/articles.ts
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