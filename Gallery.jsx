import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { useLanguage } from '../hooks/useLanguage.jsx'

// To use real photos: drop image files into `public/images/` and set their
// paths here, e.g. { src: `${import.meta.env.BASE_URL}images/photo-1.jpg` }.
// Until a `src` is provided, an elegant monogram placeholder is shown instead.
const GALLERY_ITEMS = [
  { id: 1, src: null },
  { id: 2, src: null },
  { id: 3, src: null },
  { id: 4, src: null },
  { id: 5, src: null },
  { id: 6, src: null }
]

function GalleryFrame({ item, index }) {
  const [errored, setErrored] = useState(false)
  const showPlaceholder = !item.src || errored

  return (
    <motion.div
      className="group relative aspect-square overflow-hidden rounded-lg gold-border shadow-card"
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ scale: 1.04 }}
    >
      {showPlaceholder ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-ivory-gradient">
          <FaHeart className="text-2xl text-gold-300" aria-hidden="true" />
          <span className="font-script text-lg text-gold-500">Mohammed &amp; Naglaa</span>
        </div>
      ) : (
        <img
          src={item.src}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setErrored(true)}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  )
}

export default function Gallery() {
  const { t } = useLanguage()

  return (
    <section className="relative flex flex-col items-center gap-8 px-6 py-4" aria-label={t.galleryTitle}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-2 text-center"
      >
        <h2 className="font-display text-2xl text-ink sm:text-3xl">{t.galleryTitle}</h2>
        <p className="font-script text-lg text-gold-600">{t.gallerySubtitle}</p>
      </motion.div>

      <div className="grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {GALLERY_ITEMS.map((item, index) => (
          <GalleryFrame key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}
