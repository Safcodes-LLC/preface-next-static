import Link from 'next/link'
import React from 'react'
import AskNewQuestion from '../components/AskNewQustion'

// Align with project convention: params provided as a Promise
const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params
  return (
    <React.Fragment>
      <div className="sticky top-0 left-0 z-10 mb-[24px] flex items-center justify-between bg-[#f8f8f8] pb-[10px]">
        <Link
          href={`/${lang}/dashboard/ask-the-scholar`}
          className="cursor-pointer rounded-[6px] bg-gray-400 px-4 py-2 text-sm font-semibold text-[#FFFFFF] transition-colors duration-200 hover:bg-gray-500"
        >
          Back to Questions
        </Link>
      </div>
      <AskNewQuestion lang={lang} />
    </React.Fragment>
  )
}

export default Page
