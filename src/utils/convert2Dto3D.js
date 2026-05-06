// Convert 2D SVG coordinates to 3D positions
// SVG coordinates are in pixels, we need to scale them to 3D world units

export function convert2Dto3D(svgCoords, imageWidth = 1024, imageHeight = 700) {
  // Parse SVG polygon coordinates "x1,y1 x2,y2 x3,y3 x4,y4"
  const points = svgCoords.split(' ').map(point => {
    const [x, y] = point.split(',').map(Number)
    return { x, y }
  })
  
  // Calculate center point
  const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length
  const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length
  
  // Calculate dimensions
  const minX = Math.min(...points.map(p => p.x))
  const maxX = Math.max(...points.map(p => p.x))
  const minY = Math.min(...points.map(p => p.y))
  const maxY = Math.max(...points.map(p => p.y))
  
  const width = maxX - minX
  const height = maxY - minY
  
  // Scale factor: Convert pixels to 3D units
  // Assuming the colony is about 200 units wide in 3D
  const scale = 200 / imageWidth
  
  // Convert to 3D coordinates
  // Center the colony at origin (0, 0, 0)
  const x3D = (centerX - imageWidth / 2) * scale
  const z3D = (centerY - imageHeight / 2) * scale
  const y3D = 0 // Ground level
  
  // Calculate 3D dimensions
  const width3D = width * scale
  const depth3D = height * scale
  const height3D = 0.5 // Plot height (thickness)
  
  return {
    position: [x3D, y3D, z3D],
    size: [width3D, height3D, depth3D],
    center2D: { x: centerX, y: centerY },
    dimensions2D: { width, height }
  }
}

// Get all plot 3D data from SVG coordinates
export function getAllPlots3D(plotPolygons, plotDataArray) {
  return Object.entries(plotPolygons).map(([plotNum, coords]) => {
    const plot = plotDataArray.find(p => p.number === plotNum.toString())
    if (!plot) return null
    
    const { position, size } = convert2Dto3D(coords)
    
    return {
      ...plot,
      position3D: position,
      size3D: size,
      svgCoords: coords
    }
  }).filter(Boolean)
}
