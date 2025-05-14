// scripts/check-redirects.js
import fetch from 'node-fetch';

// Base URL of the site
const canonicalUrl = 'https://alt.run/';

// Define the URLs to check for redirects
const urlsToCheck = [
  'http://alt.run/',
  'https://www.alt.run/',
  'http://www.alt.run/',
];

// Function to check if a URL redirects to the canonical URL
async function checkRedirect(url) {
  try {
    // Use fetch with redirect: 'manual' to prevent automatic following of redirects
    const response = await fetch(url, { redirect: 'manual' });
    
    // Get the status code and location header
    const status = response.status;
    const location = response.headers.get('location');
    
    console.log(`${url}:`);
    console.log(`  Status: ${status}`);
    
    if (status >= 300 && status < 400) {
      console.log(`  Redirects to: ${location}`);
      
      // Check if the redirect is to the canonical URL
      if (location === canonicalUrl) {
        console.log('  ✅ Redirects to canonical URL');
      } else {
        console.log('  ❌ Does NOT redirect to canonical URL');
      }
      
      // Check if it's a 301 (permanent) redirect
      if (status === 301) {
        console.log('  ✅ Uses 301 (permanent) redirect');
      } else {
        console.log(`  ❌ Uses ${status} redirect instead of 301 (permanent)`);
      }
    } else {
      console.log('  ❌ No redirect found');
    }
    
    console.log(''); // Empty line for readability
    
    return {
      url,
      status,
      location,
      redirectsToCanonical: location === canonicalUrl,
      isPermanent: status === 301
    };
  } catch (error) {
    console.error(`Error checking ${url}:`, error.message);
    return {
      url,
      status: 0,
      location: null,
      redirectsToCanonical: false,
      isPermanent: false,
      error: error.message
    };
  }
}

// Check all URLs and print a summary
async function checkAllRedirects() {
  console.log('Checking redirects...');
  console.log('=====================');
  console.log(`Canonical URL: ${canonicalUrl}`);
  console.log('');
  
  const results = await Promise.all(urlsToCheck.map(url => checkRedirect(url)));
  
  console.log('Summary:');
  console.log('========');
  
  const correctRedirects = results.filter(result => result.redirectsToCanonical && result.isPermanent);
  const incorrectRedirects = results.filter(result => !result.redirectsToCanonical || !result.isPermanent);
  
  console.log(`Correct redirects (${correctRedirects.length}/${results.length}):`);
  correctRedirects.forEach(result => {
    console.log(`- ${result.url} → ${result.location} (${result.status})`);
  });
  
  if (incorrectRedirects.length > 0) {
    console.log(`\nIncorrect redirects (${incorrectRedirects.length}/${results.length}):`);
    incorrectRedirects.forEach(result => {
      if (result.status === 0) {
        console.log(`- ${result.url}: Error - ${result.error}`);
      } else if (result.status >= 300 && result.status < 400) {
        if (!result.redirectsToCanonical) {
          console.log(`- ${result.url} → ${result.location} (${result.status}): Wrong destination`);
        } else if (!result.isPermanent) {
          console.log(`- ${result.url} → ${result.location} (${result.status}): Not a permanent redirect`);
        }
      } else {
        console.log(`- ${result.url}: No redirect (${result.status})`);
      }
    });
    
    console.log('\nRecommendations:');
    console.log('===============');
    console.log('1. Ensure all domain variations redirect to the canonical URL (https://alt.run/)');
    console.log('2. Use 301 (permanent) redirects for all redirects');
    console.log('3. Configure these redirects in your Netlify settings or netlify.toml file');
    console.log('\nExample netlify.toml configuration:');
    console.log('```');
    console.log('[[redirects]]');
    console.log('  from = "https://www.alt.run/*"');
    console.log('  to = "https://alt.run/:splat"');
    console.log('  status = 301');
    console.log('  force = true');
    console.log('');
    console.log('[[redirects]]');
    console.log('  from = "http://alt.run/*"');
    console.log('  to = "https://alt.run/:splat"');
    console.log('  status = 301');
    console.log('  force = true');
    console.log('');
    console.log('[[redirects]]');
    console.log('  from = "http://www.alt.run/*"');
    console.log('  to = "https://alt.run/:splat"');
    console.log('  status = 301');
    console.log('  force = true');
    console.log('```');
  } else {
    console.log('\n✅ All redirects are correctly configured!');
  }
}

// Execute the script
checkAllRedirects();
