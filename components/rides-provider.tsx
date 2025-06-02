"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Ride {
  id: string
  pickup: string
  destination: string
  status: "pending" | "accepted" | "completed"
  riderId: string
  riderName: string
  driverId?: string
  driverName?: string
  fare: number
  createdAt: Date
}

interface RidesContextType {
  rides: Ride[]
  requestRide: (pickup: string, destination: string, riderId: string, riderName: string) => void
  acceptRide: (rideId: string, driverId: string, driverName: string) => void
}

const RidesContext = createContext<RidesContextType | undefined>(undefined)

export function RidesProvider({ children }: { children: ReactNode }) {
  const [rides, setRides] = useState<Ride[]>([
    {
      id: "1",
      pickup: "Downtown Plaza",
      destination: "Tech District",
      status: "pending",
      riderId: "2",
      riderName: "Alex Chen",
      fare: 15.5,
      createdAt: new Date(),
    },
    {
      id: "2",
      pickup: "University Campus",
      destination: "Shopping Mall",
      status: "pending",
      riderId: "3",
      riderName: "Sarah Kim",
      fare: 12.0,
      createdAt: new Date(),
    },
  ])

  const requestRide = (pickup: string, destination: string, riderId: string, riderName: string) => {
    const newRide: Ride = {
      id: Date.now().toString(),
      pickup,
      destination,
      status: "pending",
      riderId,
      riderName,
      fare: Math.round((Math.random() * 20 + 10) * 100) / 100,
      createdAt: new Date(),
    }
    setRides((prev) => [newRide, ...prev])
  }

  const acceptRide = (rideId: string, driverId: string, driverName: string) => {
    setRides((prev) =>
      prev.map((ride) => (ride.id === rideId ? { ...ride, status: "accepted" as const, driverId, driverName } : ride)),
    )
  }

  return <RidesContext.Provider value={{ rides, requestRide, acceptRide }}>{children}</RidesContext.Provider>
}

export function useRides() {
  const context = useContext(RidesContext)
  if (context === undefined) {
    throw new Error("useRides must be used within a RidesProvider")
  }
  return context
}
