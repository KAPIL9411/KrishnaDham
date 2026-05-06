import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import { Lock, User, Eye, EyeOff } from 'lucide-react'

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      onLogin(true)
    } catch (error) {
      setError('गलत ईमेल या पासवर्ड')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron/20 to-gold/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-saffron/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Lock className="text-saffron" size={32} />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-charcoal mb-2">
            एडमिन पैनल
          </h1>
          <p className="text-charcoal/70">
            श्री कृष्णा धाम कॉलोनी प्रबंधन
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-charcoal font-semibold mb-2">
              ईमेल पता
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal/40" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-charcoal/20 rounded-xl focus:border-saffron outline-none transition-all"
                placeholder="admin@krishnadham.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-charcoal font-semibold mb-2">
              पासवर्ड
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal/40" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 border-2 border-charcoal/20 rounded-xl focus:border-saffron outline-none transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-saffron to-gold text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                लॉग इन हो रहा है...
              </div>
            ) : (
              'लॉग इन करें'
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-charcoal/50">
          सुरक्षित एडमिन एक्सेस
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin