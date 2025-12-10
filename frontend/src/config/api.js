// API Configuration
// In development, use proxy (empty string uses proxy from package.json)
// In production, if served from same domain, use relative paths
// Otherwise, use the full backend URL
const getApiBaseUrl = () => {
  // Check if we have an environment variable set (highest priority)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // In production build
  if (process.env.NODE_ENV === 'production') {
    // Frontend and backend are deployed separately
    // Use REACT_APP_API_URL if set, otherwise use default backend URL
    return process.env.REACT_APP_API_URL || 'https://LPurisima-server.onrender.com';
  }
  
  // In development (localhost), use empty string to leverage proxy
  // This allows the proxy in package.json to forward requests to localhost:5000
  return '';
};

const API_BASE_URL = getApiBaseUrl();

// Log API configuration for debugging (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('API Base URL:', API_BASE_URL || 'Using proxy (localhost:5000)');
}

export const API_ENDPOINTS = {
  PORTFOLIO: `${API_BASE_URL}/api/portfolio`,
  CHATBOT: `${API_BASE_URL}/api/chatbot`,
  CONTACT: `${API_BASE_URL}/api/contact`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;

