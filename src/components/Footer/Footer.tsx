import { getCategory, getTopTrendingTopics } from '@/data/api/category'
import { getIslamForBeginners, getPopularArticles } from '@/data/api/posts'
import { CustomLink } from '@/data/types'
import { getDictionary } from '@/i18n'
import Logo from '@/shared/Logo'
import SocialsListStroke2 from '@/shared/SocialsListStroke2'
import { toTitleCase } from '@/utils/slug'
import Link from 'next/link'
import React from 'react'

export interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const Footer: React.FC<{ lang?: string }> = async ({ lang }) => {
  const categoriesData = await getCategory(lang || 'en')
  const categories = categoriesData?.data || []
  const dict = await getDictionary(lang || 'en')

  const topicsData = await getTopTrendingTopics(lang || 'en')
  const topics = topicsData?.data || []

  const islamForBeginnersData = await getIslamForBeginners(lang || 'en')
  const islamForBeginners = islamForBeginnersData || []
  // console.log(islamForBeginners, 'islamForBeginners data');

  const popularArticlesData = await getPopularArticles({ lang })
  const popularArticles = popularArticlesData || []

  // Transform categories to the required format
  const categoryMenu: WidgetFooterMenu = {
    id: '1',
    title: toTitleCase(dict?.footer?.categories),
    menus: categories.slice(0, 5).map((category: any) => ({
      href: `${lang === 'en' ? `/${category.slug || category.id}` : `/${lang}/${category.slug || category.id}`}`,
      label: category.name || 'Unnamed Category',
    })),
  }

  // Transform categories to the required format
  const topicMenu: WidgetFooterMenu = {
    id: '2',
    title: toTitleCase(dict?.footer?.topics),
    menus: topics
      .reverse()
      .slice(0, 5)
      .map((topic: any) => {
        const basePath = topic.parentCategory?.slug
          ? `${topic.parentCategory.slug}/${topic.slug}`
          : topic.slug || topic.id

        const href = lang === 'en' ? `/${basePath}` : `/${lang}/${basePath}`

        return {
          href,
          label: topic.categoryName || 'Unnamed Topic',
        }
      }),
  }

  // Transform categories to the required format
  const islamForBeginnersMenu: WidgetFooterMenu = {
    id: '3',
    title: toTitleCase(dict?.footer?.islamForBeginners),
    menus: islamForBeginners.slice(0, 5).map((post: any) => ({
      href: `${lang === 'en' ? `/${post.categories[0].parentCategory?.slug}/${post.categories[0].slug}/${post.slug || post.id}` : `/${lang}/${post.categories[0].parentCategory?.slug}/${post.categories[0].slug}/${post.slug || post.id}`}`,
      label: post.title || 'Unnamed Category',
    })),
  }

  const popularArticlesMenu: WidgetFooterMenu = {
    id: '4',
    title: toTitleCase(dict?.footer?.mostEngaged),
    menus: popularArticles.slice(0, 5).map((post: any) => ({
      href: `${lang === 'en' ? `/${post.categories[0].parentCategory?.slug}/${post.categories[0].slug}/${post.slug || post.id}` : `/${lang}/${post.categories[0].parentCategory?.slug}/${post.categories[0].slug}/${post.slug || post.id}`}`,
      label: post.title || 'Unnamed Category',
    })),
  }

  const widgetMenus: WidgetFooterMenu[] = [
    categoryMenu,
    topicMenu,
    islamForBeginnersMenu,
    popularArticlesMenu,
    // {
    //   id: '1',
    //   title: 'Categories',
    //   menus: [
    //     { href: '/', label: 'Belief' },
    //     { href: '/', label: 'Idealism' },
    //     { href: '/', label: 'Sufism' },
    //     { href: '/', label: 'Tafseer' },
    //     { href: '/', label: 'Heritage' },
    //   ],
    // },
    // {
    //   id: '2',
    //   title: 'Topics',
    //   menus: [
    //     { href: '/', label: 'Hadith in Daily Life' },
    //     { href: '/', label: 'Hajj Comprehensive Study' },
    //     { href: '/', label: 'Quran at Makkah' },
    //     { href: '/', label: 'Quran at Madina' },
    //     { href: '/', label: 'Hadith in Daily Life' },
    //   ],
    // },
    // {
    //   id: '3',
    //   title: 'Islam for beginners',
    //   menus: [
    //     { href: '/', label: 'Zakat' },
    //     { href: '/', label: 'Hajj' },
    //     { href: '/', label: 'Umra' },
    //     { href: '/', label: 'Fasting' },
    //     { href: '/', label: 'Pray' },
    //   ],
    // },
    // {
    //   id: '4',
    //   title: 'Most Engaged',
    //   menus: [
    //     { href: '/', label: 'Belief Articles' },
    //     { href: '/', label: 'Quraan Audio' },
    //     { href: '/', label: 'Hadith Video' },
    //     { href: '/', label: 'Hadith in Daily Life' },
    //     { href: '/', label: 'Quran at Makkah' },
    //   ],
    // },
  ]

  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">Top 5</h2>
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">{menu.title}</h2>
        <ul className="mt-5 space-y-[10px]">
          {menu.menus.slice(0, 5).map((item: any, index: any) => (
            <li key={index}>
              <a
                key={index}
                className="line-clamp-1 text-neutral-600 capitalize hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href={item.href}
              >
                {toTitleCase(item.label)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>
      {/* footer */}
      {/* <div
        className="nc-Footer relative border-t border-neutral-200 py-16 lg:py-28 dark:border-neutral-700"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="container">
          <div className="col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:flex lg:flex-col lg:md:col-span-1">
            <div className="col-span-2 md:col-span-1">
              <Logo size="size-10" />
            </div>

            <div className="flex w-full flex-col space-y-2">
              <Link href="/about" className="text-sm font-medium text-[#444444] dark:text-white">
                About Us
              </Link>
              <a href="mailto:info@prefacetoislam.com" className="text-sm text-[#444444] dark:text-white">
                info@prefacetoislam.com
              </a>
              <a
                href="https://www.prefacetoislam.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#444444] dark:text-white"
              >
                www.prefacetoislam.com
              </a>
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsListStroke2 />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-6 pt-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 md:grid-cols-4 md:gap-y-10 lg:grid-cols-5 lg:gap-x-10">
            {widgetMenus.map(renderWidgetMenuItem)}
          </div>
        </div>
      </div> */}

      <div className="nc-Footer relative container border-t border-neutral-200 py-16 lg:py-28 dark:border-neutral-700">
        <div className="grid grid-cols-12 gap-x-4 gap-y-4 sm:gap-x-8 sm:gap-y-8 lg:gap-x-0">
          <div className="col-span-12 flex flex-col items-center gap-5 md:items-start lg:col-span-3">
            <div className="w-full">
              <Logo size="size-10" lang={lang} />
            </div>
            <div className="flex w-full flex-col space-y-2">
              <Link href="/about" className="text-sm font-medium text-[#444444] dark:text-white">
                About Us
              </Link>
              <a href="mailto:info@prefacetoislam.com" className="text-sm text-[#444444] dark:text-white">
                info@prefacetoislam.com
              </a>
              <a
                href="https://www.prefacetoislam.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#444444] dark:text-white"
              >
                www.prefacetoislam.com
              </a>
            </div>
            <div className="w-full">
              <SocialsListStroke2 />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 md:grid-cols-3 md:gap-y-10 lg:grid-cols-4 lg:gap-x-10">
              {widgetMenus.map(renderWidgetMenuItem)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
