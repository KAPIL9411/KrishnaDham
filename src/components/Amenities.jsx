import React from 'react'
import { motion } from 'framer-motion'
import { 
  Route, Droplets, Zap, Shield, Sun, TreePine, 
  Home, Heart, GraduationCap, ShoppingCart 
} from 'lucide-react'

const Amenities = () => {
  const amenities = [
    { icon: <Route size={40} />, title: 'Wide Paved Roads', description: '15ft to 25ft wide roads' },
    { icon: <Droplets size={40} />, title: '24/7 Water Supply', description: 'Uninterrupted water connection' },
    { icon: <Zap size={40} />, title: 'Underground Electricity', description: 'Modern power infrastructure' },
    { icon: <Shield size={40} />, title: 'Boundary Wall', description: 'Complete security fencing' },
    { icon: <Sun size={40} />, title: 'Street Lighting', description: 'Well-lit roads for safety' },
    { icon: <TreePine size={40} />, title: 'Green Zone', description: 'Parks and landscaping' },
    { icon: <Home size={40} />, title: 'Vastu-Friendly Plots', description: 'Proper directional planning' },
    { icon: <Heart size={40} />, title: 'Near Hospitals', description: 'Healthcare facilities nearby' },
    { icon: <GraduationCap size={40} />, title: 'Near Schools', description: 'Educational institutions close by' },
    { icon: <ShoppingCart size={40} />, title: 'Shopping Centers', description: 'Markets within reach' },
  ]

  return (
    <section id="amenities" className="py-20 bg-charcoal">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-ivory mb-4">
            World-Class Amenities
          </h2>
          <p className="text-xl text-ivory/70 max-w-3xl mx-auto">
            Experience modern living with premium facilities designed for your comfort and convenience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-ivory rounded-2xl p-6 text-center hover:shadow-2xl hover:scale-105 transition-all"
            >
              <div className="text-saffron mb-4 flex justify-center">
                {amenity.icon}
              </div>
              <h3 className="text-lg font-display font-bold text-charcoal mb-2">
                {amenity.title}
              </h3>
              <p className="text-sm text-charcoal/70">{amenity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Amenities
