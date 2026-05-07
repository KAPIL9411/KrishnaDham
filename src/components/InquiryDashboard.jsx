import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'
import { 
  User, Phone, MapPin, Ruler, IndianRupee, Calendar, 
  CheckCircle, Clock, XCircle, MessageCircle 
} from 'lucide-react'

const InquiryDashboard = () => {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending, assigned, confirmed

  useEffect(() => {
    loadInquiries()
  }, [])

  const loadInquiries = async () => {
    try {
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const inquiriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setInquiries(inquiriesData)
    } catch (error) {
      console.error('Error loading inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAssignPlot = async (inquiry) => {
    const plotNumber = prompt('Plot Number assign करें (जैसे: A-15, B-23):')
    if (!plotNumber) return

    const finalArea = prompt('Final Area (sq yd):', inquiry.requiredArea)
    if (!finalArea) return

    const pricePerSqYd = prompt('Rate per sq yd (₹):', '6500')
    if (!pricePerSqYd) return

    const finalPrice = parseInt(finalArea) * parseInt(pricePerSqYd)

    try {
      const inquiryRef = doc(db, 'inquiries', inquiry.id)
      await updateDoc(inquiryRef, {
        status: 'assigned',
        assignedPlotNumber: plotNumber,
        finalArea: parseInt(finalArea),
        pricePerSqYd: parseInt(pricePerSqYd),
        finalPrice: finalPrice,
        updatedAt: new Date()
      })

      // WhatsApp message to customer
      const message = `🎉 *Plot Assigned!*%0A%0A` +
        `नमस्ते ${inquiry.name} जी,%0A%0A` +
        `आपकी inquiry के लिए धन्यवाद!%0A%0A` +
        `*Plot Details:*%0A` +
        `📍 Plot Number: ${plotNumber}%0A` +
        `📏 Area: ${finalArea} sq yd%0A` +
        `💰 Rate: ₹${pricePerSqYd}/sq yd%0A` +
        `💵 Total Price: ₹${(finalPrice/100000).toFixed(2)} Lakh%0A%0A` +
        `Site visit के लिए हमसे संपर्क करें।%0A%0A` +
        `📞 Call: +91 82795 29681`

      window.open(`https://wa.me/91${inquiry.phone}?text=${message}`, '_blank')

      loadInquiries()
      alert('Plot assigned successfully!')
    } catch (error) {
      console.error('Error assigning plot:', error)
      alert('Error assigning plot')
    }
  }

  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      const inquiryRef = doc(db, 'inquiries', inquiryId)
      await updateDoc(inquiryRef, {
        status: newStatus,
        updatedAt: new Date()
      })
      loadInquiries()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'assigned': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'पेंडिंग'
      case 'assigned': return 'असाइन किया गया'
      case 'confirmed': return 'कन्फर्म'
      case 'rejected': return 'रिजेक्ट'
      default: return status
    }
  }

  const filteredInquiries = filter === 'all' 
    ? inquiries 
    : inquiries.filter(inq => inq.status === filter)

  const stats = {
    total: inquiries.length,
    pending: inquiries.filter(i => i.status === 'pending').length,
    assigned: inquiries.filter(i => i.status === 'assigned').length,
    confirmed: inquiries.filter(i => i.status === 'confirmed').length
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-charcoal mb-2">
            प्लॉट इन्क्वायरी
          </h1>
          <p className="text-charcoal/70">ग्राहक इन्क्वायरी मैनेज करें और प्लॉट असाइन करें</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-charcoal/70">कुल इन्क्वायरी</span>
              <User className="text-saffron" size={20} />
            </div>
            <p className="text-3xl font-bold text-charcoal">{stats.total}</p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 shadow-sm border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-yellow-700">पेंडिंग</span>
              <Clock className="text-yellow-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 shadow-sm border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-700">असाइन किया गया</span>
              <CheckCircle className="text-blue-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-blue-700">{stats.assigned}</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 shadow-sm border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-700">कन्फर्म</span>
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-green-700">{stats.confirmed}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-charcoal font-semibold">फ़िल्टर:</span>
            {['all', 'pending', 'assigned', 'confirmed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === status
                    ? 'bg-saffron text-white'
                    : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'सभी' : status === 'pending' ? 'पेंडिंग' : status === 'assigned' ? 'असाइन किया गया' : 'कन्फर्म'}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries List */}
        <div className="space-y-4">
          {filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
              <p className="text-charcoal/50">कोई इन्क्वायरी नहीं मिली</p>
            </div>
          ) : (
            filteredInquiries.map((inquiry) => (
              <motion.div
                key={inquiry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User size={18} className="text-saffron" />
                      <span className="font-semibold text-charcoal">{inquiry.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={18} className="text-saffron" />
                      <a href={`tel:${inquiry.phone}`} className="text-charcoal/70 hover:text-saffron">
                        {inquiry.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-saffron" />
                      <span className="text-charcoal/70 text-sm">
                        {inquiry.createdAt?.toDate().toLocaleDateString('hi-IN')}
                      </span>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(inquiry.status)}`}>
                        {getStatusText(inquiry.status)}
                      </span>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-saffron" />
                      <span className="text-charcoal/70 text-sm">
                        {inquiry.preferredLocation || 'कोई भी लोकेशन'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler size={18} className="text-saffron" />
                      <span className="text-charcoal/70 text-sm">
                        {inquiry.requiredArea ? `${inquiry.requiredArea} sq yd` : 'निर्दिष्ट नहीं'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee size={18} className="text-saffron" />
                      <span className="text-charcoal/70 text-sm">
                        ₹{(inquiry.budgetMin/100000).toFixed(1)}L - ₹{(inquiry.budgetMax/100000).toFixed(1)}L
                      </span>
                    </div>
                    {inquiry.additionalRequirements && (
                      <div className="text-sm text-charcoal/70 bg-gray-50 p-2 rounded">
                        <strong>आवश्यकताएं:</strong> {inquiry.additionalRequirements}
                      </div>
                    )}
                  </div>

                  {/* Actions & Assignment */}
                  <div className="space-y-3">
                    {inquiry.assignedPlotNumber && (
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                        <p className="text-sm font-semibold text-blue-700 mb-2">असाइन किया गया प्लॉट:</p>
                        <p className="text-2xl font-bold text-blue-700">{inquiry.assignedPlotNumber}</p>
                        <p className="text-sm text-blue-600 mt-1">
                          {inquiry.finalArea} sq yd × ₹{inquiry.pricePerSqYd} = ₹{(inquiry.finalPrice/100000).toFixed(2)}L
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      {inquiry.status === 'pending' && (
                        <button
                          onClick={() => handleAssignPlot(inquiry)}
                          className="bg-saffron text-white px-4 py-2 rounded-lg font-semibold hover:bg-gold transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle size={18} />
                          प्लॉट असाइन करें
                        </button>
                      )}

                      {inquiry.status === 'assigned' && (
                        <button
                          onClick={() => handleStatusChange(inquiry.id, 'confirmed')}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle size={18} />
                          कन्फर्म करें
                        </button>
                      )}

                      <a
                        href={`https://wa.me/91${inquiry.phone}?text=नमस्ते ${inquiry.name} जी, आपकी plot inquiry के बारे में बात करनी है।`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={18} />
                        WhatsApp करें
                      </a>

                      {inquiry.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(inquiry.id, 'rejected')}
                          className="bg-gray-200 text-charcoal px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
                        >
                          <XCircle size={18} />
                          रिजेक्ट करें
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default InquiryDashboard
