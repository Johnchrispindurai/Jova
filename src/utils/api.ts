import axios from 'axios';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle token refresh automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is a 401 Unauthorized and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/login' && originalRequest.url !== '/auth/register') {
      originalRequest._retry = true;
try {
  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
    {},
    { withCredentials: true }
  );

  return api(originalRequest);
} catch (refreshError) {
  return Promise.reject(refreshError);
  // Refresh token failed
}
    }
    return Promise.reject(error);
  }
);
