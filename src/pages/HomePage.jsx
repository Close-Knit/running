// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import LocationSidebar from '../components/LocationSidebar'; // Import the sidebar
import SEO from '../components/SEO'; // Import SEO component
import { sortEventsByDate, filterEventsByDateRange } from '../utils/dateUtils';
import './HomePage.css'; // Import CSS for this page's layout
import './EventsPage.css'; // Import EventsPage CSS for event card styling
// No need for test functions anymore

function HomePage({ menuType: propMenuType = 'home' }) {
  const location = useLocation();
  // Use menuType from location state if available, otherwise use the prop
  const menuType = location.state?.menuType || propMenuType;

  // Log the location state and menuType for debugging
  console.log('HomePage: location.state =', location.state);
  console.log('HomePage: menuType =', menuType);

  // No need for test functions anymore
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastQueryParams, setLastQueryParams] = useState(null);
  const [timeWindow, setTimeWindow] = useState(30); // Default time window in days

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

        console.log(`HomePage: Set background to ${backgroundImage} for menu type: ${menuType}`);

        // Clean up event listener on component unmount
        return () => {
          window.removeEventListener('resize', optimizeForMobile);
        };
      }
    }, 50); // Small delay to win any race conditions

    // Cleanup function to clear the timeout if component unmounts before timeout completes
    return () => clearTimeout(timeoutId);
  }, [menuType]); // Re-run when menuType changes

  // Fetch events for display
  useEffect(() => {
    async function fetchEvents(filters = {}, isLoadMore = false, page = 0, customTimeWindow = null) {
      if (!isLoadMore) {
        setLoading(true);
      }
      setError(null);

      try {
        // Save the query parameters for "Load More" functionality
        setLastQueryParams({ ...filters, page: page + 1 });

        // Determine which table to query based on country
        console.log('HomePage: Country filter value:', filters.country);
        console.log('HomePage: Country filter type:', typeof filters.country);
        console.log('HomePage: Is country === "CAN"?', filters.country === 'CAN');

        // Use events_canada table for Canada
        const tableName = filters.country === 'CAN' ? 'events_canada' : 'events';
        console.log(`HomePage: Using table: ${tableName} for country: ${filters.country}`);
        console.log('HomePage: Full filters object:', filters);

        // Calculate pagination
        const pageSize = 10;
        const from = page * pageSize;
        const to = from + pageSize - 1;

        // Start with a base query
        let query = supabase
          .from(tableName)
          .select('*')
          .range(from, to);

        // Apply filters if they exist
        if (filters.country) {
          // For Canada events, we need to use 'CAN' as the country code in the database
          // For events_canada table, we don't need to filter by country since all events are Canadian
          if (tableName === 'events_canada') {
            // For events_canada table, don't filter by country
            console.log(`HomePage: Not applying country filter to events_canada table`);
          } else {
            // For events table, apply the country filter
            query = query.eq('country', filters.country);
            console.log(`HomePage: Applied country filter: ${filters.country} to table: ${tableName}`);
          }
        }
        if (filters.state) {
          query = query.eq('state_province', filters.state);
          console.log(`HomePage: Applied state/province filter: ${filters.state}`);
        }
        if (filters.city) {
          query = query.eq('city', filters.city);
          console.log(`HomePage: Applied city filter: ${filters.city}`);
        }

        // Log the full query for debugging
        console.log(`HomePage: Executing query on table: ${tableName}`);
        console.log('HomePage: Query details:', query);

        const { data, error: supabaseError } = await query;

        if (supabaseError) {
          console.error(`HomePage: Error querying table ${tableName}:`, supabaseError);
          throw supabaseError;
        }

        console.log(`HomePage: Query results from ${tableName}:`, data);
        console.log(`HomePage: Number of results: ${data ? data.length : 0}`);

        // If we got fewer than pageSize results, there are probably no more to load
        setHasMore(data && data.length === pageSize);

        // If we're querying the events_canada table and got no results, let's try a simpler query
        if (tableName === 'events_canada' && (!data || data.length === 0)) {
          console.log('HomePage: No results from events_canada table, trying a simpler query');

          // Try a simple query without filters to see if the table has any data
          const { data: allCanadaData, error: allCanadaError } = await supabase
            .from('events_canada')
            .select('*')
            .limit(10);

          if (allCanadaError) {
            console.error('HomePage: Error with simple query to events_canada:', allCanadaError);
          } else {
            console.log('HomePage: Simple query results from events_canada:', allCanadaData);
            console.log(`HomePage: Number of results from simple query: ${allCanadaData ? allCanadaData.length : 0}`);
          }
        }

        // Use the provided time window or the current state
        const currentTimeWindow = customTimeWindow !== null ? customTimeWindow : timeWindow;

        // Filter events to show only those in the specified time window
        if (filters.month && filters.day && data && data.length > 0) {
          const currentYear = new Date().getFullYear();
          const filterMonth = parseInt(filters.month, 10);
          const filterDay = parseInt(filters.day, 10);

          // Calculate date for filtering
          const filterDate = new Date(currentYear, filterMonth - 1, filterDay);

          console.log(`Filtering events from ${filterDate} for next ${currentTimeWindow} days`);

          // Use our utility function to filter events for the specified time window
          let filteredEvents = filterEventsByDateRange(data, filterDate, currentTimeWindow);

          console.log(`Events in next ${currentTimeWindow} days:`, filteredEvents);

          // If we have fewer than 10 events and this is the first page, try increasing the time window
          if (filteredEvents.length < 10 && page === 0 && currentTimeWindow < 365) {
            const newTimeWindow = Math.min(currentTimeWindow * 2, 365); // Double the time window, max 1 year
            console.log(`Found only ${filteredEvents.length} events. Increasing time window to ${newTimeWindow} days`);

            // Update the time window state
            setTimeWindow(newTimeWindow);

            // Try again with the larger time window
            if (newTimeWindow > currentTimeWindow) {
              return fetchEvents(filters, isLoadMore, page, newTimeWindow);
            }
          }

          // If no events found in the specified time window, just show all events
          if (filteredEvents.length === 0) {
            console.log(`No events found in next ${currentTimeWindow} days, showing all events`);
            filteredEvents = data;
          }

          // Use our utility function to sort events by date in ascending order
          filteredEvents = sortEventsByDate(filteredEvents);

          console.log('Events sorted by date (ascending):', filteredEvents);

          // If loading more, append to existing events, otherwise replace
          if (isLoadMore) {
            setEvents(prevEvents => [...prevEvents, ...filteredEvents]);
          } else {
            setEvents(filteredEvents);
          }

          // Update the current page
          setCurrentPage(page);

          // Use a small delay before setting loading to false to ensure DOM has time to update
          setTimeout(() => {
            setLoading(false);
          }, 300);
          return; // Exit early to prevent the finally block from executing
        } else if (data && data.length > 0) {
          // Even if we don't have month and day filters, still sort by date
          const sortedEvents = sortEventsByDate(data);

          console.log('Events sorted by date (ascending) without filters:', sortedEvents);

          // If loading more, append to existing events, otherwise replace
          if (isLoadMore) {
            setEvents(prevEvents => [...prevEvents, ...sortedEvents]);
          } else {
            setEvents(sortedEvents);
          }

          // Update the current page
          setCurrentPage(page);

          // Use a small delay before setting loading to false to ensure DOM has time to update
          setTimeout(() => {
            setLoading(false);
          }, 300);
          return; // Exit early to prevent the finally block from executing
        } else {
          if (!isLoadMore) {
            setEvents([]);
          }
          // If we got no results, there are no more to load
          setHasMore(false);

          // Use a small delay before setting loading to false to ensure DOM has time to update
          setTimeout(() => {
            setLoading(false);
          }, 300);
          return; // Exit early to prevent the finally block from executing
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message || "Failed to fetch events.");
        if (!isLoadMore) {
          setEvents([]);
        }

        // Set loading to false immediately in case of error
        setLoading(false);
      }
    }

    // Get current date for default filters
    const today = new Date();
    const currentMonth = String(today.getMonth() + 1);
    const currentDay = String(today.getDate());

    // Fetch with default filters - using USA as default
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

    // Log specific details about the country filter
    if (newFilters.country) {
      console.log(`HomePage: Country filter received: "${newFilters.country}"`);
      console.log(`HomePage: Will use table: ${newFilters.country === 'CAN' ? 'events_canada' : 'events'}`);
    }

    // Reset pagination when filters change
    setCurrentPage(0);

    // Reset time window to default when filters change
    setTimeWindow(30);

    // We're not using activeFilters anymore
    // setActiveFilters(prevFilters => ({ ...prevFilters, ...newFilters }));

    // Automatically fetch events when filters change
    if (window.fetchHomePageEvents) {
      console.log("HomePage: Calling fetchHomePageEvents with filters:", newFilters);
      window.fetchHomePageEvents(newFilters, false, 0); // Reset to first page
    } else {
      console.error("HomePage: fetchHomePageEvents function not available");
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

  // Define SEO data for the homepage
  const seoData = {
    title: "Alt.Run: Discover Fun & Unique Running Adventures Worldwide",
    description: "Discover unique running adventures worldwide with Alt.Run! Explore themed runs, obstacle courses, virtual races & more. Filter by location & date to find your next unforgettable event.",
    canonicalUrl: "/",
    keywords: [
      "alternative runs", "fun runs", "themed runs", "charity runs", "obstacle course races",
      "virtual runs", "barefoot runs", "running events", "fun running adventures",
      "beginner friendly runs", "social running events"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://alt.run/#webpage",
      "url": "https://alt.run/",
      "name": "Alt.Run: Discover Fun & Unique Running Adventures Worldwide",
      "description": "Discover unique running adventures worldwide with Alt.Run! Explore themed runs, obstacle courses, virtual races & more. Filter by location & date to find your next unforgettable event.",
      "isPartOf": { "@id": "https://alt.run/#website" }
    }
  };

  return (
    // Removed container class to avoid centering issues
    <div className="homepage-layout">
      {/* SEO Component */}
      <SEO {...seoData} />

      <LocationSidebar
        onFilterChange={handleLocationFilterChange}
        isLoading={loading}
      />

      <div className="homepage-main-content">
        <div className="text-overlay-container">
          <h1>Alternative Running Events</h1>
          <p>Your curated guide to the most exciting themed, obstacle, and alternative running events.</p>
          <p>Welcome to the world beyond traditional marathons. At Alt.Run, we bring together a comprehensive directory of unique running adventures, from muddy obstacle courses and vibrant themed runs to challenging virtual races you can do anywhere. Find your next unforgettable experience and filter by location, date, or event type to start your adventure today. From the USA to the Philippines to the United Kingdom to Canada to Australia, we have every type of running event you could hope for.</p>
        </div>

        {/* Display event cards without the "Featured Events" heading */}
        {/* Don't show any loading message here since we're using the loading indicator in the sidebar */}
        {error && <p>Error: {error}</p>}
        {!loading && !error && events.length === 0 && (
          <p>No events found matching your criteria. Try adjusting your filters.</p>
        )}
        {!loading && !error && events.length > 0 && (
          <>
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

            {/* Load More button */}
            {hasMore && (
              <div className="load-more-container">
                <button
                  className="load-more-btn"
                  onClick={() => {
                    if (lastQueryParams && window.fetchHomePageEvents) {
                      window.fetchHomePageEvents(
                        { ...lastQueryParams, page: undefined },
                        true,
                        currentPage + 1
                      );
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More Events'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
