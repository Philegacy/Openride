"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation, Car } from "lucide-react"

interface MapPlaceholderProps {
  pickup?: string
  destination?: string
  showDrivers?: boolean
  driverMode?: boolean
  isOnline?: boolean
  rideInProgress?: boolean
  status?: string
}

export function MapPlaceholder({
  pickup,
  destination,
  showDrivers = false,
  driverMode = false,
  isOnline = false,
  rideInProgress = false,
  status = "waiting",
}: MapPlaceholderProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-white/10" />
          ))}
        </div>
      </div>

      {/* Street Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="streets" patternUnits="userSpaceOnUse" width="100" height="100">
            <path d="M 0 50 L 100 50" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <path d="M 50 0 L 50 100" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#streets)" />
      </svg>

      {/* Pickup Location */}
      {pickup && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-green-400/30 rounded-full animate-ping" />
            <div className="relative bg-green-500 rounded-full p-2">
              <MapPin className="w-4 h-4 text-white" />
            </div>
          </div>
          {pickup && (
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {pickup}
            </div>
          )}
        </motion.div>
      )}

      {/* Destination Location */}
      {destination && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute bottom-1/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-red-400/30 rounded-full animate-ping" />
            <div className="relative bg-red-500 rounded-full p-2">
              <Navigation className="w-4 h-4 text-white" />
            </div>
          </div>
          {destination && (
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {destination}
            </div>
          )}
        </motion.div>
      )}

      {/* Route Line */}
      {pickup && destination && (
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            d="M 33% 25% Q 50% 50% 66% 75%"
            stroke="#F6C343"
            strokeWidth="3"
            strokeDasharray="10,5"
            fill="none"
            className="drop-shadow-lg"
          />
        </svg>
      )}

      {/* Driver Cars */}
      {showDrivers && (
        <>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-400/30 rounded-full animate-pulse" />
              <div className="relative bg-blue-500 rounded-full p-2">
                <Car className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="absolute top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-purple-400/30 rounded-full animate-pulse" />
              <div className="relative bg-purple-500 rounded-full p-2">
                <Car className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>

          {rideInProgress && (
            <motion.div
              initial={{ top: "25%", left: "33%" }}
              animate={{
                top: status === "in-progress" ? "75%" : "50%",
                left: status === "in-progress" ? "66%" : "50%",
              }}
              transition={{
                duration: 3,
                repeat: status === "in-progress" ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse",
              }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-pi-yellow/30 rounded-full animate-pulse" />
                <div className="relative bg-pi-yellow rounded-full p-2">
                  <Car className="w-4 h-4 text-black" />
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* Driver Mode Indicator */}
      {driverMode && (
        <div className="absolute top-4 left-4">
          <div
            className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              isOnline ? "bg-green-500/20 border border-green-500/30" : "bg-gray-500/20 border border-gray-500/30"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-gray-400"} animate-pulse`} />
            <span className={`text-xs font-medium ${isOnline ? "text-green-400" : "text-gray-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="absolute bottom-4 right-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 bg-pi-yellow rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="text-black text-lg">📍</span>
        </motion.button>
      </div>
    </div>
  )
}
