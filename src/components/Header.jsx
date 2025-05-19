// src/components/Header.jsx
import { NavLink } from 'react-router-dom'; // Import NavLink
import HomeNavLink from './HomeNavLink'; // Import our custom HomeNavLink component
import { useState, useEffect } from 'react'; // Import React hooks

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close mobile dropdown when opening mobile menu
    if (mobileDropdownOpen) {
      setMobileDropdownOpen(false);
    }
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Toggle dropdown menu
  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  // Toggle mobile dropdown menu
  const toggleMobileDropdown = (e) => {
    e.preventDefault();
    setMobileDropdownOpen(!mobileDropdownOpen);
    // Close mobile menu when opening mobile dropdown
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
      if (!e.target.closest('.mobile-dropdown')) {
        setMobileDropdownOpen(false);
      }
    };

    document.addEventListener('click', closeDropdowns);
    return () => {
      document.removeEventListener('click', closeDropdowns);
    };
  }, []);

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
              <NavLink to="/running-plans" className="nav-link">Free Training Plans</NavLink>
            </nav>
          </div>
          <div className="header-right">
            <nav className="secondary-nav">
              <div className="dropdown">
                <button
                  className={`dropdown-toggle ${dropdownOpen ? 'active' : ''}`}
                  onClick={toggleDropdown}
                  aria-expanded={dropdownOpen}
                >
                  Running Guides
                </button>
                <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                  <NavLink to="/running-plans" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Free Training Plans</NavLink>
                  <NavLink to="/start-running-guide" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Beginner Running Guide</NavLink>
                  <NavLink to="/intermediate-running-guide" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Intermediate Running Guide</NavLink>
                  <NavLink to="/advanced-running-guide" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Advanced Running Guide</NavLink>
                  <NavLink to="/running-gear-guide" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Running Gear Guide</NavLink>
                  <NavLink to="/common-running-injuries-guide" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Running Injuries Guide</NavLink>
                  <NavLink to="/womens-running-health-guide" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Women's Running Health Guide</NavLink>
                </div>
              </div>
              {/* <NavLink to="/blog" className="nav-link">Blog</NavLink> */}
            </nav>
          </div>
        </>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="mobile-nav-container">
          {/* Mobile Running Guides Dropdown */}
          <div className="mobile-dropdown">
            <button
              className={`mobile-dropdown-toggle ${mobileDropdownOpen ? 'active' : ''}`}
              onClick={toggleMobileDropdown}
              aria-expanded={mobileDropdownOpen}
            >
              Running Guides
            </button>
            <div className={`mobile-dropdown-menu ${mobileDropdownOpen ? 'show' : ''}`}>
              <NavLink
                to="/running-plans"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Free Training Plans
              </NavLink>
              <NavLink
                to="/start-running-guide"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Beginner Running Guide
              </NavLink>
              <NavLink
                to="/intermediate-running-guide"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Intermediate Running Guide
              </NavLink>
              <NavLink
                to="/advanced-running-guide"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Advanced Running Guide
              </NavLink>
              <NavLink
                to="/running-gear-guide"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Running Gear Guide
              </NavLink>
              <NavLink
                to="/common-running-injuries-guide"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Running Injuries Guide
              </NavLink>
              <NavLink
                to="/womens-running-health-guide"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Women's Running Health Guide
              </NavLink>
            </div>
          </div>

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
              <NavLink to="/running-plans" className="nav-link" onClick={closeMobileMenu}>Free Training Plans</NavLink>
              {/* <NavLink to="/blog" className="nav-link" onClick={closeMobileMenu}>Blog</NavLink> */}
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
