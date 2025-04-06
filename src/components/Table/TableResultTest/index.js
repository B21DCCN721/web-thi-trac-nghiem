import PropTypes from "prop-types";
import formatDate from "../../../helpers/fomatDate";

function TableResultTest({ dataHistory, dataUser }) {
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
                <span className="col-span-2">{dataUser.username}</span>
              </div>
            </td>
            <td>
              <div className="grid grid-cols-3 ml-2">
                <span>Tên bài thi:</span>
                <span className="col-span-2">{dataHistory.test.title}</span>
              </div>
            </td>
          </tr>
          <tr className="*:py-3 text-left bg-gray-300">
            <td>
              <div className="grid grid-cols-3 ml-2">
                <span>Mô tả:</span>
                <span className="col-span-2">{dataUser.description}</span>
              </div>
            </td>
            <td>
              <div className="grid grid-cols-3 ml-2">
                <span>Thời gian nộp bài:</span>
                <span className="col-span-2">{formatDate(dataHistory.completed_at)}</span>
              </div>
            </td>
          </tr>
          <tr className="*:py-3 text-left">
            <td>
              <div className="grid grid-cols-3 ml-2">
                <span>Lớp:</span>
                <span className="col-span-2">{dataUser.class}</span>
              </div>
            </td>
            <td>
              <div className="grid grid-cols-3 ml-2">
                <span>Điểm:</span>
                <span className="col-span-2">{dataHistory.score}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

TableResultTest.propTypes = {
  dataHistory: PropTypes.object,
  dataUser: PropTypes.object,
};

export default TableResultTest;
