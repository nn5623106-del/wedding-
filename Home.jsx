import React, { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Envelope from '../components/Envelope.jsx'
import Invitation from '../components/Invitation.jsx'
import MusicPlayer from '../components/MusicPlayer.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'

export default function Home() {
  const [isOpened, setIsOpened] = useState(false)

  const handleOpen = useCallback(() => {
    setIsOpened(true)
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-ivory">
      {!isOpened && <Envelope onOpen={handleOpen} />}

      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Invitation />
            <MusicPlayer />
            <LanguageSwitcher />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
