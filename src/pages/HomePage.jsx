// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import LocationSidebar from '../components/LocationSidebar'; // Import the sidebar
import { sortEventsByDate, filterEventsByDateRange } from '../utils/dateUtils';
import './HomePage.css'; // Import CSS for this page's layout
import './EventsPage.css'; // Import EventsPage CSS for event card styling

function HomePage({ menuType: propMenuType = 'home' }) {
  const location = useLocation();
  // Use menuType from location state if available, otherwise use the prop
  const menuType = location.state?.menuType || propMenuType;

  // Log the location state and menuType for debugging
  console.log('HomePage: location.state =', location.state);
  console.log('HomePage: menuType =', menuType);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // These were used for navigation to the events page, but we're not using that functionality anymore
  // const [activeFilters, setActiveFilters] = useState({
  //   country: '',
  //   state: '',
  //   city: '',
  // });

  // const navigate = useNavigate(); // Hook for programmatic navigation

  // Define a mapping of menu types to background images
  const menuBackgrounds = {
    home: 'homepage.jpg',
    all: 'ladyshoe.jpg',
    charity: 'fireman-walk.jpg',
    themed: 'minidress.jpg',
    obstacle: 'spartan.webp',
    virtual: 'virtual.jpg',
    barefoot: 'barefoot.jpg'
  };

  useEffect(() => {
    // Use a small timeout to ensure this runs after any other background changes
    const timeoutId = setTimeout(() => {
      const pageBackground = document.querySelector('.page-background');
      if (pageBackground) {
        // Get the appropriate background image based on menuType
        const backgroundImage = menuBackgrounds[menuType] || 'homepage.jpg';

        // Set the background image
        pageBackground.style.backgroundImage = `url(/images/${backgroundImage})`;
        console.log(`HomePage: Set background to ${backgroundImage} for menu type: ${menuType}`);
      }
    }, 50); // Small delay to win any race conditions

    // Cleanup function to clear the timeout if component unmounts before timeout completes
    return () => clearTimeout(timeoutId);
  }, [menuType]); // Re-run when menuType changes

  // Fetch events for display
  useEffect(() => {
    async function fetchEvents(filters = {}) {
      setLoading(true);
      setError(null);
      try {
        // Start with a base query
        let query = supabase
          .from('events')
          .select('*');

        // Apply filters if they exist
        if (filters.country) {
          query = query.eq('country', filters.country);
        }
        if (filters.state) {
          query = query.eq('state_province', filters.state);
        }
        if (filters.city) {
          query = query.eq('city', filters.city);
        }

        // Apply date filtering if month and day are provided
        // For the home page, we'll always show events for the next 30 days
        if (filters.month && filters.day) {
          // We'll fetch all events and filter them in JavaScript
          query = query.limit(20); // Fetch more events to ensure we have enough after filtering
        } else {
          query = query.limit(8);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) {
          throw supabaseError;
        }

        // Filter events to show only those in the next 30 days
        if (filters.month && filters.day && data && data.length > 0) {
          const currentYear = new Date().getFullYear();
          const filterMonth = parseInt(filters.month, 10);
          const filterDay = parseInt(filters.day, 10);

          // Calculate date for filtering
          const filterDate = new Date(currentYear, filterMonth - 1, filterDay);

          console.log('Filtering events from', filterDate, 'for next 30 days');

          // Use our utility function to filter events for the next 30 days
          let filteredEvents = filterEventsByDateRange(data, filterDate, 30);

          console.log('Events in next 30 days:', filteredEvents);

          // If no events found in the next 30 days, just show all events
          if (filteredEvents.length === 0) {
            console.log('No events found in next 30 days, showing all events');
            filteredEvents = data;
          }

          // Use our utility function to sort events by date in ascending order
          filteredEvents = sortEventsByDate(filteredEvents);

          console.log('Events sorted by date (ascending):', filteredEvents);
          setEvents(filteredEvents);
        } else if (data && data.length > 0) {
          // Even if we don't have month and day filters, still sort by date
          const sortedEvents = sortEventsByDate(data);

          console.log('Events sorted by date (ascending) without filters:', sortedEvents);
          setEvents(sortedEvents);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message || "Failed to fetch events.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    // Get current date for default filters
    const today = new Date();
    const currentMonth = String(today.getMonth() + 1);
    const currentDay = String(today.getDate());

    // Fetch with default filters
    fetchEvents({
      country: 'USA',
      month: currentMonth,
      day: currentDay
    });

    // Store the fetchEvents function for later use
    window.fetchHomePageEvents = fetchEvents;
  }, []);

  // Handler for filter changes from LocationSidebar
  const handleLocationFilterChange = (newFilters) => {
    console.log("Filters received from sidebar on HomePage:", newFilters);
    // We're not using activeFilters anymore
    // setActiveFilters(prevFilters => ({ ...prevFilters, ...newFilters }));

    // Automatically fetch events when filters change
    if (window.fetchHomePageEvents) {
      window.fetchHomePageEvents(newFilters);
    }
  };

  // Handler for the "Find Events" button - not used anymore but kept for reference
  // const handleFindEvents = () => {
  //   const queryParams = new URLSearchParams();
  //   if (activeFilters.country) queryParams.set('country', activeFilters.country);
  //   if (activeFilters.state) queryParams.set('state', activeFilters.state);
  //   if (activeFilters.city) queryParams.set('city', activeFilters.city);

  //   // Navigate to EventsPage with filters as query parameters
  //   navigate(`/events?${queryParams.toString()}`);
  // };

  return (
    // Removed container class to avoid centering issues
    <div className="homepage-layout">
      <LocationSidebar
        onFilterChange={handleLocationFilterChange}
      />

      <div className="homepage-main-content">
        <div className="text-overlay-container">
          <h1>Alternative Running Events</h1>
          <p>Your curated guide to the most exciting themed, obstacle, and alternative running events.</p>
        </div>

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

                  {/* New layout with main content and sidebar */}
                  <div className="event-card-layout">
                    {/* Main content area */}
                    <div className="event-card-main">
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

                      {event.highlight && <p className="event-highlight">{event.highlight}</p>}
                    </div>

                    {/* Sidebar with stacked sections */}
                    <div className="event-card-sidebar">
                      {/* Event Details Section */}
                      <div className="event-card-section">
                        <h4>Event Details</h4>

                        {event.terrain && event.terrain !== '0' && (
                          <div className="event-card-section-item">
                            <span className="event-card-section-label">Terrain:</span>
                            <span className="event-card-section-value">{event.terrain}</span>
                          </div>
                        )}

                        {event.elevation_gain && event.elevation_gain !== '0' && event.elevation_gain !== 0 && (
                          <div className="event-card-section-item">
                            <span className="event-card-section-label">Elevation Gain:</span>
                            <span className="event-card-section-value">{event.elevation_gain}</span>
                          </div>
                        )}

                        {event.charity_affiliation && (
                          <div className="event-card-section-item">
                            <span className="event-card-section-label">Charity:</span>
                            <span className="event-card-section-value">{event.charity_affiliation}</span>
                          </div>
                        )}
                      </div>

                      {/* Requirements Section */}
                      <div className="event-card-section">
                        <h4>Requirements</h4>

                        {event.age_restrictions && (
                          <div className="event-card-section-item">
                            <span className="event-card-section-label">Age:</span>
                            <span className="event-card-section-value">{event.age_restrictions}</span>
                          </div>
                        )}

                        {event.qualification_standard && (
                          <div className="event-card-section-item">
                            <span className="event-card-section-label">Qualification:</span>
                            <span className="event-card-section-value">{event.qualification_standard}</span>
                          </div>
                        )}

                        {event.registration_fee && (
                          <div className="event-card-section-item">
                            <span className="event-card-section-label">Registration Fee:</span>
                            <span className="event-card-section-value">${event.registration_fee}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

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
