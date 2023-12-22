import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Providers } from './providers'

import 'react-toastify/dist/ReactToastify.css'
import 'leaflet/dist/leaflet.css'
import './globals.css'
import { ToastContainer } from 'react-toastify'

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: 'Happy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={nunito.className} lang="pt-BR">
      <body className="antialiased scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-900">
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
