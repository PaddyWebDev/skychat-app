"use client"
import useConversation from '@/hooks/useConversation';
import useRoutes from '@/hooks/useRoutes'
import React from 'react'
import MobileItem from './MobileItem';
import Avatar from '../../User/Avatar';
import { User } from '@prisma/client';

interface FooterProps {
    currentUser: User | null
}


const Footer: React.FC<FooterProps> = ({ currentUser }) => {
    const routes = useRoutes();

    const { isOpen } = useConversation();
    if (isOpen) {
        return null;
    }

    return (
        <footer className=" lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                {routes &&
                    routes.map((item: any, index: number) => (
                        <MobileItem
                            key={index}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            active={item.active}
                            onClick={item.onClick}
                        />
                    ))
                }
                <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <Avatar currentUser={currentUser} />
                </button>
            </div>
        </footer>
    )
}

export default Footer