'use client'

import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Item = {
  _id?: string
  title?: string
  name?: string
  slug?: string
  featuredIcon?: string
  totalArticles?: number
  icon?: { src?: string }
}

interface Props {
  className?: string
  items: Item[]
  lang?: string
  onApply?: (selected: Item[]) => void
  onClear?: () => void
  label?: string
  selectedIds?: string[]
  onChangeSelectedIds?: (ids: string[]) => void
  loading?: boolean
}

const FiltersDropdown: React.FC<Props> = ({
  className,
  items,
  lang,
  onApply,
  onClear,
  label = 'Filter',
  selectedIds: controlledIds,
  onChangeSelectedIds,
  loading = false,
}) => {
  const [open, setOpen] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const panelRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const changeOriginRef = useRef<'internal' | 'external' | null>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!open) return
      const t = e.target as Node
      if (panelRef.current && !panelRef.current.contains(t) && buttonRef.current && !buttonRef.current.contains(t)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Sync controlled selected IDs
  useEffect(() => {
    if (Array.isArray(controlledIds)) {
      changeOriginRef.current = 'external'
      setSelectedIds(new Set(controlledIds))
    }
  }, [controlledIds])

  // Notify parent after selection changes (post-render)
  useEffect(() => {
    if (changeOriginRef.current === 'internal') {
      onChangeSelectedIds?.(Array.from(selectedIds))
    }
    changeOriginRef.current = null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds])

  const toggle = () => {
    if (loading) return
    setOpen((v) => !v)
  }

  const isSelected = (id: string) => selectedIds.has(id)
  const toggleSelected = (id: string) => {
    if (loading) return
    changeOriginRef.current = 'internal'
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleClear = () => {
    if (loading) return
    changeOriginRef.current = 'internal'
    setSelectedIds(new Set())
    onClear?.()
  }

  const handleApply = () => {
    if (loading) return
    const selected = items.filter((it) => (it._id || it.slug || '') && isSelected((it._id || it.slug) as string))
    onApply?.(selected)
    setOpen(false)
  }

  // Accessible ARIA attributes
  const labelId = 'filters-dropdown-label'
  const panelId = 'filters-dropdown-panel'

  return (
    <div className={clsx('w-full', className)}>
      {/* Toggle button */}
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-busy={loading}
        aria-controls={panelId}
        className={clsx(
          'flex w-full items-center justify-between rounded-lg border border-[#E3E3E3] bg-white px-4 py-3 text-left shadow-sm',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00652E] dark:border-[#2C2C2C] dark:bg-[#0D0D0D] dark:text-white',
          loading && 'cursor-not-allowed opacity-70'
        )}
        onClick={toggle}
        disabled={loading}
      >
        <span id={labelId} className="text-sm font-medium">
          {label}
          {selectedIds.size > 0 && (
            <span className="ms-2 rounded-full bg-[#00652E]/10 px-2 py-0.5 text-xs text-[#00652E]">
              {selectedIds.size}
            </span>
          )}
        </span>
        {loading ? (
          <span className="ml-2 inline-flex items-center text-xs text-neutral-500" aria-live="polite">
            <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-[#00652E]" />
            Loading
          </span>
        ) : (
          <ChevronDownIcon
            className={clsx(
              'h-5 w-5 text-neutral-600 transition-transform duration-200 dark:text-neutral-300',
              open && 'rotate-180'
            )}
            aria-hidden="true"
          />
        )}
      </button>

      {/* Panel */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={labelId}
        ref={panelRef}
        className={clsx(
          'mt-2 overflow-hidden rounded-lg border border-[#E3E3E3] bg-white shadow-sm dark:border-[#2C2C2C] dark:bg-[#0D0D0D]',
          'transition-all duration-300',
          open ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-busy={loading}
      >
        {/* Items list */}
        <div className={clsx('grid grid-cols-1 gap-2 p-3 sm:p-4', loading && 'pointer-events-none opacity-60')}>
          {items.map((item) => {
            const id = (item._id || item.slug || '') as string
            const checked = isSelected(id)
            return (
              <label
                key={id}
                className={clsx(
                  'group relative flex cursor-pointer items-center justify-between gap-x-3 rounded-[10px] bg-white px-3 py-[10px] ring-1 ring-[#E3E3E3] hover:bg-[#00652E] dark:bg-[#0D0D0D] dark:ring-[#2C2C2C]',
                  checked && 'ring-[#00652E] hover:bg-[#00652E]'
                )}
              >
                <input
                  type="checkbox"
                  className="peer absolute inset-0 cursor-pointer opacity-0"
                  aria-label={(item.name || item.title || 'Filter option') + (checked ? ' selected' : '')}
                  checked={checked}
                  onChange={() => id && toggleSelected(id)}
                  disabled={loading}
                />
                <div className="relative h-[36px] w-[36px] shrink-0 rounded-full bg-[#F8F8F8] dark:bg-[#1A1A1A]">
                  <Image
                    className="object-contain p-2"
                    src={item.featuredIcon || item.icon?.src || '/images/placeholder-image.png'}
                    fill
                    alt={item.name || item.title || 'category icon'}
                  />
                </div>
                <div className="flex flex-1 flex-col text-left">
                  <h2 className={clsx('block text-sm text-[#000000] dark:text-white', 'group-hover:text-white')}>
                    <span>{item.name || item.title}</span>
                  </h2>
                  <span
                    className={clsx(
                      'text-[9px] font-[400] text-neutral-500 dark:text-neutral-400',
                      'group-hover:text-white'
                    )}
                  >
                    {item.totalArticles || 0} Articles
                  </span>
                </div>
                {checked && (
                  <XMarkIcon className="h-4 w-4 shrink-0 text-[#00652E] group-hover:text-white" aria-hidden="true" />
                )}
              </label>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 border-t border-[#E3E3E3] p-3 dark:border-[#2C2C2C]">
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md border border-[#E3E3E3] px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00652E] dark:border-[#2C2C2C] dark:text-neutral-200 dark:hover:bg-neutral-800"
            disabled={loading}
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="rounded-md bg-[#00652E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#005226] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00652E]"
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Apply Filter'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FiltersDropdown
