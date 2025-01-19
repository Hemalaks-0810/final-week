const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// Add a new menu item
router.post('/add', async (req, res) => {
  const newItem = new MenuItem(req.body);
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove a menu item
router.delete('/remove/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// backend/server/routes/menu.js
router.put('/update/:id', async (req, res) => {
  try {
    console.log('Update request received for item with ID:', req.params.id);
    const id = req.params.id;
    const menuItem = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!menuItem) {
      console.error('Item not found');
      res.status(404).json({ message: 'Item not found' });
    } else {
      console.log('Menu item updated:', menuItem);
      res.status(200).json(menuItem);
    }
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;