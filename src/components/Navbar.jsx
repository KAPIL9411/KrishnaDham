import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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
    { name: 'होम', href: '#hero' },
    { name: '3D टूर', href: '#walkthrough' },
    { name: 'प्लॉट मैप', href: '#plot-map' },
    { name: 'परिचय', href: '#about' },
    { name: 'सुविधाएं', href: '#amenities' },
    { name: 'स्थान', href: '#location' },
    { name: 'गैलरी', href: '#gallery' },
    { name: 'मूल्य', href: '#pricing' },
    { name: 'संपर्क', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-ivory/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-display font-bold text-ivory">श्री</span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-display font-bold text-charcoal whitespace-nowrap">
                श्री कृष्णा धाम कॉलोनी
              </h1>
              <span className="text-charcoal/40">|</span>
              <p className="text-sm text-charcoal/70 whitespace-nowrap">Baheri, Bareilly</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-charcoal hover:text-saffron transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-saffron text-ivory px-4 xl:px-6 py-2 rounded-full hover:bg-gold transition-colors font-semibold text-sm xl:text-base whitespace-nowrap"
            >
              साइट विजिट बुक करें
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-charcoal"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-ivory border-t border-charcoal/10 py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 text-charcoal hover:bg-saffron/10 hover:text-saffron transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mx-4 mt-4 bg-saffron text-ivory px-6 py-3 rounded-full hover:bg-gold transition-colors font-semibold text-center"
            >
              साइट विजिट बुक करें
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
