// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import LocationSidebar from '../components/LocationSidebar'; // Import the sidebar
import './HomePage.css'; // Import CSS for this page's layout

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeFilters, setActiveFilters] = useState({
    country: '',
    state: '',
    city: '',
  });

  const navigate = useNavigate(); // Hook for programmatic navigation

  // Fetch events for display
  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: supabaseError } = await supabase
          .from('events')
          .select('*')
          .limit(3);

        if (supabaseError) {
          throw supabaseError;
        }
        setEvents(data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message || "Failed to fetch events.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Handler for filter changes from LocationSidebar
  const handleLocationFilterChange = (newFilters) => {
    console.log("Filters received from sidebar on HomePage:", newFilters);
    setActiveFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  // Handler for the "Find Events" button
  const handleFindEvents = () => {
    const queryParams = new URLSearchParams();
    if (activeFilters.country) queryParams.set('country', activeFilters.country);
    if (activeFilters.state) queryParams.set('state', activeFilters.state);
    if (activeFilters.city) queryParams.set('city', activeFilters.city);

    // Navigate to EventsPage with filters as query parameters
    navigate(`/events?${queryParams.toString()}`);
  };

  return (
    // Removed container class to avoid centering issues
    <div className="homepage-layout">
      <LocationSidebar
        onFilterChange={handleLocationFilterChange}
        onFindEvents={handleFindEvents}
      />

      <div className="homepage-main-content">
        <h1>Alternative Running Events</h1>
        <p>Your curated guide to the most exciting themed, obstacle, and alternative running events.</p>

        {/* Display event cards without the "Featured Events" heading */}
        {loading && <p>Loading events...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && events.length === 0 && (
          <p>No events at the moment. Check back soon!</p>
        )}
        {!loading && !error && events.length > 0 && (
          <ul>
            {events.map((event) => (
              <li key={event.id} className="card">
                <Link to={`/events/${event.slug}`}>
                  <h3>{event.name}</h3>
                </Link>
                <p><em>{event.type}</em> - {event.locations}</p>
                <p>{event.highlight}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HomePage;
