import React from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { LineChart } from "../../../components/Chart";
import { useEffect, useState } from "react";
import axiosClient from "../../../configs/axiosClient";
import Loading from "../../../components/Loading";

function Statistical() {
  const [dataStats, setDataStats] = useState(null);
  const [dataChart, setDataChart] = useState({
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
  datasets: [
    {
      label: "Số lượng",
      data: [120, 190, 300, 250, 400],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.4, // bo tròn đường
    },
  ],
});
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [error, setError] = useState(null);
  // call api lấy dữ liêu thống kê
  useEffect(() => {
    const getDataStats = async () => {
      try {
        const response = await axiosClient.get("/api/admin/stats");
        if (response.status === 200 && response.data.code === 1) {
          setDataStats(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", error);
        setError("Không thể tải dữ liệu thống kê.");
      } finally {
        setLoadingStats(false);
      }
    };
    getDataStats();
  }, []);
  // call api lấy dữ liệu biểu đồ
  useEffect(() => {
    const getDataChart = async () => {
      try {
        const response = await axiosClient.get("/api/admin/test-stats-last-10-days");
        if (response.status === 200 && response.data.code === 1) {
          setDataChart((prevDataChart) => {
            return {
              ...prevDataChart,
              labels: response.data.data.map(item => item.date),
              datasets: [
                {
                  ...prevDataChart.datasets[0],
                  data: response.data.data.map(item => item.test_count),
                },
              ],
            };
          });
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu biểu đồ:", error);
      } finally{
        setLoadingChart(false);
      }
    };
    getDataChart();
  }, []);
  if (loadingStats || loadingChart) {
    return (
      <AdminLayout>
        <Loading />
      </AdminLayout>
    );
  }
    if (error) {
        return (
        <AdminLayout>
            <div className="text-red-500 text-center mt-10">
            {error}
            </div>
        </AdminLayout>
        );
    }
  return (
    <AdminLayout>
      <div className="border rounded-t-lg shadow-lg">
        <h1 className="text-2xl text-white bg-red-600 font-bold p-3 rounded-t-lg">
          <span className="ml-3">Thống kê</span>
        </h1>
        <div className="p-5 flex justify-between items-center flex-wrap gap-5 *:text-center *:flex-1 *:border *:rounded-lg *:p-5 *:shadow-md *:bg-rose-200">
          <div>
            <h2 className="text-xl font-bold mb-3">Số lượng bài thi đã tạo</h2>
            <p className="text-lg">
              <span className="font-semibold">{dataStats.totalTests}</span>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">
              Số lượng sinh viên đã làm bài
            </h2>
            <p className="text-lg">
              <span className="font-semibold">{dataStats.studentCount}</span>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">
              Điểm trung bình của các bài thi
            </h2>
            <p className="text-lg">
              <span className="font-semibold">{dataStats.averageScore}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 border rounded-t-lg shadow-lg">
        <LineChart dataChart={dataChart} />
      </div>
    </AdminLayout>
  );
}

export default Statistical;
