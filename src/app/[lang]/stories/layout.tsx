import { ApplicationLayout } from '@/app/[lang]/application-layout'
import BackgroundSection from '@/components/BackgroundSection'
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox'
import SectionSliderNewAuthors from '@/components/SectionSliderNewAuthors'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import { getAuthors } from '@/data/authors'
import { getCategories } from '@/data/categories'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  params: Promise<{ lang: string }>
}

const Layout: React.FC<Props> = async ({ children, params }) => {
  const categories = await getCategories()
  const authors = await getAuthors()

  return (
    <ApplicationLayout params={params}>
      {children}
    </ApplicationLayout>
  )
}

export default Layout
