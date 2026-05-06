import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import FirebaseSetup from './FirebaseSetup'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [needsSetup, setNeedsSetup] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user)
      
      if (user) {
        // Check if plots data exists
        try {
          const querySnapshot = await getDocs(collection(db, 'plots'))
          setNeedsSetup(querySnapshot.empty)
        } catch (error) {
          console.error('Error checking plots data:', error)
          setNeedsSetup(true)
        }
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-saffron/30 border-t-saffron rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/70">लोड हो रहा है...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={setIsAuthenticated} />
  }

  if (needsSetup) {
    return <FirebaseSetup onComplete={() => setNeedsSetup(false)} />
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
}

export default Admin