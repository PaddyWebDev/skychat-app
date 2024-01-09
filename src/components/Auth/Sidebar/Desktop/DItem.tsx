import Link from 'next/link'
import React from 'react'
interface ItemProps {
    label: string
    href: string
    icon: any
    onClick?: () => void
    active?: boolean

}

const DItem: React.FC<ItemProps> = ({ label, icon: Icon, href, active, onClick }) => {

    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }
    return <Link className={`dark:text-white dark:bg-stone-950 bg-slate-200 w-10 items-center justify-center mx-auto group flex gap-3 rounded-md px-2 py-2 text-sm leading-6 ${active && 'bg-gray-800'} `} onClick={handleClick} href={href} > <Icon /> </Link>
}

export default DItem