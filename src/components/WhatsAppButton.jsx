import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const phoneNumber = '919876543210'

  const quickMessages = [
    'I want to book a site visit',
    'I need plot availability details',
    'I want to know about pricing',
    'I need more information',
  ]

  const sendWhatsAppMessage = (message) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    setIsOpen(false)
  }

  return (
    <>
      {/* Quick Message Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 md:right-8 z-50 bg-white rounded-2xl shadow-2xl p-4 w-80 max-w-[calc(100vw-2rem)]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-charcoal text-lg">Quick Messages</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-charcoal/50 hover:text-charcoal transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2">
              {quickMessages.map((message, index) => (
                <button
                  key={index}
                  onClick={() => sendWhatsAppMessage(message)}
                  className="w-full text-left px-4 py-3 rounded-xl bg-ivory hover:bg-saffron/10 hover:text-saffron transition-all text-sm"
                >
                  {message}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors"
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </motion.button>

      {/* Pulse Animation */}
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
          className="fixed bottom-6 right-4 md:right-8 z-40 bg-green-500 p-4 rounded-full w-16 h-16"
        />
      )}
    </>
  )
}

export default WhatsAppButton
