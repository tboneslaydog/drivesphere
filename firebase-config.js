// Firebase Configuration for DriveSphere
// Replace these with your actual Firebase config values

const firebaseConfig = {
  // You'll get these values from Firebase Console
  apiKey: "your-api-key-here",
  authDomain: "drivesphere-app.firebaseapp.com",
  projectId: "drivesphere-app",
  storageBucket: "drivesphere-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id-here"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Export Firebase services
export { db, auth, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy, limit, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };
