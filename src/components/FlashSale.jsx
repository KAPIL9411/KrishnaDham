import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Zap, Gift, Phone, MessageCircle } from 'lucide-react'

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          // Reset to 24 hours when timer ends
          hours = 23
          minutes = 59
          seconds = 59
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-4 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 to-red-600 animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Flash Sale Header */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="text-yellow-300 animate-bounce" size={24} />
            <h2 className="text-xl md:text-2xl font-bold text-white">
              🔥 FLASH SALE - आज ही बुक करें!
            </h2>
            <Zap className="text-yellow-300 animate-bounce" size={24} />
          </div>

          {/* Offer Details */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Offer */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gift className="text-yellow-300" size={20} />
                  <span className="text-white font-bold">Special Offer</span>
                </div>
                <p className="text-white text-sm">
                  <span className="text-2xl font-bold">₹50,000</span> तक की छूट
                </p>
                <p className="text-white/80 text-xs">+ Free Registration</p>
              </div>

              {/* Timer */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="text-yellow-300" size={20} />
                  <span className="text-white font-bold">Time Left</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="bg-white/30 rounded-lg px-2 py-1">
                    <span className="text-white font-bold text-lg">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <div className="text-white/80 text-xs">घंटे</div>
                  </div>
                  <span className="text-white">:</span>
                  <div className="bg-white/30 rounded-lg px-2 py-1">
                    <span className="text-white font-bold text-lg">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <div className="text-white/80 text-xs">मिनट</div>
                  </div>
                  <span className="text-white">:</span>
                  <div className="bg-white/30 rounded-lg px-2 py-1">
                    <span className="text-white font-bold text-lg">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <div className="text-white/80 text-xs">सेकंड</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <div className="space-y-2">
                  <a
                    href="tel:+919876543210"
                    className="block w-full bg-white text-red-600 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Phone size={16} />
                    अभी कॉल करें
                  </a>
                  <a
                    href="https://wa.me/919876543210?text=नमस्ते, मुझे Flash Sale के बारे में जानकारी चाहिए"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 text-white px-4 py-2 rounded-full font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle size={16} />
                    WhatsApp करें
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Text */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: [-1000, 1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="whitespace-nowrap text-white/90 text-sm"
            >
              🎯 सिर्फ आज - ₹50,000 तक की छूट • Free Registration • EMI की सुविधा • तुरंत Possession • 
              Limited Time Offer • केवल 10 प्लॉट्स बचे • Book करने के लिए अभी कॉल करें 📞
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FlashSale