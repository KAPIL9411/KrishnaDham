import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Award, Shield, MapPin, Ruler, TreePine } from 'lucide-react'

const About = () => {
  const highlights = [
    { icon: <Ruler size={32} />, title: 'Total Plots', value: '116+', color: 'bg-blue-500' },
    { icon: <MapPin size={32} />, title: 'Wide Roads', value: '15ft to 25ft', color: 'bg-green-500' },
    { icon: <TreePine size={32} />, title: 'Green Landscaping', value: 'Eco-Friendly', color: 'bg-emerald-500' },
    { icon: <MapPin size={32} />, title: 'Location', value: 'Nadeli Bahapur Road', color: 'bg-orange-500' },
    { icon: <Award size={32} />, title: 'RERA Registered', value: 'Verified', color: 'bg-purple-500' },
    { icon: <Shield size={32} />, title: 'Clear Title', value: '100% Legal', color: 'bg-red-500' },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-ivory to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-charcoal mb-4">
            About The Project
          </h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Shree Krishna Dham Colony is a premium residential plot development offering modern amenities, 
            wide roads, and a peaceful environment near Nadeli Bahapur Road, Baheri, Bareilly.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-charcoal mb-2">{item.title}</h3>
              <p className="text-xl text-saffron font-semibold">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Developer Credibility */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-saffron to-gold rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <h3 className="text-4xl font-display font-bold mb-4">Trusted Developer</h3>
          <p className="text-xl mb-6 opacity-90">
            With years of experience in real estate development, we have successfully delivered 
            multiple residential projects across Bareilly region.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <p className="text-5xl font-display font-bold mb-2">10+</p>
              <p className="text-lg opacity-90">Years Experience</p>
            </div>
            <div>
              <p className="text-5xl font-display font-bold mb-2">15+</p>
              <p className="text-lg opacity-90">Projects Completed</p>
            </div>
            <div>
              <p className="text-5xl font-display font-bold mb-2">1000+</p>
              <p className="text-lg opacity-90">Happy Families</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
