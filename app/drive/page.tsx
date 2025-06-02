"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, User, TrendingUp } from "lucide-react"
import { MapPlaceholder } from "@/components/ui/map-placeholder"

const rideRequests = [
  {
    id: 1,
    rider: "Emma Wilson",
    pickup: "Downtown Plaza",
    destination: "Airport Terminal 2",
    distance: "12.5 km",
    fare: "25.8",
    time: "2 min ago",
  },
  {
    id: 2,
    rider: "David Park",
    pickup: "University Campus",
    destination: "Shopping Mall",
    distance: "8.2 km",
    fare: "18.5",
    time: "5 min ago",
  },
  {
    id: 3,
    rider: "Lisa Chen",
    pickup: "Business District",
    destination: "Residential Area",
    distance: "15.3 km",
    fare: "32.1",
    time: "7 min ago",
  },
]

export default function StartDrivePage() {
  const [isOnline, setIsOnline] = useState(false)
  const [acceptedRide, setAcceptedRide] = useState<number | null>(null)

  const handleToggleOnline = () => {
    setIsOnline(!isOnline)
  }

  const handleAcceptRide = (rideId: number) => {
    setAcceptedRide(rideId)
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Driver Status Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🚗</span>
                  Driver Dashboard
                </div>
                <Badge
                  className={`${isOnline ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}
                >
                  {isOnline ? "Online" : "Offline"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pi-yellow">π 156.8</div>
                  <p className="text-white/60 text-sm">Today's Earnings</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">12</div>
                  <p className="text-white/60 text-sm">Rides Completed</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.9</div>
                  <p className="text-white/60 text-sm">Rating</p>
                </div>
              </div>

              <Button
                onClick={handleToggleOnline}
                className={`w-full h-12 text-lg font-semibold transition-all duration-300 ${
                  isOnline
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gradient-to-r from-pi-yellow to-pi-orange hover:from-pi-orange hover:to-pi-yellow text-black"
                }`}
              >
                {isOnline ? "Go Offline" : "Go Online"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="glass border-white/20 overflow-hidden">
            <div className="h-64 relative">
              <MapPlaceholder showDrivers={true} driverMode={true} isOnline={isOnline} />
            </div>
          </Card>
        </motion.div>

        {/* Ride Requests */}
        {isOnline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="text-2xl mr-3">📋</span>
                  Ride Requests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {rideRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    <Card
                      className={`glass-dark border-white/10 transition-all duration-300 ${
                        acceptedRide === request.id
                          ? "border-green-500/50 bg-green-500/10"
                          : "hover:border-pi-yellow/50"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="text-white font-semibold">{request.rider}</h4>
                                <p className="text-white/60 text-sm">{request.time}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-pi-yellow font-bold text-lg">
                                <span className="text-sm mr-1">π</span>
                                {request.fare}
                              </div>
                              <p className="text-white/60 text-sm">{request.distance}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-green-400" />
                              <span className="text-white text-sm">{request.pickup}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Navigation className="w-4 h-4 text-red-400" />
                              <span className="text-white text-sm">{request.destination}</span>
                            </div>
                          </div>

                          {acceptedRide === request.id ? (
                            <Badge className="w-full justify-center bg-green-500/20 text-green-400 border-green-500/30">
                              Ride Accepted - Navigate to Pickup
                            </Badge>
                          ) : (
                            <Button
                              onClick={() => handleAcceptRide(request.id)}
                              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                            >
                              Accept Ride
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Earnings Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-pi-yellow" />
                Weekly Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 glass-dark rounded-lg">
                  <div className="text-xl font-bold text-pi-yellow">π 892.5</div>
                  <p className="text-white/60 text-sm">Total Earned</p>
                </div>
                <div className="text-center p-4 glass-dark rounded-lg">
                  <div className="text-xl font-bold text-white">47</div>
                  <p className="text-white/60 text-sm">Rides Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
