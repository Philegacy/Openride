"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Shield, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const router = useRouter()

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate Pi Network connection
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConnecting(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pi-yellow blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-blue-400 blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="glass border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: -30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1, type: "spring" }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <Image
                    src="/images/openride-logo.png"
                    alt="OpenRide Logo"
                    width={200}
                    height={80}
                    className="h-16 w-auto object-contain drop-shadow-2xl"
                    priority
                  />
                  <div className="absolute inset-0 bg-pi-yellow/10 rounded-lg blur-xl animate-pulse"></div>
                </div>
              </motion.div>

              <CardTitle className="text-3xl font-bold text-white mb-2">Join OpenRide</CardTitle>
              <p className="text-white/70">Connect your Pi Network wallet to get started</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <Button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pi-yellow to-pi-orange hover:from-pi-orange hover:to-pi-yellow text-black transition-all duration-300 glow-hover"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-3" />
                    Connect Pi Wallet
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center space-x-2 text-white/60 text-sm">
                <Shield className="w-4 h-4" />
                <span>Secure authentication through Pi Network</span>
              </div>

              <div className="text-center space-y-2">
                <p className="text-white/50 text-xs">
                  By connecting, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="space-y-1">
            <div className="text-2xl">🔐</div>
            <p className="text-white/60 text-xs">Encrypted</p>
          </div>
          <div className="space-y-1">
            <div className="text-2xl">⚡</div>
            <p className="text-white/60 text-xs">Instant</p>
          </div>
          <div className="space-y-1">
            <div className="text-2xl">🌐</div>
            <p className="text-white/60 text-xs">Decentralized</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
