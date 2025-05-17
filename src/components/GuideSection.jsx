// src/components/GuideSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './GuideSection.css';

/**
 * Section component for guide pages
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Section ID for anchor links
 * @param {string} props.title - Section title
 * @param {React.ReactNode} props.children - Section content
 */
function GuideSection({ id, title, children }) {
  return (
    <section id={id} className="guide-section">
      <h2>{title}</h2>
      <div className="guide-section-content">
        {children}
      </div>
    </section>
  );
}

GuideSection.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default GuideSection;
