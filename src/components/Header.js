import React from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

export const Header = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Quibble</div>
        
        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>  {/* Link to HomePage */}
          <Link to="/about" className="nav-link">About</Link>  {/* Link to AboutPage */}
        </div>
      </nav>
    </div>
  );
}
