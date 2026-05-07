import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { ZoomIn, ZoomOut, RotateCcw, Maximize, Minimize, Info, Smartphone, Mouse, X } from 'lucide-react'

const SVGPlotOverlay = () => {
  const [selectedZone, setSelectedZone] = useState(null)
  const [hoveredZone, setHoveredZone] = useState(null)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [lastTouchDistance, setLastTouchDistance] = useState(0)
  const [initialZoom, setInitialZoom] = useState(1)
  const [locationZones, setLocationZones] = useState([])
  const [individualPlots, setIndividualPlots] = useState([])
  const [loading, setLoading] = useState(true)
  const imageRef = useRef(null)
  const containerRef = useRef(null)
  const fullscreenRef = useRef(null)

  // Default zones data (fallback if Firebase is empty)
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

  const loadZones = async () => {
    try {
      // Load zones
      const zonesSnapshot = await getDocs(collection(db, 'zones'))
      if (zonesSnapshot.empty) {
        setLocationZones(defaultZones)
      } else {
        const zonesData = zonesSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
        setLocationZones(zonesData)
      }

      // Load individual plots
      const plotsSnapshot = await getDocs(collection(db, 'plots'))
      const plotsData = plotsSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setIndividualPlots(plotsData)
    } catch (error) {
      console.error('Error loading zones:', error)
      setLocationZones(defaultZones)
      setIndividualPlots([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const img = imageRef.current
    if (img && img.complete && img.naturalWidth > 0) {
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
    }

    const container = containerRef.current
    if (container) {
      const handleWheelPassive = (e) => {
        try {
          e.preventDefault()
          const delta = e.deltaY > 0 ? 0.9 : 1.1
          setZoom(prev => Math.max(0.5, Math.min(5, prev * delta)))
        } catch (error) {
          // Silently handle errors
        }
      }

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
  }

  const handleZoneClick = (zone) => {
    if (isDragging) return
    setSelectedZone(zone)
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.5, 5))
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.5, 0.5))
  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (window.innerWidth <= 768) {
        setIsFullscreen(true)
        document.body.style.overflow = 'hidden'
        if (fullscreenRef.current?.requestFullscreen) {
          fullscreenRef.current.requestFullscreen().catch(() => {})
        }
      } else {
        if (fullscreenRef.current?.requestFullscreen) {
          fullscreenRef.current.requestFullscreen()
        }
        setIsFullscreen(true)
      }
      setZoom(1)
      setPan({ x: 0, y: 0 })
    } else {
      setIsFullscreen(false)
      document.body.style.overflow = 'auto'
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      try {
        setIsFullscreen(!!document.fullscreenElement)
      } catch (error) {
        setIsFullscreen(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      })
    } else if (e.touches.length === 2) {
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
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      })
    } else if (e.touches.length === 2) {
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

  const getZoneColor = (status) => {
    switch (status) {
      case 'available': return '#4ade80'
      case 'partially-booked': return '#fbbf24'
      case 'sold': return '#ef4444'
      default: return '#4ade80'
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
            कॉलोनी लेआउट
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-charcoal/70 px-2 mb-2">
            अपनी पसंद की location देखें और inquiry करें
          </p>
          <p className="text-sm md:text-base text-saffron font-semibold">
            📍 Flexible area: 50-500 sq yd • Rate: ₹9,500-12,500/sq yd
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 md:gap-6 mb-6 md:mb-8 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 md:w-6 md:h-6 bg-green-500 rounded border-2 border-white"></div>
            <span className="text-xs md:text-sm font-semibold">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 md:w-6 md:h-6 bg-red-500 rounded border-2 border-white"></div>
            <span className="text-xs md:text-sm font-semibold">Sold Out</span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-saffron/30 border-t-saffron rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-charcoal/70">लोड हो रहा है...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Interactive Sitemap */}
        <div 
          ref={fullscreenRef}
          className={`relative mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl bg-gray-100 transition-all duration-300 w-full max-w-full ${
            isFullscreen 
              ? 'fixed inset-0 z-50 rounded-none max-w-none bg-black w-screen h-screen' 
              : 'max-w-6xl'
          }`}
        >
          {/* Controls */}
          <div className={`absolute top-4 right-4 z-20 flex gap-2 ${isFullscreen ? 'flex-col' : 'flex-col'}`}>
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

          {/* Zoom Indicator */}
          <div className={`absolute bottom-4 left-4 z-20 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full ${
            isFullscreen ? 'text-base' : 'text-sm'
          }`}>
            <span className="font-semibold">🔍 {zoom.toFixed(1)}x</span>
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
              userSelect: 'none'
            }}
          >
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
                src="/newSitemap.png" 
                alt="Colony Layout with Zone Numbers" 
                className="max-w-full max-h-full object-contain block"
                onLoad={handleImageLoad}
                draggable={false}
              />
              
              {/* SVG Overlay with clickable zones */}
              {imageDimensions.width > 0 && (
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox={`0 0 ${imageDimensions.width} ${imageDimensions.height}`}
                  preserveAspectRatio="xMidYMid meet"
                  style={{ pointerEvents: 'none', overflow: 'visible' }}
                >
                  {/* Render Zones */}
                  {locationZones.map((zone) => {
                    const isHovered = hoveredZone === zone.id
                    const fillColor = getZoneColor(zone.status)

                    return (
                      <g key={zone.id}>
                        <polygon
                          points={zone.polygon}
                          fill={fillColor}
                          fillOpacity={isHovered ? 0.5 : 0}
                          stroke={isHovered ? "white" : "transparent"}
                          strokeWidth={isHovered ? "6" : "0"}
                          className="transition-all duration-200"
                          style={{ 
                            pointerEvents: 'auto',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleZoneClick(zone)}
                          onMouseEnter={() => setHoveredZone(zone.id)}
                          onMouseLeave={() => setHoveredZone(null)}
                        />
                        {isHovered && (
                          <text
                            x={zone.polygon.split(' ')[0].split(',')[0]}
                            y={zone.polygon.split(' ')[0].split(',')[1]}
                            fill="white"
                            fontSize="24"
                            fontWeight="bold"
                            stroke="black"
                            strokeWidth="2"
                            paintOrder="stroke"
                            style={{ pointerEvents: 'none' }}
                          >
                            {zone.name}
                          </text>
                        )}
                      </g>
                    )
                  })}

                  {/* Render Individual Plots */}
                  {individualPlots.map((plot) => {
                    if (!plot.coordinates) return null
                    
                    const plotFillColor = plot.status === 'sold' ? '#ef4444' : 
                                         plot.status === 'booked' ? '#fbbf24' : '#4ade80'
                    
                    return (
                      <g key={plot.id}>
                        {/* Plot Polygon */}
                        <polygon
                          points={plot.coordinates}
                          fill={plotFillColor}
                          fillOpacity="0.6"
                          stroke="white"
                          strokeWidth="3"
                          style={{ 
                            pointerEvents: 'auto',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleZoneClick(plot)}
                        />
                        
                        {/* Plot Number Label */}
                        {plot.labelX && plot.labelY && (
                          <text
                            x={plot.labelX}
                            y={plot.labelY}
                            fill="white"
                            fontSize="20"
                            fontWeight="bold"
                            stroke="black"
                            strokeWidth="2"
                            paintOrder="stroke"
                            textAnchor="middle"
                            style={{ pointerEvents: 'none' }}
                          >
                            {plot.plotNumber}
                          </text>
                        )}
                      </g>
                    )
                  })}
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mb-6 md:mb-8">
          <p className="text-charcoal/70 text-base md:text-lg mb-2 flex items-center justify-center gap-2">
            <Info size={20} className="text-saffron" />
            किसी भी location zone पर क्लिक करें जानकारी के लिए
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
          </div>
          <p className="text-saffron font-semibold text-sm mt-3">
            💡 Plot number site visit के बाद assign होगा
          </p>
        </div>
        </>
        )}

        {/* Zone/Plot Details Modal - Ultra Compact */}
        {selectedZone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedZone(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl border border-saffron/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-display font-bold text-charcoal">
                  {selectedZone.plotNumber ? `प्लॉट #${selectedZone.plotNumber}` : selectedZone.name}
                </h3>
                <button
                  onClick={() => setSelectedZone(null)}
                  className="text-charcoal/40 hover:text-charcoal p-1"
                >
                  <X size={18} />
                </button>
              </div>

              {/* For Individual Plots (sold/booked) - Clean Professional UI */}
              {selectedZone.plotNumber ? (
                <>
                  {/* Status Badge */}
                  <div className="flex justify-center mb-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                      selectedZone.status === 'sold' ? 'bg-red-100 text-red-700' :
                      selectedZone.status === 'booked' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {selectedZone.status === 'sold' ? 'बिक गया' :
                       selectedZone.status === 'booked' ? 'बुक' : 'उपलब्ध'}
                    </span>
                  </div>

                  {/* Plot Details */}
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-charcoal/60">क्षेत्रफल</span>
                      <span className="text-base font-semibold text-charcoal">{selectedZone.area} वर्ग गज</span>
                    </div>
                    
                    {selectedZone.ownerName && selectedZone.status === 'sold' && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-charcoal/60">खरीदार</span>
                        <span className="text-base font-semibold text-charcoal">{selectedZone.ownerName}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedZone(null)}
                    className="w-full bg-charcoal hover:bg-charcoal/90 text-white py-2.5 rounded-lg font-medium transition-all text-sm"
                  >
                    अन्य प्लॉट्स देखें
                  </button>
                </>
              ) : (
                <>
                  {/* For Location Zones - SHOW PRICE */}
                  <div className="bg-gradient-to-r from-saffron/10 to-gold/10 rounded-xl p-4 mb-3 border border-saffron/20">
                    <p className="font-bold text-saffron text-2xl mb-1">
                      ₹{selectedZone.basePricePerSqYd.min.toLocaleString()} - ₹{selectedZone.basePricePerSqYd.max.toLocaleString()}/sq yd
                    </p>
                    <p className="text-xs text-charcoal/60">
                      Area: {selectedZone.recommendedArea.min}-{selectedZone.recommendedArea.max} sq yd
                    </p>
                  </div>

                  {/* Quick Info */}
                  <div className="flex gap-2 mb-3 text-xs">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                      🧭 {selectedZone.facing}
                    </span>
                    <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
                      🛣️ {selectedZone.roadWidth}
                    </span>
                  </div>

                  {/* CTAs */}
                  {selectedZone.status === 'available' || selectedZone.status === 'partially-booked' ? (
                    <div className="space-y-2">
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="#inquiry-form"
                        onClick={() => setSelectedZone(null)}
                        className="block w-full bg-gradient-to-r from-saffron to-gold text-white text-center px-4 py-2.5 rounded-xl font-bold hover:from-gold hover:to-saffron transition-all shadow-lg text-sm"
                      >
                        📝 Inquiry Form भरें
                      </motion.a>
                      
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={`https://wa.me/918279529681?text=नमस्ते, मुझे श्री कृष्णा धाम कॉलोनी में ${selectedZone.name} area में plot चाहिए। कृपया details बताएं।`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center px-4 py-2.5 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg text-sm"
                      >
                        💬 WhatsApp पर बात करें
                      </motion.a>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-xl text-center">
                      <p className="text-charcoal/70 text-sm mb-2">
                        यह location sold out है
                      </p>
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="#inquiry-form"
                        onClick={() => setSelectedZone(null)}
                        className="inline-block bg-saffron text-white px-4 py-2 rounded-lg font-semibold hover:bg-gold transition-all text-sm"
                      >
                        अन्य locations देखें
                      </motion.a>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default SVGPlotOverlay
