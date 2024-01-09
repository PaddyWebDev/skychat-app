import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface ToastProviderProps {
    children: ReactNode
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    return (
        <div>
            <Toaster position="top-center"
                reverseOrder={false} />
            {children}
        </div>
    )
}

export default ToastProvider