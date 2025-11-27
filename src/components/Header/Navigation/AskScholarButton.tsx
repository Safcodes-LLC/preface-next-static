'use client'

import ModalAskTheScholar from '@/components/ModalAskTheScholar'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Props {
  className?: string
  home?: boolean
  isTransparentHeader?: boolean
  dict?: any
}

const AskScholarButton = ({ className, home, isTransparentHeader, dict }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // This code will only run on the client side
    setToken(localStorage.getItem('authToken'))
  }, [])

  const handleAskScholarClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {token ? (
        <Link
          href={'/dashboard/ask-the-scholar'}
          className={`flex cursor-pointer items-center gap-2 rounded-sm border border-[#EEEEEE] px-5 py-2 text-sm font-normal hover:shadow-sm focus:outline-none dark:border-[#777777] ${
            home
              ? isTransparentHeader
                ? 'text-[#fff] dark:text-[#fff]'
                : 'text-[#000000] dark:text-white'
              : 'text-[#000000] dark:text-white'
          } ${className}`}
          aria-label="Ask the Scholar"
          style={{ marginTop: 0 }}
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5" aria-hidden="true" />
          <span className="whitespace-nowrap">{dict?.navigation?.askthescholar}</span>
        </Link>
      ) : (
        <button
          onClick={handleAskScholarClick}
          className={`flex min-w-[155px] cursor-pointer items-center gap-2 rounded-sm border border-[#EEEEEE] px-5 py-2 text-sm font-normal hover:shadow-sm focus:outline-none dark:border-[#777777] ${
            home
              ? isTransparentHeader
                ? 'text-[#fff] dark:text-[#fff]'
                : 'text-[#000000] dark:text-white'
              : 'text-[#000000] dark:text-white'
          } ${className}`}
          aria-label="Ask the Scholar"
          style={{ marginTop: 0 }}
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5" aria-hidden="true" />
          <span className="whitespace-nowrap">{dict?.navigation?.askthescholar}</span>
        </button>
      )}

      <ModalAskTheScholar isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

export default AskScholarButton
