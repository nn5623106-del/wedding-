import React, { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FaMusic, FaPause } from 'react-icons/fa'
import { useLanguage } from '../hooks/useLanguage.jsx'

// Drop any replacement track into `public/music/` and update the file name
// below. Supported formats: mp3, ogg, wav.
const MUSIC_SRC = `${import.meta.env.BASE_URL}music/wedding-song.mp3`

/**
 * Floating music toggle. Autoplay is intentionally disabled — playback only
 * ever starts from a direct user gesture on this button, per browser policy
 * and out of respect for the guest's own environment.
 */
export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { t } = useLanguage()

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          setHasError(true)
          setIsPlaying(false)
        })
    } else {
      setIsPlaying(true)
    }
  }, [isPlaying])

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
      />
      <motion.button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? t.pauseMusic : t.playMusic}
        aria-pressed={isPlaying}
        title={hasError ? 'Add a track to public/music/wedding-song.mp3' : undefined}
        className="glass gold-border fixed bottom-6 end-6 z-40 flex h-14 w-14 items-center justify-center rounded-full text-gold-600 shadow-luxury"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(240,214,140,0.6)' }}
        whileTap={{ scale: 0.94 }}
      >
        <motion.span
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isPlaying
              ? { duration: 6, repeat: Infinity, ease: 'linear' }
              : { duration: 0.3 }
          }
          className="flex items-center justify-center text-lg"
        >
          {isPlaying ? <FaPause aria-hidden="true" /> : <FaMusic aria-hidden="true" />}
        </motion.span>
      </motion.button>
    </>
  )
}
