import React from 'react'
import ViewMassage from '../components/ViewMassage'

// Align with project convention: params provided as a Promise
const Page = async ({ params }: { params: Promise<{ lang: string; view: string }> }) => {
  const { lang, view } = await params
  const questionId = view
  return (
    <React.Fragment>
      <ViewMassage questionId={questionId} lang={lang} />
    </React.Fragment>
  )
}

export default Page
