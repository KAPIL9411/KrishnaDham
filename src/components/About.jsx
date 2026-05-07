import { motion } from 'framer-motion'
import { CheckCircle, Award, Shield, MapPin, Ruler, TreePine, Home, Route } from 'lucide-react'

const About = () => {
  const highlights = [
    { icon: Home, title: 'कुल प्लॉट्स', value: '116+', color: 'bg-blue-500' },
    { icon: Route, title: 'चौड़ी सड़कें', value: '15ft से 25ft', color: 'bg-green-500' },
    { icon: TreePine, title: 'पार्क', value: 'बच्चों के लिए', color: 'bg-emerald-500' },
    { icon: MapPin, title: 'मंदिर', value: 'धार्मिक स्थल', color: 'bg-orange-500' },
    { icon: TreePine, title: 'हरियाली', value: 'पर्यावरण अनुकूल', color: 'bg-teal-500' },
    { icon: Shield, title: 'क्लियर टाइटल', value: '100% कानूनी', color: 'bg-red-500' },
  ]

  return (
    <section id="about" className="py-12 md:py-20 bg-gradient-to-b from-ivory to-white w-full overflow-x-hidden">
      <div className="container mx-auto px-4 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal mb-3 md:mb-4">
            परियोजना के बारे में
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-charcoal/70 max-w-3xl mx-auto px-2">
            श्री कृष्णा धाम कॉलोनी एक प्रीमियम आवासीय प्लॉट विकास है जो आधुनिक सुविधाएं, 
            चौड़ी सड़कें, और नादेली बहापुर रोड, बहेड़ी, बरेली के पास शांतिपूर्ण वातावरण प्रदान करता है।
          </p>
        </motion.div>

        {/* Mobile-First Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-16">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-center mb-3 md:mb-4">
                <div className={`${item.color} p-2 md:p-3 rounded-full`}>
                  <item.icon size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-sm md:text-xl lg:text-2xl font-display font-bold text-charcoal mb-1 md:mb-2 text-center leading-tight">
                {item.title}
              </h3>
              <p className="text-sm md:text-lg lg:text-xl text-saffron font-semibold text-center">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Developer Credibility - Professional Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-charcoal mb-4">
              विश्वसनीय डेवलपर
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-charcoal/70 max-w-3xl mx-auto">
              रियल एस्टेट विकास में वर्षों के अनुभव के साथ, हमने बरेली क्षेत्र में 
              कई आवासीय परियोजनाओं को सफलतापूर्वक पूरा किया है।
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="text-center">
              <div className="bg-gradient-to-br from-saffron/10 to-gold/10 rounded-2xl p-6 mb-3">
                <p className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-saffron">10+</p>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-charcoal/70 font-medium">साल का अनुभव</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-saffron/10 to-gold/10 rounded-2xl p-6 mb-3">
                <p className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-saffron">15+</p>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-charcoal/70 font-medium">पूर्ण परियोजनाएं</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-saffron/10 to-gold/10 rounded-2xl p-6 mb-3">
                <p className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-saffron">1000+</p>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-charcoal/70 font-medium">खुश परिवार</p>
            </div>
          </div>

          {/* Previous Projects */}
          <div className="border-t border-gray-200 pt-10">
            <h4 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-6 text-center">
              हमारी पिछली परियोजनाएं बहेड़ी में
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Home className="text-white" size={24} />
                </div>
                <h5 className="text-xl font-bold text-charcoal mb-2">Ashok Vihar Colony</h5>
                <p className="text-sm text-charcoal/70 mb-3">बहेड़ी की प्रतिष्ठित आवासीय कॉलोनी</p>
                <div className="flex items-center gap-2 text-xs text-charcoal/60">
                  <CheckCircle size={14} className="text-green-500" />
                  <span>सफलतापूर्वक पूर्ण</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 hover:shadow-lg transition-all"
              >
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Home className="text-white" size={24} />
                </div>
                <h5 className="text-xl font-bold text-charcoal mb-2">Brij Dham Colony</h5>
                <p className="text-sm text-charcoal/70 mb-3">आधुनिक सुविधाओं के साथ प्रीमियम कॉलोनी</p>
                <div className="flex items-center gap-2 text-xs text-charcoal/60">
                  <CheckCircle size={14} className="text-green-500" />
                  <span>सफलतापूर्वक पूर्ण</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200 hover:shadow-lg transition-all"
              >
                <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Home className="text-white" size={24} />
                </div>
                <h5 className="text-xl font-bold text-charcoal mb-2">Gandhi Ashram</h5>
                <p className="text-sm text-charcoal/70 mb-3">शांतिपूर्ण वातावरण में आदर्श कॉलोनी</p>
                <div className="flex items-center gap-2 text-xs text-charcoal/60">
                  <CheckCircle size={14} className="text-green-500" />
                  <span>सफलतापूर्वक पूर्ण</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
