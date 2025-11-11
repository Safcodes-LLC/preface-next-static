'use client'
import { getAskTheScholarAllQuestions } from '@/utils/getServices'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Question = {
  _id?: string
  subject?: string
  status?: string
  createdAt?: string
  updatedAt?: string
  date?: string
  lastUpdated?: string
}

type Props = {
  statusColors: Record<string, string>
  lang: string
}

const QuestionsListData = (props: Props) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      setError(null)
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('authToken') || localStorage.getItem('token') || '' : ''
      if (!token) {
        setLoading(false)
        return
      }

      const res = await getAskTheScholarAllQuestions(token)
      const list = Array.isArray(res?.data) ? (res?.data as Question[]) : []
      setQuestions(list)
    } catch (e: any) {
      setError(e?.message || 'Failed to load questions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])
  return (
    <React.Fragment>
      <div className="mb-[24px] flex justify-end">
        <Link
          href={`/${props.lang}/dashboard/ask-the-scholar/ask-new-question`}
          className="cursor-pointer rounded-[6px] bg-[#00652E] px-4 py-2 text-sm font-semibold text-[#FFFFFF] transition-colors duration-200 hover:bg-[#004d24]"
        >
          Ask New Question
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-[10px] border border-[#EAEAEA]">
          <thead className="">
            <tr className="bg-[#F2FAF6] text-left">
              <th className="px-5 py-[10px] text-xs font-medium text-[#4A4A4A]">Date</th>
              <th className="px-5 py-[10px] text-xs font-medium text-[#4A4A4A]">Subject</th>
              <th className="px-5 py-[10px] text-xs font-medium text-[#4A4A4A]">Status</th>
              <th className="px-5 py-[10px] text-xs font-medium text-[#4A4A4A]">Last Updated</th>
              <th className="px-5 py-[10px] text-right"></th>
            </tr>
          </thead>
          <tbody className="bg-[#FFFFFF]">
            {loading && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-sm text-neutral-500">
                  Loading...
                </td>
              </tr>
            )}
            {!loading && questions.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-sm text-black">
                  No questions found.
                </td>
              </tr>
            )}
            {questions.map((row, i) => (
              <tr
                key={row._id || i}
                className={`border-t border-gray-100 text-sm text-black transition-colors ${
                  i % 2 === 0 ? 'bg-white' : 'bg-[#FBFBFB]'
                }`}
              >
                <td className={`px-5 ${i % 2 === 0 ? 'py-[18px]' : 'py-[9px]'} text-[14px] whitespace-nowrap`}>
                  {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : row.date || '—'}
                </td>
                <td className={`px-5 ${i % 2 === 0 ? 'py-[18px]' : 'py-[9px]'} text-[14px]`}>
                  <div
                    className="max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap"
                    title={row.subject || ''}
                  >
                    {row.subject || '—'}
                  </div>
                </td>

                <td className={`px-5 ${i % 2 === 0 ? 'py-[18px]' : 'py-[9px]'} text-[14px]`}>
                  <span
                    className={`inline-flex items-center rounded-[6px] px-6 py-1 text-xs font-medium whitespace-nowrap ${props.statusColors[row.status || ''] || 'bg-neutral-200 text-neutral-700'}`}
                  >
                    {row.status || 'Unknown'}
                  </span>
                </td>
                <td className={`px-5 ${i % 2 === 0 ? 'py-[18px]' : 'py-[9px]'} text-[14px] whitespace-nowrap`}>
                  {row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : row.lastUpdated || '—'}
                </td>
                <td className={`px-5 ${i % 2 === 0 ? 'py-[18px]' : 'py-[9px]'} text-right`}>
                  <Link
                    href={`/${props.lang}/dashboard/ask-the-scholar/${row._id}`}
                    className="inline-block rounded-md bg-[#CBDB2A] px-3 py-1 text-xs font-medium text-[#00652E] transition hover:bg-[#A7B81D]"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default QuestionsListData
