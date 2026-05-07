import { useState, useEffect } from 'react'
import { Menu, X, Phone, MessageCircle, Home, Map, Info, Building, MapPin, DollarSign } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'होम', href: '#hero', icon: Home },
    { name: 'प्लॉट मैप', href: '#plot-map', icon: Map },
    { name: 'परिचय', href: '#about', icon: Info },
    { name: 'सुविधाएं', href: '#amenities', icon: Building },
    { name: 'स्थान', href: '#location', icon: MapPin },
    { name: 'मूल्य', href: '#pricing', icon: DollarSign },
    { name: 'संपर्क', href: '#contact', icon: Phone },
  ]

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full overflow-x-hidden ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-3 sm:px-4 w-full max-w-full">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile-First Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-saffron rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg md:text-2xl font-display font-bold text-white">श्री</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base md:text-xl font-display font-bold text-charcoal">
                  श्री कृष्णा धाम कॉलोनी
                </h1>
                <p className="text-xs md:text-sm text-charcoal/70">Baheri, Bareilly</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-sm font-display font-bold text-charcoal">
                  कृष्णा धाम
                </h1>
              </div>
            </div>

            {/* Mobile Quick Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href="tel:+918279529681"
                className="bg-saffron text-white p-2 rounded-full shadow-lg"
              >
                <Phone size={16} />
              </a>
              <a
                href="https://wa.me/918279529681?text=नमस्ते, मुझे श्री कृष्णा धाम कॉलोनी के बारे में जानकारी चाहिए"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white p-2 rounded-full shadow-lg"
              >
                <MessageCircle size={16} />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-charcoal p-1"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navLinks.slice(0, 5).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-charcoal hover:text-saffron transition-colors font-medium text-sm lg:text-base whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-2">
                <a
                  href="tel:+918279529681"
                  className="bg-saffron text-white px-4 py-2 rounded-full hover:bg-gold transition-colors font-semibold text-sm flex items-center gap-2"
                >
                  <Phone size={16} />
                  <span className="hidden lg:inline">कॉल करें</span>
                </a>
                <a
                  href="https://wa.me/918279529681?text=नमस्ते, मुझे श्री कृष्णा धाम कॉलोनी के बारे में जानकारी चाहिए"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors font-semibold text-sm flex items-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span className="hidden lg:inline">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-charcoal/10 rounded-b-2xl shadow-xl w-full overflow-x-hidden">
              <div className="py-4 w-full">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 text-charcoal hover:bg-saffron/10 hover:text-saffron transition-colors"
                  >
                    <link.icon size={18} className="text-saffron" />
                    <span className="font-medium">{link.name}</span>
                  </a>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="px-4 pt-4 space-y-3">
                  <a
                    href="tel:+918279529681"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-saffron text-white py-3 rounded-full font-semibold"
                  >
                    <Phone size={18} />
                    तुरंत कॉल करें
                  </a>
                  <a
                    href="https://wa.me/918279529681?text=नमस्ते, मुझे श्री कृष्णा धाम कॉलोनी के बारे में जानकारी चाहिए"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-full font-semibold"
                  >
                    <MessageCircle size={18} />
                    WhatsApp पर चैट करें
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg w-full overflow-x-hidden rounded-t-2xl">
        <div className="grid grid-cols-4 gap-1 w-full">
          <a
            href="#hero"
            className="flex flex-col items-center py-2 px-1 text-charcoal hover:text-saffron transition-colors"
          >
            <Home size={20} className="mb-1" />
            <span className="text-xs font-medium">होम</span>
          </a>
          <a
            href="#plot-map"
            className="flex flex-col items-center py-2 px-1 text-charcoal hover:text-saffron transition-colors"
          >
            <Map size={20} className="mb-1" />
            <span className="text-xs font-medium">प्लॉट मैप</span>
          </a>
          <a
            href="tel:+918279529681"
            className="flex flex-col items-center py-2 px-1 text-saffron hover:text-gold transition-colors"
          >
            <Phone size={20} className="mb-1" />
            <span className="text-xs font-medium">कॉल</span>
          </a>
          <a
            href="https://wa.me/918279529681?text=नमस्ते, मुझे श्री कृष्णा धाम कॉलोनी के बारे में जानकारी चाहिए"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center py-2 px-1 text-green-600 hover:text-green-700 transition-colors"
          >
            <MessageCircle size={20} className="mb-1" />
            <span className="text-xs font-medium">WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar
