const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Ensure path is correct

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Simple manual validation
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Phone number must be 10 digits.' });
  }

  try {
    const contact = new Contact({ name, email, phone, message });
    const savedContact = await contact.save();
    console.log('Saved contact:', savedContact);
    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (err) {
    console.error('Error saving contact:', err.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
