import { User } from '@prisma/client'
import Image from 'next/image';
import React from 'react'

interface AvatarGroupProps {
    users?: User[]
}

export default function AvatarGroup({ users = [] }: AvatarGroupProps) {
    const SlicedUsers = users?.slice(0, 3);
    const PositionMap = {
        0: 'top-0 left-[12px]',
        1: 'bottom-0',
        2: 'bottom-0 right-0'
    }
    return (
        <div className='relative h-11 w-11'>
            {SlicedUsers.map((user, index) => (
                <div key={index} className={`absolute inline-block rounded-full h-[21px] w-[21px] ${PositionMap[index as keyof typeof PositionMap]} `} >
                    <Image alt='Avatar' className=' rounded-full' fill src={user?.image || '/Images/NoProfilePic.png'} />
                </div>
            ))}
        </div>
    )
}
