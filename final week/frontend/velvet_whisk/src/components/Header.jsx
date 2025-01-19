// src/components/Header.jsx
import React from 'react';
import './Header.css'; // Import CSS for Header component

const Header = () => {
  return (
    <header className="header">
      <img src="/logo.png" alt="Velvet Whisk Logo" /> {/* Ensure the logo path is correct */}
      <h1>VELVET WHISK</h1>
    </header>
  );
};

export default Header;