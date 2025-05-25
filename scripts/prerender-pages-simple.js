// scripts/prerender-pages-simple.js
// Simplified pre-rendering script that doesn't require a development server
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the routes to pre-render
const staticRoutes = [
  '/',
  '/shoe-reviews',
  '/start-running-guide',
  '/couch-to-5k-guide',
  '/intermediate-running-guide',
  '/advanced-running-guide',
  '/running-gear-guide',
  '/common-running-injuries-guide',
  '/womens-running-health-guide',
  '/optimal-running-form-guide',
  '/mental-strategies-guide',
  '/running-plans',
  '/terms-and-conditions',
  '/privacy-policy',
  '/professional-runners/jakob-ingebrigtsen',
  '/professional-runners/eliud-kipchoge',
  '/professional-runners/kelvin-kiptum'
];

// Function to ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to normalize URL to match Netlify's "Pretty URLs" behavior
// This must match the normalization used in generate-sitemap.js
function normalizeCanonicalUrl(path) {
  const baseUrl = 'https://alt.run';

  // For homepage, always use trailing slash
  if (path === '/') {
    return `${baseUrl}/`;
  }

  // For all content pages (guides, legal, etc.), add trailing slash to match Netlify's behavior
  // This prevents canonical URLs from pointing to redirects
  const pathWithTrailingSlash = path.endsWith('/') ? path : `${path}/`;
  return `${baseUrl}${pathWithTrailingSlash}`;
}

// Function to create HTML using Vite-generated template with correct asset paths
function createHTMLFromTemplate(route, viteGeneratedHTML) {
  const title = getPageTitle(route);
  const description = getPageDescription(route);
  const canonicalUrl = normalizeCanonicalUrl(route);

  // Replace the title, description, and canonical URL in the Vite-generated HTML
  let html = viteGeneratedHTML;

  // Replace title (look for existing title tag)
  html = html.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);

  // Add or replace meta description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${description}">`);
  } else {
    // Insert meta description after viewport meta tag
    html = html.replace(
      /(<meta name="viewport"[^>]*>)/i,
      `$1\n  <meta name="description" content="${description}">`
    );
  }

  // Add or replace canonical URL
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonicalUrl}">`);
  } else {
    // Insert canonical link after meta description or viewport
    const insertAfter = html.includes('<meta name="description"') ?
      /(<meta name="description"[^>]*>)/i :
      /(<meta name="viewport"[^>]*>)/i;
    html = html.replace(insertAfter, `$1\n  <link rel="canonical" href="${canonicalUrl}">`);
  }

  return html;
}

function getPageTitle(route) {
  const titles = {
    '/': 'Alt.Run: Discover Fun & Unique Running Adventures Worldwide',
    '/shoe-reviews': 'Running Shoe Reviews - Alt.Run',
    '/start-running-guide': 'Start Running: Beginner Guide - Alt.Run',
    '/couch-to-5k-guide': 'Couch to 5K Guide - Alt.Run',
    '/intermediate-running-guide': 'Intermediate Running Guide - Alt.Run',
    '/advanced-running-guide': 'Advanced Running Guide - Alt.Run',
    '/running-gear-guide': 'Running Gear Guide - Alt.Run',
    '/common-running-injuries-guide': 'Common Running Injuries Guide - Alt.Run',
    '/womens-running-health-guide': 'Women\'s Running Health Guide - Alt.Run',
    '/optimal-running-form-guide': 'Optimal Running Form Guide - Alt.Run',
    '/mental-strategies-guide': 'Mental Strategies Guide - Alt.Run',
    '/running-plans': 'Free Running Plans - Alt.Run',
    '/terms-and-conditions': 'Terms and Conditions - Alt.Run',
    '/privacy-policy': 'Privacy Policy - Alt.Run',
    '/professional-runners/jakob-ingebrigtsen': 'Jakob Ingebrigtsen Profile - Alt.Run',
    '/professional-runners/eliud-kipchoge': 'Eliud Kipchoge Profile - Alt.Run',
    '/professional-runners/kelvin-kiptum': 'Kelvin Kiptum Profile - Alt.Run',
    '/running-plans/plan/placeholder': 'Running Plan - Alt.Run'
  };
  return titles[route] || 'Alt.Run';
}

function getPageDescription(route) {
  const descriptions = {
    '/': 'Discover unique running adventures worldwide with Alt.Run! Explore themed runs, obstacle courses, virtual races & more.',
    '/shoe-reviews': 'Comprehensive reviews of the latest running shoes to help you find the perfect pair for your running style.',
    '/start-running-guide': 'Complete beginner\'s guide to start running safely and effectively.',
    '/couch-to-5k-guide': 'Transform from couch potato to 5K runner with our proven training plan.',
    '/intermediate-running-guide': 'Take your running to the next level with intermediate training strategies.',
    '/advanced-running-guide': 'Advanced running techniques and training for experienced runners.',
    '/running-gear-guide': 'Essential running gear recommendations for all types of runners.',
    '/common-running-injuries-guide': 'Prevention and treatment guide for common running injuries.',
    '/womens-running-health-guide': 'Specialized running health guide for women runners.',
    '/optimal-running-form-guide': 'Master proper running form to improve efficiency and prevent injuries.',
    '/mental-strategies-guide': 'Mental strategies and techniques to improve your running performance.',
    '/running-plans': 'Free personalized running plans for all fitness levels and goals.',
    '/terms-and-conditions': 'Terms and conditions for using Alt.Run services.',
    '/privacy-policy': 'Privacy policy explaining how Alt.Run handles your personal data.',
    '/professional-runners/jakob-ingebrigtsen': 'Profile and achievements of Norwegian middle-distance runner Jakob Ingebrigtsen.',
    '/professional-runners/eliud-kipchoge': 'Profile and achievements of Kenyan marathon legend Eliud Kipchoge.',
    '/professional-runners/kelvin-kiptum': 'Profile and achievements of Kenyan marathon runner Kelvin Kiptum.',
    '/running-plans/plan/placeholder': 'Personalized running plan generated by Alt.Run.'
  };
  return descriptions[route] || 'Alt.Run - Alternative Running Events';
}

// Main pre-rendering function
async function prerenderPages() {
  console.log('Starting simple pre-rendering process...');

  // Get the path to the dist directory
  const distDir = path.resolve(__dirname, '../dist');

  // Check if the dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory does not exist. Run "npm run build:vite" first.');
    process.exit(1);
  }

  // Read the Vite-generated index.html as a template
  const viteIndexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(viteIndexPath)) {
    console.error('Error: Vite-generated index.html not found. Make sure "npm run build:vite" completed successfully.');
    process.exit(1);
  }

  const viteGeneratedHTML = fs.readFileSync(viteIndexPath, 'utf-8');
  console.log('Using Vite-generated index.html as template with correct asset paths');

  // Process each static route
  for (const route of staticRoutes) {
    console.log(`Pre-rendering ${route}...`);

    try {
      // Create HTML using the Vite template with correct asset paths
      const html = createHTMLFromTemplate(route, viteGeneratedHTML);

      // Determine the output path
      let outputPath;
      if (route === '/') {
        // For the root route, update the existing index.html
        outputPath = path.join(distDir, 'index.html');
      } else {
        // Create the directory structure for the route
        const routeDir = path.join(distDir, route.slice(1));
        ensureDirectoryExists(routeDir);
        outputPath = path.join(routeDir, 'index.html');
      }

      // Write the pre-rendered HTML to the file
      fs.writeFileSync(outputPath, html);

      console.log(`Successfully pre-rendered ${route} to ${outputPath}`);
    } catch (error) {
      console.error(`Error pre-rendering ${route}:`, error);
    }
  }

  // Create a placeholder for running plans using the same template
  console.log('Creating placeholder for running plans...');
  const placeholderDir = path.join(distDir, 'running-plans/plan');
  ensureDirectoryExists(placeholderDir);

  const placeholderHtml = createHTMLFromTemplate('/running-plans/plan/placeholder', viteGeneratedHTML);
  fs.writeFileSync(path.join(placeholderDir, 'index.html'), placeholderHtml);

  console.log('Simple pre-rendering completed successfully!');
}

// Execute the script
prerenderPages();
