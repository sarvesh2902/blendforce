import React from "react";
import Chart from "chart.js";
// import ApexCharts from "apexcharts";
// import  Chart  from "react-apexcharts";

export default function DisabilityPieChart({ data }) {
  React.useEffect(() => {
    const labels = data.map((obj) => obj._id);
    const values = data.map((obj) => obj.count);
    var config = {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Gender Dataset",
            data: values,
            backgroundColor: [
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
            ],
          },
        ],
      },
    };
    var ctx = document.getElementById("disable-pie-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-8 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-1 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-black text-sm font-semibold">
                Employee Analysis - Disability
              </h2>
            </div>
          </div>
        </div>
        <div className="p-1 flex-auto">
          {/* Chart */}
          <div className="relative ">
            <canvas id="disable-pie-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
