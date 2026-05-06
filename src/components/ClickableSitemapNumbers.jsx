import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { plotData } from '../data/plotData'
import { Download } from 'lucide-react'

const ClickableSitemapNumbers = () => {
  const [selectedPlot, setSelectedPlot] = useState(null)
  const [hoveredPlot, setHoveredPlot] = useState(null)

  const handlePlotClick = (plotNumber) => {
    const plot = plotData.find(p => p.number === plotNumber.toString())
    if (plot) {
      setSelectedPlot(plot)
    }
  }

  // PRECISE Plot number positions based on careful analysis of sitemap
  // Coordinates are percentage-based (x%, y%) matching exact number locations
  const plotNumberPositions = {
    // Left column (15-28) - Single vertical column on far left
    '28': { x: 9.2, y: 7.5 },
    '27': { x: 9.2, y: 11.5 },
    '26': { x: 9.2, y: 15.5 },
    '25': { x: 9.2, y: 19.5 },
    '24': { x: 9.2, y: 23.5 },
    '23': { x: 9.2, y: 27.5 },
    '22': { x: 9.2, y: 31.5 },
    '21': { x: 9.2, y: 35.5 },
    '20': { x: 9.2, y: 39.5 },
    '19': { x: 9.2, y: 43.5 },
    '18': { x: 9.2, y: 47.5 },
    '17': { x: 9.2, y: 51.5 },
    '16': { x: 9.2, y: 55.5 },
    '15': { x: 9.2, y: 59.5 },

    // Second block left (29-38)
    '29': { x: 17.5, y: 7.5 },
    '30': { x: 17.5, y: 11.5 },
    '31': { x: 17.5, y: 15.5 },
    '32': { x: 17.5, y: 19.5 },
    '33': { x: 17.5, y: 23.5 },
    '34': { x: 17.5, y: 27.5 },
    '35': { x: 17.5, y: 31.5 },
    '36': { x: 17.5, y: 35.5 },
    '37': { x: 17.5, y: 39.5 },
    '38': { x: 17.5, y: 43.5 },

    // Second block right (30, 39-48)
    '48': { x: 25.5, y: 7.5 },
    '47': { x: 25.5, y: 11.5 },
    '46': { x: 25.5, y: 15.5 },
    '45': { x: 25.5, y: 19.5 },
    '44': { x: 25.5, y: 23.5 },
    '43': { x: 25.5, y: 27.5 },
    '42': { x: 25.5, y: 31.5 },
    '41': { x: 25.5, y: 35.5 },
    '30': { x: 25.5, y: 43.5 },
    '39': { x: 25.5, y: 47.5 },

    // Third block left (48-60)
    '48': { x: 33.8, y: 7.5 },
    '49': { x: 33.8, y: 11.5 },
    '50': { x: 33.8, y: 15.5 },
    '51': { x: 33.8, y: 19.5 },
    '53': { x: 33.8, y: 23.5 },
    '54': { x: 33.8, y: 27.5 },
    '55': { x: 33.8, y: 31.5 },
    '56': { x: 33.8, y: 35.5 },
    '57': { x: 33.8, y: 39.5 },
    '58': { x: 33.8, y: 43.5 },
    '59': { x: 33.8, y: 47.5 },
    '60': { x: 33.8, y: 51.5 },

    // Third block right (61-72)
    '72': { x: 41.8, y: 7.5 },
    '71': { x: 41.8, y: 11.5 },
    '70': { x: 41.8, y: 15.5 },
    '69': { x: 41.8, y: 19.5 },
    '68': { x: 41.8, y: 23.5 },
    '67': { x: 41.8, y: 27.5 },
    '66': { x: 41.8, y: 31.5 },
    '65': { x: 41.8, y: 35.5 },
    '64': { x: 41.8, y: 39.5 },
    '63': { x: 41.8, y: 43.5 },
    '62': { x: 41.8, y: 47.5 },
    '61': { x: 41.8, y: 51.5 },

    // Fourth block left (74-82)
    '74': { x: 54.5, y: 11.5 },
    '75': { x: 54.5, y: 15.5 },
    '76': { x: 54.5, y: 19.5 },
    '77': { x: 54.5, y: 23.5 },
    '78': { x: 54.5, y: 27.5 },
    '79': { x: 54.5, y: 31.5 },
    '80': { x: 54.5, y: 35.5 },
    '81': { x: 54.5, y: 39.5 },
    '82': { x: 54.5, y: 43.5 },

    // Fourth block right (81, 84-92)
    '92': { x: 62.5, y: 7.5 },
    '91': { x: 62.5, y: 11.5 },
    '90': { x: 62.5, y: 19.5 },
    '84': { x: 62.5, y: 23.5 },
    '88': { x: 62.5, y: 27.5 },
    '87': { x: 62.5, y: 31.5 },
    '86': { x: 62.5, y: 35.5 },
    '85': { x: 62.5, y: 39.5 },
    '81': { x: 62.5, y: 47.5 },

    // Right section top (93-95, 25)
    '93': { x: 70.5, y: 7.5 },
    '94': { x: 75.8, y: 7.5 },
    '25': { x: 81.2, y: 7.5 },
    '95': { x: 86.5, y: 7.5 },

    // Right section (97-100) - Below Road 15-0' Wide
    '100': { x: 70.5, y: 15.5 },
    '99': { x: 75.8, y: 15.5 },
    '98': { x: 81.2, y: 15.5 },
    '97': { x: 86.5, y: 15.5 },

    // Right section double column left (101-109)
    '101': { x: 70.5, y: 19.5 },
    '102': { x: 70.5, y: 23.5 },
    '103': { x: 70.5, y: 27.5 },
    '104': { x: 70.5, y: 31.5 },
    '105': { x: 70.5, y: 35.5 },
    '106': { x: 70.5, y: 39.5 },
    '107': { x: 70.5, y: 43.5 },
    '109': { x: 70.5, y: 51.5 },

    // Right section double column right (110-116)
    '116': { x: 75.8, y: 19.5 },
    '115': { x: 75.8, y: 23.5 },
    '114': { x: 75.8, y: 27.5 },
    '113': { x: 75.8, y: 31.5 },
    '112': { x: 75.8, y: 35.5 },
    '111': { x: 75.8, y: 39.5 },
    '110': { x: 75.8, y: 43.5 },

    // Bottom row (11-20, 91, 102, 107, 110)
    '11': { x: 15.5, y: 63.5 },
    '12': { x: 19.5, y: 63.5 },
    '13': { x: 23.5, y: 63.5 },
    '14': { x: 27.5, y: 63.5 },
    '15': { x: 31.5, y: 63.5 },
    '16': { x: 35.5, y: 63.5 },
    '17': { x: 39.5, y: 63.5 },
    '18': { x: 43.5, y: 63.5 },
    '19': { x: 47.5, y: 63.5 },
    '20': { x: 51.5, y: 63.5 },
    '91': { x: 55.5, y: 63.5 },
    '102': { x: 59.5, y: 63.5 },
    '107': { x: 63.5, y: 63.5 },
    '110': { x: 67.5, y: 63.5 },
  }

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
            विवरण देखने के लिए प्लॉट नंबर पर क्लिक करें
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mb-8 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded border-2 border-white"></div>
            <span className="text-sm font-semibold">उपलब्ध</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-500 rounded border-2 border-white"></div>
            <span className="text-sm font-semibold">बुक किया गया</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded border-2 border-white"></div>
            <span className="text-sm font-semibold">बिक गया</span>
          </div>
        </div>

        {/* Interactive Sitemap with Clickable Numbers */}
        <div className="relative max-w-6xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <img 
            src="/sitemap.png" 
            alt="Colony Layout" 
            className="w-full h-auto"
          />
          
          {/* Clickable Plot Numbers Overlay */}
          <div className="absolute inset-0">
            {Object.entries(plotNumberPositions).map(([plotNum, pos]) => {
              const plot = plotData.find(p => p.number === plotNum.toString())
              if (!plot) return null

              const isHovered = hoveredPlot === plotNum

              return (
                <button
                  key={`${plotNum}-${pos.x}-${pos.y}`}
                  onClick={() => handlePlotClick(plotNum)}
                  onMouseEnter={() => setHoveredPlot(plotNum)}
                  onMouseLeave={() => setHoveredPlot(null)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                  }}
                >
                  <div className={`
                    relative flex items-center justify-center
                    w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12
                    rounded-full font-bold text-xs md:text-sm lg:text-base
                    transition-all duration-200 cursor-pointer
                    ${isHovered ? 'scale-150 z-50' : 'scale-100 z-10'}
                    ${plot.status === 'available' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : plot.status === 'booked'
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-red-500 hover:bg-red-600'
                    }
                    text-white shadow-lg hover:shadow-2xl
                    border-2 border-white
                  `}>
                    {plotNum}
                    
                    {/* Hover Tooltip */}
                    {isHovered && (
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white text-charcoal px-3 py-2 rounded-lg shadow-xl text-xs font-normal z-50">
                        <div className="font-bold">प्लॉट #{plotNum}</div>
                        <div className="text-xs">{plot.area}</div>
                        <div className="text-xs">₹{(plot.price / 100000).toFixed(2)} लाख</div>
                        <div className={`text-xs font-semibold ${
                          plot.status === 'available' ? 'text-green-600' :
                          plot.status === 'sold' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {plot.status === 'available' ? '✅ उपलब्ध' :
                           plot.status === 'sold' ? '❌ बिक गया' : '🟡 बुक किया गया'}
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mb-8">
          <p className="text-charcoal/70 text-lg">
            💡 प्लॉट नंबर पर क्लिक करें विस्तृत जानकारी के लिए
          </p>
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

export default ClickableSitemapNumbers
