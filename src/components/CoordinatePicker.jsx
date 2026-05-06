import { useState, useRef } from 'react'

const CoordinatePicker = () => {
  const [points, setPoints] = useState([])
  const [plotNumber, setPlotNumber] = useState('')
  const [allPlots, setAllPlots] = useState([])
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const imgRef = useRef(null)

  const handleImageLoad = (e) => {
    setImageSize({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    })
    console.log('✅ Image loaded:', e.target.naturalWidth, 'x', e.target.naturalHeight)
  }

  const handleImageClick = (e) => {
    if (!plotNumber) {
      alert('⚠️ पहले Plot Number enter करें!')
      return
    }

    const rect = imgRef.current.getBoundingClientRect()
    const x = Math.round((e.clientX - rect.left) * (imageSize.width / rect.width))
    const y = Math.round((e.clientY - rect.top) * (imageSize.height / rect.height))
    
    const newPoints = [...points, { x, y }]
    setPoints(newPoints)
    
    console.log(`📍 Point ${newPoints.length}: x=${x}, y=${y}`)
    
    // Auto save after 4 points (rectangle complete)
    if (newPoints.length === 4) {
      savePlot(newPoints)
    }
  }

  const savePlot = (pointsToSave = points) => {
    if (pointsToSave.length === 4 && plotNumber) {
      const coordString = pointsToSave.map(p => `${p.x},${p.y}`).join(' ')
      const plotEntry = {
        number: plotNumber,
        coords: coordString,
        code: `'${plotNumber}': '${coordString}',`
      }
      
      setAllPlots([...allPlots, plotEntry])
      setPoints([])
      
      // Auto increment plot number
      const nextNumber = parseInt(plotNumber) + 1
      setPlotNumber(nextNumber.toString())
      
      console.log('✅ Plot saved:', plotEntry.code)
      console.log(`🔄 Next plot: ${nextNumber}`)
    }
  }

  const resetCurrent = () => {
    setPoints([])
  }

  const undoLastPoint = () => {
    setPoints(points.slice(0, -1))
  }

  const deletePlot = (index) => {
    const newPlots = allPlots.filter((_, i) => i !== index)
    setAllPlots(newPlots)
  }

  const copyAllCode = () => {
    const code = allPlots.map(p => p.code).join('\n')
    navigator.clipboard.writeText(code)
    alert('✅ Code copied to clipboard!')
  }

  const downloadCode = () => {
    const code = allPlots.map(p => p.code).join('\n')
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'plot-coordinates.txt'
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            🎯 Plot Coordinate Picker Tool
          </h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <h3 className="font-bold text-blue-800 mb-2">📖 Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-blue-700 text-sm md:text-base">
              <li>नीचे Plot Number enter करें (जैसे: 29, 30, 31...)</li>
              <li>Image पर plot के <strong>4 corners</strong> पर click करें (clockwise order में)</li>
              <li>4 clicks के बाद automatically save हो जाएगा और next number auto-fill होगा</li>
              <li>सभी plots complete करने के बाद "Copy All Code" पर click करें</li>
            </ol>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Plot Number:
              </label>
              <input
                type="text"
                value={plotNumber}
                onChange={(e) => setPlotNumber(e.target.value)}
                placeholder="29"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-bold"
                autoFocus
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={undoLastPoint}
                disabled={points.length === 0}
                className="w-full px-3 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-300 text-sm"
              >
                ↶ Undo Point
              </button>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={resetCurrent}
                className="w-full px-3 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 text-sm"
              >
                🔄 Reset
              </button>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={copyAllCode}
                disabled={allPlots.length === 0}
                className="w-full px-3 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 text-sm"
              >
                📋 Copy Code
              </button>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={downloadCode}
                disabled={allPlots.length === 0}
                className="w-full px-3 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 disabled:bg-gray-300 text-sm"
              >
                💾 Download
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">{points.length}/4</div>
                <div className="text-xs text-gray-600">Points Clicked</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">{allPlots.length}</div>
                <div className="text-xs text-gray-600">Plots Saved</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-purple-600">
                  {imageSize.width}x{imageSize.height}
                </div>
                <div className="text-xs text-gray-600">Image Size</div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Area */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            📍 Click on Plot Corners (4 points needed) - Current: Plot #{plotNumber || '?'}
          </h2>
          
          <div className="relative inline-block w-full">
            <img
              ref={imgRef}
              src="/sitemap.webp"
              alt="Sitemap"
              className="w-full h-auto border-4 border-gray-300 rounded cursor-crosshair"
              onClick={handleImageClick}
              onLoad={handleImageLoad}
            />
            
            {/* Show clicked points */}
            <svg
              className="absolute inset-0 pointer-events-none w-full h-full"
            >
              {points.map((point, index) => {
                const rect = imgRef.current?.getBoundingClientRect()
                if (!rect) return null
                
                const x = (point.x / imageSize.width) * rect.width
                const y = (point.y / imageSize.height) * rect.height
                
                return (
                  <g key={index}>
                    <circle
                      cx={x}
                      cy={y}
                      r="10"
                      fill="red"
                      stroke="white"
                      strokeWidth="3"
                    />
                    <text
                      x={x + 15}
                      y={y + 6}
                      fill="red"
                      fontSize="20"
                      fontWeight="bold"
                      stroke="white"
                      strokeWidth="1"
                    >
                      {index + 1}
                    </text>
                  </g>
                )
              })}
              
              {/* Draw lines between points */}
              {points.length > 1 && points.map((point, index) => {
                if (index === 0) return null
                const rect = imgRef.current?.getBoundingClientRect()
                if (!rect) return null
                
                const x1 = (points[index - 1].x / imageSize.width) * rect.width
                const y1 = (points[index - 1].y / imageSize.height) * rect.height
                const x2 = (point.x / imageSize.width) * rect.width
                const y2 = (point.y / imageSize.height) * rect.height
                
                return (
                  <line
                    key={`line-${index}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="red"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                  />
                )
              })}
              
              {/* Close the polygon */}
              {points.length === 4 && (() => {
                const rect = imgRef.current?.getBoundingClientRect()
                if (!rect) return null
                
                const x1 = (points[3].x / imageSize.width) * rect.width
                const y1 = (points[3].y / imageSize.height) * rect.height
                const x2 = (points[0].x / imageSize.width) * rect.width
                const y2 = (points[0].y / imageSize.height) * rect.height
                
                return (
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="red"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                  />
                )
              })()}
            </svg>
          </div>
        </div>

        {/* Saved Plots */}
        {allPlots.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                ✅ Saved Plots ({allPlots.length})
              </h2>
              <button
                onClick={() => setAllPlots([])}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600"
              >
                🗑️ Clear All
              </button>
            </div>
            
            {/* Plot List */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {allPlots.map((plot, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <span className="font-bold text-sm">Plot #{plot.number}</span>
                  <button
                    onClick={() => deletePlot(index)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            
            {/* Code Output */}
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs md:text-sm overflow-x-auto max-h-96 overflow-y-auto">
              <pre>
                {allPlots.map(p => p.code).join('\n')}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoordinatePicker
