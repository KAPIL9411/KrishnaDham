import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Placeholder images - replace with actual project images
  const images = [
    { url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', title: 'Aerial View' },
    { url: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800', title: 'Green Landscape' },
    { url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800', title: 'Sunset View' },
    { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', title: 'Nature Beauty' },
    { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', title: 'Mountain View' },
    { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', title: 'Forest Path' },
  ]

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setSelectedImage(images[index])
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length
    setCurrentIndex(newIndex)
    setSelectedImage(images[newIndex])
  }

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length
    setCurrentIndex(newIndex)
    setSelectedImage(images[newIndex])
  }

  return (
    <section id="gallery" className="py-20 bg-ivory">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-charcoal mb-4">
            Gallery
          </h2>
          <p className="text-xl text-charcoal/70">
            Explore the beauty and potential of Shree Krishna Dham Colony
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <h3 className="text-white font-display font-bold text-2xl">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white rounded-3xl p-8 shadow-2xl"
        >
          <h3 className="text-3xl font-display font-bold text-charcoal mb-6 text-center">
            Video Tour
          </h3>
          <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Colony Video Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-saffron transition-colors"
              >
                <X size={40} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-4 text-white hover:text-saffron transition-colors"
              >
                <ChevronLeft size={60} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-4 text-white hover:text-saffron transition-colors"
              >
                <ChevronRight size={60} />
              </button>

              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
                <h3 className="text-2xl font-display font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-sm opacity-70">{currentIndex + 1} / {images.length}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Gallery
