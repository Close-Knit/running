# Alt.Run Sitemap Generation

This directory contains scripts for managing the sitemap.xml file for the Alt.Run website.

## Scripts

### generate-sitemap.js

This script generates the sitemap.xml file based on the routes defined in the script. It:

1. Creates a sitemap.xml file with the current date as the lastmod date
2. Includes only routes that are known to work (don't return 404 errors)
3. Saves the sitemap.xml file to the public directory

Usage:
```bash
npm run generate-sitemap
```

### check-routes.js

This script checks which routes are actually working on the live site. It:

1. Attempts to fetch each route defined in the script
2. Reports which routes return 200 OK and which return errors
3. Provides a summary of working and broken routes
4. Outputs the code to include working routes in the sitemap generator

Usage:
```bash
npm run check-routes
```

## Workflow for Updating the Sitemap

1. Run the check-routes script to determine which routes are working:
   ```bash
   npm run check-routes
   ```

2. Update the routes array in `generate-sitemap.js` based on the output of check-routes

3. Generate a new sitemap:
   ```bash
   npm run generate-sitemap
   ```

4. Build the site (this will automatically run the generate-sitemap script):
   ```bash
   npm run build
   ```

## Automatic Sitemap Generation

The sitemap is automatically generated before each build thanks to the prebuild script in package.json:

```json
"prebuild": "npm run generate-sitemap"
```

This ensures that the sitemap is always up-to-date when the site is built.

## Troubleshooting

If you're seeing 404 errors for routes that should exist:

1. Check that the route is properly defined in App.jsx
2. Verify that the server is correctly configured to handle client-side routing
3. For a SPA like this React app, ensure that the server redirects all routes to index.html

## Adding Dynamic Routes

For dynamic routes (like individual event pages, blog posts, etc.):

1. Modify the generate-sitemap.js script to fetch data from your API or database
2. Generate sitemap entries for each dynamic page
3. Include these entries in the sitemap.xml file

Example for adding dynamic event pages:
```javascript
// Pseudo-code
const events = await fetchEventsFromAPI();
events.forEach(event => {
  xml += '  <url>\n';
  xml += `    <loc>${siteUrl}/events/${event.slug}</loc>\n`;
  xml += `    <lastmod>${event.updatedAt || currentDate}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.6</priority>\n';
  xml += '  </url>\n';
});
```
