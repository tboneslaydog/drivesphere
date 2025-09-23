const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Data storage (in production, use a real database)
let users = [];
let posts = [];
let routes = [];

// Load data from file on startup
const dataFile = 'data.json';
if (fs.existsSync(dataFile)) {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    users = data.users || [];
    posts = data.posts || [];
    routes = data.routes || [];
}

// Save data to file
function saveData() {
    const data = { users, posts, routes, lastUpdated: new Date().toISOString() };
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// API Routes

// Get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Create new user
app.post('/api/users', (req, res) => {
    const { name, username, email, password } = req.body;
    
    // Check if username or email already exists
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    
    const newUser = {
        id: Date.now().toString(),
        name,
        username,
        email,
        password, // In production, hash this
        role: 'user',
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
    };
    
    users.push(newUser);
    saveData();
    res.json(newUser);
});

// Login user
app.post('/api/login', (req, res) => {
    const { emailOrUsername, password } = req.body;
    
    const user = users.find(u => 
        (u.email === emailOrUsername || u.username === emailOrUsername) && 
        u.password === password
    );
    
    if (user) {
        // Update last active
        user.lastActive = new Date().toISOString();
        saveData();
        res.json(user);
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Create new post
app.post('/api/posts', (req, res) => {
    const { userId, text, photos } = req.body;
    
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const newPost = {
        id: Date.now().toString(),
        userId,
        username: user.name,
        userUsername: user.username,
        text,
        photos: photos || [],
        timestamp: Date.now(),
        likes: 0,
        liked: false
    };
    
    posts.unshift(newPost); // Add to beginning
    saveData();
    res.json(newPost);
});

// Like/unlike post
app.post('/api/posts/:id/like', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (post) {
        post.likes += post.liked ? -1 : 1;
        post.liked = !post.liked;
        saveData();
        res.json(post);
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// Delete post
app.delete('/api/posts/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        saveData();
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// Get all routes
app.get('/api/routes', (req, res) => {
    res.json(routes);
});

// Create new route
app.post('/api/routes', (req, res) => {
    const newRoute = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString()
    };
    
    routes.push(newRoute);
    saveData();
    res.json(newRoute);
});

// Get app stats
app.get('/api/stats', (req, res) => {
    res.json({
        totalUsers: users.length,
        totalPosts: posts.length,
        totalRoutes: routes.length,
        activeUsers: users.filter(u => 
            new Date(u.lastActive) > new Date(Date.now() - 24 * 60 * 60 * 1000)
        ).length
    });
});

// Serve the main app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 DriveSphere server running on port ${PORT}`);
    console.log(`📱 Access your app at: http://localhost:${PORT}`);
    console.log(`👥 Users: ${users.length}, 📝 Posts: ${posts.length}, 🗺️ Routes: ${routes.length}`);
});

// Save data every 30 seconds
setInterval(saveData, 30000);
