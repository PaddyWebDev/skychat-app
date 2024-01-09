import Link from 'next/link'
import React from 'react'
interface MobileItemProps {
    label: string
    href: string
    icon: any
    onClick?: () => void
    active?: boolean
}

const MobileItem: React.FC<MobileItemProps> = ({ label, icon: Icon, href, active, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }
    // return <Link onClick={handleClick} className={`dark:text-white dark:bg-stone-950 bg-slate-200 group flex gap-x-3 rounded-md p-3 text-md leading-6 ${active && 'bg-gray-800'} `} href={href} > <Icon />  </Link>
    return <Link onClick={handleClick} className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${active && 'bg-gray-800' }`} href={href} > <Icon />  </Link>
}

export default MobileItem