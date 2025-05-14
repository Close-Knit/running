// src/components/Header.jsx
import { NavLink } from 'react-router-dom'; // Import NavLink
import HomeNavLink from './HomeNavLink'; // Import our custom HomeNavLink component
import { useState, useEffect } from 'react'; // Import React hooks

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Update isMobile state when window is resized
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      setIsMobile(newIsMobile);

      // Close mobile menu when switching to desktop view
      if (!newIsMobile && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);
  return (
    <header className="app-header"> {/* A semantic HTML5 header tag with a CSS class */}
      <div className="header-left">
        <NavLink
          to="/"
          id="home-logo-link"
          className="logo-link"
        >
          <img
            src="/logo-glow.webp" /* Updated to use the new logo-glow.webp file */
            alt="Alt.Run Logo" /* IMPORTANT: Accessible alt text */
            className="header-logo-image" /* New class for styling the image */
          />
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      {!isMobile && (
        <>
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
            </nav>
          </div>
        </>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="mobile-nav-container">
          {/* Hamburger Menu Button */}
          <button
            className={`hamburger-button ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* Mobile Menu Dropdown */}
          <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <nav className="mobile-main-nav">
              <NavLink to="/events" className="nav-link" onClick={closeMobileMenu}>All Events</NavLink>
              <NavLink to="/charity-run" className="nav-link" onClick={closeMobileMenu}>Charity Run</NavLink>
              <NavLink to="/themed-run" className="nav-link" onClick={closeMobileMenu}>Themed Run</NavLink>
              <NavLink to="/obstacle-run" className="nav-link" onClick={closeMobileMenu}>Obstacle Run</NavLink>
              <NavLink to="/virtual-run" className="nav-link" onClick={closeMobileMenu}>Virtual Run</NavLink>
              <NavLink to="/barefoot-run" className="nav-link" onClick={closeMobileMenu}>Barefoot Run</NavLink>
              <div className="mobile-secondary-nav">
                <NavLink to="/shoe-reviews" className="nav-link" onClick={closeMobileMenu}>Shoe Reviews</NavLink>
                <NavLink to="/blog" className="nav-link" onClick={closeMobileMenu}>Blog</NavLink>
              </div>
            </nav>
          </div>
        </div>
      )}

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
    </header>
  );
}

export default Header;
