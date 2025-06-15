import DefaultLayout from "../../../layouts/DefaultLayout";
import { useEffect, useState } from "react";
import axiosClient from "../../../configs/axiosClient";
import Loading from "../../../components/Loading";
const students = [
  { id: 1, name: "Nguyễn Văn A", score: 98 },
  { id: 2, name: "Trần Thị B", score: 92 },
  { id: 3, name: "Lê Văn C", score: 89 },
  { id: 4, name: "Phạm Thị D", score: 85 },
  { id: 5, name: "Hoàng Văn E", score: 82 },
];
function Ranking() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // call api lấy danh sách thứ hạng học sinh
  useEffect(() => {
    const getRanking = async () => {
      try {
        const response = await axiosClient.get("api/student/get-ranking");
        if (response.status === 200 && response.data.code === 1) {
          setData(response.data?.data);
        }
      } catch (error) {
        if (error.response) {
          console.error("Lỗi khi lấy danh sách xếp hạng:", error.response.data);
          setError(error.response.data.message || "Không thể tải danh sách xếp hạng.");
        }
      } finally {
        setLoading(false);
      }
    };
    getRanking();
  }, []);
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
        <div className="text-red-500 text-center mt-10">{error}</div>
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <h1 className="text-2xl text-gray-500 font-bold">Bảng xếp hạng top 10 người có điểm cao nhất</h1>
      <div className="mt-5">
        <div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left px-6 py-3 font-medium text-gray-700">
                    Hạng
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-gray-700">
                    Họ tên
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-gray-700">
                    Điểm số
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((student, index) => (
                    <tr
                      key={student.user_id}
                      className={`border-t ${
                        index % 2 === 0 ? "bg-gray-200" : ""
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">{student.User.name}</td>
                      <td className="px-6 py-4 text-blue-600 font-semibold">
                        {student.score}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Ranking;
