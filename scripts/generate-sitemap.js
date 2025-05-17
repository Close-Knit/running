// scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL of the site
const siteUrl = 'https://alt.run';

// Current date in YYYY-MM-DD format for lastmod
const currentDate = new Date().toISOString().split('T')[0];

// Define the routes that exist in the React Router configuration
// These match the routes defined in App.jsx
const routes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/events', changefreq: 'daily', priority: '0.9' },
  { path: '/charity-run', changefreq: 'daily', priority: '0.8' },
  { path: '/themed-run', changefreq: 'daily', priority: '0.8' },
  { path: '/obstacle-run', changefreq: 'daily', priority: '0.8' },
  { path: '/virtual-run', changefreq: 'daily', priority: '0.8' },
  { path: '/barefoot-run', changefreq: 'daily', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
  { path: '/shoe-reviews', changefreq: 'weekly', priority: '0.7' },
  { path: '/start-running-guide', changefreq: 'monthly', priority: '0.8' },
  { path: '/intermediate-running-guide', changefreq: 'monthly', priority: '0.8' },
  { path: '/advanced-running-guide', changefreq: 'monthly', priority: '0.8' },
  // Note: We don't include dynamic routes like /events/:slug here
  // Those would be generated separately if needed
];

// Generate the sitemap XML content
function generateSitemapXml() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add each route to the sitemap
  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${siteUrl}${route.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  // Add comments for dynamic pages
  xml += '\n  <!-- Individual Event Pages - These would be dynamically generated -->\n';
  xml += '  <!-- Example:\n';
  xml += '  <url>\n';
  xml += '    <loc>https://alt.run/events/the-color-run-new-york</loc>\n';
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.6</priority>\n';
  xml += '  </url>\n';
  xml += '  -->\n';

  xml += '\n  <!-- Individual Blog Posts - These would be dynamically generated -->\n';
  xml += '  <!-- Example:\n';
  xml += '  <url>\n';
  xml += '    <loc>https://alt.run/blog/top-5-fun-obstacle-races-for-beginners</loc>\n';
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += '    <changefreq>monthly</changefreq>\n';
  xml += '    <priority>0.5</priority>\n';
  xml += '  </url>\n';
  xml += '  -->\n';

  xml += '\n  <!-- Individual Shoe Reviews - These would be dynamically generated -->\n';
  xml += '  <!-- Example:\n';
  xml += '  <url>\n';
  xml += '    <loc>https://alt.run/shoe-reviews/brooks-cascadia-17</loc>\n';
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += '    <changefreq>monthly</changefreq>\n';
  xml += '    <priority>0.5</priority>\n';
  xml += '  </url>\n';
  xml += '  -->\n';

  xml += '</urlset>';

  return xml;
}

// Write the sitemap to the public directory
function writeSitemap() {
  const sitemap = generateSitemapXml();
  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');

  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated at ${outputPath}`);
}

// Execute the script
writeSitemap();
