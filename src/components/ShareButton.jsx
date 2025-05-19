// src/components/ShareButton.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ShareButton.css';

/**
 * ShareButton component for sharing content on social media or via other methods
 * Uses the Web Share API if available, with fallbacks for unsupported browsers
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title to share
 * @param {string} props.text - Text description to share
 * @param {string} props.url - URL to share (defaults to current URL)
 */
function ShareButton({ title, text, url }) {
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Use current URL if none provided
  const shareUrl = url || window.location.href;
  
  // Check if Web Share API is supported
  const isWebShareSupported = navigator.share !== undefined;

  const handleShare = async () => {
    // If Web Share API is supported, use it
    if (isWebShareSupported) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      // Toggle dropdown for fallback sharing options
      setShowDropdown(!showDropdown);
    }
  };

  // Share on specific platforms
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
    setShowDropdown(false);
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
    setShowDropdown(false);
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank');
    setShowDropdown(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('Link copied to clipboard!');
        setShowDropdown(false);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

  return (
    <div className="share-button-container">
      <button 
        className="share-button" 
        onClick={handleShare}
        aria-label="Share this guide"
        title="Share this guide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        <span className="share-text">Share</span>
      </button>
      
      {/* Fallback dropdown for browsers without Web Share API */}
      {!isWebShareSupported && showDropdown && (
        <div className="share-dropdown">
          <button onClick={shareOnTwitter} className="share-option">
            Twitter
          </button>
          <button onClick={shareOnFacebook} className="share-option">
            Facebook
          </button>
          <button onClick={shareOnLinkedIn} className="share-option">
            LinkedIn
          </button>
          <button onClick={copyToClipboard} className="share-option">
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}

ShareButton.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default ShareButton;
