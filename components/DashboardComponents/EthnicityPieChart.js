import React from "react";
import Chart from "chart.js";

export default function EthnicityPieChart() {
  React.useEffect(() => {
    var config = {
      type: "pie",
      data : {
        labels: [
          'Asian-26%',
          'Black-15%',
          'White-41%',
          'Middle Eastern-18%',
          'Latin-5%',
        ],
        datasets: [{
          label: 'Ethnicity Dataset',
          data: [26, 10, 41, 18,5],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
        }]
      },

    };
    var ctx = document.getElementById("ethnicity-pie-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-1 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-black text-sm font-semibold">Employee Analysis - Ethnicity</h2>
            </div>
          </div>
        </div>
        <div className="p-1 flex-auto">
          {/* Chart */}
          <div className="relative ">
            <canvas id="ethnicity-pie-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
