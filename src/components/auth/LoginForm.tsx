'use client'

import { login } from '@/services/authService'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import { Field, Label } from '@/shared/fieldset'
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface LoginFormProps {
  className?: string
  dict: any
  lang: string
}

export default function LoginForm({ className = '', dict, lang }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setNowError] = useState(null)

  // Custom toast component with close button
  const showSuccessToast = () => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } ring-opacity-5 pointer-events-auto flex w-full max-w-md rounded-lg bg-green-500 shadow-lg ring-1 ring-black`}
        >
          <div className="w-0 flex-1 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">{dict.login.success}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-green-400">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ),
      { duration: 2000 }
    )
  }

  // const showErrorToast = (message: string) => {
  //   toast.custom(
  //     (t) => (
  //       <div
  //         className={`${
  //           t.visible ? 'animate-enter' : 'animate-leave'
  //         } ring-opacity-5 pointer-events-auto flex w-full max-w-md rounded-lg bg-red-500 shadow-lg ring-1 ring-black`}
  //       >
  //         <div className="w-0 flex-1 p-4">
  //           <div className="flex items-center">
  //             <div className="flex-shrink-0">
  //               <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth={2}
  //                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  //                 />
  //               </svg>
  //             </div>
  //             <div className="ml-3 flex-1">
  //               <p className="text-sm font-medium text-white">{message}</p>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="flex border-l border-red-400">
  //           <button
  //             onClick={() => toast.dismiss(t.id)}
  //             className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
  //           >
  //             <XMarkIcon className="h-5 w-5" />
  //           </button>
  //         </div>
  //       </div>
  //     ),
  //     { duration: 4000 }
  //   )
  // }

  // Handle form submission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.emailOrUsername || !formData.password) return

    setIsLoading(true)
    try {
      console.log('Login attempt:', formData)

      // Call the login API
      const res = await login({
        emailOrUsername: formData.emailOrUsername,
        password: formData.password,
      })

      // Explicitly persist to localStorage (login() already does this; this is a safe reinforcement)
      if (typeof window !== 'undefined' && res?.token) {
        try {
          localStorage.setItem('authToken', res.token)
          if (res?.userData) localStorage.setItem('user', JSON.stringify(res.userData))
        } catch (_) {}
      }

      // Show success toast
      showSuccessToast()

      // Redirect to home page on successful login
      setTimeout(() => {
        router.push(`/${lang}/`)
      }, 500)
    } catch (error: any) {
      // console.error('Login error:', error)

      // Show error toast with custom styling
      setNowError(error.message || dict.login.error)

      setTimeout(() => {
        setNowError(null)
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  return (
    <form className={`grid grid-cols-1 gap-6 ${className}`} onSubmit={handleSubmit}>
      <Field className="block">
        <Label className="text-[#868686] dark:text-[#B7B7B7]">{dict.login.email.label}</Label>
        <Input
          type="text"
          placeholder={dict.login.email.placeholder}
          className="mt-1"
          value={formData.emailOrUsername}
          onChange={handleInputChange('emailOrUsername')}
          required
          disabled={isLoading}
        />
      </Field>
      <Field className="block">
        <Label className="flex items-center justify-between text-neutral-800 dark:text-[#B7B7B7]">
          {dict.login.password.label}
        </Label>
        <div className="relative mt-1">
          <Input
            type={showPassword ? 'text' : 'password'}
            // className="pr-10"
            placeholder={dict.login.password.placeholder}
            value={formData.password}
            onChange={handleInputChange('password')}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={`absolute inset-y-0 flex cursor-pointer items-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ${lang === 'ar' || lang === 'fa' || lang === 'ur' ? 'left-3' : 'right-3'}`}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            disabled={isLoading}
          >
            {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
          </button>
        </div>
      </Field>
      <Field className="ms-auto block">
        <div className="flex items-center text-[#00652E] dark:text-[#60A43A]">
          <Link href="/forgot-password" className="text-sm font-medium underline">
            {dict.login.forgotpassword}
          </Link>
        </div>
      </Field>
      <ButtonPrimary
        type="submit"
        color="loginbtn"
        disabled={isLoading || !formData.emailOrUsername || !formData.password}
      >
        {isLoading ? dict.login.loggingin : dict.login.login}
      </ButtonPrimary>
      {isError ? <p className="text-center text-sm text-red-500">{isError}</p> : null}
    </form>
  )
}
