"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Navigation } from "lucide-react"

interface MapViewProps {
  pickup?: string
  destination?: string
  driverLocation?: { lat: number; lng: number }
  isActive?: boolean
}

export function MapView({ pickup, destination, driverLocation, isActive = true }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden">
      {/* Map placeholder */}
      <div ref={mapRef} className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm">
        {/* Simulated map grid */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-white/5" />
          ))}
        </div>

        {/* Map content */}
        {mapLoaded && (
          <>
            {/* Pickup location */}
            {pickup && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  <div className="absolute -top-1 -left-1 w-8 h-8 bg-cyan-500/30 rounded-full animate-ping" />
                  <div className="relative z-10 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Destination location */}
            {destination && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  <div className="absolute -top-1 -left-1 w-8 h-8 bg-pink-500/30 rounded-full animate-ping" />
                  <div className="relative z-10 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <Navigation className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Driver location */}
            {driverLocation && (
              <motion.div
                initial={{ top: "33%", left: "25%" }}
                animate={{
                  top: isActive ? "50%" : "33%",
                  left: isActive ? "50%" : "25%",
                }}
                transition={{
                  duration: 5,
                  repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "reverse",
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  <div className="absolute -top-1 -left-1 w-8 h-8 bg-yellow-500/30 rounded-full animate-ping" />
                  <div className="relative z-10 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">🚗</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Route line */}
            {pickup && destination && (
              <svg className="absolute inset-0 w-full h-full z-0">
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  d="M 25% 33% Q 50% 50% 75% 66%"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                />
              </svg>
            )}
          </>
        )}
      </div>

      {/* Loading overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
