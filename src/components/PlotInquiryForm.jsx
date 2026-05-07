import { useState } from 'react'
import { motion } from 'framer-motion'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/config'
import { User, Phone, MapPin, Ruler, IndianRupee, MessageSquare, CheckCircle } from 'lucide-react'

const PlotInquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredLocation: '',
    requiredArea: '',
    budgetMin: 500000,
    budgetMax: 1500000,
    additionalRequirements: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const locations = [
    'Road 16 - Left Side',
    'Road 16 - Right Side',
    'Road 20 - Left Side',
    'Road 20 - Right Side',
    'Road 20 (Bottom) - Left Side',
    'Road 20 (Bottom) - Right Side',
    'Nadeli Bahapur Road - Corner Plots',
    'Sarkari Road - Front Plots',
    'कोई भी अच्छी location'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Save to Firebase
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        status: 'pending',
        assignedPlotNumber: null,
        finalArea: null,
        finalPrice: null,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      // WhatsApp notification to admin
      const message = `🏡 *New Plot Inquiry*%0A%0A` +
        `👤 Name: ${formData.name}%0A` +
        `📞 Phone: ${formData.phone}%0A` +
        `📍 Location: ${formData.preferredLocation}%0A` +
        `📏 Area: ${formData.requiredArea} sq yd%0A` +
        `💰 Budget: ₹${(formData.budgetMin/100000).toFixed(1)}L - ₹${(formData.budgetMax/100000).toFixed(1)}L%0A` +
        `📝 Requirements: ${formData.additionalRequirements || 'None'}%0A%0A` +
        `*Action Required:* Call customer and schedule site visit`

      // Send to admin WhatsApp
      window.open(`https://wa.me/918279529681?text=${message}`, '_blank')

      // Show success
      setShowSuccess(true)
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        preferredLocation: '',
        requiredArea: '',
        budgetMin: 500000,
        budgetMax: 1500000,
        additionalRequirements: ''
      })

      // Hide success after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)

    } catch (error) {
      console.error('Error submitting inquiry:', error)
      alert('कुछ गड़बड़ हो गई। कृपया फिर से कोशिश करें।')
    } finally {
      setIsSubmitting(false)
    }
  }

  const estimatedPrice = () => {
    if (!formData.requiredArea) return { min: 0, max: 0 }
    const area = parseInt(formData.requiredArea)
    const rateMin = 5000 // per sq yd
    const rateMax = 8000 // per sq yd
    return {
      min: area * rateMin,
      max: area * rateMax
    }
  }

  const price = estimatedPrice()

  return (
    <section id="inquiry-form" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-4">
              प्लॉट की जानकारी लें
            </h2>
            <p className="text-lg text-charcoal/70 mb-2">
              अपनी requirement बताएं, हम आपको best plot suggest करेंगे
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-charcoal/60">
              <span className="flex items-center gap-1">
                <CheckCircle size={16} className="text-green-500" />
                Free Site Visit
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={16} className="text-green-500" />
                Flexible Area
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle size={16} className="text-green-500" />
                Best Price
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
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
                    placeholder="राजेश कुमार"
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
                    placeholder="9876543210"
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none transition-all"
                  />
                </div>

                {/* Preferred Location */}
                <div>
                  <label className="flex items-center gap-2 text-charcoal font-semibold mb-2">
                    <MapPin size={18} className="text-saffron" />
                    पसंदीदा location
                  </label>
                  <select
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none transition-all"
                  >
                    <option value="">Select करें</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Required Area */}
                <div>
                  <label className="flex items-center gap-2 text-charcoal font-semibold mb-2">
                    <Ruler size={18} className="text-saffron" />
                    कितना area चाहिए? (sq yd)
                  </label>
                  <input
                    type="number"
                    name="requiredArea"
                    value={formData.requiredArea}
                    onChange={handleChange}
                    placeholder="150"
                    min="50"
                    max="500"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none transition-all"
                  />
                  <p className="text-xs text-charcoal/60 mt-1">
                    Minimum: 50 sq yd • Maximum: 500 sq yd
                  </p>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="flex items-center gap-2 text-charcoal font-semibold mb-2">
                    <IndianRupee size={18} className="text-saffron" />
                    Budget Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="number"
                        name="budgetMin"
                        value={formData.budgetMin}
                        onChange={handleChange}
                        placeholder="Minimum"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none transition-all"
                      />
                      <p className="text-xs text-charcoal/60 mt-1">
                        ₹{(formData.budgetMin/100000).toFixed(1)}L
                      </p>
                    </div>
                    <div>
                      <input
                        type="number"
                        name="budgetMax"
                        value={formData.budgetMax}
                        onChange={handleChange}
                        placeholder="Maximum"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none transition-all"
                      />
                      <p className="text-xs text-charcoal/60 mt-1">
                        ₹{(formData.budgetMax/100000).toFixed(1)}L
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Requirements */}
                <div>
                  <label className="flex items-center gap-2 text-charcoal font-semibold mb-2">
                    <MessageSquare size={18} className="text-saffron" />
                    कोई और requirement?
                  </label>
                  <textarea
                    name="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={handleChange}
                    placeholder="जैसे: Corner plot, Park facing, Main road, etc."
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-saffron focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-saffron to-gold hover:from-gold hover:to-saffron text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'भेज रहे हैं...' : '📞 मुझे कॉल करें'}
                </button>

                <p className="text-xs text-center text-charcoal/60">
                  हम 2 मिनट में आपको call करेंगे
                </p>
              </form>
            </motion.div>

            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Estimated Price */}
              {formData.requiredArea && (
                <div className="bg-gradient-to-br from-saffron to-gold rounded-3xl p-8 text-white shadow-2xl">
                  <h3 className="text-2xl font-display font-bold mb-4">
                    अनुमानित कीमत
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm opacity-90">Area</p>
                      <p className="text-3xl font-bold">{formData.requiredArea} sq yd</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Price Range</p>
                      <p className="text-2xl font-bold">
                        ₹{(price.min/100000).toFixed(1)}L - ₹{(price.max/100000).toFixed(1)}L
                      </p>
                    </div>
                    <div className="bg-white/20 rounded-xl p-3 text-sm">
                      <p className="opacity-90">Rate: ₹5,000-8,000 per sq yd</p>
                      <p className="opacity-90 text-xs mt-1">
                        *Final price location और features पर depend करेगी
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-display font-bold text-charcoal mb-6">
                  आपको क्या मिलेगा?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-charcoal">Flexible Area</p>
                      <p className="text-sm text-charcoal/70">
                        50 से 500 sq yd तक, जितना चाहें उतना
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-charcoal">Best Location</p>
                      <p className="text-sm text-charcoal/70">
                        आपकी पसंद की location में plot
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-charcoal">Competitive Price</p>
                      <p className="text-sm text-charcoal/70">
                        Market के हिसाब से best rate
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-charcoal">Free Site Visit</p>
                      <p className="text-sm text-charcoal/70">
                        Ground पर जाकर plot देखें
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-6 border-2 border-green-200">
                <p className="text-sm font-semibold text-charcoal mb-2">
                  📞 तुरंत बात करना चाहते हैं?
                </p>
                <a
                  href="tel:+918279529681"
                  className="block w-full bg-saffron text-white text-center py-3 rounded-xl font-semibold hover:bg-gold transition-all"
                >
                  📞 कॉल करें: +91 82795 29681
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-charcoal mb-2">
              धन्यवाद! 🎉
            </h3>
            <p className="text-charcoal/70 mb-6">
              आपकी inquiry मिल गई है। हम 2 मिनट में आपको call करेंगे।
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-saffron text-white px-6 py-3 rounded-full font-semibold hover:bg-gold transition-all"
            >
              ठीक है
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default PlotInquiryForm
