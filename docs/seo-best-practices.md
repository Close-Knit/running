# Alt.Run SEO Best Practices

This document outlines the SEO best practices for the Alt.Run website to ensure optimal search engine visibility and user experience.

## Meta Tags

### Required Meta Tags for All Pages

Every page should include the following meta tags:

1. **Title Tag**: 
   - Should be unique for each page
   - 50-60 characters in length
   - Include the main keyword for the page
   - Format: `[Page-Specific Title] | Alt.Run`

2. **Meta Description**:
   - Should be unique for each page
   - 150-160 characters in length
   - Include the main keyword for the page
   - Provide a compelling description that encourages clicks

3. **Canonical URL**:
   - Always use the full, absolute URL
   - Example: `https://alt.run/events` (not `/events`)

4. **Open Graph Tags**:
   - `og:title` - Same as the page title
   - `og:description` - Same as the meta description
   - `og:url` - The canonical URL of the page
   - `og:image` - An image that represents the page content (1200x630px recommended)
   - `og:type` - Usually "website" or "article"

5. **Twitter Card Tags**:
   - `twitter:card` - Usually "summary_large_image"
   - `twitter:title` - Same as the page title
   - `twitter:description` - Same as the meta description
   - `twitter:image` - Same as og:image

## Heading Structure

### Proper Heading Hierarchy

Every page should follow a proper heading hierarchy:

1. **H1 Tag**:
   - Each page should have exactly one H1 tag
   - The H1 should contain the main keyword for the page
   - The H1 should be descriptive of the page content

2. **H2-H6 Tags**:
   - Use H2 tags for main sections of the page
   - Use H3-H6 tags for subsections in a hierarchical manner
   - Don't skip heading levels (e.g., don't go from H2 to H4)

## URL Structure

### Clean and Descriptive URLs

All URLs should be:

1. **Clean and readable**:
   - Use hyphens to separate words
   - Avoid parameters when possible
   - Keep URLs short and descriptive

2. **Include relevant keywords**:
   - The URL should contain the main keyword for the page
   - Avoid generic terms like "page" or "article"

## Internal Linking

### Consistent Internal Linking

Internal links should:

1. **Use descriptive anchor text**:
   - The link text should describe the destination page
   - Avoid generic terms like "click here" or "read more"

2. **Link to the canonical URL**:
   - Always link to the canonical version of a page
   - For the homepage, use `https://alt.run/` or `/` (not `/index.html`)

3. **Use relative URLs for internal links**:
   - For internal links, use relative URLs (e.g., `/events` instead of `https://alt.run/events`)
   - This makes the site more portable and easier to maintain

## Domain Redirects

### Proper Domain Canonicalization

Ensure all domain variations redirect to the canonical domain:

1. **HTTP to HTTPS**:
   - All HTTP requests should redirect to HTTPS

2. **WWW to non-WWW (or vice versa)**:
   - Choose one version (with or without www) and stick with it
   - Alt.Run uses the non-www version (`https://alt.run/`)

3. **Use 301 (permanent) redirects**:
   - All redirects should be 301 (permanent) redirects
   - This passes link equity to the canonical URL

## Schema Markup

### Structured Data for Rich Results

Implement schema markup for:

1. **Organization**:
   - Include the organization name, logo, and social profiles

2. **WebSite**:
   - Include the website name, URL, and search action

3. **WebPage**:
   - Include the page name, description, and breadcrumbs

4. **BreadcrumbList**:
   - Include breadcrumbs for all pages except the homepage

5. **Event**:
   - For event pages, include event-specific schema (name, date, location, etc.)

## Mobile Optimization

### Mobile-Friendly Design

Ensure the site is mobile-friendly:

1. **Responsive design**:
   - The site should adapt to all screen sizes

2. **Fast loading times**:
   - Optimize images and minimize render-blocking resources

3. **Easy navigation**:
   - Make sure navigation is easy to use on mobile devices

## Page Speed

### Fast-Loading Pages

Optimize page speed:

1. **Minimize HTTP requests**:
   - Combine CSS and JavaScript files
   - Use image sprites where appropriate

2. **Optimize images**:
   - Compress images without sacrificing quality
   - Use modern formats like WebP where supported

3. **Enable browser caching**:
   - Set appropriate cache headers for static resources

4. **Minimize render-blocking resources**:
   - Load CSS in the head and JavaScript at the end of the body
   - Use async or defer attributes for non-critical scripts

## Verification Tools

### Tools for SEO Verification

Use these tools to verify SEO implementation:

1. **Google Search Console**:
   - Monitor indexing status and search performance
   - Identify and fix issues

2. **Ahrefs Site Audit**:
   - Comprehensive site audit to identify SEO issues
   - Monitor site health over time

3. **Google PageSpeed Insights**:
   - Analyze page speed and get recommendations
   - Monitor Core Web Vitals

4. **Mobile-Friendly Test**:
   - Verify that pages are mobile-friendly
   - Identify mobile usability issues

5. **Rich Results Test**:
   - Validate schema markup
   - Preview how rich results will appear in search results
