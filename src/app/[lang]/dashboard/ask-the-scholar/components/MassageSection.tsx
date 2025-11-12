'use client'
import { fallbackImg } from '@/data/fallbackImg'
import { getAskTheScholarSingleQuestionsById, getLoggedUser } from '@/utils/getServices'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Props = {
  questionId: string
}

type Question = {
  _id?: string
  subject?: string
  message?: string
  status?: string
  createdAt?: string
  updatedAt?: string
  // Extend with other fields your API returns
  replies?: Reply[]
}

type Reply = {
  _id?: string
  sender: 'User' | 'Scholar' | string
  message: string
  sentAt?: string
}

const MassageSection = ({ questionId }: Props) => {
  const [question, setQuestion] = useState<Question | null>(null)
  const [isUserData, setNowUserData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!questionId) return
    let isMounted = true
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const token =
          typeof window !== 'undefined' ? localStorage.getItem('authToken') || localStorage.getItem('token') || '' : ''
        if (!token) {
          setLoading(false)
          setError('Missing authentication token')
          return
        }

        const res = await getAskTheScholarSingleQuestionsById(questionId, token)
        const userData = await getLoggedUser(token)
        // Many APIs return either { data: {...} } or a raw object
        const data: Question | null = (res && (res.data ?? res)) || null
        if (isMounted) {
          setQuestion(data)
          setNowUserData(userData.data)
        }
      } catch (e: any) {
        if (isMounted) setError(e?.message || 'Failed to load question and user data')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [questionId])

  // Auto-scroll to bottom when replies change
  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [question?.replies])

  console.log('question', question)
  console.log('userData', isUserData)

  // Helpers to format date and time separately
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
  }
  const formatTime = (dateStr?: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
  }

  if (loading) return <div className="py-10 text-center">Loading...</div>
  if (error) return <div className="py-10 text-center text-red-500">{error}</div>
  if (!question) return null

  // Compose all messages: initial question as first message, then replies
  const allMessages = [
    question.message
      ? {
          _id: question._id || 'question',
          sender: 'User',
          message: question.message,
          sentAt: question.createdAt,
        }
      : null,
    ...(question.replies || []),
  ].filter(Boolean) as Reply[]

  return (
    <div className="flex flex-col gap-[10px] max-md:gap-[6px] max-md:pb-[40px]" ref={listRef}>
      {allMessages.map((msg, idx) => {
        const isUser = msg.sender === 'User'
        return (
          <div key={msg._id || idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`m-[10px] flex w-[80%] flex-col gap-[15px] rounded-[15px] p-[20px] drop-shadow-lg max-md:w-[85%] max-md:rounded-[8px] max-md:p-[15px] ${
                isUser ? 'bg-[#E0F4E9] dark:bg-[#1D1D1D]' : 'bg-white dark:bg-[#0D0D0D]'
              }`}
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-[50px] w-[50px] overflow-hidden rounded-full bg-[#D9D9D9] max-md:h-[30px] max-md:w-[30px]`}
                  >
                    {' '}
                    <Image
                      src={isUser ? isUserData?.profile_pic || fallbackImg : '/images/Preface-Logo.png'}
                      alt={isUser ? isUserData?.name : 'User'}
                      width={100}
                      height={100}
                      className=""
                    />
                  </div>
                  <p className="text-[18px] font-medium text-black dark:text-white max-md:text-[16px]">
                    {isUser ? isUserData?.name : msg.sender || 'Admin'}
                  </p>
                </div>
                <div className="flex flex-col gap-1 max-md:flex-wrap">
                  <p className="text-end text-[12px] text-[#878787]">{formatDate(msg.sentAt)}</p>
                  <p className="text-end text-[12px] text-[#878787]">{formatTime(msg.sentAt)}</p>
                </div>
              </div>
              <hr className="border-gray-300 dark:border-[#272727]" />
              <div>
                <p className="max-md:text-[14px] dark:text-white">{msg.message}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MassageSection
