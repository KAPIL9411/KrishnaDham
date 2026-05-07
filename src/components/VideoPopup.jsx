import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Volume2, VolumeX } from 'lucide-react'

const VideoPopup = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showUnmutePrompt, setShowUnmutePrompt] = useState(true)
  const iframeRef = useRef(null)

  // Cloudinary Video - HD Quality with Audio
  // Start muted for autoplay, then show unmute prompt
  const CLOUDINARY_VIDEO_URL = 'https://player.cloudinary.com/embed/?cloud_name=dw92bmec8&public_id=final_1_1_1_qckkgu&fluid=true&controls=true&autoplay=true&muted=true&loop=false'

  useEffect(() => {
    // Show popup after 2 seconds on every page load
    const timer = setTimeout(() => {
      setShowPopup(true)
      // Show unmute prompt for 5 seconds
      setTimeout(() => {
        setShowUnmutePrompt(false)
      }, 5000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleUnmute = () => {
    setIsMuted(false)
    setShowUnmutePrompt(false)
    // Reload iframe with audio on
    if (iframeRef.current) {
      iframeRef.current.src = 'https://player.cloudinary.com/embed/?cloud_name=dw92bmec8&public_id=final_1_1_1_qckkgu&fluid=true&controls=true&autoplay=true&muted=false&loop=false'
    }
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closePopup}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full md:w-auto md:h-auto md:max-w-6xl md:aspect-video flex items-center justify-center p-0 md:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Control Buttons - Floating */}
            <div className="absolute top-4 right-4 flex items-center gap-3 z-20">
              {/* Mute/Unmute */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const newMutedState = !isMuted
                  setIsMuted(newMutedState)
                  if (iframeRef.current) {
                    iframeRef.current.src = `https://player.cloudinary.com/embed/?cloud_name=dw92bmec8&public_id=final_1_1_1_qckkgu&fluid=true&controls=true&autoplay=true&muted=${newMutedState}&loop=false`
                  }
                }}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </motion.button>

              {/* Close */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={closePopup}
                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                aria-label="Close video"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Unmute Prompt - Shows for 5 seconds */}
            {showUnmutePrompt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30"
              >
                <button
                  onClick={handleUnmute}
                  className="bg-gradient-to-r from-saffron to-gold hover:from-gold hover:to-saffron text-white px-6 py-3 rounded-full font-bold transition-all shadow-2xl flex items-center gap-2 animate-pulse"
                >
                  <Volume2 size={20} />
                  🔊 Audio चालू करें
                </button>
              </motion.div>
            )}

            {/* Video Container - Reel Style on Mobile, Widescreen on Desktop */}
            <div className="relative w-full h-full md:w-auto md:h-auto md:rounded-2xl overflow-hidden bg-black">
              {/* Mobile: Full Screen Vertical (Reel Style) */}
              {/* Desktop: 16:9 Widescreen */}
              <div 
                className="relative w-full h-full md:w-auto md:h-auto"
                style={{ 
                  aspectRatio: 'auto',
                }}
              >
                <iframe
                  ref={iframeRef}
                  src={CLOUDINARY_VIDEO_URL}
                  title="श्री कृष्णा धाम कॉलोनी - Video Tour"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full md:w-[90vw] md:max-w-6xl md:aspect-video md:rounded-2xl"
                  style={{ 
                    border: 'none',
                    minHeight: '100vh',
                  }}
                />
              </div>
            </div>

            {/* Bottom Info - Only on Desktop */}
            <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <button
                onClick={closePopup}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold transition-all backdrop-blur-sm border border-white/20"
              >
                बाद में देखें
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default VideoPopup
