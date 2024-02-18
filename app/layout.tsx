import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'BookByte',
  description: 'BookByte - The only one platform to buy and sell your ebooks.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} max-w-screen-xl mx-auto`}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
