import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import Logo from '@/shared/Logo'
import { Field, Label } from '@/shared/fieldset'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { JSX } from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const socials: {
  name: string
  href: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}[] = [
  {
    name: 'Login with Google',
    href: '#',
    // icon: (props) => (
    //   <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    //     <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
    //   </svg>
    // ),
    icon: (props) => <FcGoogle {...props} />, // full-color Google icon
  },
  {
    name: 'Login with Facebook',
    href: '#',
    // icon: (props) => (
    //   <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    //     <path
    //       fillRule="evenodd"
    //       d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
    //       clipRule="evenodd"
    //     />
    //   </svg>
    // ),
    // icon: (props) => <FaFacebook {...props} color="#1877F2" />, // Facebook blue
    icon: () => (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: '#1877F2',
        }}
      >
        <FaFacebookF size={12} color="white" />
      </span>
    ),
  },
  // {
  //   name: 'Continue with GitHub',
  //   href: '#',
  //   icon: (props) => (
  //     <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
  //       <path
  //         fillRule="evenodd"
  //         d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
  //         clipRule="evenodd"
  //       />
  //     </svg>
  //   ),
  // },
]

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Sign up for a new account',
}
const Page = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[3fr_2fr]">
      {/* LEFT SIDE - Content */}
      <div className="flex flex-col justify-center bg-white px-6 sm:px-12 lg:px-20 dark:bg-black">
        <div className="mt-16 mb-10 flex flex-col items-center text-center">
          <Logo />
          <h2 className="mt-8 text-2xl font-semibold text-[#000000] dark:text-white">Sign up</h2>
          <p className="mt-1 text-sm text-[#000000] dark:text-neutral-300">Welcome to our blog magazine Community</p>
        </div>

        <div className="mx-auto max-w-md space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
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
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block bg-white px-4 text-sm font-medium dark:bg-[#000000] dark:text-neutral-400">
              OR
            </span>
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 transform border border-neutral-100 dark:border-neutral-800"></div>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {socials.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex w-full rounded-full border border-[#E2E2E2] bg-white px-4 py-3 transition-transform hover:translate-y-0.5 dark:border-[#363636] dark:bg-[#000000]"
              >
                <item.icon className="size-5 shrink-0" />
                <h3 className="grow px-1 text-center text-sm font-medium text-[#404040] dark:text-white">
                  {item.name}
                </h3>
              </Link>
            ))}
          </div>
          {/* ==== */}
          <div className="mb-16 block text-center text-sm text-[#404040] dark:text-neutral-300">
            Already have an account? {` `}
            <Link href="/login" className="font-medium text-[#00652E] underline">
              Sign in
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

export default Page
