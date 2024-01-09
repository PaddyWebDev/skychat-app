"use client"
import React, { useMemo, useState } from 'react'
import { Conversation, User } from '@prisma/client'
import useOtherUsers from '@/hooks/useOtherUsers'
import Link from 'next/link'
import { ArrowLeft, MoreHorizontal } from 'lucide-react'
import Avatar from '@/components/Auth/User/Avatar'
import ProfileDrawer from './ProfileDrawer'
import useActiveList from '@/hooks/useActiveList'

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}
export default function Header({ conversation }: HeaderProps) {

    const { members } = useActiveList()
    const otherUser = useOtherUsers(conversation)
    const [DrawerState, SetDrawerState] = useState<boolean>(false)
    const isActive = members.indexOf(otherUser?.email!) !== -1;
    const StatusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }


        return isActive ? 'Active' : 'Offline'
    }, [conversation, isActive])
    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={DrawerState}
                Close={() => SetDrawerState(!DrawerState)}
            />
            <div className='w-full bg-white dark:bg-neutral-900 flex border-b dark:border-gray-700 border-gray-200  py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
                <div className='flex gap-3 items-center'>
                    <Link
                        className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
                        href={'/conversations'}>
                        <ArrowLeft />
                    </Link>
                    <Avatar currentUser={otherUser} />
                    <div className='flex flex-col'>
                        <div>
                            {conversation.name || otherUser.name}
                        </div>
                        <div
                            className='text-sm font-light text-neutral-400 dark:text-neutral-600'
                        >
                            {StatusText}
                        </div>
                    </div>
                </div>
                <MoreHorizontal
                    size={32}
                    onClick={() => SetDrawerState(!DrawerState)}
                    className=' text-sky-500 hover:text-sky-600 transition cursor-pointer '
                />
            </div>
        </>
    )
}
