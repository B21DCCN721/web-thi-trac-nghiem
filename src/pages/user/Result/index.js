import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../../layouts/DefaultLayout";
import Pagination from "../../../components/Pagination";
import Button from "../../../components/Button";
import {useState, useEffect } from "react";
import formatDate from "../../../helpers/fomatDate";
import axiosClient from "../../../configs/axiosClient";
import Loading from "../../../components/Loading";

function Result() {
  useEffect(() => {
    document.title = "Result";
  }, []);
  const [limit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleClickDetail = (id) => {
    navigate(`/result/${id}`);
  };
  // call api lấy danh sách bài thi đã làm
  useEffect(() => {
    const getListSubmission = async () => {
      try {
        const response = await axiosClient.get("api/test/get-submissions", {
          params: {
            page: currentPage,
            limit: limit,
          },
        });
        if (response.status === 200 && response.data.code === 1) {
          setData(response.data?.data);
        }
      } catch (error) {
        if (error.response) {
          console.error("Lỗi khi lấy danh sách bài thi đã làm:", error.response.data);
          setError(error.response.data.message || "Không thể tải danh sách bài thi đã làm.");
        }
      } finally {
        setLoading(false);
      }
    }
    getListSubmission();
  },[currentPage, limit]);
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
      <h1 className="text-2xl text-gray-500 font-bold">
        Danh sách bài thi đã làm
      </h1>
      <div className="mt-5">
          <table className="w-full table-auto text-center border rounded-lg divide-y divide-solid shadow-md">
            <thead className="">
              <tr>
                <th className="py-2">Tên bài thi</th>
                <th className="py-2">Mã bài</th>
                <th className="py-2">Thời gian nộp</th>
                <th className="py-2">Điểm</th>
                <th className="py-2">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {data.submissions.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-200" : ""}`}
                >
                  <td className="py-3">
                    {item.Test.title}
                  </td>
                  <td className="py-3">
                    {item.Test.code}
                  </td>
                  <td className="py-3">
                    {formatDate(item.submitted_at)}
                  </td>
                  <td className="py-3">
                    {item.score}
                  </td>
    
                  <td>
                    <Button onClick={() => handleClickDetail(item.id)}>
                      Xem chi tiết
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            totalItems={data.pagination.total}
            itemsPerPage={limit}
            onPageChange={(page) => setCurrentPage(page)}
          />
      </div>
    </DefaultLayout>
  );
}

export default Result;
