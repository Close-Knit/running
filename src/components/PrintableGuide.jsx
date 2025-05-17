// src/components/PrintableGuide.jsx
import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PrintableGuide.css';

/**
 * A simplified, print-friendly version of the guide content
 * This component is specifically designed for PDF generation
 */
const PrintableGuide = forwardRef(({ sections, title, subtitle }, ref) => {
  // We don't need to track page count with state anymore
  // as we'll use CSS counters for automatic page numbering

  return (
    <div className="printable-guide" ref={ref}>
      {/* Header - Cover Page */}
      <div className="printable-header">
        <img src="/logo-glow.webp" alt="Alt.Run Logo" className="printable-logo" />
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p className="printable-date">Created: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Table of Contents - Always on its own page */}
      <div className="printable-toc">
        <h3>Table of Contents</h3>
        <ul>
          {sections.map((section, index) => (
            <li key={section.id}>
              <span>{index + 1}. {section.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Sections - Each on its own page */}
      {sections.map((section, index) => (
        <div key={section.id} className="printable-section">
          <h2>{index + 1}. {section.title}</h2>
          <div
            className="printable-content"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        </div>
      ))}

      {/* Add a special page break to ensure footer is on its own page */}
      <div className="page-break"></div>

      {/* Footer - Last Page */}
      <div className="printable-footer">
        <img src="/logo-glow.webp" alt="Alt.Run Logo" className="printable-logo" />
        <p>© {new Date().getFullYear()} Alt.Run - The Ultimate Beginner's Guide to Running</p>
        <p className="printable-disclaimer">This guide is provided for informational purposes only.
        Always consult with a healthcare professional before starting any new exercise program.</p>
      </div>
    </div>
  );
});

PrintableGuide.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default PrintableGuide;
