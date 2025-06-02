"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Navigation, Clock, X, ChevronDown, ChevronUp } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { ProtectedRoute } from "@/components/protected-route"
import { RideCard } from "@/components/ride-card"
import { RideStatusBanner } from "@/components/ride-status-banner"
import { MapView } from "@/components/map-view"
import { apiClient } from "@/lib/api"
import type { Ride } from "@/lib/api"

function RiderDashboard() {
  const { user } = useAuth()
  const [rides, setRides] = useState<Ride[]>([])
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showRideHistory, setShowRideHistory] = useState(false)
  const [step, setStep] = useState<"location" | "confirmation" | "waiting" | "active">("location")

  const activeRide = rides.find((ride) => ["pending", "accepted", "in_progress"].includes(ride.status))
  const completedRides = rides.filter((ride) => ["completed", "cancelled"].includes(ride.status))

  useEffect(() => {
    if (user) {
      fetchMyRides()
      // Poll for updates every 5 seconds
      const interval = setInterval(fetchRideUpdates, 5000)
      return () => clearInterval(interval)
    }
  }, [user])

  useEffect(() => {
    if (activeRide) {
      if (activeRide.status === "pending") {
        setStep("waiting")
      } else {
        setStep("active")
      }
    } else {
      setStep("location")
    }
  }, [activeRide])

  const fetchMyRides = async () => {
    if (!user) return
    try {
      const response = await apiClient.getMyRides(user.id, "rider")
      setRides(response.rides)
    } catch (error) {
      console.error("Failed to fetch rides:", error)
    }
  }

  const fetchRideUpdates = async () => {
    if (!user) return
    try {
      const response = await apiClient.getRideUpdates(user.id, "rider")
      // Update only active rides to avoid overwriting the full list
      setRides((prev) => {
        const updated = [...prev]
        response.rides.forEach((updatedRide: Ride) => {
          const index = updated.findIndex((r) => r.id === updatedRide.id)
          if (index !== -1) {
            updated[index] = updatedRide
          } else {
            updated.unshift(updatedRide)
          }
        })
        return updated
      })
    } catch (error) {
      console.error("Failed to fetch ride updates:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === "location") {
      setStep("confirmation")
      return
    }

    if (!pickup || !destination || !user) return

    setIsLoading(true)
    try {
      const response = await apiClient.requestRide({
        rider_id: user.id,
        pickup,
        destination,
      })

      if (response.success) {
        setStep("waiting")
        fetchMyRides()
      }
    } catch (error) {
      console.error("Failed to request ride:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelRide = async (rideId: string) => {
    if (!user) return
    try {
      await apiClient.cancelRide({ ride_id: rideId, user_id: user.id })
      fetchMyRides()
      setStep("location")
    } catch (error) {
      console.error("Failed to cancel ride:", error)
    }
  }

  const handleBack = () => {
    if (step === "confirmation") {
      setStep("location")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-blue-700">
      <div className="container mx-auto px-4 py-6 max-w-lg">
        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: step === "location" ? 200 : step === "confirmation" ? 300 : 400,
          }}
          transition={{ duration: 0.5 }}
          className="w-full rounded-xl overflow-hidden mb-6"
        >
          <MapView
            pickup={pickup || undefined}
            destination={destination || undefined}
            driverLocation={
              activeRide?.status === "accepted" || activeRide?.status === "in_progress" ? { lat: 0, lng: 0 } : undefined
            }
            isActive={activeRide?.status === "in_progress"}
          />
        </motion.div>

        {/* Active Ride Banner */}
        {activeRide && <RideStatusBanner ride={activeRide} userRole="rider" />}

        {/* Location Input Form */}
        {step === "location" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-xl">Where to?</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-cyan-400" />
                      <Input
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder="Enter pickup location"
                        className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-cyan-400 focus:ring-cyan-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Navigation className="absolute left-3 top-3 w-5 h-5 text-pink-400" />
                      <Input
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Enter destination"
                        className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-pink-400 focus:ring-pink-400"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={!pickup || !destination}
                    className="w-full h-12 text-lg font-medium bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none"
                  >
                    Continue
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Ride Confirmation */}
        {step === "confirmation" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-xl">Confirm Ride</CardTitle>
                  <Button variant="ghost" size="icon" onClick={handleBack} className="text-white">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                      <span className="text-white">{pickup}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Navigation className="w-5 h-5 text-pink-400" />
                      <span className="text-white">{destination}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Estimated fare</p>
                      <p className="text-yellow-400 text-lg font-mono">π {(Math.random() * 20 + 10).toFixed(2)}</p>
                    </div>
                    <div className="text-white/70 text-sm">
                      <p>~10 min</p>
                      <p>3.2 km</p>
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full h-12 text-lg font-medium bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none"
                  >
                    {isLoading ? "Requesting..." : "Request Ride"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Waiting for Driver */}
        {step === "waiting" && activeRide && activeRide.status === "pending" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-yellow-400 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Finding your driver</h3>
                  <p className="text-white/70">We're connecting you with a nearby driver</p>

                  <Button
                    onClick={() => activeRide && handleCancelRide(activeRide.id)}
                    variant="outline"
                    className="mt-4 border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    Cancel Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Ride History */}
        {completedRides.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <div
              className="flex justify-between items-center mb-2 px-1 cursor-pointer"
              onClick={() => setShowRideHistory(!showRideHistory)}
            >
              <h3 className="text-lg font-medium text-white">Ride History</h3>
              <Button variant="ghost" size="icon" className="text-white">
                {showRideHistory ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </Button>
            </div>

            {showRideHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="space-y-3 overflow-hidden"
              >
                {completedRides.map((ride) => (
                  <RideCard key={ride.id} ride={ride} userRole="rider" />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function RiderPage() {
  return (
    <ProtectedRoute>
      <RiderDashboard />
    </ProtectedRoute>
  )
}
