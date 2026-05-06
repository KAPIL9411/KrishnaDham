import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { plotData } from '../data/plotData'
import { Download } from 'lucide-react'

const ImageBasedPlotMap = () => {
  const [selectedPlot, setSelectedPlot] = useState(null)

  // PRECISE Plot coordinates mapped from the actual sitemap image
  const plotCoordinates = {
    // Left column (15-28) - Single vertical column
    15: { x: 7.5, y: 79, width: 3.5, height: 4.5 },
    16: { x: 7.5, y: 74, width: 3.5, height: 4.5 },
    17: { x: 7.5, y: 69, width: 3.5, height: 4.5 },
    18: { x: 7.5, y: 64, width: 3.5, height: 4.5 },
    19: { x: 7.5, y: 59, width: 3.5, height: 4.5 },
    20: { x: 7.5, y: 54, width: 3.5, height: 4.5 },
    21: { x: 7.5, y: 49, width: 3.5, height: 4.5 },
    22: { x: 7.5, y: 44, width: 3.5, height: 4.5 },
    23: { x: 7.5, y: 39, width: 3.5, height: 4.5 },
    24: { x: 7.5, y: 34, width: 3.5, height: 4.5 },
    25: { x: 7.5, y: 29, width: 3.5, height: 4.5 },
    26: { x: 7.5, y: 24, width: 3.5, height: 4.5 },
    27: { x: 7.5, y: 19, width: 3.5, height: 4.5 },
    28: { x: 7.5, y: 8, width: 3.5, height: 10 },

    // Second block left (29-38)
    29: { x: 16, y: 8, width: 4.5, height: 5 },
    30: { x: 16, y: 14, width: 4.5, height: 5 },
    31: { x: 16, y: 20, width: 4.5, height: 5 },
    32: { x: 16, y: 26, width: 4.5, height: 5 },
    33: { x: 16, y: 32, width: 4.5, height: 5 },
    34: { x: 16, y: 38, width: 4.5, height: 5 },
    35: { x: 16, y: 44, width: 4.5, height: 5 },
    36: { x: 16, y: 50, width: 4.5, height: 5 },
    37: { x: 16, y: 56, width: 4.5, height: 5 },
    38: { x: 16, y: 62, width: 4.5, height: 5 },

    // Second block right (30, 39-48)
    30: { x: 22, y: 62, width: 4.5, height: 5 },
    39: { x: 22, y: 68, width: 4.5, height: 5 },
    41: { x: 22, y: 56, width: 4.5, height: 5 },
    42: { x: 22, y: 50, width: 4.5, height: 5 },
    43: { x: 22, y: 44, width: 4.5, height: 5 },
    44: { x: 22, y: 38, width: 4.5, height: 5 },
    45: { x: 22, y: 32, width: 4.5, height: 5 },
    46: { x: 22, y: 26, width: 4.5, height: 5 },
    47: { x: 22, y: 20, width: 4.5, height: 5 },
    48: { x: 22, y: 8, width: 4.5, height: 11 },

    // Third block left (48-60)
    48: { x: 31.5, y: 8, width: 4.5, height: 5 },
    49: { x: 31.5, y: 14, width: 4.5, height: 5 },
    50: { x: 31.5, y: 20, width: 4.5, height: 5 },
    51: { x: 31.5, y: 26, width: 4.5, height: 5 },
    53: { x: 31.5, y: 32, width: 4.5, height: 5 },
    54: { x: 31.5, y: 38, width: 4.5, height: 5 },
    55: { x: 31.5, y: 44, width: 4.5, height: 5 },
    56: { x: 31.5, y: 50, width: 4.5, height: 5 },
    57: { x: 31.5, y: 56, width: 4.5, height: 5 },
    58: { x: 31.5, y: 62, width: 4.5, height: 5 },
    59: { x: 31.5, y: 68, width: 4.5, height: 5 },
    60: { x: 31.5, y: 74, width: 4.5, height: 5 },

    // Third block right (61-72)
    61: { x: 37.5, y: 74, width: 4.5, height: 5 },
    62: { x: 37.5, y: 68, width: 4.5, height: 5 },
    63: { x: 37.5, y: 62, width: 4.5, height: 5 },
    64: { x: 37.5, y: 56, width: 4.5, height: 5 },
    65: { x: 37.5, y: 50, width: 4.5, height: 5 },
    66: { x: 37.5, y: 44, width: 4.5, height: 5 },
    67: { x: 37.5, y: 38, width: 4.5, height: 5 },
    68: { x: 37.5, y: 32, width: 4.5, height: 5 },
    69: { x: 37.5, y: 26, width: 4.5, height: 5 },
    70: { x: 37.5, y: 20, width: 4.5, height: 5 },
    71: { x: 37.5, y: 14, width: 4.5, height: 5 },
    72: { x: 37.5, y: 8, width: 4.5, height: 5 },

    // Fourth block left (74-82)
    74: { x: 52, y: 14, width: 4.5, height: 5 },
    75: { x: 52, y: 20, width: 4.5, height: 5 },
    76: { x: 52, y: 26, width: 4.5, height: 5 },
    77: { x: 52, y: 32, width: 4.5, height: 5 },
    78: { x: 52, y: 38, width: 4.5, height: 5 },
    79: { x: 52, y: 44, width: 4.5, height: 5 },
    80: { x: 52, y: 50, width: 4.5, height: 5 },
    81: { x: 52, y: 56, width: 4.5, height: 5 },
    82: { x: 52, y: 62, width: 4.5, height: 5 },

    // Fourth block right (81, 84-92)
    81: { x: 58, y: 68, width: 4.5, height: 5 },
    84: { x: 58, y: 62, width: 4.5, height: 5 },
    85: { x: 58, y: 56, width: 4.5, height: 5 },
    86: { x: 58, y: 50, width: 4.5, height: 5 },
    87: { x: 58, y: 44, width: 4.5, height: 5 },
    88: { x: 58, y: 38, width: 4.5, height: 5 },
    90: { x: 58, y: 26, width: 4.5, height: 5 },
    91: { x: 58, y: 20, width: 4.5, height: 5 },
    92: { x: 58, y: 8, width: 4.5, height: 11 },

    // Right section top (93-95, 25)
    93: { x: 68, y: 8, width: 4.5, height: 5 },
    94: { x: 73.5, y: 8, width: 4.5, height: 5 },
    25: { x: 79, y: 8, width: 4.5, height: 5 },
    95: { x: 84.5, y: 8, width: 4.5, height: 5 },

    // Right section (97-100)
    100: { x: 68, y: 20, width: 4.5, height: 5 },
    99: { x: 73.5, y: 20, width: 4.5, height: 5 },
    98: { x: 79, y: 20, width: 4.5, height: 5 },
    97: { x: 84.5, y: 20, width: 4.5, height: 5 },

    // Right section double column left (101-109)
    101: { x: 68, y: 26, width: 4.5, height: 5 },
    102: { x: 68, y: 32, width: 4.5, height: 5 },
    103: { x: 68, y: 38, width: 4.5, height: 5 },
    104: { x: 68, y: 44, width: 4.5, height: 5 },
    105: { x: 68, y: 50, width: 4.5, height: 5 },
    106: { x: 68, y: 56, width: 4.5, height: 5 },
    107: { x: 68, y: 62, width: 4.5, height: 5 },
    109: { x: 68, y: 74, width: 4.5, height: 5 },

    // Right section double column right (110-116)
    116: { x: 73.5, y: 26, width: 4.5, height: 5 },
    115: { x: 73.5, y: 32, width: 4.5, height: 5 },
    114: { x: 73.5, y: 38, width: 4.5, height: 5 },
    113: { x: 73.5, y: 44, width: 4.5, height: 5 },
    112: { x: 73.5, y: 50, width: 4.5, height: 5 },
    111: { x: 73.5, y: 56, width: 4.5, height: 5 },
    110: { x: 73.5, y: 62, width: 4.5, height: 5 },

    // Bottom row (11-20, 91, 102, 107, 110)
    11: { x: 15, y: 84, width: 3.5, height: 4 },
    12: { x: 19.5, y: 84, width: 3.5, height: 4 },
    13: { x: 24, y: 84, width: 3.5, height: 4 },
    14: { x: 28.5, y: 84, width: 3.5, height: 4 },
    15: { x: 33, y: 84, width: 3.5, height: 4 },
    16: { x: 37.5, y: 84, width: 3.5, height: 4 },
    17: { x: 42, y: 84, width: 3.5, height: 4 },
    18: { x: 46.5, y: 84, width: 3.5, height: 4 },
    19: { x: 51, y: 84, width: 3.5, height: 4 },
    20: { x: 55.5, y: 84, width: 3.5, height: 4 },
    91: { x: 60, y: 84, width: 3.5, height: 4 },
    102: { x: 64.5, y: 84, width: 3.5, height: 4 },
    107: { x: 69, y: 84, width: 3.5, height: 4 },
    110: { x: 73.5, y: 84, width: 3.5, height: 4 },
  }

  const handlePlotClick = (plotNumber) => {
    const plot = plotData.find(p => p.number === plotNumber.toString())
    if (plot) {
      setSelectedPlot(plot)
    }
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
            विवरण देखने के लिए किसी भी प्लॉट पर क्लिक करें
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

        {/* Interactive Image Map */}
        <div className="relative max-w-6xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="/sitemap.png" 
            alt="Colony Layout" 
            className="w-full h-auto"
          />
          
          {/* SVG Overlay for clickable areas */}
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {Object.entries(plotCoordinates).map(([plotNum, coords]) => {
              const plot = plotData.find(p => p.number === plotNum.toString())
              if (!plot) return null

              const fillColor = 
                plot.status === 'available' ? 'rgba(74, 222, 128, 0.3)' :
                plot.status === 'booked' ? 'rgba(251, 191, 36, 0.3)' :
                'rgba(239, 68, 68, 0.3)'

              return (
                <rect
                  key={plotNum}
                  x={`${coords.x}%`}
                  y={`${coords.y}%`}
                  width={`${coords.width}%`}
                  height={`${coords.height}%`}
                  fill={fillColor}
                  stroke="white"
                  strokeWidth="0.3"
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => handlePlotClick(plotNum)}
                />
              )
            })}
          </svg>
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

export default ImageBasedPlotMap
