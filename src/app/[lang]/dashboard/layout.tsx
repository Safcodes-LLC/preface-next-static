'use client'

import DashboardSidebar from '@/components/Dashboard/DashboardSidebar'
import NotifyDropdown from '@/components/Header/NotifyDropdown'

import {
  AskScholarIcon,
  ContinuosReadIcon,
  DashboardIcon,
  FavouriteIcon,
  PreferenceIcon,
  ProfileIcon,
  QAIcon,
  QuranIcon,
  SavedIcon,
} from '@/components/Svg/svg'

import Avatar from '@/shared/Avatar'
import Logo from '@/shared/Logo'
import { Divider } from '@/shared/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/shared/dropdown'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
  { name: 'Qur’an', href: '/dashboard/quran', icon: QuranIcon },
  { name: 'Ask the Scholar', href: '/dashboard/ask-the-scholar', icon: AskScholarIcon },
  //   { name: 'Subscription', href: '/dashboard/subscription' },
  //   { name: 'Billing', href: '/dashboard/billing-address' },
  //   { name: 'Submit post', href: '/submission' },
]

const userNavigation = [
  { name: 'Your Profile', href: '/dashboard/posts' },
  { name: 'Settings', href: '/dashboard/edit-profile' },
  { name: 'Sign out', href: '#' },
]

const subPages: { href: any; pageName: string; icon: any }[] = [
  {
    href: '/dashboard',
    icon: DashboardIcon,
    pageName: 'Dashboard',
  },
  {
    href: '/dashboard/quran',
    icon: QuranIcon,
    pageName: "Qur'an",
  },
  {
    // href: '/dashboard/my-reading-list',
    href: '/dashboard/continuos-read',
    icon: ContinuosReadIcon,
    pageName: 'Continuous Read',
  },
  {
    href: '/dashboard/my-favourite',
    icon: FavouriteIcon,
    pageName: 'Favorites',
  },
  {
    href: '/dashboard/saved-read',
    icon: SavedIcon,
    pageName: 'Saved Read',
  },
  {
    href: '/dashboard/subscription',
    icon: QAIcon,
    pageName: 'Q & A',
  },
  {
    href: '/dashboard/preferences',
    icon: PreferenceIcon,
    pageName: 'Preferences',
  },
  // {
  //   href: "/dashboard/billing-address",
  //   icon: "✈",
  //   pageName: "Billing address",
  // },
  // {
  //   href: "/dashboard/submit-post",
  //   icon: "✍📖",
  //   pageName: "Submit post",
  // },
  {
    href: '/dashboard/update-profile',
    icon: ProfileIcon,
    pageName: 'Profile',
  },
]

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href
  const pageTitle = navigation.find((item) => isActive(item.href))?.name ?? 'Dashboard'

  return (
    <>
      <div className="min-h-screen">
        <Disclosure as="nav" className="sm:sticky sm:top-0  sm:z-20 sm:bg-[#F8F8F8] sm:dark:bg-black">
          <div className="container">
            <div className="flex h-20 justify-between">
              <div className="flex">
                <div className="flex shrink-0 items-center">
                  <Logo size="size-10" />
                </div>
                {/* <div className="hidden sm:-my-px sm:ms-6 sm:flex sm:gap-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={clsx(
                        isActive(item.href)
                          ? 'border-primary-500'
                          : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:text-neutral-200',
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div> */}
              </div>
              <div className="hidden gap-x-4 sm:ms-6 sm:flex sm:items-center">
                <NotifyDropdown />

                {/* Profile dropdown */}
                <Dropdown>
                  <DropdownButton as={'button'} className="rounded-full ">
                    <Avatar alt="avatar" src={user.imageUrl} className="size-8" width={32} height={32} sizes="32px" />
                  </DropdownButton>
                  <DropdownMenu className="z-50">
                    {userNavigation.map((item) => (
                      <DropdownItem key={item.name} href={item.href}>
                        {item.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="-me-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-hidden dark:bg-neutral-900">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                  <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </DisclosureButton>
              </div>
            </div>

            <Divider />
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={clsx(
                    isActive(item.href)
                      ? 'cursor-pointer border-primary-500 bg-neutral-50 dark:bg-white/10'
                      : 'cursor-pointer border-transparent text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200',

                    'block border-s-4 py-2 ps-3 pe-4 text-base font-medium'
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-neutral-200 pt-4 pb-3 dark:border-neutral-700">
              <div className="flex items-center px-4">
                <div className="shrink-0">
                  <Avatar src={user.imageUrl} className="size-10" width={40} height={40} sizes="40px" />
                </div>
                <div className="ms-3">
                  <div className="text-base font-medium">{user.name}</div>
                  <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{user.email}</div>
                </div>
                <button
                  type="button"
                  className="relative ms-auto shrink-0 rounded-full bg-white p-1 text-neutral-400 hover:text-neutral-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-hidden dark:bg-neutral-900"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className="block px-4 py-2 text-base font-medium text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <div className="container py-12 sm:bg-[#F8F8F8] sm:dark:bg-black">
          {/*  and heading */}
          <header className="sticky top-[80px] z-10 bg-[#F8F8F8] dark:bg-black py-[20px]">
            <h1 className="text-3xl font-bold tracking-tight text-[#00652E] dark:text-[#60A43A]">{pageTitle}</h1>
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <span className="text-lg text-[#444444] dark:text-[#DFDFDF]">View your dashboard, manage your posts</span>

              <div className="flex gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={clsx(
                      isActive(item.href)
                        ? 'border border-[#E8E8E8] bg-white text-primary-600 shadow dark:bg-neutral-700 dark:text-white'
                        : 'text-neutral-600 hover:bg-[#E8E8E8] hover:text-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700/50 dark:hover:text-white',
                      'inline-flex items-center gap-2 rounded-md border border-[#E8E8E8] px-4 py-2 text-sm font-medium transition-colors duration-200 dark:border-[#5B5B5B]'
                    )}
                  >
                    <span>
                      {' '}
                      <item.icon className={`size-4 fill-[#454545] dark:fill-[#FFFFFF]`} />
                    </span>
                    <span> {item.name}</span>
                  </Link>
                ))}

                {/* <SectionTabHeader
                    subHeading={subHeading}
                    dimHeading={dimHeading}
                    heading={heading}
                    tabActive="Workplace"
                    tabs={['Workplace', 'Design', 'Development', 'Photography']}
                  /> */}
              </div>
            </div>
          </header>

          {/* sidebar */}
          <main>
            <div className="grid grid-cols-12 gap-8 py-10">
              <DashboardSidebar subPages={subPages} pathname={pathname} />

              <div className="col-span-12 lg:col-span-10">{children}</div>
            </div>
          </main>

          {/* <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</div> */}
        </div>
      </div>
    </>
  )
}
