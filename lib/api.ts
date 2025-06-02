const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export interface User {
  id: string
  pi_username: string
  name: string
  role: "rider" | "driver"
  pi_balance: number
}

export interface Ride {
  id: string
  rider_id: string
  driver_id?: string
  pickup: string
  destination: string
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled"
  fare: number
  created_at: string
  updated_at: string
  rider_name?: string
  driver_name?: string
}

class ApiClient {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  async login(data: { pi_username?: string; name?: string; role?: string }) {
    return this.request("/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async requestRide(data: { rider_id: string; pickup: string; destination: string }) {
    return this.request("/rides/request", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getAvailableRides() {
    return this.request("/rides/available")
  }

  async acceptRide(data: { ride_id: string; driver_id: string }) {
    return this.request("/rides/accept", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateRideStatus(data: { ride_id: string; status: string }) {
    return this.request("/rides/status", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getMyRides(userId: string, role: string) {
    return this.request(`/rides/my?user_id=${userId}&role=${role}`)
  }

  async getRideUpdates(userId: string, role: string) {
    return this.request(`/rides/updates?user_id=${userId}&role=${role}`)
  }

  async cancelRide(data: { ride_id: string; user_id: string }) {
    return this.request("/rides/cancel", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

// Create and export an instance of the ApiClient
export const apiClient = new ApiClient()
