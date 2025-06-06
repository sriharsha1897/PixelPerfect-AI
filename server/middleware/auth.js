/**
 * Middleware to validate API key from request headers
 */
const validateApiKey = (req, res, next) => {
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
};

module.exports = { validateApiKey }; 