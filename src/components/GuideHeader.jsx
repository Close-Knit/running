// src/components/GuideHeader.jsx
import React from 'react';
import PropTypes from 'prop-types';
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
  return (
    <div className="guide-header">
      <img src="/logo-glow.webp" alt="Alt.Run Logo" className="guide-logo" />
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
