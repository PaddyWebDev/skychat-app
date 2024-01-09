"use client"
import Avatar from '@/components/Auth/User/Avatar'
import LoadingModal from '@/components/LoadingModal'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'

interface UserBoxProps {
    data: User
}
const UserBox = ({ data }: UserBoxProps) => {
    const router = useRouter()
    const [isLoading, SetLoading] = useState<boolean>(false)

    const handleClick = useCallback(
        () => {
            SetLoading(true);
            axios.post('/api/conversations', {
                userId: data.id
            })
                .then((data) => {
                    router.push(`/conversations/${data.data.id}`)
                }).finally(() => SetLoading(false));
        },
        [data, router],
    )
    return (
        <>
            {isLoading && (
                <LoadingModal />
            )}
            <div onClick={handleClick} className=' py-3 mb-4 px-4 w-full relative flex items-center space-x-3 dark:bg-neutral-950 dark:hover:bg-neutral-900 rounded-lg cursor-pointer transition bg-white hover:bg-neutral-100'>
                <Avatar currentUser={data} />
                <div className='min-w-0 flex-1'>
                    <div className='focus:outline-none'>
                        <div className="flex justify-between items-center mb-1">
                            <p className='text-sm font-medium dark:text-slate-100 text-gray-900'>
                                {data.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserBox