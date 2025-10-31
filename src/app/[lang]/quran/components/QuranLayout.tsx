import React from 'react'
import SidebarLayout from './SidebarLayout'

interface Props {
  children: React.ReactNode
  params: { lang: string; surah: string }
}

const QuranLayout: React.FC<Props> = ({ children, params }) => {
  return (
    <div className="container my-10 grid grid-cols-12 gap-10 max-md:gap-0">
      <div className="col-span-3 max-md:hidden">
        <div className="sticky top-20 rounded-[10px] bg-white px-4 py-5">
          <SidebarLayout params={params} />
        </div>
      </div>
      <div className="col-span-9 max-md:col-span-full">{children}</div>
    </div>
  )
}

export default QuranLayout
