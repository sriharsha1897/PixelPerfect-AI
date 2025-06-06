const fs = require('fs').promises;
const path = require('path');

const STORAGE_FILE = path.join(__dirname, '../data/messages.json');

// Ensure the data directory exists
const ensureDataDirectory = async () => {
  const dataDir = path.dirname(STORAGE_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Load messages from file
const loadMessages = async () => {
  try {
    await ensureDataDirectory();
    try {
      const data = await fs.readFile(STORAGE_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist, return empty array
        return [];
      }
      throw error;
    }
  } catch (error) {
    console.error('Error loading messages:', error);
    return [];
  }
};

// Save messages to file
const saveMessages = async (messages) => {
  try {
    await ensureDataDirectory();
    await fs.writeFile(STORAGE_FILE, JSON.stringify(messages, null, 2));
  } catch (error) {
    console.error('Error saving messages:', error);
    throw new Error('Failed to save message to storage');
  }
};

// In-memory storage for messages
let messages = [];

// Load initial messages
(async () => {
  messages = await loadMessages();
})();

const addMessage = async (messageData) => {
  try {
    console.log('Adding message:', messageData);

    // Validate message data
    if (!messageData || typeof messageData !== 'object') {
      throw new Error('Invalid message data');
    }

    const { name, email, message } = messageData;
    if (!name || !email || !message) {
      throw new Error('Missing required fields');
    }

    const newMessage = {
      id: Date.now().toString(),
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
      timestamp: new Date().toISOString()
    };
    
    messages.push(newMessage);
    console.log('Message added successfully:', newMessage);
    return newMessage;
  } catch (error) {
    console.error('Error adding message:', {
      error,
      messageData
    });
    throw new Error(`Failed to save message: ${error.message}`);
  }
};

const getAllMessages = async () => {
  try {
    return [...messages].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error('Error getting messages:', error);
    throw new Error('Failed to retrieve messages');
  }
};

module.exports = {
  addMessage,
  getAllMessages
}; 