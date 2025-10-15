import { ProtectedRoute } from '@/contexts/AuthContext'

export default function Page() {
  const dashboardItems = [
    {
      icon: '/images/dashboardsidebar/q&a-lg.png',
      title: 'Q & A',
      count: '10 Questions',
      status: 'Asked',
    },
    {
      icon: '/images/dashboardsidebar/continuos-read-lg.png',
      title: 'Continuous Read',
      count: '15 Articles',
      status: 'Selected',
    },
    {
      icon: '/images/dashboardsidebar/favourite-lg.png',
      title: 'Favourite Topics',
      count: '12 Topics',
      status: 'Added',
    },
    {
      icon: '/images/dashboardsidebar/saved-lg.png',
      title: 'Saved List',
      count: '25 Articles',
      status: 'Saved',
    },
  ]

  return (
    <ProtectedRoute>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dashboardItems.map((item, index) => (
            <div key={index} className="group relative pt-4">
              {/* Icon Container */}
              <div className="absolute -top-4 left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-[16px] bg-[#60A43A] shadow-lg transition-all duration-300 group-hover:shadow-xl">
                <img src={item.icon} alt={item.title} className="h-6 w-6 object-contain" />
              </div>

              {/* Card */}
              <div
                className={`flex h-full flex-col items-center rounded-2xl bg-white dark:bg-[#0D0D0D] py-6 pt-10 text-center transition-all duration-300 hover:shadow-lg`}
              >
                <p className={`mb-2 text-base font-medium text-black dark:text-white`}>{item.title}</p>
                <p className="text-xl font-bold text-[#00652E] dark:text-[#60A43A]">{item.count}</p>
                <p className="mt-1 text-base font-medium text-[#444444] dark:text-[#DFDFDF]">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
    </ProtectedRoute>
  )
}
