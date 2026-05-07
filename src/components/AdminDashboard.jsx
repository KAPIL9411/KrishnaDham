import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { 
  Search, Edit3, Save, X, MapPin, DollarSign, Layers, RefreshCw
} from 'lucide-react'

const AdminDashboard = () => {
  const [zones, setZones] = useState([])
  const [filteredZones, setFilteredZones] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingZone, setEditingZone] = useState(null)

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    partiallyBooked: 0,
    sold: 0
  })

  // Default zones data from SVGPlotOverlay
  const defaultZones = [
    {
      id: 'zone-1',
      name: 'Zone 1 - Left Side Strip',
      description: 'Narrow strip on left side with road access',
      facing: 'West',
      roadWidth: '24 feet',
      features: ['Road Access', 'Peaceful Location', 'Budget Friendly'],
      basePricePerSqYd: { min: 5500, max: 6500 },
      recommendedArea: { min: 80, max: 200 },
      status: 'available',
      polygon: '210,111 366,111 371,1442 196,1397'
    },
    {
      id: 'zone-2',
      name: 'Zone 2 - Top Large Area',
      description: 'Spacious top section with wide road frontage',
      facing: 'North',
      roadWidth: '16 feet',
      features: ['Wide Road', 'Large Area', 'Premium Location', 'Open Space'],
      basePricePerSqYd: { min: 7000, max: 8000 },
      recommendedArea: { min: 150, max: 500 },
      status: 'available',
      polygon: '439,113 1615,102 1618,272 431,278'
    },
    {
      id: 'zone-3',
      name: 'Zone 3 - Column 1',
      description: 'First column in middle section',
      facing: 'West',
      roadWidth: '24 feet',
      features: ['Wide Road', 'Good Access', 'Planned Layout'],
      basePricePerSqYd: { min: 6000, max: 7000 },
      recommendedArea: { min: 80, max: 200 },
      status: 'available',
      polygon: '442,340 601,354 606,1088 436,1063'
    },
    {
      id: 'zone-4',
      name: 'Zone 4 - Column 2',
      description: 'Second column in middle section',
      facing: 'Central',
      roadWidth: '16 feet',
      features: ['Central Location', 'Good Connectivity', 'Balanced Pricing'],
      basePricePerSqYd: { min: 6000, max: 7000 },
      recommendedArea: { min: 80, max: 200 },
      status: 'available',
      polygon: '615,340 791,343 791,1071 626,1068'
    },
    {
      id: 'zone-5',
      name: 'Zone 5 - Column 3',
      description: 'Third column in middle section',
      facing: 'Central',
      roadWidth: '16 feet',
      features: ['Central Location', 'Easy Access', 'Well Connected'],
      basePricePerSqYd: { min: 6000, max: 7000 },
      recommendedArea: { min: 80, max: 200 },
      status: 'available',
      polygon: '847,340 1026,334 1026,1099 839,1071'
    },
    {
      id: 'zone-6',
      name: 'Zone 6 - Column 4',
      description: 'Fourth column in middle section',
      facing: 'Central',
      roadWidth: '16 feet',
      features: ['Good Planning', 'Easy Access', 'Peaceful'],
      basePricePerSqYd: { min: 6000, max: 7000 },
      recommendedArea: { min: 80, max: 200 },
      status: 'available',
      polygon: '1029,332 1196,337 1199,1094 1014,1074'
    },
    {
      id: 'zone-7',
      name: 'Zone 7 - Column 5',
      description: 'Fifth column in middle section',
      facing: 'Central',
      roadWidth: '15 feet',
      features: ['Good Access', 'Well Planned', 'Peaceful'],
      basePricePerSqYd: { min: 6000, max: 7000 },
      recommendedArea: { min: 80, max: 200 },
      status: 'available',
      polygon: '1255,340 1437,337 1442,1082 1255,1074'
    },
    {
      id: 'zone-8',
      name: 'Zone 8 - Column 6',
      description: 'Sixth column in middle section',
      facing: 'East',
      roadWidth: '15 feet',
      features: ['Good Access', 'Corner Benefits', 'Peaceful'],
      basePricePerSqYd: { min: 6000, max: 7000 },
      recommendedArea: { min: 80, max: 200 },
      status: 'available',
      polygon: '1437,337 1609,334 1624,1071 1445,1074'
    },
    {
      id: 'zone-9',
      name: 'Zone 9 - Bottom Large Area',
      description: 'Spacious bottom section perfect for large requirements',
      facing: 'South',
      roadWidth: '25 feet',
      features: ['Extra Wide Road', 'Large Area', 'Flexible Size', 'Bulk Discount'],
      basePricePerSqYd: { min: 5500, max: 6500 },
      recommendedArea: { min: 150, max: 500 },
      status: 'available',
      polygon: '453,1165 1615,1167 1618,1366 445,1394'
    },
    {
      id: 'zone-10',
      name: 'Zone 10 - Top Right Corner',
      description: 'Premium corner location with excellent visibility',
      facing: 'North-East',
      roadWidth: '15 feet',
      features: ['Corner Plot', 'High Visibility', 'Premium Location'],
      basePricePerSqYd: { min: 7000, max: 8000 },
      recommendedArea: { min: 100, max: 250 },
      status: 'available',
      polygon: '1697,108 2026,96 2032,232 1700,235'
    },
    {
      id: 'zone-11',
      name: 'Zone 11 - Right Side Upper',
      description: 'Right side location with narrow path access',
      facing: 'East',
      roadWidth: 'Narrow Path',
      features: ['Peaceful', 'Chakwarg Path', 'Budget Friendly'],
      basePricePerSqYd: { min: 5000, max: 6000 },
      recommendedArea: { min: 100, max: 250 },
      status: 'available',
      polygon: '1689,295 1864,295 1879,1142 1706,1233'
    },
    {
      id: 'zone-12',
      name: 'Zone 12 - Main Road Frontage',
      description: 'Premium location on Nadeli Bahapur main road with commercial potential',
      facing: 'South-East',
      roadWidth: 'Main Road',
      features: ['Main Road', 'High Visibility', 'Commercial Potential', 'Premium'],
      basePricePerSqYd: { min: 7500, max: 8000 },
      recommendedArea: { min: 100, max: 300 },
      status: 'partially-booked',
      polygon: '1859,292 2029,286 2040,1040 1867,1145'
    }
  ]

  // Load zones from Firebase
  useEffect(() => {
    loadZones()
  }, [])

  // Filter zones
  useEffect(() => {
    let filtered = zones

    if (searchTerm) {
      filtered = filtered.filter(zone => 
        zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        zone.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(zone => zone.status === statusFilter)
    }

    setFilteredZones(filtered)
  }, [zones, searchTerm, statusFilter])

  // Calculate stats
  useEffect(() => {
    const newStats = {
      total: zones.length,
      available: zones.filter(z => z.status === 'available').length,
      partiallyBooked: zones.filter(z => z.status === 'partially-booked').length,
      sold: zones.filter(z => z.status === 'sold').length
    }
    setStats(newStats)
  }, [zones])

  const loadZones = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'zones'))
      if (querySnapshot.empty) {
        // Initialize with default zones
        setZones(defaultZones)
      } else {
        const zonesData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
        setZones(zonesData)
      }
    } catch (error) {
      console.error('Error loading zones:', error)
      setZones(defaultZones)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveZone = async () => {
    try {
      const zoneRef = doc(db, 'zones', editingZone.id)
      await setDoc(zoneRef, {
        ...editingZone,
        updatedAt: new Date()
      })
      
      // Update local state
      setZones(zones.map(z => z.id === editingZone.id ? editingZone : z))
      setEditingZone(null)
      
      alert('✅ Zone updated successfully!')
    } catch (error) {
      console.error('Error updating zone:', error)
      alert('❌ Error updating zone!')
    }
  }

  const handleSyncAllZones = async () => {
    if (!confirm('Sync all zones to Firebase? This will overwrite existing data.')) return
    
    try {
      for (const zone of defaultZones) {
        const zoneRef = doc(db, 'zones', zone.id)
        await setDoc(zoneRef, {
          ...zone,
          updatedAt: new Date()
        })
      }
      
      await loadZones()
      alert('✅ All zones synced successfully!')
    } catch (error) {
      console.error('Error syncing zones:', error)
      alert('❌ Error syncing zones!')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700 border-green-200'
      case 'partially-booked': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'sold': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'उपलब्ध'
      case 'partially-booked': return 'आंशिक बुक'
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
                <p className="text-sm text-charcoal/60">कुल ज़ोन</p>
                <p className="text-3xl font-bold text-charcoal">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Layers className="text-blue-600" size={24} />
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
                <p className="text-sm text-charcoal/60">आंशिक बुक</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.partiallyBooked}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <DollarSign className="text-yellow-600" size={24} />
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
                <X className="text-red-600" size={24} />
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
                  placeholder="ज़ोन खोजें..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
                />
              </div>

              {/* Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none appearance-none bg-white"
              >
                <option value="all">सभी स्थिति</option>
                <option value="available">उपलब्ध</option>
                <option value="partially-booked">आंशिक बुक</option>
                <option value="sold">बिक गया</option>
              </select>
            </div>

            <button
              onClick={handleSyncAllZones}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all"
            >
              <RefreshCw size={20} />
              सभी ज़ोन सिंक करें
            </button>
          </div>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredZones.map((zone, index) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-charcoal text-lg mb-1">{zone.name}</h3>
                  <p className="text-sm text-charcoal/60">{zone.description}</p>
                </div>
                <button
                  onClick={() => setEditingZone({ ...zone })}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all"
                >
                  <Edit3 size={16} />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-charcoal/70">दिशा:</span>
                  <span className="font-semibold text-charcoal">{zone.facing}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-charcoal/70">रोड:</span>
                  <span className="font-semibold text-charcoal">{zone.roadWidth}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-charcoal/70">मूल्य रेंज:</span>
                  <span className="font-semibold text-saffron">
                    ₹{zone.basePricePerSqYd.min.toLocaleString()}-{zone.basePricePerSqYd.max.toLocaleString()}/sq yd
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-charcoal/70">क्षेत्रफल रेंज:</span>
                  <span className="font-semibold text-charcoal">
                    {zone.recommendedArea.min}-{zone.recommendedArea.max} sq yd
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {zone.features.map((feature, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-charcoal px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>

              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(zone.status)}`}>
                  {getStatusText(zone.status)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredZones.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-charcoal/50">कोई ज़ोन नहीं मिला</p>
          </div>
        )}
      </div>

      {/* Edit Zone Modal */}
      {editingZone && (
        <EditZoneModal
          zone={editingZone}
          onSave={handleSaveZone}
          onCancel={() => setEditingZone(null)}
          onChange={setEditingZone}
        />
      )}
    </div>
  )
}

// Edit Zone Modal Component
const EditZoneModal = ({ zone, onSave, onCancel, onChange }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl my-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-display font-bold text-charcoal">
            Edit Zone
          </h3>
          <button
            onClick={onCancel}
            className="text-charcoal/40 hover:text-charcoal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <label className="block text-charcoal font-semibold mb-2">Zone Name</label>
            <input
              type="text"
              value={zone.name}
              onChange={(e) => onChange({ ...zone, name: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
            />
          </div>

          <div>
            <label className="block text-charcoal font-semibold mb-2">Description</label>
            <textarea
              value={zone.description}
              onChange={(e) => onChange({ ...zone, description: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
              rows="2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-charcoal font-semibold mb-2">Facing</label>
              <input
                type="text"
                value={zone.facing}
                onChange={(e) => onChange({ ...zone, facing: e.target.value })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
              />
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-2">Road Width</label>
              <input
                type="text"
                value={zone.roadWidth}
                onChange={(e) => onChange({ ...zone, roadWidth: e.target.value })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-charcoal font-semibold mb-2">Min Price (₹/sq yd)</label>
              <input
                type="number"
                value={zone.basePricePerSqYd.min}
                onChange={(e) => onChange({ 
                  ...zone, 
                  basePricePerSqYd: { ...zone.basePricePerSqYd, min: parseInt(e.target.value) }
                })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
              />
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-2">Max Price (₹/sq yd)</label>
              <input
                type="number"
                value={zone.basePricePerSqYd.max}
                onChange={(e) => onChange({ 
                  ...zone, 
                  basePricePerSqYd: { ...zone.basePricePerSqYd, max: parseInt(e.target.value) }
                })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-charcoal font-semibold mb-2">Min Area (sq yd)</label>
              <input
                type="number"
                value={zone.recommendedArea.min}
                onChange={(e) => onChange({ 
                  ...zone, 
                  recommendedArea: { ...zone.recommendedArea, min: parseInt(e.target.value) }
                })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
              />
            </div>

            <div>
              <label className="block text-charcoal font-semibold mb-2">Max Area (sq yd)</label>
              <input
                type="number"
                value={zone.recommendedArea.max}
                onChange={(e) => onChange({ 
                  ...zone, 
                  recommendedArea: { ...zone.recommendedArea, max: parseInt(e.target.value) }
                })}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-charcoal font-semibold mb-2">Status</label>
            <select
              value={zone.status}
              onChange={(e) => onChange({ ...zone, status: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
            >
              <option value="available">Available</option>
              <option value="partially-booked">Partially Booked</option>
              <option value="sold">Sold Out</option>
            </select>
          </div>

          <div>
            <label className="block text-charcoal font-semibold mb-2">Features (comma separated)</label>
            <input
              type="text"
              value={zone.features.join(', ')}
              onChange={(e) => onChange({ ...zone, features: e.target.value.split(',').map(f => f.trim()) })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none"
              placeholder="Feature 1, Feature 2, Feature 3"
            />
          </div>

          <div>
            <label className="block text-charcoal font-semibold mb-2">Polygon Coordinates</label>
            <textarea
              value={zone.polygon}
              onChange={(e) => onChange({ ...zone, polygon: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-saffron outline-none font-mono text-sm"
              rows="2"
              placeholder="x1,y1 x2,y2 x3,y3 x4,y4"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-charcoal py-3 rounded-lg font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="flex-1 bg-saffron hover:bg-gold text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminDashboard
