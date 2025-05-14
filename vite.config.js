import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import htmlConfig from 'vite-plugin-html-config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Copy sitemap.xml to the dist folder
    viteStaticCopy({
      targets: [
        {
          src: 'public/sitemap.xml',
          dest: ''
        },
        {
          src: 'public/robots.txt',
          dest: ''
        }
      ]
    }),
    // Add any HTML config if needed
    htmlConfig({
      // You can add global HTML attributes here if needed
      metas: [
        {
          name: 'description',
          content: 'Your ultimate guide to fun, themed, charity, obstacle, and unique alternative runs globally. Explore running adventures from muddy obstacle courses to virtual races across USA, UK, Canada, Australia and more.'
        }
      ]
    })
  ],
  // Ensure clean URLs (no .html extension)
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
