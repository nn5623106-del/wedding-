import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { useLanguage } from '../hooks/useLanguage.jsx'
import Particles from './Particles.jsx'
import FloatingFlowers from './FloatingFlowers.jsx'

const STAGE = {
  CLOSED: 'closed',
  FLAP_OPEN: 'flap-open',
  LETTER_OUT: 'letter-out',
  DONE: 'done'
}

/**
 * A cinematic 3D envelope: floats gently, opens its flap on click/keypress,
 * slides the invitation letter upward, then zooms the camera in before
 * handing off to the full invitation experience via onOpen().
 */
export default function Envelope({ onOpen }) {
  const { t, isRTL } = useLanguage()
  const [stage, setStage] = useState(STAGE.CLOSED)

  const handleActivate = useCallback(() => {
    if (stage !== STAGE.CLOSED) return
    setStage(STAGE.FLAP_OPEN)
    window.setTimeout(() => setStage(STAGE.LETTER_OUT), 750)
    window.setTimeout(() => setStage(STAGE.DONE), 1900)
    window.setTimeout(() => onOpen && onOpen(), 2500)
  }, [stage, onOpen])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleActivate()
      }
    },
    [handleActivate]
  )

  const isOpening = stage !== STAGE.CLOSED

  return (
    <AnimatePresence>
      {stage !== STAGE.DONE && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center animated-gradient-bg"
          exit={{ opacity: 0, scale: 1.15, filter: 'blur(12px)' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <LightRaysBackdrop />
          <FloatingFlowers />
          <Particles count={22} />

          <motion.div
            className="relative z-10 flex flex-col items-center px-6"
            animate={
              isOpening
                ? { scale: 1.08 }
                : { scale: [1, 1.01, 1] }
            }
            transition={
              isOpening
                ? { duration: 1.8, ease: 'easeInOut' }
                : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <motion.p
              className="mb-8 text-center font-script text-xl tracking-[0.35em] text-gold-600 sm:text-2xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isOpening ? 0 : 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t.envelopeTo}
            </motion.p>

            <div className="perspective-1000">
              <motion.button
                type="button"
                onClick={handleActivate}
                onKeyDown={handleKeyDown}
                aria-label={t.envelopeHint}
                disabled={isOpening}
                className="group relative block h-[210px] w-[300px] cursor-pointer border-0 bg-transparent p-0 outline-none sm:h-[260px] sm:w-[380px]"
                animate={
                  !isOpening
                    ? { y: [0, -14, 0] }
                    : { y: 0 }
                }
                transition={
                  !isOpening
                    ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.6 }
                }
                style={{
                  filter:
                    'drop-shadow(0 30px 40px rgba(184,134,11,0.35)) drop-shadow(0 10px 15px rgba(44,36,22,0.25))'
                }}
              >
                {/* Envelope back body */}
                <div className="absolute inset-0 rounded-md bg-gold-gradient shadow-luxury" />
                <div className="absolute inset-[3px] rounded-[4px] bg-ivory-soft" />

                {/* Letter peeking out and sliding up */}
                <motion.div
                  className="absolute left-1/2 top-3 h-[70%] w-[86%] -translate-x-1/2 rounded-sm glass-strong shadow-card"
                  style={{ zIndex: 2 }}
                  initial={{ y: 40, opacity: 0 }}
                  animate={
                    stage === STAGE.LETTER_OUT || stage === STAGE.DONE
                      ? { y: -230, opacity: 1, scale: 1.05 }
                      : { y: 40, opacity: 0 }
                  }
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
                    <span className="font-display text-lg text-ink sm:text-xl">
                      {t.groomName}
                    </span>
                    <span className="font-script text-sm text-gold-600">{t.and}</span>
                    <span className="font-display text-lg text-ink sm:text-xl">
                      {t.brideName}
                    </span>
                  </div>
                </motion.div>

                {/* Front pocket triangles */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 380 260"
                  preserveAspectRatio="none"
                  style={{ zIndex: 3 }}
                >
                  <polygon
                    points="0,260 190,140 190,260"
                    fill="url(#pocketGradLeft)"
                    stroke="#C9A227"
                    strokeWidth="1"
                  />
                  <polygon
                    points="380,260 190,140 190,260"
                    fill="url(#pocketGradRight)"
                    stroke="#C9A227"
                    strokeWidth="1"
                  />
                  <defs>
                    <linearGradient id="pocketGradLeft" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FBF3DF" />
                      <stop offset="100%" stopColor="#E9CE85" />
                    </linearGradient>
                    <linearGradient id="pocketGradRight" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FBF3DF" />
                      <stop offset="100%" stopColor="#E9CE85" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Flap that folds open */}
                <motion.div
                  className="absolute left-0 top-0 h-1/2 w-full origin-top preserve-3d"
                  style={{ zIndex: 4 }}
                  animate={{ rotateX: isOpening ? -175 : 0 }}
                  transition={{ duration: 0.75, ease: 'easeInOut' }}
                >
                  <svg
                    className="h-full w-full backface-hidden"
                    viewBox="0 0 380 130"
                    preserveAspectRatio="none"
                  >
                    <polygon
                      points="0,0 380,0 190,130"
                      fill="url(#flapGrad)"
                      stroke="#C9A227"
                      strokeWidth="1.5"
                    />
                    <defs>
                      <linearGradient id="flapGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#F3E1AE" />
                        <stop offset="60%" stopColor="#D9BE7E" />
                        <stop offset="100%" stopColor="#B8860B" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                {/* Wax seal */}
                <motion.div
                  className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-gradient shadow-gold-glow sm:h-16 sm:w-16"
                  style={{ zIndex: 5 }}
                  animate={{
                    opacity: isOpening ? 0 : 1,
                    scale: isOpening ? 0.6 : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <FaHeart className="text-xl text-ivory sm:text-2xl" aria-hidden="true" />
                </motion.div>
              </motion.button>
            </div>

            <motion.p
              className="mt-10 font-body text-xs uppercase tracking-[0.4em] text-gold-600/80 sm:text-sm"
              animate={{ opacity: isOpening ? 0 : [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {t.envelopeHint}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function LightRaysBackdrop() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-glow blur-3xl" />
    </motion.div>
  )
}
