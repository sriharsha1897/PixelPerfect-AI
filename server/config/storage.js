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

let messages = [];

// Load initial messages
(async () => {
  messages = await loadMessages();
})();

const addMessage = async (messageData) => {
  try {
    const newMessage = {
      id: Date.now().toString(),
      ...messageData,
      timestamp: new Date().toISOString()
    };
    
    // Reload messages to get latest
    messages = await loadMessages();
    
    messages.push(newMessage);
    await saveMessages(messages);
    return newMessage;
  } catch (error) {
    console.error('Error adding message to storage:', error);
    throw new Error('Failed to save message to storage');
  }
};

const getAllMessages = async () => {
  try {
    // Reload messages from file to get latest
    messages = await loadMessages();
    return [...messages].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error('Error getting messages from storage:', error);
    throw new Error('Failed to retrieve messages from storage');
  }
};

module.exports = {
  addMessage,
  getAllMessages
}; 