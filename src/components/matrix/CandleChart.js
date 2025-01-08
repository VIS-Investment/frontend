import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
} from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import "chartjs-adapter-date-fns"; // Date Adapter 추가
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  CandlestickController,
  CandlestickElement
);

const CandleChart = ({ stockName }) => {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState("day"); // 기본 기준

  useEffect(() => {
    // Mock 데이터 추가
    const mockData = {
      day: [
        { t: "2024-01-01", o: 145.3, h: 150.0, l: 140.5, c: 148.7 },
        { t: "2024-01-02", o: 148.7, h: 155.3, l: 147.1, c: 153.4 },
        { t: "2024-01-03", o: 153.4, h: 160.2, l: 150.3, c: 158.6 },
        { t: "2024-01-04", o: 158.6, h: 162.1, l: 157.2, c: 159.9 },
        { t: "2024-01-05", o: 159.9, h: 165.5, l: 159.3, c: 163.4 },
      ],
      week: [
        { t: "2024-01", o: 140, h: 160, l: 135, c: 150 },
        { t: "2024-02", o: 150, h: 170, l: 145, c: 160 },
        { t: "2024-03", o: 160, h: 180, l: 150, c: 170 },
      ],
      month: [
        { t: "2023", o: 100, h: 200, l: 90, c: 180 },
        { t: "2024", o: 180, h: 250, l: 150, c: 240 },
      ],
    };
    setData(mockData[timeframe]);
  }, [stockName, timeframe]);

  // 캔들 데이터 매핑
  const chartData = {
    datasets: [
      {
        label: `${stockName} Candle Chart`,
        data: data.map((d) => ({
          x: new Date(d.t).getTime(), // 날짜를 타임스탬프로 변환
          o: d.o, // 시가
          h: d.h, // 고가
          l: d.l, // 저가
          c: d.c, // 종가
        })),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  // 차트 옵션
  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: timeframe,
          tooltipFormat: timeframe === "year" ? "yyyy" : timeframe === "month" ? "yyyy-MM" : "yyyy-MM-dd",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
    },
  };

  return (
    <div className="mt-6">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setTimeframe("day")}
          className={`px-4 py-2 rounded ${
            timeframe === "day" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
          }`}
        >
          Day
        </button>
        <button
          onClick={() => setTimeframe("week")}
          className={`px-4 py-2 rounded ${
            timeframe === "week" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
          }`}
        >
          Week
        </button>
        <button
          onClick={() => setTimeframe("month")}
          className={`px-4 py-2 rounded ${
            timeframe === "month" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
          }`}
        >
          Month
        </button>
      </div>

      <h2 className="text-xl font-bold text-center">{stockName} - Candle Chart</h2>
      {data.length > 0 ? (
        <Chart type="candlestick" data={chartData} options={options} />
      ) : (
        <p className="text-center">Loading data...</p>
      )}
    </div>
  );
};

export default CandleChart;
