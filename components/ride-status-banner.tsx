"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation, Clock, Car, CheckCircle, Phone, MessageSquare } from "lucide-react"

interface RideStatusBannerProps {
  ride: {
    id: string
    pickup: string
    destination: string
    status: string
    fare: number
    driver_name?: string
    rider_name?: string
  }
  userRole: "rider" | "driver"
}

export function RideStatusBanner({ ride, userRole }: RideStatusBannerProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          color: "from-yellow-500/20 to-amber-500/20",
          border: "border-yellow-500/30",
          icon: <Clock className="w-5 h-5 text-yellow-400" />,
          message: "Looking for a driver...",
          pulse: true,
        }
      case "accepted":
        return {
          color: "from-green-500/20 to-emerald-500/20",
          border: "border-green-500/30",
          icon: <Car className="w-5 h-5 text-green-400" />,
          message: userRole === "rider" ? "Driver is on the way!" : "Heading to pickup location",
          pulse: false,
        }
      case "in_progress":
        return {
          color: "from-blue-500/20 to-purple-500/20",
          border: "border-blue-500/30",
          icon: <Navigation className="w-5 h-5 text-blue-400" />,
          message: "Trip in progress",
          pulse: false,
        }
      case "completed":
        return {
          color: "from-purple-500/20 to-pink-500/20",
          border: "border-purple-500/30",
          icon: <CheckCircle className="w-5 h-5 text-purple-400" />,
          message: "Trip completed!",
          pulse: false,
        }
      default:
        return {
          color: "from-gray-500/20 to-gray-600/20",
          border: "border-gray-500/30",
          icon: <Clock className="w-5 h-5 text-gray-400" />,
          message: "Unknown status",
          pulse: false,
        }
    }
  }

  const statusInfo = getStatusInfo(ride.status)

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Card className={`bg-gradient-to-r ${statusInfo.color} ${statusInfo.border} backdrop-blur-sm`}>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <motion.div
                animate={statusInfo.pulse ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="mr-3"
              >
                {statusInfo.icon}
              </motion.div>
              <div className="flex-1">
                <div className="text-white font-medium">{statusInfo.message}</div>
                <div className="text-white/70 text-sm">
                  {ride.pickup} → {ride.destination}
                </div>
              </div>
              <div className="text-yellow-400 font-mono">π {ride.fare}</div>
            </div>

            {/* Contact info */}
            {(ride.status === "accepted" || ride.status === "in_progress") && (
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="text-white text-sm">
                  {userRole === "rider" && ride.driver_name && (
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-1" />
                      <span>{ride.driver_name}</span>
                    </div>
                  )}
                  {userRole === "driver" && ride.rider_name && (
                    <div className="flex items-center">
                      <Navigation className="w-4 h-4 mr-1" />
                      <span>{ride.rider_name}</span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
