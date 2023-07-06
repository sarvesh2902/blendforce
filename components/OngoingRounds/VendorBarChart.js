import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useEffect, useState } from "react";

const VendorBarChart = () => {


  const [data, setData] = useState( [
    {
      name: "Men",
      data: [20, 15, 12, 6, 12,3],
    },
    {
      name: "Female",
      data: [20, 5, 6, 12, 12,1],
    },
    {
      name: "Others",
      data: [1, 0, 0, 0, 0,0],
    },
  ]);

  const [barChartOptions, setOptions] = useState({
    chart: {
      type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
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
      categories: ["LinkedIn", "Naukri.com", "Indeed", "Referals", "OnCampus","Others"],
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
      <h1 className="text-xl font-bold">Vendors</h1>
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

export default VendorBarChart;