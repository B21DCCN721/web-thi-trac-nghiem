import AdminLayout from "../../../layouts/AdminLayout";
import Search from "../../../components/Search";
import Pagination from "../../../components/Pagination";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Dialog from "../../../components/Dialog";
import formatDate from "../../../helpers/fomatDate";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: 1,
    title: "Bài thi Toán học",
    created_at: "2023-10-01T12:00:00Z",
    quantity: 10,
  },
  {
    id: 2,
    title: "Bài thi Lịch sử",
    created_at: "2023-10-02T12:00:00Z",
    quantity: 8,
  },
  {
    id: 3,
    title: "Bài thi Vật lý",
    created_at: "2023-10-03T12:00:00Z",
    quantity: 12,
  },
];

function LibraryAdmin() {
  useEffect(() => {
    document.title = "Library";
  }, []);
  const [limit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [idTest, setIdTest] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const handleClickEdit = (id) => {
    // Navigate to edit page with the test ID
    // Assuming you have a route set up for editing tests
    navigate(`/admin/library/edit-test/${id}`);
    console.log(`Edit test with ID: ${id}`);
  }
  const handleClickDetail = (id) => {
    // Navigate to detail page with the test ID
    navigate(`/admin/library/detail-test/${id}`);
    console.log(`View details for test with ID: ${id}`);
  };
  const handleClickDelete = (id) => {
    setIdTest(id);
    setShowDialog(true);
  };
  const handleConfim = async () => {
    setShowDialog(false);
  };
  const handleClose = () => setShowDialog(false);
  return (
    <AdminLayout>
      <div className="border rounded-t-lg shadow-lg">
        <h1 className="text-2xl text-white bg-red-600 font-bold p-3 rounded-t-lg">
          <span className="ml-3">Danh sách bài thi đã làm</span>
        </h1>
        <div className="flex mt-3 items-center">
          <Search />
        </div>
        <div className="mx-5 my-5">
          <table className="w-full table-auto text-center border rounded-lg divide-y divide-solid shadow-md">
            <thead className="">
              <tr>
                <th className="py-2">Tên bài thi</th>
                <th className="py-2">Thời gian tạo</th>
                <th className="py-2">Số câu</th>
                <th className="py-2">Chi tiết</th>
                <th className="py-2">Chỉnh sửa</th>
                <th className="py-2">Xóa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-200" : ""}`}
                >
                  <td className="py-3">{item.title}</td>
                  <td className="py-3">{formatDate(item.created_at)}</td>
                  <td className="py-3">{item.quantity}</td>
                  <td>
                    <Button onClick={() => handleClickDetail(item.id)}>Chi tiết</Button>
                  </td>
                  <td>
                    <Button onClick={() => handleClickEdit(item.id)}>Chỉnh sửa</Button>
                  </td>
                  <td>
                    <Button onClick={() => handleClickDelete(item.id)}>Xóa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalItems={10}
          itemsPerPage={limit}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      {showDialog && (
        <Dialog
          header="Xóa"
          text="Sau khi xóa sẽ không thể khôi phục, xác nhận xóa?"
          handleClose={handleClose}
          handleConfim={handleConfim}
        />
      )}
    </AdminLayout>
  );
}

export default LibraryAdmin;
