// src/App.jsx

// React and Router imports
// No 'import React from "react";' is typically needed with modern Vite setups for JSX
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Context imports
import { LocationProvider } from './contexts/LocationContext';

// Page component imports
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import ShoeReviewsPage from './pages/ShoeReviewsPage';
// import BlogPage from './pages/BlogPage'; // Commented out for future branch development
import NotFoundPage from './pages/NotFoundPage';
import BeginnerGuidePage from './pages/BeginnerGuidePage';
import IntermediateGuidePage from './pages/IntermediateGuidePage';
import AdvancedRunningGuidePage from './pages/AdvancedRunningGuidePage';
import RunningGearGuidePage from './pages/RunningGearGuidePage';
import RunningInjuriesGuidePage from './pages/RunningInjuriesGuidePage';
import WomensRunningHealthGuidePage from './pages/WomensRunningHealthGuidePage';
import OptimalFormGuidePage from './pages/OptimalFormGuidePage';
import MentalStrategiesGuidePage from './pages/MentalStrategiesGuidePage';
import RunnersNutritionGuidePage from './pages/RunnersNutritionGuidePage';
import CouchTo5KGuidePage from './pages/CouchTo5KGuidePage';
import RunningPlansPage from './pages/RunningPlansPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import JakobIngebrigtsenPage from './pages/JakobIngebrigtsenPage';
import EliudKipchogePage from './pages/EliudKipchogePage';
import KelvinKiptumPage from './pages/KelvinKiptumPage';

// Layout component imports
import Header from './components/Header';
import Footer from './components/Footer'; // Ensure this import is present

// CSS imports for layout components
import './components/Header.css'; // Assuming you have Header.css
import './components/Footer.css'; // Assuming you have Footer.css

// Optional: A global stylesheet if you have one (e.g., src/index.css or src/App.css)
// import './index.css';

// Helper function to optimize background images for mobile
const optimizeBackgroundForMobile = () => {
  const pageBackground = document.querySelector('.page-background');
  if (pageBackground) {
    if (window.innerWidth <= 768) {
      // Adjust background position for better mobile display
      pageBackground.style.backgroundPosition = 'center center';
    } else {
      // Reset to default for desktop
      pageBackground.style.backgroundPosition = 'center';
    }
  }
};

function App() {
  // Set up event listener for window resize to optimize background images
  useEffect(() => {
    // Initial optimization
    optimizeBackgroundForMobile();

    // Add event listener for window resize
    window.addEventListener('resize', optimizeBackgroundForMobile);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', optimizeBackgroundForMobile);
    };
  }, []);

  return (
    <LocationProvider>
      {/* React Fragment to group multiple top-level elements */}
      <>
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
            <Route path="/start-running-guide" element={<BeginnerGuidePage />} />
            <Route path="/intermediate-running-guide" element={<IntermediateGuidePage />} />
            <Route path="/advanced-running-guide" element={<AdvancedRunningGuidePage />} />
            <Route path="/running-gear-guide" element={<RunningGearGuidePage />} />
            <Route path="/common-running-injuries-guide" element={<RunningInjuriesGuidePage />} />
            <Route path="/womens-running-health-guide" element={<WomensRunningHealthGuidePage />} />
            <Route path="/optimal-running-form-guide" element={<OptimalFormGuidePage />} />
            <Route path="/mental-strategies-guide" element={<MentalStrategiesGuidePage />} />
            <Route path="/runners-nutrition-guide" element={<RunnersNutritionGuidePage />} />
            <Route path="/couch-to-5k-guide" element={<CouchTo5KGuidePage />} />
            <Route path="/running-plans/*" element={<RunningPlansPage />} />
            <Route path="/professional-runners/jakob-ingebrigtsen" element={<JakobIngebrigtsenPage />} />
            <Route path="/professional-runners/eliud-kipchoge" element={<EliudKipchogePage />} />
            <Route path="/professional-runners/kelvin-kiptum" element={<KelvinKiptumPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            {/* <Route path="/blog" element={<BlogPage />} /> */}
            {/* 404 Not Found Route - catches all unmatched routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer /> {/* Renders the Footer component at the bottom */}
      </>
    </LocationProvider>
  );
}

export default App;

