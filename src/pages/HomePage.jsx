// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import LocationSidebar from '../components/LocationSidebar'; // Import the sidebar
import './HomePage.css'; // Import CSS for this page's layout
import './EventsPage.css'; // Import EventsPage CSS for event card styling

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
          <ul className="events-list">
            {events.map((event) => (
              <li key={event.id} className="event-card">
                <div className="event-card-content">
                  <h3>{event.name}</h3>

                  <div className="event-card-details">
                    <div className="event-card-detail">
                      {/* Calendar icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                      </svg>
                      {event.dates_season || 'Dates TBA'}
                    </div>

                    <div className="event-card-detail">
                      {/* Location icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                      {event.locations || 'Location TBA'}
                    </div>

                    <div className="event-card-detail">
                      {/* Tag icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                        <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                      </svg>
                      {event.type || 'Event Type'}
                    </div>
                  </div>

                  {event.highlight && <p>{event.highlight}</p>}

                  {event.price && (
                    <div className="event-card-price">
                      ${event.price}
                      <span className="price-label">/ticket</span>
                    </div>
                  )}

                  <div className="event-card-action">
                    <Link to={`/events/${event.slug}`} className="learn-more-btn">
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HomePage;
