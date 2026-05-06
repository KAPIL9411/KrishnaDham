import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, X, Download, Share2, Phone, MessageCircle } from 'lucide-react'

const VideoWalkthrough = () => {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [videoQuality, setVideoQuality] = useState('hd') // hd or sd

  const videos = [
    {
      id: 1,
      title: 'कॉलोनी का पूरा टूर',
      titleEn: 'Complete Colony Tour',
      thumbnail: '/public/sitemap.webp',
      duration: '5:30',
      views: '2.5K',
      hdUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      sdUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'गेट से लेकर हर रोड और प्लॉट का विस्तृत वीडियो टूर'
    },
    {
      id: 2,
      title: 'ड्रोन व्यू - ऊपर से देखें',
      titleEn: 'Drone View',
      thumbnail: '/public/sitemap.webp',
      duration: '3:15',
      views: '1.8K',
      hdUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      sdUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'ड्रोन से ली गई कॉलोनी की शानदार तस्वीर'
    },
    {
      id: 3,
      title: 'रोड और सुविधाएं',
      titleEn: 'Roads & Amenities',
      thumbnail: '/public/sitemap.webp',
      duration: '4:20',
      views: '1.2K',
      hdUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      sdUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: '25 फीट चौड़ी सड़कें और सभी सुविधाओं का दृश्य'
    },
    {
      id: 4,
      title: 'ग्राहक समीक्षा',
      titleEn: 'Customer Reviews',
      thumbnail: '/public/sitemap.webp',
      duration: '6:45',
      views: '3.1K',
      hdUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      sdUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'असली ग्राहकों की राय और अनुभव'
    },
    {
      id: 5,
      title: 'आसपास की सुविधाएं',
      titleEn: 'Nearby Facilities',
      thumbnail: '/public/sitemap.webp',
      duration: '3:50',
      views: '980',
      hdUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      sdUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'स्कूल, अस्पताल, बाजार - सब कुछ पास में'
    },
    {
      id: 6,
      title: 'निर्माण प्रगति',
      titleEn: 'Construction Progress',
      thumbnail: '/public/sitemap.webp',
      duration: '2:30',
      views: '1.5K',
      hdUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      sdUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'विकास कार्य की नवीनतम स्थिति'
    }
  ]

  const handleShare = (video) => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: `${video.description} - श्री कृष्णा धाम कॉलोनी`,
        url: window.location.href
      })
    } else {
      // Fallback to WhatsApp
      const message = `${video.title}%0A${video.description}%0A${window.location.href}`
      window.open(`https://wa.me/?text=${message}`, '_blank')
    }
  }

  return (
    <section id="video-tour" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-3">
            Video Tour
          </h2>
          <p className="text-lg text-charcoal/70 mb-6">
            Watch real videos of the colony
          </p>
          
          {/* Quality Toggle - Simplified */}
          <div className="inline-flex items-center gap-1 bg-gray-100 rounded-full p-1 text-sm">
            <button
              onClick={() => setVideoQuality('hd')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                videoQuality === 'hd'
                  ? 'bg-white text-charcoal shadow-sm'
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              HD
            </button>
            <button
              onClick={() => setVideoQuality('sd')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                videoQuality === 'sd'
                  ? 'bg-white text-charcoal shadow-sm'
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              SD (Fast)
            </button>
          </div>
        </motion.div>

        {/* Video Grid - More Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group cursor-pointer border border-gray-100"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-saffron/20 to-gold/20 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                    <Play className="text-saffron" size={32} />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
                <div className="absolute top-2 left-2 bg-saffron text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {video.views} views
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-display font-bold text-xl text-charcoal mb-1">
                  {video.title}
                </h3>
                <p className="text-sm text-charcoal/60 mb-1">{video.titleEn}</p>
                <p className="text-sm text-charcoal/70 line-clamp-2">
                  {video.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShare(video)
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-charcoal px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedVideo(video)
                    }}
                    className="flex-1 bg-saffron hover:bg-gold text-white px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Play size={16} />
                    Watch
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-saffron to-gold rounded-xl p-6 text-white text-center max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-display font-bold mb-3">
            Have Questions?
          </h3>
          <p className="text-sm mb-5 opacity-90">
            Contact us for more information
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:+919876543210"
              className="bg-white text-saffron px-6 py-3 rounded-full font-semibold hover:bg-ivory transition-all flex items-center gap-2"
            >
              <Phone size={18} />
              Call Now
            </a>
            <a
              href="https://wa.me/919876543210?text=नमस्ते, मैंने वीडियो देखा है। मुझे और जानकारी चाहिए।"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-all flex items-center gap-2"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl overflow-hidden max-w-5xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-saffron to-gold p-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-display font-bold text-white">
                  {selectedVideo.title}
                </h3>
                <p className="text-sm text-white/80">{selectedVideo.titleEn}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black">
              <iframe
                src={videoQuality === 'hd' ? selectedVideo.hdUrl : selectedVideo.sdUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50">
              <p className="text-charcoal/70 mb-4">{selectedVideo.description}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(selectedVideo)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-charcoal px-4 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Share2 size={18} />
                  Share Video
                </button>
                <a
                  href="https://wa.me/919876543210?text=मैंने वीडियो देखा है। मुझे इस प्लॉट में रुचि है।"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Inquire on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default VideoWalkthrough
