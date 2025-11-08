'use client'
import { getAuthToken } from '@/services/authService'
import { getLoggedUser, putProfileUpdate } from '@/utils/getServices'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface UserData {
  _id: string
  name: string
  email: string
  username: string
  profile_pic: string
}

const ProfileForm = () => {
  let token = getAuthToken()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: 'United Arab Emirates',
  })

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
          country: result.data.country || '',
        })
      }
    }
    fetchUser()
  }, [token])

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle image file selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file')
        return
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB')
        return
      }

      setSelectedImage(file)

      // Create preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      const newPreviewUrl = URL.createObjectURL(file)
      setPreviewUrl(newPreviewUrl)
    }
  }

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // Handle image deletion
  const handleImageDelete = async () => {
    try {
      const token = getAuthToken() || ''

      if (!userData?._id) {
        toast.error('User ID is not available')
        return
      }

      // Create FormData with empty profilePic to delete
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.fullName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('mobile', formData.mobile)
      formDataToSend.append('address1', formData.address1)
      formDataToSend.append('address2', formData.address2 || '')
      formDataToSend.append('city', formData.city)
      formDataToSend.append('state', formData.state)
      formDataToSend.append('country', formData.country)
      // Add empty profilePic to indicate deletion
      formDataToSend.append('profilePic', '')

      const response = await putProfileUpdate(userData._id, formDataToSend)

      if (response) {
        toast.success('Profile picture deleted successfully!')

        // Clear local state
        setSelectedImage(null)
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl)
          setPreviewUrl(null)
        }

        // Refresh user data
        const result = await getLoggedUser(token)
        if (result?.data) {
          setUserData(result.data)
        }
      }
    } catch (error) {
      console.error('Error deleting profile picture:', error)
      toast.error('Failed to delete profile picture. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const formDataToSend = new FormData()

      // Append image file if selected
      if (selectedImage) {
        formDataToSend.append('profilePic', selectedImage)
      }

      // Append all form fields
      formDataToSend.append('name', formData.fullName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('mobile', formData.mobile)
      formDataToSend.append('address1', formData.address1)
      formDataToSend.append('address2', formData.address2 || '')
      formDataToSend.append('city', formData.city)
      formDataToSend.append('state', formData.state)
      formDataToSend.append('country', formData.country)

      const token = getAuthToken() || ''

      if (!userData?._id) {
        toast.error('User ID is not available')
        return
      }

      const response = await putProfileUpdate(userData._id, formDataToSend)

      if (response) {
        toast.success('Profile updated successfully!')

        // Clear selected image and preview after successful upload
        setSelectedImage(null)
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl)
          setPreviewUrl(null)
        }

        // Refresh user data
        const result = await getLoggedUser(token)
        if (result?.data) {
          setUserData(result.data)
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile. Please try again.')
    }
  }

  // Get the current profile picture URL (preview or existing)
  const currentProfilePic = previewUrl || userData?.profile_pic || '/images/fallbackImg.webp'

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          },
        }}
        containerStyle={{
          bottom: 40,
          right: 40,
        }}
      />
      <div className="mb-[24px] flex justify-end">
        <button type="button" className="rounded-[6px] cursor-pointer bg-[#00652E] px-4 py-1 text-sm font-semibold text-[#FFFFFF]">
          Reset Password
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="rounded-xl bg-white px-8 pt-10 pb-8 dark:bg-[#0D0D0D]">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image alt="Profile picture" src={currentProfilePic} fill className="rounded-full object-cover" />
            </div>

            {/* Hidden file input */}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />

            <div className="mb-8 flex gap-3">
              <button
                type="button"
                onClick={handleUploadClick}
                className="cursor-pointer rounded-[8px] bg-[#00652E] px-3 py-[2px] text-[11px] font-medium text-white transition-colors hover:bg-[#004d24] hover:text-white/90"
              >
                {selectedImage ? 'Change image' : 'Upload new image'}
              </button>
              <button
                type="button"
                onClick={handleImageDelete}
                className="cursor-pointer rounded-[8px] bg-[#DDDDDD] px-3 py-[2px] text-[11px] font-medium text-[#222222] transition-colors hover:bg-[#CCCCCC] hover:text-[#111111]"
              >
                Delete
              </button>
            </div>
            {/*             
            {selectedImage && (
              <p className="text-xs text-[#808080] dark:text-[#838383]">
                New image selected: {selectedImage.name}
              </p>
            )} */}
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
          <button
            type="submit"
            className="cursor-pointer rounded-[6px] bg-[#00652E] px-8 py-1 text-sm font-semibold text-[#FFFFFF]"
          >
            Update
          </button>
        </div>
      </form>
    </>
  )
}

export default ProfileForm
