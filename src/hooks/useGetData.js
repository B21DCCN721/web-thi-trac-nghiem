import { useEffect, useState } from "react";
import axiosClient from "../configs/axiosClient";

const useGetData = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosClient.get(url);
        if (response.status === 200) {
          setData(response.data.data);
          setLoading(false);
        }
      } catch (err) {
        setError(err.response ? err.response.data : "Something went wrong");
      }
    };
    let timerId = setTimeout(() => {
      getData(); 
    }, 200); 
    return () => clearTimeout(timerId);
  }, [url]);
  return {
    loading,
    error,
    data,
  };
};
export default useGetData;
