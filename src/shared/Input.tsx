import clsx from 'clsx'
import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string
  fontClass?: string
  rounded?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      sizeClass = 'h-11 px-4 py-3',
      fontClass = 'sm:text-sm font-normal',
      rounded = 'rounded-full',
      type = 'text',
      ...args
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={clsx(
          'block w-full border-[#E2E2E2] bg-white focus:border-[#B7B7B7] focus:ring-3 focus:ring-[#B7B7B7] dark:border-[#363636] dark:bg-[#000000] dark:focus:ring-primary-600/25',
          rounded,
          fontClass,
          sizeClass,
          className
        )}
        {...args}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
