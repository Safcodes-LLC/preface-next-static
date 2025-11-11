import React from 'react'
import ViewMassage from '../components/ViewMassage'

const Page = ({ params }: { params: { lang: string; view: string } }) => {
  const questionId = params.view
  return (
    <React.Fragment>
      <ViewMassage questionId={questionId} lang={params.lang} />
    </React.Fragment>
  )
}

export default Page
