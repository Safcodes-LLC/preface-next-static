import { clientApi } from '@/lib/client/api'

export interface GuestTicketData {
  name: string
  email: string
  mobileNumber: string
  question: string
}

export interface GuestTicketResponse {
  success: boolean
  message: string
  data?: any
}

export const postGuestTicket = async (data: GuestTicketData): Promise<GuestTicketResponse> => {
  try {
    const response = await clientApi.post<any>('/api/scholar-questions/guest', data)
    return {
      success: true,
      message: response.message || 'Question submitted successfully',
      data: response.data,
    }
  } catch (error: any) {
    console.error('Failed to submit guest ticket:', error)
    throw {
      success: false,
      message: error.message || 'Failed to submit question',
    }
  }
}
