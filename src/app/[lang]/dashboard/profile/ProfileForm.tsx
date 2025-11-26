'use client'

import { getAuthToken } from '@/services/authService'
import { getLoggedUser } from '@/utils/getServices'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface UserData {
  name: string
  email: string
  mobile: string
  address1?: string
  address2?: string
  city?: string
  state?: string
  country?: string
  profile_pic?: string
}

const ProfileForm = () => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const token = getAuthToken()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getLoggedUser(token || '')
        setUserData(result.data)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (token) {
      fetchUser()
    } else {
      setIsLoading(false)
    }
  }, [token])

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">Failed to load user data</p>
      </div>
    )
  }

  const { name, email, mobile, address1, address2, city, state, country, profile_pic } = userData

  return (
    <div>
      <main className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="rounded-xl bg-white px-8 pt-10 pb-8 dark:bg-[#0D0D0D]">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image
                alt="Profile picture of user"
                src={profile_pic || '/images/fallbackImg.webp'}
                fill
                className="rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/images/fallbackImg.webp'
                }}
              />
            </div>
            <h2 className="text-xl font-semibold">{name || 'User'}</h2>
          </div>
          <hr className="my-7 border border-[#DFDFDF] dark:border-[#3A3A3A]" />
          <dl className="flex flex-col gap-5" aria-label="User contact information">
            <div>
              <dt className="text-sm text-[#4D4D4D] dark:text-[#838383]">Email Address</dt>
              <dd className="text-[16px] font-medium">{email || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="text-sm text-[#4D4D4D] dark:text-[#838383]">Mobile Number</dt>
              <dd className="text-[16px] font-medium">{mobile || 'Not provided'}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl bg-white p-8 dark:bg-[#0D0D0D]">
          <dl className="flex flex-col gap-5 divide-y divide-[#EEEEEE] dark:divide-[#3A3A3A]">
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-[#4D4D4D] dark:text-[#838383]">Address 1</dt>
              <dd className="text-[16px] font-medium">{address1 || 'Not provided'}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-[#4D4D4D] dark:text-[#838383]">Address 2</dt>
              <dd className="text-[16px] font-medium">{address2 || 'Not provided'}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-[#4D4D4D] dark:text-[#838383]">City</dt>
              <dd className="text-[16px] font-medium">{city || 'Not provided'}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-[#4D4D4D] dark:text-[#838383]">State</dt>
              <dd className="text-[16px] font-medium">{state || 'Not provided'}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-[#4D4D4D] dark:text-[#838383]">Country</dt>
              <dd className="text-[16px] font-medium">{country || 'Not provided'}</dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
  )
}

export default ProfileForm
