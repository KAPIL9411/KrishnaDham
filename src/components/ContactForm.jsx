import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react'

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
      const message = `New Inquiry from ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0ACity: ${formData.city}%0APlot Interest: ${formData.plotInterest}%0ABudget: ${formData.budget}%0AMessage: ${formData.message}`
      window.open(`https://wa.me/919876543210?text=${message}`, '_blank')

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
    <section id="contact" className="py-20 bg-ivory">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-charcoal mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-charcoal/70">
            Book your site visit or request more information
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-display font-bold text-charcoal mb-8">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-saffron/10 p-3 rounded-full">
                  <Phone className="text-saffron" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Phone</h4>
                  <a href="tel:+919876543210" className="text-charcoal/70 hover:text-saffron transition-colors">
                    +91 98765 43210
                  </a>
                  <br />
                  <a href="tel:+919876543211" className="text-charcoal/70 hover:text-saffron transition-colors">
                    +91 98765 43211
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-saffron/10 p-3 rounded-full">
                  <Mail className="text-saffron" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Email</h4>
                  <a href="mailto:info@shreekrishnadham.com" className="text-charcoal/70 hover:text-saffron transition-colors">
                    info@shreekrishnadham.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-saffron/10 p-3 rounded-full">
                  <MapPin className="text-saffron" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Address</h4>
                  <p className="text-charcoal/70">
                    Nadeli Bahapur Road<br />
                    Baheri, Bareilly<br />
                    Uttar Pradesh - 243201
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-saffron to-gold rounded-2xl p-6 text-white">
              <h4 className="font-display font-bold text-2xl mb-2">Office Hours</h4>
              <p className="text-lg">Monday - Saturday: 9:00 AM - 7:00 PM</p>
              <p className="text-lg">Sunday: 10:00 AM - 5:00 PM</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="text-green-500 mx-auto mb-4" size={80} />
                <h3 className="text-3xl font-display font-bold text-charcoal mb-4">
                  Thank You!
                </h3>
                <p className="text-lg text-charcoal/70">
                  Our team will call you within 2 hours
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-charcoal font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-2">Phone (WhatsApp) *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors"
                    placeholder="Your city"
                  />
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-2">Plot Interest</label>
                  <select
                    name="plotInterest"
                    value={formData.plotInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors"
                  >
                    <option value="">Select plot size</option>
                    <option value="50 sq yd">50 sq yd</option>
                    <option value="60 sq yd">60 sq yd</option>
                    <option value="75 sq yd">75 sq yd</option>
                    <option value="100 sq yd">100 sq yd</option>
                    <option value="120 sq yd">120 sq yd</option>
                  </select>
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-2">Budget</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="5-8 Lakhs">₹5-8 Lakhs</option>
                    <option value="8-10 Lakhs">₹8-10 Lakhs</option>
                    <option value="10-15 Lakhs">₹10-15 Lakhs</option>
                    <option value="15+ Lakhs">₹15+ Lakhs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border-2 border-charcoal/20 focus:border-saffron outline-none transition-colors resize-none"
                    placeholder="Any specific requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-saffron text-ivory px-6 py-4 rounded-full font-semibold hover:bg-gold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send size={20} />
                      Submit Inquiry
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
