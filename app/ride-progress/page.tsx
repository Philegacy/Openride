"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Phone, MessageSquare, Star, Clock } from "lucide-react"
import { MapPlaceholder } from "@/components/ui/map-placeholder"

type RideStatus = "waiting" | "en-route" | "arrived" | "in-progress" | "completed"

const statusConfig = {
  waiting: {
    title: "Finding Driver",
    description: "We're connecting you with a nearby driver",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    icon: "⏳",
  },
  "en-route": {
    title: "Driver En Route",
    description: "Your driver is on the way to pick you up",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    icon: "🚗",
  },
  arrived: {
    title: "Driver Arrived",
    description: "Your driver has arrived at the pickup location",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    icon: "📍",
  },
  "in-progress": {
    title: "Trip in Progress",
    description: "Enjoy your ride to the destination",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: "🛣️",
  },
  completed: {
    title: "Trip Completed",
    description: "Thank you for riding with OpenRide!",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    icon: "✅",
  },
}

export default function RideProgressPage() {
  const [status, setStatus] = useState<RideStatus>("waiting")
  const [eta, setEta] = useState("5 min")

  // Simulate ride progress
  useEffect(() => {
    const progressSteps: RideStatus[] = ["waiting", "en-route", "arrived", "in-progress", "completed"]
    let currentStep = 0

    const interval = setInterval(() => {
      if (currentStep < progressSteps.length - 1) {
        currentStep++
        setStatus(progressSteps[currentStep])

        // Update ETA based on status
        switch (progressSteps[currentStep]) {
          case "en-route":
            setEta("3 min")
            break
          case "arrived":
            setEta("Now")
            break
          case "in-progress":
            setEta("12 min")
            break
          case "completed":
            setEta("Arrived")
            break
        }
      } else {
        clearInterval(interval)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentStatus = statusConfig[status]

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Map Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="glass border-white/20 overflow-hidden">
            <div className="h-80 relative">
              <MapPlaceholder
                pickup="Downtown Plaza"
                destination="Airport Terminal 2"
                showDrivers={true}
                rideInProgress={true}
                status={status}
              />
            </div>
          </Card>
        </motion.div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="glass border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{currentStatus.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{currentStatus.title}</h3>
                    <p className="text-white/70">{currentStatus.description}</p>
                  </div>
                </div>
                <Badge className={currentStatus.color}>{status.replace("-", " ").toUpperCase()}</Badge>
              </div>

              {status !== "completed" && (
                <div className="flex items-center space-x-2 text-white/80">
                  <Clock className="w-4 h-4" />
                  <span>ETA: {eta}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Driver Info */}
        {status !== "waiting" && status !== "completed" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="text-2xl mr-3">👨‍💼</span>
                  Your Driver
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl text-white">👨</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">Alex Chen</h4>
                      <p className="text-white/70">Toyota Camry • ABC-123</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white/80 text-sm">4.9 (127 rides)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Trip Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <span className="text-2xl mr-3">🗺️</span>
                Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Downtown Plaza</p>
                    <p className="text-white/60 text-sm">Pickup location</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Navigation className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-medium">Airport Terminal 2</p>
                    <p className="text-white/60 text-sm">Destination</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <p className="text-white/70 text-sm">Total Fare</p>
                  <div className="flex items-center text-pi-yellow font-bold text-xl">
                    <span className="text-lg mr-1">π</span>
                    25.80
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/70 text-sm">Distance</p>
                  <p className="text-white font-medium">12.5 km</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        {status === "completed" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="space-y-3"
          >
            <Button className="w-full h-12 bg-gradient-to-r from-pi-yellow to-pi-orange hover:from-pi-orange hover:to-pi-yellow text-black font-semibold">
              Rate Your Driver
            </Button>
            <Button variant="outline" className="w-full h-12 border-white/20 text-white hover:bg-white/10">
              Book Another Ride
            </Button>
          </motion.div>
        )}

        {status === "waiting" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button variant="outline" className="w-full h-12 border-red-500/50 text-red-400 hover:bg-red-500/10">
              Cancel Ride
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
