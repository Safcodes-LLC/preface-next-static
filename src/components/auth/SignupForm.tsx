'use client'

import ButtonPrimary from '@/shared/ButtonPrimary'
import { Field, Label } from '@/shared/fieldset'
import Input from '@/shared/Input'
import { useState } from 'react'

interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface SignupFormProps {
  className?: string
}

export default function SignupForm({ className = '' }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<SignupFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission internally
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      console.log('Signup attempt:', formData)

      // TODO: Add your signup logic here
      // Example API call:
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     password: formData.password,
      //   }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Handle success - redirect or show success message
      console.log('Signup successful!')
    } catch (error) {
      console.error('Signup error:', error)
      // Handle error - show error message
    } finally {
      setIsLoading(false)
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

  const isFormValid = formData.name && formData.email && formData.password && formData.confirmPassword

  return (
    // <form
    //   className={`grid grid-cols-1 gap-6 ${className}`}
    //   onSubmit={handleSubmit}
    // >
    //   <Field className="block">
    //     <Label className="text-[#868686] dark:text-[#B7B7B7]">Name</Label>
    //     <Input
    //       type="text"
    //       placeholder="Enter your full name"
    //       className="mt-1"
    //       value={formData.name}
    //       onChange={handleInputChange('name')}
    //       required
    //       disabled={isLoading}
    //     />
    //     {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
    //   </Field>

    //   <Field className="block">
    //     <Label className="text-[#868686] dark:text-[#B7B7B7]">Email or Mobile Number</Label>
    //     <Input
    //       type="email"
    //       placeholder="Enter your email"
    //       className="mt-1"
    //       value={formData.email}
    //       onChange={handleInputChange('email')}
    //       required
    //       disabled={isLoading}
    //     />
    //     {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
    //   </Field>

    //   <Field className="block">
    //     <Label className="flex items-center justify-between text-neutral-800 dark:text-[#B7B7B7]">
    //       Password
    //     </Label>
    //     <div className="relative mt-1">
    //       <Input
    //         type={showPassword ? 'text' : 'password'}
    //         className="pr-10"
    //         placeholder="Enter your password"
    //         value={formData.password}
    //         onChange={handleInputChange('password')}
    //         required
    //         disabled={isLoading}
    //       />
    //       <button
    //         type="button"
    //         onClick={() => setShowPassword(prev => !prev)}
    //         className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
    //         aria-label={showPassword ? 'Hide password' : 'Show password'}
    //         disabled={isLoading}
    //       >
    //         {showPassword ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
    //       </button>
    //     </div>
    //     {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
    //   </Field>

    //   <Field className="block">
    //     <Label className="flex items-center justify-between text-neutral-800 dark:text-[#B7B7B7]">
    //       Confirm Password
    //     </Label>
    //     <div className="relative mt-1">
    //       <Input
    //         type={showConfirmPassword ? 'text' : 'password'}
    //         className="pr-10"
    //         placeholder="Confirm your password"
    //         value={formData.confirmPassword}
    //         onChange={handleInputChange('confirmPassword')}
    //         required
    //         disabled={isLoading}
    //       />
    //       <button
    //         type="button"
    //         onClick={() => setShowConfirmPassword(prev => !prev)}
    //         className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
    //         aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
    //         disabled={isLoading}
    //       >
    //         {showConfirmPassword ? <FaEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
    //       </button>
    //     </div>
    //     {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
    //   </Field>

    //   <ButtonPrimary
    //     type="submit"
    //     color="loginbtn"
    //     disabled={isLoading || !isFormValid}
    //   >
    //     {isLoading ? 'Creating Account...' : 'Sign Up'}
    //   </ButtonPrimary>
    // </form>

    <form className={`grid grid-cols-1 gap-6 ${className}`} onSubmit={handleSubmit}>
      <Field className="block">
        <Label className="text-[#868686] dark:text-[#B7B7B7]">Name</Label>
        <Input type="text" placeholder="" className="mt-1" />
      </Field>
      <Field className="block">
        <Label className="text-[#868686] dark:text-[#B7B7B7]">Email or Mobile Number</Label>
        <Input type="email" placeholder="" className="mt-1" />
      </Field>
      <Field className="block">
        <Label className="flex items-center justify-between text-neutral-800 dark:text-[#B7B7B7]">Password</Label>
        <Input type="password" className="mt-1" />
      </Field>
      <Field className="block">
        <Label className="flex items-center justify-between text-neutral-800 dark:text-[#B7B7B7]">
          Confirm Password
        </Label>
        <Input type="password" className="mt-1" />
      </Field>
      <ButtonPrimary type="submit" color="loginbtn">
        Sign in
      </ButtonPrimary>
    </form>
  )
}
