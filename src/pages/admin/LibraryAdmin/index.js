import AdminLayout from "../../../Layouts/AdminLayout";
import Search from "../../../components/Search";
import Pagination from "../../../components/Pagination";
import { useEffect, useState } from "react";
import useGetPaginationData from "../../../hooks/useGetPaginationData";
import Button from "../../../components/Button";
import Dialog from "../../../components/Dialog";
import formatDate from "../../../helpers/fomatDate";
import Loading from "../../../components/Loading";
import useDeletaData from "../../../hooks/useDeleteData";

function LibraryAdmin() {
  useEffect(() => {
    document.title = "Library";
  }, []);
  const [limit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [idTest, setIdTest] = useState(null);
  const apiGetListTest = useGetPaginationData(
    `/test?limit=${limit}&page=${currentPage}`
  );
  const apiDeleteTest = useDeletaData();
  const [showDialog, setShowDialog] = useState(false);
  const handleClickDelete = (id) => {
    setIdTest(id);
    setShowDialog(true);
  };
  const handleConfim = async () => {
    await apiDeleteTest.deleteData(`/test/delete/${idTest}`);
    setShowDialog(false);
  };
  const handleClose = () => setShowDialog(false);
  if (apiGetListTest.data === null || apiGetListTest.loading === true) {
    return (
      <AdminLayout>
        <Loading />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <div className="mx-5 my-5 border rounded-t-lg shadow-lg">
        <h1 className="text-2xl text-white bg-red-600 font-bold p-3 rounded-t-lg">
          <span className="ml-3">Danh sách bài thi đã làm</span>
        </h1>
        <div className="flex mt-3 items-center">
          <Search />
          <Button>Tạo mới</Button>
        </div>
        <div className="mx-5 my-5">
          <table className="w-full table-auto text-center border rounded-lg divide-y divide-solid shadow-md">
            <thead className="">
              <tr>
                <th className="py-2">Tên bài thi</th>
                <th className="py-2">Thời gian tạo</th>
                <th className="py-2">Số câu</th>
                <th className="py-2">Chỉnh sửa</th>
                <th className="py-2">Xóa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {apiGetListTest.data.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-200" : ""}`}
                >
                  <td className="py-3">{item.title}</td>
                  <td className="py-3">{formatDate(item.created_at)}</td>
                  <td className="py-3">{item.quantity}</td>
                  <td>
                    <Button>Chỉnh sửa</Button>
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
          totalItems={apiGetListTest.pagination.totalTests}
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
