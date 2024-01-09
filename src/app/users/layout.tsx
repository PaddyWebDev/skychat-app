import GetUsers from '@/Actions/GetUsers'
import Sidebar from '@/components/Auth/Sidebar/Sidebar'
import React from 'react'
import UserList from './components/UserList'

interface UserLayoutProps {
    children: React.ReactNode
}


export default async function UserLayout({ children }: UserLayoutProps) {
    const users = await GetUsers();
    return (
        <Sidebar>
            <div className="h-full  flex items-center justify-start " >
                <UserList items={users} />
                {children}
            </div>
        </Sidebar>
    )
}
