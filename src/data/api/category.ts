// src/data/api/articles.ts
import { serverFetch } from '@/lib/server/api';

//all categories | storytelling islam
export const getCategory = async () => {
  try {
    const data = await serverFetch.get<{ data: any[] }>('/api/frontend/all-category-list', {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch categories', error);
    return { data: [] };
  }
};

//top trending topics
export const getTopTrendingTopics = async () => {
  try {
    const data = await serverFetch.get<{ data: any[] }>('/api/frontend/top-trending-topics', {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch top trending topics', error);
    return { data: [] };
  }
};

//quran subcategories
export const getQuranSubcategories = async (options?: { limit?: number }) => {
  try {
    const response = await serverFetch.get<{ 
      data: Array<{ 
        subcategories: any[] 
      }> 
    }>('/api/frontend/quran-categories', {
      next: { revalidate: 60 },
      limit: options?.limit
    });

    // Extract and flatten all subcategories from all categories
    return response?.data.flatMap(category => 
      category.subcategories || []
    ) || [];
  } catch (error) {
    console.error('Failed to fetch quran subcategories', error);
    return [];
  }
};



