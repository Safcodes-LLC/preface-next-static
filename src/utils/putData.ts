interface ApiError extends Error {
  status?: number
  statusText?: string
  url?: string
}

export const putData = async <T = unknown>(
  url: string,
  data?: any,
  token?: string,
  revalidate: number = 0
): Promise<T> => {
  try {
    const isFormData = data instanceof FormData
    const headers: HeadersInit = {
      Accept: 'application/json',
      ...(!isFormData && { 'Content-Type': 'application/json' }), // Only set Content-Type for non-FormData
      ...(token && { Authorization: `${token}` }), // Only include Authorization if token exists
    }

    const apiUrl = `https://king-prawn-app-x9z27.ondigitalocean.app/api/${url}`

    const body = isFormData ? data : data ? JSON.stringify(data) : undefined

    const res = await fetch(apiUrl, {
      method: 'PUT',
      headers,
      body,
      next: { revalidate },
    })

    if (!res.ok) {
      const error: ApiError = new Error(`HTTP error! status: ${res.status} ${res.statusText}`)
      error.status = res.status
      error.statusText = res.statusText
      error.url = apiUrl

      console.error('API Error:', {
        status: res.status,
        statusText: res.statusText,
        url: apiUrl,
        headers: Object.fromEntries(res.headers.entries()),
      })

      if (res.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage?.removeItem('token')
        }
        error.message = 'Unauthorized - Please log in again'
        throw error
      }

      if (res.status === 403) {
        error.message = 'Access Denied - You do not have permission to access this resource'
        throw error
      }

      if (res.status === 429) {
        error.message = 'Rate limit exceeded - Please try again later'
        throw error
      }

      try {
        const errorData = await res.json()
        error.message = errorData?.message || error.message
      } catch (e) {
        console.error('Failed to parse error response:', e)
      }

      throw error
    }

    return (await res.json()) as T
  } catch (error) {
    console.error('API Request Failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url,
      timestamp: new Date().toISOString(),
    })
    throw error
  }
}
