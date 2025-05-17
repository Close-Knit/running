// src/components/DownloadGuide.jsx
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import html2pdf from 'html2pdf.js';
import PrintableGuide from './PrintableGuide';
import './DownloadGuide.css';

/**
 * Component to generate and download a PDF of the guide content
 *
 * @param {Object} props - Component props
 * @param {React.RefObject} props.targetRef - Reference to the content to be converted to PDF
 * @param {string} props.buttonText - Text to display on the download button
 * @param {string} props.filename - Filename for the downloaded PDF
 */
function DownloadGuide({ targetRef, buttonText, filename = 'alt-run-beginners-guide.pdf' }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const printableRef = useRef(null);

  // Extract section content from the guide
  const extractSections = () => {
    const element = targetRef.current;
    if (!element) return [];

    const sections = [];
    const sectionElements = element.querySelectorAll('.guide-section');

    sectionElements.forEach(section => {
      const id = section.id;
      const title = section.querySelector('h2')?.textContent || '';
      const content = section.querySelector('.guide-section-content')?.innerHTML || '';

      sections.push({ id, title, content });
    });

    return sections;
  };

  const handleDownload = () => {
    if (isGenerating) return; // Prevent multiple clicks

    setIsGenerating(true);

    // Show loading state
    const button = document.querySelector('.download-button');
    if (button) {
      button.textContent = 'Preparing PDF...';
      button.disabled = true;
    }

    // Expand all FAQs for PDF
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      if (!item.classList.contains('open')) {
        const btn = item.querySelector('.faq-question');
        if (btn) btn.click();
      }
    });

    // Enhanced PDF options for better rendering and page breaks
    const options = {
      margin: [8, 8, 15, 8], // [top, right, bottom, left] in mm - reduced margins
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 }, // Higher quality images
      html2canvas: {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allow loading of images from other domains
        logging: false, // Disable logging
        letterRendering: true, // Better text rendering
        allowTaint: true, // Allow images from other domains
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        compress: true, // Compress the PDF
        hotfixes: ["px_scaling"], // Fix scaling issues
      }
    };

    // Use the PrintableGuide component for PDF generation
    const printableElement = printableRef.current;

    if (!printableElement) {
      console.error('Printable element not found');
      setIsGenerating(false);
      if (button) {
        button.textContent = buttonText;
        button.disabled = false;
      }
      return;
    }

    // Use a timeout to allow DOM updates to complete
    setTimeout(() => {
      // Create a worker instance for better performance
      const worker = html2pdf().from(printableElement).set(options);

      // Get the jsPDF instance to add page numbers after rendering
      let pdfInstance = null;

      worker.get('pdf')
        .then(pdf => {
          pdfInstance = pdf;
        });

      // Generate PDF with page numbers
      worker.save()
        .then(() => {
          console.log('PDF generated successfully');

          // If we got the PDF instance, we could add page numbers
          // This is handled by CSS counters now, but keeping the code
          // as a fallback option if needed in the future
          if (pdfInstance) {
            console.log('PDF instance available for customization');
            // Example of how to add page numbers if CSS approach fails:
            // const pageCount = pdfInstance.internal.getNumberOfPages();
            // for (let i = 1; i <= pageCount; i++) {
            //   pdfInstance.setPage(i);
            //   pdfInstance.setFontSize(10);
            //   pdfInstance.setTextColor(100, 100, 100);
            //   pdfInstance.text(
            //     `Page ${i} of ${pageCount}`,
            //     pdfInstance.internal.pageSize.getWidth() / 2,
            //     pdfInstance.internal.pageSize.getHeight() - 10,
            //     { align: 'center' }
            //   );
            // }
          }

          // Reset button state
          if (button) {
            button.textContent = buttonText;
            button.disabled = false;
          }

          // Reset FAQ states after a delay to ensure PDF is generated
          setTimeout(() => {
            faqItems.forEach(item => {
              if (item.classList.contains('open')) {
                const btn = item.querySelector('.faq-question');
                if (btn) btn.click();
              }
            });
            setIsGenerating(false);
          }, 1000);
        })
        .catch(error => {
          console.error('Error generating PDF:', error);

          if (button) {
            button.textContent = 'Error - Try Again';
            button.disabled = false;
          }

          // Reset FAQ states
          faqItems.forEach(item => {
            if (item.classList.contains('open')) {
              const btn = item.querySelector('.faq-question');
              if (btn) btn.click();
            }
          });

          setIsGenerating(false);
        });
    }, 500);
  };

  // Get title and subtitle from the guide
  const getGuideInfo = () => {
    const element = targetRef.current;
    if (!element) return { title: '', subtitle: '' };

    const title = element.querySelector('.guide-header h1')?.textContent || 'The Ultimate Beginner\'s Guide to Running';
    const subtitle = element.querySelector('.guide-header h2')?.textContent || 'Your Journey Starts Here!';

    return { title, subtitle };
  };

  const { title, subtitle } = getGuideInfo();
  const sections = extractSections();

  return (
    <div className="download-guide">
      {/* Hidden PrintableGuide component for PDF generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <PrintableGuide
          ref={printableRef}
          sections={sections}
          title={title}
          subtitle={subtitle}
        />
      </div>

      <button
        className="download-button"
        onClick={handleDownload}
        disabled={isGenerating}
        aria-label="Download guide as PDF"
      >
        <span className="download-icon">📥</span>
        {isGenerating ? 'Preparing PDF...' : buttonText}
      </button>
    </div>
  );
}

DownloadGuide.propTypes = {
  targetRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }).isRequired,
  buttonText: PropTypes.string.isRequired,
  filename: PropTypes.string
};

export default DownloadGuide;
