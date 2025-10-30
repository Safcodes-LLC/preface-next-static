import { ReactNode } from 'react'
import QuranLayout from '../components/QuranLayout'

interface Props {
  children: ReactNode
  params: { lang: string; surah: string }
}

const Layout: React.FC<Props> = async ({ children, params }) => {
  // In Next.js 13+, params is already resolved when it reaches the layout
  return <QuranLayout params={params}>{children}</QuranLayout>
}

export default Layout
