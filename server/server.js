const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Check if production build exists
const FRONTEND_BUILD_PATH = path.join(__dirname, '../build/index.html');
const IS_PRODUCTION = fs.existsSync(FRONTEND_BUILD_PATH) || process.env.RENDER === 'true';

// Portfolio data
const PORTFOLIO_DATA = {
  "about": {
    "name": "John Louie N. Purisima",
    "title": "Full Stack Developer",
    "description": "Passionate developer with expertise in React, JavaScript, Node.js, and modern web technologies. I love creating innovative solutions and learning new technologies.",
    "image": "/images/profile.jpg",
    "skills": [
      "JavaScript", "React", "Node.js", "Express", "PHP",
      "HTML/CSS", "Git", "SQL", "MySQL", "TypeScript"
    ]
  },
  "projects": [
    {
      "id": 1,
      "title": "Portfolio Website",
      "description": "Personal portfolio website built with React frontend and Node.js Express backend",
      "technologies": ["React", "JavaScript", "Node.js", "Express", "CSS"],
      "image": "/images/portfolio.jpg",
      "github": "https://github.com/Johnlouiee/portfolio",
      "demo": "https://johnlouiee.github.io/portfolio"
    },
    {
      "id": 2,
      "title": "User Management System",
      "description": "user management system for the students",
      "technologies": ["javascript", "typescript", "MySQL", "HTML", "CSS"],
      "image": "/images/student-mgmt.jpg",
      "github": "https://github.com/Johnlouiee/FINAL-INTPROG.git",
      "demo": "https://my-final-louie02.web.app/"
    },
    {
      "id": 3,
      "title": "Sit-In Program",
      "description": "Sit-In Program for the students of University of Cebu",
      "technologies": ["PHP", "MySQL"],
      "image": "/images/ecommerce.jpg",
      "github": "https://github.com/Johnlouiee/SYSARCH",
      "demo": "https://github.com/Johnlouiee/SYSARCH"
    },
    {
      "id": 4,
      "title": "eGrowtify",
      "description": "Real-time weather application with location-based forecasts and weather alerts",
      "technologies": ["JavaScript", "HTML", "CSS", "API Integration"],
      "image": "/images/weather-app.jpg",
      "github": "https://github.com/Johnlouiee/weather-app",
      "demo": "https://weather-app-demo.vercel.app"
    }
  ],
  "experience": [
    {
      "institution": "University of Cebu",
      "degree": "Bachelor of Science in Information Technology (BSIT)",
      "year": "4th Year Student",
      "duration": "2020 - 2024",
      "description": "Currently pursuing my degree in Information Technology with focus on software development, web technologies, and database management."
    }
  ]
};

// Serve frontend in production only
if (IS_PRODUCTION) {
  // Serve React app for all non-API routes
  app.get('*', (req, res, next) => {
    // Don't serve frontend for API routes
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
} else {
  // In development, just show API info
  app.get('/', (req, res) => {
    if (req.query.format === 'json' || req.headers.accept?.includes('application/json')) {
      return res.json({
        message: 'Portfolio API is running!',
        version: '1.0.0',
        endpoints: {
          portfolio: '/api/portfolio',
          contact: '/api/contact',
          chatbot: '/api/chatbot',
          health: '/api/health'
        },
        status: 'healthy',
        mode: 'development'
      });
    }
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Portfolio API - Development</title></head>
      <body>
        <h1>Portfolio API - Development Mode</h1>
        <p>API is running. Frontend should be running separately on localhost:3000</p>
        <p><a href="/?format=json">View JSON API Info</a></p>
      </body>
      </html>
    `);
  });
}

// API Routes
app.get('/api/portfolio', (req, res) => {
  res.json(PORTFOLIO_DATA);
});

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Here you would typically send an email
    // For now, we'll just log the message
    console.log('Contact form submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    
    res.json({ message: 'Thank you for your message! I will get back to you soon.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', message: 'Portfolio API is running' });
});

// Chatbot endpoint with Flowise integration
app.post('/api/chatbot', async (req, res) => {
  try {
    const userMessage = req.body.message || '';
    
    if (!userMessage.trim()) {
      return res.status(400).json({ 
        error: 'Message is required',
        timestamp: new Date().toISOString()
      });
    }
    
    // Get conversation history if provided
    const conversationHistory = req.body.history || [];
    
    // Flowise configuration
    let FLOWISE_API_URL = process.env.FLOWISE_API_URL || 'https://flowise.your-domain.com';
    const FLOWISE_CHATFLOW_ID = process.env.FLOWISE_CHATFLOW_ID;
    const FLOWISE_API_KEY = process.env.FLOWISE_API_KEY; // Optional, if Flowise requires authentication
    
    if (!FLOWISE_CHATFLOW_ID) {
      return res.status(500).json({ 
        error: 'Flowise chatflow ID is not configured. Please set FLOWISE_CHATFLOW_ID in environment variables.',
        timestamp: new Date().toISOString()
      });
    }
    
    // Clean up the API URL - remove trailing slash and any existing API paths
    FLOWISE_API_URL = FLOWISE_API_URL.trim();
    if (FLOWISE_API_URL.endsWith('/')) {
      FLOWISE_API_URL = FLOWISE_API_URL.slice(0, -1);
    }
    
    // Remove any existing /api/v1/prediction path if user accidentally included it
    if (FLOWISE_API_URL.includes('/api/v1/prediction')) {
      FLOWISE_API_URL = FLOWISE_API_URL.split('/api/v1/prediction')[0];
    }
    
    // Prepare Flowise API request
    // Flowise API format: POST /api/v1/prediction/{chatflowId}
    const flowiseEndpoint = `${FLOWISE_API_URL}/api/v1/prediction/${FLOWISE_CHATFLOW_ID}`;
    
    console.log('Flowise endpoint:', flowiseEndpoint); // Debug log
    
    // Convert conversation history to Flowise format
    // Flowise expects history in format: [{ question: string, answer: string }]
    const flowiseHistory = conversationHistory
      .filter((msg, index) => {
        // Pair user and assistant messages
        return index < conversationHistory.length - 1;
      })
      .reduce((acc, msg, index) => {
        if (msg.role === 'user' && conversationHistory[index + 1]?.role === 'assistant') {
          acc.push({
            question: msg.content,
            answer: conversationHistory[index + 1].content
          });
        }
        return acc;
      }, []);
    
    // Prepare request body for Flowise
    const flowiseRequestBody = {
      question: userMessage,
      history: flowiseHistory,
      overrideConfig: {}
    };
    
    // Prepare headers
    const headers = {
      'Content-Type': 'application/json'
    };
    
    // Add API key if provided
    if (FLOWISE_API_KEY) {
      headers['Authorization'] = `Bearer ${FLOWISE_API_KEY}`;
    }
    
    try {
      // Call Flowise API
      const flowiseResponse = await axios.post(
        flowiseEndpoint,
        flowiseRequestBody,
        { headers }
      );
      
      // Check if response is HTML (wrong endpoint)
      const contentType = flowiseResponse.headers['content-type'] || '';
      const responseData = flowiseResponse.data;
      const isHtmlResponse = contentType.includes('text/html') || 
                            (typeof responseData === 'string' && responseData.trim().startsWith('<!DOCTYPE html>'));
      
      if (isHtmlResponse) {
        throw new Error('Flowise API returned HTML instead of JSON. Your FLOWISE_API_URL is pointing to the UI instead of the API. Make sure your URL is correct (e.g., https://your-flowise-instance.com, not https://your-flowise-instance.com/chatflow/...)');
      }
      
      // Extract response from Flowise
      // Flowise typically returns: { text: string } or { answer: string }
      const flowiseAnswer = responseData?.text || 
                            responseData?.answer || 
                            responseData?.response ||
                            (typeof responseData === 'string' && !responseData.includes('<!DOCTYPE') ? responseData : null) ||
                            responseData;
      
      if (flowiseAnswer && typeof flowiseAnswer === 'string') {
        return res.json({
          response: flowiseAnswer,
          timestamp: new Date().toISOString()
        });
      } else if (flowiseAnswer) {
        return res.json({
          response: JSON.stringify(flowiseAnswer),
          timestamp: new Date().toISOString()
        });
      } else {
        throw new Error('Invalid response format from Flowise');
      }
    } catch (flowiseError) {
      console.error('Flowise API Error:', flowiseError.response?.data || flowiseError.message);
      console.error('Flowise endpoint attempted:', flowiseEndpoint);
      
      // Check if response is HTML (wrong URL)
      const errorResponse = flowiseError.response?.data;
      const isHtmlResponse = typeof errorResponse === 'string' && errorResponse.includes('<!DOCTYPE html>');
      
      let errorMessage = 'Failed to get response from Flowise.';
      if (isHtmlResponse) {
        errorMessage = 'Flowise API returned HTML instead of JSON. Your FLOWISE_API_URL might be pointing to the UI instead of the API. Make sure it\'s the correct API endpoint URL.';
      } else if (flowiseError.response?.status === 404) {
        errorMessage = 'Flowise chatflow not found. Please check your FLOWISE_CHATFLOW_ID.';
      } else if (flowiseError.response?.status === 401 || flowiseError.response?.status === 403) {
        errorMessage = 'Flowise authentication failed. Please check your FLOWISE_API_KEY.';
      }
      
      // Return error response
      return res.status(flowiseError.response?.status || 500).json({
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? {
          message: flowiseError.message,
          endpoint: flowiseEndpoint,
          status: flowiseError.response?.status
        } : undefined,
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Sorry, I encountered an error. Please try again.' });
  }
});

// Error handler for 404
if (!IS_PRODUCTION) {
  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Mode: ${IS_PRODUCTION ? 'Production' : 'Development'}`);
});
