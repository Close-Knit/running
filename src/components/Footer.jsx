// src/components/Footer.jsx
// No 'import React from "react";' needed for modern Vite/React

function Footer() {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} Alt.Run. All rights reserved.</p>
      {/* You can add more links or info here later if needed */}
    </footer>
  );
}

export default Footer; // Make sure this line is present and correct