import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/config'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  // Default testimonials as fallback
  const defaultTestimonials = [
    {
      id: 1,
      name: 'राजेश कुमार',
      location: 'बहेड़ी, बरेली',
      rating: 5,
      date: '2 महीने पहले',
      text: 'बहुत अच्छी जगह है। सड़कें चौड़ी हैं और सभी कागजात क्लियर हैं। लोकेशन भी बढ़िया है। पूरा परिवार खुश है।',
      plotNumber: '23',
      image: '/api/placeholder/60/60'
    },
    {
      id: 2,
      name: 'सुनीता देवी',
      location: 'फरीदपुर, बरेली',
      rating: 5,
      date: '1 महीना पहले',
      text: 'पहले बहुत confusion था कि कहाँ प्लॉट लें। यहाँ आकर सब clear हो गया। Staff बहुत helpful है। Registration भी जल्दी हो गई।',
      plotNumber: '45',
      image: '/api/placeholder/60/60'
    },
    {
      id: 3,
      name: 'अमित वर्मा',
      location: 'नवाबगंज, बरेली',
      rating: 5,
      date: '3 सप्ताह पहले',
      text: 'Investment के लिए perfect जगह है। Price भी reasonable है और location भी अच्छी है। Bank loan भी आसानी से मिल गया।',
      plotNumber: '67',
      image: '/api/placeholder/60/60'
    }
  ]

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      // Load sold plots with owner names from Firebase
      const plotsQuery = query(
        collection(db, 'plots'),
        where('status', '==', 'sold')
      )
      const plotsSnapshot = await getDocs(plotsQuery)
      
      const soldPlots = plotsSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(plot => plot.ownerName) // Only plots with owner names
      
      if (soldPlots.length > 0) {
        // Create testimonials from actual sold plots
        const realTestimonials = soldPlots.slice(0, 5).map((plot, index) => ({
          id: plot.id,
          name: plot.ownerName,
          location: 'बहेड़ी, बरेली',
          rating: 5,
          date: 'हाल ही में',
          text: `श्री कृष्णा धाम कॉलोनी में ${plot.area} वर्ग गज का प्लॉट खरीदा। बहुत अच्छी जगह है। सड़कें चौड़ी हैं और सभी कागजात क्लियर हैं। पूरा परिवार खुश है।`,
          plotNumber: plot.plotNumber,
          image: '/api/placeholder/60/60'
        }))
        
        setTestimonials(realTestimonials)
      } else {
        // Use default testimonials if no sold plots
        setTestimonials(defaultTestimonials)
      }
    } catch (error) {
      console.error('Error loading testimonials:', error)
      setTestimonials(defaultTestimonials)
    } finally {
      setLoading(false)
    }
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ))
  }

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-saffron/30 border-t-saffron rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-charcoal/70">लोड हो रहा है...</p>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-4">
            ग्राहकों की राय
          </h2>
          <p className="text-lg text-charcoal/70 mb-2">
            देखें क्या कहते हैं हमारे खुश ग्राहक
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-charcoal/60">
            <Star className="text-yellow-400 fill-current" size={16} />
            <span className="font-semibold">4.9/5</span>
            <span>• 200+ Reviews</span>
          </div>
        </motion.div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-8">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 relative"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-saffron/20">
              <Quote size={48} />
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-saffron/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-saffron">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-charcoal mb-1">
                    {testimonials[currentIndex].name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-charcoal/60 mb-2">
                    <MapPin size={14} />
                    <span>{testimonials[currentIndex].location}</span>
                    <span>•</span>
                    <Calendar size={14} />
                    <span>{testimonials[currentIndex].date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-saffron/10 text-saffron px-3 py-1 rounded-full text-sm font-semibold">
                    Plot #{testimonials[currentIndex].plotNumber}
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg text-charcoal/80 leading-relaxed mb-6 italic">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevTestimonial}
                  className="bg-gray-100 hover:bg-gray-200 text-charcoal p-3 rounded-full transition-all"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex ? 'bg-saffron' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="bg-gray-100 hover:bg-gray-200 text-charcoal p-3 rounded-full transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-saffron mb-2">200+</div>
            <p className="text-charcoal/70 text-sm">खुश ग्राहक</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-saffron mb-2">4.9★</div>
            <p className="text-charcoal/70 text-sm">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-saffron mb-2">95%</div>
            <p className="text-charcoal/70 text-sm">Recommend करते हैं</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-saffron mb-2">100%</div>
            <p className="text-charcoal/70 text-sm">Clear Title</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-saffron to-gold rounded-2xl p-6 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-display font-bold mb-3">
              आप भी बनें हमारे खुश ग्राहक!
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Site visit book करें और खुद देखें क्यों सभी हमें recommend करते हैं
            </p>
            <a
              href="https://wa.me/918279529681?text=नमस्ते, मैं site visit book करना चाहता हूं"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-saffron px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              📅 Free Site Visit Book करें
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials