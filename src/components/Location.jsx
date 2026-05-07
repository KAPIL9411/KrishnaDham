import { motion } from 'framer-motion'
import { MapPin, Navigation, Clock } from 'lucide-react'

const Location = () => {
  const distances = [
    { place: 'बहेड़ी मेन मार्केट', distance: '1 km', time: '3 मिनट' },
    { place: 'राष्ट्रीय राजमार्ग', distance: '1 km', time: '3 मिनट' },
    { place: 'रेलवे स्टेशन', distance: '800 m', time: '2 मिनट' },
    { place: 'सरकारी अस्पताल', distance: '850 m', time: '2 मिनट' },
    { place: 'इंटर कॉलेज', distance: '50 m', time: '1 मिनट' },
    { place: 'शॉपिंग कॉम्प्लेक्स', distance: '1 km', time: '3 मिनट' },
  ]

  return (
    <section id="location" className="py-12 md:py-20 bg-ivory w-full overflow-x-hidden">
      <div className="container mx-auto px-4 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal mb-3 md:mb-4">
            प्राइम लोकेशन
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-charcoal/70 max-w-3xl mx-auto px-2">
            नादेली बहापुर रोड के पास रणनीतिक रूप से स्थित, सभी प्रमुख स्थलों से उत्कृष्ट कनेक्टिविटी के साथ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Mobile-First Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl h-[300px] md:h-[400px] bg-gray-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.8!2d79.4!3d28.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDQyJzAwLjAiTiA3OcKwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="श्री कृष्णा धाम कॉलोनी स्थान"
              onError={(e) => {
                // Silently handle iframe loading errors
                e.target.style.display = 'none';
              }}
            ></iframe>
          </motion.div>

          {/* Mobile-First Distances */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-3 md:space-y-4">
              {distances.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="bg-saffron/10 p-2 md:p-3 rounded-full flex-shrink-0">
                      <MapPin className="text-saffron" size={20} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-charcoal text-sm md:text-lg">
                        {item.place}
                      </h4>
                      <div className="flex items-center gap-3 md:gap-4 mt-1">
                        <span className="flex items-center gap-1 text-xs md:text-sm text-charcoal/70">
                          <Navigation size={12} />
                          {item.distance}
                        </span>
                        <span className="flex items-center gap-1 text-xs md:text-sm text-charcoal/70">
                          <Clock size={12} />
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
              className="mt-6 md:mt-8 bg-gradient-to-r from-saffron to-gold rounded-xl md:rounded-2xl p-4 md:p-6 text-white"
            >
              <h4 className="font-display font-bold text-lg md:text-2xl mb-2 flex items-center gap-2">
                <MapPin size={24} />
                पता
              </h4>
              <p className="text-sm md:text-lg">
                नादेली बहापुर रोड, बहेड़ी, बरेली, उत्तर प्रदेश - 243201
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Location
