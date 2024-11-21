import axios from 'axios';

// Construct dynamic base URL
const baseURL =
  typeof window !== 'undefined' // Check if running in a browser
    ? `${window.location.origin}${process.env.NEXT_PUBLIC_API_BASE_PATH || '/api'}`
    : `${process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000'}${process.env.NEXT_PUBLIC_API_BASE_PATH || '/api'}`;

// Create a base Axios instance
const apiClient = axios.create({
  baseURL,                                      // Use dynamically constructed base URL
  timeout: 10000,                               // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',         // Default headers
  },
});

// Request interceptor (optional)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Example for adding auth token
    if (token) {
      config.headers = config.headers || {}; // Ensure headers is an object
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Response interceptor (optional)
apiClient.interceptors.response.use(
  (response) => response, // Handle successful responses
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access globally
      console.error('Unauthorized access - redirecting to login');
    }
    return Promise.reject(error); // Pass the error down
  }
);

export default apiClient;
