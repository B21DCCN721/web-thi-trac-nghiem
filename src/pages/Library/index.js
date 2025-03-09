import DefaultLayout from "../../Layouts/DefaultLayout";
import Search from "../../components/Search";
import { TableLibrary } from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";

import { header, colums, tableData } from "./data";
import Button from "../../components/Button";
import Dialog from "../../components/Dialog";

function Library() {
  useEffect(() => {
    document.title = "Library";
  }, []);
  const [showDialog, setShowDialog] = useState(false);
  const handleClickDelete = () => {
    setShowDialog(true);
  };
  const handleConfim = () => {
    //xử lý khi click xác nhận xóa
    setShowDialog(false);
  };
  const handleClose = () => setShowDialog(false);
  return (
    <DefaultLayout>
      <div className="mx-5 my-5 border rounded-t-lg shadow-lg">
        <h1 className="text-2xl text-white bg-red-600 font-bold p-3 rounded-t-lg">
          <span className="ml-3">Danh sách bài thi đã làm</span>
        </h1>
        <div className="flex mt-3">
          <Search />
          <Button>Tạo mới</Button>
        </div>
        <TableLibrary
          header={header}
          columns={colums}
          data={tableData}
          handleClickDelete={handleClickDelete}
        />
        <Pagination
          totalItems={50}
          itemsPerPage={5}
          onPageChange={(page) => console.log("Current page:", page)}
        />
      </div>
      {showDialog && (
        <Dialog header='Xóa' text='Sau khi xóa sẽ không thể khôi phục, xác nhận xóa?' handleClose={handleClose} handleConfim={handleConfim} />
      )}
    </DefaultLayout>
  );
}

export default Library;
