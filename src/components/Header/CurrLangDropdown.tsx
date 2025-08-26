'use client'

import { getCurrencies, getLanguages } from '@/data/navigation'
import { Link } from '@/shared/link'
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
import { FC, ComponentType, SVGProps, useState, useEffect } from 'react'

type LanguageItem = {
  id: string;
  name: string;
  description: string;
  href: string;
  code: string;
  active?: boolean;
  FlagComponent?: React.FC<any>;
};

const Languages = ({ languages , onSelectLanguage }: { languages: LanguageItem[]; onSelectLanguage: (lang: LanguageItem) => void; }) => {
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
            <p className="text-xs text-neutral-500 dark:text-neutral-400 text-left rtl:text-right">{item.description}</p>
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
}

const CurrLangDropdown: FC<Props> = ({
  panelAnchor = {
    to: 'bottom end',
    gap: 16,
  },
  className,
  languages,
  currencies,
  panelClassName = 'w-xs',
}) => {

  const [selectedLanguage, setSelectedLanguage] = useState<LanguageItem | null>(null);

  // Initialize language from localStorage or default to English
  useEffect(() => {
    const savedLangCode = typeof window !== 'undefined' ? localStorage.getItem('selectedLanguage') : null;
    const defaultLang = languages.find(lang => lang.code === 'en') || languages[0];
    const initialLang = savedLangCode 
      ? languages.find(lang => lang.code === savedLangCode) || defaultLang
      : defaultLang;
    
    setSelectedLanguage(initialLang);
    
    // Ensure default is set in localStorage
    if (typeof window !== 'undefined' && !savedLangCode) {
      localStorage.setItem('selectedLanguage', defaultLang.code);
    }
  }, [languages]);

  const handleLanguageSelect = (language: LanguageItem) => {
    setSelectedLanguage(language);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', language.code);
    }
  };

  if (!selectedLanguage) return null;

  return (
    <Popover className={clsx('group', className)}>
      <PopoverButton className=" flex items-center p-2.5 text-sm font-medium text-neutral-600 group-hover:text-neutral-950 focus:outline-hidden focus-visible:outline-hidden dark:text-neutral-200 dark:group-hover:text-neutral-100">
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
          {/* <TabList className="flex space-x-1 rounded-full bg-neutral-100 p-1 dark:bg-neutral-700">
            {['Language'].map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  clsx(
                    'w-full rounded-full py-2 text-sm leading-5 font-medium text-neutral-700 focus:ring-0 focus:outline-hidden',
                    selected
                      ? 'bg-white shadow-sm'
                      : 'text-neutral-700 hover:bg-white/70 dark:text-neutral-300 dark:hover:bg-neutral-900/40'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </TabList> */}
          <TabPanels className="mt-5">
            <TabPanel className="rounded-xl p-3 focus:ring-0 focus:outline-hidden">
              <Languages languages={languages} onSelectLanguage={handleLanguageSelect} />
            </TabPanel>
            {/* <TabPanel className="rounded-xl p-3 focus:ring-0 focus:outline-hidden">
              <Currencies currencies={currencies || []} />
            </TabPanel> */}
          </TabPanels>
        </TabGroup>
      </PopoverPanel>
    </Popover>
  )
}
export default CurrLangDropdown
