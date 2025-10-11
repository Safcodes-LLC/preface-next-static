import { useAuth } from '@/contexts/AuthContext'
import { clientApi } from '@/lib/client/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface SavedData {
  userId: string
  postId: string
  postType: string
}

interface RemoveSavedData {
  userId: string
  postId: string
}

export const useSaved = () => {
  return useMutation({
    mutationFn: async (data: SavedData) => {
      const token = localStorage.getItem('authToken') // Make sure to store the token in localStorage after login
      return clientApi.post('/api/savedlist/', data, {
        headers: {
          Authorization: token || '',
          'Content-Type': 'application/json',
        },
      })
    },
  })
}

// Hook for fetching latest articles
export const useGetUserSaved = () => {
  const { user } = useAuth()
  const userId = user?._id

  return useQuery({
    queryKey: ['savedlist', 'user', userId],
    queryFn: async (): Promise<any> => {
      if (!userId) return null

      const token = localStorage.getItem('authToken')
      const response = await clientApi.get<any[]>(`/api/savedlist/${userId}`, {
        headers: {
          Authorization: token || '',
          'Content-Type': 'application/json',
        },
      })
      return response
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}

export const useRemoveSaved = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RemoveSavedData) => {
      const token = localStorage.getItem('authToken')
      return clientApi.delete('/api/savedlist/remove', {
        headers: {
          Authorization: token || '',
          'Content-Type': 'application/json',
        },
        body: data,
      })
    },
    onSuccess: () => {
      // Invalidate and refetch the favorites query to update the UI
      queryClient.invalidateQueries({ queryKey: ['savedlist'] })
    },
    onError: (error) => {
      console.error('Failed to remove saved:', error)
    },
  })
}
