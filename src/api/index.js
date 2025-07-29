// API configuration and utilities for the Hedeya frontend

const API_BASE_URL = 'http://localhost:3001/api';

// API utility functions
export const api = {
  // Base fetch wrapper with error handling
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    const token = localStorage.getItem('hedeya_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  // GET request
  async get(endpoint) {
    return this.request(endpoint);
  },

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  },
};

// Product API functions
export const productApi = {
  // Get all products with optional filters
  async getProducts(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const query = queryParams.toString();
    return api.get(`/products${query ? `?${query}` : ''}`);
  },

  // Get product by ID
  async getProduct(id) {
    return api.get(`/products/${id}`);
  },

  // Get products by category
  async getProductsByCategory(category) {
    return api.get(`/products/category/${category}`);
  },

  // Get products by age group
  async getProductsByAge(ageGroup) {
    return api.get(`/products/age/${ageGroup}`);
  },

  // Update product stock (admin)
  async updateStock(productId, quantity) {
    return api.post(`/products/${productId}/stock`, { quantity });
  },
};

// Order API functions
export const orderApi = {
  // Create new order
  async createOrder(orderData) {
    return api.post('/orders', orderData);
  },

  // Get order by ID
  async getOrder(orderId) {
    return api.get(`/orders/${orderId}`);
  },

  // Track order by tracking number
  async trackOrder(trackingNumber) {
    return api.get(`/orders/tracking/${trackingNumber}`);
  },

  // Update order status (admin)
  async updateOrderStatus(orderId, status) {
    return api.put(`/orders/${orderId}/status`, { status });
  },

  // Get all orders (admin)
  async getAllOrders(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const query = queryParams.toString();
    return api.get(`/orders${query ? `?${query}` : ''}`);
  },
};

// Authentication API functions
export const authApi = {
  // Register new user
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    
    // Store token if registration successful
    if (response.success && response.data.token) {
      localStorage.setItem('hedeya_token', response.data.token);
      localStorage.setItem('hedeya_user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  // User login
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    
    // Store token if login successful
    if (response.success && response.data.token) {
      localStorage.setItem('hedeya_token', response.data.token);
      localStorage.setItem('hedeya_user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  // Verify token
  async verifyToken(token) {
    return api.post('/auth/verify-token', { token });
  },

  // Refresh token
  async refreshToken(token) {
    const response = await api.post('/auth/refresh-token', { token });
    
    // Update stored token if refresh successful
    if (response.success && response.data.token) {
      localStorage.setItem('hedeya_token', response.data.token);
    }
    
    return response;
  },

  // Logout
  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      // Remove token and user data regardless of API response
      localStorage.removeItem('hedeya_token');
      localStorage.removeItem('hedeya_user');
    }
  },

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('hedeya_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is logged in
  isLoggedIn() {
    return !!localStorage.getItem('hedeya_token');
  },
};

// User API functions
export const userApi = {
  // Get user profile
  async getProfile() {
    return api.get('/users/profile');
  },

  // Update user profile
  async updateProfile(profileData) {
    return api.put('/users/profile', profileData);
  },

  // Change password
  async changePassword(passwordData) {
    return api.put('/users/change-password', passwordData);
  },

  // Get user orders
  async getOrders(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const query = queryParams.toString();
    return api.get(`/users/orders${query ? `?${query}` : ''}`);
  },

  // Get user addresses
  async getAddresses() {
    return api.get('/users/addresses');
  },

  // Add new address
  async addAddress(addressData) {
    return api.post('/users/addresses', addressData);
  },

  // Update address
  async updateAddress(addressId, addressData) {
    return api.put(`/users/addresses/${addressId}`, addressData);
  },

  // Delete address
  async deleteAddress(addressId) {
    return api.delete(`/users/addresses/${addressId}`);
  },

  // Get wishlist
  async getWishlist() {
    return api.get('/users/wishlist');
  },

  // Add to wishlist
  async addToWishlist(productId) {
    return api.post(`/users/wishlist/${productId}`);
  },

  // Remove from wishlist
  async removeFromWishlist(productId) {
    return api.delete(`/users/wishlist/${productId}`);
  },
};

// System API functions
export const systemApi = {
  // Health check
  async healthCheck() {
    return api.get('/health');
  },

  // Get API info
  async getApiInfo() {
    return api.get('');
  },
};

// Helper functions for common operations
export const helpers = {
  // Format price for display
  formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  },

  // Format date
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  // Calculate order total with tax and shipping
  calculateOrderTotal(items) {
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 75 ? 0 : 9.99; // Free shipping over $75
    
    return {
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping: Math.round(shipping * 100) / 100,
      total: Math.round((subtotal + tax + shipping) * 100) / 100,
    };
  },

  // Validate email format
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Generate random ID for cart items
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },
};

export default {
  api,
  productApi,
  orderApi,
  authApi,
  userApi,
  systemApi,
  helpers,
};
