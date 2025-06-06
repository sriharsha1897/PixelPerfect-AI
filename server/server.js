require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { contactRouter } = require('./routes/contact');
const { messagesRouter } = require('./routes/messages');

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
})); // Security headers
app.use(morgan('combined')); // Request logging

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  next();
});

// Updated CORS configuration
app.use(cors({
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

// Body parsing middleware
app.use(express.json());

// Global middleware to handle API key
app.use((req, res, next) => {
  // Skip API key check for OPTIONS requests and non-API routes
  if (req.method === 'OPTIONS' || !req.path.startsWith('/api/')) {
    return next();
  }

  // Skip API key check for contact form submissions and message retrieval
  if ((req.path === '/api/contact' && req.method === 'POST') ||
      (req.path === '/api/messages' && req.method === 'GET')) {
    return next();
  }

  const apiKey = req.header('x-api-key');
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key is required'
    });
  }

  if (apiKey !== process.env.API_SECRET_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Invalid API key'
    });
  }

  next();
});

// Routes
app.use('/api/contact', contactRouter);
app.use('/api/messages', messagesRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    headers: req.headers
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.url);
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Export for Vercel
module.exports = app;