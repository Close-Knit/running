// src/pages/EventsPage.jsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import LocationSidebar from '../components/LocationSidebar';
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

  // Get filters from URL query parameters or from the eventType prop
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(location.search);
    return {
      type: eventType || params.get('type') || '',
      country: params.get('country') || '',
      state: params.get('state') || '',
      city: params.get('city') || '',
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
          query = query.eq('state', filters.state);
        }
        if (filters.city) {
          query = query.eq('city', filters.city);
        }
        
        const { data, error } = await query;
        
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
        <h1>
          {currentPath === '/events' ? 'All Events' : 
           eventType === 'novelty' ? 'Novelty Runs' :
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

export default EventsPage;
