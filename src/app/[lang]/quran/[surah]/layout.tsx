import { ReactNode } from 'react'
import QuranLayout from '../components/QuranLayout'

interface Props {
  children: ReactNode
  params: Promise<{ lang: string; surah: string }>
}

const Layout: React.FC<Props> = async ({ children, params }) => {
  // In Next.js 15+, params is a Promise and needs to be awaited
  const resolvedParams = await params
  return <QuranLayout params={resolvedParams}>{children}</QuranLayout>
}

export default Layout
