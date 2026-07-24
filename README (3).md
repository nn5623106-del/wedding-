# Mohammed & Naglaa — Luxury Wedding Invitation

A cinematic, bilingual (English/Arabic) digital wedding invitation built with
React 18, Vite, Tailwind CSS, and Framer Motion. Guests are greeted with a
realistic 3D envelope that opens on click to reveal the full invitation,
complete with a live countdown, an optional gallery, background music, and a
"View Location" button.

## ✨ Features

- Cinematic 3D envelope opening sequence (float → flap opens → letter slides
  up → camera zoom → invitation reveal)
- Full English & Arabic support with one-tap language switching and correct
  RTL layout
- Live countdown timer to the big day
- Floating music button (Play/Pause, **no autoplay**, easy to swap the track)
- "View Location" button linking to Google Maps (placeholder link, easy to
  replace)
- Optional luxury photo gallery with elegant placeholder frames
- Thank-you closing section
- Glassmorphism cards, gold borders, floating golden sparkles, soft glowing
  light rays, and an animated gradient background
- Scroll reveal, parallax-style floating elements, and spring animations
  throughout, powered by Framer Motion
- Mobile-first, fully responsive layout (mobile → tablet → laptop → desktop)
- Accessible: semantic HTML, keyboard-operable envelope and buttons, ARIA
  labels, visible focus states, and `prefers-reduced-motion` support

## 🧱 Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 📁 Project Structure

```
src/
  components/
    Envelope.jsx          3D opening envelope experience
    Invitation.jsx        Main invitation content (hero + sections)
    Countdown.jsx          Live countdown timer
    MusicPlayer.jsx        Floating play/pause music button
    LanguageSwitcher.jsx   English/Arabic toggle
    LocationButton.jsx     "View Location" call-to-action
    Gallery.jsx             Optional luxury photo gallery
    ThankYou.jsx            Closing thank-you section
    FloatingFlowers.jsx     Decorative floating floral SVGs
    Particles.jsx            Floating golden sparkle particles
    LightRays.jsx            Ambient glow / light-ray backdrop
  hooks/
    useCountdown.js         Countdown calculation hook
    useLanguage.jsx         Language context (English/Arabic + RTL)
  i18n/
    translations.js         All English & Arabic copy
  pages/
    Home.jsx                 Wires the envelope to the invitation
  styles/
    index.css                 Tailwind layers + global styles/utilities
  App.jsx
  main.jsx
public/
  music/                     Drop your track here (see README inside)
  images/                    Drop gallery photos here (see README inside)
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## 🎵 Adding Background Music

Drop an audio file at `public/music/wedding-song.mp3` (mp3, ogg, or wav all
work — just update the file name in `src/components/MusicPlayer.jsx` if you
use a different one). Music **never autoplays**; it only starts when a guest
taps the floating music button.

## 🗺️ Setting the Real Venue Link

Open `src/components/LocationButton.jsx` and replace the placeholder
`MAPS_URL` constant with your venue's real Google Maps link.

## 🖼️ Adding Gallery Photos

See `public/images/README.md` — drop photos into `public/images/` and wire
them up in `src/components/Gallery.jsx`'s `GALLERY_ITEMS` array. Until then,
elegant placeholder frames are shown automatically.

## 📅 Changing the Wedding Date/Time

Update the copy in `src/i18n/translations.js` (`dateValue`, `timeValue`,
`dayValue`) **and** the actual countdown target in
`src/hooks/useCountdown.js` (`TARGET_DATE`).

## 🌍 Deploying to GitHub Pages

This project ships with a ready-to-use GitHub Actions workflow at
`.github/workflows/deploy.yml` that builds the site and deploys it to GitHub
Pages automatically on every push to `main`.

1. Push this project to a GitHub repository.
2. In the repository settings, go to **Pages** and set the source to
   **GitHub Actions**.
3. Push to `main` — the workflow will build and deploy automatically.

`vite.config.js` uses a relative `base: './'`, so it works out of the box on
GitHub Pages project sites, custom domains, Netlify, and Vercel alike — no
extra configuration needed.

Alternatively, you can deploy manually with the included `gh-pages` package:

```bash
npm run deploy
```

## ♿ Accessibility Notes

- The envelope is a real `<button>` — operable with click, `Enter`, or
  `Space`, with an `aria-label` describing the action.
- The countdown uses `role="timer"` with `aria-live="polite"` for screen
  reader announcements.
- All decorative elements (sparkles, flowers, light rays) are marked
  `aria-hidden="true"` so they don't clutter screen reader output.
- Focus states are visible on every interactive element.
- Animations respect `prefers-reduced-motion`.

## 📝 License

This project was generated as a custom deliverable for Mohammed & Naglaa's
wedding. Feel free to adapt it for your own celebration.
