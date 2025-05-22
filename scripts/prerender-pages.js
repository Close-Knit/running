// scripts/prerender-pages.js
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the routes to pre-render
// These should match the routes defined in App.jsx for unique content pages
const staticRoutes = [
  '/',
  // '/events' - Removed as it's now a 301 redirect to homepage
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

// Function to start a development server for pre-rendering
async function startDevServer() {
  console.log('Starting development server for pre-rendering...');

  // Start the development server in the background
  const serverProcess = execSync('npm run dev -- --port 5173', {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true
  });

  // Give the server some time to start up
  await new Promise(resolve => setTimeout(resolve, 5000));

  return serverProcess;
}

// Function to pre-render pages
async function prerenderPages() {
  console.log('Starting pre-rendering process...');

  // Get the path to the dist directory
  const distDir = path.resolve(__dirname, '../dist');

  // Check if the dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory does not exist. Run "npm run build:vite" first.');
    process.exit(1);
  }

  // Start a development server for pre-rendering
  const serverProcess = await startDevServer();

  try {
    // Launch a headless browser
    const browser = await puppeteer.launch({
      headless: 'new', // Use the new headless mode
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // Create a new page
    const page = await browser.newPage();

    // Set viewport size to ensure consistent rendering
    await page.setViewport({ width: 1280, height: 800 });

    // Process each static route
    for (const route of staticRoutes) {
      console.log(`Pre-rendering ${route}...`);

      try {
        // Navigate to the page
        await page.goto(`http://localhost:5173${route}`, {
          waitUntil: 'networkidle0', // Wait until network is idle (no more than 2 connections for at least 500ms)
          timeout: 30000 // 30 second timeout
        });

        // Wait an additional second for any final JavaScript execution
        await page.waitForTimeout(1000);

        // Get the fully rendered HTML
        const html = await page.content();

        // Determine the output path
        let outputPath;
        if (route === '/') {
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

    // Handle dynamic routes for running plans
    console.log('Pre-rendering dynamic running plan routes...');

    try {
      // Navigate to the running plans page first
      await page.goto('http://localhost:5173/running-plans', {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait for the page to fully load
      await page.waitForTimeout(1000);

      // Extract plan IDs from the page
      // This assumes there are links to individual plans on the running plans page
      // Adjust the selector based on your actual HTML structure
      const planLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href^="/running-plans/plan/"]'));
        return links.map(link => link.getAttribute('href'));
      });

      // If no plan links found, create a placeholder
      if (planLinks.length === 0) {
        console.log('No plan links found. Creating a placeholder for /running-plans/plan/');
        const placeholderDir = path.join(distDir, 'running-plans/plan');
        ensureDirectoryExists(placeholderDir);

        // Navigate to a placeholder plan page
        await page.goto('http://localhost:5173/running-plans/plan/placeholder', {
          waitUntil: 'networkidle0',
          timeout: 30000
        });

        // Get the rendered HTML
        const html = await page.content();

        // Write the pre-rendered HTML to the file
        fs.writeFileSync(path.join(placeholderDir, 'index.html'), html);

        console.log('Created placeholder for /running-plans/plan/');
      } else {
        // Pre-render each plan page
        for (const planLink of planLinks) {
          console.log(`Pre-rendering ${planLink}...`);

          try {
            // Navigate to the plan page
            await page.goto(`http://localhost:5173${planLink}`, {
              waitUntil: 'networkidle0',
              timeout: 30000
            });

            // Wait for the page to fully load
            await page.waitForTimeout(1000);

            // Get the fully rendered HTML
            const html = await page.content();

            // Create the directory structure for the route
            const routeDir = path.join(distDir, planLink.slice(1));
            ensureDirectoryExists(routeDir);

            // Write the pre-rendered HTML to the file
            fs.writeFileSync(path.join(routeDir, 'index.html'), html);

            console.log(`Successfully pre-rendered ${planLink}`);
          } catch (error) {
            console.error(`Error pre-rendering ${planLink}:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Error handling dynamic routes:', error);
    }

    // Close the browser
    await browser.close();

    console.log('Pre-rendering completed successfully!');
  } catch (error) {
    console.error('Error during pre-rendering:', error);
    process.exit(1);
  } finally {
    // Kill the development server
    process.kill(-serverProcess.pid);
    console.log('Development server stopped.');
  }
}

// Execute the script
prerenderPages();
