# Alt.Run SEO Canonicalization Strategy

This document outlines the SEO canonicalization strategy for the Alt.Run website, specifically addressing the duplicate content issues related to "Event Type" filter URLs.

## Overview of the Issue

As a Single Page Application (SPA) built with React and Vite, Alt.Run faces a common SEO challenge: when search engines crawl different URL paths that serve the same initial HTML content (before client-side JavaScript executes), they may perceive these URLs as duplicate content.

This issue specifically affects our "Event Type" filter URLs:
- `https://alt.run/charity-run`
- `https://alt.run/themed-run`
- `https://alt.run/obstacle-run`
- `https://alt.run/virtual-run`
- `https://alt.run/barefoot-run`

These URLs are intended to show filtered views of the main event listing, but from a search engine's perspective, they initially serve identical content to the homepage (`https://alt.run/`).

## Canonicalization Strategy

Our strategy is to establish `https://alt.run/` as the canonical URL for all event listings, including the filtered views. This approach:

1. Consolidates all ranking signals to the homepage
2. Prevents duplicate content issues
3. Maintains a clean URL structure for users
4. Preserves the ability to share direct links to filtered views

### Implementation Details

1. **Canonical Tags**: All "Event Type" filter URLs now include a canonical tag pointing to the homepage:
   ```html
   <link rel="canonical" href="https://alt.run/" />
   ```

2. **Self-Referencing Canonical**: The homepage (`https://alt.run/`) includes a self-referencing canonical tag:
   ```html
   <link rel="canonical" href="https://alt.run/" />
   ```

3. **XML Sitemap**: The "Event Type" filter URLs have been removed from the XML sitemap, as they canonicalize to the homepage.

4. **Obsolete Blog URL**: The `/blog` URL has been:
   - Removed from the sitemap
   - Set up with a 301 redirect to the homepage
   - Removed from the HTML snapshot generation script

## Technical Implementation

The canonicalization strategy has been implemented through the following changes:

1. **EventsPage.jsx**: Updated to set the canonical URL to the homepage for all "Event Type" filter URLs:
   ```javascript
   // Determine if this is an event type filter page that should canonicalize to homepage
   const isEventTypeFilterPage = currentPath !== '/' && 
     ['/charity-run', '/themed-run', '/obstacle-run', '/virtual-run', '/barefoot-run'].includes(currentPath);

   // ...

   return {
     title,
     description,
     // Set canonical URL to homepage for event type filter pages
     canonicalUrl: isEventTypeFilterPage ? '/' : currentPath,
     keywords,
     schema
   };
   ```

2. **sitemap.xml**: Removed "Event Type" filter URLs and the obsolete blog URL.

3. **netlify.toml**: Added 301 redirects for the obsolete blog URL:
   ```toml
   # Redirect obsolete blog URL to homepage
   [[redirects]]
     from = "/blog"
     to = "/"
     status = 301
     force = true

   # Redirect obsolete blog URL with trailing slash to homepage
   [[redirects]]
     from = "/blog/*"
     to = "/"
     status = 301
     force = true
   ```

4. **generate-html-snapshots.js**: Removed "Event Type" filter URLs and the obsolete blog URL from the list of routes to generate HTML snapshots for.

## Monitoring and Verification

After implementing these changes, you should:

1. Request a re-crawl of the site in Ahrefs
2. Submit the updated XML sitemap to Google Search Console
3. Use Google Search Console's URL Inspection tool to test:
   - `https://alt.run/` (should show as the canonical URL)
   - `https://alt.run/charity-run` (should show `https://alt.run/` as the Google-selected canonical)
   - Other "Event Type" filter URLs (should all show `https://alt.run/` as the Google-selected canonical)

## Future Considerations

If you decide to create unique, pre-rendered content for each "Event Type" filter page in the future (e.g., through server-side rendering or static site generation), you may want to revisit this canonicalization strategy. In that case, each filter page could have its own canonical URL if the content is sufficiently unique.

## References

- [Google's documentation on canonical URLs](https://developers.google.com/search/docs/advanced/crawling/consolidate-duplicate-urls)
- [Ahrefs' guide to canonical tags](https://ahrefs.com/blog/canonical-tags/)
