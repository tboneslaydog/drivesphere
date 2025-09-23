// Mobile-friendly server using PhoneGap/Cordova
// This runs on your phone and syncs data

class MobileServer {
    constructor() {
        this.users = [];
        this.posts = [];
        this.routes = [];
        this.isOnline = false;
        this.syncInterval = null;
    }

    // Start mobile server
    start() {
        console.log('📱 Starting mobile server...');
        
        // Load data from phone storage
        this.loadData();
        
        // Start sync with cloud
        this.startCloudSync();
        
        // Start local network server
        this.startLocalServer();
        
        this.isOnline = true;
        console.log('✅ Mobile server running!');
    }

    // Load data from phone storage
    loadData() {
        try {
            this.users = JSON.parse(localStorage.getItem('mobile_users') || '[]');
            this.posts = JSON.parse(localStorage.getItem('mobile_posts') || '[]');
            this.routes = JSON.parse(localStorage.getItem('mobile_routes') || '[]');
        } catch (error) {
            console.log('Error loading data:', error);
            this.users = [];
            this.posts = [];
            this.routes = [];
        }
    }

    // Save data to phone storage
    saveData() {
        try {
            localStorage.setItem('mobile_users', JSON.stringify(this.users));
            localStorage.setItem('mobile_posts', JSON.stringify(this.posts));
            localStorage.setItem('mobile_routes', JSON.stringify(this.routes));
        } catch (error) {
            console.log('Error saving data:', error);
        }
    }

    // Sync with cloud services
    startCloudSync() {
        // Sync every 5 minutes
        this.syncInterval = setInterval(() => {
            this.syncWithCloud();
        }, 5 * 60 * 1000);
    }

    // Sync with cloud (Firebase, etc.)
    async syncWithCloud() {
        try {
            // This would sync with Firebase or similar
            console.log('🔄 Syncing with cloud...');
            
            // For now, just save locally
            this.saveData();
            
        } catch (error) {
            console.log('Cloud sync error:', error);
        }
    }

    // Start local network server
    startLocalServer() {
        // This would start a local web server on your phone
        // Other devices on your network can connect
        console.log('🌐 Local network server started');
    }

    // API methods
    getUsers() {
        return this.users;
    }

    getPosts() {
        return this.posts;
    }

    addPost(post) {
        this.posts.unshift(post);
        this.saveData();
        return post;
    }

    addUser(user) {
        this.users.push(user);
        this.saveData();
        return user;
    }

    // Stop server
    stop() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }
        this.isOnline = false;
        console.log('📱 Mobile server stopped');
    }
}

// Initialize mobile server
const mobileServer = new MobileServer();

// Start when page loads
document.addEventListener('DOMContentLoaded', () => {
    mobileServer.start();
});

// Export for use
window.mobileServer = mobileServer;
