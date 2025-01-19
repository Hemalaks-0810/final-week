import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css'; // Import the CSS file

const Contact = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact/submit', contact);
      setSuccessMessage(response.data.message); // Set success message
      // Reset form
      setContact({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact:', error);
      alert('Error: ' + error.response.data.message); // Show error message
    }
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <textarea name="message" placeholder="Message" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p>{successMessage}</p>} {/* Display success message */}
    </div>
  );
};

export default Contact;