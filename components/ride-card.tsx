"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Clock, User, Car, CheckCircle, X } from "lucide-react"
import { motion } from "framer-motion"

interface RideCardProps {
  ride: {
    id: string
    pickup: string
    destination: string
    status: string
    fare: number
    rider_name?: string
    driver_name?: string
    created_at: string
  }
  userRole: "rider" | "driver"
  onAccept?: (rideId: string) => void
  onCancel?: (rideId: string) => void
  onComplete?: (rideId: string) => void
}

export function RideCard({ ride, userRole, onAccept, onCancel, onComplete }: RideCardProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
          icon: <Clock className="w-4 h-4" />,
          label: "Pending",
        }
      case "accepted":
        return {
          color: "bg-green-500/20 text-green-400 border-green-500/30",
          icon: <Car className="w-4 h-4" />,
          label: "Accepted",
        }
      case "in_progress":
        return {
          color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
          icon: <Navigation className="w-4 h-4" />,
          label: "In Progress",
        }
      case "completed":
        return {
          color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
          icon: <CheckCircle className="w-4 h-4" />,
          label: "Completed",
        }
      case "cancelled":
        return {
          color: "bg-red-500/20 text-red-400 border-red-500/30",
          icon: <X className="w-4 h-4" />,
          label: "Cancelled",
        }
      default:
        return {
          color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
          icon: <Clock className="w-4 h-4" />,
          label: status.charAt(0).toUpperCase() + status.slice(1),
        }
    }
  }

  const statusInfo = getStatusInfo(ride.status)

  // Format date
  const formattedDate = new Date(ride.created_at).toLocaleString()

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors">
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header with status */}
            <div className="flex justify-between items-start">
              <Badge className={`${statusInfo.color} flex items-center space-x-1`}>
                {statusInfo.icon}
                <span className="ml-1">{statusInfo.label}</span>
              </Badge>
              <div className="text-yellow-400 font-mono text-lg">π {ride.fare}</div>
            </div>

            {/* Route */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5" />
                <div>
                  <div className="text-white font-medium">{ride.pickup}</div>
                  {ride.status === "completed" && <div className="text-white/60 text-xs">{formattedDate}</div>}
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Navigation className="w-4 h-4 text-pink-400 mt-0.5" />
                <div className="text-white font-medium">{ride.destination}</div>
              </div>
            </div>

            {/* User info */}
            {userRole === "driver" && ride.rider_name && (
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <User className="w-4 h-4" />
                <span>Rider: {ride.rider_name}</span>
              </div>
            )}

            {userRole === "rider" && ride.driver_name && (
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <Car className="w-4 h-4" />
                <span>Driver: {ride.driver_name}</span>
              </div>
            )}

            {/* Actions */}
            {(onAccept || onCancel || onComplete) && (
              <div className="flex space-x-2 pt-2">
                {userRole === "driver" && ride.status === "pending" && onAccept && (
                  <Button
                    onClick={() => onAccept(ride.id)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-none"
                  >
                    Accept Ride
                  </Button>
                )}

                {userRole === "driver" && ride.status === "accepted" && onComplete && (
                  <Button
                    onClick={() => onComplete(ride.id)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none"
                  >
                    Start Trip
                  </Button>
                )}

                {userRole === "driver" && ride.status === "in_progress" && onComplete && (
                  <Button
                    onClick={() => onComplete(ride.id)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none"
                  >
                    Complete Trip
                  </Button>
                )}

                {userRole === "rider" && ride.status === "pending" && onCancel && (
                  <Button
                    onClick={() => onCancel(ride.id)}
                    variant="outline"
                    className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
