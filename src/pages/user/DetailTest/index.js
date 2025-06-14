import { CardDetailTest } from "../../../components/Card";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import axiosClient from "../../../configs/axiosClient";
function DetailTest() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // call api lấy thông tin bài thi
  useEffect(() => {
    const getInfoTest = async () => {
      try {
        const response = await axiosClient.get(`api/test/get-info-test/${id}`);
        if (response.status === 200 && response.data.code === 1) {
          setData(response.data?.data);
        }
      } catch (error) {
        if (error.response) {
          console.error("Lỗi khi lấy thông tin bài thi:", error.response.data);
          setError(error.response.data.message || "Không thể tải thông tin bài thi.");
        } 
      }finally{
        setLoading(false);
      }
    }
    getInfoTest();
  }, [])
  if (loading) {
    return (
      <DefaultLayout>
        <Loading />
      </DefaultLayout>
    );
  }
  if (error) {
    return (
      <DefaultLayout>
        <div className="text-red-500 text-center mt-10">
          {error}
        </div>
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <CardDetailTest info={data} />
    </DefaultLayout>
  );
}

export default DetailTest;
