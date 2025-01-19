// src/pages/Menu.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import AddMenuItem from '../components/AddMenuItem'; // Removed this line

const Menu = ({ addToCart, cartItems, isVeg }) => {
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu items from the backend
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Filter menu items based on the isVeg state
  const filteredMenuItems = isVeg
    ? menuItems.filter(item => item.type === 'Veg')
    : menuItems.filter(item => item.type === 'Non-Veg');

  // Calculate total items in the cart
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.count, 0);

  return (
    <div className="menu">
      <h2>Menu</h2>
      <div className="menu-items">
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map(item => {
            // Find the item in the cart
            const cartItem = cartItems.find(cartItem => cartItem._id === item._id);
            const itemCount = cartItem ? cartItem.count : 0; // Get the count or default to 0

            return (
              <div key={item._id} className="menu-item">
                <img src={item.image} alt={item.title} className="menu-item-image" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className="weight">Weight: {item.weight}</p>
                <p className="price">₹{item.price.toFixed(2)}</p>
                <span className="item-type">{item.type}</span>
                <button onClick={() => addToCart(item)}>
                  {itemCount > 0 ? itemCount : 'Add to Cart'}
                </button>
              </div>
            );
          })
        ) : (
          <p>No menu items available.</p>
        )}
      </div>
      <div className="total-items">
        <h3>Total Items in Cart: {totalItemsInCart}</h3>
      </div>
    </div>
  );
};

export default Menu;