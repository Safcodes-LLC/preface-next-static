import Card20 from '@/components/PostCards/Card20'
import { TNavigationItem } from '@/data/navigation'
import { TPost } from '@/data/posts'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

const Lv1MenuItem = ({
  menuItem,
  isScrolled = false,
  isTransparentHeader,
  home,
  lang,
}: {
  menuItem: TNavigationItem
  isScrolled?: boolean
  isTransparentHeader?: boolean
  home?: boolean
  lang?: string
}) => {
  return (
    <Link
      className={clsx(
        'flex items-center self-center rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap lg:text-[15px] xl:px-5',
        'hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200',
        home ? isTransparentHeader ? 'text-[#fff] dark:text-[#fff]' : 'text-[#000000]' : 'text-[#000000] dark:text-white' // Keep white text in dark mode regardless of scroll state
      )}
      href={lang === 'en' ? `${menuItem.href}` || '#' : `/${lang}${menuItem.href}`}
    >
      {menuItem.name}
      {menuItem.children?.length && (
        <ChevronDownIcon
          className={`ms-1 -me-1 size-4 ${isScrolled ? 'text-neutral-400' : 'text-white/70'}`}
          aria-hidden="true"
        />
      )}
    </Link>
  )
}

const MegaMenu = ({
  menuItem,
  featuredPosts,
  isScrolled,
  lang,
}: {
  menuItem: TNavigationItem
  featuredPosts: TPost[]
  isScrolled?: boolean
  lang?: string
}) => {
  const renderNavlink = (item: TNavigationItem) => {
    return (
      <li key={item.id} className={clsx('menu-item', item.isNew && 'menuIsNew')}>
        <Link
          className="font-normal text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
          href={lang === 'en' ? `${item.href}` || '#' : `/${lang}${item.href}`}
        >
          {item.name}
        </Link>
      </li>
    )
  }

  return (
    <li className="menu-megamenu menu-item flex">
      <Lv1MenuItem menuItem={menuItem} isScrolled={isScrolled} lang={lang}/>

      {menuItem.children?.length && menuItem.type === 'mega-menu' ? (
        <div className="absolute inset-x-0 top-full z-50 sub-menu">
          <div className="bg-white shadow-lg dark:bg-neutral-900">
            <div className="container">
              <div className="flex border-t border-neutral-200 py-11 text-sm dark:border-neutral-700">
                <div className="grid flex-1 grid-cols-4 gap-6 pe-10 xl:gap-8 2xl:pe-14">
                  {menuItem.children?.map((menuChild, index) => (
                    <div key={index}>
                      <p className="font-medium text-neutral-900 dark:text-neutral-200">{menuChild.name}</p>
                      <ul className="mt-4 grid space-y-1">{menuChild.children?.map(renderNavlink)}</ul>
                    </div>
                  ))}
                </div>
                <div className="grid w-2/7 grid-cols-1 gap-5 xl:w-4/9 xl:grid-cols-2">
                  {featuredPosts.map((post, index) => (
                    <Card20 key={post.id} post={post} className={clsx(index === 0 ? '' : 'hidden xl:block')} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  )
}

const renderMenuLink = (menuItem: TNavigationItem, level = 1) => (
  <Link
    className="flex items-center rounded-md px-4 py-2 font-normal text-neutral-600 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
    href={menuItem.href || '#'}
  >
    {menuItem.name}
    {menuItem.children?.length &&
      (level === 1 ? (
        <ChevronDownIcon className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true" />
      ) : (
        <ChevronRightIcon className="ml-2 h-4 w-4 text-neutral-500" aria-hidden="true" />
      ))}
  </Link>
)

const renderDropdown = (menuItem: TNavigationItem, level = 2) => (
  <li key={menuItem.id} className="menu-dropdown relative menu-item px-2">
    {renderMenuLink(menuItem, level)}
    {menuItem.children?.length && (
      <div className="absolute top-0 left-full z-10 sub-menu w-56 pl-2">
        <ul className="relative grid space-y-1 rounded-lg bg-white py-4 text-sm shadow-lg ring-1 ring-black/5 dark:bg-neutral-900 dark:ring-white/10">
          {menuItem.children.map((child) =>
            child.type === 'dropdown' && child.children?.length ? (
              renderDropdown(child, level + 1)
            ) : (
              <li key={child.id} className="px-2">
                {renderMenuLink(child, level + 1)}
              </li>
            )
          )}
        </ul>
      </div>
    )}
  </li>
)

const DropdownMenu = ({ menuItem, isScrolled, home, isTransparentHeader }: { menuItem: TNavigationItem; isScrolled?: boolean; home?: boolean; isTransparentHeader?: boolean }) => {
  return (
    <li className="menu-dropdown relative menu-item flex">
      <Lv1MenuItem menuItem={menuItem} isScrolled={isScrolled} home={home} isTransparentHeader={isTransparentHeader} />
      {menuItem.children?.length && menuItem.type === 'dropdown' ? (
        <div className="absolute top-full left-0 z-50 sub-menu w-56">
          <ul className="relative grid space-y-1 rounded-lg bg-white py-3 text-sm shadow-lg ring-1 ring-black/5 dark:bg-neutral-900 dark:ring-white/10">
            {menuItem.children?.map((childItem) =>
              childItem.type === 'dropdown' && childItem.children?.length ? (
                renderDropdown(childItem, 2)
              ) : (
                <li key={childItem.id} className="px-2">
                  {renderMenuLink(childItem, 2)}
                </li>
              )
            )}
          </ul>
        </div>
      ) : null}
    </li>
  )
}

export interface Props {
  menu: TNavigationItem[]
  className?: string
  featuredPosts: TPost[]
  isScrolled?: boolean
  isTransparentHeader?: boolean
  home?: boolean
  lang?: string
}
const Navigation: FC<Props> = ({ menu, className, featuredPosts, isScrolled, isTransparentHeader, home, lang }) => {
  return (
    <ul className={clsx('flex', className)}>
      {menu.map((menuItem) => {
        if (menuItem.type === 'dropdown') {
          return <DropdownMenu key={`nav-${menuItem.id}`} menuItem={menuItem} isScrolled={isScrolled} home={home} isTransparentHeader={isTransparentHeader}/>
        }
        if (menuItem.type === 'mega-menu') {
          return (
            <MegaMenu
              featuredPosts={featuredPosts}
              key={`mega-${menuItem.id}`}
              menuItem={menuItem}
              isScrolled={isScrolled}
            />
          )
        }
        return (
          <li key={`item-${menuItem.id}`} className="relative menu-item flex">
            <Lv1MenuItem
              menuItem={menuItem}
              isScrolled={isScrolled}
              isTransparentHeader={isTransparentHeader}
              home={home}
              lang={lang}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default Navigation
