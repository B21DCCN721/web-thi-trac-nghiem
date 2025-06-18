import AdminLayout from "../../../layouts/AdminLayout";
import Search from "../../../components/Search";
import Pagination from "../../../components/Pagination";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../configs/axiosClient";
import Loading from "../../../components/Loading";

function LibraryAdmin() {
  useEffect(() => {
    document.title = "Library";
  }, []);
  const [data, setData] = useState([]);
  const [limit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleClickEdit = (id) => {
    navigate(`/admin/library/edit-test/${id}`);
  };
  const handleClickDetail = (id) => {
    navigate(`/admin/library/detail-test/${id}`);
  };
  const handleClickDelete = async (id) => {
    try {
      const response = await axiosClient.delete(`api/admin/delete-test/${id}`);
      if (response.status === 200 && response.data.code === 1) {
        alert("Xóa thành công.");
        const reload = await axiosClient.get("api/test/get-list-test", {
          params: {
            limit: limit,
            page: currentPage,
            search: filter,
          },
        });
        setData(reload.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      alert("Xóa thất bại, vui lòng thử lại sau.");
    }
  };

  // lấy dữ liệu bài thi
  useEffect(() => {
    const getListTest = async () => {
      try {
        const response = await axiosClient.get("api/test/get-list-test", {
          params: {
            limit: limit,
            page: currentPage,
            search: filter,
          },
        });
        if (response.status === 200 && response.data.code === 1) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching test data:", error);
      } finally {
        setLoading(false);
      }
    };
    getListTest();
  }, [currentPage, limit, filter]);

  if (loading) {
    return (
      <AdminLayout>
        <Loading />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <div className="border rounded-t-lg shadow-lg">
        <h1 className="text-2xl text-white bg-red-600 font-bold p-3 rounded-t-lg">
          <span className="ml-3">Danh sách bài thi đã tạo</span>
        </h1>
        <div className="flex mt-3 items-center">
          <Search
            valueSearch={filter}
            onSearch={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="mx-5 my-5">
          <table className="w-full table-auto text-center border rounded-lg divide-y divide-solid shadow-md">
            <thead className="">
              <tr>
                <th className="py-2">Tên bài thi</th>
                <th className="py-2">Môn học</th>
                <th className="py-2">Mã bài</th>
                <th className="py-2">Chi tiết</th>
                <th className="py-2">Chỉnh sửa</th>
                <th className="py-2">Xóa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {data.tests.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-200" : ""}`}
                >
                  <td className="py-3">{item.title}</td>
                  <td className="py-3">{item.subject}</td>
                  <td className="py-3">{item.code}</td>
                  <td className="py-3">
                    <Button onClick={() => handleClickDetail(item.id)}>
                      Chi tiết
                    </Button>
                  </td>
                  <td className="py-3">
                    <Button onClick={() => handleClickEdit(item.id)}>
                      Chỉnh sửa
                    </Button>
                  </td>
                  <td className="py-3">
                    <Button onClick={() => handleClickDelete(item.id)}>
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalItems={data.pagination.total}
          itemsPerPage={limit}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </AdminLayout>
  );
}

export default LibraryAdmin;
