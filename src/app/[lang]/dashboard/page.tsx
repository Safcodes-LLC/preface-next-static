import StatusDashboard from '@/components/Dashboard/StatusDashboard'
import SectionMagazine1 from '@/components/SectionMagazine1'
import SectionMagazine2 from '@/components/SectionMagazine2'
import { ContinuosReadIcon, FavouriteIcon, QAIcon, SavedIcon } from '@/components/Svg/svg'
import { ProtectedRoute } from '@/contexts/AuthContext'

const Page = async ({ params, dict }: any) => {
  const { lang } = await params
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

  const post = [
    {
      _id: 1,
      image: QAIcon,
      name: 'Q & A',
      count: '10 Questions',
      status: 'Asked',
    },
    {
      _id: 2,
      image: ContinuosReadIcon,
      name: 'Continuous Read',
      count: '15 Articles',
      status: 'Selected',
    },
    {
      _id: 3,
      image: FavouriteIcon,
      name: 'Favourite Topics',
      count: '12 Topics',
      status: 'Added',
    },
    {
      _id: 4,
      image: SavedIcon,
      name: 'Saved List',
      count: '25 Articles',
      status: 'Saved',
    },
  ]

  return (
    <ProtectedRoute>
      <div className="grid grid-cols-12 gap-6 pb-[40px] max-md:gap-[15px] sm:sticky sm:top-[190px] sm:z-10 sm:bg-[#F8F8F8] sm:dark:bg-black">
        <StatusDashboard dashboardItems={dashboardItems} />
      </div>

      <div className="mt-0">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Continuous Read</h2>
        <p className="mt-1 mb-4 text-gray-600 dark:text-gray-300">Latest 6 topics you started reading</p>

        {/* Add your ReadingProgress component here when ready */}
        {/* {post.map((post, index) => (
          <Card23 key={post._id || index} post={post} lang={lang} />
        ))} */}

        <SectionMagazine1 lang={lang} />
      </div>

      {/* saved read and favourite section */}
      <SectionMagazine2
        lang={lang}
        gridClass="grid grid-cols-2 md:grid-cols-3 max-md:grid-cols-1 gap-6 max-md:gap-[20px]"
      />
    </ProtectedRoute>
  )
}

export default Page
