import React, { useState } from 'react';
import axios from 'axios';
import './Customize.css'; // Import the CSS file

const Customize = () => {
  const [customization, setCustomization] = useState({
    item: '',
    weight: '',
    specifications: '',
    options: 'Veg', // Default to Veg
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomization({ ...customization, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/customization/submit', customization);
      alert(response.data.message); // Show success message
      // Reset form
      setCustomization({
        item: '',
        weight: '',
        specifications: '',
        options: 'Veg', // Reset to default Veg
        name: '',
        email: '',
      });
    } catch (error) {
      console.error('Error submitting customization:', error);
      alert('Error: ' + error.response.data.message); // Show error message
    }
  };

  return (
    <div className="customize">
      <h2>Customize Your Order</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="item" placeholder="Item" onChange={handleChange} required />
        <input type="text" name="weight" placeholder="Weight" onChange={handleChange} required />
        <input type="text" name="specifications" placeholder="Specifications" onChange={handleChange} required />
        <select name="options" value={customization.options} onChange={handleChange}>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
        <button type="submit">Submit Customization</button>
      </form>
    </div>
  );
};

export default Customize;