// src/components/DownloadPdfLink.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './DownloadPdfLink.css';

/**
 * Component to provide a download link for the pre-generated PDF
 *
 * @param {Object} props - Component props
 * @param {string} props.buttonText - Text to display on the download button
 * @param {string} props.pdfPath - Path to the PDF file
 */
function DownloadPdfLink({ buttonText, pdfPath = '/alt-run-beginner-guide.pdf' }) {
  // Force download with correct MIME type
  const handleDownload = (e) => {
    // For debugging purposes, log the download attempt
    console.log(`Attempting to download PDF from: ${pdfPath}`);

    // If using the download page, no need for additional handling
    if (pdfPath.endsWith('.html')) {
      return;
    }

    // For direct PDF links, ensure proper download behavior
    if (pdfPath.endsWith('.pdf')) {
      // No need to prevent default - let the browser handle the download
      // Just log for debugging
      console.log('Direct PDF download');
    }
  };

  return (
    <div className="download-guide">
      <a
        href={pdfPath}
        className="download-button"
        download={pdfPath.endsWith('.pdf') ? "alt-run-beginner-guide.pdf" : null}
        type={pdfPath.endsWith('.pdf') ? "application/pdf" : null}
        onClick={handleDownload}
        aria-label="Download guide as PDF"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="download-icon">📥</span>
        {buttonText}
      </a>
    </div>
  );
}

DownloadPdfLink.propTypes = {
  buttonText: PropTypes.string.isRequired,
  pdfPath: PropTypes.string
};

export default DownloadPdfLink;
