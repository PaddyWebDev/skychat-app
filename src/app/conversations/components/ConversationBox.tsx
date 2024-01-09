"use client"

import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { Conversation, Message, User } from '@prisma/client'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { FullConversationType } from '@/Types'
import useOtherUsers from '@/hooks/useOtherUsers'
import Avatar from '@/components/Auth/User/Avatar'
import AvatarGroup from '@/components/Auth/User/AvatarGroup'

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean
}

export default function ConversationBox({ data, selected }: ConversationBoxProps) {
    const OtherUser = useOtherUsers(data);
    const session = useSession();
    const router = useRouter()

    const HandleClick = useCallback(
        () => {
            router.push(`/conversations/${data.id}`)
        },
        [data.id, router],
    )

    const LastMessage = useMemo(() => {
        const messages = data.messages || [];
        return messages[messages.length - 1]
    }, [data.messages])

    const UserEmail = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    const HasSeen = useMemo(() => {
        if (!LastMessage) {
            return false;
        }
        const SeenArray = LastMessage.seenBy || [];

        if (!UserEmail) {
            return false;
        }
        return SeenArray.filter((user) => user.email === UserEmail).length !== 0
    }, [UserEmail, LastMessage])

    const LastMessageText = useMemo(() => {
        if (LastMessage?.image) {
            return 'Sent an Image';
        }
        if (LastMessage?.body) {
            return LastMessage.body
        }
        return 'Started a Conversation'
    }, [LastMessage])
    return (
        <div className={clsx('w-full relative flex items-center space-x-3 mb-5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg p-3 transition cursor-pointer', selected ? 'bg-neutral-50 dark:bg-neutral-950' : 'bg-neutral-100 dark:bg-neutral-900')}
            onClick={HandleClick}>
            {data.isGroup ? (
                <AvatarGroup users={data.users} />
            ) : (
                <Avatar currentUser={OtherUser} />
            )}
            <div className='min-w-0 flex-1 '>
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className='text-md font-medium text-gray-900  dark:text-gray-50'>
                            {data.name || OtherUser.name}
                        </p>
                        {
                            LastMessage?.createdAt && (
                                <p className='
                                text-xs text-gray-400 font-light
                                dark:text-gray-600
                                '>
                                    {format(new Date(LastMessage.createdAt), 'p')}
                                </p>
                            )
                        }
                    </div>
                    <p className={clsx(`
                    truncate text-sm 
                    `, HasSeen ? 'text-gray-500 dark:text-gray-300 font-light' : 'text-stone-950 dark:text-neutral-100 font-medium')}>
                        {LastMessageText}
                    </p>
                </div>

            </div>
        </div>
    )
}
