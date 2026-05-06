import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getPlotStats } from '../data/plotData'
import { Activity, TrendingUp, Clock, Users } from 'lucide-react'

const LiveAvailability = () => {
  const [stats, setStats] = useState(getPlotStats())
  const [liveViewers, setLiveViewers] = useState(0)
  const [recentActivity, setRecentActivity] = useState([])
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    // Simulate live viewers (random between 15-45)
    const updateViewers = () => {
      setLiveViewers(Math.floor(Math.random() * 30) + 15)
    }
    updateViewers()
    const viewerInterval = setInterval(updateViewers, 5000)

    // Simulate recent activity
    const activities = [
      'राज कुमार ने प्लॉट #45 देखा',
      'प्रिया शर्मा ने प्लॉट #23 के लिए पूछताछ की',
      'अमित वर्मा ने प्लॉट #67 बुक किया',
      'सुनीता देवी ने साइट विजिट बुक की',
      'राहुल सिंह ने प्लॉट #89 शेयर किया',
      'मनीष गुप्ता ने EMI कैलकुलेटर इस्तेमाल किया',
      'अंजलि पाठक ने प्लॉट #12 के लिए कॉल किया',
      'विकास यादव ने 3 प्लॉट compare किए'
    ]

    const addActivity = () => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)]
      const timeAgo = Math.floor(Math.random() * 30) + 1
      setRecentActivity(prev => [
        { text: randomActivity, time: `${timeAgo} मिनट पहले`, id: `${Date.now()}-${Math.random()}` },
        ...prev.slice(0, 4)
      ])
    }

    // Add initial activities
    for (let i = 0; i < 3; i++) {
      setTimeout(() => addActivity(), i * 1000)
    }

    const activityInterval = setInterval(addActivity, 8000)

    // Update timestamp
    const timeInterval = setInterval(() => {
      setLastUpdated(new Date())
    }, 60000)

    return () => {
      clearInterval(viewerInterval)
      clearInterval(activityInterval)
      clearInterval(timeInterval)
    }
  }, [])

  const getTimeAgo = () => {
    const now = new Date()
    const diff = Math.floor((now - lastUpdated) / 1000 / 60)
    if (diff === 0) return 'अभी-अभी'
    if (diff === 1) return '1 मिनट पहले'
    return `${diff} मिनट पहले`
  }

  const availabilityPercentage = ((stats.available / stats.total) * 100).toFixed(1)

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {/* Compact Status Bar */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-sm overflow-hidden border border-green-200">
              <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-charcoal font-semibold">Live Availability</span>
                  <span className="text-sm text-charcoal/60">• Updated {getTimeAgo()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-charcoal/70">
                  <Users size={16} />
                  <span>{liveViewers} viewing now</span>
                </div>
              </div>

              <div className="px-6 pb-4">
                <div className="grid grid-cols-4 gap-3">
                  {/* Available */}
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-green-600 mb-1">
                      {stats.available}
                    </div>
                    <div className="text-xs text-charcoal/60">Available</div>
                  </div>

                  {/* Booked */}
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-yellow-600 mb-1">
                      {stats.booked}
                    </div>
                    <div className="text-xs text-charcoal/60">Booked</div>
                  </div>

                  {/* Sold */}
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-red-600 mb-1">
                      {stats.sold}
                    </div>
                    <div className="text-xs text-charcoal/60">Sold</div>
                  </div>

                  {/* Total */}
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-saffron mb-1">
                      {stats.total}
                    </div>
                    <div className="text-xs text-charcoal/60">Total</div>
                  </div>
                </div>

                {/* Compact Progress Bar */}
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full flex">
                      <div
                        className="bg-red-500 transition-all duration-1000"
                        style={{ width: `${(stats.sold / stats.total) * 100}%` }}
                      ></div>
                      <div
                        className="bg-yellow-500 transition-all duration-1000"
                        style={{ width: `${(stats.booked / stats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-center text-charcoal/60 mt-2">
                    ⚠️ Only {stats.available} plots remaining • Book now!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LiveAvailability
