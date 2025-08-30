'use client'

import { usePathname, useRouter } from 'next/navigation'
import { getCurrencies } from '@/data/navigation'
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverPanelProps,
  TabGroup,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { locales, defaultLocale } from '@/i18n/settings'

type LanguageItem = {
  id: string
  name: string
  description: string
  href: string
  code: string
  active?: boolean
  FlagComponent?: React.FC<any>
}

const Languages = ({
  languages,
  onSelectLanguage,
}: {
  languages: LanguageItem[]
  onSelectLanguage: (lang: LanguageItem) => void
}) => {
  return (
    <div className="grid gap-6">
      {languages.map((item) => (
        <CloseButton
          key={item.code}
          onClick={() => onSelectLanguage(item)}
          className={clsx(
            '-m-2.5 flex items-center rounded-lg p-2.5 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-hidden dark:hover:bg-neutral-700',
            item.active ? 'bg-neutral-100 dark:bg-neutral-700' : 'opacity-80'
          )}
        >
          <div>
            <div className="flex items-center gap-x-2">
              {item.FlagComponent && <item.FlagComponent className="" />}
              <p className="text-sm font-medium">{item.name}</p>
            </div>
          </div>
        </CloseButton>
      ))}
    </div>
  )
}

interface Props {
  panelAnchor?: PopoverPanelProps['anchor']
  panelClassName?: PopoverPanelProps['className']
  className?: string
  currencies?: Awaited<ReturnType<typeof getCurrencies>>
  languages: LanguageItem[]
  home?: boolean
}

const CurrLangDropdown: FC<Props> = ({
  panelAnchor = {
    to: 'bottom end',
    gap: 16,
  },
  className,
  languages,
  currencies,
  home,
  panelClassName = 'w-xs',
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageItem | null>(null)

  // Get current locale from URL or default to 'en'
  const getCurrentLocale = () => {
    const segments = pathname.split('/').filter(Boolean)
    return locales.includes(segments[0]) ? segments[0] : defaultLocale
  }

  // Initialize language
  useEffect(() => {
    const currentLocale = getCurrentLocale()
    const lang = languages.find(lang => lang.code === currentLocale) || 
                languages.find(lang => lang.code === defaultLocale) || 
                languages[0]
    setSelectedLanguage(lang)
  }, [pathname, languages])

  const handleLanguageSelect = (language: LanguageItem) => {
    setSelectedLanguage(language)
    
    // Get current path without locale
    const pathSegments = pathname.split('/').filter(Boolean)
    const currentPath = locales.includes(pathSegments[0]) 
      ? pathSegments.slice(1).join('/')
      : pathSegments.join('/')
    
    // Build new URL
    let newPath: string
    if (language.code === defaultLocale) {
      // For default language, remove the locale from URL
      newPath = `/${currentPath}`
    } else {
      // For other languages, add the locale to the URL
      newPath = `/${language.code}${currentPath ? `/${currentPath}` : ''}`
    }

    // Update URL
    router.push(newPath)
  }

  if (!selectedLanguage) return null

  return (
    <Popover className={clsx('group', className)}>
      <PopoverButton
        className={`flex items-center p-2.5 text-sm font-medium focus:outline-hidden focus-visible:outline-hidden hover:bg-white/10 hover:rounded-full cursor-pointer ${home ? 'text-[#fff] dark:text-[#fff]' : 'text-[#000000] dark:text-white'}`}
      >
        <GlobeAltIcon className="size-5" />
        <ChevronDownIcon className="ms-1 size-4 group-data-open:rotate-180" aria-hidden="true" />
      </PopoverButton>

      <PopoverPanel
        anchor={panelAnchor}
        transition
        className={clsx(
          'z-40 rounded-2xl bg-white p-4 ring-1 ring-black/5 transition duration-200 ease-in-out data-closed:translate-y-1 data-closed:opacity-0 dark:bg-[#0D0D0D]',
          panelClassName
        )}
      >
        <TabGroup>
          <TabPanels className="mt-5">
            <TabPanel className="rounded-xl p-3 focus:ring-0 focus:outline-hidden">
              <Languages 
                languages={languages.map(lang => ({
                  ...lang,
                  active: lang.code === selectedLanguage.code
                }))} 
                onSelectLanguage={handleLanguageSelect} 
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </PopoverPanel>
    </Popover>
  )
}

export default CurrLangDropdown