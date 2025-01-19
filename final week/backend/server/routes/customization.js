const express = require('express');
const Customization = require('../models/Customization');
const router = express.Router();

// Submit customization details
router.post('/submit', async (req, res) => {
  const { item, weight, specifications, options } = req.body;

  try {
    // Check for existing customization
    const existingCustomization = await Customization.findOne({
      item,
      weight,
      specifications,
      options,
    });

    if (existingCustomization) {
      return res.status(400).json({ message: 'This customization already exists.' });
    }

    // If it doesn't exist, save the new customization
    const newCustomization = new Customization(req.body);
    await newCustomization.save();
    res.status(201).json({ message: 'Customization submitted successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;