import React from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useLanguage } from '../hooks/useLanguage.jsx'

// Replace this placeholder with the real venue link when it is available,
// e.g. a share link copied from Google Maps.
const MAPS_URL = 'https://maps.google.com/?q=The+Grand+Rose+Garden+Cairo+Egypt'

export default function LocationButton() {
  const { t } = useLanguage()

  return (
    <section className="relative flex flex-col items-center gap-6 px-6 py-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-2"
      >
        <FaMapMarkerAlt className="text-2xl text-gold-600" aria-hidden="true" />
        <h3 className="font-display text-xl text-ink sm:text-2xl">{t.venueName}</h3>
        <p className="font-body text-sm text-ink-soft sm:text-base">{t.venueAddress}</p>
        <p className="font-script text-lg text-gold-600">{t.locationSubtitle}</p>
      </motion.div>

      <motion.a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.viewLocation}
        className="gold-border relative overflow-hidden rounded-full bg-gold-gradient px-8 py-3 font-body text-sm font-semibold tracking-wide text-ink shadow-luxury sm:text-base"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        whileHover={{ scale: 1.06, boxShadow: '0 0 35px rgba(240,214,140,0.65)' }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="relative z-10">{t.viewLocation}</span>
      </motion.a>
    </section>
  )
}
