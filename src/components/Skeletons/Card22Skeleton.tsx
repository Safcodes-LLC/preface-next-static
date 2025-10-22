import clsx from 'clsx'

interface Props {
  className?: string
}

const Card22Skeleton: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={clsx(
        'relative grid grid-cols-1 gap-6 rounded-3xl bg-white p-6 md:gap-10 md:p-10 lg:grid-cols-12 dark:bg-[#0D0D0D]',
        className
      )}
    >
      <div className="h-48 w-full lg:col-span-3 lg:h-auto">
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <div className="h-full w-full animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
      <div className="grid w-full gap-2 lg:col-span-9 lg:gap-5">
        <div className="flex flex-col gap-1">
          <div className="h-5 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-[2px] w-9 animate-pulse rounded bg-neutral-300 dark:bg-neutral-700" />
        </div>
        <div className="space-y-2">
          <div className="h-6 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-6 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-9 w-24 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-9 w-24 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-10/12 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-9/12 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-8/12 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="mt-1 h-5 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  )
}

export default Card22Skeleton
