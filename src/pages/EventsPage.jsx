// src/pages/EventsPage.jsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import LocationSidebar from '../components/LocationSidebar';
import { sortEventsByDate, filterEventsByDateRange } from '../utils/dateUtils';
import './EventsPage.css';

function EventsPage({ eventType }) {
  console.log('EventsPage received eventType:', eventType); // Debug log

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Get the current path to determine which page we're on
  const currentPath = location.pathname;
  console.log('Current path:', currentPath);
  
  // Set background image based on the current path
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      // Only change background if we're on a specific event page
      if (currentPath === '/events') {
        pageBackground.style.backgroundImage = 'url(/images/ladyshoe.jpg)';
        console.log('EventsPage: Set background to ladyshoe.jpg');
      } else if (currentPath === '/charity-run') {
        pageBackground.style.backgroundImage = 'url(/images/charity-run.jpg)';
      } else if (currentPath === '/themed-run') {
        pageBackground.style.backgroundImage = 'url(/images/themed-run.jpg)';
      } else if (currentPath === '/obstacle-run') {
        pageBackground.style.backgroundImage = 'url(/images/obstacle-run.jpg)';
      } else if (currentPath === '/virtual-run') {
        pageBackground.style.backgroundImage = 'url(/images/virtual-run.jpg)';
      } else if (currentPath === '/barefoot-run') {
        pageBackground.style.backgroundImage = 'url(/images/barefoot-run.jpg)';
      }
      // Do NOT set a default background here, as it might override the homepage
    }
  }, [currentPath]);

  // Get filters from URL query parameters or from the eventType prop
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(location.search);

    // Get current date for default date filters
    const today = new Date();
    const currentMonth = String(today.getMonth() + 1); // JavaScript months are 0-indexed
    const currentDay = String(today.getDate());

    return {
      type: eventType || params.get('type') || '',
      country: params.get('country') || '',
      state: params.get('state') || '',
      city: params.get('city') || '',
      month: params.get('month') || currentMonth,
      day: params.get('day') || currentDay,
    };
  });

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        let query = supabase.from('events').select('*');

        // Debug log to see what eventType we're receiving
        console.log('Current eventType:', eventType);
        console.log('Current path:', currentPath);

        // Apply filters - only filter by type if we're not on the "All Events" page
        if (eventType && currentPath !== '/events') {
          // Convert eventType to lowercase for case-insensitive comparison
          const typeToFilter = eventType.toLowerCase();
          console.log('Filtering by eventType (lowercase):', typeToFilter);

          // Use ilike for case-insensitive matching
          query = query.ilike('type', `%${typeToFilter}%`);
        } else if (filters.type && currentPath !== '/events') {
          // Otherwise use the type from filters
          query = query.ilike('type', `%${filters.type.toLowerCase()}%`);
          console.log('Filtering by filters.type:', filters.type);
        }

        // Location filters still apply to all pages
        if (filters.country) {
          query = query.eq('country', filters.country);
        }
        if (filters.state) {
          query = query.eq('state_province', filters.state);
        }
        if (filters.city) {
          query = query.eq('city', filters.city);
        }

        // Get events data without date filtering first
        let { data: allEvents, error: allEventsError } = await query;

        if (allEventsError) throw allEventsError;

        console.log('All events before date filtering:', allEvents);

        // Apply date-based filtering in JavaScript
        // This assumes event.dates_season contains dates in format like "2025-09-08" or similar
        if (allEvents && allEvents.length > 0) {
          // Parse the current filter date
          const filterMonth = parseInt(filters.month, 10);
          const filterDay = parseInt(filters.day, 10);
          const currentYear = new Date().getFullYear();

          // We'll use a progressive filtering strategy to find events based on date proximity

          // Always show events for the next 30 days by default
          const filterDate = new Date(currentYear, filterMonth - 1, filterDay);

          // Use our utility function to filter events for the next 30 days
          let filteredEvents = filterEventsByDateRange(allEvents, filterDate, 30);

          console.log('Events in next 30 days:', filteredEvents);

          // If no events found in the next 30 days, just show all events
          if (filteredEvents.length === 0) {
            filteredEvents = allEvents;
            console.log('No events found in next 30 days, showing all events');
          }

          // Use our utility function to sort events by date in ascending order
          filteredEvents = sortEventsByDate(filteredEvents);

          console.log('Events sorted by date (ascending):', filteredEvents);

          // Set the filtered events and exit
          setEvents(filteredEvents);
          setLoading(false);
          return; // Exit early since we've already set the events
        }

        // If we didn't do date filtering, use the original query result

        if (error) throw error;
        console.log('Fetched events:', data);

        setEvents(data || []);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [filters, eventType, currentPath]); // Add currentPath to dependencies

  // Handler for filter changes from LocationSidebar
  const handleLocationFilterChange = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div className="homepage-layout">
      <LocationSidebar
        onFilterChange={handleLocationFilterChange}
        initialFilters={filters}
      />
      <div className="homepage-main-content">
        <div className="text-overlay-container">
          <h1>
            {currentPath === '/events' ? 'All Events' :
             eventType === 'charity' ? 'Charity Runs' :
             eventType === 'themed' ? 'Themed Runs' :
             eventType === 'obstacle' ? 'Obstacle Runs' :
             eventType === 'virtual' ? 'Virtual Runs' :
             eventType === 'barefoot' ? 'Barefoot Runs' :
             eventType ? `${eventType.charAt(0).toUpperCase() + eventType.slice(1)} Runs` :
             'All Events'}
          </h1>

          {/* Conditional paragraph text based on current path */}
          {currentPath === '/events' ? (
            <p>All the types of events</p>
          ) : eventType === 'charity' ? (
            <p>Running events that support charitable causes and make a difference.</p>
          ) : eventType === 'themed' ? (
            <p>Fun runs that focus on a theme... like zombies!</p>
          ) : eventType === 'obstacle' ? (
            <p>From Spartan Race to Tough Mudder, this is where the warriors go.</p>
          ) : eventType === 'virtual' ? (
            <p>From We Run The North to The Conqueror Challenges, run from the comfort of your home.</p>
          ) : eventType === 'barefoot' ? (
            <p>Barefoot runners aim to discover a more natural running stride.</p>
          ) : (
            <p>Turn up the fun and turn down the speed</p>
          )}
        </div>

        {loading && <p>Loading events...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && events.length === 0 && (
          <p>No events found matching your criteria.</p>
        )}
        {!loading && !error && events.length > 0 && (
          <ul className="events-list">
            {events.map((event) => (
              <li key={event.id} className="event-card">
                <div className="event-card-content">
                  <h3>{event.name}</h3>

                  <div className="event-card-layout">
                    {/* Main content area */}
                    <div className="event-card-main">
                      <div className="event-card-details">
                        {/* Calendar icon and date */}
                        <div className="event-card-detail">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                          </svg>
                          {event.dates_season || 'Dates TBA'}
                        </div>
                        {/* Location and type details */}
                        <div className="event-card-detail">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                          </svg>
                          {event.locations || 'Location TBA'}
                        </div>
                        <div className="event-card-detail">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                            <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                          </svg>
                          {event.type || 'Event Type'}
                        </div>
                      </div>

                      {event.highlight && <p className="event-highlight">{event.highlight}</p>}
                      
                      {/* Move the button here to align with the bottom of the main content */}
                      <div className="event-card-action">
                        <Link to={`/events/${event.slug}`} className="learn-more-btn">
                          LEARN MORE
                        </Link>
                      </div>
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

                        {/* Always show Elevation Gain, even if it's zero */}
                        <div className="event-card-section-item">
                          <span className="event-card-section-label">Elevation Gain:</span>
                          <span className="event-card-section-value">{event.elevation_gain || '0'}</span>
                        </div>

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
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default EventsPage;
