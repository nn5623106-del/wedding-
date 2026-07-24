import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages deployment note:
// Set `base` to '/<your-repo-name>/' before deploying to GitHub Pages.
// Example: base: '/mohammed-naglaa-wedding/'
// Keep it as './' for local development, custom domains, or Netlify/Vercel.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  }
})
