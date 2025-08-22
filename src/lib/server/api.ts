// src/lib/server/api.ts
const API_BASE_URL = 'https://king-prawn-app-x9z27.ondigitalocean.app';

interface ApiOptions {
  requiresAuth?: boolean;
  headers?: Record<string, string>;
  limit?: number;  // Add limit to the options
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

export const serverFetch = {
  get: async <T = any>(
    url: string,
    options: ApiOptions = {}
  ): Promise<T> => {
    const { requiresAuth = false, headers = {}, next, limit } = options;
    const language = 'en'; // Get from cookies/headers in server components

    // Build query parameters
    const params = new URLSearchParams();
    params.append('lang', language);
    
    // Add limit if provided
    if (limit) {
      params.append('limit', limit.toString());
    }

    // Handle URL with query parameters
    const hasQuery = url.includes('?');
    const urlWithParams = `${url}${hasQuery ? '&' : '?'}${params.toString()}`;

    // Set up headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (requiresAuth) {
      // Auth logic here
    }

    try {
      const response = await fetch(`${API_BASE_URL}${urlWithParams}`, {
        method: 'GET',
        headers: requestHeaders,
        next: next, // This works with Next.js fetch
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Fetch Error:', error);
      throw error;
    }
  },
  // Add other methods (post, put, delete) following the same pattern
};