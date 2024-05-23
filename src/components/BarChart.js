// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Chart.js에 사용될 구성 요소를 등록합니다.
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = () => {
  // 그래프에 사용할 데이터와 옵션을 설정합니다.
    const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
    {
        label: 'Success',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
    },
    ],
};

const options = {
    responsive: true,
    plugins: {
    legend: {
        position: 'top',
    },
    title: {
        display: true,
        text: 'Sample Bar Chart',
    },
    },
};

    return <Bar data={data} options={options} />;
};

export default BarChart;
