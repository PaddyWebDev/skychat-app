"use client"

import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import React, { Fragment } from 'react'

interface ModalProps {
    isOpen?: boolean
    Close: () => void,
    children: React.ReactNode
}

export default function Modal({ isOpen, Close, children }: ModalProps) {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as='div' className={'relative z-50'} onClose={Close}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-75'
                    leave='ease-in duration-300'
                    leaveFrom='opacity-75'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500 dark:bg-gray-700 bg-opacity-75 transition-opacity ' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4  sm:p-0 '>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100 '
                            leave='ease-in duration-300'
                            leaveFrom='translate-y-0 opacity-100 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel
                                className={'relative overflow-hidden transform rounded-lg bg-white dark:bg-neutral-800 px-4 pb-4 shadow-xl transition-all w-full sm:my-8 sm:max-w-lg sm:p-6'}
                            >

                                <div className='absolute right-0 top-0 pr-4 pt-4 sm:block z-10 '>
                                    <button type="button" className='rounded-md  focus:outline-none focus:ring-2  focus:ring-offset-2 hover:text-gray-500  focus:ring-indigo-500 ' onClick={Close}>
                                        <span className="sr-only">
                                            Close
                                        </span>
                                        <X className='h-6 w-6 ' />
                                    </button>
                                </div>
                                {children}
                            </Dialog.Panel>

                        </Transition.Child>
                    </div>
                </div>

            </Dialog>

        </Transition.Root>
    )
}
