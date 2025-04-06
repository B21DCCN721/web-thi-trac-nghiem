import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để tự động thêm token
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
