'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import MassageReplay from './MassageReplay'
import MassageSection from './MassageSection'

type Props = {
  questionId: string
  lang: string
}

const ViewMassage = (props: Props) => {
  const [isReplay, setNowReplay] = useState(false)
  const [loading, setLoading] = useState(false)

  const statusChange = async () => {
    const loadingToast = toast.loading('Updating status...')

    try {
      setLoading(true)
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('authToken') || localStorage.getItem('token') || '' : ''

      if (!token) {
        toast.dismiss(loadingToast)
        toast.error('Authentication token not found')
        return
      }

      const response = await fetch(
        `https://king-prawn-app-x9z27.ondigitalocean.app/api/scholar-questions/status/${props.questionId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token || ''}`,
          },
          body: JSON.stringify({
            status: 'Answered',
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      toast.dismiss(loadingToast)
      toast.success('Status updated to Answered successfully')

      // Optionally reload or navigate back
      setTimeout(() => {
        window.location.href = `/${props.lang}/dashboard/ask-the-scholar`
      }, 1000)
    } catch (error: any) {
      console.error('Error updating status:', error)
      toast.dismiss(loadingToast)
      toast.error(error?.message || 'Failed to update status')
    } finally {
      setLoading(false)
    }
  }
  return (
    <React.Fragment>
      <div className="sticky top-0 left-0 z-10 mb-[24px] flex items-center justify-between bg-[#f8f8f8] dark:bg-[#000000] pb-[10px] max-md:flex-wrap max-md:gap-[10px]">
        {isReplay ? (
          <button
            onClick={() => setNowReplay(false)}
            className="cursor-pointer rounded-[6px] bg-gray-400 dark:bg-[#2A2A2A] px-4 py-2 text-sm font-semibold text-[#FFFFFF] transition-colors duration-200 hover:bg-gray-500"
          >
            Back to Massage
          </button>
        ) : (
          <Link
            href={`/${props.lang}/dashboard/ask-the-scholar`}
            className="cursor-pointer rounded-[6px] bg-gray-400 dark:bg-[#2A2A2A] px-4 py-2 text-sm font-semibold text-[#FFFFFF] transition-colors duration-200 hover:bg-gray-500"
          >
            Back to Questions
          </Link>
        )}
        <div className="flex items-center gap-[10px] max-md:ms-auto">
          {isReplay ? null : (
            <button
              onClick={statusChange}
              disabled={loading}
              className="cursor-pointer rounded-[6px] bg-[#c49f26c5] px-6 py-2 text-sm font-semibold text-[#FFFFFF] transition-colors duration-200 hover:bg-[#c49f26f4] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Resolved'}
            </button>
          )}
          {isReplay ? null : (
            <button
              onClick={() => setNowReplay(true)}
              className="cursor-pointer rounded-[6px] bg-[#00652E] px-6 py-2 text-sm font-semibold text-[#FFFFFF] transition-colors duration-200 hover:bg-[#004d24]"
            >
              Replay
            </button>
          )}
        </div>
      </div>
      {isReplay ? (
        <MassageReplay questionId={props.questionId} lang={props.lang} onSuccess={() => setNowReplay(false)} />
      ) : (
        <MassageSection questionId={props.questionId} />
      )}
    </React.Fragment>
  )
}

export default ViewMassage
