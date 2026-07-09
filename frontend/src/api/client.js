import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (name, email, password) => 
    apiClient.post('/auth/register', { name, email, password }),
  login: (email, password) => 
    apiClient.post('/auth/login', { email, password }),
  getProfile: () => 
    apiClient.get('/auth/profile'),
};

// Product APIs
export const productAPI = {
  getProducts: (category, search, limit, offset) => 
    apiClient.get('/products', { params: { category, search, limit, offset } }),
  getProduct: (id) => 
    apiClient.get(`/products/${id}`),
  getCategories: () => 
    apiClient.get('/products/categories'),
};

// Cart APIs
export const cartAPI = {
  getCart: () => 
    apiClient.get('/cart'),
  addToCart: (productId, quantity) => 
    apiClient.post('/cart/add', { productId, quantity }),
  updateCartItem: (cartItemId, quantity) => 
    apiClient.put('/cart/update', { cartItemId, quantity }),
  removeFromCart: (cartItemId) => 
    apiClient.delete('/cart/remove', { data: { cartItemId } }),
};

// Order APIs
export const orderAPI = {
  checkout: (shippingAddress, paymentMethod) => 
    apiClient.post('/orders/checkout', { shippingAddress, paymentMethod }),
  getOrders: () => 
    apiClient.get('/orders'),
  getOrder: (id) => 
    apiClient.get(`/orders/${id}`),
};

export default apiClient;
