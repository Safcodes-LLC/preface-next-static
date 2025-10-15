import StatusDashboard from '@/components/Dashboard/StatusDashboard'
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
        <StatusDashboard dashboardItems={dashboardItems} />
      </div>
      
    </ProtectedRoute>
  )
}
