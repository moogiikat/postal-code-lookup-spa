import type { Metadata } from "next"
import "./globals.css"
import "@/app/scss/home.scss"

export const metadata: Metadata = {
  title: "Postal Code Search",
  description: "Search Postal Code",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="main">{children}</body>
    </html>
  )
}
