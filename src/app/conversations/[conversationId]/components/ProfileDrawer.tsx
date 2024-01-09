"use client"
import Avatar from '@/components/Auth/User/Avatar'
import useOtherUsers from '@/hooks/useOtherUsers'
import { Dialog, Transition } from '@headlessui/react'
import { Conversation, User } from '@prisma/client'
import { format } from 'date-fns'
import { Trash2, X } from 'lucide-react'
import React, { Fragment, useMemo, useState } from 'react'
import ConfirmModal from './ConfirmModal'
import AvatarGroup from '@/components/Auth/User/AvatarGroup'
import useActiveList from '@/hooks/useActiveList'



interface ProfileDrawerProps {
    isOpen: boolean
    Close: () => void,
    data: Conversation & {
        users: User[]
    }
}
export default function ProfileDrawer({ isOpen, data, Close }: ProfileDrawerProps) {
    const { members } = useActiveList()
    const OtherUser = useOtherUsers(data);
    const [DeleteModalState, SetDeleteModalState] = useState<boolean>(false)

    const JoinedDate = useMemo(() => {
        return format(new Date(OtherUser.createdAt), 'PP')
    }, [OtherUser.createdAt])
    
    const isActive = members.indexOf(OtherUser?.email!) !== -1;

    const Title = useMemo(() => {
        return data.name || OtherUser.name
    }, [data.name, OtherUser.name])

    const StatusText = useMemo(() => {
        if (data.isGroup) {
            return `Participants: ${data.users?.length} members`;
        }
        return isActive ? 'Active' : 'Offline'

    }, [data, isActive])

    return (
        <>
            <ConfirmModal
                Open={DeleteModalState}
                CloseModal={() => SetDeleteModalState(!DeleteModalState)}
            />
            {/* <div className=' bg-neutral-50 dark:bg-neutral-800 p-5  '>

            </div> */}
            <Transition.Root show={isOpen} as={Fragment} >
                <Dialog as='div' className={'relative z-50'} onClose={Close}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-500'
                        enterFrom='opacity-0'
                        enterTo='opacity-50'
                        leave='ease-in duration-500'
                        leaveFrom='opacity-50'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 dark:bg-neutral-700 bg-neutral-200 bg-opacity-20  ' />
                    </Transition.Child>
                    <div className='fixed inset-0 overflow-hidden'>
                        <div className='absolute inset-0 overflow-hidden'>
                            <div className=' pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                                <Transition.Child
                                    as={Fragment}
                                    enter='transform transition ease-in-out duration-500'
                                    enterFrom='translate-x-full'
                                    enterTo='translate-x-0'
                                    leave='transform transition  ease-in-out duration-500x'
                                    leaveTo='translate-x-full'
                                >
                                    <Dialog.Panel
                                        className={'pointer-events-auto w-screen max-w-md'}>
                                        <dl className='flex h-full flex-col overflow-y-auto bg-neutral-50 dark:bg-neutral-700 py-6 shadow-xl'>
                                            <div className="px-4 sm:px-6">
                                                <div className='flex item-start justify-end '>
                                                    <div className='ml-3 flex h-7 items-center'>
                                                        <button onClick={Close} type="button"
                                                            className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75 ">
                                                            <span className="sr-only">Close Panel</span>
                                                            <X />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* This is where the content goes */}

                                            <div className="relative mt-6 flex-1 px-4 sm:px-6 ">
                                                <div className='flex flex-col items-center'>
                                                    <div className='mb-2 '>
                                                        {
                                                            data.isGroup ? (
                                                                <AvatarGroup users={data.users} />
                                                            ) : (
                                                                <Avatar currentUser={OtherUser} />

                                                            )
                                                        }
                                                    </div>
                                                    <div>
                                                        {Title}
                                                    </div>
                                                    <div className='text-sm text-gray-500'>
                                                        {StatusText}
                                                    </div>
                                                    <div className='flex gap-10 my-0'>
                                                        <div
                                                            onClick={() => SetDeleteModalState(!DeleteModalState)}
                                                            className='  flex flex-col gap-3 items-center cursor-pointer hover:opacity-75'
                                                        >
                                                            <div className='w-10 h-10 rounded-full dark:bg-neutral-800 bg-neutral-100 flex items-center justify-center'>
                                                                <Trash2 size={20} />
                                                            </div>
                                                            <div className=' text-sm font-light text-neutral-400 dark:text-neutral-300 '>
                                                                Delete
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='w-full py-5 sm:px-0 sm:pt-0 '>
                                                        <dl className='space-y-8 px-4 sm:space-y-6 sm:px-6'>
                                                            {data.isGroup ? (<div>
                                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400  sm:w-40 sm:flex-shrink-0 mt-2 ">
                                                                    Emails
                                                                </dt>
                                                                <dd className=' mt-1 text-sm text-gray-900 sm:col-span-2 dark:text-gray-50 '>
                                                                    {data.users.map((user) => user.email).join(', ')}
                                                                </dd>
                                                            </div>) : (<div>
                                                                <dt className='text-sm font-medium sm:w-40 sm:flex-shrink-0 text-gray-500 dark:text-gray-400'>
                                                                    Email
                                                                </dt>
                                                                <dd className='mt-1 text-sm text-gray-900 dark:text-gray-50 sm:col-span-2'>
                                                                    {OtherUser.email}
                                                                </dd>
                                                            </div>)}
                                                            {
                                                                !data.isGroup && (
                                                                    <>
                                                                        <hr />
                                                                        <div>
                                                                            <dt className='text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-40 sm:flex-shrink-0'>
                                                                                Joined
                                                                            </dt>
                                                                            <dd className=' mt-1 text-sm text-gray-900 dark:text-gray-50 sm:col-span-2 '>
                                                                                <time dateTime={JoinedDate}>
                                                                                    {JoinedDate}
                                                                                </time>
                                                                            </dd>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </dl>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
