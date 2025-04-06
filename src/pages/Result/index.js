import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../Layouts/DefaultLayout";
import Pagination from "../../components/Pagination";
import Button from "../../components/Button";
import {useState, useEffect } from "react";
import useGetPaginationData from "../../hooks/useGetPaginationData";
import Loading from "../../components/Loading";
import formatDate from "../../helpers/fomatDate";

function Result() {
  useEffect(() => {
    document.title = "Result";
  }, []);
    const [limit] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
  const apiResultTests = useGetPaginationData(`/test/history?limit=${limit}&page=${currentPage}`);
  const navigate = useNavigate();
  const handleClickDetail = (id) => {
    navigate(`/ketqua/${id}`);
  };
  if (apiResultTests.data === null || apiResultTests.loading === true) {
    return (
      <DefaultLayout>
        <Loading />
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <h1 className="text-2xl text-gray-500 font-bold ml-5 mt-5">
        Danh sách bài thi đã làm
      </h1>
      <div className="mt-5 mx-3">
          <table className="w-full table-auto text-center border rounded-lg divide-y divide-solid shadow-md">
            <thead className="">
              <tr>
                <th className="py-2">Tên bài thi</th>
                <th className="py-2">Mô tả</th>
                <th className="py-2">Thời gian nộp</th>
                <th className="py-2">Điểm</th>
                <th className="py-2">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {apiResultTests.data.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-200" : ""}`}
                >
                  <td key={index} className="py-3">
                    {item.Test.title}
                  </td>
                  <td key={index} className="py-3">
                    {item.Test.description}
                  </td>
                  <td key={index} className="py-3">
                    {formatDate(item.completed_at)}
                  </td>
                  <td key={index} className="py-3">
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
            totalItems={apiResultTests.pagination.total}
            itemsPerPage={limit}
            onPageChange={(page) => setCurrentPage(page)}
          />
      </div>
    </DefaultLayout>
  );
}

export default Result;
