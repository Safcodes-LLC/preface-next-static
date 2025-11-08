'use client'
import { getAuthToken } from '@/services/authService'
import { getLoggedUser } from '@/utils/getServices'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface UserData {
  name: string
  email: string
  username: string
  profile_pic: string
  // Add other fields as needed
}

const ProfileForm = () => {
  let token = getAuthToken()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'United Arab Emirates', // Default value
  })

  // In the fetchUser useEffect, update the setFormData call to include all fields
  useEffect(() => {
    const fetchUser = async () => {
      const result = await getLoggedUser(token || '')
      if (result?.data) {
        setUserData(result.data)
        setFormData({
          fullName: result.data.name || '',
          email: result.data.email || '',
          mobile: result.data.mobile || '',
          address1: result.data.address1 || '',
          address2: result.data.address2 || '',
          city: result.data.city || '',
          state: result.data.state || '',
          country: result.data.country || 'United Arab Emirates',
        })
      }
    }
    fetchUser()
  }, [token])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="mb-[24px] flex justify-end">
        <button type="button" className="rounded-[6px] bg-[#00652E] px-4 py-1 text-sm font-semibold text-[#FFFFFF]">
          Reset Password
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="rounded-xl bg-white px-8 pt-10 pb-8 dark:bg-[#0D0D0D]">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image
                alt="Profile picture"
                src={userData.profile_pic || '/images/fallbackImg.webp'}
                fill
                className="rounded-full object-contain"
              />
            </div>
            <div className="mb-8 flex gap-3">
              <button
                type="button"
                className="cursor-pointer rounded-[8px] bg-[#00652E] px-3 py-[2px] text-[11px] font-medium text-white transition-colors hover:bg-[#004d24] hover:text-white/90"
              >
                Upload new image
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-[8px] bg-[#DDDDDD] px-3 py-[2px] text-[11px] font-medium text-[#222222] transition-colors hover:bg-[#CCCCCC] hover:text-[#111111]"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="text-xs text-[#808080] dark:text-[#838383]">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs text-[#808080] dark:text-[#838383]">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="mobile" className="text-xs text-[#808080] dark:text-[#838383]">
                Mobile
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl bg-white p-8 dark:bg-[#0D0D0D]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="address1" className="text-xs text-[#808080] dark:text-[#838383]">
                Address 1
              </label>
              <input
                id="address1"
                name="address1"
                type="text"
                value={formData.address1}
                onChange={handleChange}
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="address2" className="text-xs text-[#808080] dark:text-[#838383]">
                Address 2
              </label>
              <input
                id="address2"
                name="address2"
                type="text"
                value={formData.address2}
                onChange={handleChange}
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="city" className="text-xs text-[#808080] dark:text-[#838383]">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="state" className="text-xs text-[#808080] dark:text-[#838383]">
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="text-xs text-[#808080] dark:text-[#838383]">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                className="w-full rounded-[10px] border border-[#EDEDED] px-3 py-2 text-[15px] text-[#222222] focus:border-[#00652E] focus:outline-none dark:border-[#2D2D2D] dark:bg-[#1A1A1A] dark:text-white"
              />
            </div>
          </div>
        </section>

        <div className="col-span-full mt-[24px] flex justify-end">
          <button type="submit" className="rounded-[6px] bg-[#00652E] px-8 py-1 text-sm font-semibold text-[#FFFFFF]">
            Update
          </button>
        </div>
      </form>
    </>
  )
}

export default ProfileForm
