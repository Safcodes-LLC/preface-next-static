import { ContinuosReadIcon, FavouriteIcon, QAIcon, SavedIcon } from '@/components/Svg/svg'
import { ProtectedRoute } from '@/contexts/AuthContext'

export default function Page() {
  const dashboardItems = [
    {
      icon: QAIcon,
      title: 'Q & A',
      count: '10 Questions',
      status: 'Asked',
    },
    {
      icon: ContinuosReadIcon,
      title: 'Continuous Read',
      count: '15 Articles',
      status: 'Selected',
    },
    {
      icon: FavouriteIcon,
      title: 'Favourite Topics',
      count: '12 Topics',
      status: 'Added',
    },
    {
      icon: SavedIcon,
      title: 'Saved List',
      count: '25 Articles',
      status: 'Saved',
    },
  ]

  return (
    <ProtectedRoute>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardItems.map((item, index) => (
          <div key={index} className="group relative pt-6">
            {/* Icon Container */}
            <div className="absolute top-0 left-1/2 z-10 flex h-14 w-14 -translate-x-1/2 transform items-center justify-center rounded-[16px] bg-[#60A43A] shadow-lg transition-all duration-300 group-hover:shadow-xl">
              <item.icon className={`fill-[#FFFFFF]`} />
            </div>

            {/* Card */}
            <div
              className={`flex h-full flex-col items-center rounded-2xl bg-white py-6 pt-10 text-center transition-all duration-300 hover:shadow-lg dark:bg-[#0D0D0D]`}
            >
              <span className={`mb-2 text-base font-medium text-black dark:text-white`}>{item.title}</span>
              <span className="text-xl font-bold text-[#00652E] dark:text-[#60A43A]">{item.count}</span>
              <span className="mt-1 text-base font-medium text-[#444444] dark:text-[#DFDFDF]">{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  )
}
