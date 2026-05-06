import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { uploadAllPlotData, getUploadStats } from '../utils/uploadPlotData'
import { Database, CheckCircle, AlertCircle, Upload, Settings } from 'lucide-react'

const FirebaseSetup = ({ onComplete }) => {
  const [uploading, setUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [error, setError] = useState('')

  const stats = getUploadStats()

  const handleUpload = async () => {
    setUploading(true)
    setError('')
    
    try {
      const result = await uploadAllPlotData()
      if (result.success) {
        setUploadComplete(true)
        setTimeout(() => {
          onComplete()
        }, 2000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Firebase connection error. Please check your configuration.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Database className="text-blue-600" size={32} />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-charcoal mb-2">
            Firebase Setup
          </h1>
          <p className="text-charcoal/70">
            Initialize plot data for Krishna Dham Colony
          </p>
        </div>

        {/* Stats Preview */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
            <Settings size={20} />
            Data to Upload
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-sm text-charcoal/60">Total Plots</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.available}</p>
              <p className="text-sm text-charcoal/60">Available</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.booked}</p>
              <p className="text-sm text-charcoal/60">Booked</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.sold}</p>
              <p className="text-sm text-charcoal/60">Sold</p>
            </div>
          </div>
        </div>

        {/* Upload Status */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2"
          >
            <AlertCircle size={20} />
            <span>{error}</span>
          </motion.div>
        )}

        {uploadComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2"
          >
            <CheckCircle size={20} />
            <span>Successfully uploaded all plot data!</span>
          </motion.div>
        )}

        {/* Upload Button */}
        <motion.button
          onClick={handleUpload}
          disabled={uploading || uploadComplete}
          whileHover={{ scale: uploadComplete ? 1 : 1.02 }}
          whileTap={{ scale: uploadComplete ? 1 : 0.98 }}
          className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all ${
            uploadComplete 
              ? 'bg-green-500 text-white cursor-default'
              : uploading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
          }`}
        >
          {uploading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Uploading Plot Data...
            </div>
          ) : uploadComplete ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle size={20} />
              Setup Complete!
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Upload size={20} />
              Upload All 116 Plots
            </div>
          )}
        </motion.button>

        {/* Instructions */}
        <div className="text-center mt-6 text-sm text-charcoal/50">
          {uploadComplete ? (
            'Redirecting to admin dashboard...'
          ) : (
            'This will initialize your Firebase database with all plot data'
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default FirebaseSetup