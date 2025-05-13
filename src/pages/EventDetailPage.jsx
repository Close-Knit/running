// src/pages/EventDetailPage.jsx
import { useState, useEffect } from 'react'; // React hooks
import { useParams, Link } from 'react-router-dom'; // For getting URL params and navigation
import { supabase } from '../supabaseClient'; // Your Supabase client
import SEO from '../components/SEO'; // Import SEO component
import './EventDetailPage.css'; // Import CSS for this page

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

  // Generate SEO data for the event
  const generateEventSeo = () => {
    // Format the event location for the title
    const locationParts = [];
    if (event.city) locationParts.push(event.city);
    if (event.state_province) locationParts.push(event.state_province);
    if (event.country) locationParts.push(event.country);
    const locationString = locationParts.join(', ');

    // Determine event type for title
    let eventTypeLabel = '';
    if (event.type) {
      if (event.type.toLowerCase().includes('charity')) {
        eventTypeLabel = 'Charity Run';
      } else if (event.type.toLowerCase().includes('themed')) {
        eventTypeLabel = 'Themed Run';
      } else if (event.type.toLowerCase().includes('obstacle')) {
        eventTypeLabel = 'Obstacle Race';
      } else if (event.type.toLowerCase().includes('virtual')) {
        eventTypeLabel = 'Virtual Run';
      } else if (event.type.toLowerCase().includes('barefoot')) {
        eventTypeLabel = 'Barefoot Run';
      } else {
        eventTypeLabel = event.type;
      }
    }

    // Create SEO title (55-60 characters)
    const title = `${event.name} - Fun ${eventTypeLabel} in ${locationString} | Alt.Run`;

    // Create meta description (150-160 characters)
    const description = `Join the ${event.name}! A vibrant ${eventTypeLabel} in ${locationString}. Perfect for adventure seekers and fun-loving runners. Find details & sign up on Alt.Run!`;

    // Generate keywords based on event details
    const keywords = [
      "fun runs",
      "running events",
      eventTypeLabel.toLowerCase(),
      `${eventTypeLabel.toLowerCase()} in ${locationString}`,
      `running events in ${locationString}`,
      "alternative running",
      "fun running adventures"
    ];

    // Add terrain as keyword if available
    if (event.terrain) {
      keywords.push(`${event.terrain} running`);
    }

    // Add charity as keyword if available
    if (event.charity_affiliation) {
      keywords.push(`${event.charity_affiliation} run`);
      keywords.push("charity running events");
    }

    // Create breadcrumbs
    const breadcrumbs = [
      { name: "Home", path: "/" },
      { name: "Events", path: "/events" }
    ];

    // Add event type to breadcrumbs if available
    if (event.type) {
      if (event.type.toLowerCase().includes('charity')) {
        breadcrumbs.push({ name: "Charity Runs", path: "/charity-run" });
      } else if (event.type.toLowerCase().includes('themed')) {
        breadcrumbs.push({ name: "Themed Runs", path: "/themed-run" });
      } else if (event.type.toLowerCase().includes('obstacle')) {
        breadcrumbs.push({ name: "Obstacle Races", path: "/obstacle-run" });
      } else if (event.type.toLowerCase().includes('virtual')) {
        breadcrumbs.push({ name: "Virtual Runs", path: "/virtual-run" });
      } else if (event.type.toLowerCase().includes('barefoot')) {
        breadcrumbs.push({ name: "Barefoot Runs", path: "/barefoot-run" });
      }
    }

    // Add current event to breadcrumbs
    breadcrumbs.push({ name: event.name, path: `/events/${slug}` });

    // Create Event schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": event.name,
      "description": event.description || `${event.name} - A fun ${eventTypeLabel} in ${locationString}`,
      "url": `https://alt.run/events/${slug}`,
      "keywords": [
        eventTypeLabel.toLowerCase(),
        "fun run",
        "alternative running",
        "running event",
        event.terrain || "",
        event.charity_affiliation || ""
      ].filter(Boolean),
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": event.type.toLowerCase().includes('virtual')
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": event.locations || locationString,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": event.city || "",
          "addressRegion": event.state_province || "",
          "addressCountry": event.country || ""
        }
      },
      "offers": {
        "@type": "Offer",
        "price": event.registration_fee || event.price || "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": event.website_url || `https://alt.run/events/${slug}`
      }
    };

    // Add start date if available
    if (event.dates_season) {
      // Try to parse the date from dates_season
      const dateMatch = event.dates_season.match(/\d{4}-\d{2}-\d{2}/);
      if (dateMatch) {
        schema.startDate = dateMatch[0];
      } else {
        schema.startDate = event.dates_season;
      }
    }

    // Add organizer if available
    if (event.organizer) {
      schema.organizer = {
        "@type": "Organization",
        "name": event.organizer
      };
    }

    return {
      title,
      description,
      canonicalUrl: `/events/${slug}`,
      ogType: "article",
      keywords,
      schema,
      breadcrumbs
    };
  };

  // Get SEO data for the event
  const eventSeoData = generateEventSeo();

  return (
    <div className="event-detail-container"> {/* Added a class for potential styling */}
      {/* SEO Component */}
      <SEO {...eventSeoData} />

      <h1>{event.name}</h1>

      <section className="event-info"> {/* Grouping basic info for clarity */}
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

      {/* Additional Event Details Section */}
      <section className="event-additional-details">
        <h2>Event Details</h2>
        <div className="event-details-grid">
          <div className="event-detail-card">
            <h3>Course Information</h3>
            {event.terrain && <p><strong>Terrain:</strong> {event.terrain}</p>}
            {event.elevation_gain && <p><strong>Elevation Gain:</strong> {event.elevation_gain}</p>}
            {event.charity_affiliation && <p><strong>Charity Affiliation:</strong> {event.charity_affiliation}</p>}
          </div>

          <div className="event-detail-card">
            <h3>Requirements</h3>
            {event.age_restrictions && <p><strong>Age Restrictions:</strong> {event.age_restrictions}</p>}
            {event.qualification_standard && <p><strong>Qualification Standard:</strong> {event.qualification_standard}</p>}
          </div>

          <div className="event-detail-card">
            <h3>Registration</h3>
            {event.registration_fee && <p><strong>Registration Fee:</strong> ${event.registration_fee}</p>}
            {event.price && <p><strong>Ticket Price:</strong> ${event.price}</p>}
          </div>
        </div>
      </section>

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