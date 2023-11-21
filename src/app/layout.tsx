import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'R3F GLTF Loader',
  description: 'Load and display GLTF files, includes XR support with https.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        width: "100vw",
        height: "100vh"
        }}>
          {children}
        </body>
    </html>
  )
}
