// Firebase Configuration
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyC7wBmIio92nVi2w8Ft5Gk2HYFAWvzDw2w",
  authDomain: "krishnadham-a4789.firebaseapp.com",
  projectId: "krishnadham-a4789",
  storageBucket: "krishnadham-a4789.firebasestorage.app",
  messagingSenderId: "1082927097252",
  appId: "1:1082927097252:web:3b4e85c0a4b3898e394d31",
  measurementId: "G-7057GRQMKG"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)

export default app