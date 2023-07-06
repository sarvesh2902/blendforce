import React from "react";
import Chart from "chart.js";

export default function CardPieChart() {
  React.useEffect(() => {
    var config = {
      type: "pie",
      data : {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      // options: {
      //   maintainAspectRatio: false,
      //   responsive: true,
      //   title: {
      //     display: false,
      //     text: "Diversity Performance",
      //     fontColor: "white",
      //   },
      //   legend: {
      //     labels: {
      //       fontColor: "white",
      //     },
      //     align: "end",
      //     position: "bottom",
      //   },
      //   tooltips: {
      //     mode: "index",
      //     intersect: false,
      //   },
      //   hover: {
      //     mode: "nearest",
      //     intersect: true,
      //   },
      //   scales: {
      //     xAxes: [
      //       {
      //         ticks: {
      //           fontColor: "rgba(255,255,255,.7)",
      //         },
      //         display: true,
      //         scaleLabel: {
      //           display: false,
      //           labelString: "Month",
      //           fontColor: "white",
      //         },
      //         gridLines: {
      //           display: false,
      //           borderDash: [2],
      //           borderDashOffset: [2],
      //           color: "rgba(33, 37, 41, 0.3)",
      //           zeroLineColor: "rgba(0, 0, 0, 0)",
      //           zeroLineBorderDash: [2],
      //           zeroLineBorderDashOffset: [2],
      //         },
      //       },
      //     ],
      //     yAxes: [
      //       {
      //         ticks: {
      //           fontColor: "rgba(255,255,255,.7)",
      //         },
      //         display: true,
      //         scaleLabel: {
      //           display: false,
      //           labelString: "Value",
      //           fontColor: "white",
      //         },
      //         gridLines: {
      //           borderDash: [3],
      //           borderDashOffset: [3],
      //           drawBorder: false,
      //           color: "rgba(255, 255, 255, 0.15)",
      //           zeroLineColor: "rgba(33, 37, 41, 0)",
      //           zeroLineBorderDash: [2],
      //           zeroLineBorderDashOffset: [2],
      //         },
      //       },
      //     ],
      //   },
      // },
    };
    var ctx = document.getElementById("pie-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-black text-sm font-semibold">Diversity Performance</h2>
            </div>
          </div>
        </div>
        <div className="p-1 flex-auto">
          {/* Chart */}
          <div className="relative ">
            <canvas id="pie-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
