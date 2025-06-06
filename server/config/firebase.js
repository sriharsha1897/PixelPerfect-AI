const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
      console.log('Firebase initialized successfully');
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      throw error;
    }
  }
  return admin.firestore();
};

const db = initializeFirebase();
const contactsCollection = 'contacts';

const addMessage = async (messageData) => {
  try {
    const docRef = await db.collection(contactsCollection).add({
      ...messageData,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    return { id: docRef.id, ...messageData };
  } catch (error) {
    console.error('Error adding message to Firestore:', error);
    throw error;
  }
};

const getAllMessages = async () => {
  try {
    const snapshot = await db.collection(contactsCollection)
      .orderBy('timestamp', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate()
    }));
  } catch (error) {
    console.error('Error getting messages from Firestore:', error);
    throw error;
  }
};

module.exports = {
  addMessage,
  getAllMessages
}; 