# DriveSphere - Social GPS Tracking App

A modern social media app for drivers to share routes, track drives, and connect with friends.

## 🚀 Quick Start

### Option 1: Run with Server (Recommended for Social Features)

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Choose the LTS version

2. **Start the Server**
   - Double-click `start-server.bat` (Windows)
   - Or run in terminal:
     ```bash
     npm install
     npm start
     ```

3. **Access the App**
   - Open your browser
   - Go to: http://localhost:3001
   - The app will now work like a real social media platform!

### Option 2: Run Without Server (Local Only)

1. **Open the App**
   - Double-click `index.html`
   - Or open in any web browser

2. **Note**: Without the server, data is stored locally on each device and won't sync between devices.

## 📱 Features

### 🌐 Social Media Features
- **Real-time Posts**: Share driving experiences with friends
- **User Profiles**: Create and manage your profile
- **Friends System**: Add and connect with other drivers
- **Live Feed**: See posts from all users in real-time
- **Cross-Device Sync**: Works on PC, iPhone, and any device

### 🗺️ GPS & Tracking
- **Route Tracking**: Record and save your driving routes
- **Speed Monitoring**: Track your speed and driving patterns
- **G-Force Detection**: Monitor acceleration (mobile only)
- **Route Sharing**: Share routes with friends via QR codes

### 🏆 Gamification
- **XP System**: Earn experience points for driving activities
- **Achievements**: Unlock badges and achievements
- **Leveling**: Progress through driver levels
- **Leaderboards**: Compete with friends

### 📊 Analytics
- **Driving Insights**: Detailed analytics of your driving habits
- **Weekly Summaries**: Get weekly driving reports
- **Speed Analysis**: Track your speed patterns
- **Distance Tracking**: Monitor total miles driven

## 🔧 Technical Details

### Backend Server
- **Node.js + Express**: RESTful API server
- **Real-time Data**: All data synced across devices
- **User Management**: Secure user registration and login
- **Post System**: Social media functionality
- **Data Persistence**: JSON file storage (easily upgradeable to database)

### Frontend
- **Pure HTML/CSS/JavaScript**: No frameworks required
- **Responsive Design**: Works on desktop and mobile
- **PWA Support**: Can be installed as a mobile app
- **Offline Fallback**: Works even without server connection

## 🌐 Deployment

### Local Network
1. Find your computer's IP address
2. Update `API_BASE` in `index.html` to your IP
3. Access from other devices: `http://YOUR_IP:3001`

### Production Deployment
1. Deploy server to cloud service (Heroku, DigitalOcean, etc.)
2. Update `API_BASE` to your production URL
3. Deploy frontend to any web hosting service

## 📱 Mobile Installation

### iPhone/iPad
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. The app will appear like a native app!

### Android
1. Open the app in Chrome
2. Tap the menu (3 dots)
3. Select "Add to Home Screen"
4. The app will be installed!

## 🔑 Admin Access

- **Admin Key**: `5478`
- **Admin Features**: User management, system monitoring, data export
- **Access**: Login with admin key to access admin panel

## 🛠️ Development

### Server Development
```bash
npm run dev  # Start with auto-reload
```

### Adding Features
- **Frontend**: Edit `index.html`
- **Backend**: Edit `server.js`
- **API**: Add new endpoints in `server.js`

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Ensure the server is running (if using social features)
3. Try refreshing the page
4. Check your internet connection

## 🎯 Roadmap

- [ ] Real-time notifications
- [ ] Push notifications
- [ ] Database integration
- [ ] Advanced analytics
- [ ] Route recommendations
- [ ] Group challenges
- [ ] Weather integration

---

**DriveSphere** - Where every drive tells a story! 🚗✨