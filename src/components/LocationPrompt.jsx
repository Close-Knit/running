// src/components/LocationPrompt.jsx
import React from 'react';
import { useLocationPrompt } from '../hooks/useLocation';
import './LocationPrompt.css';

/**
 * LocationPrompt component that shows a prompt to users asking if they want
 * to enable location-based filtering for events
 */
const LocationPrompt = () => {
  const { showPrompt, acceptPrompt, declinePrompt } = useLocationPrompt();

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="location-prompt-overlay">
      <div className="location-prompt">
        <div className="location-prompt-header">
          <h3>📍 Find Events Near You</h3>
        </div>
        
        <div className="location-prompt-content">
          <p>
            Would you like us to automatically show running events in your area? 
            We'll use your location to filter events by your city and state.
          </p>
          
          <div className="location-prompt-benefits">
            <ul>
              <li>✅ See events in your area first</li>
              <li>✅ Save time browsing</li>
              <li>✅ Discover local running communities</li>
            </ul>
          </div>
          
          <p className="location-prompt-privacy">
            <small>
              Your location is only used to filter events and is not stored on our servers. 
              You can disable this feature at any time.
            </small>
          </p>
        </div>
        
        <div className="location-prompt-actions">
          <button 
            className="location-prompt-btn location-prompt-accept"
            onClick={acceptPrompt}
          >
            📍 Use My Location
          </button>
          
          <button 
            className="location-prompt-btn location-prompt-decline"
            onClick={declinePrompt}
          >
            No Thanks
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPrompt;
