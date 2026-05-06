import React from 'react'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-ivory py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center">
                <span className="text-2xl font-display font-bold">श्री</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold">Shree Krishna Dham Colony</h3>
              </div>
            </div>
            <p className="text-ivory/70 mb-4">
              Premium residential plots in Baheri, Bareilly with modern amenities and clear title.
            </p>
            <p className="text-sm text-ivory/60">
              RERA Registration: UP-RERA-XXXXX
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-display font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-ivory/70 hover:text-saffron transition-colors">Home</a></li>
              <li><a href="#walkthrough" className="text-ivory/70 hover:text-saffron transition-colors">3D Tour</a></li>
              <li><a href="#plot-map" className="text-ivory/70 hover:text-saffron transition-colors">Plot Map</a></li>
              <li><a href="#about" className="text-ivory/70 hover:text-saffron transition-colors">About</a></li>
              <li><a href="#amenities" className="text-ivory/70 hover:text-saffron transition-colors">Amenities</a></li>
              <li><a href="#pricing" className="text-ivory/70 hover:text-saffron transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-display font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone size={18} className="text-saffron mt-1" />
                <div>
                  <a href="tel:+919876543210" className="text-ivory/70 hover:text-saffron transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={18} className="text-saffron mt-1" />
                <a href="mailto:info@shreekrishnadham.com" className="text-ivory/70 hover:text-saffron transition-colors">
                  info@shreekrishnadham.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-saffron mt-1" />
                <span className="text-ivory/70">
                  Nadeli Bahapur Road, Baheri, Bareilly, UP - 243201
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-display font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ivory/10 p-3 rounded-full hover:bg-saffron transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ivory/10 p-3 rounded-full hover:bg-saffron transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ivory/10 p-3 rounded-full hover:bg-saffron transition-colors"
              >
                <Youtube size={24} />
              </a>
            </div>
            <p className="text-sm text-ivory/70">
              Stay updated with our latest offers and news
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ivory/20 pt-8 text-center">
          <p className="text-ivory/60">
            © {currentYear} Shree Krishna Dham Colony. All rights reserved.
          </p>
          <p className="text-sm text-ivory/50 mt-2">
            Designed & Developed with ❤️ for Real Estate Excellence
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
