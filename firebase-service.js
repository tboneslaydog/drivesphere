// Firebase Service for DriveSphere
// This handles all data operations with Firebase

class FirebaseService {
    constructor() {
        this.db = null;
        this.auth = null;
        this.isInitialized = false;
    }

    // Initialize Firebase
    async init() {
        try {
            // Import Firebase modules
            const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
            const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const { getAuth } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');

            // Firebase config (replace with your actual config)
            const firebaseConfig = {
                apiKey: "your-api-key-here",
                authDomain: "drivesphere-app.firebaseapp.com",
                projectId: "drivesphere-app",
                storageBucket: "drivesphere-app.appspot.com",
                messagingSenderId: "123456789",
                appId: "your-app-id-here"
            };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            this.db = getFirestore(app);
            this.auth = getAuth(app);
            this.isInitialized = true;

            console.log('🔥 Firebase initialized successfully!');
            return true;
        } catch (error) {
            console.log('❌ Firebase initialization failed:', error);
            return false;
        }
    }

    // Check if Firebase is available
    isAvailable() {
        return this.isInitialized && this.db && this.auth;
    }

    // Get all users
    async getUsers() {
        if (!this.isAvailable()) return [];
        
        try {
            const { collection, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const usersSnapshot = await getDocs(collection(this.db, 'users'));
            return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.log('Error getting users:', error);
            return [];
        }
    }

    // Add new user
    async addUser(userData) {
        if (!this.isAvailable()) return null;
        
        try {
            const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const docRef = await addDoc(collection(this.db, 'users'), userData);
            return { id: docRef.id, ...userData };
        } catch (error) {
            console.log('Error adding user:', error);
            return null;
        }
    }

    // Get all posts
    async getPosts() {
        if (!this.isAvailable()) return [];
        
        try {
            const { collection, getDocs, query, orderBy } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const postsQuery = query(collection(this.db, 'posts'), orderBy('timestamp', 'desc'));
            const postsSnapshot = await getDocs(postsQuery);
            return postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.log('Error getting posts:', error);
            return [];
        }
    }

    // Add new post
    async addPost(postData) {
        if (!this.isAvailable()) return null;
        
        try {
            const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const docRef = await addDoc(collection(this.db, 'posts'), {
                ...postData,
                timestamp: Date.now()
            });
            return { id: docRef.id, ...postData, timestamp: Date.now() };
        } catch (error) {
            console.log('Error adding post:', error);
            return null;
        }
    }

    // Like/unlike post
    async toggleLike(postId, userId) {
        if (!this.isAvailable()) return null;
        
        try {
            const { doc, updateDoc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const postRef = doc(this.db, 'posts', postId);
            const postDoc = await getDoc(postRef);
            
            if (postDoc.exists()) {
                const postData = postDoc.data();
                const likedBy = postData.likedBy || [];
                const isLiked = likedBy.includes(userId);
                
                if (isLiked) {
                    likedBy.splice(likedBy.indexOf(userId), 1);
                } else {
                    likedBy.push(userId);
                }
                
                await updateDoc(postRef, {
                    likes: likedBy.length,
                    likedBy: likedBy
                });
                
                return { likes: likedBy.length, liked: !isLiked };
            }
        } catch (error) {
            console.log('Error toggling like:', error);
        }
        return null;
    }

    // Delete post
    async deletePost(postId) {
        if (!this.isAvailable()) return false;
        
        try {
            const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            await deleteDoc(doc(this.db, 'posts', postId));
            return true;
        } catch (error) {
            console.log('Error deleting post:', error);
            return false;
        }
    }

    // Get all routes
    async getRoutes() {
        if (!this.isAvailable()) return [];
        
        try {
            const { collection, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const routesSnapshot = await getDocs(collection(this.db, 'routes'));
            return routesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.log('Error getting routes:', error);
            return [];
        }
    }

    // Add new route
    async addRoute(routeData) {
        if (!this.isAvailable()) return null;
        
        try {
            const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const docRef = await addDoc(collection(this.db, 'routes'), {
                ...routeData,
                createdAt: new Date().toISOString()
            });
            return { id: docRef.id, ...routeData, createdAt: new Date().toISOString() };
        } catch (error) {
            console.log('Error adding route:', error);
            return null;
        }
    }

    // Real-time updates for posts
    onPostsUpdate(callback) {
        if (!this.isAvailable()) return;
        
        try {
            const { collection, query, orderBy, onSnapshot } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const postsQuery = query(collection(this.db, 'posts'), orderBy('timestamp', 'desc'));
            
            onSnapshot(postsQuery, (snapshot) => {
                const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                callback(posts);
            });
        } catch (error) {
            console.log('Error setting up real-time updates:', error);
        }
    }

    // Real-time updates for users
    onUsersUpdate(callback) {
        if (!this.isAvailable()) return;
        
        try {
            const { collection, onSnapshot } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            
            onSnapshot(collection(this.db, 'users'), (snapshot) => {
                const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                callback(users);
            });
        } catch (error) {
            console.log('Error setting up real-time updates:', error);
        }
    }
}

// Create global instance
const firebaseService = new FirebaseService();

// Export for use
window.firebaseService = firebaseService;
