// src/pages/EventsPage.jsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import LocationSidebar from '../components/LocationSidebar';
import './EventsPage.css';

function EventsPage({ eventType }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

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
        
        // Apply filters
        if (filters.type) {
          query = query.eq('type', filters.type);
        }
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
        setEvents(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, [filters]);

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
        <h1>{filters.type ? `${filters.type.charAt(0).toUpperCase() + filters.type.slice(1)} Events` : 'All Events'}</h1>
        <p>Your curated guide to the most exciting themed, obstacle, and alternative running events.</p>
        
        {loading && <p>Loading events...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && events.length === 0 && (
          <p>No events found matching your criteria.</p>
        )}
        {!loading && !error && events.length > 0 && (
          <ul className="events-list">
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

export default EventsPage;
