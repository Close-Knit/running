// src/components/TableOfContents.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './TableOfContents.css';

/**
 * Table of Contents component for guide pages
 * 
 * @param {Object} props - Component props
 * @param {Array} props.sections - Array of section objects with id and title
 */
function TableOfContents({ sections }) {
  return (
    <div className="table-of-contents">
      <h3>Table of Contents</h3>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>{section.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

TableOfContents.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
};

export default TableOfContents;
