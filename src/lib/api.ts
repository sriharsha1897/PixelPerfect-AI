// API configuration
const getApiBaseUrl = () => {
  if (import.meta.env.MODE === 'production') {
    return 'https://pixel-perfect-ai-one.vercel.app/api';
  }
  // Use localhost in development
  return 'http://localhost:3001/api';
};

export const API_BASE_URL = getApiBaseUrl();

// API endpoints
export const ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/contact`,
  MESSAGES: `${API_BASE_URL}/messages`,
};

// Common fetch options
export const commonFetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  }
};

// Options for authenticated endpoints
export const authenticatedFetchOptions = {
  ...commonFetchOptions,
  headers: {
    ...commonFetchOptions.headers,
    'x-api-key': import.meta.env.VITE_API_KEY || '',
  },
  credentials: 'include' as const,
}; 