'use client'

import SocialLogin from '@/components/auth/SocialLogin'
import { getDictionary } from '@/i18n'
import { login } from '@/services/authService'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import { Field, Label } from '@/shared/fieldset'
import { Dialog } from '@headlessui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Noto_Kufi_Arabic, Noto_Serif, Noto_Serif_Malayalam } from 'next/font/google'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
const notoSerifMalayalam = Noto_Serif_Malayalam({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  cancelText?: string
  onLoginSuccess?: () => void
  redirectPath?: string
}

const LoginModal = ({
  isOpen,
  onClose,
  title = 'Sign In',
  description = 'Sign in to your account to continue',
  cancelText = 'Cancel',
  onLoginSuccess,
  redirectPath = '/signup',
}: LoginModalProps) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [dict, setDict] = useState<any>(null)
  const [lang, setLang] = useState('en')
  const searchParams = useSearchParams()
  const params = useParams<{ lang?: string }>()
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginSuccess = () => {
    if (onLoginSuccess) {
      onLoginSuccess()
    }
    onClose()
  }

  // In LoginModal.tsx, updating the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.emailOrUsername || !formData.password) return

    setIsLoading(true)
    try {
      console.log('Login attempt:', formData)

      // Call the login API
      await login({
        emailOrUsername: formData.emailOrUsername,
        password: formData.password,
      })

      // Handle successful login without redirect
      handleLoginSuccess()

      // Don't redirect here, just close the modal
    } catch (error: any) {
      console.error('Login error:', error)
      // You can add error handling here (e.g., show toast notification)
      alert(error.message || 'Login failed. Please try again.')
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
  useEffect(() => {
    const fetchDictionary = async () => {
      const paramLang = (params as any)?.lang
      const queryLang = searchParams.get('lang')
      const langData = (Array.isArray(paramLang) ? paramLang[0] : paramLang) || queryLang || 'en'
      try {
        const dictData = await getDictionary(langData)
        setDict(dictData)
      } catch (e) {
        // fallback silently if dictionary load fails
        setDict(null)
      }
      setLang(langData)
    }
    fetchDictionary()
  }, [searchParams, params])
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className={`relative z-50 ${lang === 'ar' || lang === 'fa' || lang === 'ur' ? notoKufiArabic.className : lang === 'ml' ? notoSerifMalayalam.className : notoSerif.className}`}
      dir={lang === 'ar' || lang === 'fa' || lang === 'ur' ? 'rtl' : 'ltr'}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 dark:bg-neutral-900">
          <Dialog.Title className="text-center text-2xl font-semibold text-gray-900 dark:text-white">
            {dict?.login.heading || title}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            {dict?.login.description || description}
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <Field className="block">
              <Label className="text-[#868686] dark:text-[#B7B7B7]">
                {dict?.login?.email?.label || 'Email or Username'}
              </Label>
              <Input
                type="text"
                placeholder={dict?.login?.email?.placeholder || 'Enter your email or username'}
                className="mt-1"
                value={formData.emailOrUsername}
                onChange={handleInputChange('emailOrUsername')}
                required
                disabled={isLoading}
              />
            </Field>

            <Field className="block">
              <Label className="flex items-center justify-between text-neutral-800 dark:text-[#B7B7B7]">
                {dict?.login?.password?.label || 'Password'}
              </Label>
              <div className="relative mt-1">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full"
                  placeholder={dict?.login?.password?.placeholder || 'Enter your password'}
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`absolute inset-y-0 ${lang === 'ar' || lang === 'fa' || lang === 'ur' ? 'left-3' : 'right-3'} flex items-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200`}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </Field>

            <Field className="block">
              <div className="flex items-center justify-end text-[#00652E] dark:text-[#60A43A]">
                <Link href="/forgot-password" className="text-sm font-medium underline hover:no-underline">
                  {dict?.login?.forgotpassword || 'Forgot password?'}
                </Link>
              </div>
            </Field>

            <ButtonPrimary
              type="submit"
              color="loginbtn"
              className="w-full"
              disabled={isLoading || !formData.emailOrUsername || !formData.password}
            >
              {isLoading ? dict?.login?.loggingin || 'Logging in...' : dict?.login?.login || 'Sign In'}
            </ButtonPrimary>

            <SocialLogin lang={lang} dict={dict} />

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              {(dict?.login?.donthaveaccount || "Don't have an account?") + ' '}
              <Link
                href={`${lang}/signup`}
                onClick={() => onClose()}
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                {dict?.login?.signup || 'Sign up'}
              </Link>
            </p>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default LoginModal
