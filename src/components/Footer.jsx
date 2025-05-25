// src/components/Footer.jsx
// No 'import React from "react";' needed for modern Vite/React
import { Link } from 'react-router-dom';
import ShareButton from './ShareButton';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-left">
        {/* Left section - empty for now */}
      </div>
      <div className="footer-center">
        <div className="footer-links">
          <Link to="/privacy-policy/" className="footer-link">Privacy Policy</Link>
          <Link to="/terms-and-conditions/" className="footer-link">Terms & Conditions</Link>
        </div>
        <p>© {new Date().getFullYear()} Alt.Run. All rights reserved.</p>
      </div>
      <div className="footer-right">
        <ShareButton
          title="Alt.Run - Alternative Running Events"
          text="Discover unique running events worldwide at Alt.Run"
        />
      </div>
    </footer>
  );
}

export default Footer; // Make sure this line is present and correct