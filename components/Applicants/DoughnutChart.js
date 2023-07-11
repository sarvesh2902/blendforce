import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// import { barChartData, barChartOptions } from "../../data/chartData";
import { useEffect, useState } from "react";

const DoughnutChart = ({gender}) => {


  const [data, setData] = useState(gender);

  const [barChartOptions, setOptions] = useState({

    labels:['men','women','others'],

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
              label: 'Total',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
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
      <h1 className="text-xl font-bold">Diversity</h1>
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

export default DoughnutChart;