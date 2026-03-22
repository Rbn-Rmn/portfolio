import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sitemap',
      configureServer(server) {
        server.middlewares.use('/sitemap.xml', (req, res) => {
          res.setHeader('Content-Type', 'application/xml')
          res.end(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dewansultan.vercel.app/</loc>
    <lastmod>2025-03-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`)
        })
      },
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dewansultan.vercel.app/</loc>
    <lastmod>2025-03-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
        })
      }
    }
  ],
})