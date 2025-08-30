import { ApplicationLayout } from '@/app/[lang]/application-layout'
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

     
    </ApplicationLayout>
  )
}

export default Layout
