'use client'
import { postAskTheScolarQuestion } from '@/utils/getServices'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
  lang: string
}

const AskNewQuestion = (props: Props) => {
  const [regarding, setRegarding] = useState('')
  const [subject, setSubject] = useState('')
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!regarding || !subject || !question) {
      toast.error('Please fill in all fields')
      return
    }

    const loadingToast = toast.loading('Submitting your question...')

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
        regarding,
        subject,
        question,
      }

      await postAskTheScolarQuestion(data, token)

      toast.dismiss(loadingToast)
      toast.success('Question submitted successfully!')

      setRegarding('')
      setSubject('')
      setQuestion('')

      // Redirect to questions list page
      setTimeout(() => {
        window.location.href = `/${props.lang}/dashboard/ask-the-scholar`
      }, 1000)
    } catch (error: any) {
      console.error('Error submitting question:', error)
      toast.dismiss(loadingToast)
      toast.error(error?.message || 'Failed to submit question')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center rounded-[12px] bg-white dark:bg-[#0D0D0D] p-[40px] max-md:p-[20px]">
      <form onSubmit={handleSubmit} className="flex w-2/3 flex-col gap-[20px] max-md:w-full">
        <div className="flex w-3/4 flex-col gap-1">
          <label htmlFor="regarding">Regarding</label>
          <select
            id="regarding"
            value={regarding}
            onChange={(e) => setRegarding(e.target.value)}
            className="h-full w-full rounded-[8px] dark:bg-[#303030] border border-[#DEDEDE] dark:border-[#5B5B5B] p-2"
            required
          >
            <option value="">Select a topic</option>
            <option value="Sunnah">Sunnah</option>
            <option value="Fiqh">Fiqh</option>
            <option value="Aqeedah">Aqeedah</option>
            <option value="Islamic History">Islamic History</option>
            <option value="Contemporary Issues">Contemporary Issues</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="h-full w-full rounded-[8px] dark:bg-[#303030] border border-[#DEDEDE] dark:border-[#5B5B5B] p-2"
            placeholder="Subject"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="question">Question</label>
          <textarea
            id="question"
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="h-full w-full rounded-[8px] dark:bg-[#303030] border border-[#DEDEDE] dark:border-[#5B5B5B] p-2"
            placeholder="Message"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-[8px] bg-[#60A43A] p-2 font-semibold text-white transition-colors duration-200 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AskNewQuestion
