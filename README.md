# DriveSphere

A modern, social GPS tracking and route sharing application built with HTML, CSS, and JavaScript. Features real-time location tracking, route sharing, social feed, and comprehensive analytics.

## Features

### 🗺️ GPS Tracking & Routes
- **Real-time GPS tracking** with location permissions
- **Route recording** with distance, speed, and duration
- **Fake route testing** for development without driving
- **Route privacy settings** (Private/Public)
- **Route history** and sharing capabilities
- **Interactive maps** with Leaflet.js

### 👥 Social Features
- **Community feed** with mature, professional design
- **Photo uploads** for posts
- **Post management** (create, delete, moderate)
- **User profiles** with driving statistics
- **Admin panel** for content moderation

### 📊 Analytics & Insights
- **XP and leveling system** with achievements
- **Driving statistics** (distance, speed, routes)
- **Weekly summaries** and insights
- **Achievement tracking** and rewards
- **Performance monitoring**

### 🔐 User Management
- **User registration** and authentication
- **Persistent login** with "Remember Me"
- **Admin controls** for user management
- **Data export/import** functionality
- **Privacy controls** for routes and posts

### 🎨 Modern UI/UX
- **Cyberpunk-inspired design** with neon accents
- **Responsive layout** for desktop and mobile
- **Smooth animations** and transitions
- **Professional typography** and spacing
- **Dark theme** with gradient backgrounds

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Maps**: Leaflet.js with OpenStreetMap
- **Storage**: LocalStorage for data persistence
- **Hosting**: Firebase Hosting
- **Authentication**: Firebase Auth (Email/Password, Google)
- **Database**: Firebase Firestore
- **Icons**: Feather Icons (SVG)

## Getting Started

### Prerequisites
- Modern web browser with GPS support
- Firebase project setup
- Node.js (for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/drivesphere.git
   cd drivesphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project
   - Enable Authentication (Email/Password, Google)
   - Enable Firestore Database
   - Enable Hosting
   - Update `firebase-config.js` with your credentials

4. **Deploy to Firebase**
   ```bash
   firebase deploy --only hosting
   ```

### Development

1. **Start local server**
   ```bash
   npm start
   ```

2. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Allow location permissions when prompted

3. **Test features**
   - Create an account or use admin login (key: `5478`)
   - Try the fake route testing feature
   - Test real GPS tracking
   - Explore the social feed and analytics

## Usage

### For Users
1. **Register** a new account or login
2. **Start tracking** routes using GPS or fake testing
3. **Share experiences** in the community feed
4. **View analytics** and track your progress
5. **Manage routes** and privacy settings

### For Admins
1. **Login** with admin key `5478`
2. **Access admin panel** for user management
3. **Moderate content** and manage posts
4. **Monitor system** health and statistics
5. **Export data** and generate reports

## Project Structure

```
drivesphere/
├── public/                 # Firebase hosting files
│   ├── index.html         # Main application
│   └── manifest.json      # PWA manifest
├── src/                   # Source files (React components)
├── functions/             # Firebase Cloud Functions
├── firebase.json          # Firebase configuration
├── package.json           # Dependencies
└── README.md             # This file
```

## Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Authentication (Email/Password, Google)
3. Enable Firestore Database
4. Enable Hosting
5. Update configuration in `firebase-config.js`

### Environment Variables
- `FIREBASE_API_KEY`: Your Firebase API key
- `FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
- `FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
- `FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
- `FIREBASE_APP_ID`: Your Firebase app ID

## Features in Detail

### GPS Tracking
- Real-time location tracking with permission handling
- Route recording with distance and speed calculations
- Fake route testing for development
- Route privacy settings (Private/Public)
- Route sharing and community features

### Social Feed
- Professional, mature design
- Photo uploads with Base64 encoding
- Post management and moderation
- User avatars and timestamps
- Like, comment, and share functionality

### Analytics
- XP system with achievements
- Driving statistics and insights
- Performance monitoring
- Weekly summaries
- Achievement tracking

### Admin Panel
- User management and moderation
- Content management (posts, routes)
- System monitoring and statistics
- Data export/import functionality
- Security logs and settings

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@drivesphere.org or create an issue in the GitHub repository.

## Roadmap

- [ ] Real-time chat functionality
- [ ] Advanced route analytics
- [ ] Mobile app development
- [ ] API for third-party integrations
- [ ] Advanced privacy controls
- [ ] Route recommendations
- [ ] Social features (friends, groups)
- [ ] Offline support
- [ ] Push notifications

## Acknowledgments

- Leaflet.js for mapping functionality
- Firebase for hosting and authentication
- OpenStreetMap for map data
- Feather Icons for beautiful SVG icons
- The driving community for inspiration

---

**DriveSphere** - Connecting drivers through technology and community.