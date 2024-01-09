import React from 'react'

const EmptyState: React.FC = () => {
    return (
        <div className='px-4 lg: hidden py-10 sm:px-6 lg:px-8 h-full lg:flex justify-center items-center dark:bg-neutral-900 bg-neutral-100 '>
            <div className='text-center flex items-center flex-col'>
                <h3 className='text-2xl font-medium'>Start a new Conversation</h3>
            </div>
        </div>
    )
}

export default EmptyState