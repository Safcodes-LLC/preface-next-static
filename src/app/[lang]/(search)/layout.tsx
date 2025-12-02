import { ApplicationLayout } from '@/app/[lang]/application-layout'
import { getAuthors } from '@/data/authors'
import { getCategories } from '@/data/categories'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  params: Promise<{ lang: string }>
}

const Layout: React.FC<Props> = async ({ children, params }) => {
  const categories = await getCategories()
  const authors = await getAuthors()

  return <ApplicationLayout params={params}>{children}</ApplicationLayout>
}

export default Layout
