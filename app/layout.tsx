import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/components/providers/auth-provider"
import { Navigation } from "@/components/layout/navigation"
import { BottomNav } from "@/components/layout/bottom-nav"

export const metadata: Metadata = {
  title: "OpenRide - Decentralized Ride Sharing",
  description: "Decentralized ride-sharing built for the Pi Network community",
  keywords: ["ride sharing", "pi network", "decentralized", "crypto", "transportation"],
  authors: [{ name: "OpenRide Team" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-openride-purple via-purple-800 to-openride-blue font-sans">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            <BottomNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
