'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/shared/Button'
import { useEffect, useState } from 'react'

export default function SignInButton({ dict, lang }: { dict: any; lang?: string }) {
  const { isAuthenticated } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || isAuthenticated) {
    return null
  }

  return (
    <div className="hidden sm:block">
      <Button
        className="h-8 !border-[#60A43A] !px-4 hover:!bg-[#60A43A] hover:text-white dark:hover:!border-[#60A43A] dark:hover:!text-white"
        href={`/${lang}/login`}
        color="logooutline"
      >
        {dict.navigation.signin}
      </Button>
    </div>
  )
}
