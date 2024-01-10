import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/context/ToastProvider'
import AuthContext from '@/context/AuthContext'
import ActiveStatus from '@/components/Auth/ActiveStatus'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import ErrorHandler from './error'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SkyChat',
  description: 'Created By Padmanabh Malwade',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthContext>
        <body className={`${inter.className} select-none`}>
          <ToastProvider>
            <ActiveStatus />
            {children}
          </ToastProvider>
        </body>
      </AuthContext>
    </html>
  )
}
