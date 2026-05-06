import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Clock } from 'lucide-react'

const Location = () => {
  const distances = [
    { place: 'Baheri City Center', distance: '5 km', time: '10 mins' },
    { place: 'National Highway', distance: '2 km', time: '5 mins' },
    { place: 'Railway Station', distance: '8 km', time: '15 mins' },
    { place: 'Government Hospital', distance: '4 km', time: '8 mins' },
    { place: 'Inter College', distance: '3 km', time: '7 mins' },
    { place: 'Shopping Complex', distance: '4 km', time: '8 mins' },
  ]

  return (
    <section id="location" className="py-20 bg-ivory">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-charcoal mb-4">
            Prime Location
          </h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Strategically located near Nadeli Bahapur Road with excellent connectivity to all major landmarks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-2xl h-[400px] bg-gray-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.8!2d79.4!3d28.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQyJzAwLjAiTiA3OcKwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shree Krishna Dham Colony Location"
            ></iframe>
          </motion.div>

          {/* Distances */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              {distances.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-saffron/10 p-3 rounded-full">
                      <MapPin className="text-saffron" size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-charcoal text-lg">
                        {item.place}
                      </h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1 text-sm text-charcoal/70">
                          <Navigation size={14} />
                          {item.distance}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-charcoal/70">
                          <Clock size={14} />
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 bg-gradient-to-r from-saffron to-gold rounded-2xl p-6 text-white"
            >
              <h4 className="font-display font-bold text-2xl mb-2">
                📍 Address
              </h4>
              <p className="text-lg">
                Nadeli Bahapur Road, Baheri, Bareilly, Uttar Pradesh - 243201
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Location
