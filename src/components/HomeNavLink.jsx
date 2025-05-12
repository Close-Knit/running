// src/components/HomeNavLink.jsx
import { Link } from 'react-router-dom';

/**
 * A custom navigation link component that renders a link to the homepage with a specific menuType
 * @param {Object} props - Component props
 * @param {string} props.to - The URL to navigate to
 * @param {string} props.menuType - The menu type to pass to the HomePage component
 * @param {string} props.className - CSS class name for the link
 * @param {React.ReactNode} props.children - Child elements to render inside the link
 */
function HomeNavLink({ to, menuType, className, children }) {
  // Create a state object to pass as the location state
  const locationState = { menuType };

  const handleClick = (e) => {
    console.log(`HomeNavLink clicked: to=${to}, menuType=${menuType}`);
    // We don't need to do anything special here, just log for debugging
  };

  // Use the standard Link component with state
  return (
    <Link
      to={to}
      state={locationState}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

export default HomeNavLink;
