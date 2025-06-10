import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buy Back Time - AI Time Management System',
  description: 'AI-powered implementation of Dan Martell\'s Buy Back Your Time methodology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  )
} 