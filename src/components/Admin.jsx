import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import PlotManagement from './PlotManagement'
import InquiryDashboard from './InquiryDashboard'
import { MessageSquare, LogOut, MapPin } from 'lucide-react'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('zones') // 'zones', 'plots', or 'inquiries'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user)
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

  const handleLogout = async () => {
    try {
      await auth.signOut()
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Tabs */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-2xl font-display font-bold text-charcoal">
                  एडमिन पैनल
                </h1>
                <p className="text-sm text-charcoal/60">श्री कृष्णा धाम कॉलोनी</p>
              </div>
              
              {/* Tabs */}
              <div className="flex gap-2 ml-8">
                <button
                  onClick={() => setActiveTab('zones')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'zones'
                      ? 'bg-saffron text-white shadow-md'
                      : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                  }`}
                >
                  <MapPin size={18} />
                  लोकेशन ज़ोन
                </button>
                <button
                  onClick={() => setActiveTab('plots')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'plots'
                      ? 'bg-saffron text-white shadow-md'
                      : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                  }`}
                >
                  <MapPin size={18} />
                  प्लॉट्स मैनेज करें
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'inquiries'
                      ? 'bg-saffron text-white shadow-md'
                      : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                  }`}
                >
                  <MessageSquare size={18} />
                  इन्क्वायरी
                </button>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              <LogOut size={18} />
              लॉग आउट
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div>
        {activeTab === 'zones' && <AdminDashboard onLogout={handleLogout} />}
        {activeTab === 'plots' && <PlotManagement />}
        {activeTab === 'inquiries' && <InquiryDashboard />}
      </div>
    </div>
  )
}

export default Admin