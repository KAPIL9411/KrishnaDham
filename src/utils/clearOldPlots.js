// Utility to clear all old plots from Firebase
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'

export const clearAllPlots = async () => {
  try {
    console.log('🗑️ Deleting all old plots...')
    
    const querySnapshot = await getDocs(collection(db, 'plots'))
    const deletePromises = querySnapshot.docs.map(document => 
      deleteDoc(doc(db, 'plots', document.id))
    )
    
    await Promise.all(deletePromises)
    
    console.log(`✅ Deleted ${querySnapshot.size} plots successfully!`)
    return { success: true, count: querySnapshot.size }
  } catch (error) {
    console.error('❌ Error deleting plots:', error)
    return { success: false, error }
  }
}

// Run this function once to clear all plots
// clearAllPlots()
