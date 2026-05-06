import { motion } from 'framer-motion'
import { 
  Route, Droplets, Zap, Shield, Sun, TreePine, 
  Home, Heart, GraduationCap, ShoppingCart 
} from 'lucide-react'

const Amenities = () => {
  const amenities = [
    { icon: Route, title: 'चौड़ी पक्की सड़कें', description: '15ft से 25ft चौड़ी सड़कें' },
    { icon: Droplets, title: '24/7 पानी की आपूर्ति', description: 'निरंतर पानी कनेक्शन' },
    { icon: Zap, title: 'भूमिगत बिजली', description: 'आधुनिक पावर इन्फ्रास्ट्रक्चर' },
    { icon: Shield, title: 'बाउंड्री वॉल', description: 'पूर्ण सुरक्षा बाड़' },
    { icon: Sun, title: 'स्ट्रीट लाइटिंग', description: 'सुरक्षा के लिए रोशनी' },
    { icon: TreePine, title: 'हरित क्षेत्र', description: 'पार्क और भूनिर्माण' },
    { icon: Home, title: 'वास्तु अनुकूल प्लॉट्स', description: 'उचित दिशा योजना' },
    { icon: Heart, title: 'अस्पतालों के पास', description: 'स्वास्थ्य सुविधाएं पास में' },
    { icon: GraduationCap, title: 'स्कूलों के पास', description: 'शैक्षणिक संस्थान पास में' },
    { icon: ShoppingCart, title: 'शॉपिंग सेंटर', description: 'बाजार पहुंच में' },
  ]

  return (
    <section id="amenities" className="py-12 md:py-20 bg-charcoal w-full overflow-x-hidden">
      <div className="container mx-auto px-4 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ivory mb-3 md:mb-4">
            विश्व स्तरीय सुविधाएं
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-ivory/70 max-w-3xl mx-auto px-2">
            आपके आराम और सुविधा के लिए डिज़ाइन की गई प्रीमियम सुविधाओं के साथ आधुनिक जीवन का अनुभव करें
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-ivory rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:shadow-2xl hover:scale-105 transition-all"
            >
              <div className="text-saffron mb-2 md:mb-4 flex justify-center">
                <amenity.icon size={32} />
              </div>
              <h3 className="text-xs sm:text-sm md:text-lg font-display font-bold text-charcoal mb-1 md:mb-2 leading-tight">
                {amenity.title}
              </h3>
              <p className="text-xs md:text-sm text-charcoal/70 leading-tight">{amenity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Amenities
