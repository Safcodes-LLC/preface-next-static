// src/lib/server/api.ts
const API_BASE_URL = 'https://king-prawn-app-x9z27.ondigitalocean.app';

interface ApiOptions {
  requiresAuth?: boolean;
  headers?: Record<string, string>;
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
    const { requiresAuth = false, headers = {}, next } = options;
    const language = 'en'; // Get from cookies/headers in server components

    // Handle URL with language
    const hasQuery = url.includes('?');
    const urlWithLang = `${url}${hasQuery ? '&' : '?'}lang=${encodeURIComponent(language)}`;

    // Set up headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    if (requiresAuth) {
      // Get token from cookies in server components
      // const token = cookies().get('auth_token')?.value;
      // if (token) {
      //   requestHeaders['Authorization'] = `Bearer ${token}`;
      // }
    }

    try {
      const response = await fetch(`${API_BASE_URL}${urlWithLang}`, {
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