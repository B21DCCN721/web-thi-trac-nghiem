import DefaultLayout from "../../../layouts/DefaultLayout";
const students = [
  { id: 1, name: "Nguyễn Văn A", score: 98 },
  { id: 2, name: "Trần Thị B", score: 92 },
  { id: 3, name: "Lê Văn C", score: 89 },
  { id: 4, name: "Phạm Thị D", score: 85 },
  { id: 5, name: "Hoàng Văn E", score: 82 },
];
function Ranking() {
  return (
    <DefaultLayout>
      <h1 className="text-2xl text-gray-500 font-bold">Bảng xếp hạng</h1>
      <div className="">
        <div>
          <h2 className="text-xl font-bold mb-3">Top 10 sinh viên</h2>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-100">
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
                {students
                  .sort((a, b) => b.score - a.score)
                  .map((student, index) => (
                    <tr
                      key={student.id}
                      className={`border-t ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">{student.name}</td>
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
