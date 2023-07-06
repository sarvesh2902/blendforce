import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// import { barChartData, barChartOptions } from "../../data/chartData";
import { useEffect, useState } from "react";

const DonutChart = () => {


  const [data, setData] = useState( [125,45, 18, 10, 8]);

  const [barChartOptions, setOptions] = useState({

    labels:['Applications','Aptitude Round','Technical Interview 1','Technical Interview 2', 'HR Round'],

    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
            total: {
              show: true,
              label: 'Ongoing...',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return ""
                }, 0)
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(2) + "%"
      },
    },

  })

  // useEffect(() => {
  //   setData(barChartData);
  // }, []);

  return (
    <div className="p-2 rounded-lg card">
      <h1 className="text-xl font-bold">Candidates in each round</h1>
      <Chart
        options={barChartOptions}
        series={data}
        type="donut"
        width="100%"
        height="250"
      />
    </div>
  );
};

export default DonutChart;