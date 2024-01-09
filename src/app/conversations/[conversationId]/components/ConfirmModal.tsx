"use client"
import Modal from '@/components/Modal'
import useConversation from '@/hooks/useConversation'
import { Dialog } from '@headlessui/react'
import axios from 'axios'
import clsx from 'clsx'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

interface ConfirmModalProps {
  Open: boolean;
  CloseModal: () => void;
}
export default function ConfirmModal({ Open, CloseModal }: ConfirmModalProps) {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, SetisLoading] = useState<boolean>(false)

  const DeleteConversation = useCallback(
    () => {
      SetisLoading(!isLoading)
      axios.delete(`/api/conversations/${conversationId}`)
        .then(() => {
          CloseModal();
          router.push('/conversations')
          router.refresh();
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => SetisLoading(!isLoading))
    },
    [conversationId, router, CloseModal, isLoading],
  )

  return (
    <Modal isOpen={Open} Close={CloseModal}>
      <div className='sm:flex sm:items-start '>
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center  rounded-full bg-red-100  sm:mx-0 sm:h-10 sm:w-10 sm:mt-0 mt-5">
          <AlertCircle className='h-6 w-6 text-red-600 ' />
        </div>
        <div className='mt-3 sm:ml-4 sm:mt-0 sm:text-left text-center'>
          <Dialog.Title
            as='h3'
            className={'text-base font-semibold leading-6 text-gray-900 dark:text-gray-50'}
          >
            Delete Conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this conversation? This action cannot be undone
            </p>
          </div>
        </div>
      </div>
      <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>

        <button type="button" disabled={isLoading} onClick={DeleteConversation} className={clsx("focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900", isLoading && ' opacity-50 cursor-default')}>{isLoading ? 'Loading....' : 'Delete'}</button>

        <button type="button" onClick={CloseModal} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
      </div>
    </Modal>
  )
}
