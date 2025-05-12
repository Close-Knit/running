// src/App.jsx

// React and Router imports
// No 'import React from "react";' is typically needed with modern Vite setups for JSX
import { Routes, Route } from 'react-router-dom';

// Page component imports
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import ShoeReviewsPage from './pages/ShoeReviewsPage';
import BlogPage from './pages/BlogPage';

// Layout component imports
import Header from './components/Header';
import Footer from './components/Footer'; // Ensure this import is present
import BackgroundSelector from './components/BackgroundSelector';

// CSS imports for layout components
import './components/Header.css'; // Assuming you have Header.css
import './components/Footer.css'; // Assuming you have Footer.css
import './components/BackgroundSelector.css';

// Optional: A global stylesheet if you have one (e.g., src/index.css or src/App.css)
// import './index.css';

function App() {
  return (
    <> {/* React Fragment to group multiple top-level elements */}
      {/* Background image container */}
      <div
        className="page-background"
        style={{
          backgroundImage: 'url(/images/homepage.jpg)'
        }}
      ></div>

      <Header /> {/* Renders the Header component at the top */}

      {/* Navigation bar removed as requested */}

      {/* Main content area where routed pages will be displayed */}
      <main style={{
          padding: '0', /* Removed horizontal padding to avoid interference with container */
          marginTop: '0', /* Remove top margin */
          minHeight: 'calc(100vh - 120px)', /* Adjusted to account for header and footer */
          width: '100%', /* Ensure full width */
          boxSizing: 'border-box', /* Include padding in width calculation */
          position: 'relative', /* For proper stacking context */
          zIndex: '1' /* Ensure content is above background */
        }}>
        <Routes> {/* Defines the different routes for your application */}
          <Route path="/" element={<HomePage menuType="home" />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:slug" element={<EventDetailPage />} />
          <Route path="/charity-run" element={<EventsPage eventType="charity" />} />
          <Route path="/themed-run" element={<EventsPage eventType="themed" />} />
          <Route path="/obstacle-run" element={<EventsPage eventType="obstacle" />} />
          <Route path="/virtual-run" element={<EventsPage eventType="virtual" />} />
          <Route path="/barefoot-run" element={<EventsPage eventType="barefoot" />} />
          <Route path="/shoe-reviews" element={<ShoeReviewsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          {/* You can add a 404 Not Found Route here later:
              <Route path="*" element={<NotFoundPage />} />
          */}
        </Routes>
      </main>

      <Footer /> {/* Renders the Footer component at the bottom */}

      {/* Background selector component */}
      <BackgroundSelector />
    </>
  );
}

export default App;

