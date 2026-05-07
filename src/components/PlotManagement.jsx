import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import React from 'react'
import { 
  Search, Edit3, Save, X, Plus, Trash2, MapPin, User, Home
} from 'lucide-react'

const PlotManagement = () => {
  const [plots, setPlots] = useState([])
  const [zones, setZones] = useState([])
  const [filteredPlots, setFilteredPlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [zoneFilter, setZoneFilter] = useState('all')
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

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterPlots()
  }, [plots, searchTerm, zoneFilter, statusFilter])

  useEffect(() => {
    calculateStats()
  }, [plots])

  const loadData = async () => {
    try {
      // Load zones
      const zonesSnapshot = await getDocs(collection(db, 'zones'))
      const zonesData = zonesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setZones(zonesData)

      // Load plots
      const plotsSnapshot = await getDocs(collection(db, 'plots'))
      const plotsData = plotsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setPlots(plotsData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterPlots = () => {
    let filtered = plots

    if (searchTerm) {
      filtered = filtered.filter(plot => 
        plot.plotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plot.ownerName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (zoneFilter !== 'all') {
      filtered = filtered.filter(plot => plot.zoneId === zoneFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(plot => plot.status === statusFilter)
    }

    setFilteredPlots(filtered)
  }

  const calculateStats = () => {
    setStats({
      total: plots.length,
      available: plots.filter(p => p.status === 'available').length,
      booked: plots.filter(p => p.status === 'booked').length,
      sold: plots.filter(p => p.status === 'sold').length
    })
  }

  const handleSavePlot = async (plotData) => {
    try {
      const plotRef = doc(db, 'plots', plotData.id || `plot-${Date.now()}`)
      await setDoc(plotRef, {
        ...plotData,
        updatedAt: new Date()
      })
      
      await loadData()
      setEditingPlot(null)
      setShowAddForm(false)
      alert('✅ प्लॉट सफलतापूर्वक सेव हो गया!')
    } catch (error) {
      console.error('Error saving plot:', error)
      alert('❌ प्लॉट सेव करने में त्रुटि!')
    }
  }

  const handleDeletePlot = async (plotId) => {
    if (!confirm('क्या आप इस प्लॉट को डिलीट करना चाहते हैं?')) return
    
    try {
      await deleteDoc(doc(db, 'plots', plotId))
      await loadData()
      alert('✅ प्लॉट डिलीट हो गया!')
    } catch (error) {
      console.error('Error deleting plot:', error)
      alert('❌ प्लॉट डिलीट करने में त्रुटि!')
    }
  }

  const handleDeleteAllPlots = async () => {
    const confirmMsg = `⚠️ WARNING: यह ${plots.length} प्लॉट्स को permanently delete कर देगा!\n\nक्या आप sure हैं?`
    if (!confirm(confirmMsg)) return
    
    // Double confirmation
    if (!confirm('⚠️ FINAL CONFIRMATION: सभी plots delete हो जाएंगे। Continue?')) return
    
    try {
      setLoading(true)
      
      // Delete in batches to avoid timeout
      const batchSize = 10
      for (let i = 0; i < plots.length; i += batchSize) {
        const batch = plots.slice(i, i + batchSize)
        const deletePromises = batch.map(plot => 
          deleteDoc(doc(db, 'plots', plot.id))
        )
        await Promise.all(deletePromises)
      }
      
      await loadData()
      alert('✅ सभी प्लॉट्स successfully डिलीट हो गए!')
    } catch (error) {
      console.error('Error deleting plots:', error)
      alert('❌ Error: ' + error.message)
    } finally {
      setLoading(false)
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
      case 'booked': return 'बुक'
      case 'sold': return 'बिक गया'
      default: return status
    }
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
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
                <p className="text-sm text-charcoal/60">कुल प्लॉट्स</p>
                <p className="text-3xl font-bold text-charcoal">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Home className="text-blue-600" size={24} />
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
                <MapPin className="text-green-600" size={24} />
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
                <p className="text-sm text-charcoal/60">बुक</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.booked}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Home className="text-yellow-600" size={24} />
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
                  placeholder="प्लॉट नंबर या मालिक का नाम खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
                />
              </div>

              {/* Zone Filter */}
              <select
                value={zoneFilter}
                onChange={(e) => setZoneFilter(e.target.value)}
                className="px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none appearance-none bg-white"
              >
                <option value="all">सभी ज़ोन</option>
                {zones.map(zone => (
                  <option key={zone.id} value={zone.id}>{zone.name}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none appearance-none bg-white"
              >
                <option value="all">सभी स्थिति</option>
                <option value="available">उपलब्ध</option>
                <option value="booked">बुक</option>
                <option value="sold">बिक गया</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-saffron hover:bg-gold text-white px-6 py-3 rounded-lg transition-all"
            >
              <Plus size={20} />
              नया प्लॉट जोड़ें
            </button>
          </div>
        </div>

        {/* Plots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlots.map((plot, index) => {
            const zone = zones.find(z => z.id === plot.zoneId)
            return (
              <motion.div
                key={plot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-charcoal text-xl mb-1">
                      प्लॉट #{plot.plotNumber}
                    </h3>
                    <p className="text-sm text-charcoal/60">{zone?.name || 'Unknown Zone'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingPlot({ ...plot })}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeletePlot(plot.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/70">क्षेत्रफल:</span>
                    <span className="font-semibold text-charcoal">{plot.area} sq yd</span>
                  </div>
                  {plot.ownerName && plot.status === 'sold' && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-charcoal/70">मालिक:</span>
                      <span className="font-semibold text-charcoal">{plot.ownerName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(plot.status)}`}>
                    {getStatusText(plot.status)}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {filteredPlots.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-charcoal/50">कोई प्लॉट नहीं मिला</p>
          </div>
        )}
      </div>

      {/* Edit/Add Plot Modal */}
      {(editingPlot || showAddForm) && (
        <PlotFormModal
          plot={editingPlot}
          zones={zones}
          onSave={handleSavePlot}
          onCancel={() => {
            setEditingPlot(null)
            setShowAddForm(false)
          }}
        />
      )}
    </div>
  )
}

// Plot Form Modal Component
const PlotFormModal = ({ plot, zones, onSave, onCancel }) => {
  const [formData, setFormData] = useState(plot || {
    id: '',
    plotNumber: '',
    zoneId: zones[0]?.id || '',
    area: '',
    status: 'sold',
    ownerName: '',
    coordinates: '',
    labelX: '',
    labelY: ''
  })
  
  const [showCoordinatePicker, setShowCoordinatePicker] = useState(false)
  const [clickedPoints, setClickedPoints] = useState([])
  const [imageLoaded, setImageLoaded] = useState(false)
  const [existingPlots, setExistingPlots] = useState([])
  const imageRef = React.useRef(null)

  // Load existing plots when coordinate picker opens
  React.useEffect(() => {
    if (showCoordinatePicker) {
      loadExistingPlots()
    }
  }, [showCoordinatePicker])

  const loadExistingPlots = async () => {
    try {
      const plotsSnapshot = await getDocs(collection(db, 'plots'))
      const plotsData = plotsSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(p => p.coordinates && p.id !== formData.id) // Exclude current plot if editing
      setExistingPlots(plotsData)
    } catch (error) {
      console.error('Error loading plots:', error)
    }
  }

  const handleImageClick = (e) => {
    if (!imageRef.current) return
    
    const rect = imageRef.current.getBoundingClientRect()
    const x = Math.round(e.clientX - rect.left)
    const y = Math.round(e.clientY - rect.top)
    
    // Scale to original image dimensions
    const scaleX = imageRef.current.naturalWidth / rect.width
    const scaleY = imageRef.current.naturalHeight / rect.height
    
    const scaledX = Math.round(x * scaleX)
    const scaledY = Math.round(y * scaleY)
    
    const newPoints = [...clickedPoints, { x: scaledX, y: scaledY }]
    setClickedPoints(newPoints)
    
    // If 4 points clicked, create polygon
    if (newPoints.length === 4) {
      const coordinates = newPoints.map(p => `${p.x},${p.y}`).join(' ')
      setFormData({ ...formData, coordinates })
      
      // Calculate center for label
      const centerX = Math.round(newPoints.reduce((sum, p) => sum + p.x, 0) / 4)
      const centerY = Math.round(newPoints.reduce((sum, p) => sum + p.y, 0) / 4)
      setFormData(prev => ({ ...prev, labelX: centerX, labelY: centerY }))
      
      alert('✅ Coordinates set! अब modal बंद करें और save करें।')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.plotNumber || !formData.zoneId || !formData.area) {
      alert('कृपया सभी आवश्यक फील्ड भरें')
      return
    }
    
    if (!formData.coordinates) {
      alert('कृपया coordinates set करें (Coordinate Picker का उपयोग करें)')
      return
    }

    const plotData = {
      ...formData,
      id: formData.id || `plot-${Date.now()}`,
      area: parseFloat(formData.area),
      labelX: formData.labelX ? parseInt(formData.labelX) : null,
      labelY: formData.labelY ? parseInt(formData.labelY) : null
    }

    onSave(plotData)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl my-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-display font-bold text-charcoal">
              {plot ? 'प्लॉट एडिट करें' : 'नया प्लॉट जोड़ें'}
            </h3>
            <button onClick={onCancel} className="text-charcoal/40 hover:text-charcoal">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-charcoal font-semibold mb-2">प्लॉट नंबर *</label>
                <input
                  type="text"
                  value={formData.plotNumber}
                  onChange={(e) => setFormData({ ...formData, plotNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
                  placeholder="A-101"
                  required
                />
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-2">ज़ोन *</label>
                <select
                  value={formData.zoneId}
                  onChange={(e) => setFormData({ ...formData, zoneId: e.target.value })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
                  required
                >
                  {zones.map(zone => (
                    <option key={zone.id} value={zone.id}>{zone.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-charcoal font-semibold mb-2">क्षेत्रफल (sq yd) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
                  placeholder="100 या 100.50"
                  required
                />
                <p className="text-xs text-charcoal/50 mt-1">
                  💡 Decimal values allowed (e.g., 75.5, 100.25)
                </p>
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-2">स्थिति</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
                >
                  <option value="sold">बिक गया</option>
                  <option value="booked">बुक</option>
                  <option value="available">उपलब्ध</option>
                </select>
              </div>
            </div>

            {formData.status === 'sold' && (
              <div>
                <label className="block text-charcoal font-semibold mb-2">मालिक का नाम</label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
                  placeholder="राजेश कुमार (optional)"
                />
              </div>
            )}

            <div>
              <label className="block text-charcoal font-semibold mb-2">
                पॉलीगॉन निर्देशांक *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.coordinates}
                  onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                  className="flex-1 px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none font-mono text-sm"
                  placeholder="x1,y1 x2,y2 x3,y3 x4,y4"
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => setShowCoordinatePicker(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap"
                >
                  📍 Coordinates Set करें
                </button>
              </div>
              <p className="text-xs text-charcoal/50 mt-1">
                💡 Button click करें, sitemap पर 4 corners click करें
              </p>
            </div>

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
                <Save size={18} />
                सेव करें
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Coordinate Picker Modal */}
      {showCoordinatePicker && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-t-2xl p-4 w-full max-w-4xl">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-charcoal">Coordinate Picker</h3>
                <p className="text-sm text-charcoal/70">
                  {clickedPoints.length < 4 
                    ? `प्लॉट के ${4 - clickedPoints.length} corners और click करें` 
                    : '✅ सभी 4 corners set हो गए!'}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  💡 पहले से bike हुए plots {existingPlots.length > 0 ? 'दिख रहे हैं' : 'नहीं हैं'}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setClickedPoints([])}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    setShowCoordinatePicker(false)
                    setClickedPoints([])
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                >
                  बंद करें
                </button>
              </div>
            </div>
          </div>
          
          <div className="relative bg-white w-full max-w-4xl" style={{ maxHeight: '70vh', overflow: 'auto' }}>
            <div className="relative inline-block">
              <img
                ref={imageRef}
                src="/newSitemap.png"
                alt="Sitemap"
                className="max-w-full h-auto cursor-crosshair"
                onClick={handleImageClick}
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Show existing plots */}
              {imageLoaded && existingPlots.map((existingPlot) => {
                const rect = imageRef.current?.getBoundingClientRect()
                if (!rect) return null
                
                const scaleX = rect.width / imageRef.current.naturalWidth
                const scaleY = rect.height / imageRef.current.naturalHeight
                
                return (
                  <svg
                    key={existingPlot.id}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ width: imageRef.current?.width, height: imageRef.current?.height }}
                  >
                    <polygon
                      points={existingPlot.coordinates.split(' ').map(coord => {
                        const [x, y] = coord.split(',').map(Number)
                        return `${x * scaleX},${y * scaleY}`
                      }).join(' ')}
                      fill={existingPlot.status === 'sold' ? 'rgba(239, 68, 68, 0.4)' : 
                            existingPlot.status === 'booked' ? 'rgba(251, 191, 36, 0.4)' : 
                            'rgba(74, 222, 128, 0.4)'}
                      stroke={existingPlot.status === 'sold' ? '#ef4444' : 
                             existingPlot.status === 'booked' ? '#fbbf24' : '#4ade80'}
                      strokeWidth="2"
                    />
                    {existingPlot.labelX && existingPlot.labelY && (
                      <text
                        x={existingPlot.labelX * scaleX}
                        y={existingPlot.labelY * scaleY}
                        fill="white"
                        fontSize="16"
                        fontWeight="bold"
                        stroke="black"
                        strokeWidth="1"
                        paintOrder="stroke"
                        textAnchor="middle"
                      >
                        {existingPlot.plotNumber}
                      </text>
                    )}
                  </svg>
                )
              })}
              
              {/* Show clicked points */}
              {imageLoaded && clickedPoints.map((point, index) => {
                const rect = imageRef.current?.getBoundingClientRect()
                if (!rect) return null
                
                const scaleX = rect.width / imageRef.current.naturalWidth
                const scaleY = rect.height / imageRef.current.naturalHeight
                
                return (
                  <div
                    key={index}
                    className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{
                      left: `${point.x * scaleX}px`,
                      top: `${point.y * scaleY}px`
                    }}
                  >
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {index + 1}
                    </span>
                  </div>
                )
              })}
              
              {/* Draw new polygon if 4 points */}
              {imageLoaded && clickedPoints.length === 4 && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  style={{ width: imageRef.current?.width, height: imageRef.current?.height }}
                >
                  <polygon
                    points={clickedPoints.map(p => {
                      const rect = imageRef.current?.getBoundingClientRect()
                      const scaleX = rect.width / imageRef.current.naturalWidth
                      const scaleY = rect.height / imageRef.current.naturalHeight
                      return `${p.x * scaleX},${p.y * scaleY}`
                    }).join(' ')}
                    fill="rgba(255, 0, 0, 0.3)"
                    stroke="red"
                    strokeWidth="3"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PlotManagement
