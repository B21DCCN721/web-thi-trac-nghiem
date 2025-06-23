import axios from "axios";

// Tạo axios client sử dụng cookies
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // gửi cookies đi kèm mỗi request
});

// rawAxios để gọi refresh token riêng biệt
const rawAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

// Hàm xử lý hàng đợi các request bị lỗi 401 khi đang làm mới token
const processQueue = (error) => {
  failedQueue.forEach(({ reject }) => reject(error));
  failedQueue = [];
};
// Hàm gọi logout API
const handleLogout = async () => {
  try {
    await rawAxios.post("api/auth/logout");
    localStorage.clear();
    sessionStorage.clear();
  } catch (logoutErr) {
    console.error("Logout failed:", logoutErr);
  } finally {
    // Redirect về trang login dù logout có thành công hay không
    window.location.replace("/");
  }
};

// Interceptor xử lý lỗi response
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa retry thì xử lý làm mới phiên
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang trong quá trình làm mới token, đợi kết quả
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Gửi request làm mới phiên
        await rawAxios.post("api/auth/refresh-token");

        isRefreshing = false;

        // Retry lại request ban đầu sau khi đã làm mới token thành công
        return axiosClient(originalRequest);
      } catch (err) {
        // Nếu làm mới thất bại → chuyển hướng về trang đăng nhập
        isRefreshing = false;
        processQueue(err);
        await handleLogout();
        return Promise.reject(err);
      }
    }

    // Nếu không phải lỗi 401 → trả về lỗi như bình thường
    return Promise.reject(error);
  }
);

export default axiosClient;
