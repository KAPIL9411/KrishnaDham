import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  // Multiple contact numbers
  const phoneNumbers = [
    { number: '918279529681', display: '+91 82795 29681' },
    { number: '917830836785', display: '+91 78308 36785' },
    { number: '916396913427', display: '+91 63969 13427' },
    { number: '919917732395', display: '+91 99177 32395' }
  ]
  const primaryPhone = phoneNumbers[0].number

  const quickMessages = [
    'मैं साइट विजिट बुक करना चाहता हूं',
    'मुझे प्लॉट उपलब्धता की जानकारी चाहिए',
    'मुझे मूल्य निर्धारण के बारे में जानना है',
    'मुझे और जानकारी चाहिए',
  ]

  const sendWhatsAppMessage = (message) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile-First Quick Message Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 md:bottom-24 right-4 md:right-8 z-50 bg-white rounded-xl md:rounded-2xl shadow-2xl p-3 md:p-4 w-72 md:w-80 max-w-[calc(100vw-2rem)]"
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-display font-bold text-charcoal text-base md:text-lg">त्वरित संदेश</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-charcoal/50 hover:text-charcoal transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2">
              {quickMessages.map((message, index) => (
                <button
                  key={index}
                  onClick={() => sendWhatsAppMessage(message)}
                  className="w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl bg-ivory hover:bg-saffron/10 hover:text-saffron transition-all text-xs md:text-sm"
                >
                  {message}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile-Optimized WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 md:bottom-6 right-4 md:right-8 z-50 bg-green-500 text-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Mobile-Optimized Pulse Animation */}
      {!isOpen && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="fixed bottom-4 md:bottom-6 right-4 md:right-8 z-40 bg-green-500 p-3 md:p-4 rounded-full w-12 h-12 md:w-16 md:h-16"
        />
      )}
    </>
  )
}

export default WhatsAppButton
