import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Play } from 'lucide-react'

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/herobg.webp')`
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 z-0"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hindi Pricing Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-12 font-bold mt-32 md:mt-40"
          >
            प्लॉट्स की शुरुआत मात्र 8.5 लाख रुपये से
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#video-tour"
              className="group bg-saffron text-ivory px-8 py-4 rounded-full text-lg font-semibold hover:bg-gold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Play size={20} className="group-hover:animate-pulse" />
              Watch Video Tour
            </a>
            <a
              href="#contact"
              className="bg-charcoal text-ivory px-8 py-4 rounded-full text-lg font-semibold hover:bg-charcoal/80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book Site Visit
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { number: '116+', label: 'Total Plots' },
              { number: '25ft', label: 'Wide Roads' },
              { number: '100%', label: 'Clear Title' },
              { number: '24/7', label: 'Water Supply' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <p className="text-3xl md:text-4xl font-display font-bold text-saffron mb-2">
                  {stat.number}
                </p>
                <p className="text-sm md:text-base text-charcoal/70">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown size={32} className="text-saffron" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
