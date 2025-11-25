import SectionHero1 from '@/components/SectionHero1'
import rightImg from '@/images/about-hero-right.png'
import { Divider } from '@/shared/divider'
import { Metadata } from 'next'
import SectionKeyFeatures from './SectionKeyFeatures'
import SectionOurMission from './SectionOurMission'
import SectionWhoWeAre from './SectionWhoWeAre'

export async function generateMetadata({}: {}): Promise<Metadata> {
  return {
    title: 'About US - Preface Islam',
    description: `Preface Islam is a platform for Muslims to learn about Islam and its teachings`,
  }
}

const PageAbout = ({}) => {
  return (
    <div className={`nc-PageAbout relative`}>
      <div className="relative container space-y-10 py-16 lg:space-y-16 lg:py-28">
        <SectionHero1
          rightImg={rightImg}
          heading="About us"
          btnText="Get in touch"
          subHeading="Since its founding in 1995, Quran.com has been committed to making the Quran available to everyone in a way that is clear, authentic, and easy to engage with. Every day, millions of people worldwide turn to Quran.com to read, listen, study, and reflect on the Quran—whether they are lifelong students, scholars, or just beginning their journey."
        />
        <Divider />
        <SectionOurMission />
        <Divider />
        <SectionKeyFeatures />
        <Divider />
        <SectionWhoWeAre />

        {/* <div className="py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:col-span-7 lg:text-5xl">
              Want product news and updates? Sign up for our newsletter.
            </h2>
            <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
              <div className="flex gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                <Button type="submit">Subscribe</Button>
              </div>
              <p className="mt-4 text-sm/6">
                We care about your data. Read our{' '}
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  privacy&nbsp;policy
                </a>
                .
              </p>
            </form>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default PageAbout
