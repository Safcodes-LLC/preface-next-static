'use client'

import { signup } from '@/services/authService'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import { Field, Label } from '@/shared/fieldset'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  username: string
  surname: string
}

interface SignupFormProps {
  className?: string
  dict?: any
  lang?: string
}

export default function SignupForm({ className = '', dict, lang }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    surname: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<SignupFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = dict.signup.fullName.errorMessage
    }

    if (!formData.email.trim()) {
      newErrors.email = dict.signup.email.errorMessage
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = dict.signup.email.errorMessage
    }

    if (!formData.password) {
      newErrors.password = dict.signup.password.errorMessage
    } else if (formData.password.length < 8) {
      newErrors.password = dict.signup.password.errorMessage
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = dict.signup.confirmPassword.errorMessage
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = dict.signup.confirmPassword.errorMessage
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const router = useRouter()

  const signupMutation = useMutation({
    mutationFn: (data: Omit<SignupFormData, 'confirmPassword'>) => signup(data),
    onSuccess: (data) => {
      toast.success(dict.signup.toast.success)
      // Redirect to login after a short delay
      // setTimeout(() => {
      router.push(`/${lang}/login`)
      // }, 2000)
    },
    onError: (error: Error) => {
      // Clear the email field if email is already registered
      if (error.message.toLowerCase().includes('email already')) {
        setFormData((prev) => ({ ...prev, email: '' }))
        // Focus on the email field
        setTimeout(() => {
          const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement
          emailInput?.focus()
        }, 100)
      }

      // Show error message
      toast.error(error.message || dict.signup.toast.error)
    },
  })

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    const { confirmPassword, ...signupData } = formData

    // Generate username from name if not provided
    const username = formData.username || formData.name.toLowerCase().replace(/\s+/g, '')

    // Generate surname from name if not provided
    const surname = formData.surname || formData.name.split(' ').slice(1).join(' ') || formData.name

    try {
      await signupMutation.mutateAsync({
        ...signupData,
        username,
        surname,
      })
    } catch (error) {
      // Error is handled by the mutation
    }
  }

  const handleInputChange = (field: keyof SignupFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  return (
    <form className={`grid grid-cols-1 gap-6 ${className}`} onSubmit={handleSubmit} noValidate>
      <Field className="block">
        <Label className="text-[#868686] dark:text-[#B7B7B7]">{dict.signup.fullName.label}</Label>
        <Input
          type="text"
          placeholder={dict.signup.fullName.placeholder}
          className="mt-1"
          value={formData.name}
          onChange={handleInputChange('name')}
          required
          disabled={signupMutation.isPending}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </Field>

      <Field className="block">
        <Label className="text-[#868686] dark:text-[#B7B7B7]">{dict.signup.email.label}</Label>
        <Input
          type="email"
          placeholder={dict.signup.email.placeholder}
          className="mt-1"
          value={formData.email}
          onChange={handleInputChange('email')}
          required
          disabled={signupMutation.isPending}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </Field>

      <Field className="block">
        <Label className="text-[#868686] dark:text-[#B7B7B7]">{dict.signup.userName.label}</Label>
        <Input
          type="text"
          placeholder={dict.signup.userName.placeholder}
          className="mt-1"
          value={formData.username}
          onChange={handleInputChange('username')}
          disabled={signupMutation.isPending}
        />
        <p className="mt-1 text-xs text-gray-500">{dict.signup.userName.note}</p>
      </Field>

      <Field className="block">
        <Label className="flex items-center justify-between text-neutral-800 dark:text-[#B7B7B7]">
          {dict.signup.password.label}
        </Label>
        <div className="relative mt-1">
          <Input
            type={showPassword ? 'text' : 'password'}
            className="w-full"
            placeholder={dict.signup.password.placeholder}
            value={formData.password}
            onChange={handleInputChange('password')}
            required
            minLength={8}
            disabled={signupMutation.isPending}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={`absolute inset-y-0 cursor-pointer ${lang === 'ar' || lang === 'fa' || lang === 'ur' ? 'left-3' : 'right-3'} flex items-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200`}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            disabled={signupMutation.isPending}
          >
            {showPassword ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </Field>

      <Field className="block">
        <Label className="flex items-center justify-between text-neutral-800 dark:text-[#B7B7B7]">
          {dict.signup.confirmPassword.label}
        </Label>
        <div className="relative mt-1">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            className="w-full"
            placeholder={dict.signup.confirmPassword.placeholder}
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            required
            disabled={signupMutation.isPending}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className={`absolute inset-y-0 cursor-pointer ${lang === 'ar' || lang === 'fa' || lang === 'ur' ? 'left-3' : 'right-3'} flex items-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200`}
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            disabled={signupMutation.isPending}
          >
            {showConfirmPassword ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
      </Field>

      <ButtonPrimary
        type="submit"
        color="loginbtn"
        disabled={signupMutation.isPending}
        className="w-full justify-center py-3"
      >
        {signupMutation.isPending ? dict.signup.creatingAccount : dict.signup.createAccount}
      </ButtonPrimary>
    </form>
  )
}
