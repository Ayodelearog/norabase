import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cryptocurrency Prices',
  description: 'Live cryptocurrency prices from CoinLore',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='w-full h-screen'>

        {children}
        </div>
        </body>
    </html>
  )
}