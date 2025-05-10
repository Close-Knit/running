// src/pages/EventDetailPage.jsx
import { useState, useEffect } from 'react'; // React hooks
import { useParams, Link } from 'react-router-dom'; // For getting URL params and navigation
import { supabase } from '../supabaseClient'; // Your Supabase client

function EventDetailPage() {
  const { slug } = useParams(); // Extracts the 'slug' from the URL (e.g., /events/the-color-run -> slug = 'the-color-run')
  const [event, setEvent] = useState(null); // State to hold the single event object
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  useEffect(() => {
    // Async function to fetch details for a single event
    async function fetchEventDetails() {
      if (!slug) { // Safety check, though router should ensure slug is present
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const { data, error: supabaseError } = await supabase
          .from('events')       // From your 'events' table
          .select('*')          // Select all columns for the event
          .eq('slug', slug)     // Filter where the 'slug' column matches the URL slug
          .single();          // Expect one single row/event to be returned

        // Handle Supabase errors specifically
        // PGRST116 means "Searched item was not found" - for us, this means the event slug is invalid.
        if (supabaseError && supabaseError.code === 'PGRST116') {
          setEvent(null); // No event found for this slug
        } else if (supabaseError) {
          throw supabaseError; // Other Supabase errors
        } else {
          setEvent(data); // Set the fetched event data to state
        }

      } catch (err) {
        console.error("Error fetching event details:", err);
        setError(err.message || `Failed to fetch event: ${slug}`);
        setEvent(null); // Ensure event is null on error
      } finally {
        setLoading(false); // Done loading
      }
    }

    fetchEventDetails();
  }, [slug]); // Re-run this effect if the 'slug' URL parameter changes

  // Render based on loading/error/event found states
  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!event) {
    // If no event was found for the given slug
    return (
      <div>
        <h2>Event Not Found</h2>
        <p>Sorry, we couldn't find an event with that URL.</p>
        <Link to="/events">View all events</Link>
        <br />
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // If event is found, display its details
  return (
    <div className="event-detail-container"> {/* Added a class for potential styling */}
      <h1>{event.name}</h1>
      <section className="event-info"> {/* Grouping info for clarity */}
        <p><strong>Type:</strong> {event.type || 'N/A'}</p>
        <p><strong>Dates/Season:</strong> {event.dates_season || 'N/A'}</p>
        <p><strong>Location(s):</strong> {event.locations || 'N/A'}</p>
        <p><strong>Highlight:</strong> {event.highlight || 'N/A'}</p>
      </section>
      
      {event.description && ( // Only show description section if it exists
        <section className="event-description">
          <h2>Description</h2>
          <p>{event.description}</p>
        </section>
      )}
      
      {event.website_url && ( // Only show link if URL exists
        <p className="event-website-link">
          <a href={event.website_url} target="_blank" rel="noopener noreferrer">
            <strong>Visit Official Event Website →</strong>
          </a>
        </p>
      )}
      <hr />
      <nav className="event-detail-nav">
        <Link to="/events">← Back to All Events</Link>
        <span style={{ margin: '0 10px' }}>|</span>
        <Link to="/">Back to Home</Link>
      </nav>
    </div>
  );
}

export default EventDetailPage;