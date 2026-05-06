import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { usePlots } from '../hooks/usePlots'
import { Filter, Download, Search } from 'lucide-react'

const InteractivePlotMap = () => {
  const { plots: plotData, getPlotStats } = usePlots()
  const [selectedPlot, setSelectedPlot] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  const stats = getPlotStats()

  const filteredPlots = plotData.filter(plot => {
    const matchesStatus = filterStatus === 'all' || plot.status === filterStatus
    const matchesSearch = plot.number.includes(searchTerm) || 
                         plot.area.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <section id="plot-map" className="py-20 bg-ivory">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-charcoal mb-4">
            इंटरएक्टिव प्लॉट मैप
          </h2>
          <p className="text-xl text-charcoal/70">
            विवरण और उपलब्धता देखने के लिए किसी भी प्लॉट पर क्लिक करें
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <p className="text-3xl font-display font-bold text-charcoal mb-2">{stats.total}</p>
            <p className="text-sm text-charcoal/70">कुल प्लॉट</p>
          </div>
          <div className="bg-green-50 rounded-xl p-6 shadow-lg text-center border-2 border-green-500">
            <p className="text-3xl font-display font-bold text-green-600 mb-2">{stats.available}</p>
            <p className="text-sm text-charcoal/70">उपलब्ध</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-6 shadow-lg text-center border-2 border-yellow-500">
            <p className="text-3xl font-display font-bold text-yellow-600 mb-2">{stats.booked}</p>
            <p className="text-sm text-charcoal/70">बुक किया गया</p>
          </div>
          <div className="bg-red-50 rounded-xl p-6 shadow-lg text-center border-2 border-red-500">
            <p className="text-3xl font-display font-bold text-red-600 mb-2">{stats.sold}</p>
            <p className="text-sm text-charcoal/70">बिक गया</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal/40" size={20} />
            <input
              type="text"
              placeholder="प्लॉट नंबर या आकार से खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-charcoal/20 focus:border-saffron outline-none"
            />
          </div>
          
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'सभी' },
              { value: 'available', label: 'उपलब्ध' },
              { value: 'booked', label: 'बुक किया गया' },
              { value: 'sold', label: 'बिक गया' }
            ].map((status) => (
              <button
                key={status.value}
                onClick={() => setFilterStatus(status.value)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  filterStatus === status.value
                    ? 'bg-saffron text-ivory'
                    : 'bg-white text-charcoal border-2 border-charcoal/20 hover:border-saffron'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plot Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {filteredPlots.map((plot) => (
            <motion.button
              key={plot.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPlot(plot)}
              className={`p-4 rounded-xl shadow-lg font-semibold transition-all ${
                plot.status === 'available'
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : plot.status === 'booked'
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              <div className="text-2xl font-display mb-1">{plot.number}</div>
              <div className="text-xs opacity-90">{plot.area}</div>
            </motion.button>
          ))}
        </div>

        {/* Download Button */}
        <div className="text-center">
          <button className="inline-flex items-center gap-2 bg-charcoal text-ivory px-8 py-4 rounded-full font-semibold hover:bg-charcoal/80 transition-all shadow-lg">
            <Download size={20} />
            लेआउट PDF डाउनलोड करें
          </button>
        </div>

        {/* Selected Plot Modal */}
        {selectedPlot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPlot(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-3xl font-display font-bold text-charcoal mb-4">
                प्लॉट #{selectedPlot.number}
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-charcoal/70">क्षेत्रफल:</span>
                  <span className="font-semibold text-charcoal">{selectedPlot.area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">दिशा:</span>
                  <span className="font-semibold text-charcoal">{selectedPlot.facing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">मूल्य:</span>
                  <span className="font-semibold text-saffron text-xl">
                    ₹{(selectedPlot.price / 100000).toFixed(2)} लाख
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">स्थिति:</span>
                  <span className={`font-semibold ${
                    selectedPlot.status === 'available' ? 'text-green-600' :
                    selectedPlot.status === 'sold' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {selectedPlot.status === 'available' ? '✅ उपलब्ध' :
                     selectedPlot.status === 'sold' ? '❌ बिक गया' : '🟡 बुक किया गया'}
                  </span>
                </div>
              </div>

              {selectedPlot.status === 'available' && (
                <a
                  href={`https://wa.me/919876543210?text=नमस्ते, मुझे श्री कृष्णा धाम कॉलोनी में प्लॉट ${selectedPlot.number} में रुचि है`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-saffron text-ivory text-center px-6 py-3 rounded-full font-semibold hover:bg-gold transition-all mb-3"
                >
                  WhatsApp पर पूछताछ करें
                </a>
              )}

              <button
                onClick={() => setSelectedPlot(null)}
                className="w-full bg-charcoal/10 text-charcoal px-6 py-3 rounded-full font-semibold hover:bg-charcoal/20 transition-all"
              >
                बंद करें
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default InteractivePlotMap
