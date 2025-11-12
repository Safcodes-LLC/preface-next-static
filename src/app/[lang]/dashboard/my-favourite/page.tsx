import React from 'react'
import FavouriteList from './components/FavouriteList'


// Align with project convention: params provided as a Promise
const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params

  return (
    <React.Fragment>
      {/* <QuestionsListData statusColors={statusColors} lang={lang} /> */}
     <FavouriteList lang={lang} />
      {/* <SavedList lang={lang} /> */}
    </React.Fragment>
  )
}

export default Page
