const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Submit contact details
router.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Check for existing contact with the same name and email
    const existingContact = await Contact.findOne({ name, email });

    if (existingContact) {
      return res.status(400).json({ message: 'This contact already exists.' });
    }

    // If it doesn't exist, save the new contact
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'We will reach out to you soon!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;