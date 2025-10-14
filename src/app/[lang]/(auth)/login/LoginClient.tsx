'use client'

import LoginForm from '@/components/auth/LoginForm'
import SocialLogin from '@/components/auth/SocialLogin'
import Logo from '@/shared/Logo'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Noto_Serif, Noto_Kufi_Arabic, Noto_Serif_Malayalam } from 'next/font/google';

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

// Dynamically import with no SSR
const GuestRoute = dynamic(() => import('@/contexts/AuthContext').then((mod) => mod.GuestRoute), { ssr: false })

function LoginPageContent({ lang, dict }: { lang: string; dict: any }) {
  return (
    <div
      className={`grid min-h-screen grid-cols-1 md:grid-cols-[3fr_2fr] ${
        lang === 'ar' ? notoKufiArabic.className : lang === 'ml' ? notoSerifMalayalam.className : notoSerif.className
      }`}
      dir={lang === 'ar' || lang === 'fa' || lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* LEFT SIDE - Content */}
      <div className="flex flex-col justify-center bg-white px-6 sm:px-12 lg:px-20 dark:bg-black">
        <div className="mt-16 mb-10 flex flex-col items-center text-center">
          <Logo lang={lang} />
          <h1 className="mt-8 text-2xl font-semibold text-[#000000] dark:text-white">{dict.login.heading}</h1>
          <p className="mt-1 text-sm text-[#000000] dark:text-neutral-300">{dict.login.description}</p>
        </div>

        <div className="mx-auto max-w-md space-y-6">
          <LoginForm dict={dict} lang={lang}/>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-neutral-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 dark:bg-black dark:text-gray-400">{dict.login.orcontinue}</span>
            </div>
          </div>

          <SocialLogin dict={dict} lang={lang} />

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            {dict.login.donthaveaccount+ " "}
            <Link
              href={`/${lang}/signup`}
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {dict.login.signup}
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Image */}
      <div className="relative hidden md:block">
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

export default function LoginClient({ lang, dict }: { lang: string; dict: any }) {
  return (
    <GuestRoute>
      <LoginPageContent lang={lang} dict={dict} />
    </GuestRoute>
  )
}
