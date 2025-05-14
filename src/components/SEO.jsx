// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * SEO component for managing all meta tags, titles, and schema markup
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Page title (55-60 characters)
 * @param {string} props.description - Meta description (150-160 characters)
 * @param {string} props.canonicalUrl - Canonical URL for the page
 * @param {string} props.ogType - Open Graph type (website, article, etc.)
 * @param {string} props.ogImage - Open Graph image URL
 * @param {Array} props.keywords - Array of keywords for the page
 * @param {Object} props.schema - Schema.org JSON-LD data
 * @param {Object} props.breadcrumbs - Breadcrumb data for the page
 * @param {boolean} props.noindex - Whether to add noindex meta tag
 */
function SEO({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/images/alt-run-social-share.jpg', // Default OG image
  keywords = [],
  schema = null,
  breadcrumbs = null,
  noindex = false,
}) {
  // Base URL for the site
  const siteUrl = 'https://alt.run';

  // Format the canonical URL
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  // Ensure ogImage has absolute URL
  const fullOgImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Generate schema markup
  const generateSchemaMarkup = () => {
    // Base website schema that will be included on all pages
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      'url': siteUrl,
      'name': 'Alt.Run',
      'description': 'Discover Fun & Unique Running Adventures Worldwide',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${siteUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    };

    // Organization schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      'name': 'Alt.Run',
      'url': siteUrl,
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteUrl}/logo-glow.webp`,
        'width': 180,
        'height': 60
      },
      'sameAs': [
        'https://facebook.com/altrun',
        'https://twitter.com/altrun',
        'https://instagram.com/altrun'
      ]
    };

    // Breadcrumb schema if provided
    let breadcrumbSchema = null;
    if (breadcrumbs) {
      breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': crumb.name,
          'item': `${siteUrl}${crumb.path}`
        }))
      };
    }

    // Combine all schemas
    const schemas = [websiteSchema, organizationSchema];

    if (breadcrumbSchema) {
      schemas.push(breadcrumbSchema);
    }

    // Add custom schema if provided
    if (schema) {
      schemas.push(schema);
    }

    return schemas;
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Robots Meta */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImageUrl} />
      <meta property="og:site_name" content="Alt.Run" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImageUrl} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(generateSchemaMarkup())}
      </script>
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  canonicalUrl: PropTypes.string,
  ogType: PropTypes.string,
  ogImage: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  schema: PropTypes.object,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
  noindex: PropTypes.bool,
};

export default SEO;
