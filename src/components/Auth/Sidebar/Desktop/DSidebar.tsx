"use client"
import React, { useState } from 'react';
import useRoutes from '@/hooks/useRoutes';
import DItem from './DItem';

import { User } from '@prisma/client';
import Avatar from '../../User/Avatar';
import SettingsModal from './SettingsModal';

interface DSidebarProps {
    currentUser: User | null;
}

export default function DSidebar({ currentUser }: DSidebarProps) {

    const routes = useRoutes();
    const [isOpen, SetisOpen] = useState<boolean>(false)

    return (
        <>
            <SettingsModal
                currentUser={currentUser}
                OpenModal={isOpen}
                CloseModal={() => SetisOpen(!isOpen)}
            />
            <nav className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-[5rem]  dark:bg-slate-800 bg-slate-100 lg:overflow-auto lg:pb-4 lg:flex flex-col justify-between dark:border border-slate-800'>
                <div className='mt-4 flex flex-col justify-between'>
                    <ul className='flex flex-col items-start space-y-2 mt-[10vh]' role='list'>
                        {routes &&
                            routes.map((item: any, index: number) => (
                                <DItem
                                    key={index}
                                    href={item.href}
                                    label={item.label}
                                    icon={item.icon}
                                    active={item.active}
                                    onClick={item.onClick}
                                />
                            ))}
                    </ul>
                </div>
                <div className='cursor-pointer hover:opacity-75 transition' onClick={() => SetisOpen(!isOpen)}>
                    <Avatar currentUser={currentUser} />
                </div>
            </nav>
        </>
    );
};

