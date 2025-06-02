"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, Wallet } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { motion } from "framer-motion"
import Image from "next/image"

export function Navigation() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative">
              <Image
                src="/images/openride-logo.png"
                alt="OpenRide Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain drop-shadow-lg"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <Link href="/ride">
                  <Button
                    variant="ghost"
                    className={`text-white hover:text-pi-yellow hover:bg-white/10 ${
                      isActive("/ride") ? "text-pi-yellow bg-white/10" : ""
                    }`}
                  >
                    🚶 Ride
                  </Button>
                </Link>
                <Link href="/drive">
                  <Button
                    variant="ghost"
                    className={`text-white hover:text-pi-yellow hover:bg-white/10 ${
                      isActive("/drive") ? "text-pi-yellow bg-white/10" : ""
                    }`}
                  >
                    🚗 Drive
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className={`text-white hover:text-pi-yellow hover:bg-white/10 ${
                      isActive("/dashboard") ? "text-pi-yellow bg-white/10" : ""
                    }`}
                  >
                    📊 Dashboard
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Pi Wallet Balance */}
                <div className="flex items-center space-x-2 bg-gradient-to-r from-pi-yellow/20 to-pi-orange/20 backdrop-blur-sm border border-pi-yellow/30 rounded-full px-4 py-2 hover:from-pi-yellow/30 hover:to-pi-orange/30 transition-all duration-200 cursor-pointer">
                  <span className="text-lg text-pi-yellow">π</span>
                  <span className="font-mono font-semibold text-white">{user?.balance || 0}</span>
                </div>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 border-2 border-pi-yellow/50">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 glass border-white/20" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-white/70">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="text-white hover:bg-white/10">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-white/10">
                      <Wallet className="mr-2 h-4 w-4" />
                      Pi Wallet
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-white/10">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="text-red-400 hover:bg-red-500/10" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/login">
                <Button className="bg-gradient-to-r from-pi-yellow to-pi-orange hover:from-pi-orange hover:to-pi-yellow text-black font-semibold">
                  Connect Wallet
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
