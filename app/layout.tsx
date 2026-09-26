import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { IBM_Plex_Mono, Inter } from 'next/font/google'
import { Header } from '@/components/header'
import './globals.css'

const inter = Inter({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-inter',
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
})

export const metadata: Metadata = {
  title: 'Reza Nur - Product Manager',
  description:
    'Product Manager specializing in fintech infrastructure, payments, and compliance. Building reliable, compliant systems at scale.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Reza Nur - Product Manager',
    description:
      'Product Manager specializing in fintech infrastructure, payments, and compliance. Building reliable, compliant systems at scale.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Reza Nur - Product Manager',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reza Nur - Product Manager',
    description:
      'Product Manager specializing in fintech infrastructure, payments, and compliance. Building reliable, compliant systems at scale.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} mx-auto max-w-2xl px-6 py-12 antialiased md:py-20`}
      >
        <Header />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
