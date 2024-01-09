"use client";

import EmptyState from '@/components/Auth/EmptyState';
import useConversation from '@/hooks/useConversation'
import clsx from 'clsx';
import React from 'react'

const Home = () => {
    const { isOpen } = useConversation();
    return (
        <div className={clsx("lg:pl-80 h-screen lg:w-full    lg:block ",
            isOpen ? 'block' : 'hidden')}>
            <EmptyState />
        </div>
    )
}

export default Home