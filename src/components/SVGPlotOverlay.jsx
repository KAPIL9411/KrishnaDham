import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePlots } from '../hooks/usePlots'
import { Download, ZoomIn, ZoomOut, RotateCcw, Maximize, Minimize, Info, Smartphone, Mouse, MessageCircle } from 'lucide-react'

const SVGPlotOverlay = () => {
  const { plots: plotData } = usePlots()
  const [selectedPlot, setSelectedPlot] = useState(null)
  const [hoveredPlot, setHoveredPlot] = useState(null)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [lastTouchDistance, setLastTouchDistance] = useState(0)
  const [initialZoom, setInitialZoom] = useState(1)
  const imageRef = useRef(null)
  const containerRef = useRef(null)
  const fullscreenRef = useRef(null)

  useEffect(() => {
    const img = imageRef.current
    if (img && img.complete && img.naturalWidth > 0) {
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    }

    // Add passive event listeners for better performance
    const container = containerRef.current
    if (container) {
      const handleWheelPassive = (e) => {
        try {
          e.preventDefault()
          const delta = e.deltaY > 0 ? 0.9 : 1.1
          setZoom(prev => Math.max(0.5, Math.min(5, prev * delta)))
        } catch (error) {
          // Silently handle wheel event errors
        }
      }

      // Add event listeners with proper options
      container.addEventListener('wheel', handleWheelPassive, { passive: false })

      return () => {
        try {
          container.removeEventListener('wheel', handleWheelPassive)
        } catch (error) {
          // Silently handle cleanup errors
        }
      }
    }
  }, [])

  const handleImageLoad = (e) => {
    setImageDimensions({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    })
    // Removed console.log for cleaner production build
  }

  const handlePlotClick = (plotNumber) => {
    if (isDragging) return // Don't open modal if dragging
    const plot = plotData.find(p => p.number === plotNumber.toString())
    if (plot) {
      setSelectedPlot(plot)
    }
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.5, 5))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.5, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // For mobile, use a different approach
      if (window.innerWidth <= 768) {
        // Mobile fullscreen simulation
        setIsFullscreen(true)
        document.body.style.overflow = 'hidden'
        // Try native fullscreen if available
        if (fullscreenRef.current?.requestFullscreen) {
          fullscreenRef.current.requestFullscreen().catch(() => {
            // Fallback to CSS fullscreen
            console.log('Native fullscreen not available, using CSS fullscreen')
          })
        }
      } else {
        // Desktop fullscreen
        if (fullscreenRef.current?.requestFullscreen) {
          fullscreenRef.current.requestFullscreen()
        } else if (fullscreenRef.current?.webkitRequestFullscreen) {
          fullscreenRef.current.webkitRequestFullscreen()
        } else if (fullscreenRef.current?.mozRequestFullScreen) {
          fullscreenRef.current.mozRequestFullScreen()
        }
        setIsFullscreen(true)
      }
      setZoom(1)
      setPan({ x: 0, y: 0 })
    } else {
      // Exit fullscreen
      setIsFullscreen(false)
      document.body.style.overflow = 'auto'
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      }
    }
  }

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      try {
        setIsFullscreen(!!document.fullscreenElement)
      } catch (error) {
        // Silently handle fullscreen change errors
        setIsFullscreen(false)
      }
    }

    try {
      document.addEventListener('fullscreenchange', handleFullscreenChange)
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    } catch (error) {
      // Silently handle event listener errors
    }

    return () => {
      try {
        document.removeEventListener('fullscreenchange', handleFullscreenChange)
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
        document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      } catch (error) {
        // Silently handle cleanup errors
      }
    }
  }, [])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      // Single touch - pan
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      })
    } else if (e.touches.length === 2) {
      // Two touches - pinch to zoom
      setIsDragging(false)
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      )
      setLastTouchDistance(distance)
      setInitialZoom(zoom)
    }
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    
    if (e.touches.length === 1 && isDragging) {
      // Single touch - pan
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      })
    } else if (e.touches.length === 2) {
      // Two touches - pinch to zoom
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      )
      
      if (lastTouchDistance > 0) {
        const scale = distance / lastTouchDistance
        const newZoom = Math.max(0.5, Math.min(5, initialZoom * scale))
        setZoom(newZoom)
      }
    }
  }

  const handleTouchEnd = (e) => {
    setIsDragging(false)
    if (e.touches.length < 2) {
      setLastTouchDistance(0)
    }
  }

  // ACCURATE coordinates from your manual mapping - ALL PLOTS
  const plotPolygons = {
    // Bottom row plots (1-14)
    '1': '768,573 767,660 808,638 804,572',
    '2': '725,572 764,571 766,659 724,686',
    '3': '685,572 723,571 728,686 698,700',
    '4': '648,571 687,571 687,661 653,657',
    '5': '599,570 649,570 647,657 608,653',
    '6': '567,569 608,570 611,655 568,652',
    '7': '523,570 568,569 564,650 527,650',
    '8': '482,571 523,568 524,650 481,645',
    '9': '439,571 482,571 484,649 441,645',
    '10': '396,572 440,572 441,642 399,641',
    '11': '356,568 397,571 400,640 355,638',
    '12': '313,568 356,570 355,637 312,635',
    '13': '270,569 313,570 315,635 271,627',
    '14': '230,570 271,570 270,634 224,625',
    
    // Left column (15-28) - First section
    '15': '120,573 189,576 191,622 120,618',
    '16': '116,534 193,534 191,574 117,576',
    '17': '193,533 193,494 113,493 117,532',
    '18': '193,493 193,455 109,452 112,495',
    '19': '109,409 109,453 195,456 194,412',
    '20': '111,371 194,372 192,412 113,412',
    '21': '193,369 196,334 115,332 112,370',
    '22': '115,289 192,289 197,331 114,331',
    '23': '115,287 195,291 195,251 116,250',
    '24': '116,251 194,252 196,212 118,209',
    '25': '118,212 194,211 197,173 117,171',
    '26': '117,169 194,172 197,130 116,128',
    '27': '118,131 195,131 197,91 120,90',
    '28': '122,55 119,94 197,93 195,55',
    
    // Second block (29-48)
    '29': '231,57 310,56 313,104 229,103',
    '30': '233,105 313,107 314,147 232,149',
    '31': '233,147 311,148 313,191 231,193',
    '32': '232,194 311,195 312,241 231,241',
    '33': '233,241 313,242 314,290 233,285',
    '34': '231,288 313,289 314,334 231,333',
    '35': '233,336 311,335 310,381 231,382',
    '36': '232,382 313,381 313,426 231,429',
    '37': '230,427 315,428 310,475 229,474',
    '38': '231,476 311,475 312,532 231,531',
    '39': '314,474 394,476 396,528 313,532',
    '40': '313,428 395,428 396,473 314,477',
    '41': '314,382 396,384 394,428 315,429',
    '42': '315,334 393,334 396,379 312,379',
    '43': '315,289 395,287 398,332 312,334',
    '44': '314,241 398,241 397,288 314,288',
    '45': '314,195 395,194 397,237 313,240',
    '46': '314,147 397,146 397,192 312,194',
    '47': '315,105 396,105 397,146 314,146',
    '48': '312,53 396,58 395,103 315,103',
    
    // Third block (49-72)
    '49': '433,57 514,55 517,92 437,97',
    '50': '436,96 515,93 516,128 434,132',
    '51': '434,132 515,132 517,171 430,173',
    '52': '434,170 513,170 515,211 434,211',
    '53': '432,213 515,213 516,253 433,254',
    '54': '433,254 515,252 515,295 434,293',
    '55': '435,294 515,293 515,332 433,332',
    '56': '433,333 515,333 517,370 432,374',
    '57': '434,375 514,376 516,414 434,414',
    '58': '431,414 513,414 514,453 430,455',
    '59': '430,456 514,454 515,493 431,492',
    '60': '431,493 514,493 516,532 431,532',
    '61': '516,492 601,494 599,530 516,533',
    '62': '515,453 600,452 602,491 514,491',
    '63': '515,412 600,409 598,450 516,455',
    '64': '518,374 597,374 597,411 515,410',
    '65': '515,333 596,334 598,374 514,373',
    '66': '514,291 597,292 596,330 514,332',
    '67': '517,251 598,252 599,289 516,291',
    '68': '516,212 598,212 598,246 518,249',
    '69': '516,171 598,170 597,210 516,209',
    '70': '517,130 597,130 597,169 515,170',
    '71': '516,88 599,90 597,129 515,130',
    '72': '517,56 596,55 596,90 517,91',
    
    // Fourth block (73-92)
    '73': '635,55 719,53 719,100 633,100',
    '74': '635,101 718,100 718,142 636,146',
    '75': '639,149 720,147 719,194 634,196',
    '76': '633,199 718,197 719,236 637,237',
    '77': '636,242 717,241 720,284 635,289',
    '78': '637,287 719,287 719,336 636,336',
    '79': '638,336 718,335 718,379 634,383',
    '80': '637,382 716,384 719,428 635,431',
    '81': '636,431 719,429 719,474 635,474',
    '82': '638,475 718,475 720,529 635,532',
    '83': '719,478 807,475 805,533 719,531',
    '84': '720,427 806,428 805,474 722,474',
    '85': '720,382 806,380 807,427 722,426',
    '86': '716,333 804,333 803,380 722,378',
    '87': '720,289 805,286 810,338 717,334',
    '88': '718,238 804,236 806,287 717,287',
    '89': '718,193 805,193 807,237 718,239',
    '90': '720,148 803,146 805,190 718,193',
    '91': '718,100 805,100 804,144 721,143',
    '92': '718,54 802,56 805,95 719,100',
    
    // Right section (93-116)
    '93': '850,55 890,56 891,114 846,112',
    '94': '890,53 928,55 931,112 882,112',
    '95': '934,54 971,54 970,116 931,115',
    '96': '968,52 972,114 1011,117 1009,52',
    '97': '968,146 971,213 1012,217 1012,147',
    '98': '928,147 929,212 971,215 969,148',
    '99': '891,147 887,213 934,217 929,150',
    '100': '848,147 847,216 893,220 889,151',
    '101': '852,215 933,214 932,253 848,252',
    '102': '847,257 848,296 927,296 931,253',
    '103': '848,298 847,340 927,337 933,295',
    '104': '849,338 848,382 931,381 933,339',
    '105': '850,379 932,379 932,420 847,422',
    '106': '850,425 932,422 932,461 846,465',
    '107': '850,464 931,464 933,505 848,506',
    '108': '850,508 934,507 933,552 849,553',
    '109': '850,553 927,556 851,612 848,557',
    '110': '933,462 934,565 1013,515 1014,463',
    '111': '935,420 933,461 1016,464 1016,420',
    '112': '934,379 932,421 1014,420 1013,374',
    '113': '932,339 931,381 1013,379 1013,334',
    '114': '933,296 1011,298 1013,340 935,341',
    '115': '932,295 1011,296 1014,253 929,252',
    '116': '932,257 1010,255 1010,213 932,214',
  }

  const getPlotColor = (status) => {
    switch (status) {
      case 'available':
        return '#4ade80'
      case 'sold':
        return '#ef4444'
      case 'booked':
        return '#fbbf24'
      default:
        return '#4ade80'
    }
  }

  return (
    <section id="plot-map" className="py-12 md:py-20 bg-ivory w-full overflow-x-hidden">
      <div className="container mx-auto px-4 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal mb-3 md:mb-4">
            इंटरएक्टिव प्लॉट मैप
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-charcoal/70 px-2">
            विवरण देखने के लिए किसी भी प्लॉट पर क्लिक करें
          </p>
        </motion.div>

        {/* Mobile-First Legend */}
        <div className="flex flex-wrap gap-3 md:gap-6 mb-6 md:mb-8 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 md:w-6 md:h-6 bg-green-500 rounded border-2 border-white"></div>
            <span className="text-xs md:text-sm font-semibold">उपलब्ध</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 md:w-6 md:h-6 bg-yellow-500 rounded border-2 border-white"></div>
            <span className="text-xs md:text-sm font-semibold">बुक किया गया</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 md:w-6 md:h-6 bg-red-500 rounded border-2 border-white"></div>
            <span className="text-xs md:text-sm font-semibold">बिक गया</span>
          </div>
        </div>

        {/* Interactive Sitemap with SVG Overlay */}
        <div 
          ref={fullscreenRef}
          className={`relative mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl bg-gray-100 transition-all duration-300 w-full max-w-full ${
            isFullscreen 
              ? 'fixed inset-0 z-50 rounded-none max-w-none bg-black w-screen h-screen' 
              : 'max-w-6xl'
          }`}
        >
          {/* Enhanced Controls */}
          <div className={`absolute top-4 right-4 z-20 flex gap-2 ${isFullscreen ? 'flex-col' : 'flex-col'}`}>
            {/* Zoom Controls */}
            <div className="flex flex-col gap-2 bg-black/20 backdrop-blur-sm rounded-xl p-2">
              <button
                onClick={handleZoomIn}
                className="bg-white/90 hover:bg-white text-charcoal p-3 rounded-full shadow-lg transition-all hover:scale-110"
                title="Zoom In"
              >
                <ZoomIn size={isFullscreen ? 24 : 20} />
              </button>
              <button
                onClick={handleZoomOut}
                className="bg-white/90 hover:bg-white text-charcoal p-3 rounded-full shadow-lg transition-all hover:scale-110"
                title="Zoom Out"
              >
                <ZoomOut size={isFullscreen ? 24 : 20} />
              </button>
              <button
                onClick={handleReset}
                className="bg-white/90 hover:bg-white text-charcoal p-3 rounded-full shadow-lg transition-all hover:scale-110"
                title="Reset View"
              >
                <RotateCcw size={isFullscreen ? 24 : 20} />
              </button>
            </div>

            {/* Fullscreen Controls */}
            <div className="flex flex-col gap-2 bg-black/20 backdrop-blur-sm rounded-xl p-2">
              <button
                onClick={toggleFullscreen}
                className="bg-saffron hover:bg-gold text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize size={isFullscreen ? 24 : 20} /> : <Maximize size={isFullscreen ? 24 : 20} />}
              </button>
            </div>
          </div>

          {/* Zoom Level Indicator */}
          <div className={`absolute bottom-4 left-4 z-20 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full ${
            isFullscreen ? 'text-base' : 'text-sm'
          }`}>
            <span className="font-semibold">🔍 {zoom.toFixed(1)}x</span>
            {isFullscreen && <span className="ml-2 text-saffron">• Fullscreen Mode</span>}
          </div>

          {/* Plot Status Legend - Enhanced */}
          <div className={`absolute bottom-4 right-4 z-20 bg-black/70 backdrop-blur-sm rounded-xl p-3 ${
            isFullscreen ? 'block' : 'hidden md:block'
          }`}>
            <div className="flex gap-4 text-white text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>उपलब्ध</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>बुक</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>बिक गया</span>
              </div>
            </div>
          </div>

          {/* Zoomable Container */}
          <div
            ref={containerRef}
            className={`relative w-full overflow-hidden cursor-grab active:cursor-grabbing ${
              isFullscreen ? 'h-screen' : 'h-[400px] md:h-[600px]'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              touchAction: 'none',
              WebkitOverflowScrolling: 'touch',
              userSelect: 'none',
              WebkitUserSelect: 'none'
            }}
          >
            {/* Zoomable Content */}
            <div
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Background Image */}
              <img 
                ref={imageRef}
                src="/sitemap.webp" 
                alt="Colony Layout" 
                className="max-w-full max-h-full object-contain block"
                onLoad={handleImageLoad}
                draggable={false}
              />
              
              {/* SVG Overlay - FIXED: Using actual image dimensions */}
              {imageDimensions.width > 0 && (
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox={`0 0 ${imageDimensions.width} ${imageDimensions.height}`}
                  preserveAspectRatio="xMidYMid meet"
                  style={{ pointerEvents: 'none', overflow: 'visible' }}
                >
                  {Object.entries(plotPolygons).map(([plotNum, points]) => {
                    const plot = plotData.find(p => p.number === plotNum.toString())
                    if (!plot) return null

                    const isHovered = hoveredPlot === plotNum
                    const fillColor = getPlotColor(plot.status)

                    return (
                      <polygon
                        key={plotNum}
                        points={points}
                        fill={fillColor}
                        fillOpacity={isHovered ? 0.6 : 0}
                        stroke={isHovered ? "white" : "transparent"}
                        strokeWidth="3"
                        className="transition-all duration-200"
                        style={{ 
                          pointerEvents: 'auto',
                          cursor: 'pointer'
                        }}
                        onClick={() => handlePlotClick(plotNum)}
                        onMouseEnter={() => setHoveredPlot(plotNum)}
                        onMouseLeave={() => setHoveredPlot(null)}
                      />
                    )
                  })}
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Instructions */}
        <div className="text-center mb-6 md:mb-8">
          <p className="text-charcoal/70 text-base md:text-lg mb-2 flex items-center justify-center gap-2">
            <Info size={20} className="text-saffron" />
            किसी भी प्लॉट पर क्लिक करें विस्तृत जानकारी के लिए
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm text-charcoal/50">
            <span className="flex items-center gap-1">
              <Smartphone size={14} />
              Mobile: Pinch to zoom
            </span>
            <span className="flex items-center gap-1">
              <Mouse size={14} />
              Desktop: Scroll to zoom
            </span>
            <span className="flex items-center gap-1">
              <Maximize size={14} />
              Fullscreen available
            </span>
            <span>{Object.keys(plotPolygons).length} plots mapped</span>
          </div>
        </div>

        {/* Enhanced Download Button */}
        <div className="text-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-charcoal to-charcoal/80 text-ivory px-8 py-4 rounded-full font-semibold hover:from-charcoal/90 hover:to-charcoal transition-all shadow-lg hover:shadow-xl"
          >
            <Download size={24} />
            <span>लेआउट PDF डाउनलोड करें</span>
          </motion.button>
        </div>

        {/* Enhanced Selected Plot Modal */}
        {selectedPlot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedPlot(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-saffron/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-display font-bold text-charcoal">
                  प्लॉट #{selectedPlot.number}
                </h3>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  selectedPlot.status === 'available' ? 'bg-green-100 text-green-700' :
                  selectedPlot.status === 'sold' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {selectedPlot.status === 'available' ? '✅ उपलब्ध' :
                   selectedPlot.status === 'sold' ? '❌ बिक गया' : '🟡 बुक किया गया'}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="text-charcoal/70 font-medium">क्षेत्रफल:</span>
                  <span className="font-bold text-charcoal text-lg">{selectedPlot.area}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <span className="text-charcoal/70 font-medium">दिशा:</span>
                  <span className="font-bold text-charcoal">{selectedPlot.facing}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-saffron/10 to-gold/10 rounded-xl border border-saffron/20">
                  <span className="text-charcoal/70 font-medium">मूल्य:</span>
                  <span className="font-bold text-saffron text-2xl">
                    ₹{(selectedPlot.price / 100000).toFixed(2)} लाख
                  </span>
                </div>
                {/* Owner Name - Only show for booked/sold plots */}
                {(selectedPlot.status === 'booked' || selectedPlot.status === 'sold') && selectedPlot.ownerName && (
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <span className="text-charcoal/70 font-medium">मालिक:</span>
                    <span className="font-bold text-blue-700">{selectedPlot.ownerName}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {selectedPlot.status === 'available' && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/919876543210?text=नमस्ते, मुझे श्री कृष्णा धाम कॉलोनी में प्लॉट ${selectedPlot.number} में रुचि है`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center px-6 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    WhatsApp पर पूछताछ करें
                  </motion.a>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlot(null)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-charcoal px-6 py-4 rounded-xl font-semibold transition-all"
                >
                  बंद करें
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default SVGPlotOverlay
