// scripts/validate-seo-fixes.js
import fetch from 'node-fetch';

// Base URL of the site
const siteUrl = 'https://alt.run';

// URLs from sitemap to validate (with trailing slashes to match Netlify's Pretty URLs)
const urlsToValidate = [
  '/',
  '/shoe-reviews/',
  '/start-running-guide/',
  '/couch-to-5k-guide/',
  '/intermediate-running-guide/',
  '/advanced-running-guide/',
  '/running-gear-guide/',
  '/common-running-injuries-guide/',
  '/womens-running-health-guide/',
  '/optimal-running-form-guide/',
  '/mental-strategies-guide/',
  '/professional-runners/jakob-ingebrigtsen/',
  '/professional-runners/eliud-kipchoge/',
  '/professional-runners/kelvin-kiptum/',
  '/terms-and-conditions/',
  '/privacy-policy/',
  '/running-plans/'
];

// Function to check if a URL returns 200 and has correct canonical
async function validateUrl(path) {
  try {
    const url = `${siteUrl}${path}`;
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Validator/1.0)'
      }
    });

    const status = response.status;
    const finalUrl = response.url;

    // Check if there were redirects
    const redirected = finalUrl !== url;

    let canonicalUrl = null;
    if (status === 200) {
      const html = await response.text();
      const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
      if (canonicalMatch) {
        canonicalUrl = canonicalMatch[1];
      }
    }

    return {
      path,
      originalUrl: url,
      finalUrl,
      status,
      redirected,
      canonicalUrl,
      isValid: status === 200 && !redirected && canonicalUrl === url
    };
  } catch (error) {
    return {
      path,
      originalUrl: `${siteUrl}${path}`,
      error: error.message,
      isValid: false
    };
  }
}

// Function to validate non-trailing slash URLs redirect to trailing slash versions
async function validateTrailingSlashRedirects() {
  console.log('\n🔍 Validating non-trailing slash URLs redirect to trailing slash versions...');

  const nonTrailingSlashUrls = [
    '/shoe-reviews',
    '/start-running-guide',
    '/running-plans',
    '/terms-and-conditions'
  ];

  for (const path of nonTrailingSlashUrls) {
    try {
      const url = `${siteUrl}${path}`;
      const response = await fetch(url, {
        redirect: 'manual'
      });

      const status = response.status;
      const location = response.headers.get('location');
      const expectedRedirect = `${path}/`; // Add trailing slash

      if (status === 301 && location && location.endsWith(expectedRedirect)) {
        console.log(`✅ ${path} → ${location} (301)`);
      } else {
        console.log(`❌ ${path} → Status: ${status}, Location: ${location}`);
      }
    } catch (error) {
      console.log(`❌ ${path} → Error: ${error.message}`);
    }
  }
}

// Main validation function
async function validateSeoFixes() {
  console.log('🚀 Validating SEO fixes for Alt.Run...\n');

  console.log('📋 Checking sitemap URLs for 200 status and correct canonicals...');

  const results = await Promise.all(urlsToValidate.map(validateUrl));

  const validUrls = results.filter(r => r.isValid);
  const invalidUrls = results.filter(r => !r.isValid);

  console.log(`\n✅ Valid URLs (${validUrls.length}):`);
  validUrls.forEach(result => {
    console.log(`   ${result.originalUrl}`);
  });

  if (invalidUrls.length > 0) {
    console.log(`\n❌ Issues found (${invalidUrls.length}):`);
    invalidUrls.forEach(result => {
      console.log(`   ${result.originalUrl}:`);
      if (result.error) {
        console.log(`     Error: ${result.error}`);
      } else {
        console.log(`     Status: ${result.status}`);
        if (result.redirected) {
          console.log(`     Redirected to: ${result.finalUrl}`);
        }
        if (result.canonicalUrl) {
          console.log(`     Canonical: ${result.canonicalUrl}`);
        }
      }
    });
  }

  // Validate trailing slash redirects
  await validateTrailingSlashRedirects();

  console.log('\n📊 Summary:');
  console.log(`   Total URLs checked: ${results.length}`);
  console.log(`   Valid (200, no redirects, correct canonical): ${validUrls.length}`);
  console.log(`   Issues found: ${invalidUrls.length}`);

  if (invalidUrls.length === 0) {
    console.log('\n🎉 All SEO fixes validated successfully!');
  } else {
    console.log('\n⚠️  Some issues remain. Please review the output above.');
  }
}

// Execute the validation
validateSeoFixes().catch(console.error);
