import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, CheckCircle, Clock } from 'lucide-react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    plotInterest: '',
    budget: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission (replace with actual Supabase integration)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // WhatsApp notification
      const message = `नई पूछताछ ${formData.name} से%0Aफोन: ${formData.phone}%0Aईमेल: ${formData.email}%0Aशहर: ${formData.city}%0Aप्लॉट रुचि: ${formData.plotInterest}%0Aबजट: ${formData.budget}%0Aसंदेश: ${formData.message}`
      window.open(`https://wa.me/918279529681?text=${message}`, '_blank')

      // Reset form
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          phone: '',
          email: '',
          city: '',
          plotInterest: '',
          budget: '',
          message: '',
        })
      }, 3000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-12 md:py-20 bg-ivory w-full overflow-x-hidden">
      <div className="container mx-auto px-4 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal mb-3 md:mb-4">
            संपर्क में रहें
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-charcoal/70 px-2">
            अपनी साइट विजिट बुक करें या अधिक जानकारी का अनुरोध करें
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Mobile-First Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-6 md:mb-8">
              संपर्क जानकारी
            </h3>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-saffron/10 p-2 md:p-3 rounded-full flex-shrink-0">
                  <Phone className="text-saffron" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1 text-sm md:text-base">फोन</h4>
                  <a href="tel:+919876543210" className="text-charcoal/70 hover:text-saffron transition-colors text-sm md:text-base">
                    +91 98765 43210
                  </a>
                  <br />
                  <a href="tel:+919876543211" className="text-charcoal/70 hover:text-saffron transition-colors text-sm md:text-base">
                    +91 98765 43211
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-saffron/10 p-2 md:p-3 rounded-full flex-shrink-0">
                  <Mail className="text-saffron" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1 text-sm md:text-base">ईमेल</h4>
                  <a href="mailto:info@shreekrishnadham.com" className="text-charcoal/70 hover:text-saffron transition-colors text-sm md:text-base">
                    info@shreekrishnadham.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-saffron/10 p-2 md:p-3 rounded-full flex-shrink-0">
                  <MapPin className="text-saffron" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1 text-sm md:text-base">पता</h4>
                  <p className="text-charcoal/70 text-sm md:text-base">
                    नादेली बहापुर रोड<br />
                    बहेड़ी, बरेली<br />
                    उत्तर प्रदेश - 243201
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 bg-gradient-to-r from-saffron to-gold rounded-xl md:rounded-2xl p-4 md:p-6 text-white">
              <h4 className="font-display font-bold text-lg md:text-2xl mb-2 flex items-center gap-2">
                <Clock size={24} />
                कार्यालय समय
              </h4>
              <p className="text-sm md:text-lg">सोमवार - शनिवार: सुबह 9:00 - शाम 7:00</p>
              <p className="text-sm md:text-lg">रविवार: सुबह 10:00 - शाम 5:00</p>
            </div>
          </motion.div>

          {/* Mobile-First Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8 md:py-12"
              >
                <CheckCircle className="text-green-500 mx-auto mb-4" size={60} />
                <h3 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-4">
                  धन्यवाद!
                </h3>
                <p className="text-base md:text-lg text-charcoal/70">
                  हमारी टीम 2 घंटे के भीतर आपको कॉल करेगी
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-charcoal font-semibold mb-2 text-sm md:text-base">नाम *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors text-sm md:text-base"
                    placeholder="आपका पूरा नाम"
                  />
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-2 text-sm md:text-base">फोन (WhatsApp) *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors text-sm md:text-base"
                    placeholder="+91 82795 29681"
                  />
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-2 text-sm md:text-base">ईमेल</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors text-sm md:text-base"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-2 text-sm md:text-base">शहर *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors text-sm md:text-base"
                    placeholder="आपका शहर"
                  />
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-2 text-sm md:text-base">प्लॉट रुचि</label>
                  <select
                    name="plotInterest"
                    value={formData.plotInterest}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors text-sm md:text-base"
                  >
                    <option value="">प्लॉट साइज़ चुनें</option>
                    <option value="50 वर्ग गज">50 वर्ग गज</option>
                    <option value="60 वर्ग गज">60 वर्ग गज</option>
                    <option value="75 वर्ग गज">75 वर्ग गज</option>
                    <option value="100 वर्ग गज">100 वर्ग गज</option>
                    <option value="120 वर्ग गज">120 वर्ग गज</option>
                  </select>
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-2 text-sm md:text-base">बजट</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors text-sm md:text-base"
                  >
                    <option value="">बजट रेंज चुनें</option>
                    <option value="5-8 लाख">₹5-8 लाख</option>
                    <option value="8-10 लाख">₹8-10 लाख</option>
                    <option value="10-15 लाख">₹10-15 लाख</option>
                    <option value="15+ लाख">₹15+ लाख</option>
                  </select>
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-2 text-sm md:text-base">संदेश</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors resize-none text-sm md:text-base"
                    placeholder="कोई विशिष्ट आवश्यकताएं..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-saffron text-ivory px-4 md:px-6 py-3 md:py-4 rounded-full font-semibold hover:bg-gold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {isSubmitting ? (
                    'भेजा जा रहा है...'
                  ) : (
                    <>
                      <Send size={18} />
                      पूछताछ भेजें
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
