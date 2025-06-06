const express = require('express');
const router = express.Router();
const storage = require('../config/storage');

router.get('/', async (req, res) => {
  try {
    console.log('Fetching all messages');
    const messages = await storage.getAllMessages();
    
    console.log(`Retrieved ${messages.length} messages`);
    
    return res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = { messagesRouter: router }; 