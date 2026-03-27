import axios from "axios";

// Backend ka base URL - Spring Boot port 8080 pe chal raha hai
const BASE_URL = "http://localhost:8080/api";

// Axios instance banao with base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== Request Interceptor =====
// Har request ke saath automatically JWT token attach karo
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== Response Interceptor =====
// 401 Unauthorized aaye (token expire/invalid) to localStorage clear karo aur login pe bhejo
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ===== AUTH APIs =====
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser    = (data) => api.post("/auth/login", data);

// ===== PRODUCT APIs =====
export const getAllProducts = ()          => api.get("/products");
export const getProduct    = (id)         => api.get(`/products/${id}`);
export const addProduct    = (data)       => api.post("/products", data);
export const updateProduct = (id, data)   => api.put(`/products/${id}`, data);
export const deleteProduct = (id)         => api.delete(`/products/${id}`);

// ===== CART APIs =====
export const getCartItems   = ()               => api.get("/cart");
export const addToCart      = (productId, qty) => api.post("/cart", { productId, quantity: qty });
export const removeFromCart = (cartItemId)     => api.delete(`/cart/${cartItemId}`);

// ===== ORDER APIs =====
export const placeOrder        = ()              => api.post("/orders/place");
export const getMyOrders       = ()              => api.get("/orders/my");
export const getAllOrders       = ()              => api.get("/orders/all");
export const updateOrderStatus = (id, status)    => api.put(`/orders/${id}/status`, { status });

export default api;
