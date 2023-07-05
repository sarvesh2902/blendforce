import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// import { barChartData, barChartOptions } from "../../data/chartData";
import { useEffect, useState } from "react";

const JobBarChart = () => {


  const [data, setData] = useState( [
    {
      name: "Total applications",
      data: [44, 55, 57, 56, 61, 58, 63],
    },
    {
      name: "Number of jobs",
      data: [76, 85, 101, 98, 87, 105, 91],
    },
  ]);

  const [barChartOptions, setOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    colors: ["#0bab7c", "#e6c000"],
    yaxis: {
      title: {
        text: "Applications",
      },
      labels: {
        show: true,
        style: {
          colors: "#9aaeb5",
          fontSize: "14px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
  })

  // useEffect(() => {
  //   setData(barChartData);
  // }, []);

  return (
    <div className="p-2 rounded-lg card">
      <h1 className="text-xl font-bold">Listing Performance</h1>
      <Chart
        options={barChartOptions}
        series={data}
        type="bar"
        width="100%"
        height="250"
      />
    </div>
  );
};

export default JobBarChart;