import "./globals.css";
import { Inter as FontSans, Roboto_Mono as FontMono, Poppins as FontHeading } from 'next/font/google'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})
  
const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const fontHeading = FontHeading({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: '600',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable} ${fontHeading.variable}`}>
      <body>{children}</body>
    </html>
  )
}