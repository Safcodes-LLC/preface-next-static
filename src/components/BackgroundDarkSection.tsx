import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  className?: string
}

const BackgroundDarkSection: FC<Props> = ({ className = 'bg-[#000000] dark:bg-[#0D0D0D]' }) => {
  return (
    <div
      className={clsx(
        'background-section absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 transform ',
        className
      )}
    >
      <span className="sr-only hidden">section background</span>
    </div>
  )
}

export default BackgroundDarkSection
