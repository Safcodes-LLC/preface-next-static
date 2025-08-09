import { ApplicationLayout } from '@/app/(app)/application-layout'
import BackgroundSection from '@/components/BackgroundSection'
import SwipableSliderPosts from '@/components/SwipableSliderPosts'
import { getAuthors } from '@/data/authors'
import { getCategories } from '@/data/categories'
import { getPostsDefault } from '@/data/posts'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = async ({ children }) => {
  const categories = await getCategories()
  const authors = await getAuthors()
  const defaultPosts = await getPostsDefault()

  return (
    <ApplicationLayout>
      {children}

      <div className="container space-y-20 py-20 lg:space-y-28 lg:py-28">
        <div className="relative py-16 lg:py-20">
          <BackgroundSection />
          {/* <SectionSliderPosts
            postCardName="card10V5"
            heading="TOP RATED ON PREFACE"
            subHeading="Over 100 Articles for beginners"
            posts={defaultPosts.slice(0, 6)}
          /> */}
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
            }}
          />
        </div>
      </div>
    </ApplicationLayout>
  )
}

export default Layout
