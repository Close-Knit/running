// src/components/GuideHeader.jsx
import React from 'react';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import './GuideHeader.css';

/**
 * Header component for guide pages with title, subtitle, and intro text
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Main title for the guide
 * @param {string} props.subtitle - Subtitle for the guide
 * @param {string} props.intro - Introductory paragraph
 */
function GuideHeader({ title, subtitle, intro }) {
  // Prepare share data
  const shareData = {
    title: title,
    text: subtitle || 'Check out this running guide from Alt.Run!',
    // URL will default to current URL in the ShareButton component
  };

  return (
    <div className="guide-header">
      <div className="guide-header-top">
        <img src="/logo-glow.webp" alt="Alt.Run Logo" className="guide-logo" />
        <ShareButton
          title={shareData.title}
          text={shareData.text}
        />
      </div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p className="guide-intro">{intro}</p>
    </div>
  );
}

GuideHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  intro: PropTypes.string
};

export default GuideHeader;
