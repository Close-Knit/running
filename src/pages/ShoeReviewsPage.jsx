// src/pages/ShoeReviewsPage.jsx
import { useState } from 'react';
import LocationSidebar from '../components/LocationSidebar';
import './EventsPage.css'; // Reuse the EventsPage styling

function ShoeReviewsPage() {
  const [activeFilters, setActiveFilters] = useState({
    country: '',
    state: '',
    city: '',
  });

  // Handler for filter changes from LocationSidebar
  const handleLocationFilterChange = (newFilters) => {
    console.log("Filters received from sidebar on ShoeReviewsPage:", newFilters);
    setActiveFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div className="homepage-layout">
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
