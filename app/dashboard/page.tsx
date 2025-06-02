"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Navigation, Clock, Star, TrendingUp, Wallet, Car, User, Award } from "lucide-react"

const rideHistory = [
  {
    id: 1,
    type: "ride",
    from: "Downtown Plaza",
    to: "Airport Terminal 2",
    date: "Today, 2:30 PM",
    fare: "25.80",
    status: "completed",
    driver: "Alex Chen",
    rating: 5,
  },
  {
    id: 2,
    type: "ride",
    from: "Home",
    to: "Shopping Mall",
    date: "Yesterday, 6:15 PM",
    fare: "18.50",
    status: "completed",
    driver: "Sarah Kim",
    rating: 4,
  },
  {
    id: 3,
    type: "drive",
    from: "Business District",
    to: "University Campus",
    date: "Dec 28, 10:45 AM",
    fare: "22.30",
    status: "completed",
    rider: "Mike Johnson",
    rating: 5,
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("rides")

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Wallet Balance Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Card className="glass border-white/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 p-6 flex items-center justify-between">
                <div className="flex items-center">
                  <Wallet className="w-10 h-10 text-pi-yellow mr-4" />
                  <div>
                    <p className="text-white/70 text-sm">Available Balance</p>
                    <div className="flex items-center text-pi-yellow font-bold text-4xl">
                      <span className="text-2xl mr-1">π</span>
                      1,247.50
                    </div>
                  </div>
                </div>
                <Button className="bg-pi-yellow hover:bg-pi-yellow/90 text-black">Add Funds</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="glass border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20 border-2 border-pi-yellow">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-2xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">John Doe</h2>
                  <p className="text-white/70">Pi Network Member since 2021</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white/80 text-sm">4.9 Rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4 text-pi-yellow" />
                      <span className="text-white/80 text-sm">Gold Member</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="glass border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">47</div>
              <p className="text-white/60 text-sm">Total Rides</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Car className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">23</div>
              <p className="text-white/60 text-sm">Drives Completed</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-pi-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-pi-yellow" />
              </div>
              <div className="text-2xl font-bold text-pi-yellow">π 892.30</div>
              <p className="text-white/60 text-sm">Total Earned</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass border-white/20">
              <TabsTrigger value="rides" className="data-[state=active]:bg-pi-yellow data-[state=active]:text-black">
                My Rides
              </TabsTrigger>
              <TabsTrigger value="drives" className="data-[state=active]:bg-pi-yellow data-[state=active]:text-black">
                My Drives
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-pi-yellow data-[state=active]:text-black">
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rides" className="mt-6">
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Ride History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rideHistory
                    .filter((item) => item.type === "ride")
                    .map((ride, index) => (
                      <motion.div
                        key={ride.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.4 }}
                      >
                        <Card className="glass-dark border-white/10">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4 text-green-400" />
                                  <span className="text-white text-sm">{ride.from}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Navigation className="w-4 h-4 text-red-400" />
                                  <span className="text-white text-sm">{ride.to}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 text-white/60" />
                                  <span className="text-white/60 text-sm">{ride.date}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center text-pi-yellow font-bold">
                                  <span className="text-sm mr-1">π</span>
                                  {ride.fare}
                                </div>
                                <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                                  {ride.status}
                                </Badge>
                                <div className="flex items-center mt-1">
                                  {[...Array(ride.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="drives" className="mt-6">
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Car className="w-5 h-5 mr-2" />
                    Drive History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rideHistory
                    .filter((item) => item.type === "drive")
                    .map((drive, index) => (
                      <motion.div
                        key={drive.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.4 }}
                      >
                        <Card className="glass-dark border-white/10">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4 text-green-400" />
                                  <span className="text-white text-sm">{drive.from}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Navigation className="w-4 h-4 text-red-400" />
                                  <span className="text-white text-sm">{drive.to}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 text-white/60" />
                                  <span className="text-white/60 text-sm">{drive.date}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center text-pi-yellow font-bold">
                                  <span className="text-sm mr-1">π</span>
                                  {drive.fare}
                                </div>
                                <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                                  {drive.status}
                                </Badge>
                                <div className="flex items-center mt-1">
                                  {[...Array(drive.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Wallet className="w-5 h-5 mr-2" />
                      Pi Wallet
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-6 glass-dark rounded-lg">
                      <div className="text-3xl font-bold text-pi-yellow mb-2">π 1,247.50</div>
                      <p className="text-white/60">Available Balance</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70">Total Earned</span>
                        <span className="text-pi-yellow font-mono">π 892.30</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Total Spent</span>
                        <span className="text-white font-mono">π 355.20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Wallet Address</span>
                        <span className="text-white/60 text-sm font-mono">Pi7x...9k2m</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-pi-yellow to-pi-orange hover:from-pi-orange hover:to-pi-yellow text-black">
                      View Full Wallet
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-white/70 text-sm">Full Name</label>
                        <p className="text-white font-medium">John Doe</p>
                      </div>
                      <div>
                        <label className="text-white/70 text-sm">Email</label>
                        <p className="text-white font-medium">john.doe@example.com</p>
                      </div>
                      <div>
                        <label className="text-white/70 text-sm">Phone</label>
                        <p className="text-white font-medium">+1 (555) 123-4567</p>
                      </div>
                      <div>
                        <label className="text-white/70 text-sm">Member Since</label>
                        <p className="text-white font-medium">January 2021</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
