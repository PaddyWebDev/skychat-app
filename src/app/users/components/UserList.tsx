"use client"
import { User } from '@prisma/client'
import React from 'react'
import UserBox from './UserBox'

interface UserListProps {
    items: User[]
}


export default function UserList({ items }: UserListProps) {
    return (
        <aside className='dark:bg-neutral-800 bg-neutral-100 md:w-[25rem] w-[100vw]   h-full'>
            <div className='   px-5 mb-1' >
                <div className="flex-col">
                    <div className="text-2xl font-bold  dark:text-neutral-50  text-neutral-800 py-3">
                        Peoples
                    </div>
                </div>

                {items.map((item, index: number) => (
                    <UserBox key={index} data={item} />
                ))}

            </div>
        </aside>
    )
}

