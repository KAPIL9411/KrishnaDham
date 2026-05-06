import { motion } from 'framer-motion'
import { CheckCircle, Award, Shield, MapPin, Ruler, TreePine, Home, Route } from 'lucide-react'

const About = () => {
  const highlights = [
    { icon: Home, title: 'कुल प्लॉट्स', value: '116+', color: 'bg-blue-500' },
    { icon: Route, title: 'चौड़ी सड़कें', value: '15ft से 25ft', color: 'bg-green-500' },
    { icon: TreePine, title: 'हरियाली', value: 'पर्यावरण अनुकूल', color: 'bg-emerald-500' },
    { icon: MapPin, title: 'स्थान', value: 'नादेली बहापुर रोड', color: 'bg-orange-500' },
    { icon: Award, title: 'RERA पंजीकृत', value: 'सत्यापित', color: 'bg-purple-500' },
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

        {/* Mobile-First Developer Credibility */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-saffron to-gold rounded-2xl md:rounded-3xl p-6 md:p-12 text-center text-white shadow-2xl"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4">
            विश्वसनीय डेवलपर
          </h3>
          <p className="text-sm sm:text-base md:text-xl mb-6 opacity-90 px-2">
            रियल एस्टेट विकास में वर्षों के अनुभव के साथ, हमने बरेली क्षेत्र में 
            कई आवासीय परियोजनाओं को सफलतापूर्वक पूरा किया है।
          </p>
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-1 md:mb-2">10+</p>
              <p className="text-xs sm:text-sm md:text-lg opacity-90">साल का अनुभव</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-1 md:mb-2">15+</p>
              <p className="text-xs sm:text-sm md:text-lg opacity-90">पूर्ण परियोजनाएं</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-1 md:mb-2">1000+</p>
              <p className="text-xs sm:text-sm md:text-lg opacity-90">खुश परिवार</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
