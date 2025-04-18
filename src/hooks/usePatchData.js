import { useState } from "react";
import axiosClient from "../configs/axiosClient";

const usePatchData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const patch = async (url, body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.patch(url, body);
      setData(response.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong");
      return null;
    }
  };

  return {
    loading,
    error,
    data,
    patch,
  };
};

export default usePatchData;
