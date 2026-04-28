// import axios from 'axios';

// const API = axios.create({
//   // This is your backend URL
//   baseURL: 'http://localhost:5000/api', 
// });

// // This "Interceptor" automatically attaches your token to every request
// // so you don't have to manually add it in every component.
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;

import axios from 'axios';
import toast from 'react-hot-toast';

const API = axios.create({
  // This is your backend URL
  baseURL: 'http://localhost:5000/api', 
});

// REQUEST INTERCEPTOR: Attaches the token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE INTERCEPTOR: Handles global feedback
API.interceptors.response.use(
  (response) => {
    // Optional: You can toast success messages here if your backend 
    // sends a "message" field on successful POST/PUT/DELETE requests.
    return response;
  },
  (error) => {
    // 1. Extract the message from the backend error or use a fallback
    const message = error.response?.data?.message || "A network error occurred";

    // 2. Handle specific status codes
    if (error.response?.status === 401) {
      // If unauthorized, clear local storage and perhaps redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // We don't toast 401s usually because the ProtectedRoute will handle the jump to /login
    } else {
      // 3. Display the error toast for everything else (500, 400, 403, 404, etc.)
      toast.error(message, {
        id: 'global-api-error', // Prevents multiple popups if many requests fail at once
        style: {
          fontSize: '10px',
          fontWeight: '900',
          textTransform: 'uppercase',
          border: '1px solid #fee2e2'
        }
      });
    }

    return Promise.reject(error);
  }
);

export default API;