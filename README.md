# Sofia & Adam — Wedding Invitation Website

A luxurious, single-page wedding invitation built with plain HTML, CSS, and vanilla JavaScript. No build tools, no frameworks — just open `index.html` or deploy the folder as-is.

## Files

```
index.html   → structure/content
style.css    → all design tokens + styling (see :root at the top)
script.js    → countdown, petals/particles, reveal animations, lightbox, RSVP, music toggle
images/      → gallery photos (6 placeholders included — replace with your own)
audio/       → background music (add your own song.mp3 here)
```

## Quick customization

1. **Names** — find/replace "Sofia" and "Adam" in `index.html` (hero, nav mark, footer, page title).
2. **Date & time** — update the visible text in the hero and `#details` section, *and* the `WEDDING_DATE` constant near the top of `script.js` (drives the live countdown).
3. **Venue & map** — edit the text in `#details` and `#location`, and swap the Google Maps `iframe` `src` in `index.html` for your own venue's embed link (Google Maps → Share → Embed a map).
4. **Photos** — replace the six files in `/images` (keep the same filenames, or update the `data-full` / `background-image` values in the `#gallery` section).
5. **Music** — drop an MP3 into `/audio` named `song.mp3` (or update the `<source>` path in `index.html`). The play/pause button in the bottom-right corner controls it.
6. **Colors & type** — every color, font, radius, and shadow is defined once at the top of `style.css` under `:root`. Change values there to restyle the whole site.
7. **RSVP form** — currently front-end only (shows a confirmation message but doesn't send anywhere). Connect it to a service like Formspree, Netlify Forms, or a Google Apps Script endpoint by editing the `submit` handler in `script.js`.

## Deploying

This is a fully static site — drag the folder into **Netlify Drop**, or push it to a repo and enable **GitHub Pages** (root folder, `index.html` as the entry point). No build step required.

## Notes

- Respects `prefers-reduced-motion` (petals and reveal transitions are disabled for users who request less motion).
- Fonts: Cormorant Garamond (display) + EB Garamond (body), loaded from Google Fonts, with Noto Naskh Arabic as a fallback for Arabic text.
- Petals are drawn on a `<canvas>` layer; ambient glow particles are lightweight DOM elements — both are capped and reduced on small screens for performance.
