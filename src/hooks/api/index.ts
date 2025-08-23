// src/hooks/api/index.ts
// Export all API hooks for easy importing

// Generic hook factory
export * from './use-api'

// Posts hooks
export * from './use-posts'

// Categories hooks
export * from './use-categories'

// Re-export types for convenience
export type { ApiError, ApiResponse, ApiOptions } from '@/lib/client/api'
