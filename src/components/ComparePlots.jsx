import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { plotData } from '../data/plotData'
import { GitCompare, X, Check, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'

const ComparePlots = () => {
  const [selectedPlots, setSelectedPlots] = useState([])
  const [showComparison, setShowComparison] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const availablePlots = plotData.filter(p => p.status === 'available')

  const togglePlot = (plot) => {
    if (selectedPlots.find(p => p.id === plot.id)) {
      setSelectedPlots(selectedPlots.filter(p => p.id !== plot.id))
    } else if (selectedPlots.length < 3) {
      setSelectedPlots([...selectedPlots, plot])
    }
  }

  const clearSelection = () => {
    setSelectedPlots([])
    setShowComparison(false)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      // Reset states when expanding
      setSelectedPlots([])
      setShowComparison(false)
    }
  }

  const getRecommendation = () => {
    if (selectedPlots.length === 0) return null
    
    // Find best value (lowest price per sq yd)
    const plotsWithValue = selectedPlots.map(plot => {
      const areaNum = parseInt(plot.area)
      const pricePerSqYd = plot.price / areaNum
      return { ...plot, pricePerSqYd }
    })
    
    const bestValue = plotsWithValue.reduce((prev, current) => 
      prev.pricePerSqYd < current.pricePerSqYd ? prev : current
    )
    
    return bestValue
  }

  const recommendation = getRecommendation()

  return (
    <section id="compare-plots" className="py-12 md:py-20 bg-ivory w-full overflow-x-hidden">
      <div className="container mx-auto px-4 w-full max-w-full">
        {/* Collapsible Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <button
            onClick={toggleExpanded}
            className="group w-full max-w-4xl mx-auto bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-saffron/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="bg-saffron/10 p-3 md:p-4 rounded-full">
                  <GitCompare className="text-saffron" size={32} />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal mb-2">
                    प्लॉट्स की तुलना करें
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-charcoal/70">
                    3 प्लॉट तक compare करें और सबसे अच्छा चुनें
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                {isExpanded ? (
                  <ChevronUp size={32} className="text-saffron group-hover:scale-110 transition-transform" />
                ) : (
                  <ChevronDown size={32} className="text-saffron group-hover:scale-110 transition-transform" />
                )}
              </div>
            </div>
            
            {!isExpanded && (
              <div className="mt-4 text-center">
                <span className="inline-block bg-saffron/10 text-saffron px-4 py-2 rounded-full text-sm font-semibold">
                  क्लिक करें तुलना शुरू करने के लिए
                </span>
              </div>
            )}
          </button>
        </motion.div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {/* Selection Bar */}
              <div className="max-w-4xl mx-auto mb-6 md:mb-8">
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <GitCompare className="text-saffron" size={24} />
                      <h3 className="text-lg md:text-xl font-display font-bold text-charcoal">
                        Selected: {selectedPlots.length}/3
                      </h3>
                    </div>
                    {selectedPlots.length > 0 && (
                      <button
                        onClick={clearSelection}
                        className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-2 text-sm md:text-base"
                      >
                        <X size={18} />
                        Clear All
                      </button>
                    )}
                  </div>

                  {selectedPlots.length > 0 ? (
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
                      {selectedPlots.map(plot => (
                        <div
                          key={plot.id}
                          className="bg-saffron/10 border-2 border-saffron rounded-full px-3 md:px-4 py-1 md:py-2 flex items-center gap-2"
                        >
                          <span className="font-semibold text-charcoal text-sm md:text-base">Plot #{plot.number}</span>
                          <button
                            onClick={() => togglePlot(plot)}
                            className="text-saffron hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-charcoal/60 text-center py-4 text-sm md:text-base">
                      नीचे से प्लॉट select करें (maximum 3)
                    </p>
                  )}

                  {selectedPlots.length >= 2 && (
                    <button
                      onClick={() => setShowComparison(true)}
                      className="w-full bg-saffron hover:bg-gold text-white px-4 md:px-6 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      <GitCompare size={18} />
                      Compare Now
                    </button>
                  )}
                </div>
              </div>

              {/* Plot Selection Grid */}
              {!showComparison && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 mb-6 md:mb-8">
                  {availablePlots.slice(0, 30).map((plot) => {
                    const isSelected = selectedPlots.find(p => p.id === plot.id)
                    return (
                      <motion.button
                        key={plot.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => togglePlot(plot)}
                        disabled={!isSelected && selectedPlots.length >= 3}
                        className={`p-3 md:p-4 rounded-lg md:rounded-xl shadow-lg font-semibold transition-all relative ${
                          isSelected
                            ? 'bg-saffron text-white ring-4 ring-saffron/50'
                            : 'bg-white text-charcoal hover:bg-gray-50'
                        } ${!isSelected && selectedPlots.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-green-500 text-white rounded-full p-1">
                            <Check size={12} />
                          </div>
                        )}
                        <div className="text-lg md:text-2xl font-display mb-1">{plot.number}</div>
                        <div className="text-xs opacity-90">{plot.area}</div>
                        <div className="text-xs font-bold mt-1">
                          ₹{(plot.price / 100000).toFixed(1)}L
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              )}

              {/* Comparison Table */}
              {showComparison && selectedPlots.length >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-6xl mx-auto"
                >
                  <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-saffron to-gold p-4 md:p-6 text-white flex items-center justify-between">
                      <h3 className="text-lg md:text-2xl font-display font-bold">Comparison Results</h3>
                      <button
                        onClick={() => setShowComparison(false)}
                        className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 md:px-6 py-3 md:py-4 text-left text-charcoal font-semibold text-sm md:text-base">Feature</th>
                            {selectedPlots.map(plot => (
                              <th key={plot.id} className="px-3 md:px-6 py-3 md:py-4 text-center">
                                <div className="font-display font-bold text-lg md:text-2xl text-saffron mb-1">
                                  #{plot.number}
                                </div>
                                {recommendation?.id === plot.id && (
                                  <span className="inline-block bg-green-500 text-white text-xs px-2 md:px-3 py-1 rounded-full">
                                    ⭐ Best Value
                                  </span>
                                )}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {/* Area */}
                          <tr className="hover:bg-gray-50">
                            <td className="px-3 md:px-6 py-3 md:py-4 font-semibold text-charcoal text-sm md:text-base">क्षेत्रफल</td>
                            {selectedPlots.map(plot => (
                              <td key={plot.id} className="px-3 md:px-6 py-3 md:py-4 text-center text-charcoal text-sm md:text-base">
                                {plot.area}
                              </td>
                            ))}
                          </tr>

                          {/* Price */}
                          <tr className="hover:bg-gray-50">
                            <td className="px-3 md:px-6 py-3 md:py-4 font-semibold text-charcoal text-sm md:text-base">कुल मूल्य</td>
                            {selectedPlots.map(plot => (
                              <td key={plot.id} className="px-3 md:px-6 py-3 md:py-4 text-center">
                                <span className="text-saffron font-bold text-sm md:text-lg">
                                  ₹{(plot.price / 100000).toFixed(2)}L
                                </span>
                              </td>
                            ))}
                          </tr>

                          {/* Price per sq yd */}
                          <tr className="hover:bg-gray-50">
                            <td className="px-3 md:px-6 py-3 md:py-4 font-semibold text-charcoal text-sm md:text-base">प्रति sq yd</td>
                            {selectedPlots.map(plot => {
                              const areaNum = parseInt(plot.area)
                              const pricePerSqYd = Math.round(plot.price / areaNum)
                              return (
                                <td key={plot.id} className="px-3 md:px-6 py-3 md:py-4 text-center text-charcoal text-sm md:text-base">
                                  ₹{pricePerSqYd.toLocaleString('en-IN')}
                                </td>
                              )
                            })}
                          </tr>

                          {/* Facing */}
                          <tr className="hover:bg-gray-50">
                            <td className="px-3 md:px-6 py-3 md:py-4 font-semibold text-charcoal text-sm md:text-base">दिशा</td>
                            {selectedPlots.map(plot => (
                              <td key={plot.id} className="px-3 md:px-6 py-3 md:py-4 text-center text-charcoal text-sm md:text-base">
                                {plot.facing}
                              </td>
                            ))}
                          </tr>

                          {/* Status */}
                          <tr className="hover:bg-gray-50">
                            <td className="px-3 md:px-6 py-3 md:py-4 font-semibold text-charcoal text-sm md:text-base">स्थिति</td>
                            {selectedPlots.map(plot => (
                              <td key={plot.id} className="px-3 md:px-6 py-3 md:py-4 text-center">
                                <span className="inline-block bg-green-100 text-green-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                                  <Check size={12} className="inline mr-1" />
                                  उपलब्ध
                                </span>
                              </td>
                            ))}
                          </tr>

                          {/* Action */}
                          <tr className="bg-gray-50">
                            <td className="px-3 md:px-6 py-3 md:py-4 font-semibold text-charcoal text-sm md:text-base">Action</td>
                            {selectedPlots.map(plot => (
                              <td key={plot.id} className="px-3 md:px-6 py-3 md:py-4 text-center">
                                <a
                                  href={`https://wa.me/919876543210?text=नमस्ते, मुझे प्लॉट ${plot.number} में रुचि है`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 md:gap-2 bg-green-500 hover:bg-green-600 text-white px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all"
                                >
                                  Book Now
                                  <ArrowRight size={14} />
                                </a>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Recommendation */}
                    {recommendation && (
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 md:p-6 border-t-2 border-green-200">
                        <h4 className="text-lg md:text-xl font-display font-bold text-charcoal mb-2 flex items-center gap-2">
                          💡 हमारी सिफारिश
                        </h4>
                        <p className="text-charcoal/70 text-sm md:text-base">
                          <strong className="text-saffron">Plot #{recommendation.number}</strong> सबसे अच्छा value for money है।
                          प्रति sq yd सिर्फ <strong>₹{Math.round(recommendation.pricePerSqYd).toLocaleString('en-IN')}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ComparePlots