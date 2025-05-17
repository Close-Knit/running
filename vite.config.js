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
      metas: []
    })
  ],
  // Ensure clean URLs (no .html extension)
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  // Configure server to handle PDF files correctly
  server: {
    fs: {
      // Allow serving files from the public directory
      allow: ['..']
    },
    // Custom middleware to set correct MIME types
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Set correct MIME type for PDF files
        if (req.url.endsWith('.pdf')) {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'inline; filename=alt-run-beginner-guide.pdf');
        }
        next();
      });
    }
  }
})
