import React, { ComponentType } from 'react'

interface DashboardItem {
  icon: ComponentType<{ className?: string }>
  title: string
  count: string
  status: string
}

interface StatusDashboardProps {
  dashboardItems: DashboardItem[]
}

export default function StatusDashboard({ dashboardItems }: StatusDashboardProps) {
  return (
    <React.Fragment>
      {dashboardItems.map((item, index) => (
        <div key={index} className="group relative col-span-3 pt-6 max-md:col-span-6">
          {/* Icon Container */}
          <div className="absolute top-0 left-1/2 z-10 flex h-14 w-14 -translate-x-1/2 transform items-center justify-center rounded-[16px] bg-[#60A43A] shadow-lg transition-all duration-300 group-hover:shadow-xl max-md:h-12 max-md:w-12 max-md:rounded-[12px]">
            <item.icon className="fill-[#FFFFFF] max-md:h-[24px] max-md:w-[24px]" />
          </div>

          {/* Card */}
          <div className="flex h-full flex-col items-center rounded-2xl bg-white py-6 pt-10 text-center transition-all duration-300 hover:shadow-lg dark:bg-[#0D0D0D]">
            <span className="mb-2 text-base font-medium text-black max-md:mb-1 max-md:text-[14px] dark:text-white">
              {item.title}
            </span>
            <span className="text-xl font-bold text-[#00652E] max-md:text-[16px] dark:text-[#60A43A]">
              {item.count}
            </span>
            <span className="mt-1 text-base font-medium text-[#444444] max-md:text-[14px] dark:text-[#DFDFDF]">
              {item.status}
            </span>
          </div>
        </div>
      ))}
    </React.Fragment>
  )
}
