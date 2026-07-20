import axios from 'axios';

// ============================================
// API CLIENT CONFIGURATION
// ============================================

// Determine API URL based on environment
const API_URL = import.meta.env.VITE_API_URL || 'https://tevanoxmovie-backend.onrender.com/api/v1';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,  // Required for CORS with credentials
});

// ============================================
// REQUEST INTERCEPTOR
// ============================================
// Adds JWT token to every request if available

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Log request in development
        if (import.meta.env.DEV) {
            console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        }
        
        return config;
    },
    (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// ============================================
// RESPONSE INTERCEPTOR
// ============================================
// Handles token refresh on 401 responses

apiClient.interceptors.response.use(
    (response) => {
        // Log response in development
        if (import.meta.env.DEV) {
            console.log(`✅ API Response: ${response.config.url}`, response.status);
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // Prevent infinite loops
        if (originalRequest._retry) {
            return Promise.reject(error);
        }
        
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                
                if (refreshToken) {
                    // Attempt to refresh the token
                    const response = await axios.post(`${API_URL}/auth/refresh`, {
                        refresh_token: refreshToken,
                    });
                    
                    const { access_token } = response.data;
                    
                    // Store new token
                    localStorage.setItem('access_token', access_token);
                    
                    // Update authorization header
                    originalRequest.headers.Authorization = `Bearer ${access_token}`;
                    
                    // Retry the original request
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed - redirect to login
                console.error('❌ Token refresh failed:', refreshError);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                
                // Redirect to login
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }
        
        // Handle other errors
        if (error.response) {
            console.error(`❌ API Error ${error.response.status}:`, error.response.data);
        } else if (error.request) {
            console.error('❌ No response from server:', error.request);
        } else {
            console.error('❌ Request error:', error.message);
        }
        
        return Promise.reject(error);
    }
);

// ============================================
// HELPER METHODS
// ============================================

/**
 * Set authentication token
 */
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('access_token', token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('access_token');
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

/**
 * Clear authentication
 */
export const clearAuth = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete apiClient.defaults.headers.common['Authorization'];
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

export default apiClient;