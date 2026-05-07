// Firebase Configuration
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC7wBmIio92nVi2w8Ft5Gk2HYFAWvzDw2w",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "krishnadham-a4789.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "krishnadham-a4789",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "krishnadham-a4789.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1082927097252",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1082927097252:web:3b4e85c0a4b3898e394d31",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-7057GRQMKG"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)

export default app