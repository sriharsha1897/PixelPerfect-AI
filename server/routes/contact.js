const express = require('express');
const router = express.Router();
const storage = require('../config/storage');

router.post('/', async (req, res) => {
  try {
    console.log('Received contact request:', {
      body: req.body,
      headers: req.headers,
      url: req.url
    });
    
    const { name, email, message } = req.body;
    
    // Simple validation
    if (!name || !email || !message) {
      console.log('Missing required fields:', { name, email, message });
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

    console.log('Message saved successfully:', savedMessage);

    return res.status(201).json({
      success: true,
      message: 'Contact message saved successfully',
      data: savedMessage
    });
  } catch (error) {
    console.error('Error in contact route:', {
      error,
      body: req.body,
      headers: req.headers,
      url: req.url
    });
    
    return res.status(500).json({
      success: false,
      message: 'Failed to save contact message',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = { contactRouter: router }; 