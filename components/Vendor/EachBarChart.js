import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import {  useState } from "react";

const EachBarChart = ({title,series}) => {


  const [data, setData] = useState( [
    {
      name: "Men",
      group:"men",
      data: series.men,
    },
    {
      name: "Female",
      group:"female",
      data: series.women,
    },
    {
      name: "Others",
      group:"others",
      data: series.others,
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
      categories: ["2017", "2018", "2019", "2020", "2021","2022"],
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
        text: title,
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

export default EachBarChart;