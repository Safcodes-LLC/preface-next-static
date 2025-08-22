// src/data/api/articles.ts
import { serverFetch } from '@/lib/server/api';

export const getCategory = async () => {
  try {
    const data = await serverFetch.get<{ data: any[] }>('/api/frontend/all-category-list', {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return { data: [] };
  }
};

export const getTopTrendingTopics = async () => {
  try {
    const data = await serverFetch.get<{ data: any[] }>('/api/frontend/top-trending-topics', {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch top trending topics:', error);
    return { data: [] };
  }
};