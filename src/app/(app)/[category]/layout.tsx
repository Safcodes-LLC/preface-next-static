import { ApplicationLayout } from '@/app/(app)/application-layout'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import { getAuthors } from '@/data/authors'
import { getPostsDefault } from '@/data/posts'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = async ({ children }) => {
  const authors = await getAuthors()
  const defaultPosts = await getPostsDefault()
  return (
    <ApplicationLayout>
      {children}

      <div className="container space-y-20 py-20 lg:space-y-28 lg:py-28">
        <div className="relative ">
          {/* <BackgroundSection /> */}
          <SectionSliderPosts
            postCardName="card10V5"
            heading="POPULAR ARTICLES FROM MOHAMMED ﷺ"
            subHeading="Over 10 Articles"
            posts={defaultPosts.slice(0, 6)}
          />
        </div>
      </div>
    </ApplicationLayout>
  )
}

export default Layout
