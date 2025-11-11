import React from 'react'
import QuestionsListData from './components/QuestionsListData'

// In Next.js App Router, params is provided synchronously as an object, not a Promise.
// Fix the typing and remove the unnecessary async/await to satisfy build type checks.
const Page = ({ params }: { params: { lang: string } }) => {
  const { lang } = params
  const statusColors = {
    Pending: 'bg-[#F4CDB1] text-[#FF7700]',
    Closed: 'bg-gray-500 text-white',
    Answered: 'bg-[#DCEDC8] text-[#52AD0D]',
    'User Replied': 'bg-[#D6D1F5] text-[#4E259E]', // Changed from 'UserReplied' to 'User Replied'
  }
  return (
    <React.Fragment>
      <QuestionsListData statusColors={statusColors} lang={lang} />
    </React.Fragment>
  )
}

export default Page
