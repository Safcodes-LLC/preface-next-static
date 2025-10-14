import { Metadata } from 'next'
import LoginClient from './LoginClient'
import { getDictionary } from '@/i18n';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account and access our blog magazine community',
}

export default async function LoginPage({ params }: { params: { lang: string } }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return <LoginClient lang={lang} dict={dict} />
}
