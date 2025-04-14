import { useState } from "react";
import axiosClient from "../configs/axiosClient";

const useDeletaData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const deleteData = async (url) => {
    setLoading(true);
    setLoading(null);
    try {
      const response = await axiosClient.delete(url);
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
    deleteData,
  };
};

export default useDeletaData;
