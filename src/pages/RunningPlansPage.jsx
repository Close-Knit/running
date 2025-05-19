// src/pages/RunningPlansPage.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SEO from '../components/SEO';
import PlanPage from './PlanPage';
import PlanGeneratorPage from './PlanGeneratorPage';
import './RunningPlansPage.css';

/**
 * Running Plans Page component
 * Serves as a container for the plan generator and plan display pages
 * with nested routing
 *
 * @returns {JSX.Element} The running plans page component
 */
function RunningPlansPage() {
  // Set the background image for the running plans page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/running-plan.jpg)';
    }

    // Cleanup function to reset background if needed
    return () => {
      // Optional: Reset background on unmount if needed
      // if (pageBackground) {
      //   pageBackground.style.backgroundImage = '';
      // }
    };
  }, []);

  // Define SEO data for the running plans page
  const seoData = {
    title: "Alt.Run: Custom Running Plan Generator",
    description: "Create a personalized running training plan tailored to your goals, experience level, and lifestyle with Alt.Run's free running plan generator.",
    canonicalUrl: "/running-plans",
    keywords: [
      "running plan generator", "custom training plan", "personalized running program",
      "marathon training", "5K training", "10K training", "trail running plan",
      "beginner running plan", "advanced running plan", "free running plan"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://alt.run/running-plans#webpage",
      "url": "https://alt.run/running-plans",
      "name": "Alt.Run: Custom Running Plan Generator",
      "description": "Create a personalized running training plan tailored to your goals, experience level, and lifestyle with Alt.Run's free running plan generator.",
      "isPartOf": { "@id": "https://alt.run/#website" }
    }
  };

  return (
    <div className="running-plans-container">
      <SEO {...seoData} />

      <Routes>
        {/* Default route - Plan Generator */}
        <Route path="/" element={<PlanGeneratorPage />} />

        {/* Plan display route */}
        <Route path="plan/:planId" element={<PlanPage />} />
      </Routes>
    </div>
  );
}

export default RunningPlansPage;
