// src/components/Header.jsx
import React from 'react'; // Import React
import { Link } from 'react-router-dom'; // Import Link for navigation

function Header() {
  return (
    <header className="app-header"> {/* A semantic HTML5 header tag with a CSS class */}
      <div className="header-left">
        <Link to="/" className="logo" style={{ color: '#FFFFFF' }}> {/* Link to the homepage, styled as a logo */}
          Alt.Run
        </Link>
      </div>
      <div className="header-center">
        <nav className="main-nav"> {/* Navigation section */}
          <Link to="/events" className="nav-link">All Events</Link> {/* Link to the events page */}
          <Link to="/events?type=novelty" className="nav-link">Novelty Run</Link>
          <Link to="/events?type=themed" className="nav-link">Themed Run</Link>
          <Link to="/events?type=obstacle" className="nav-link">Obstacle Run</Link>
          <Link to="/events?type=barefoot" className="nav-link">Barefoot</Link>
        </nav>
      </div>
      <div className="header-right">
        {/* Empty div to balance the layout */}
      </div>
    </header>
  );
}

export default Header; // Make the Header component available for other files to import