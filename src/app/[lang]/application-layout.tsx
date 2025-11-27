import Footer from '@/components/Footer/Footer'
import Header2 from '@/components/Header/Header2'
import SocialSidebar from '@/components/SocialSidebar'
import AsideSidebarNavigation from '@/components/aside-sidebar-navigation'
import { getNavigation as fetchNavigation } from '@/data/navigation'
import { getAllPosts } from '@/data/posts'
import { getDictionary } from '@/i18n'
import Navbar2 from '@/shared/Navbar2'
import { Noto_Naskh_Arabic, Noto_Serif_Malayalam } from 'next/font/google'
import localFont from 'next/font/local'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  headerHasBorder?: boolean
  headerStyle?: 'header-1' | 'header-2' | 'header-scroll' | 'header-3'
  showBanner?: boolean
  home?: boolean
  params?: any
}
const elgraine = localFont({
  src: [
    {
      path: '../../../public/fonts/Elgraine-Regular.woff',
    },
  ],
  variable: '--font-elgraine',
})
const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
const notoSerifMalayalam = Noto_Serif_Malayalam({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
const ApplicationLayout = async ({ children, home, params }: Props) => {
  const dict = await getDictionary((await params).lang)
  const fetchNavigationData = await fetchNavigation((await params).lang)
  const postsData = await getAllPosts()
  // Check if current page should hide Navbar2 and use header-scroll
  const isTransparentHeader = (await params).pathname === '/' || (await params).pathname === '/visuals'
  return (
    <div
      className={
        (await params).lang === 'ar'
          ? notoNaskhArabic.className
          : (await params).lang === 'ml'
            ? notoSerifMalayalam.className
            : elgraine.className
      }
      dir={(await params).lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {home ? null : (
        <div className="container">
          <Navbar2 lang={(await params).lang} dict={dict} />
        </div>
      )}
      {home ? null : (
        <Header2
          isTransparentHeader={isTransparentHeader}
          navigationMenu={fetchNavigationData}
          featuredPosts={postsData.slice(0, 2)}
          className="sticky top-0 z-40 bg-white dark:bg-[#000000]"
          lang={(await params).lang}
          dict={dict}
        />
      )}
      {children}
      <Footer lang={(await params).lang} />
      <AsideSidebarNavigation lang={(await params).lang} />
      <SocialSidebar />
    </div>
  )
}

export { ApplicationLayout }
