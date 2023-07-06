import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useEffect, useState } from "react";

const VendorBarChart = () => {


  const [data, setData] = useState( [
    {
      name: "OnCampus",
      data: [800, 850, 815, 925, 600,1200],
    },
    {
      name: "Referals",
      data: [500, 450, 550, 470, 420,620],
    },
    {
      name: "LinkedIn",
      data: [120, 150, 180, 210, 260,440],
    },
    {
      name: "Naukri.com",
      data: [150, 140, 70, 80, 80,160],
    },
    {
      name: "Indeed",
      data: [80, 70, 40, 60, 90,120],
    },
  ]);

  const [barChartOptions, setOptions] = useState({
    chart: {
      type: 'line',
          height: 450,
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
    },
    colors: ['#77B6EA', '#545454','#e41630','#e4ab30','#e62e14'],
    dataLabels: {
                enabled: true,
              },
    stroke: {
                curve: 'smooth'
              },
    title: {
                text: 'Vendors contribution in hiring',
                align: 'left'
              },

              markers: {
                size: 1
              },
              xaxis: {
                categories: ['2017', '2018', '2019', '2020', '2021', '2022'],
                title: {
                  text: 'Year'
                }
              },
              yaxis: {
                title: {
                  text: 'Number of employees'
                },
                min: 10,
                max: 1400
              },
              legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -25
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
        type="line"
        width="100%"
        height="450"
      />
    </div>
  );
};

export default VendorBarChart;