# Alt.Run SEO Implementation

This directory contains scripts and documentation for managing SEO aspects of the Alt.Run website, including sitemap generation and pre-rendering.

## Netlify SPA Configuration

The site uses a Netlify configuration to handle client-side routing for the Single Page Application (SPA). This is configured in the `netlify.toml` file in the project root:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This configuration ensures that all routes are properly handled by the React Router, even when accessed directly via URL.

## Scripts

### generate-sitemap.js

This script generates the sitemap.xml file based on the routes defined in the React Router configuration. It:

1. Creates a sitemap.xml file with the current date as the lastmod date
2. Includes all routes defined in the React Router configuration
3. Saves the sitemap.xml file to the public directory

Usage:
```bash
npm run generate-sitemap
```

### check-routes.js

This script is a utility for manually checking which routes are accessible on the live site. It's primarily for debugging purposes and is not required for normal operation. It:

1. Attempts to fetch each route defined in the script
2. Reports which routes return 200 OK and which return errors
3. Provides a summary of working and broken routes

Usage:
```bash
npm run check-routes
```

## HTML Snapshots Implementation

The site uses a custom script (`scripts/generate-html-snapshots.js`) to generate static HTML files for all routes at build time. This improves SEO by ensuring that search engines can crawl the content without executing JavaScript.

The script creates a directory structure that matches the routes in the React Router configuration and copies the built index.html file to each directory. This approach, combined with the Netlify SPA redirect configuration, ensures that:

1. Search engines can crawl all routes without executing JavaScript
2. Direct navigation to any route works correctly
3. Client-side navigation still works as expected

The routes to generate HTML snapshots for are defined in the `scripts/generate-html-snapshots.js` file and should match the routes defined in the React Router configuration.

## Workflow for Updating Routes

When adding new routes to the application:

1. Add the route to the React Router configuration in `src/App.jsx`
2. Add the route to the `routes` array in `scripts/generate-sitemap.js`
3. Add the route to the `routes` array in `scripts/generate-html-snapshots.js`
4. Run the build process to generate the HTML snapshots and updated sitemap:
   ```bash
   npm run build
   ```

## Automatic Sitemap Generation

The sitemap is automatically generated before each build as part of the build script in package.json:

```json
"build": "npm run generate-sitemap && vite build"
```

This ensures that the sitemap is always up-to-date when the site is built.

## Adding Dynamic Routes

For dynamic routes (like individual event pages, blog posts, etc.):

1. Modify the generate-sitemap.js script to fetch data from your API or database
2. Generate sitemap entries for each dynamic page
3. Include these entries in the sitemap.xml file
4. Add the dynamic routes to the `routes` array in `scripts/generate-html-snapshots.js`

Example for adding dynamic event pages:
```javascript
// In generate-sitemap.js
const events = await fetchEventsFromAPI();
events.forEach(event => {
  xml += '  <url>\n';
  xml += `    <loc>${siteUrl}/events/${event.slug}</loc>\n`;
  xml += `    <lastmod>${event.updatedAt || currentDate}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.6</priority>\n';
  xml += '  </url>\n';
});

// In generate-html-snapshots.js
const events = await fetchEventsFromAPI();
const dynamicRoutes = events.map(event => `/events/${event.slug}`);
const routes = [
  '/',
  '/events',
  // ... other static routes
  ...dynamicRoutes
];
```

## Verification

After deployment, verify that:

1. Direct navigation to deep links (e.g., `https://alt.run/virtual-run`) works correctly
2. The sitemap.xml is accessible at `https://alt.run/sitemap.xml`
3. Pre-rendered HTML content is being served initially (check with "View Page Source")
4. All routes are properly indexed by search engines (check Google Search Console)
