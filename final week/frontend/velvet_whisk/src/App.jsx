// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Customize from './pages/Customize';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Admin from './pages/Admin'; 
import CheckoutForm from './pages/checkout'; 

function App() {
  const [cartItems, setCartItems] = useState([]); // State to manage cart items
  const [isVeg, setIsVeg] = useState(true); // State to track Veg/Non-Veg selection

  // Function to add items to the cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem._id === item._id);
      if (existingItemIndex > -1) {
        // Item already in cart, increment the count
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].count += 1; // Increment count
        return updatedItems;
      } else {
        // Item not in cart, add it with count 1
        return [...prevItems, { ...item, count: 1 }];
      }
    });
  };

  // Function to update item count in the cart
  const onUpdateItemCount = (index, newCount) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].count = newCount;
    setCartItems(updatedCartItems);
  };

  // Function to remove item from the cart
  const onRemoveItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  // Function to handle checkout
  const onCheckout = (checkoutDetails) => {
    console.log('Checkout details:', checkoutDetails);
    // Implement logic to handle checkout here
  };

  return (
    <div className="App">
      <Header />
      <Navbar setIsVeg={setIsVeg} cartItems={cartItems} isVeg={isVeg} /> {/* Pass setIsVeg and cartItems to Navbar */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} cartItems={cartItems} isVeg={isVeg} />} /> {/* Pass props to Menu */}
          <Route path="/customize" element={<Customize />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveItem={onRemoveItem} onUpdateItemCount={onUpdateItemCount} onCheckout={onCheckout} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/checkout" element={<CheckoutForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;