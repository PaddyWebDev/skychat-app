import useActiveList from '@/hooks/useActiveList'
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'


interface AvatarProps {
    currentUser: User | null
}

const Avatar: React.FC<AvatarProps> = ({ currentUser }) => {
    const { members } = useActiveList()
    const isActive = members.indexOf(currentUser?.email!) !== -1;
    return (
        <section className=' rounded-full w-[2.5rem] flex items-center justify-center mx-auto'>
            <div className='relative '>
                <Image className=' rounded-full  object-contain' draggable='false' onContextMenu={(event: React.MouseEvent) => event.preventDefault()} src={currentUser?.image || "/Images/NoProfilePic.png"} width={320} height={320} alt='Profile_Picture' />
                {isActive && (
                    <span className='absolute w-2 h-2 block top-0 right-1 ring-2 ring-slate-200 rounded-full bg-green-500 ' />
                )}
            </div>
        </section>
    )
}

export default Avatar