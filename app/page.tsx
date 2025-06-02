"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function WelcomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-pi-yellow blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-blue-400 blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 rounded-full bg-purple-400 blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: -50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1.2, type: "spring" }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className="relative"
              >
                <Image
                  src="/images/openride-logo.png"
                  alt="OpenRide Logo"
                  width={400}
                  height={150}
                  className="h-32 w-auto object-contain drop-shadow-2xl"
                  priority
                />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />

                {/* Floating particles around the logo */}
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -left-4 w-2 h-2 bg-pi-yellow rounded-full"
                />
                <motion.div
                  animate={{
                    y: [10, -10, 10],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-4 -right-4 w-3 h-3 bg-orange-400 rounded-full"
                />
              </motion.div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-pi-yellow to-pi-orange bg-clip-text text-transparent">
                OpenRide
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-3xl mx-auto leading-relaxed">
              Decentralized ride-sharing built for the <span className="text-pi-yellow font-semibold">Pi Network</span>{" "}
              community
            </p>

            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Connect, ride, and earn Pi coins in the world's first truly decentralized transportation network
            </p>
          </motion.div>

          {/* CTA Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16"
          >
            {/* Start Ride Card */}
            <Link href="/ride">
              <Card className="group glass hover:glass-dark transition-all duration-300 p-8 cursor-pointer glow-hover border-white/20 hover:border-pi-yellow/50">
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🚶</div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-pi-yellow transition-colors">
                    Start Ride
                  </h3>
                  <p className="text-white/70 text-lg">Find a ride to your destination</p>
                  <div className="flex items-center justify-center text-pi-yellow opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="mr-2">Get started</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </Link>

            {/* Start Drive Card */}
            <Link href="/drive">
              <Card className="group glass hover:glass-dark transition-all duration-300 p-8 cursor-pointer glow-hover border-white/20 hover:border-pi-yellow/50">
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">🚗</div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-pi-yellow transition-colors">
                    Start Drive
                  </h3>
                  <p className="text-white/70 text-lg">Earn Pi by giving rides</p>
                  <div className="flex items-center justify-center text-pi-yellow opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="mr-2">Start earning</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-pi-yellow/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="text-white font-semibold">Secure & Decentralized</h4>
              <p className="text-white/60 text-sm">Built on Pi Network's secure blockchain infrastructure</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-pi-yellow/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-white font-semibold">Instant Payments</h4>
              <p className="text-white/60 text-sm">Pay and earn Pi coins instantly with zero fees</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-pi-yellow/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🌍</span>
              </div>
              <h4 className="text-white font-semibold">Global Community</h4>
              <p className="text-white/60 text-sm">Connect with Pi Network users worldwide</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
