import { useState } from "react";
import axiosClient from "../configs/axiosClient";

const usePatchData = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const patch = async (body) => {
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
