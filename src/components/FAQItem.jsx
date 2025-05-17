// src/components/FAQItem.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FAQItem.css';

/**
 * Expandable FAQ item component
 *
 * @param {Object} props - Component props
 * @param {string} props.question - The FAQ question
 * @param {React.ReactNode} props.children - The FAQ answer content
 */
function FAQItem({ question, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Create a unique ID for this FAQ item
  const faqId = `faq-${question.replace(/\s+/g, '-').toLowerCase().substring(0, 20)}`;

  return (
    <div
      className={`faq-item ${isOpen ? 'open' : ''}`}
      id={faqId}
    >
      <button
        className="faq-question"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`${faqId}-answer`}
      >
        <span>{question}</span>
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>

      {/* Always render the answer div but conditionally show it */}
      <div
        className="faq-answer"
        id={`${faqId}-answer`}
        style={{
          display: isOpen ? 'block' : 'none',
        }}
        data-print-visible="true" // Special attribute to ensure visibility in print
      >
        {children}
      </div>
    </div>
  );
}

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default FAQItem;
