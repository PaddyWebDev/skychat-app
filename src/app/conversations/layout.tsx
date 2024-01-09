import Sidebar from '@/components/Auth/Sidebar/Sidebar'
import React from 'react'
import ConversationList from './components/ConversationList'
import getConversations from '@/Actions/getConversations'
import GetUsers from '@/Actions/GetUsers';


export default async function ConversationLayout({ children }: { children: React.ReactNode }) {
    const conversations = await getConversations();
    const users = await GetUsers();
    return (
        <Sidebar>
            <div className='h-full'>
                <ConversationList
                    users={users}
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}
