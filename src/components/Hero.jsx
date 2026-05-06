import { motion } from 'framer-motion'
import { ArrowDown, Phone, MessageCircle, Home, Route, FileCheck, Droplets } from 'lucide-react'

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url('/herobg.webp')`
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-0"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center pt-16 pb-8 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto w-full"
        >
          {/* Mobile-Optimized Hindi Pricing Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-gradient-to-r from-saffron/90 to-gold/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-8 shadow-2xl border border-white/20"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight">
              प्लॉट्स की शुरुआत मात्र
            </h1>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="text-lg md:text-xl text-white/60 line-through">₹12 लाख</span>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                ₹8.5 लाख रुपये से
              </div>
            </div>
            <p className="text-white/90 text-sm md:text-base mt-2 font-medium">
              श्री कृष्णा धाम कॉलोनी, बहेड़ी बरेली
            </p>
          </motion.div>

          {/* Mobile-First CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
          >
            {/* Primary CTA - WhatsApp */}
            <a
              href="https://wa.me/919876543210?text=नमस्ते, मुझे श्री कृष्णा धाम कॉलोनी के बारे में जानकारी चाहिए"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <MessageCircle size={20} className="group-hover:animate-pulse" />
              <span>WhatsApp पर संपर्क करें</span>
            </a>
            
            {/* Secondary CTA - Call */}
            <a
              href="tel:+919876543210"
              className="group w-full sm:w-auto bg-saffron hover:bg-gold text-white px-6 py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Phone size={20} className="group-hover:animate-pulse" />
              <span>कॉल करें</span>
            </a>
          </motion.div>

          {/* Mobile-Optimized Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto w-full px-2"
          >
            {[
              { number: '116+', label: 'कुल प्लॉट्स', icon: Home },
              { number: '25ft', label: 'चौड़ी सड़कें', icon: Route },
              { number: '100%', label: 'क्लियर टाइटल', icon: FileCheck },
              { number: '24/7', label: 'पानी की सप्लाई', icon: Droplets },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1, duration: 0.6 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-white/20"
              >
                <div className="text-saffron mb-1 flex justify-center">
                  <stat.icon size={24} />
                </div>
                <p className="text-xl md:text-3xl font-display font-bold text-saffron mb-1">
                  {stat.number}
                </p>
                <p className="text-xs md:text-sm text-charcoal/70 font-medium leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile-Friendly Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-2 text-white/80 text-sm"
          >
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
              <FileCheck size={14} />
              EMI उपलब्ध
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
              <FileCheck size={14} />
              रजिस्ट्री तुरंत
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
              <FileCheck size={14} />
              लोन सुविधा
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
