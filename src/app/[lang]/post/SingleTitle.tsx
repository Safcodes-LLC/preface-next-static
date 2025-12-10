import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  title: string
  className?: string
}

const SingleTitle: FC<Props> = ({ className, title }) => {
  return (
    <h1
      className={clsx(
        className,
        'w-4/5 text-[38px] font-semibold tracking-tight text-pretty max-2xl:text-[30px] max-lg:text-[26px] max-md:w-full max-md:text-[22px]'
      )}
      title={title}
    >
      {title}
    </h1>
  )
}

export default SingleTitle
