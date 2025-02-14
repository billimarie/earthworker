import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gamified Social Media App",
  description: "Earn badges, complete tasks, and collaborate with others!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'