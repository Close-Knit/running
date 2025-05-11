// src/components/Header.jsx
import { Link } from 'react-router-dom'; // Import Link for navigation

function Header() {
  return (
    <header className="app-header"> {/* A semantic HTML5 header tag with a CSS class */}
      <div className="header-left">
        <Link to="/" className="logo-link"> {/* Changed class for clarity */}
          <img
            src="/logo-glow.webp" /* Updated to use the new logo-glow.webp file */
            alt="Alt.Run Logo" /* IMPORTANT: Accessible alt text */
            className="header-logo-image" /* New class for styling the image */
          />
        </Link>
      </div>
      <div className="header-center">
        <nav className="main-nav"> {/* Navigation section */}
          <Link to="/events" className="nav-link">All Events</Link>
          <Link to="/novelty-run" className="nav-link">Novelty Run</Link>
          <Link to="/themed-run" className="nav-link">Themed Run</Link>
          <Link to="/obstacle-run" className="nav-link">Obstacle Run</Link>
          <Link to="/virtual-run" className="nav-link">Virtual Run</Link>
          <Link to="/barefoot-run" className="nav-link">Barefoot Run</Link>
        </nav>
      </div>
      <div className="header-right">
        {/* Empty div to balance the layout */}
      </div>
    </header>
  );
}

export default Header;
