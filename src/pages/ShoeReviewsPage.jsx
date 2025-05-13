// src/pages/ShoeReviewsPage.jsx
import { useState, useEffect } from 'react';
import LocationSidebar from '../components/LocationSidebar';
import SEO from '../components/SEO'; // Import SEO component
import './EventsPage.css'; // Reuse the EventsPage styling
import './ShoeReviewsPage.css'; // Add this import for custom styling

function ShoeReviewsPage() {
  const [activeFilters, setActiveFilters] = useState({
    country: '',
    state: '',
    city: '',
  });

  // Set background image for the shoe reviews page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/newshoes.jpg)';
      console.log('ShoeReviewsPage: Set background to newshoes.jpg');

      // Optimize background position for mobile if needed
      const optimizeForMobile = () => {
        if (window.innerWidth <= 768) {
          // Adjust background position for better mobile display
          // This helps prevent zooming and pixelation issues
          pageBackground.style.backgroundPosition = 'center center';
        } else {
          // Reset to default for desktop
          pageBackground.style.backgroundPosition = 'center';
        }
      };

      // Run optimization immediately and on resize
      optimizeForMobile();
      window.addEventListener('resize', optimizeForMobile);

      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('resize', optimizeForMobile);
      };
    }
  }, []);

  // Handler for filter changes from LocationSidebar
  const handleLocationFilterChange = (newFilters) => {
    console.log("Filters received from sidebar on ShoeReviewsPage:", newFilters);
    setActiveFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  // Define SEO data for the shoe reviews page
  const seoData = {
    title: "Running Shoe Reviews for Alternative Runs | Alt.Run",
    description: "Find the perfect running shoes for your next alternative run. Expert reviews on shoes for obstacle courses, trail runs, themed events, and more.",
    canonicalUrl: "/shoe-reviews",
    ogType: "website",
    keywords: [
      "running shoe reviews", "best shoes for obstacle races", "trail running shoes",
      "shoes for mud runs", "barefoot running shoes", "beginner running shoes",
      "themed run footwear", "OCR shoes", "alternative running footwear"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://alt.run/shoe-reviews#webpage",
      "url": "https://alt.run/shoe-reviews",
      "name": "Running Shoe Reviews for Alternative Runs | Alt.Run",
      "description": "Find the perfect running shoes for your next alternative run.",
      "isPartOf": { "@id": "https://alt.run/#website" },
      "about": {
        "@type": "Thing",
        "name": "Running Shoes for Alternative Runs"
      }
    },
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Shoe Reviews", path: "/shoe-reviews" }
    ]
  };

  return (
    <div className="homepage-layout shoe-reviews-page">
      {/* SEO Component */}
      <SEO {...seoData} />

      <LocationSidebar
        onFilterChange={handleLocationFilterChange}
      />
      <div className="homepage-main-content">
        <h1>Shoe Reviews</h1>
        <p>Find the perfect running shoes for your next alternative run.</p>

        {/* Placeholder content for shoe reviews */}
        <div className="shoe-reviews-content">
          <p>Coming soon! Our expert reviews of the best shoes for different types of alternative runs.</p>
          <p>Filter by location to find reviews from runners in your area.</p>
        </div>
      </div>
    </div>
  );
}

export default ShoeReviewsPage;

