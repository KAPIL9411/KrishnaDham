import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'

// Complete plot data for all 116 plots with Hindi area descriptions
const allPlotsData = [
  // Bottom row plots (1-14) - Along Nadeli Bahapur Road
  { number: '1', area: '150 वर्ग गज', facing: 'दक्षिण', price: 1200000, status: 'available' },
  { number: '2', area: '150 वर्ग गज', facing: 'दक्षिण', price: 1200000, status: 'available' },
  { number: '3', area: '150 वर्ग गज', facing: 'दक्षिण', price: 1200000, status: 'available' },
  { number: '4', area: '150 वर्ग गज', facing: 'दक्षिण', price: 1200000, status: 'available' },
  { number: '5', area: '150 वर्ग गज', facing: 'दक्षिण', price: 1200000, status: 'available' },
  { number: '6', area: '150 वर्ग गज', facing: 'दक्षिण', price: 1200000, status: 'available' },
  { number: '7', area: '150 वर्ग गज', facing: 'दक्षिण', price: 1200000, status: 'available' },
  { number: '8', area: '150 वर्ग गज', facing: 'दक्षिण', price: 1200000, status: 'available' },
  { number: '9', area: '150 वर्ग गज', facing: 'दक्षिण', price: 1200000, status: 'available' },
  { number: '10', area: '150 वर्ग गज', facing: 'दक्षिण', price: 1200000, status: 'available' },
  { number: '11', area: '50 वर्ग गज', facing: 'दक्षिण', price: 800000, status: 'available' },
  { number: '12', area: '50 वर्ग गज', facing: 'दक्षिण', price: 800000, status: 'available' },
  { number: '13', area: '50 वर्ग गज', facing: 'दक्षिण', price: 800000, status: 'available' },
  { number: '14', area: '50 वर्ग गज', facing: 'दक्षिण', price: 800000, status: 'sold' },

  // Left column (15-28) - Single column along Road 20ft Wide
  { number: '15', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },
  { number: '16', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },
  { number: '17', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },
  { number: '18', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },
  { number: '19', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },
  { number: '20', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },
  { number: '21', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },
  { number: '22', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },
  { number: '23', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },
  { number: '24', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },
  { number: '25', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },
  { number: '26', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },
  { number: '27', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },
  { number: '28', area: '50 वर्ग गज', facing: 'पूर्व', price: 850000, status: 'available' },

  // Second block left (29-38) - West facing
  { number: '29', area: '60 वर्ग गज', facing: 'पश्चिम', price: 900000, status: 'available' },
  { number: '30', area: '60 वर्ग गज', facing: 'पश्चिम', price: 900000, status: 'available' },
  { number: '31', area: '60 वर्ग गज', facing: 'पश्चिम', price: 900000, status: 'available' },
  { number: '32', area: '60 वर्ग गज', facing: 'पश्चिम', price: 900000, status: 'available' },
  { number: '33', area: '60 वर्ग गज', facing: 'पश्चिम', price: 900000, status: 'available' },
  { number: '34', area: '60 वर्ग गज', facing: 'पश्चिम', price: 900000, status: 'available' },
  { number: '35', area: '60 वर्ग गज', facing: 'पश्चिम', price: 900000, status: 'available' },
  { number: '36', area: '60 वर्ग गज', facing: 'पश्चिम', price: 900000, status: 'available' },
  { number: '37', area: '60 वर्ग गज', facing: 'पश्चिम', price: 900000, status: 'available' },
  { number: '38', area: '60 वर्ग गज', facing: 'पश्चिम', price: 900000, status: 'available' },

  // Second block right (39-48) - East facing
  { number: '39', area: '60 वर्ग गज', facing: 'पूर्व', price: 900000, status: 'available' },
  { number: '40', area: '60 वर्ग गज', facing: 'पूर्व', price: 900000, status: 'available' },
  { number: '41', area: '60 वर्ग गज', facing: 'पूर्व', price: 900000, status: 'available' },
  { number: '42', area: '60 वर्ग गज', facing: 'पूर्व', price: 900000, status: 'available' },
  { number: '43', area: '60 वर्ग गज', facing: 'पूर्व', price: 900000, status: 'available' },
  { number: '44', area: '60 वर्ग गज', facing: 'पूर्व', price: 900000, status: 'available' },
  { number: '45', area: '60 वर्ग गज', facing: 'पूर्व', price: 900000, status: 'available' },
  { number: '46', area: '60 वर्ग गज', facing: 'पूर्व', price: 900000, status: 'available' },
  { number: '47', area: '60 वर्ग गज', facing: 'पूर्व', price: 900000, status: 'available' },
  { number: '48', area: '60 वर्ग गज', facing: 'पूर्व', price: 900000, status: 'available' },

  // Third block left (49-60) - West facing
  { number: '49', area: '75 वर्ग गज', facing: 'पश्चिम', price: 950000, status: 'available' },
  { number: '50', area: '75 वर्ग गज', facing: 'पश्चिम', price: 950000, status: 'booked' },
  { number: '51', area: '75 वर्ग गज', facing: 'पश्चिम', price: 950000, status: 'available' },
  { number: '52', area: '75 वर्ग गज', facing: 'पश्चिम', price: 950000, status: 'available' },
  { number: '53', area: '75 वर्ग गज', facing: 'पश्चिम', price: 950000, status: 'available' },
  { number: '54', area: '75 वर्ग गज', facing: 'पश्चिम', price: 950000, status: 'available' },
  { number: '55', area: '75 वर्ग गज', facing: 'पश्चिम', price: 950000, status: 'sold' },
  { number: '56', area: '75 वर्ग गज', facing: 'पश्चिम', price: 950000, status: 'available' },
  { number: '57', area: '75 वर्ग गज', facing: 'पश्चिम', price: 950000, status: 'available' },
  { number: '58', area: '75 वर्ग गज', facing: 'पश्चिम', price: 950000, status: 'available' },
  { number: '59', area: '75 वर्ग गज', facing: 'पश्चिम', price: 950000, status: 'available' },
  { number: '60', area: '75 वर्ग गज', facing: 'पश्चिम', price: 950000, status: 'available' },

  // Third block right (61-72) - East facing
  { number: '61', area: '75 वर्ग गज', facing: 'पूर्व', price: 950000, status: 'available' },
  { number: '62', area: '75 वर्ग गज', facing: 'पूर्व', price: 950000, status: 'available' },
  { number: '63', area: '75 वर्ग गज', facing: 'पूर्व', price: 950000, status: 'available' },
  { number: '64', area: '75 वर्ग गज', facing: 'पूर्व', price: 950000, status: 'booked' },
  { number: '65', area: '75 वर्ग गज', facing: 'पूर्व', price: 950000, status: 'available' },
  { number: '66', area: '75 वर्ग गज', facing: 'पूर्व', price: 950000, status: 'available' },
  { number: '67', area: '75 वर्ग गज', facing: 'पूर्व', price: 950000, status: 'available' },
  { number: '68', area: '75 वर्ग गज', facing: 'पूर्व', price: 950000, status: 'available' },
  { number: '69', area: '75 वर्ग गज', facing: 'पूर्व', price: 950000, status: 'sold' },
  { number: '70', area: '75 वर्ग गज', facing: 'पूर्व', price: 950000, status: 'available' },
  { number: '71', area: '75 वर्ग गज', facing: 'पूर्व', price: 950000, status: 'available' },
  { number: '72', area: '75 वर्ग गज', facing: 'पूर्व', price: 950000, status: 'available' },

  // Fourth block left (73-82) - West facing
  { number: '73', area: '100 वर्ग गज', facing: 'पश्चिम', price: 1000000, status: 'available' },
  { number: '74', area: '100 वर्ग गज', facing: 'पश्चिम', price: 1000000, status: 'available' },
  { number: '75', area: '100 वर्ग गज', facing: 'पश्चिम', price: 1000000, status: 'available' },
  { number: '76', area: '100 वर्ग गज', facing: 'पश्चिम', price: 1000000, status: 'available' },
  { number: '77', area: '100 वर्ग गज', facing: 'पश्चिम', price: 1000000, status: 'booked' },
  { number: '78', area: '100 वर्ग गज', facing: 'पश्चिम', price: 1000000, status: 'available' },
  { number: '79', area: '100 वर्ग गज', facing: 'पश्चिम', price: 1000000, status: 'available' },
  { number: '80', area: '100 वर्ग गज', facing: 'पश्चिम', price: 1000000, status: 'available' },
  { number: '81', area: '100 वर्ग गज', facing: 'पश्चिम', price: 1000000, status: 'available' },
  { number: '82', area: '100 वर्ग गज', facing: 'पश्चिम', price: 1000000, status: 'sold' },

  // Fourth block right (83-92) - East facing
  { number: '83', area: '100 वर्ग गज', facing: 'पूर्व', price: 1000000, status: 'available' },
  { number: '84', area: '100 वर्ग गज', facing: 'पूर्व', price: 1000000, status: 'available' },
  { number: '85', area: '100 वर्ग गज', facing: 'पूर्व', price: 1000000, status: 'available' },
  { number: '86', area: '100 वर्ग गज', facing: 'पूर्व', price: 1000000, status: 'available' },
  { number: '87', area: '100 वर्ग गज', facing: 'पूर्व', price: 1000000, status: 'booked' },
  { number: '88', area: '100 वर्ग गज', facing: 'पूर्व', price: 1000000, status: 'available' },
  { number: '89', area: '100 वर्ग गज', facing: 'पूर्व', price: 1000000, status: 'available' },
  { number: '90', area: '100 वर्ग गज', facing: 'पूर्व', price: 1000000, status: 'available' },
  { number: '91', area: '100 वर्ग गज', facing: 'पूर्व', price: 1000000, status: 'available' },
  { number: '92', area: '100 वर्ग गज', facing: 'पूर्व', price: 1000000, status: 'sold' },

  // Right section top row (93-96)
  { number: '93', area: '120 वर्ग गज', facing: 'उत्तर', price: 1100000, status: 'available' },
  { number: '94', area: '120 वर्ग गज', facing: 'उत्तर', price: 1100000, status: 'available' },
  { number: '95', area: '120 वर्ग गज', facing: 'उत्तर', price: 1100000, status: 'available' },
  { number: '96', area: '120 वर्ग गज', facing: 'उत्तर', price: 1100000, status: 'available' },

  // Right section (97-100) - Below Road 15-0' Wide
  { number: '97', area: '120 वर्ग गज', facing: 'दक्षिण', price: 1100000, status: 'available' },
  { number: '98', area: '120 वर्ग गज', facing: 'दक्षिण', price: 1100000, status: 'available' },
  { number: '99', area: '120 वर्ग गज', facing: 'दक्षिण', price: 1100000, status: 'booked' },
  { number: '100', area: '120 वर्ग गज', facing: 'दक्षिण', price: 1100000, status: 'available' },

  // Right section double column left (101-109)
  { number: '101', area: '120 वर्ग गज', facing: 'पश्चिम', price: 1100000, status: 'available' },
  { number: '102', area: '120 वर्ग गज', facing: 'पश्चिम', price: 1100000, status: 'available' },
  { number: '103', area: '120 वर्ग गज', facing: 'पश्चिम', price: 1100000, status: 'available' },
  { number: '104', area: '120 वर्ग गज', facing: 'पश्चिम', price: 1100000, status: 'available' },
  { number: '105', area: '120 वर्ग गज', facing: 'पश्चिम', price: 1100000, status: 'available' },
  { number: '106', area: '120 वर्ग गज', facing: 'पश्चिम', price: 1100000, status: 'booked' },
  { number: '107', area: '120 वर्ग गज', facing: 'पश्चिम', price: 1100000, status: 'available' },
  { number: '108', area: '120 वर्ग गज', facing: 'पश्चिम', price: 1100000, status: 'available' },
  { number: '109', area: '120 वर्ग गज', facing: 'पश्चिम', price: 1100000, status: 'available' },

  // Right section double column right (110-116)
  { number: '110', area: '120 वर्ग गज', facing: 'पूर्व', price: 1100000, status: 'available' },
  { number: '111', area: '120 वर्ग गज', facing: 'पूर्व', price: 1100000, status: 'available' },
  { number: '112', area: '120 वर्ग गज', facing: 'पूर्व', price: 1100000, status: 'available' },
  { number: '113', area: '120 वर्ग गज', facing: 'पूर्व', price: 1100000, status: 'available' },
  { number: '114', area: '120 वर्ग गज', facing: 'पूर्व', price: 1100000, status: 'available' },
  { number: '115', area: '120 वर्ग गज', facing: 'पूर्व', price: 1100000, status: 'sold' },
  { number: '116', area: '120 वर्ग गज', facing: 'पूर्व', price: 1100000, status: 'available' }
]

// Function to clear existing data and upload new data
export const uploadAllPlotData = async () => {
  try {
    console.log('🔥 Starting plot data upload...')
    
    // First, clear existing data
    const querySnapshot = await getDocs(collection(db, 'plots'))
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deletePromises)
    console.log('🗑️ Cleared existing plot data')

    // Upload new data
    const uploadPromises = allPlotsData.map(async (plot) => {
      const plotDoc = {
        ...plot,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      return addDoc(collection(db, 'plots'), plotDoc)
    })

    await Promise.all(uploadPromises)
    console.log('✅ Successfully uploaded all 116 plots!')
    
    return {
      success: true,
      message: `सफलतापूर्वक ${allPlotsData.length} प्लॉट्स अपलोड हो गए!`,
      count: allPlotsData.length
    }
  } catch (error) {
    console.error('❌ Error uploading plot data:', error)
    return {
      success: false,
      message: 'प्लॉट डेटा अपलोड करने में त्रुटि!',
      error: error.message
    }
  }
}

// Function to get plot statistics
export const getUploadStats = () => {
  const total = allPlotsData.length
  const available = allPlotsData.filter(p => p.status === 'available').length
  const booked = allPlotsData.filter(p => p.status === 'booked').length
  const sold = allPlotsData.filter(p => p.status === 'sold').length
  
  return { total, available, booked, sold }
}