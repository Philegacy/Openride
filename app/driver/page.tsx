"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { ProtectedRoute } from "@/components/protected-route"
import { RideCard } from "@/components/ride-card"
import { RideStatusBanner } from "@/components/ride-status-banner"
import { MapView } from "@/components/map-view"
import { apiClient } from "@/lib/api"
import type { Ride } from "@/lib/api"

function DriverDashboard() {
  const { user } = useAuth()
  const [availableRides, setAvailableRides] = useState<Ride[]>([])
  const [myRides, setMyRides] = useState<Ride[]>([])
  const [showRideHistory, setShowRideHistory] = useState(false)

  const activeRide = myRides.find((ride) => ["accepted", "in_progress"].includes(ride.status))
  const completedRides = myRides.filter((ride) => ["completed"].includes(ride.status))

  useEffect(() => {
    if (user) {
      fetchAvailableRides()
      fetchMyRides()
      // Poll for updates every 5 seconds
      const interval = setInterval(() => {
        fetchAvailableRides()
        fetchRideUpdates()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [user])

  const fetchAvailableRides = async () => {
    try {
      const response = await apiClient.getAvailableRides()
      setAvailableRides(response.rides)
    } catch (error) {
      console.error("Failed to fetch available rides:", error)
    }
  }

  const fetchMyRides = async () => {
    if (!user) return
    try {
      const response = await apiClient.getMyRides(user.id, "driver")
      setMyRides(response.rides)
    } catch (error) {
      console.error("Failed to fetch my rides:", error)
    }
  }

  const fetchRideUpdates = async () => {
    if (!user) return
    try {
      const response = await apiClient.getRideUpdates(user.id, "driver")
      setMyRides((prev) => {
        const updated = [...prev]
        response.rides.forEach((updatedRide: Ride) => {
          const index = updated.findIndex((r) => r.id === updatedRide.id)
          if (index !== -1) {
            updated[index] = updatedRide
          } else if (updatedRide.driver_id === user.id) {
            updated.unshift(updatedRide)
          }
        })
        return updated
      })
    } catch (error) {
      console.error("Failed to fetch ride updates:", error)
    }
  }

  const handleAcceptRide = async (rideId: string) => {
    if (!user) return
    try {
      await apiClient.acceptRide({ ride_id: rideId, driver_id: user.id })
      fetchAvailableRides()
      fetchMyRides()
    } catch (error) {
      console.error("Failed to accept ride:", error)
    }
  }

  const handleUpdateRideStatus = async (rideId: string) => {
    const ride = myRides.find((r) => r.id === rideId)
    if (!ride) return

    let newStatus = "completed"
    if (ride.status === "accepted") {
      newStatus = "in_progress"
    }

    try {
      await apiClient.updateRideStatus({ ride_id: rideId, status: newStatus })
      fetchMyRides()
    } catch (error) {
      console.error("Failed to update ride status:", error)
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
            height: activeRide ? 400 : 200,
          }}
          transition={{ duration: 0.5 }}
          className="w-full rounded-xl overflow-hidden mb-6"
        >
          <MapView
            pickup={activeRide?.pickup}
            destination={activeRide?.destination}
            driverLocation={activeRide ? { lat: 0, lng: 0 } : undefined}
            isActive={activeRide?.status === "in_progress"}
          />
        </motion.div>

        {/* Active Ride Banner */}
        {activeRide && <RideStatusBanner ride={activeRide} userRole="driver" />}

        {/* Driver Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-xl flex justify-between items-center">
                <span>Driver Dashboard</span>
                <div className="flex items-center space-x-2 text-yellow-400">
                  <span className="text-lg">π</span>
                  <span className="font-mono">{user?.piBalance}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">Status</p>
                  <p className={`text-lg ${activeRide ? "text-green-400" : "text-yellow-400"}`}>
                    {activeRide ? "On a trip" : "Available"}
                  </p>
                </div>
                <div className="text-white/70 text-sm text-right">
                  <p>Today's earnings</p>
                  <p className="text-yellow-400 font-mono">π {(Math.random() * 100).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Available Rides */}
        {!activeRide && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <h3 className="text-lg font-medium text-white mb-3">Available Rides</h3>
            <div className="space-y-3">
              {availableRides.length === 0 ? (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6 text-center text-white/70">
                    No ride requests available at the moment.
                  </CardContent>
                </Card>
              ) : (
                availableRides.map((ride) => (
                  <RideCard key={ride.id} ride={ride} userRole="driver" onAccept={handleAcceptRide} />
                ))
              )}
            </div>
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
              <h3 className="text-lg font-medium text-white">Completed Trips</h3>
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
                  <RideCard key={ride.id} ride={ride} userRole="driver" />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function DriverPage() {
  return (
    <ProtectedRoute>
      <DriverDashboard />
    </ProtectedRoute>
  )
}
