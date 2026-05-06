import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Phone, User, MapPin, CreditCard, CheckCircle, Clock } from 'lucide-react'

const QuickBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    plotPreference: '',
    budget: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create WhatsApp message
    const message = `🏡 *QUICK BOOKING REQUEST*%0A%0A` +
      `नाम: ${formData.name}%0A` +
      `फोन: ${formData.phone}%0A` +
      `प्लॉट preference: ${formData.plotPreference}%0A` +
      `Budget: ${formData.budget}%0A%0A` +
      `कृपया मुझसे जल्दी संपर्क करें। मैं आज ही booking करना चाहता हूं।`
    
    // Open WhatsApp
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank')
    
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', phone: '', plotPreference: '', budget: '' })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <section className="py-12 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl mx-auto text-center text-white"
          >
            <CheckCircle size={64} className="mx-auto mb-4 text-white" />
            <h2 className="text-3xl font-bold mb-2">Request Sent Successfully! 🎉</h2>
            <p className="text-lg opacity-90 mb-4">
              हमारी team आपसे 2 मिनट में contact करेगी
            </p>
            <div className="bg-white/20 rounded-xl p-4">
              <p className="text-sm">
                📱 WhatsApp पर message भी भेजा गया है
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-saffron/10 via-gold/10 to-orange/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="text-saffron animate-pulse" size={32} />
              <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal">
                तुरंत बुकिंग
              </h2>
              <Zap className="text-saffron animate-pulse" size={32} />
            </div>
            <p className="text-lg text-charcoal/70 mb-4">
              सिर्फ 30 सेकंड में अपना प्लॉट book करें
            </p>
            
            {/* Benefits */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
                <Clock size={14} />
                <span>2 मिनट में callback</span>
              </div>
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle size={14} />
                <span>Instant confirmation</span>
              </div>
              <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-1">
                <CreditCard size={14} />
                <span>Token amount ₹5,000</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-charcoal font-semibold mb-2">
                    <User size={18} className="text-saffron" />
                    आपका नाम *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="पूरा नाम लिखें"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-charcoal font-semibold mb-2">
                    <Phone size={18} className="text-saffron" />
                    मोबाइल नंबर *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="10 अंकों का नंबर"
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none transition-all"
                  />
                </div>

                {/* Plot Preference */}
                <div>
                  <label className="flex items-center gap-2 text-charcoal font-semibold mb-2">
                    <MapPin size={18} className="text-saffron" />
                    प्लॉट की पसंद
                  </label>
                  <select
                    name="plotPreference"
                    value={formData.plotPreference}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none transition-all"
                  >
                    <option value="">Select करें</option>
                    <option value="corner-plot">Corner Plot</option>
                    <option value="main-road">Main Road Facing</option>
                    <option value="park-facing">Park Facing</option>
                    <option value="any">कोई भी अच्छा प्लॉट</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="flex items-center gap-2 text-charcoal font-semibold mb-2">
                    <CreditCard size={18} className="text-saffron" />
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none transition-all"
                  >
                    <option value="">Select करें</option>
                    <option value="8-10-lakh">₹8-10 लाख</option>
                    <option value="10-12-lakh">₹10-12 लाख</option>
                    <option value="12-15-lakh">₹12-15 लाख</option>
                    <option value="15-plus">₹15 लाख+</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-saffron to-gold hover:from-gold hover:to-saffron text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Zap size={20} />
                  तुरंत Book करें
                </button>

                <p className="text-xs text-charcoal/60 text-center">
                  * हमारी team आपसे 2 मिनट में contact करेगी
                </p>
              </form>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-display font-bold text-charcoal mb-4">
                  🚀 Instant Booking के फायदे
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-charcoal/80">Best plots की priority मिलेगी</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-charcoal/80">Price lock - बाद में rate नहीं बढ़ेगा</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-charcoal/80">Free site visit और documentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                    <span className="text-charcoal/80">EMI की सुविधा तुरंत मिलेगी</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                <h4 className="text-xl font-bold mb-3">⏰ Limited Time Offer</h4>
                <p className="text-sm opacity-90 mb-3">
                  आज booking करने पर:
                </p>
                <ul className="text-sm space-y-1">
                  <li>✓ Registration charges FREE</li>
                  <li>✓ ₹10,000 तक की extra discount</li>
                  <li>✓ Flexible payment plan</li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-sm text-charcoal/60 mb-2">
                  या direct call करें:
                </p>
                <a
                  href="tel:+919876543210"
                  className="inline-block bg-saffron text-white px-6 py-3 rounded-full font-semibold hover:bg-gold transition-all"
                >
                  📞 +91 98765 43210
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default QuickBooking