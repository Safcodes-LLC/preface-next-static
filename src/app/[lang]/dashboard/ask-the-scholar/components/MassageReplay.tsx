'use client'
import { postAskTheScolarReplay } from '@/utils/getServices'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
  questionId: string
  lang: string
  onSuccess?: () => void
}

const MassageReplay = (props: Props) => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) {
      toast.error('Please enter your reply message')
      return
    }

    const loadingToast = toast.loading('Submitting your reply...')

    try {
      setLoading(true)
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('authToken') || localStorage.getItem('token') || '' : ''

      if (!token) {
        toast.dismiss(loadingToast)
        toast.error('Authentication token not found. Please login.')
        return
      }

      const data = {
        message,
      }

      await postAskTheScolarReplay(props.questionId, data, token)

      toast.dismiss(loadingToast)
      toast.success('Reply submitted successfully!')

      setMessage('')

      // Call onSuccess callback if provided
      props.onSuccess?.()

      // Navigate back to question view (refresh to show new reply)
      // setTimeout(() => {
      //     window.location.reload()
      // }, 1000)
    } catch (error: any) {
      console.error('Error submitting reply:', error)
      toast.dismiss(loadingToast)
      toast.error(error?.message || 'Failed to submit reply')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center rounded-[12px] bg-white p-[40px] max-md:p-[20px]">
      <form onSubmit={handleSubmit} className="flex w-2/3 flex-col gap-[20px] max-md:w-full">
        <div className="flex flex-col gap-1">
          <label htmlFor="message">Reply Message</label>
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-full w-full rounded-[8px] border border-[#DEDEDE] p-2"
            placeholder="Enter your reply message"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-[8px] bg-green-600 p-2 font-semibold text-white transition-colors duration-200 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default MassageReplay
