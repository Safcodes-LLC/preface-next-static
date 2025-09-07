import { useMutation } from '@tanstack/react-query'
import { clientApi } from '@/lib/client/api'

interface FavouriteData {
  userId: string
  postId: string
  postType: string
}

export const useFavourite = () => {
  return useMutation({
    mutationFn: async (data: FavouriteData) => {
      const token = localStorage.getItem('authToken') // Make sure to store the token in localStorage after login
      return clientApi.post('/api/favorites/', data, {
        headers: {
          'Authorization': token || '',
          'Content-Type': 'application/json'
        }
      })
    }
  })
}