const express = require('express');
const router = express.Router();
const { validateContact } = require('../middleware/validation');

// Choose your storage implementation
const storage = process.env.USE_FIREBASE === 'true' 
  ? require('../config/firebase')
  : require('../config/storage');

router.post('/', validateContact, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    const savedMessage = await storage.addMessage({
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: 'Contact message saved successfully',
      data: savedMessage
    });
  } catch (error) {
    console.error('Error in contact route:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save contact message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = { contactRouter: router }; 