"use client"
import { FullConversationType } from '@/Types';
import useConversation from '@/hooks/useConversation';
import clsx from 'clsx';
import { Users2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import ConversationBox from './ConversationBox';
import GroupChatModal from './GroupChatModal';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/libraries/pusher';
import { find } from 'lodash';

interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[]
}

const ConversationList = ({ initialItems, users }: ConversationListProps) => {
    const session = useSession()
    const [Items, SetItems] = useState<Array<FullConversationType>>(initialItems)
    const [IsOpen, SetIsOpen] = useState<boolean>(false)
    const router = useRouter();
    const { conversationId, isOpen }: any = useConversation()

    const pusherKey = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    useEffect(() => {
        if (!pusherKey) {
            return;
        }

        pusherClient.subscribe(pusherKey)

        function newHandler(conversation: FullConversationType) {
            SetItems((currentItem) => {
                if (find(currentItem, { id: conversation.id })) {
                    return currentItem
                }

                return [conversation, ...currentItem];
            })
        }

        function updateHandler(conversation: FullConversationType) {
            SetItems((currentItem) => currentItem.map((currentConversation) => {
                if (currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: conversation.messages
                    };
                }
                return currentConversation;
            }))
        }

        function removeHandler(conversation: FullConversationType) {
            SetItems((currentItem) => {
                return [...currentItem.filter((convo) => convo.id !== conversation.id)]
            })
            if (conversationId === conversation.id) {
                router.push('/conversations')
            }
        }


        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:remove', removeHandler)

        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind('conversation:new', newHandler)
            pusherClient.unbind('conversation:update', updateHandler)
            pusherClient.unbind('conversation:remove', removeHandler)
        }
    }, [pusherKey, router, conversationId])
    return (
        <>
            <GroupChatModal
                OpenModal={IsOpen}
                CloseModal={() => SetIsOpen(false)}
                users={users}
            />
            <aside
                className={clsx(` dark:bg-neutral-800 bg-neutral-200
        fixed inset-y-0 pb-20 lg:pb-0 lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
         border-r
         dark:border-slate-900 
         border-slate-200
        `, isOpen ? 'hidden' : 'block w-full left-0')}>
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className='text-2xl font-bold dark:text-slate-50 text-neutral-800'>
                            Messages
                        </div>
                        <div onClick={() => SetIsOpen(true)} className='rounded-full p-2 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-500 cursor-pointer hover:opacity-75 transition'>
                            <Users2Icon />
                        </div>
                    </div>
                    {
                        Items.map((item, index) => (
                            <ConversationBox
                                key={index}
                                data={item}
                                selected={conversationId === item.id}
                            />
                        ))
                    }
                </div>
            </aside>
        </>
    )
}

export default ConversationList