import React from 'react'
import SavedList from './components/SavedList'

// Align with project convention: params provided as a Promise
const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params

  return (
    <React.Fragment>
      {/* <QuestionsListData statusColors={statusColors} lang={lang} /> */}

      <SavedList lang={lang} />
    </React.Fragment>
  )
}

export default Page
