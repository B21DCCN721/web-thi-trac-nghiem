import { useEffect, useState } from "react";
import axiosClient from "../configs/axiosClient";

const useGetPaginationData = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosClient.get(url);
        if (response.status === 200) {
          setData(response.data.data);
          setPagination(response.data.pagination);
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
    pagination
  };
};
export default useGetPaginationData;
