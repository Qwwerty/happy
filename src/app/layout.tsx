import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Providers } from './providers'

import 'leaflet/dist/leaflet.css'
import './globals.css'

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
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
