import React from 'react'
import { Image } from '@mantine/core'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

export const Header = () => {
  return (
    <div>
      <Image src="/quibble.jpg" alt="logo" />
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
