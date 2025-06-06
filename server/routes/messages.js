const express = require('express');
const router = express.Router();
const { validateApiKey } = require('../middleware/auth');

// Choose your storage implementation
const storage = process.env.USE_FIREBASE === 'true' 
  ? require('../config/firebase')
  : require('../config/storage');

router.get('/', validateApiKey, async (req, res) => {
  try {
    const messages = await storage.getAllMessages();
    
    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Error in messages route:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages'
    });
  }
});

module.exports = { messagesRouter: router }; 