// src/components/AddMenuItem.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './AddMenuItem.css'; // Import CSS for styling

const AddMenuItem = ({ fetchMenuItems }) => {
  const [menuItem, setMenuItem] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    type: 'Veg', // Default to Veg
    weight: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/menu/add', menuItem);
      console.log('Menu item added:', response.data);
      fetchMenuItems(); // Refresh the menu items after adding
      // Reset form after successful submission
      setMenuItem({
        title: '',
        description: '',
        image: '',
        price: '',
        type: 'Veg', // Reset to default Veg
        weight: '',
      });
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  return (
    <div className="add-menu-item">
      <h2>Add New Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={menuItem.title} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={menuItem.description} onChange={handleChange} required />
        <input type="text" name ="image" placeholder="Image URL" value={menuItem.image} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={menuItem.price} onChange={handleChange} required />
        <input type="text" name="weight" placeholder="Weight" value={menuItem.weight} onChange={handleChange} required />
        
        <select name="type" value={menuItem.type} onChange={handleChange}>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
        
        <button type="submit">Add Menu Item</button>
      </form>
    </div>
  );
};

export default AddMenuItem;