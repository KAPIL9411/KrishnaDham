import { useState, useRef } from 'react'
import { Copy, Trash2, Download, Info, Undo } from 'lucide-react'

const CoordinatePicker = () => {
  const [points, setPoints] = useState([])
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [currentZone, setCurrentZone] = useState('')
  const [savedZones, setSavedZones] = useState([])
  const imageRef = useRef(null)
  const containerRef = useRef(null)

  const handleImageLoad = (e) => {
    setImageDimensions({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    })
  }

  const handleImageClick = (e) => {
    if (!imageRef.current || !containerRef.current) return
    
    const img = imageRef.current
    const container = containerRef.current
    
    // Get the actual displayed image dimensions
    const imgRect = img.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    
    // Calculate click position relative to the displayed image
    const clickX = e.clientX - imgRect.left
    const clickY = e.clientY - imgRect.top
    
    // Calculate scale factors between displayed size and natural size
    const scaleX = imageDimensions.width / imgRect.width
    const scaleY = imageDimensions.height / imgRect.height
    
    // Convert to natural image coordinates
    const x = Math.round(clickX * scaleX)
    const y = Math.round(clickY * scaleY)
    
    // Validate coordinates are within image bounds
    if (x >= 0 && x <= imageDimensions.width && y >= 0 && y <= imageDimensions.height) {
      setPoints([...points, { x, y }])
      console.log(`Point added: (${x}, ${y})`) // Debug log
    }
  }

  const getPolygonString = () => {
    return points.map(p => `${p.x},${p.y}`).join(' ')
  }

  const copyToClipboard = () => {
    const polygonString = getPolygonString()
    navigator.clipboard.writeText(polygonString)
    alert('Coordinates copied to clipboard!')
  }

  const clearPoints = () => {
    setPoints([])
  }

  const undoLastPoint = () => {
    if (points.length > 0) {
      setPoints(points.slice(0, -1))
    }
  }

  const saveZone = () => {
    if (!currentZone.trim()) {
      alert('Please enter zone name!')
      return
    }
    if (points.length < 3) {
      alert('Please select at least 3 points!')
      return
    }

    const zone = {
      name: currentZone,
      polygon: getPolygonString(),
      points: [...points]
    }

    setSavedZones([...savedZones, zone])
    setCurrentZone('')
    setPoints([])
    alert(`Zone "${currentZone}" saved!`)
  }

  const deleteZone = (index) => {
    setSavedZones(savedZones.filter((_, i) => i !== index))
  }

  const exportAllZones = () => {
    const exportData = savedZones.map(zone => ({
      name: zone.name,
      polygon: zone.polygon
    }))
    
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'zone-coordinates.json'
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h1 className="text-3xl font-bold text-charcoal mb-2">
            🗺️ Coordinate Picker Tool
          </h1>
          <p className="text-charcoal/70">
            Click on the image to mark zone corners. Points will be connected automatically.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-2">How to use:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Enter zone name in the input field</li>
                <li>Click on image corners to mark the zone boundary (clockwise)</li>
                <li>Click "Save Zone" to save coordinates</li>
                <li>Repeat for all zones</li>
                <li>Click "Export All Zones" to download JSON file</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-charcoal mb-4">
                Click on Image to Mark Points
              </h2>
              
              {/* Image dimensions info */}
              {imageDimensions.width > 0 && (
                <div className="mb-3 p-3 bg-blue-50 rounded-lg text-sm">
                  <p className="text-blue-900">
                    <strong>Image Size:</strong> {imageDimensions.width} × {imageDimensions.height} px
                  </p>
                  <p className="text-blue-700 text-xs mt-1">
                    Click exactly on corners. Points will show as red circles.
                  </p>
                </div>
              )}
              
              <div 
                ref={containerRef}
                className="relative border-4 border-saffron rounded-lg overflow-hidden bg-gray-100"
                style={{ 
                  maxHeight: '70vh',
                  display: 'inline-block',
                  width: 'fit-content',
                  margin: '0 auto'
                }}
              >
                <img
                  ref={imageRef}
                  src="/newSitemap.png"
                  alt="Sitemap with Zone Numbers"
                  className="block max-w-full h-auto cursor-crosshair"
                  style={{ 
                    display: 'block',
                    userSelect: 'none',
                    pointerEvents: 'auto'
                  }}
                  onLoad={handleImageLoad}
                  onClick={handleImageClick}
                  draggable={false}
                />
                
                {/* SVG Overlay for visualization */}
                {imageDimensions.width > 0 && (
                  <svg
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%'
                    }}
                    viewBox={`0 0 ${imageDimensions.width} ${imageDimensions.height}`}
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Draw lines between points */}
                    {points.length > 1 && (
                      <polyline
                        points={points.map(p => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke="#FF6B35"
                        strokeWidth="4"
                        strokeDasharray="5,5"
                      />
                    )}
                    
                    {/* Draw polygon if 3+ points */}
                    {points.length >= 3 && (
                      <polygon
                        points={getPolygonString()}
                        fill="rgba(255, 107, 53, 0.25)"
                        stroke="#FF6B35"
                        strokeWidth="4"
                      />
                    )}
                    
                    {/* Draw points */}
                    {points.map((point, index) => (
                      <g key={index}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="10"
                          fill="#FF6B35"
                          stroke="white"
                          strokeWidth="3"
                        />
                        <text
                          x={point.x + 18}
                          y={point.y + 6}
                          fill="white"
                          stroke="black"
                          strokeWidth="4"
                          paintOrder="stroke"
                          fontSize="20"
                          fontWeight="bold"
                        >
                          {index + 1}
                        </text>
                        {/* Show coordinates */}
                        <text
                          x={point.x + 18}
                          y={point.y + 24}
                          fill="white"
                          stroke="black"
                          strokeWidth="3"
                          paintOrder="stroke"
                          fontSize="14"
                          fontWeight="bold"
                        >
                          ({point.x},{point.y})
                        </text>
                      </g>
                    ))}
                  </svg>
                )}
              </div>

              {/* Image Info */}
              <div className="mt-4 text-sm text-charcoal/70">
                <p>Image Dimensions: {imageDimensions.width} × {imageDimensions.height} px</p>
                <p>Points Selected: {points.length}</p>
              </div>
            </div>
          </div>

          {/* Controls & Output */}
          <div className="space-y-6">
            {/* Current Zone */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-charcoal mb-4">
                Current Zone
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Zone Name
                  </label>
                  <input
                    type="text"
                    value={currentZone}
                    onChange={(e) => setCurrentZone(e.target.value)}
                    placeholder="e.g., Zone 1 - Top Left"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-saffron outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Coordinates ({points.length} points)
                  </label>
                  <textarea
                    value={getPolygonString()}
                    readOnly
                    rows="3"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-50 text-sm font-mono"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={saveZone}
                    disabled={points.length < 3 || !currentZone.trim()}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save Zone
                  </button>
                  <button
                    onClick={undoLastPoint}
                    disabled={points.length === 0}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Undo Last Point"
                  >
                    <Undo size={18} />
                  </button>
                  <button
                    onClick={clearPoints}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                    title="Clear All Points"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    disabled={points.length === 0}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Copy Coordinates"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Saved Zones */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-charcoal">
                  Saved Zones ({savedZones.length})
                </h2>
                {savedZones.length > 0 && (
                  <button
                    onClick={exportAllZones}
                    className="bg-saffron hover:bg-gold text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    <Download size={18} />
                    Export
                  </button>
                )}
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {savedZones.length === 0 ? (
                  <p className="text-charcoal/50 text-sm text-center py-8">
                    No zones saved yet
                  </p>
                ) : (
                  savedZones.map((zone, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-charcoal">{zone.name}</h3>
                        <button
                          onClick={() => deleteZone(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-charcoal/70 font-mono break-all">
                        {zone.polygon}
                      </p>
                      <p className="text-xs text-charcoal/50 mt-1">
                        {zone.points.length} points
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoordinatePicker
