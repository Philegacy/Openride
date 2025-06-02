"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, Home, Car, User, Menu } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  if (!user) {
    return (
      <nav className="bg-transparent">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            OpenRide
          </Link>
          <Link href="/login">
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">Login</Button>
          </Link>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white">
            OpenRide
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-1">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className={
                    isActive("/") ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/rider">
                <Button
                  variant="ghost"
                  size="sm"
                  className={
                    isActive("/rider") ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                >
                  <User className="w-4 h-4 mr-2" />
                  Rider
                </Button>
              </Link>
              <Link href="/driver">
                <Button
                  variant="ghost"
                  size="sm"
                  className={
                    isActive("/driver") ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                >
                  <Car className="w-4 h-4 mr-2" />
                  Driver
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-yellow-400">
                <span className="text-lg">π</span>
                <span className="font-mono text-sm hidden sm:inline">{user.piBalance}</span>
              </div>

              <Avatar className="w-8 h-8 border border-white/20">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="bg-purple-600 text-white text-sm">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <Button
                onClick={() => setMenuOpen(!menuOpen)}
                variant="ghost"
                size="icon"
                className="md:hidden text-white/80 hover:text-white hover:bg-white/10"
              >
                <Menu className="w-5 h-5" />
              </Button>

              <Button
                onClick={logout}
                variant="ghost"
                size="icon"
                className="hidden md:flex text-white/80 hover:text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-0 top-14 z-50 bg-gradient-to-b from-purple-900/95 to-blue-900/95 backdrop-blur-md border-b border-white/10"
          >
            <div className="p-4 space-y-3">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive("/") ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/rider" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive("/rider") ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Rider
                </Button>
              </Link>
              <Link href="/driver" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive("/driver") ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Car className="w-4 h-4 mr-2" />
                  Driver
                </Button>
              </Link>
              <Button
                onClick={() => {
                  logout()
                  setMenuOpen(false)
                }}
                variant="ghost"
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
