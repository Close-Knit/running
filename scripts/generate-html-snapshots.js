// scripts/generate-html-snapshots.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the routes to generate HTML snapshots for
// These should match the routes defined in App.jsx
const routes = [
  '/',
  '/events',
  '/charity-run',
  '/themed-run',
  '/obstacle-run',
  '/virtual-run',
  '/barefoot-run',
  '/blog',
  '/shoe-reviews',
];

// Function to create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to copy index.html to each route directory
function generateHtmlSnapshots() {
  console.log('Generating HTML snapshots for routes...');
  
  // Get the path to the dist directory
  const distDir = path.resolve(__dirname, '../dist');
  
  // Check if the dist directory exists
  if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory does not exist. Run "npm run build" first.');
    process.exit(1);
  }
  
  // Get the content of the index.html file
  const indexHtmlPath = path.join(distDir, 'index.html');
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Process each route
  routes.forEach(route => {
    if (route === '/') {
      // Skip the root route as it already has index.html
      return;
    }
    
    // Create the directory for the route
    const routeDir = path.join(distDir, route.slice(1));
    ensureDirectoryExists(routeDir);
    
    // Create index.html in the route directory
    const routeHtmlPath = path.join(routeDir, 'index.html');
    fs.writeFileSync(routeHtmlPath, indexHtml);
    
    console.log(`Created HTML snapshot for ${route}`);
  });
  
  console.log('HTML snapshots generated successfully!');
}

// Execute the script
generateHtmlSnapshots();
