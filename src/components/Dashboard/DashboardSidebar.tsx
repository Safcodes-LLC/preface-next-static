import Link from 'next/link'

interface SubPage {
  href: string
  pageName: string
  icon: string
}

interface DashboardSidebarProps {
  subPages: SubPage[]
  pathname: string
}

export default function DashboardSidebar({ subPages, pathname }: DashboardSidebarProps) {
  return (
    <>
      {/* Mobile Horizontal Scrollable Tabs */}
      <div className="col-span-12 lg:hidden">
        <div className="hide-scrollbar flex space-x-2 overflow-x-auto pb-2">
          {subPages.map(({ href, pageName, icon }, index) => {
            const isActive = pathname === href
            return (
              <Link
                key={index}
                href={href}
                className={`flex-shrink-0 cursor-pointer rounded-lg px-4 py-3 text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#FFFFFF] text-[#00652E] shadow-sm dark:bg-primary-900/30 dark:text-primary-400'
                    : 'bg-[#F0F0F0] text-neutral-700 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <img src={icon} alt={pageName} className="h-4 w-4 object-contain" />
                  <span>{pageName}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="col-span-12 hidden lg:col-span-2 lg:block">
        <div className="sticky top-24">
          <ul className="space-y-2">
            {subPages.map(({ href, pageName, icon }, index) => {
              const isActive = pathname === href
              return (
                <li key={`desktop-${index}`}>
                  <Link
                    href={href}
                    className={`flex cursor-pointer items-center rounded-lg bg-[#F0F0F0] p-3 text-sm transition-colors dark:bg-[#0D0D0D] ${
                      isActive
                        ? 'bg-[#FFFFFF] text-[#00652E] dark:bg-[#1D1D1D] dark:text-[#60A43A]'
                        : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700/50'
                    }`}
                  >
                    <span className="mr-3 flex h-4 w-4 items-center justify-center text-lg">
                      {icon.startsWith('/') ? (
                        <img src={icon} alt={pageName} className="h-4 w-4 object-contain" />
                      ) : (
                        <span>{icon}</span>
                      )}
                    </span>
                    <span>{pageName}</span>
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
