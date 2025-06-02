"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, Star, User, ArrowRight } from "lucide-react"
import { MapPlaceholder } from "@/components/ui/map-placeholder"

const nearbyDrivers = [
  {
    id: 1,
    name: "Alex Chen",
    rating: 4.9,
    eta: "3 min",
    distance: "0.5 km",
    vehicle: "Toyota Camry",
    price: "12.5",
  },
  {
    id: 2,
    name: "Sarah Kim",
    rating: 4.8,
    eta: "5 min",
    distance: "0.8 km",
    vehicle: "Honda Civic",
    price: "11.8",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 4.7,
    eta: "7 min",
    distance: "1.2 km",
    vehicle: "Nissan Altima",
    price: "13.2",
  },
]

export default function StartRidePage() {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [showDrivers, setShowDrivers] = useState(false)

  const handleRequestRide = () => {
    if (pickup && destination) {
      setShowDrivers(true)
    }
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Map Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="glass border-white/20 overflow-hidden">
            <div className="h-64 relative">
              <MapPlaceholder pickup={pickup} destination={destination} showDrivers={showDrivers} />
            </div>
          </Card>
        </motion.div>

        {/* Location Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <span className="text-2xl mr-3">📍</span>
                Where to?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-green-400" />
                <Input
                  placeholder="Enter pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pl-10 h-12 glass border-white/20 text-white placeholder-white/50 focus:border-pi-yellow"
                />
              </div>

              <div className="relative">
                <Navigation className="absolute left-3 top-3 w-5 h-5 text-red-400" />
                <Input
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 h-12 glass border-white/20 text-white placeholder-white/50 focus:border-pi-yellow"
                />
              </div>

              <Button
                onClick={handleRequestRide}
                disabled={!pickup || !destination}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-pi-yellow to-pi-orange hover:from-pi-orange hover:to-pi-yellow text-black transition-all duration-300"
              >
                Request Ride
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Nearby Drivers */}
        {showDrivers && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span className="text-2xl mr-3">🚗</span>
                  Nearby Drivers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {nearbyDrivers.map((driver, index) => (
                  <motion.div
                    key={driver.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    <Card className="glass-dark border-white/10 hover:border-pi-yellow/50 transition-all duration-300 cursor-pointer group">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">{driver.name}</h4>
                              <p className="text-white/60 text-sm">{driver.vehicle}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-white/80 text-sm ml-1">{driver.rating}</span>
                                </div>
                                <span className="text-white/40">•</span>
                                <span className="text-white/60 text-sm">{driver.distance}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center text-pi-yellow font-bold text-lg">
                              <span className="text-sm mr-1">π</span>
                              {driver.price}
                            </div>
                            <div className="flex items-center text-white/60 text-sm mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              {driver.eta}
                            </div>
                            <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">Available</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
