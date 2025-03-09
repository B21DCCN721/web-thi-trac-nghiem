import PropTypes from "prop-types";

// tên của columns phải trùng với các key của các item trong data
function TableResultTest({ data }) {
  return (
    <div className="mx-5 my-5">
      <table className="w-full table-auto text-center border rounded-lg divide-y divide-solid shadow-md">
        <thead className="">
          <tr>
            <th className="py-2 pl-2 bg-gray-400 text-left">
              Thông tin sinh viên
            </th>
            <th className="py-2 pl-2 bg-gray-400 text-left">
              Thông tin bài thi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          <tr className="*:py-3 text-left">
            <td>
              <div className="grid grid-cols-3 ml-2">
                <span>Tên:</span>
                <span className="col-span-2">{data.ten}</span>
              </div>
            </td>
            <td>
              <div className="grid grid-cols-3 ml-2">
                <span>Thời gian làm bài:</span>
                <span className="col-span-2">{data.thoigianlambai}</span>
              </div>
            </td>
          </tr>
          <tr className="*:py-3 text-left bg-gray-300">
            <td>
              <div className="grid grid-cols-3 ml-2">
                <span>Mã sinh viên:</span>
                <span className="col-span-2">{data.msv}</span>
              </div>
            </td>
            <td>
              <div className="grid grid-cols-3 ml-2">
                <span>Thời gian nộp bài:</span>
                <span className="col-span-2">{data.thoigiannopbai}</span>
              </div>
            </td>
          </tr>
          <tr className="*:py-3 text-left">
            <td>
              <div className="grid grid-cols-3 ml-2">
                <span>Lớp:</span>
                <span className="col-span-2">{data.lop}</span>
              </div>
            </td>
            <td>
              <div className="grid grid-cols-3 ml-2">
                <span>Điểm:</span>
                <span className="col-span-2">{data.diem}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

TableResultTest.propTypes = {
  data: PropTypes.object,
};

export default TableResultTest;
