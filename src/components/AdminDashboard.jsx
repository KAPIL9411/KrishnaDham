import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../firebase/config'
import { 
  LogOut, 
  Search, 
  Filter, 
  Edit3, 
  Save, 
  X, 
  Plus,
  Home,
  MapPin,
  IndianRupee,
  Calendar,
  User,
  Mic,
  MicOff
} from 'lucide-react'

const AdminDashboard = ({ onLogout }) => {
  const [plots, setPlots] = useState([])
  const [filteredPlots, setFilteredPlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingPlot, setEditingPlot] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    booked: 0,
    sold: 0
  })

  // Load plots from Firebase
  useEffect(() => {
    loadPlots()
  }, [])

  // Filter plots
  useEffect(() => {
    let filtered = plots

    if (searchTerm) {
      filtered = filtered.filter(plot => 
        plot.number.includes(searchTerm) ||
        plot.area.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(plot => plot.status === statusFilter)
    }

    setFilteredPlots(filtered)
  }, [plots, searchTerm, statusFilter])

  // Calculate stats
  useEffect(() => {
    const newStats = {
      total: plots.length,
      available: plots.filter(p => p.status === 'available').length,
      booked: plots.filter(p => p.status === 'booked').length,
      sold: plots.filter(p => p.status === 'sold').length
    }
    setStats(newStats)
  }, [plots])

  const loadPlots = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'plots'))
      const plotsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setPlots(plotsData)
    } catch (error) {
      console.error('Error loading plots:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      onLogout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleEditPlot = (plot) => {
    setEditingPlot({ ...plot })
  }

  const handleSavePlot = async () => {
    try {
      const plotRef = doc(db, 'plots', editingPlot.id)
      await updateDoc(plotRef, {
        number: editingPlot.number,
        area: editingPlot.area,
        facing: editingPlot.facing,
        price: parseInt(editingPlot.price),
        status: editingPlot.status,
        ownerName: editingPlot.ownerName || '',
        updatedAt: new Date()
      })
      
      // Update local state
      setPlots(plots.map(p => p.id === editingPlot.id ? editingPlot : p))
      setEditingPlot(null)
      
      alert('प्लॉट की जानकारी सफलतापूर्वक अपडेट हो गई!')
    } catch (error) {
      console.error('Error updating plot:', error)
      alert('प्लॉट अपडेट करने में त्रुटि!')
    }
  }

  const handleAddPlot = async (newPlot) => {
    try {
      const docRef = await addDoc(collection(db, 'plots'), {
        ...newPlot,
        price: parseInt(newPlot.price),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
      const addedPlot = { id: docRef.id, ...newPlot, price: parseInt(newPlot.price) }
      setPlots([...plots, addedPlot])
      setShowAddForm(false)
      
      alert('नया प्लॉट सफलतापूर्वक जोड़ा गया!')
    } catch (error) {
      console.error('Error adding plot:', error)
      alert('प्लॉट जोड़ने में त्रुटि!')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700 border-green-200'
      case 'booked': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'sold': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'उपलब्ध'
      case 'booked': return 'बुक किया गया'
      case 'sold': return 'बिक गया'
      default: return 'अज्ञात'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-saffron/30 border-t-saffron rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/70">डेटा लोड हो रहा है...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="bg-saffron/10 p-2 rounded-lg">
                <Home className="text-saffron" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-charcoal">
                  एडमिन डैशबोर्ड
                </h1>
                <p className="text-sm text-charcoal/60">श्री कृष्णा धाम कॉलोनी</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal/60">कुल प्लॉट</p>
                <p className="text-3xl font-bold text-charcoal">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPin className="text-blue-600" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal/60">उपलब्ध</p>
                <p className="text-3xl font-bold text-green-600">{stats.available}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Home className="text-green-600" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal/60">बुक किया गया</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.booked}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Calendar className="text-yellow-600" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal/60">बिक गया</p>
                <p className="text-3xl font-bold text-red-600">{stats.sold}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <User className="text-red-600" size={24} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40" size={20} />
                <input
                  type="text"
                  placeholder="प्लॉट नंबर या क्षेत्रफल खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40" size={20} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none appearance-none bg-white"
                >
                  <option value="all">सभी स्थिति</option>
                  <option value="available">उपलब्ध</option>
                  <option value="booked">बुक किया गया</option>
                  <option value="sold">बिक गया</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              {/* Add Plot Button */}
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-saffron hover:bg-gold text-white px-6 py-3 rounded-lg transition-all"
              >
                <Plus size={20} />
                नया प्लॉट जोड़ें
              </button>
            </div>
          </div>
        </div>

        {/* Plots Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-charcoal">प्लॉट नंबर</th>
                  <th className="text-left py-4 px-6 font-semibold text-charcoal">क्षेत्रफल</th>
                  <th className="text-left py-4 px-6 font-semibold text-charcoal">दिशा</th>
                  <th className="text-left py-4 px-6 font-semibold text-charcoal">मूल्य (लाख)</th>
                  <th className="text-left py-4 px-6 font-semibold text-charcoal">स्थिति</th>
                  <th className="text-left py-4 px-6 font-semibold text-charcoal">मालिक का नाम</th>
                  <th className="text-left py-4 px-6 font-semibold text-charcoal">कार्य</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlots.map((plot, index) => (
                  <motion.tr
                    key={plot.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4 px-6 font-semibold text-charcoal">#{plot.number}</td>
                    <td className="py-4 px-6 text-charcoal/70">{plot.area}</td>
                    <td className="py-4 px-6 text-charcoal/70">{plot.facing}</td>
                    <td className="py-4 px-6 text-charcoal/70">
                      ₹{(plot.price / 100000).toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(plot.status)}`}>
                        {getStatusText(plot.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-charcoal/70">
                      {(plot.status === 'booked' || plot.status === 'sold') && plot.ownerName ? (
                        <span className="flex items-center gap-1">
                          <User size={14} className="text-saffron" />
                          {plot.ownerName}
                        </span>
                      ) : (
                        <span className="text-charcoal/30">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleEditPlot(plot)}
                        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm transition-all"
                      >
                        <Edit3 size={16} />
                        एडिट
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPlots.length === 0 && (
            <div className="text-center py-12">
              <p className="text-charcoal/50">कोई प्लॉट नहीं मिला</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Plot Modal */}
      {editingPlot && (
        <EditPlotModal
          plot={editingPlot}
          onSave={handleSavePlot}
          onCancel={() => setEditingPlot(null)}
          onChange={setEditingPlot}
        />
      )}

      {/* Add Plot Modal */}
      {showAddForm && (
        <AddPlotModal
          onSave={handleAddPlot}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  )
}

// Edit Plot Modal Component
const EditPlotModal = ({ plot, onSave, onCancel, onChange }) => {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'hi-IN' // Hindi language

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        onChange({ ...plot, ownerName: transcript })
        setIsListening(false)
      }

      recognitionInstance.onerror = () => {
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  const startListening = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    } else {
      alert('आपका ब्राउज़र Speech Recognition को सपोर्ट नहीं करता')
    }
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
      setIsListening(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-display font-bold text-charcoal">
            प्लॉट एडिट करें
          </h3>
          <button
            onClick={onCancel}
            className="text-charcoal/40 hover:text-charcoal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-charcoal font-semibold mb-2">प्लॉट नंबर</label>
            <input
              type="text"
              value={plot.number}
              onChange={(e) => onChange({ ...plot, number: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
            />
          </div>

          <div>
            <label className="block text-charcoal font-semibold mb-2">क्षेत्रफल</label>
            <input
              type="text"
              value={plot.area}
              onChange={(e) => onChange({ ...plot, area: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
              placeholder="जैसे: 1000 वर्ग फुट"
            />
          </div>

          <div>
            <label className="block text-charcoal font-semibold mb-2">दिशा</label>
            <select
              value={plot.facing}
              onChange={(e) => onChange({ ...plot, facing: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
            >
              <option value="उत्तर">उत्तर</option>
              <option value="दक्षिण">दक्षिण</option>
              <option value="पूर्व">पूर्व</option>
              <option value="पश्चिम">पश्चिम</option>
              <option value="उत्तर-पूर्व">उत्तर-पूर्व</option>
              <option value="उत्तर-पश्चिम">उत्तर-पश्चिम</option>
              <option value="दक्षिण-पूर्व">दक्षिण-पूर्व</option>
              <option value="दक्षिण-पश्चिम">दक्षिण-पश्चिम</option>
            </select>
          </div>

          <div>
            <label className="block text-charcoal font-semibold mb-2">मूल्य (रुपये में)</label>
            <input
              type="number"
              value={plot.price}
              onChange={(e) => onChange({ ...plot, price: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
              placeholder="850000"
            />
          </div>

          <div>
            <label className="block text-charcoal font-semibold mb-2">स्थिति</label>
            <select
              value={plot.status}
              onChange={(e) => onChange({ ...plot, status: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
            >
              <option value="available">उपलब्ध</option>
              <option value="booked">बुक किया गया</option>
              <option value="sold">बिक गया</option>
            </select>
          </div>

          {/* Owner Name - Only show for booked/sold plots */}
          {(plot.status === 'booked' || plot.status === 'sold') && (
            <div>
              <label className="block text-charcoal font-semibold mb-2">
                मालिक का नाम (हिंदी में) {(plot.status === 'booked' || plot.status === 'sold') && '*'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={plot.ownerName || ''}
                  onChange={(e) => onChange({ ...plot, ownerName: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
                  placeholder="राजेश कुमार"
                />
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                  }`}
                  title={isListening ? 'बोलना बंद करें' : 'बोलकर नाम बताएं'}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              </div>
              {isListening && (
                <p className="text-xs text-red-600 mt-1 animate-pulse">
                  🎤 सुन रहा हूं... हिंदी में नाम बोलें
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-charcoal py-3 rounded-lg font-semibold transition-all"
          >
            रद्द करें
          </button>
          <button
            onClick={onSave}
            className="flex-1 bg-saffron hover:bg-gold text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} />
            सेव करें
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// Add Plot Modal Component
const AddPlotModal = ({ onSave, onCancel }) => {
  const [newPlot, setNewPlot] = useState({
    number: '',
    area: '',
    facing: 'उत्तर',
    price: '',
    status: 'available',
    ownerName: ''
  })
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'hi-IN' // Hindi language

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setNewPlot(prev => ({ ...prev, ownerName: transcript }))
        setIsListening(false)
      }

      recognitionInstance.onerror = () => {
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  const startListening = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    } else {
      alert('आपका ब्राउज़र Speech Recognition को सपोर्ट नहीं करता')
    }
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
      setIsListening(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newPlot.number && newPlot.area && newPlot.price) {
      onSave(newPlot)
    } else {
      alert('कृपया सभी फील्ड भरें')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-display font-bold text-charcoal">
            नया प्लॉट जोड़ें
          </h3>
          <button
            onClick={onCancel}
            className="text-charcoal/40 hover:text-charcoal"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-charcoal font-semibold mb-2">प्लॉट नंबर *</label>
            <input
              type="text"
              value={newPlot.number}
              onChange={(e) => setNewPlot({ ...newPlot, number: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
              placeholder="117"
              required
            />
          </div>

          <div>
            <label className="block text-charcoal font-semibold mb-2">क्षेत्रफल *</label>
            <input
              type="text"
              value={newPlot.area}
              onChange={(e) => setNewPlot({ ...newPlot, area: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
              placeholder="1000 वर्ग फुट"
              required
            />
          </div>

          <div>
            <label className="block text-charcoal font-semibold mb-2">दिशा</label>
            <select
              value={newPlot.facing}
              onChange={(e) => setNewPlot({ ...newPlot, facing: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
            >
              <option value="उत्तर">उत्तर</option>
              <option value="दक्षिण">दक्षिण</option>
              <option value="पूर्व">पूर्व</option>
              <option value="पश्चिम">पश्चिम</option>
              <option value="उत्तर-पूर्व">उत्तर-पूर्व</option>
              <option value="उत्तर-पश्चिम">उत्तर-पश्चिम</option>
              <option value="दक्षिण-पूर्व">दक्षिण-पूर्व</option>
              <option value="दक्षिण-पश्चिम">दक्षिण-पश्चिम</option>
            </select>
          </div>

          <div>
            <label className="block text-charcoal font-semibold mb-2">मूल्य (रुपये में) *</label>
            <input
              type="number"
              value={newPlot.price}
              onChange={(e) => setNewPlot({ ...newPlot, price: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
              placeholder="850000"
              required
            />
          </div>

          <div>
            <label className="block text-charcoal font-semibold mb-2">स्थिति</label>
            <select
              value={newPlot.status}
              onChange={(e) => setNewPlot({ ...newPlot, status: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
            >
              <option value="available">उपलब्ध</option>
              <option value="booked">बुक किया गया</option>
              <option value="sold">बिक गया</option>
            </select>
          </div>

          {/* Owner Name - Only show for booked/sold plots */}
          {(newPlot.status === 'booked' || newPlot.status === 'sold') && (
            <div>
              <label className="block text-charcoal font-semibold mb-2">
                मालिक का नाम (हिंदी में) {(newPlot.status === 'booked' || newPlot.status === 'sold') && '*'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={newPlot.ownerName}
                  onChange={(e) => setNewPlot({ ...newPlot, ownerName: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
                  placeholder="राजेश कुमार"
                  required={newPlot.status === 'booked' || newPlot.status === 'sold'}
                />
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                  }`}
                  title={isListening ? 'बोलना बंद करें' : 'बोलकर नाम बताएं'}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              </div>
              {isListening && (
                <p className="text-xs text-red-600 mt-1 animate-pulse">
                  🎤 सुन रहा हूं... हिंदी में नाम बोलें
                </p>
              )}
            </div>
          )}

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-charcoal py-3 rounded-lg font-semibold transition-all"
            >
              रद्द करें
            </button>
            <button
              type="submit"
              className="flex-1 bg-saffron hover:bg-gold text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              जोड़ें
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default AdminDashboard