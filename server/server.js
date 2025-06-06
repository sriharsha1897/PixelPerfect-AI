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

// Development middleware to automatically add API key
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    req.headers['x-api-key'] = process.env.API_SECRET_KEY;
    next();
  });
}

// Routes - Note the change in route paths for Vercel
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