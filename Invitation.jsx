import React from 'react'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaClock, FaChevronDown } from 'react-icons/fa'
import { useLanguage } from '../hooks/useLanguage.jsx'
import Countdown from './Countdown.jsx'
import LocationButton from './LocationButton.jsx'
import Gallery from './Gallery.jsx'
import ThankYou from './ThankYou.jsx'
import LightRays from './LightRays.jsx'
import FloatingFlowers from './FloatingFlowers.jsx'
import Particles from './Particles.jsx'

const sectionVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Invitation() {
  const { t } = useLanguage()

  return (
    <motion.main
      className="relative min-h-screen w-full overflow-hidden animated-gradient-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <LightRays />
      <FloatingFlowers variant="dense" />
      <Particles count={34} />

      {/* HERO */}
      <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="glass-strong gold-border relative w-full max-w-lg rounded-2xl px-6 py-12 shadow-luxury-lg sm:px-12 sm:py-16"
        >
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-gold-600 sm:text-sm"
          >
            {t.bridesGroom}
          </motion.p>

          <div className="divider-gold mx-auto mb-6 w-24" />

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="font-display text-4xl leading-tight text-ink sm:text-6xl"
          >
            {t.groomName}
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.85, duration: 0.6, type: 'spring' }}
            className="my-3 block font-script text-2xl text-gold-500 sm:text-3xl"
            aria-hidden="true"
          >
            {t.and}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-display text-4xl leading-tight text-ink sm:text-6xl"
          >
            {t.brideName}
          </motion.h1>

          <div className="divider-gold mx-auto my-7 w-24" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mx-auto mb-8 max-w-sm font-body text-sm leading-relaxed text-ink-soft sm:text-base"
          >
            {t.requestPleasure}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.7 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10"
          >
            <div className="flex items-center gap-2 text-ink">
              <FaCalendarAlt className="text-gold-500" aria-hidden="true" />
              <div className="text-start">
                <p className="font-body text-[10px] uppercase tracking-wider text-ink-soft">
                  {t.dateLabel}
                </p>
                <p className="font-display text-base sm:text-lg">{t.dateValue}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-ink">
              <FaClock className="text-gold-500" aria-hidden="true" />
              <div className="text-start">
                <p className="font-body text-[10px] uppercase tracking-wider text-ink-soft">
                  {t.timeLabel}
                </p>
                <p className="font-display text-base sm:text-lg">{t.timeValue}</p>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="mt-8 font-script text-lg text-gold-600 sm:text-xl"
          >
            {t.rsvp}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col items-center gap-1 text-gold-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0.4] }}
          transition={{ delay: 2, duration: 2.5, times: [0, 0.3, 0.7, 1], repeat: Infinity }}
          aria-hidden="true"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.3em]">
            {t.scrollHint}
          </span>
          <FaChevronDown />
        </motion.div>
      </section>

      {/* COUNTDOWN */}
      <Reveal className="relative z-10 mx-auto max-w-3xl">
        <div className="glass gold-border mx-6 rounded-2xl py-10 shadow-card sm:mx-auto">
          <Countdown />
        </div>
      </Reveal>

      {/* LOCATION */}
      <Reveal className="relative z-10 mx-auto mt-16 max-w-3xl" delay={0.1}>
        <div className="glass gold-border mx-6 rounded-2xl py-10 shadow-card sm:mx-auto">
          <LocationButton />
        </div>
      </Reveal>

      {/* GALLERY */}
      <Reveal className="relative z-10 mx-auto mt-16 max-w-4xl" delay={0.1}>
        <div className="glass gold-border mx-6 rounded-2xl py-10 shadow-card sm:mx-auto">
          <Gallery />
        </div>
      </Reveal>

      {/* THANK YOU */}
      <Reveal className="relative z-10 mx-auto mb-10 mt-16 max-w-2xl" delay={0.1}>
        <ThankYou />
      </Reveal>
    </motion.main>
  )
}
