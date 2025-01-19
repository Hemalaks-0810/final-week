// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddMenuItem from '../components/AddMenuItem';
import './Admin.css';

const Admin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemWeight, setItemWeight] = useState('');
  const [itemType, setItemType] = useState('');

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

  // Select an item by its name
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setItemTitle(item.title);
    setItemDescription(item.description);
    setItemImage(item.image);
    setItemPrice(item.price);
    setItemWeight(item.weight);
    setItemType(item.type);
  };

// Update item details
const updateItem = async (event) => {
  event.preventDefault();
  if (!selectedItem) {
    console.error('No item selected');
    return;
  }
  console.log('Selected item ID:', selectedItem._id);
  try {
    const response = await axios.put(`http://localhost:5000/api/menu/update/${selectedItem._id}`, {
      title: itemTitle,
      description: itemDescription,
      image: itemImage,
      price: itemPrice,
      weight: itemWeight,
      type: itemType,
    });
    console.log('Item updated:', response.data);
    fetchMenuItems();
  } catch (error) {
    console.error('Error updating item:', error);
    if (error.response.status === 404) {
      console.error('Item not found');
      // You can also display an error message to the user here
      alert('Item not found');
    }
  }
};
  // Delete an item
  const deleteItem = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/menu/remove/${selectedItem._id}`);
      console.log('Item deleted:', response.data);
      fetchMenuItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>
      <AddMenuItem />
      <h3>Menu Items</h3>
      <ul>
        {menuItems.map((item) => (
          <li key={item._id}>
            <h4>{item.title}</h4>
            <button onClick={() => handleSelectItem(item)}>Select</button>
          </li>
        ))}
      </ul>
      {selectedItem && (
        <div>
          <h3>Selected Item: {selectedItem.title}</h3>
          <form onSubmit={updateItem}>
            <input
              type="text"
              value={itemTitle}
              onChange={(event) => setItemTitle(event.target.value)}
              placeholder="Update title"
            />
            <input
              type="text"
              value={itemDescription}
              onChange={(event) => setItemDescription(event.target.value)}
              placeholder="Update description"
            />
            <input
              type="text"
              value={itemImage}
              onChange={(event) => setItemImage(event.target.value)}
              placeholder="Update image"
            />
            <input
              type="number"
              value={itemPrice}
              onChange={(event) => setItemPrice(event.target.value)}
              placeholder="Update price"
            />
            <input
              type="text"
              value={itemWeight}
              onChange={(event) => setItemWeight(event.target.value)}
              placeholder="Update weight"
            />
            <input
              type="text"
              value={itemType}
              onChange={(event) => setItemType(event.target.value)}
              placeholder="Update type"
            />
            <button type="submit">Update</button>
            <button onClick={deleteItem}>Delete</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;