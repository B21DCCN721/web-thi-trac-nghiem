import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../configs/axiosClient";

const useCreateAccout = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const createAccout = async (username, password, email, classUser) => {
    try {
      const response = await axiosClient.post(url, {
        username,
        password,
        email,
        classUser
      });
      if (response.status === 201 && response.data.hasOwnProperty("user")) {
        navigate("/");
        setLoading(false);
        alert("Đăng ký tài khoản thành công")
      }
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong");
    }
  };
  return {
    loading,
    error,
    createAccout,
  };
};
export default useCreateAccout;
