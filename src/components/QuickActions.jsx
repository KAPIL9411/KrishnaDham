import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, MapPin, Calendar, X, Menu } from 'lucide-react'

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: Phone,
      label: 'Call Now',
      labelHi: 'कॉल करें',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      action: () => window.location.href = 'tel:+919876543210'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      labelHi: 'WhatsApp',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      action: () => window.open('https://wa.me/919876543210?text=नमस्ते, मुझे श्री कृष्णा धाम कॉलोनी के बारे में जानकारी चाहिए।', '_blank')
    },
    {
      icon: MapPin,
      label: 'Directions',
      labelHi: 'रास्ता',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      action: () => window.open('https://maps.google.com/?q=Baheri+Bareilly', '_blank')
    },
    {
      icon: Calendar,
      label: 'Book Visit',
      labelHi: 'विजिट बुक करें',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        setIsOpen(false)
      }
    }
  ]

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-saffron hover:bg-gold'
        } text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110`}
        whileHover={{ rotate: isOpen ? 0 : 90 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </motion.button>

      {/* Action Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Actions */}
            <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-3">
              {actions.map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ scale: 0, x: 100 }}
                  animate={{ scale: 1, x: 0 }}
                  exit={{ scale: 0, x: 100 }}
                  transition={{ delay: index * 0.05, type: 'spring', stiffness: 260, damping: 20 }}
                  onClick={action.action}
                  className={`${action.color} ${action.hoverColor} text-white px-6 py-3 rounded-full shadow-xl transition-all flex items-center gap-3 group`}
                  whileHover={{ scale: 1.05, x: -10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-semibold whitespace-nowrap">
                    {action.labelHi}
                  </span>
                  <action.icon size={20} className="group-hover:animate-pulse" />
                </motion.button>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Bar (Alternative for small screens) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-40 md:hidden">
        <div className="grid grid-cols-4 gap-1 p-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="flex flex-col items-center justify-center py-3 px-2 rounded-lg hover:bg-gray-100 transition-all active:scale-95"
            >
              <action.icon size={24} className={`${action.color.replace('bg-', 'text-')} mb-1`} />
              <span className="text-xs font-semibold text-charcoal">{action.labelHi}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default QuickActions
