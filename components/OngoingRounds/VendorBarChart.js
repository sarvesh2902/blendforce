import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useEffect, useState } from "react";

const VendorBarChart = ({vendor}) => {


  const [data, setData] = useState( [
    {
      name: "Men",
      data: [vendor.LinkedIn.men, vendor.OnCampus.men, vendor.Referals.men, vendor.Indeed.men, vendor.Naukri.men,vendor.Others.men],
    },
    {
      name: "Female",
      data: [vendor.LinkedIn.female, vendor.OnCampus.female, vendor.Referals.female, vendor.Indeed.female, vendor.Naukri.female,vendor.Others.female],
    },
    {
      name: "Others",
      data: [vendor.LinkedIn.others, vendor.OnCampus.others, vendor.Referals.others, vendor.Indeed.others, vendor.Naukri.others,vendor.Others.others],
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
      categories: ["LinkedIn", "OnCampus", "Referals", "indeed", "Naukri.com","Others"],
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