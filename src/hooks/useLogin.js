import { useState } from "react";
import { useDispatch } from "react-redux";
import axiosClient from "../configs/axiosClient";
import { loginSuccess } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const useLogin = (url, path, role) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await axiosClient.post(url, { username, password });
      if (response.status === 200) {
        const { token } = response.data;
        dispatch(loginSuccess({ token, username, role }));
        navigate(path);
        setLoading(false);
      }
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong");
    }
  };

  return {
    loading,
    error,
    login,
  };
};

export default useLogin;
