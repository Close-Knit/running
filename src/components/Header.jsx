// src/components/Header.jsx
import { NavLink } from 'react-router-dom'; // Import NavLink
import HomeNavLink from './HomeNavLink'; // Import our custom HomeNavLink component

function Header() {
  return (
    <header className="app-header"> {/* A semantic HTML5 header tag with a CSS class */}
      <div className="header-left">
        <a
          href="/"
          id="home-logo-link"
          className="logo-link"
          onClick={(e) => {
            // Prevent default behavior
            e.preventDefault();
            console.log("Logo clicked, navigating to homepage");
            // Navigate to the homepage
            window.location.href = '/';
          }}
        >
          <img
            src="/logo-glow.webp" /* Updated to use the new logo-glow.webp file */
            alt="Alt.Run Logo" /* IMPORTANT: Accessible alt text */
            className="header-logo-image" /* New class for styling the image */
          />
        </a>
      </div>
      <div className="header-center">
        <nav className="main-nav"> {/* Navigation section */}
          <NavLink to="/events" className="nav-link">All Events</NavLink>
          <NavLink to="/charity-run" className="nav-link">Charity Run</NavLink>
          <NavLink to="/themed-run" className="nav-link">Themed Run</NavLink>
          <NavLink to="/obstacle-run" className="nav-link">Obstacle Run</NavLink>
          <NavLink to="/virtual-run" className="nav-link">Virtual Run</NavLink>
          <NavLink to="/barefoot-run" className="nav-link">Barefoot Run</NavLink>
        </nav>
      </div>
      <div className="header-right">
        <nav className="secondary-nav">
          <NavLink to="/shoe-reviews" className="nav-link">Shoe Reviews</NavLink>
          <NavLink to="/blog" className="nav-link">Blog</NavLink>

          {/* Hidden menu for homepage background images - these are not visible but provide the functionality */}
          <div className="hidden-menu" style={{ display: 'none' }}>
            <HomeNavLink to="/" menuType="home" className="nav-link">Home</HomeNavLink>
            <HomeNavLink to="/" menuType="all" className="nav-link">All Events Home</HomeNavLink>
            <HomeNavLink to="/" menuType="charity" className="nav-link">Charity Run Home</HomeNavLink>
            <HomeNavLink to="/" menuType="themed" className="nav-link">Themed Run Home</HomeNavLink>
            <HomeNavLink to="/" menuType="obstacle" className="nav-link">Obstacle Run Home</HomeNavLink>
            <HomeNavLink to="/" menuType="virtual" className="nav-link">Virtual Run Home</HomeNavLink>
            <HomeNavLink to="/" menuType="barefoot" className="nav-link">Barefoot Run Home</HomeNavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
