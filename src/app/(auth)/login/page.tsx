import { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'
import SocialLogin from '@/components/auth/SocialLogin'
import Logo from '@/shared/Logo'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account and access our blog magazine community',
}

export default function LoginPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[3fr_2fr]">
      {/* LEFT SIDE - Content */}
      <div className="flex flex-col justify-center bg-white px-6 sm:px-12 lg:px-20 dark:bg-black">
        <div className="mt-16 mb-10 flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-8 text-2xl font-semibold text-[#000000] dark:text-white">
            Login to your account
          </h1>
          <p className="mt-1 text-sm text-[#000000] dark:text-neutral-300">
            Welcome to our blog magazine Community
          </p>
        </div>

        <div className="mx-auto max-w-md space-y-6">
          {/* Login Form Component - No onSubmit prop */}
          <LoginForm />
          
          {/* Social Login Component */}
          <SocialLogin />
          
          {/* Footer link */}
          <div className="mb-16 block text-center text-sm text-[#404040] dark:text-neutral-300">
            New user? {` `}
            <Link 
              href="/signup" 
              className="font-medium text-[#00652E] underline hover:no-underline transition-all"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
      
      {/* RIGHT SIDE - Background image */}
      <div className="relative hidden min-h-screen md:block">
        <Image
          src="/images/login-bg.png"
          alt="Login background"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 0px, 40vw"
        />
      </div>
    </div>
  )
}