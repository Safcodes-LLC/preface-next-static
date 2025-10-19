import { getAuthToken } from '@/services/authService'
import { useMutation } from '@tanstack/react-query'

interface ToggleFavouritePayload {
  postId: string
  postType: string
}

interface ToggleFavouriteResponse {
  isFavourite: boolean
  favouriteCount: number
}

export const useToggleFavourite = () => {
  return useMutation({
    mutationFn: async ({ postId, postType }: ToggleFavouritePayload): Promise<ToggleFavouriteResponse> => {
      const token = getAuthToken()

      const res = await fetch(`https://king-prawn-app-x9z27.ondigitalocean.app/api/favourites/posts/${postId}`, {
        method: 'POST',
        headers: {
          Authorization: token ? token : '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postType }),
      })

      if (!res.ok) {
        // Try to extract server error message
        let message = 'Failed to toggle favourite'
        try {
          const err = await res.json()
          message = err?.message || message
        } catch (_) {}
        throw new Error(message)
      }

      const json = (await res.json()) as ToggleFavouriteResponse
      // Return consistent data structure
      return json
    },
  })
}

export const useFavouriteCount = () => {
  return useMutation({
    mutationFn: async ({ postId }: ToggleFavouritePayload): Promise<ToggleFavouriteResponse> => {
      const token = getAuthToken()

      const res = await fetch(`https://king-prawn-app-x9z27.ondigitalocean.app/api/favourites/count/${postId}`, {
        method: 'GET',
        headers: {
          Authorization: token ? token : '',
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        // Try to extract server error message
        let message = 'Failed to get favourite count'
        try {
          const err = await res.json()
          message = err?.message || message
        } catch (_) {}
        throw new Error(message)
      }

      const json = (await res.json()) as ToggleFavouriteResponse
      // Return consistent data structure
      return json
    },
  })
}
