// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './NotFoundPage.css';

function NotFoundPage() {
  // Define SEO data for the 404 page
  const seoData = {
    title: "Page Not Found | Alt.Run",
    description: "Sorry, the page you're looking for doesn't exist. Explore our alternative running events, fun runs, and more on Alt.Run.",
    canonicalUrl: "/404",
    noindex: true, // Tell search engines not to index this page
    keywords: [],
    schema: null
  };

  return (
    <div className="not-found-container">
      {/* SEO Component */}
      <SEO {...seoData} />
      
      <div className="not-found-content">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
        
        <div className="not-found-links">
          <h2>You might be looking for:</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">All Events</Link></li>
            <li><Link to="/charity-run">Charity Runs</Link></li>
            <li><Link to="/themed-run">Themed Runs</Link></li>
            <li><Link to="/obstacle-run">Obstacle Races</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/shoe-reviews">Shoe Reviews</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
