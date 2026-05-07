// Migration utility to clear old plots and initialize zones
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

// Default zones data
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

// Delete all old plots
export const deleteAllPlots = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'plots'))
    const deletePromises = querySnapshot.docs.map(document => 
      deleteDoc(doc(db, 'plots', document.id))
    )
    await Promise.all(deletePromises)
    console.log(`✅ Deleted ${querySnapshot.size} old plots`)
    return { success: true, count: querySnapshot.size }
  } catch (error) {
    console.error('❌ Error deleting plots:', error)
    return { success: false, error }
  }
}

// Initialize zones in Firebase
export const initializeZones = async () => {
  try {
    const promises = defaultZones.map(zone => 
      setDoc(doc(db, 'zones', zone.id), {
        ...zone,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    )
    await Promise.all(promises)
    console.log(`✅ Initialized ${defaultZones.length} zones`)
    return { success: true, count: defaultZones.length }
  } catch (error) {
    console.error('❌ Error initializing zones:', error)
    return { success: false, error }
  }
}

// Complete migration: delete plots and initialize zones
export const migrateToZones = async () => {
  console.log('🚀 Starting migration...')
  
  // Step 1: Delete old plots
  const deleteResult = await deleteAllPlots()
  if (!deleteResult.success) {
    return { success: false, message: 'Failed to delete old plots', error: deleteResult.error }
  }
  
  // Step 2: Initialize zones
  const initResult = await initializeZones()
  if (!initResult.success) {
    return { success: false, message: 'Failed to initialize zones', error: initResult.error }
  }
  
  console.log('✅ Migration completed successfully!')
  return { 
    success: true, 
    message: `Migration completed! Deleted ${deleteResult.count} plots, initialized ${initResult.count} zones`
  }
}
