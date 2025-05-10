// src/pages/EventsPage.jsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // Import useSearchParams
import { supabase } from '../supabaseClient';
// LocationSidebar is NO LONGER imported or used here
import './EventsPage.css'; // CSS for layout (can remain if still relevant for list styling)

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams(); // Hook to get URL query parameters

  // useEffect hook to fetch data when component mounts OR when searchParams change
  useEffect(() => {
    // Get filter values from URL query parameters
    const countryFilter = searchParams.get('country') || '';
    const stateFilter = searchParams.get('state') || '';
    const cityFilter = searchParams.get('city') || '';

    // Log the filters being used (for debugging)
    console.log("EventsPage fetching with filters:", {
        country: countryFilter,
        state: stateFilter,
        city: cityFilter
    });

    async function fetchEvents() {
      setLoading(true);
      setError(null);
      try {
        let query = supabase.from('events').select('*');

        // Apply filters from URL parameters
        if (countryFilter) {
          query = query.eq('country', countryFilter);
        }
        if (stateFilter) {
          // Adjust 'Various' logic if needed, or ensure 'Various' isn't a filterable value from sidebar
          if (stateFilter.toLowerCase() !== 'various') {
             query = query.eq('state_province', stateFilter);
          }
        }
        if (cityFilter) {
          if (cityFilter.toLowerCase() !== 'various') {
            query = query.eq('city', cityFilter);
          }
        }
        // Example: Add default sorting if no specific sorting is applied by filters
        query = query.order('name', { ascending: true });


        const { data, error: supabaseError } = await query;

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
    // Re-fetch events whenever searchParams change (i.e., URL filters change)
  }, [searchParams]); // Dependency array includes searchParams

  if (loading && events.length === 0) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  // Determine if any filters are active to adjust messaging
  const filtersApplied = searchParams.get('country') || searchParams.get('state') || searchParams.get('city');

  return (
    // The 'container' class can be added here if you want the content centered and max-width.
    <div className="container"> 
      <h1>
        {filtersApplied ? "Filtered Alternative Running Events" : "All Alternative Running Events"}
      </h1>
      <div className="events-list-content"> {/* This class is still useful for styling the list area */}
        {loading && <p>Refreshing events...</p>}
        {!loading && events.length === 0 && !error && (
          <p>
            {filtersApplied 
              ? "No events found matching your selected filters." 
              : "No events available at the moment."
            }
          </p>
        )}
        {!loading && events.length > 0 && (
          <ul>
            {events.map((event) => (
              <li key={event.id} className="card">
                <Link to={`/events/${event.slug}`}>
                  <h3>{event.name}</h3>
                </Link>
                <p><strong>Type:</strong> {event.type}</p>
                <p><strong>Location:</strong> {`${event.city || ''}, ${event.state_province || ''}, ${event.country || ''}`.replace(/^, |, $/g, '').replace(/, ,/g, ',')}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default EventsPage;
