"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Car, User, Wallet } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { motion } from "framer-motion"

export function BottomNav() {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/ride", icon: User, label: "Ride" },
    { href: "/drive", icon: Car, label: "Drive" },
    { href: "/dashboard", icon: Wallet, label: "Wallet" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-40">
      <div className="glass border-t border-white/10 px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                    isActive ? "text-pi-yellow bg-pi-yellow/10" : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pi-yellow rounded-full"
                    />
                  )}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
