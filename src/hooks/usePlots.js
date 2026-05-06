import { useState, useEffect } from 'react'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

// Fallback data in case Firebase is not available
const fallbackPlotData = [
  {
    id: '1',
    number: '1',
    area: '1000 वर्ग फुट',
    facing: 'उत्तर',
    price: 850000,
    status: 'available'
  },
  {
    id: '2', 
    number: '2',
    area: '1200 वर्ग फुट',
    facing: 'पूर्व',
    price: 950000,
    status: 'available'
  },
  {
    id: '3',
    number: '3', 
    area: '800 वर्ग फुट',
    facing: 'दक्षिण',
    price: 750000,
    status: 'sold'
  },
  // Add more fallback data as needed...
]

export const usePlots = () => {
  const [plots, setPlots] = useState(fallbackPlotData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Set up real-time listener for plots collection
    const unsubscribe = onSnapshot(
      collection(db, 'plots'),
      (querySnapshot) => {
        try {
          const plotsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          
          // If no data in Firebase, use fallback
          if (plotsData.length === 0) {
            setPlots(fallbackPlotData)
          } else {
            setPlots(plotsData)
          }
          
          setLoading(false)
          setError(null)
        } catch (err) {
          console.error('Error fetching plots:', err)
          setError(err)
          setPlots(fallbackPlotData) // Use fallback on error
          setLoading(false)
        }
      },
      (err) => {
        console.error('Error listening to plots:', err)
        setError(err)
        setPlots(fallbackPlotData) // Use fallback on error
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  // Calculate stats
  const getPlotStats = () => {
    return {
      total: plots.length,
      available: plots.filter(p => p.status === 'available').length,
      booked: plots.filter(p => p.status === 'booked').length,
      sold: plots.filter(p => p.status === 'sold').length
    }
  }

  return {
    plots,
    loading,
    error,
    getPlotStats
  }
}