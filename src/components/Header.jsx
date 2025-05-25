// src/components/Header.jsx
import { NavLink } from 'react-router-dom'; // Import NavLink
import HomeNavLink from './HomeNavLink'; // Import our custom HomeNavLink component
import { useState, useEffect } from 'react'; // Import React hooks

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [runnersDropdownOpen, setRunnersDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileRunnersDropdownOpen, setMobileRunnersDropdownOpen] = useState(false);

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

  // Toggle Running Guides dropdown menu
  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
    // Close runners dropdown if open
    if (runnersDropdownOpen) {
      setRunnersDropdownOpen(false);
    }
  };

  // Toggle Professional Runners dropdown menu
  const toggleRunnersDropdown = (e) => {
    e.preventDefault();
    setRunnersDropdownOpen(!runnersDropdownOpen);
    // Close guides dropdown if open
    if (dropdownOpen) {
      setDropdownOpen(false);
    }
  };

  // Toggle mobile Running Guides dropdown menu
  const toggleMobileDropdown = (e) => {
    e.preventDefault();
    setMobileDropdownOpen(!mobileDropdownOpen);
    // Close mobile menu and runners dropdown when opening mobile dropdown
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    if (mobileRunnersDropdownOpen) {
      setMobileRunnersDropdownOpen(false);
    }
  };

  // Toggle mobile Professional Runners dropdown menu
  const toggleMobileRunnersDropdown = (e) => {
    e.preventDefault();
    setMobileRunnersDropdownOpen(!mobileRunnersDropdownOpen);
    // Close mobile menu and guides dropdown when opening mobile runners dropdown
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    if (mobileDropdownOpen) {
      setMobileDropdownOpen(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest('.dropdown.guides-dropdown')) {
        setDropdownOpen(false);
      }
      if (!e.target.closest('.dropdown.runners-dropdown')) {
        setRunnersDropdownOpen(false);
      }
      if (!e.target.closest('.mobile-dropdown.guides-mobile-dropdown')) {
        setMobileDropdownOpen(false);
      }
      if (!e.target.closest('.mobile-dropdown.runners-mobile-dropdown')) {
        setMobileRunnersDropdownOpen(false);
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
              <NavLink to="/running-plans/" className="nav-link">Free Running Planner</NavLink>
            </nav>
          </div>
          <div className="header-right">
            <nav className="secondary-nav">
              <div className="dropdown guides-dropdown">
                <button
                  className={`dropdown-toggle ${dropdownOpen ? 'active' : ''}`}
                  onClick={toggleDropdown}
                  aria-expanded={dropdownOpen}
                >
                  Running Guides
                </button>
                <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                  <NavLink to="/start-running-guide/" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Beginner Running Guide</NavLink>
                  <NavLink to="/couch-to-5k-guide/" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Couch to 5K Guide</NavLink>
                  <NavLink to="/intermediate-running-guide/" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Intermediate Running Guide</NavLink>
                  <NavLink to="/advanced-running-guide/" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Advanced Running Guide</NavLink>
                  <NavLink to="/running-gear-guide/" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Running Gear Guide</NavLink>
                  <NavLink to="/common-running-injuries-guide/" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Running Injuries Guide</NavLink>
                  <NavLink to="/womens-running-health-guide/" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Women's Running Health Guide</NavLink>
                  <NavLink to="/optimal-running-form-guide/" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Optimal Running Form Guide</NavLink>
                  <NavLink to="/mental-strategies-guide/" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Mental Strategies Guide</NavLink>
                  <NavLink to="/runners-nutrition-guide/" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Runner's Nutrition Guide</NavLink>
                </div>
              </div>

              <div className="dropdown runners-dropdown">
                <button
                  className={`dropdown-toggle ${runnersDropdownOpen ? 'active' : ''}`}
                  onClick={toggleRunnersDropdown}
                  aria-expanded={runnersDropdownOpen}
                >
                  Professional Runners
                </button>
                <div className={`dropdown-menu ${runnersDropdownOpen ? 'show' : ''}`}>
                  <NavLink to="/professional-runners/jakob-ingebrigtsen/" className="dropdown-item" onClick={() => setRunnersDropdownOpen(false)}>Jakob Ingebrigtsen</NavLink>
                  <NavLink to="/professional-runners/eliud-kipchoge/" className="dropdown-item" onClick={() => setRunnersDropdownOpen(false)}>Eliud Kipchoge</NavLink>
                  <NavLink to="/professional-runners/kelvin-kiptum/" className="dropdown-item" onClick={() => setRunnersDropdownOpen(false)}>Kelvin Kiptum</NavLink>
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
          <div className="mobile-dropdown guides-mobile-dropdown">
            <button
              className={`mobile-dropdown-toggle ${mobileDropdownOpen ? 'active' : ''}`}
              onClick={toggleMobileDropdown}
              aria-expanded={mobileDropdownOpen}
            >
              Running Guides
            </button>
            <div className={`mobile-dropdown-menu ${mobileDropdownOpen ? 'show' : ''}`}>
              <NavLink
                to="/start-running-guide/"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Beginner Running Guide
              </NavLink>
              <NavLink
                to="/couch-to-5k-guide/"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Couch to 5K Guide
              </NavLink>
              <NavLink
                to="/intermediate-running-guide/"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Intermediate Running Guide
              </NavLink>
              <NavLink
                to="/advanced-running-guide/"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Advanced Running Guide
              </NavLink>
              <NavLink
                to="/running-gear-guide/"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Running Gear Guide
              </NavLink>
              <NavLink
                to="/common-running-injuries-guide/"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Running Injuries Guide
              </NavLink>
              <NavLink
                to="/womens-running-health-guide/"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Women's Running Health Guide
              </NavLink>
              <NavLink
                to="/optimal-running-form-guide/"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Optimal Form Guide
              </NavLink>
              <NavLink
                to="/mental-strategies-guide/"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Mental Strategies Guide
              </NavLink>
              <NavLink
                to="/runners-nutrition-guide/"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Runner's Nutrition Guide
              </NavLink>
            </div>
          </div>

          {/* Mobile Professional Runners Dropdown */}
          <div className="mobile-dropdown runners-mobile-dropdown">
            <button
              className={`mobile-dropdown-toggle ${mobileRunnersDropdownOpen ? 'active' : ''}`}
              onClick={toggleMobileRunnersDropdown}
              aria-expanded={mobileRunnersDropdownOpen}
            >
              Professional Runners
            </button>
            <div className={`mobile-dropdown-menu ${mobileRunnersDropdownOpen ? 'show' : ''}`}>
              <NavLink
                to="/professional-runners/jakob-ingebrigtsen/"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileRunnersDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Jakob Ingebrigtsen
              </NavLink>
              <NavLink
                to="/professional-runners/eliud-kipchoge/"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileRunnersDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Eliud Kipchoge
              </NavLink>
              <NavLink
                to="/professional-runners/kelvin-kiptum/"
                className="mobile-dropdown-item"
                onClick={() => {
                  setMobileRunnersDropdownOpen(false);
                  setMobileMenuOpen(false);
                }}
              >
                Kelvin Kiptum
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
              <NavLink to="/running-plans/" className="nav-link" onClick={closeMobileMenu}>Free Running Planner</NavLink>
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
