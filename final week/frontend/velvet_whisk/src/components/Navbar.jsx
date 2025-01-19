// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../assets/cart.png'; // Adjust the path based on where you place your cart image

const Navbar = ({ isVeg, setIsVeg, cartItems }) => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/customize">Customize</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li>
          <Link to="/cart">
            <img src={cartIcon} alt="Cart" className="cart-icon" /> ({cartItems.length})
          </Link>
        </li>
      </ul>
      <div className="toggle-button">
        <button onClick={() => setIsVeg(true)} className={isVeg ? 'active' : ''}>
          Veg
        </button>
        <button onClick={() => setIsVeg(false)} className={!isVeg ? 'active' : ''}>
          Non-Veg
        </button>
      </div>
    </nav>
  );
};

export default Navbar;