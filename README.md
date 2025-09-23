# Driver Social 🚗

A social media platform for drivers to share routes, speed data, and GPS information with friends and the community.

## Features

### 🗺️ Route Tracking & Sharing
- **Real-time GPS tracking** with high accuracy
- **Route recording** with start/stop functionality
- **Route sharing** (public/private options)
- **Interactive maps** showing your routes
- **Route statistics** (distance, duration, average speed, max speed)

### 📊 Speed & Performance Analytics
- **Live speed monitoring** during drives
- **Speed charts** showing performance over time
- **Driving statistics** and personal records
- **Performance comparison** with friends

### 👥 Social Features
- **User profiles** with driving stats
- **Friend system** to connect with other drivers
- **Route discovery** - browse public routes from other users
- **Like and comment** on shared routes
- **Real-time notifications**

### 🎨 Modern UI/UX
- **Dark theme** optimized for driving
- **Responsive design** works on mobile and desktop
- **Material-UI components** for consistent design
- **Smooth animations** and transitions

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Library**: Material-UI (MUI)
- **Maps**: Leaflet + React-Leaflet
- **Charts**: Recharts
- **Routing**: React Router
- **State Management**: React Context API
- **Styling**: Emotion (CSS-in-JS)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd driver-social
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### First Time Setup
1. **Register** a new account or **login** with existing credentials
2. **Allow location permissions** when prompted for GPS tracking
3. **Start exploring** the dashboard and features

### Tracking a Route
1. Go to the **Dashboard**
2. Click the **play button** to start tracking
3. Drive your route while the app records your GPS data
4. Click **stop** when finished
5. **Save your route** with a name and privacy settings

### Sharing Routes
1. Navigate to **Routes** page
2. View your saved routes
3. **Share public routes** for others to discover
4. **Browse public routes** from other users
5. **Like and comment** on interesting routes

### Connecting with Friends
1. Go to **Friends** page
2. **Search for users** by username or email
3. **Send friend requests**
4. **Accept pending requests**
5. **View friends' routes** and stats

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MapComponent.tsx    # Interactive map with route display
│   ├── Navbar.tsx          # Main navigation bar
│   ├── RouteCard.tsx       # Route display card
│   └── SpeedChart.tsx      # Speed over time chart
├── contexts/            # React Context providers
│   ├── AuthContext.tsx     # User authentication state
│   └── LocationContext.tsx # GPS tracking and route management
├── pages/               # Main application pages
│   ├── Dashboard.tsx       # Main dashboard with tracking
│   ├── Profile.tsx         # User profile page
│   ├── RoutesPage.tsx      # Routes listing and discovery
│   ├── Friends.tsx         # Friends management
│   ├── Login.tsx           # User login
│   └── Register.tsx        # User registration
├── App.tsx              # Main app component
└── index.tsx            # Application entry point
```

## Key Features Explained

### GPS Tracking
- Uses browser's `navigator.geolocation` API
- High accuracy positioning with `enableHighAccuracy: true`
- Automatic location updates every 5 seconds during tracking
- Calculates distance, speed, and heading data

### Route Management
- Stores route data in local state (can be extended to backend)
- Calculates total distance using Haversine formula
- Tracks average and maximum speeds
- Supports public/private route sharing

### Social Features
- Mock user system (ready for backend integration)
- Friend request system
- Route discovery and sharing
- User profiles with driving statistics

## Future Enhancements

- **Backend Integration**: Connect to a real API for data persistence
- **Real-time Updates**: WebSocket integration for live tracking
- **Push Notifications**: Browser notifications for friend activities
- **Mobile App**: React Native version for better mobile experience
- **Advanced Analytics**: More detailed driving insights and reports
- **Route Recommendations**: AI-powered route suggestions
- **Leaderboards**: Competitive features and achievements

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: GPS tracking requires HTTPS in production environments.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository.

---

**Happy Driving! 🚗💨**
