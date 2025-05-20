// scripts/check-routes.js
import fetch from 'node-fetch';

// Base URL of the site
const siteUrl = 'https://alt.run';

// Define the routes to check
// These should match the routes defined in App.jsx
const routesToCheck = [
  '/',
  '/events',
  '/charity-run',
  '/themed-run',
  '/obstacle-run',
  '/virtual-run',
  '/barefoot-run',
  '/blog',
  '/shoe-reviews',
  '/start-running-guide',
  '/intermediate-running-guide',
  '/advanced-running-guide',
  '/terms-and-conditions',
  '/privacy-policy',
];

// Function to check if a route returns a 200 OK status
async function checkRoute(route) {
  try {
    const url = `${siteUrl}${route}`;
    const response = await fetch(url);
    const status = response.status;

    console.log(`${url}: ${status} ${response.statusText}`);

    return {
      route,
      url,
      status,
      statusText: response.statusText,
      exists: status === 200
    };
  } catch (error) {
    console.error(`Error checking ${siteUrl}${route}:`, error.message);
    return {
      route,
      url: `${siteUrl}${route}`,
      status: 0,
      statusText: error.message,
      exists: false
    };
  }
}

// Check all routes and print a summary
async function checkAllRoutes() {
  console.log('Checking routes...');

  const results = await Promise.all(routesToCheck.map(route => checkRoute(route)));

  console.log('\nSummary:');
  console.log('--------');

  const workingRoutes = results.filter(result => result.exists);
  const brokenRoutes = results.filter(result => !result.exists);

  console.log(`Working routes (${workingRoutes.length}):`);
  workingRoutes.forEach(route => {
    console.log(`- ${route.url}`);
  });

  console.log(`\nBroken routes (${brokenRoutes.length}):`);
  brokenRoutes.forEach(route => {
    console.log(`- ${route.url}: ${route.status} ${route.statusText}`);
  });

  console.log('\nRoutes to include in sitemap:');
  workingRoutes.forEach(route => {
    const priority = route.route === '/' ? '1.0' :
                    route.route === '/events' ? '0.9' :
                    route.route.includes('blog') || route.route.includes('shoe-reviews') ? '0.7' : '0.8';
    const changefreq = route.route.includes('blog') || route.route.includes('shoe-reviews') ? 'weekly' :
                       route.route.includes('running-guide') ? 'monthly' : 'daily';

    console.log(`{ path: '${route.route}', changefreq: '${changefreq}', priority: '${priority}' },`);
  });
}

// Execute the script
checkAllRoutes();
