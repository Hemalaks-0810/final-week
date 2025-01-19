// src/pages/Cart.jsx
import React, { useState } from 'react';
import './Cart.css'; // Import CSS for styling

const Cart = ({ cartItems, onRemoveItem, onUpdateItemCount }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.count, 0); // Calculate total price

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                  <div className="item-count">
                    <button onClick={() => onUpdateItemCount(index, item.count - 1)} disabled={item.count <= 1}>-</button>
                    <span>{item.count}</span>
                    <button onClick={() => onUpdateItemCount(index, item.count + 1)}>+</button>
                  </div>
                  <button onClick={() => onRemoveItem(index)} className="remove-button">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3> {/* Display total price */}
            <a href="/checkout" className="checkout-button">Proceed to Checkout</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;