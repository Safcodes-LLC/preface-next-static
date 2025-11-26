'use client'

import { Button } from '@/shared/Button'
import ButtonCircle from '@/shared/ButtonCircle'
import { getLatestArticles, getPopularArticles, searchPosts } from '@/utils/getServices'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ArrowUpRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon, IconSvgElement } from '@hugeicons/react'
import clsx from 'clsx'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useEffect, useState } from 'react'

interface Option {
  type: 'recommended_searches' | 'quick-action'
  name: string
  icon: IconSvgElement
  uri: string
}

const recommended_searches: Option[] = [
  {
    type: 'recommended_searches',
    name: 'The Life and Legacy of Prophet Muhammad ﷺ',
    icon: Search01Icon,
    uri: '/search/?s=design',
  },
  {
    type: 'recommended_searches',
    name: 'The Five Pillars of Islam',
    icon: Search01Icon,
    uri: '/search/?s=development',
  },
  {
    type: 'recommended_searches',
    name: 'The Qur’an and Modern Challenges',
    icon: Search01Icon,
    uri: '/search/?s=marketing',
  },
  {
    type: 'recommended_searches',
    name: 'Islam and Social Justice',
    icon: Search01Icon,
    uri: '/search/?s=travel',
  },
]

const quickActions: Option[] = [
  {
    type: 'quick-action',
    name: 'Muhammed',
    icon: Search01Icon,
    uri: '/muhammad',
  },
  {
    type: 'quick-action',
    name: 'Pioneers',
    icon: Search01Icon,
    uri: '/pioneers',
  },
  {
    type: 'quick-action',
    name: 'Holy Quran',
    icon: Search01Icon,
    uri: '/holy-quran',
  },
  {
    type: 'quick-action',
    name: 'Islam For Beginners',
    icon: Search01Icon,
    uri: '/islam-for-beginners',
  },
]

interface Props {
  type: 'type1' | 'type2'
  isScrolled?: boolean
  isTransparentHeader?: boolean
  home?: boolean
  lang?: string
}

// Update the interface to match the API response
interface Article {
  _id: string
  title: string
  slug: string
  categories: Array<{
    name: string
    slug: string
    parentCategory?: {
      _id: string
      name: string
      slug: string
    }
  }>
  // Add other fields as needed
}

interface SearchResult {
  _id: string
  title: string
  slug: string
  categories: Array<{
    name: string
    parentCategory: {
      name: string
    }
  }>
  // Add other fields as needed
}

const SearchModal: FC<Props> = ({ type = 'type1', isScrolled = false, home, isTransparentHeader, lang = 'en' }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [latestArticles, setLatestArticles] = useState<Article[]>([])
  const [popularArticles, setPopularArticles] = useState<Article[]>([])

  // Debounced search function
  const debouncedSearch = useCallback(
    _.debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setSearchResults([])
        return
      }

      setIsLoading(true)
      try {
        const data = await searchPosts(searchQuery, lang)
        setSearchResults(data?.data || [])
      } catch (error) {
        console.error('Search failed:', error)
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    }, 500),
    [lang]
  )

  // Fetch latest articles when component mounts
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch both requests in parallel
        const [latestResponse, popularResponse] = await Promise.all([getLatestArticles(lang), getPopularArticles(lang)])

        setLatestArticles(latestResponse?.data || [])
        setPopularArticles(popularResponse?.data || [])
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      }
    }

    fetchArticles()
  }, [lang])

  // Update search when query changes
  useEffect(() => {
    debouncedSearch(query)
    return () => debouncedSearch.cancel()
  }, [query, debouncedSearch])

  const handleSetSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const buttonOpenModal2 = () => {
    return (
      <>
        <div className="hidden md:block">
          <Button outline className="w-full justify-between px-4!" onClick={() => setOpen(true)}>
            <span className={`text-sm/6 font-normal text-neutral-500 dark:text-neutral-400`}>Type to search...</span>
            <HugeiconsIcon icon={Search01Icon} size={24} className="ms-auto" />
          </Button>
        </div>

        <div className="-ms-1 md:hidden">
          <ButtonCircle plain onClick={() => setOpen(true)}>
            <HugeiconsIcon icon={Search01Icon} size={24} />
          </ButtonCircle>
        </div>
      </>
    )
  }

  const buttonOpenModal1 = () => {
    return (
      <ButtonCircle
        plain
        onClick={() => setOpen(true)}
        className={clsx(
          'transition-colors duration-200',
          isScrolled ? 'text-neutral-900 dark:text-neutral-100' : 'text-white'
        )}
      >
        <HugeiconsIcon
          icon={Search01Icon}
          size={24}
          className={clsx(
            `transition-colors duration-200 ${
              home
                ? isTransparentHeader
                  ? 'text-[#fff] dark:text-[#fff]'
                  : 'text-[#000000] dark:text-white'
                : 'text-[#000000] dark:text-white'
            }`
          )}
        />
      </ButtonCircle>
    )
  }

  return (
    <>
      <>{type === 'type1' ? buttonOpenModal1() : buttonOpenModal2()}</>

      <Dialog
        className={`relative z-50`}
        open={open}
        onClose={() => {
          setOpen(false)
          setQuery('')
          setSearchResults([])
        }}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 z-50 bg-neutral-900/50 transition-opacity duration-300 ease-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-50 hidden-scrollbar flex w-full overflow-y-auto sm:p-6 md:pt-20 md:pb-10">
          <DialogPanel
            transition
            className="mx-auto w-full max-w-2xl transform divide-y divide-gray-100 self-end overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 transition duration-300 ease-out data-closed:translate-y-10 data-closed:opacity-0 sm:self-start sm:rounded-xl dark:divide-gray-700 dark:bg-[#0D0D0D] dark:ring-white/10"
          >
            <Combobox
              onChange={(item: Option | SearchResult) => {
                if ('uri' in item) {
                  router.push(item.uri + (item.type === 'recommended_searches' ? '' : query))
                } else {
                  router.push(`/post/${item.slug}`)
                }
                setOpen(false)
              }}
            >
              <div className="relative">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute start-4 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-300"
                  aria-hidden="true"
                />
                <div className="pe-9">
                  <ComboboxInput
                    autoFocus
                    className="h-12 w-full border-0 bg-transparent ps-11 pe-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm dark:text-gray-100 dark:placeholder:text-gray-300"
                    placeholder="Type to search..."
                    onChange={handleSetSearchValue}
                    value={query}
                    data-autofocus
                  />
                </div>
                <button
                  className="absolute end-3 top-1/2 z-10 -translate-y-1/2 text-xs text-neutral-400 focus:outline-none sm:end-4 dark:text-neutral-300"
                  onClick={() => {
                    setOpen(false)
                    setQuery('')
                    setSearchResults([])
                  }}
                  type="button"
                >
                  <XMarkIcon className="block h-5 w-5 sm:hidden" />
                  <span className="hidden sm:block">
                    <kbd className="font-sans">Esc</kbd>
                  </span>
                </button>
              </div>

              <ComboboxOptions
                static
                as="ul"
                className="hidden-scrollbar max-h-[70vh] scroll-py-2 divide-y divide-gray-100 overflow-y-auto dark:divide-gray-700"
              >
                {isLoading ? (
                  <li className="p-4 text-center text-gray-500 dark:text-gray-400">Searching...</li>
                ) : query ? (
                  searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <ComboboxOption
                        key={result._id}
                        value={result}
                        className={({ focus }) =>
                          clsx(
                            'flex cursor-pointer items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800',
                            focus && 'bg-gray-50 dark:bg-gray-800'
                          )
                        }
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{result.title}</p>
                          {result.categories?.[0] && (
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {result.categories[0].parentCategory.name} • {result.categories[0].name}
                            </p>
                          )}
                        </div>
                        <ArrowUpRightIcon className="h-5 w-5 text-gray-400" />
                      </ComboboxOption>
                    ))
                  ) : (
                    <li className="p-4 text-center text-gray-500 dark:text-gray-400">No results found</li>
                  )
                ) : (
                  <>
                    <li className="p-2">
                      <h3 className="mb-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        Latest Articles
                      </h3>
                      <ul className="text-sm text-gray-700 dark:text-gray-300">
                        {latestArticles.slice(0, 4).map((item) => (
                          <ComboboxOption
                            key={item?._id}
                            value={item}
                            className={({ focus }) =>
                              clsx(
                                'flex cursor-pointer items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800',
                                focus && 'bg-gray-50 dark:bg-gray-800'
                              )
                            }
                          >
                            <HugeiconsIcon icon={Search01Icon} className="me-3 h-5 w-5 text-gray-400" />
                            <span>{item?.title}</span>
                          </ComboboxOption>
                        ))}
                      </ul>
                    </li>
                    <li className="p-2">
                      <h3 className="mb-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                        Popular Articles
                      </h3>
                      <ul className="text-sm text-gray-700 dark:text-gray-300">
                        {popularArticles.slice(0, 4).map((item) => (
                          <ComboboxOption
                            key={item._id}
                            value={item}
                            className={({ focus }) =>
                              clsx(
                                'flex cursor-pointer items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800',
                                focus && 'bg-gray-50 dark:bg-gray-800'
                              )
                            }
                          >
                            <HugeiconsIcon icon={Search01Icon} className="me-3 h-5 w-5 text-gray-400" />
                            <span>{item.title}</span>
                          </ComboboxOption>
                        ))}
                      </ul>
                    </li>
                  </>
                )}
              </ComboboxOptions>
            </Combobox>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default SearchModal
