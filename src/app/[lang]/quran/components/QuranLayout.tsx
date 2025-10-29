import React from 'react'
import SidebarLayout from './SidebarLayout'

interface Props {
  children: React.ReactNode
  params: { lang: string }
}

const QuranLayout: React.FC<Props> = ({ children, params }) => {
  return (
    <div className="container my-10 grid grid-cols-12 gap-8">
      <div className="col-span-3">
        <div className="rounded-[10px] bg-white px-4 py-5">
          <SidebarLayout />
        </div>
      </div>
      <div className="col-span-9">{children}</div>
    </div>
  )
}

export default QuranLayout
