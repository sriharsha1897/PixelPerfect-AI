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
    const data = await fs.readFile(STORAGE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty array
    return [];
  }
};

// Save messages to file
const saveMessages = async (messages) => {
  await ensureDataDirectory();
  await fs.writeFile(STORAGE_FILE, JSON.stringify(messages, null, 2));
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
      timestamp: new Date()
    };
    messages.push(newMessage);
    await saveMessages(messages);
    return newMessage;
  } catch (error) {
    console.error('Error adding message to storage:', error);
    throw error;
  }
};

const getAllMessages = async () => {
  try {
    // Reload messages from file to get latest
    messages = await loadMessages();
    return [...messages].sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error getting messages from storage:', error);
    throw error;
  }
};

module.exports = {
  addMessage,
  getAllMessages
}; 