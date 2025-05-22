# Pre-rendering Implementation for Alt.Run

This document explains the pre-rendering implementation for Alt.Run, which ensures that search engines receive fully rendered HTML content for each unique page.

## Overview

Alt.Run is a Single Page Application (SPA) built with React and Vite. By default, SPAs serve the same initial HTML shell for all routes, with client-side JavaScript handling the rendering of route-specific content. This can lead to duplicate content issues for search engines, which may not fully execute JavaScript or may see the initial HTML as identical across routes.

To address this issue, we've implemented a custom pre-rendering solution that:

1. Generates fully rendered HTML for each unique content page
2. Ensures that each page has its proper title, meta description, and canonical tags
3. Preserves the client-side routing functionality for users

## Implementation Details

### Pre-rendering Script

The pre-rendering process is handled by `scripts/prerender-pages.js`, which:

1. Launches a headless browser (Puppeteer)
2. Visits each route defined in the `staticRoutes` array
3. Waits for the page to fully render (including all JavaScript execution)
4. Captures the rendered HTML
5. Saves the HTML to the appropriate file in the `dist` directory

For dynamic routes (like individual running plan pages), the script:

1. Visits the parent page (e.g., `/running-plans`)
2. Extracts links to individual plan pages
3. Visits each individual plan page and captures its rendered HTML

### Build Process

The pre-rendering is integrated into the build process in `package.json`:

```json
"scripts": {
  "build": "npm run generate-sitemap && npm run build:vite && npm run prerender-pages",
  "prerender-pages": "node scripts/prerender-pages.js"
}
```

This ensures that:

1. The sitemap is generated first
2. Vite builds the application
3. The pre-rendering script runs to generate fully rendered HTML for each route

### Sitemap Generation

The sitemap generation script (`scripts/generate-sitemap.js`) has been updated to:

1. Include only unique content pages
2. Exclude event type filter URLs that canonicalize to the homepage
3. Exclude obsolete URLs (like `/blog`)

## Testing Pre-rendering

To verify that pre-rendering is working correctly:

1. Run the build process: `npm run build`
2. Inspect the generated HTML files in the `dist` directory
3. Check that each unique content page has:
   - Its proper title and meta description
   - The correct canonical tag
   - The fully rendered content (not just the SPA shell)

You can also deploy the site and use "View Page Source" in your browser to verify that the pre-rendered HTML contains the fully rendered content.

## Troubleshooting

If pre-rendering fails or produces incomplete content:

1. Check the console output for errors
2. Ensure that the development server is running correctly
3. Adjust the wait times in the pre-rendering script if needed
4. Verify that all routes are correctly defined in the `staticRoutes` array

## Maintenance

When adding new routes to the application:

1. Add the route to the `staticRoutes` array in `scripts/prerender-pages.js`
2. Add the route to the `routes` array in `scripts/generate-sitemap.js`
3. Ensure that the route has proper SEO data (title, description, canonical URL)

For dynamic routes (like new types of plan pages), you may need to update the dynamic route handling logic in the pre-rendering script.

## SEO Considerations

With pre-rendering implemented, each unique content page now serves its fully rendered HTML to search engines. This ensures that:

1. Search engines can properly index the content
2. Each page has its correct title, meta description, and canonical tags
3. Duplicate content issues are resolved

For event type filter URLs that should canonicalize to the homepage, the existing implementation in `EventsPage.jsx` sets the canonical URL to the homepage, which is the correct approach.
