// src/components/ui/LoadingSpinner.jsx
import React from 'react';
import './LoadingSpinner.css';

/**
 * A loading spinner component to indicate loading states
 * 
 * @returns {JSX.Element} The loading spinner component
 */
function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Generating your plan...</p>
    </div>
  );
}

export default LoadingSpinner;
