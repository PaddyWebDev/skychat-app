import React from 'react'
import DSidebar from './Desktop/DSidebar'
import Footer from './Mobile/MobileFooter'
import getCurrentUser from '@/Actions/GetCurrentUser'



interface SidebarProps {
    children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = async ({ children }) => {
    const currentUser = await getCurrentUser();
    return (
        <main className='relative flex justify-start h-full ' >
            <DSidebar currentUser={currentUser} />
            <Footer currentUser={currentUser} />
            <section className=' w-full lg:pl-[4vw]'>
                {children}
            </section>

        </main>
    )
}

export default Sidebar