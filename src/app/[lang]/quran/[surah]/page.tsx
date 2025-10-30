import { quranData } from '@/data/quran'
import HeroSection from '../components/HeroSection'
import QuranTab from './components/quranTab'

type Props = {
  params: {
    surah: string
    lang: string
  }
}

const page = async (props: Props) => {
  const { surah, lang } = await props.params
  const surahData = quranData.find((s) => s.link === surah)

  return (
    <div className="flex w-full flex-col gap-[20px]">
      <HeroSection surahData={surahData} />
      <QuranTab surahData={surahData} lang={lang} />
    </div>
  )
}

export default page
