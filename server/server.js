require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { contactRouter } = require('./routes/contact');
const { messagesRouter } = require('./routes/messages');

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Request logging

// Updated CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow all vercel.app subdomains and localhost
    if (!origin || 
        origin.match(/^https:\/\/.*\.vercel\.app$/) ||
        origin.match(/^http:\/\/localhost:[0-9]+$/)) {
      return callback(null, true);
    }
    
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Add OPTIONS handling for preflight requests
app.options('*', cors());

app.use(express.json());

// Global middleware to handle API key
app.use((req, res, next) => {
  // Skip API key check for OPTIONS requests and non-API routes
  if (req.method === 'OPTIONS' || !req.path.startsWith('/api/')) {
    return next();
  }

  // Skip API key check for contact form submissions
  if (req.path === '/api/contact' && req.method === 'POST') {
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
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Export for Vercel
module.exports = app;