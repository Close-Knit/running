// src/components/Header.jsx
import { Link, NavLink } from 'react-router-dom'; // Import NavLink

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
          <NavLink to="/events" className="nav-link">All Events</NavLink>
          <NavLink to="/novelty-run" className="nav-link">Novelty Run</NavLink>
          <NavLink to="/themed-run" className="nav-link">Themed Run</NavLink>
          <NavLink to="/obstacle-run" className="nav-link">Obstacle Run</NavLink>
          <NavLink to="/virtual-run" className="nav-link">Virtual Run</NavLink>
          <NavLink to="/barefoot-run" className="nav-link">Barefoot Run</NavLink>
        </nav>
      </div>
      <div className="header-right">
        {/* Empty div to balance the layout */}
      </div>
    </header>
  );
}

export default Header;
