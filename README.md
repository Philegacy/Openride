# OpenRide - Decentralized Ride Sharing

A modern, decentralized ride-sharing application built for the Pi Network community.

## Features

- 🚗 **Ride Sharing**: Connect riders with drivers
- 💰 **Pi Network Integration**: Earn and spend Pi coins
- 🔒 **Secure**: Blockchain-powered authentication
- 📱 **Mobile-First**: Responsive design for all devices
- ⚡ **Real-time**: Live ride status updates

## Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Component library

### Backend
- **Flask** - Python web framework
- **SQLite** - Database
- **Flask-CORS** - Cross-origin requests

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd openride-app
   \`\`\`

2. **Install frontend dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Install backend dependencies**
   \`\`\`bash
   cd backend
   pip install -r requirements.txt
   \`\`\`

### Running the Application

1. **Start the backend server**
   \`\`\`bash
   cd backend
   python app.py
   \`\`\`
   The API will be available at `http://localhost:5000`

2. **Start the frontend development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   The app will be available at `http://localhost:3000`

## API Endpoints

- `POST /api/login` - User authentication
- `POST /api/rides/request` - Request a new ride
- `GET /api/rides/available` - Get available rides for drivers
- `POST /api/rides/accept` - Accept a ride request
- `POST /api/rides/status` - Update ride status
- `GET /api/rides/my` - Get user's rides
- `GET /api/rides/updates` - Get ride updates (polling)
- `POST /api/rides/cancel` - Cancel a ride

## Database Schema

### Users Table
- `id` - Unique identifier
- `pi_username` - Pi Network username
- `name` - User's display name
- `role` - User role (rider/driver)
- `pi_balance` - Pi coin balance

### Rides Table
- `id` - Unique identifier
- `rider_id` - Reference to rider
- `driver_id` - Reference to driver (optional)
- `pickup` - Pickup location
- `destination` - Destination location
- `status` - Ride status (pending/accepted/in_progress/completed/cancelled)
- `fare` - Ride fare in Pi coins

## Features

### For Riders
- Request rides with pickup and destination
- View ride status in real-time
- Cancel pending rides
- Track ride history

### For Drivers
- View available ride requests
- Accept ride requests
- Update ride status (start trip, complete trip)
- Track earnings

## Design System

### Colors
- **Primary**: Deep purple, electric blue, neon pink
- **Accent**: Yellow (Pi coin color)
- **Background**: Dark gradient (space-like)

### Typography
- **Font**: Inter (clean, minimal)
- **Headings**: Bold, large sizes
- **Body**: Regular weight, good contrast

### Components
- **Cards**: Glassmorphism effect with gradients
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Dark theme with colored focus states
- **Animations**: Smooth transitions with Framer Motion

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
