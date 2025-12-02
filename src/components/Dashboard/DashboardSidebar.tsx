import Link from 'next/link'

interface SubPage {
  href: string
  pageName: string
  icon: any
}

interface DashboardSidebarProps {
  subPages: SubPage[]
  pathname: string
  lang?: string
}

export default function DashboardSidebar({ subPages, pathname, lang }: DashboardSidebarProps) {
  return (
    <>
      {/* Mobile Horizontal Scrollable Tabs */}
      <div className="col-span-12 lg:hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="hide-scrollbar flex space-x-2 overflow-x-auto pb-2">
          {subPages.map((item, index) => {
            const isActive = pathname === (lang === 'en' ? item.href : `/${lang}${item.href}`)
            return (
              <Link
                key={index}
                href={lang === 'en' ? item.href : `/${lang}${item.href}`}
                className={`flex-shrink-0 cursor-pointer rounded-lg px-4 py-3 text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#FFFFFF] text-[#00652E] dark:bg-[#1D1D1D] dark:text-[#60A43A]'
                    : 'text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-700/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`${lang === 'ar' ? 'me-' : 'mr-'}3 flex h-4 w-4 items-center justify-center text-lg`}
                  >
                    <item.icon
                      className={` ${isActive ? 'fill-[#00652E] dark:fill-[#60A43A]' : 'fill-[#222222] dark:fill-[#DFDFDF]'}`}
                    />
                  </span>
                  <span>{item.pageName}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="col-span-12 hidden lg:col-span-2 lg:block">
        <div className="sticky top-[190px] sm:z-10 sm:bg-[#f8f8f8] sm:dark:bg-black">
          <ul className="space-y-2">
            {subPages.map((Item, index) => {
              const isActive = pathname === (lang === 'en' ? Item.href : `/${lang}${Item.href}`)
              return (
                <li key={`desktop-${index}`}>
                  <Link
                    href={lang === 'en' ? Item.href : `/${lang}${Item.href}`}
                    className={`flex cursor-pointer gap-3 items-center rounded-lg bg-[#F0F0F0] p-3 text-sm dark:bg-[#0D0D0D] ${
                      isActive
                        ? 'bg-[#FFFFFF] text-[#00652E] dark:bg-[#1D1D1D] dark:text-[#60A43A]'
                        : 'text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-700/50'
                    }`}
                  >
                    <span
                      className={` flex h-4 w-4 items-center justify-center text-lg`}
                    >
                      <Item.icon
                        className={` ${isActive ? 'fill-[#00652E] dark:fill-[#60A43A]' : 'fill-[#222222] dark:fill-[#DFDFDF]'}`}
                      />
                    </span>
                    <span>{Item.pageName}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}
