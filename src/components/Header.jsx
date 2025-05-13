// src/components/Header.jsx
import { NavLink } from 'react-router-dom'; // Import NavLink
import HomeNavLink from './HomeNavLink'; // Import our custom HomeNavLink component
import { useState, useEffect } from 'react'; // Import React hooks

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Function to handle smooth scrolling of the menu
  const scrollNavMenu = (direction) => {
    const navElement = document.querySelector('.main-nav');
    if (navElement) {
      const scrollAmount = 150; // Adjust as needed
      navElement.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });

      // Update scroll state after scrolling
      setTimeout(checkScrollability, 300);
    }
  };

  // Function to check if the menu can be scrolled
  const checkScrollability = () => {
    const navElement = document.querySelector('.main-nav');
    if (navElement) {
      // Check if we can scroll left
      setCanScrollLeft(navElement.scrollLeft > 0);

      // Check if we can scroll right
      const canScrollRight = navElement.scrollWidth > navElement.clientWidth &&
                            navElement.scrollLeft < (navElement.scrollWidth - navElement.clientWidth);
      setCanScrollRight(canScrollRight);
    }
  };

  // Update isMobile state when window is resized and check scrollability
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      checkScrollability();
    };

    window.addEventListener('resize', handleResize);

    // Check scrollability on mount and when dependencies change
    checkScrollability();

    // Add scroll event listener to update button visibility
    const navElement = document.querySelector('.main-nav');
    if (navElement) {
      navElement.addEventListener('scroll', checkScrollability);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      const navElement = document.querySelector('.main-nav');
      if (navElement) {
        navElement.removeEventListener('scroll', checkScrollability);
      }
    };
  }, []);
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
        {isMobile && canScrollLeft && (
          <button
            className="nav-scroll-button left"
            onClick={() => scrollNavMenu('left')}
            aria-label="Scroll menu left"
          >
            &lt;
          </button>
        )}
        <nav className="main-nav" onScroll={checkScrollability}> {/* Navigation section */}
          <NavLink to="/events" className="nav-link">All Events</NavLink>
          <NavLink to="/charity-run" className="nav-link">Charity Run</NavLink>
          <NavLink to="/themed-run" className="nav-link">Themed Run</NavLink>
          <NavLink to="/obstacle-run" className="nav-link">Obstacle Run</NavLink>
          <NavLink to="/virtual-run" className="nav-link">Virtual Run</NavLink>
          <NavLink to="/barefoot-run" className="nav-link">Barefoot Run</NavLink>
        </nav>
        {isMobile && canScrollRight && (
          <button
            className="nav-scroll-button right"
            onClick={() => scrollNavMenu('right')}
            aria-label="Scroll menu right"
          >
            &gt;
          </button>
        )}
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
