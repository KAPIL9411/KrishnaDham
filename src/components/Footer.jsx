import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Home, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-ivory py-8 md:py-12 w-full overflow-x-hidden">
      <div className="container mx-auto px-4 w-full max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Mobile-First Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-saffron rounded-full flex items-center justify-center">
                <Home size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-display font-bold">श्री कृष्णा धाम कॉलोनी</h3>
              </div>
            </div>
            <p className="text-ivory/70 mb-4 text-sm md:text-base">
              बहेड़ी, बरेली में आधुनिक सुविधाओं और क्लियर टाइटल के साथ प्रीमियम आवासीय प्लॉट्स।
            </p>
            <p className="text-xs md:text-sm text-ivory/60">
              RERA पंजीकरण: UP-RERA-XXXXX
            </p>
          </div>

          {/* Mobile-First Quick Links */}
          <div>
            <h4 className="text-lg md:text-xl font-display font-bold mb-4">त्वरित लिंक</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-ivory/70 hover:text-saffron transition-colors text-sm md:text-base">होम</a></li>
              <li><a href="#walkthrough" className="text-ivory/70 hover:text-saffron transition-colors text-sm md:text-base">3D टूर</a></li>
              <li><a href="#plot-map" className="text-ivory/70 hover:text-saffron transition-colors text-sm md:text-base">प्लॉट मैप</a></li>
              <li><a href="#about" className="text-ivory/70 hover:text-saffron transition-colors text-sm md:text-base">परिचय</a></li>
              <li><a href="#amenities" className="text-ivory/70 hover:text-saffron transition-colors text-sm md:text-base">सुविधाएं</a></li>
              <li><a href="#pricing" className="text-ivory/70 hover:text-saffron transition-colors text-sm md:text-base">मूल्य</a></li>
            </ul>
          </div>

          {/* Mobile-First Contact Info */}
          <div>
            <h4 className="text-lg md:text-xl font-display font-bold mb-4">संपर्क करें</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-saffron mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+919876543210" className="text-ivory/70 hover:text-saffron transition-colors text-sm md:text-base">
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-saffron mt-1 flex-shrink-0" />
                <a href="mailto:info@shreekrishnadham.com" className="text-ivory/70 hover:text-saffron transition-colors text-sm md:text-base">
                  info@shreekrishnadham.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-saffron mt-1 flex-shrink-0" />
                <span className="text-ivory/70 text-sm md:text-base">
                  नादेली बहापुर रोड, बहेड़ी, बरेली, UP - 243201
                </span>
              </li>
            </ul>
          </div>

          {/* Mobile-First Social Media */}
          <div>
            <h4 className="text-lg md:text-xl font-display font-bold mb-4">हमें फॉलो करें</h4>
            <div className="flex gap-3 md:gap-4 mb-4 md:mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ivory/10 p-2 md:p-3 rounded-full hover:bg-saffron transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ivory/10 p-2 md:p-3 rounded-full hover:bg-saffron transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ivory/10 p-2 md:p-3 rounded-full hover:bg-saffron transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
            <p className="text-xs md:text-sm text-ivory/70">
              हमारे नवीनतम ऑफर और समाचारों के साथ अपडेट रहें
            </p>
          </div>
        </div>

        {/* Mobile-First Bottom Bar */}
        <div className="border-t border-ivory/20 pt-6 md:pt-8 text-center">
          <p className="text-ivory/60 text-sm md:text-base">
            © {currentYear} श्री कृष्णा धाम कॉलोनी। सभी अधिकार सुरक्षित।
          </p>
          <p className="text-xs md:text-sm text-ivory/50 mt-2 flex items-center justify-center gap-1">
            रियल एस्टेट उत्कृष्टता के लिए 
            <Heart size={14} className="text-red-400" />
            के साथ डिज़ाइन और विकसित
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
