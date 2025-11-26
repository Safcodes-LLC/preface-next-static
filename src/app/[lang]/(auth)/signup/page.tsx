import SignupForm from '@/components/auth/SignupForm'
import SocialLogin from '@/components/auth/SocialLogin'
import { GuestRoute } from '@/contexts/AuthContext'
import { getDictionary } from '@/i18n'
import Logo from '@/shared/Logo'
import { Metadata } from 'next'
import { Noto_Naskh_Arabic, Noto_Serif_Malayalam } from 'next/font/google'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'

const elgraine = localFont({
  src: [
    {
      path: '../../../../../public/fonts/Elgraine-Regular.woff',
    },
  ],
  variable: '--font-elgraine',
})
const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
const notoSerifMalayalam = Noto_Serif_Malayalam({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account and join our blog magazine community',
}

function SignupPageContent({ lang, dict }: { lang: string; dict: any }) {
  // This component will only be rendered if GuestRoute allows it
  // (i.e., when user is not authenticated)
  return (
    <div
      className={`grid min-h-screen grid-cols-1 md:grid-cols-[3fr_2fr] ${
        lang === 'ar' ? notoNaskhArabic.className : lang === 'ml' ? notoSerifMalayalam.className : elgraine.variable
      }`}
      dir={lang === 'ar' || lang === 'fa' || lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* LEFT SIDE - Content */}
      <div className="flex flex-col justify-center bg-white px-6 sm:px-12 lg:px-20 dark:bg-black">
        <div className="mt-16 mb-10 flex flex-col items-center text-center">
          <Logo lang={lang} />
          <h1 className="mt-8 text-2xl font-semibold text-[#000000] dark:text-white">{dict.signup.heading}</h1>
          <p className="mt-1 text-sm text-[#000000] dark:text-neutral-300">{dict.signup.description}</p>
        </div>

        <div className="mx-auto max-w-md space-y-6">
          {/* Signup Form Component - No onSubmit prop */}
          <SignupForm dict={dict} lang={lang} />

          {/* Social Login Component */}
          <SocialLogin dict={dict} lang={lang} />

          {/* Footer link */}
          <div className="mb-16 block text-center text-sm text-[#404040] dark:text-neutral-300">
            {dict.login.donthaveaccount + ' '}
            <Link
              href={`/${lang}/login`}
              className="font-medium text-[#00652E] underline transition-all hover:no-underline"
            >
              {dict.signup.signin}
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Background image */}
      <div className="relative hidden min-h-screen md:block">
        <Image
          src="/images/login-bg.png"
          alt="Sign up background"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 0px, 40vw"
        />
      </div>
    </div>
  )
}

export default async function SignupPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  // The GuestRoute will handle the redirection if user is already authenticated
  return (
    <GuestRoute>
      <SignupPageContent lang={lang} dict={dict} />
    </GuestRoute>
  )
}
