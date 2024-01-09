"use client"
import { FullMessageType } from '@/Types'
import useConversation from '@/hooks/useConversation'
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import axios from 'axios'
import { pusherClient } from '@/libraries/pusher'
import { find } from 'lodash'


interface BodyProps {
    initialMessages: FullMessageType[]
}

export default function Body({ initialMessages }: BodyProps) {
    const [messages, SetMessages] = useState<Array<FullMessageType>>(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)
    const { conversationId } = useConversation()

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    useEffect(() => {
        pusherClient.subscribe(conversationId)
        bottomRef?.current?.scrollIntoView()


        function MessageHandler(message: FullMessageType) {
            axios.post(`/api/conversations/${conversationId}/seen`)

            SetMessages((current: Array<FullMessageType>) => {
                if (find(current, { id: message.id }))
                    return current;

                return [...current, message]
            });
            bottomRef?.current?.scrollIntoView()
        }

        function updateMessageHandler(newMessage: FullMessageType) {
            SetMessages((current: Array<FullMessageType>) => current.map((currentMessage) => {
                if (currentMessage.id === newMessage.id) {
                    return newMessage;
                }
                return currentMessage;
            }))

        }

        pusherClient.bind('messages:new', MessageHandler)
        pusherClient.bind('message:update', updateMessageHandler)

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', MessageHandler)
            pusherClient.unbind('messages:update', updateMessageHandler)
        }
    }, [conversationId])


    return (
        <div className='flex-1 overflow-y-auto'>
            {messages.map((message, index: number) => (
                <MessageBox
                    isLast={index === messages.length - 1}
                    key={index}
                    data={message}
                />
            ))}
            <div ref={bottomRef} className='pt-24' />
        </div>
    )
}
