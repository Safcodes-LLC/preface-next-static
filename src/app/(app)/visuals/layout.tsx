import { ApplicationLayout } from '@/app/(app)/application-layout'
import BackgroundSection from '@/components/BackgroundSection'
import SectionGridPosts from '@/components/SectionGridPosts'
import SwipableSliderPosts from '@/components/SwipableSliderPosts'
import { getLatestVideos } from '@/data/api/posts'
import { getAuthors } from '@/data/authors'
import { getCategories } from '@/data/categories'
import { getPostsDefault, getPostsVideo } from '@/data/posts'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = async ({ children }) => {
  const categories = await getCategories()
  const authors = await getAuthors()
  const defaultPosts = await getPostsDefault()
  // const videoPosts = await getPostsVideo()
  const videoPosts = await getLatestVideos()
  return (
    <ApplicationLayout>
      {children}

      <div className="container space-y-20 py-16 lg:space-y-28 lg:py-20">
        <div className=" ">
          <SectionGridPosts
            postCardName="card10V6"
            heading="STORYTELLING ISLAM"
            subHeading="Understanding Islam through 1001 stories"
            posts={videoPosts.slice(0, 8)}
            gridClass="md:grid-cols-2 lg:grid-cols-3"
            timeDuration={true}
          />
        </div>

        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          <SwipableSliderPosts
            heading="TOP RATED ON PREFACE"
            subHeading="Over 100 Articles for beginners"
            posts={defaultPosts.slice(0, 8)}
            postCardName="card10V6"
            config={{
              autoSlide: false,
              autoSlideInterval: 4000,
              showButtons: false,
              loop: false,
              grid: {
                sm: 1,
                lg: 2,
                default: 1, // It's good practice to include a default value
              },
            }}
          />
        </div>
      </div>
    </ApplicationLayout>
  )
}

export default Layout
