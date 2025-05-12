// src/components/BackgroundSelector.jsx
import { Link } from 'react-router-dom';

/**
 * A small component that allows changing the background image without changing the page
 */
function BackgroundSelector() {
  // We'll use Link components instead of programmatic navigation

  return (
    <div className="background-selector">
      <div className="background-selector-toggle">Change Background</div>
      <div className="background-selector-options">
        <Link to="/" state={{ menuType: 'home' }} className="bg-link">Default Background</Link>
        <Link to="/" state={{ menuType: 'all' }} className="bg-link">All Events Background</Link>
        <Link to="/" state={{ menuType: 'charity' }} className="bg-link">Charity Run Background</Link>
        <Link to="/" state={{ menuType: 'themed' }} className="bg-link">Themed Run Background</Link>
        <Link to="/" state={{ menuType: 'obstacle' }} className="bg-link">Obstacle Run Background</Link>
        <Link to="/" state={{ menuType: 'virtual' }} className="bg-link">Virtual Run Background</Link>
        <Link to="/" state={{ menuType: 'barefoot' }} className="bg-link">Barefoot Run Background</Link>
      </div>
    </div>
  );
}

export default BackgroundSelector;
