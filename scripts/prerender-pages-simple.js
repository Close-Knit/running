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
  const pageData = getPageData(route);
  const canonicalUrl = normalizeCanonicalUrl(route);

  // Replace the title, description, and canonical URL in the Vite-generated HTML
  let html = viteGeneratedHTML;

  // Replace title (look for existing title tag)
  html = html.replace(/<title>.*?<\/title>/i, `<title>${pageData.title}</title>`);

  // Add or replace meta description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${pageData.metaDescription}">`);
  } else {
    // Insert meta description after viewport meta tag
    html = html.replace(
      /(<meta name="viewport"[^>]*>)/i,
      `$1\n  <meta name="description" content="${pageData.metaDescription}">`
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

  // Add Open Graph tags
  const ogTags = `
  <!-- Open Graph tags -->
  <meta property="og:title" content="${pageData.title}">
  <meta property="og:description" content="${pageData.metaDescription}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${pageData.ogImage}">
  <meta property="og:site_name" content="Alt.Run">

  <!-- Twitter Card tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${pageData.title}">
  <meta name="twitter:description" content="${pageData.metaDescription}">
  <meta name="twitter:image" content="${pageData.ogImage}">`;

  // Insert Open Graph tags after canonical link
  html = html.replace(
    /(<link rel="canonical"[^>]*>)/i,
    `$1${ogTags}`
  );

  // Add H1 and intro content to the root div
  const contentShell = `
    <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
      <h1 style="color: #333; font-size: 2.5rem; margin-bottom: 1rem; font-weight: bold;">${pageData.h1Content}</h1>
      <p style="color: #666; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">${pageData.introSnippet}</p>
      <div style="color: #888; font-style: italic;">Loading content...</div>
    </div>`;

  // Insert content shell into the root div
  html = html.replace(
    /(<div id="root">)([^<]*)/i,
    `$1${contentShell}`
  );

  return html;
}

// Comprehensive page data structure with all SEO elements
function getPageData(route) {
  const pageData = {
    '/': {
      title: 'Alt.Run: Discover Fun & Unique Running Adventures Worldwide',
      metaDescription: 'Discover unique running adventures worldwide with Alt.Run! Explore themed runs, obstacle courses, virtual races, charity events, and barefoot running experiences. Find your next adventure today.',
      h1Content: 'Alternative Running Events',
      introSnippet: 'Welcome to Alt.Run, your premier destination for discovering unique and exciting running events around the world. From themed costume runs to challenging obstacle courses, virtual races to barefoot adventures, we connect runners with extraordinary experiences that go beyond traditional road races.',
      ogImage: 'https://alt.run/images/alt-run-og.jpg'
    },
    '/shoe-reviews': {
      title: 'Running Shoe Reviews - Alt.Run',
      metaDescription: 'Comprehensive reviews of the latest running shoes to help you find the perfect pair for your running style, terrain, and budget. Expert analysis and recommendations.',
      h1Content: 'Running Shoe Reviews',
      introSnippet: 'Find the perfect running shoes with our comprehensive reviews and expert analysis. We test and evaluate the latest models from top brands to help you make informed decisions based on your running style, preferred terrain, and budget.',
      ogImage: 'https://alt.run/images/shoe-reviews-og.jpg'
    },
    '/start-running-guide': {
      title: 'Start Running: Beginner Guide - Alt.Run',
      metaDescription: 'Complete beginner\'s guide to start running safely and effectively. Learn proper form, training schedules, gear recommendations, and motivation tips for new runners.',
      h1Content: 'Start Running: Complete Beginner\'s Guide',
      introSnippet: 'Ready to start your running journey? This comprehensive guide provides everything beginners need to know about starting a running routine safely and effectively. Learn about proper form, training schedules, essential gear, and proven strategies to build lasting motivation.',
      ogImage: 'https://alt.run/images/start-running-og.jpg'
    },
    '/couch-to-5k-guide': {
      title: 'Couch to 5K Guide - Alt.Run',
      metaDescription: 'Transform from couch potato to 5K runner with our proven 8-week training plan. Step-by-step progression, tips, and motivation for complete beginners.',
      h1Content: 'Couch to 5K Training Guide',
      introSnippet: 'Transform your fitness with our proven Couch to 5K program designed to take complete beginners from the couch to running a full 5K in just 8 weeks. This structured plan includes gradual progression, expert tips, and motivational strategies.',
      ogImage: 'https://alt.run/images/couch-to-5k-og.jpg'
    },
    '/intermediate-running-guide': {
      title: 'Intermediate Running Guide - Alt.Run',
      metaDescription: 'Take your running to the next level with intermediate training strategies, speed work, hill training, and race preparation techniques for experienced runners.',
      h1Content: 'Intermediate Running Training Guide',
      introSnippet: 'Ready to elevate your running performance? This intermediate guide provides advanced training strategies, speed work techniques, hill training methods, and race preparation tips for runners looking to break through plateaus and achieve new personal bests.',
      ogImage: 'https://alt.run/images/intermediate-running-og.jpg'
    },
    '/advanced-running-guide': {
      title: 'Advanced Running Guide - Alt.Run',
      metaDescription: 'Advanced running techniques and training for experienced runners. Master periodization, lactate threshold training, and elite performance strategies.',
      h1Content: 'Advanced Running Techniques',
      introSnippet: 'Master elite-level running with our advanced training guide covering periodization, lactate threshold training, VO2 max development, and sophisticated performance strategies used by competitive and elite runners.',
      ogImage: 'https://alt.run/images/advanced-running-og.jpg'
    },
    '/running-gear-guide': {
      title: 'Running Gear Guide - Alt.Run',
      metaDescription: 'Essential running gear recommendations for all types of runners. From shoes and clothing to GPS watches and safety equipment - complete gear guide.',
      h1Content: 'Essential Running Gear Guide',
      introSnippet: 'Discover the essential running gear that will enhance your performance and comfort. Our comprehensive guide covers everything from shoes and clothing to GPS watches, hydration systems, and safety equipment for runners of all levels.',
      ogImage: 'https://alt.run/images/running-gear-og.jpg'
    },
    '/common-running-injuries-guide': {
      title: 'Common Running Injuries Guide - Alt.Run',
      metaDescription: 'Prevention and treatment guide for common running injuries including runner\'s knee, shin splints, plantar fasciitis, and IT band syndrome. Expert advice.',
      h1Content: 'Common Running Injuries: Prevention & Treatment',
      introSnippet: 'Stay injury-free with our comprehensive guide to common running injuries. Learn about prevention strategies, early warning signs, treatment options, and recovery protocols for runner\'s knee, shin splints, plantar fasciitis, and more.',
      ogImage: 'https://alt.run/images/running-injuries-og.jpg'
    },
    '/womens-running-health-guide': {
      title: 'Women\'s Running Health Guide - Alt.Run',
      metaDescription: 'Specialized running health guide for women covering hormonal considerations, pregnancy, menstrual cycle impacts, nutrition, and female-specific training advice.',
      h1Content: 'Women\'s Running Health Guide',
      introSnippet: 'Optimize your running performance with our specialized guide for women runners. Covering hormonal considerations, training during pregnancy, menstrual cycle impacts, nutrition needs, and female-specific training strategies.',
      ogImage: 'https://alt.run/images/womens-running-og.jpg'
    },
    '/optimal-running-form-guide': {
      title: 'Optimal Running Form Guide - Alt.Run',
      metaDescription: 'Master proper running form to improve efficiency and prevent injuries. Learn about cadence, foot strike, posture, and breathing techniques for better performance.',
      h1Content: 'Master Optimal Running Form',
      introSnippet: 'Improve your running efficiency and reduce injury risk by mastering proper running form. This guide covers cadence optimization, foot strike patterns, posture alignment, breathing techniques, and drills to perfect your technique.',
      ogImage: 'https://alt.run/images/running-form-og.jpg'
    },
    '/mental-strategies-guide': {
      title: 'Mental Strategies Guide - Alt.Run',
      metaDescription: 'Mental strategies and techniques to improve your running performance. Learn visualization, goal setting, motivation techniques, and mental toughness training.',
      h1Content: 'Developing Mental Strategies for Running',
      introSnippet: 'Unlock your mental potential with proven psychological strategies for runners. Learn visualization techniques, goal setting frameworks, motivation strategies, and mental toughness training to overcome barriers and achieve peak performance.',
      ogImage: 'https://alt.run/images/mental-strategies-og.jpg'
    },
    '/running-plans': {
      title: 'Free Running Plans - Alt.Run',
      metaDescription: 'Free personalized running plans for all fitness levels and goals. Generate custom training schedules for 5K, 10K, half marathon, and marathon distances.',
      h1Content: 'Free Personalized Running Plans',
      introSnippet: 'Create your perfect training plan with our free running plan generator. Whether you\'re training for a 5K, 10K, half marathon, or marathon, our personalized plans adapt to your fitness level, schedule, and goals.',
      ogImage: 'https://alt.run/images/running-plans-og.jpg'
    },
    '/terms-and-conditions': {
      title: 'Terms and Conditions - Alt.Run',
      metaDescription: 'Terms and conditions for using Alt.Run services including website usage, event listings, user-generated content, and liability limitations.',
      h1Content: 'Terms and Conditions',
      introSnippet: 'Please read these terms and conditions carefully before using Alt.Run services. These terms govern your use of our website, event listings, and all related services.',
      ogImage: 'https://alt.run/images/alt-run-og.jpg'
    },
    '/privacy-policy': {
      title: 'Privacy Policy - Alt.Run',
      metaDescription: 'Privacy policy explaining how Alt.Run handles your personal data, cookies, analytics, and user information. Learn about our data protection practices.',
      h1Content: 'Privacy Policy',
      introSnippet: 'Your privacy is important to us. This privacy policy explains how Alt.Run collects, uses, and protects your personal information when you use our website and services.',
      ogImage: 'https://alt.run/images/alt-run-og.jpg'
    },
    '/professional-runners/jakob-ingebrigtsen': {
      title: 'Jakob Ingebrigtsen Profile - Alt.Run',
      metaDescription: 'Profile and achievements of Norwegian middle-distance runner Jakob Ingebrigtsen. Olympic champion, world record holder, and rising star of distance running.',
      h1Content: 'Jakob Ingebrigtsen: Norwegian Distance Running Phenomenon',
      introSnippet: 'Discover the remarkable journey of Jakob Ingebrigtsen, Norway\'s middle-distance running sensation. From teenage prodigy to Olympic champion and world record holder, explore his training methods, achievements, and impact on modern distance running.',
      ogImage: 'https://alt.run/images/jakob-ingebrigtsen-og.jpg'
    },
    '/professional-runners/eliud-kipchoge': {
      title: 'Eliud Kipchoge Profile - Alt.Run',
      metaDescription: 'Profile and achievements of Kenyan marathon legend Eliud Kipchoge. Two-time Olympic champion, world record holder, and the greatest marathoner of all time.',
      h1Content: 'Eliud Kipchoge: The Greatest Marathoner of All Time',
      introSnippet: 'Explore the legendary career of Eliud Kipchoge, widely regarded as the greatest marathoner in history. Learn about his training philosophy, record-breaking performances, and the mindset that made him a two-time Olympic champion.',
      ogImage: 'https://alt.run/images/eliud-kipchoge-og.jpg'
    },
    '/professional-runners/kelvin-kiptum': {
      title: 'Kelvin Kiptum Profile - Alt.Run',
      metaDescription: 'Profile and achievements of Kenyan marathon runner Kelvin Kiptum. World record holder whose meteoric rise and tragic passing shocked the running world.',
      h1Content: 'Kelvin Kiptum: The Meteoric Rise and Tragic Fall of Marathon\'s Brightest Star',
      introSnippet: 'Remember the incredible but brief career of Kelvin Kiptum, the Kenyan marathon sensation who broke the world record and captured hearts worldwide before his tragic passing. His legacy continues to inspire runners everywhere.',
      ogImage: 'https://alt.run/images/kelvin-kiptum-og.jpg'
    },
    '/running-plans/plan/placeholder': {
      title: 'Running Plan - Alt.Run',
      metaDescription: 'Personalized running plan generated by Alt.Run. Custom training schedule designed for your fitness level, goals, and available time commitment.',
      h1Content: 'Your Personalized Running Plan',
      introSnippet: 'Your custom running plan has been generated based on your fitness level, goals, and schedule. Follow this structured training program to achieve your running objectives safely and effectively.',
      ogImage: 'https://alt.run/images/running-plans-og.jpg'
    }
  };

  return pageData[route] || {
    title: 'Alt.Run',
    metaDescription: 'Alt.Run - Discover unique alternative running events and adventures worldwide. Find themed runs, obstacle courses, virtual races, and more.',
    h1Content: 'Alternative Running Events',
    introSnippet: 'Discover unique running events and adventures with Alt.Run.',
    ogImage: 'https://alt.run/images/alt-run-og.jpg'
  };
}

function getPageTitle(route) {
  return getPageData(route).title;
}

function getPageDescription(route) {
  return getPageData(route).metaDescription;
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
