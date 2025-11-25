import clsx from 'clsx'
import { StaticImageData } from 'next/image'
import { FC, ReactNode } from 'react'

interface Props {
  className?: string
  rightImg?: string | StaticImageData
  heading?: ReactNode
  subHeading?: string
  btnText?: string
  btnHref?: string
}

const SectionHero1: FC<Props> = ({ className, rightImg, heading, subHeading, btnText, btnHref }) => {
  return (
    <div className={clsx('section-hero relative', className)}>
      <div className="relative">
        <div className="w-screen max-w-full space-y-5 lg:space-y-7">
          <h2 className="text-3xl leading-tight font-semibold text-pretty md:text-4xl xl:text-5xl">{heading}</h2>
          <span className="block text-base text-neutral-600 xl:text-lg dark:text-neutral-400">{subHeading}</span>
          {/* {!!btnText && <ButtonPrimary href={btnHref || '/'}>{btnText}</ButtonPrimary>} */}
        </div>
        {/* <div className="grow">
          <Image className="w-full" src={rightImg || ''} alt="" />
        </div> */}
      </div>
    </div>
  )
}

export default SectionHero1
