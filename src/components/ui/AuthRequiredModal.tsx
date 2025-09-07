'use client'

import { Dialog } from '@headlessui/react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { useRouter } from 'next/navigation'

interface AuthRequiredModalProps {
  isOpen: boolean
  onClose: () => void   
  title?: string
  description?: string
  actionText?: string
  cancelText?: string
  redirectPath?: string
}

const AuthRequiredModal = ({
  isOpen,
  onClose,
  title = 'Sign In Required',
  description = 'You need to be signed in to perform this action. Please sign in to continue.',
  actionText = 'Sign In',
  cancelText = 'Cancel',
  redirectPath = '/login',
}: AuthRequiredModalProps) => {
  const router = useRouter()

  const handleAction = () => {
    router.push(redirectPath)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-xl bg-white p-6 dark:bg-neutral-900 w-full">
          <Dialog.Title className="text-lg font-medium">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {description}
          </Dialog.Description>

          <div className="mt-6 flex justify-end space-x-3">
            <ButtonPrimary onClick={onClose}>
              {cancelText}
            </ButtonPrimary>
            <ButtonPrimary onClick={handleAction}>
              {actionText}
            </ButtonPrimary>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default AuthRequiredModal
