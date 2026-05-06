import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { plotData } from '../data/plotData'
import { Download } from 'lucide-react'

const ImageMapPlot = () => {
  const [selectedPlot, setSelectedPlot] = useState(null)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const imgRef = useRef(null)

  useEffect(() => {
    const updateImageSize = () => {
      if (imgRef.current) {
        setImageSize({
          width: imgRef.current.clientWidth,
          height: imgRef.current.clientHeight
        })
      }
    }

    updateImageSize()
    window.addEventListener('resize', updateImageSize)
    return () => window.removeEventListener('resize', updateImageSize)
  }, [])

  const handlePlotClick = (plotNumber) => {
    const plot = plotData.find(p => p.number === plotNumber.toString())
    if (plot) {
      setSelectedPlot(plot)
    }
  }

  // Image map coordinates (based on 1024x683 original image size)
  // Format: x1,y1,x2,y2 (top-left corner and bottom-right corner)
  const plotAreas = {
    // Left column (15-28)
    '15': '77,540,117,580',
    '16': '77,490,117,530',
    '17': '77,440,117,480',
    '18': '77,390,117,430',
    '19': '77,340,117,380',
    '20': '77,290,117,330',
    '21': '77,240,117,280',
    '22': '77,190,117,230',
    '23': '77,140,117,180',
    '24': '77,90,117,130',
    '25': '77,40,117,80',
    '26': '77,0,117,30',
    '27': '77,0,117,30',
    '28': '77,0,117,70',

    // Second block left (29-38)
    '29': '164,55,208,95',
    '30': '164,105,208,145',
    '31': '164,155,208,195',
    '32': '164,205,208,245',
    '33': '164,255,208,295',
    '34': '164,305,208,345',
    '35': '164,355,208,395',
    '36': '164,405,208,445',
    '37': '164,455,208,495',
    '38': '164,505,208,545',

    // Second block right (30, 39-48)
    '30': '225,505,269,545',
    '39': '225,455,269,495',
    '41': '225,405,269,445',
    '42': '225,355,269,395',
    '43': '225,305,269,345',
    '44': '225,255,269,295',
    '45': '225,205,269,245',
    '46': '225,155,269,195',
    '47': '225,105,269,145',
    '48': '225,55,269,95',

    // Third block left (48-60)
    '48': '323,55,367,95',
    '49': '323,105,367,145',
    '50': '323,155,367,195',
    '51': '323,205,367,245',
    '53': '323,255,367,295',
    '54': '323,305,367,345',
    '55': '323,355,367,395',
    '56': '323,405,367,445',
    '57': '323,455,367,495',
    '58': '323,505,367,545',
    '59': '323,555,367,595',
    '60': '323,605,367,645',

    // Third block right (61-72)
    '61': '384,605,428,645',
    '62': '384,555,428,595',
    '63': '384,505,428,545',
    '64': '384,455,428,495',
    '65': '384,405,428,445',
    '66': '384,355,428,395',
    '67': '384,305,428,345',
    '68': '384,255,428,295',
    '69': '384,205,428,245',
    '70': '384,155,428,195',
    '71': '384,105,428,145',
    '72': '384,55,428,95',

    // Fourth block left (74-82)
    '74': '533,105,577,145',
    '75': '533,155,577,195',
    '76': '533,205,577,245',
    '77': '533,255,577,295',
    '78': '533,305,577,345',
    '79': '533,355,577,395',
    '80': '533,405,577,445',
    '81': '533,455,577,495',
    '82': '533,505,577,545',

    // Fourth block right (81, 84-92)
    '81': '594,555,638,595',
    '84': '594,505,638,545',
    '85': '594,455,638,495',
    '86': '594,405,638,445',
    '87': '594,355,638,395',
    '88': '594,305,638,345',
    '90': '594,205,638,245',
    '91': '594,155,638,195',
    '92': '594,55,638,95',

    // Right section top (93-95, 25)
    '93': '697,55,741,95',
    '94': '753,55,797,95',
    '25': '809,55,853,95',
    '95': '865,55,909,95',

    // Right section (97-100)
    '100': '697,155,741,195',
    '99': '753,155,797,195',
    '98': '809,155,853,195',
    '97': '865,155,909,195',

    // Right section double column left (101-109)
    '101': '697,205,741,245',
    '102': '697,255,741,295',
    '103': '697,305,741,345',
    '104': '697,355,741,395',
    '105': '697,405,741,445',
    '106': '697,455,741,495',
    '107': '697,505,741,545',
    '109': '697,605,741,645',

    // Right section double column right (110-116)
    '116': '753,205,797,245',
    '115': '753,255,797,295',
    '114': '753,305,797,345',
    '113': '753,355,797,395',
    '112': '753,405,797,445',
    '111': '753,455,797,495',
    '110': '753,505,797,545',

    // Bottom row (11-20, 91, 102, 107, 110)
    '11': '154,575,194,615',
    '12': '200,575,240,615',
    '13': '246,575,286,615',
    '14': '292,575,332,615',
    '15': '338,575,378,615',
    '16': '384,575,424,615',
    '17': '430,575,470,615',
    '18': '476,575,516,615',
    '19': '522,575,562,615',
    '20': '568,575,608,615',
    '91': '614,575,654,615',
    '102': '660,575,700,615',
    '107': '706,575,746,615',
    '110': '752,575,792,615',
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
            ref={imgRef}
            src="/sitemap.png" 
            alt="Colony Layout" 
            useMap="#plotmap"
            className="w-full h-auto cursor-pointer"
          />
          
          <map name="plotmap">
            {Object.entries(plotAreas).map(([plotNum, coords]) => {
              const plot = plotData.find(p => p.number === plotNum.toString())
              if (!plot) return null

              return (
                <area
                  key={plotNum}
                  shape="rect"
                  coords={coords}
                  alt={`Plot ${plotNum}`}
                  title={`प्लॉट #${plotNum} - ${
                    plot.status === 'available' ? 'उपलब्ध' : 
                    plot.status === 'booked' ? 'बुक किया गया' : 'बिक गया'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    handlePlotClick(plotNum)
                  }}
                  className="cursor-pointer"
                  style={{ cursor: 'pointer' }}
                />
              )
            })}
          </map>
        </div>

        {/* Instructions */}
        <div className="text-center mb-8">
          <p className="text-charcoal/70">
            💡 प्लॉट पर क्लिक करें या होवर करें विवरण के लिए
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

export default ImageMapPlot
