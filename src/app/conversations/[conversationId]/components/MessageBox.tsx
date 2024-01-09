"use client"
import { FullMessageType } from '@/Types'
import Avatar from '@/components/Auth/User/Avatar';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react'
import ImageModal from './ImageModal';

interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean
}
export default function MessageBox({ data, isLast }: MessageBoxProps) {

    const [ImageModalState, SetImageModalState] = useState<boolean>(false)
    const session = useSession();
    const isOwn = session?.data?.user?.email === data?.sender?.email

    const seenList = (data.seenBy || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(', ');
    const ContainerClass = clsx(
        'flex gap-3 p-4',
        isOwn && ' justify-end '
    )

    const AvatarClass = clsx(
        isOwn && 'order-2'
    )

    const BodyClass = clsx(
        'flex flex-col gap-2',
        isOwn && 'items-end'
    )

    const MessageClass = clsx(
        'text-sm overflow-hidden w-fit',
        isOwn ? `bg-sky-500 dark:text-neutral-50 text-neutral-950` : `bg-gray-100 dark:bg-gray-500`,
        data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
    )

    return (
        <>
            <div className={ContainerClass}>
                <div className={AvatarClass}>
                    <Avatar currentUser={data.sender} />
                </div>
                <div className={BodyClass}>
                    <div className="flex items-center gap-1 ">
                        <div className='text-sm text-gray-900 dark:text-gray-50'>
                            {data.sender.name}
                        </div>
                        <div className='text-xs text-gray-400 dark:text-gray-500'>
                            {format(new Date(data.createdAt), 'p')}
                        </div>
                    </div>
                    <div className={MessageClass}>
                        <ImageModal src={data.image} OpenModal={ImageModalState} CloseModal={() => SetImageModalState(false)} />
                        {
                            data.image ? (
                                <Image
                                    onClick={() => SetImageModalState(true)}
                                    alt='Image'
                                    height={288}
                                    width={288}
                                    src={data.image}
                                    className='object-cover cursor-pointer hover:scale-110 transition translate'
                                />
                            ) : (
                                <div>
                                    {data.body}
                                </div>
                            )
                        }
                    </div>
                    {
                        isLast && isOwn && seenList.length > 0 && (
                            <div className='text-xs font-light text-gray-500 '>
                                {`Seen by ${seenList}`}
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
