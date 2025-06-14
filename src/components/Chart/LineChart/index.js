import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

// Khởi tạo các thành phần cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dữ liệu biểu đồ
const data = {
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
};

// Tuỳ chọn hiển thị
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Biểu đồ số lượng bài thi được tạo theo tháng",
    },
  },
};

const LineChart = ({dataChart = data, optionsChart = options}) => {
  return <Line data={dataChart} options={optionsChart} />;
};

export default LineChart;
