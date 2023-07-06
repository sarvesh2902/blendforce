import React from "react";
import Chart from "chart.js";

export default function EthinicityLineChart() {
  React.useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: [
          "1985",
          "1990",
          "1995",
          "2000",
          "2005",
          "2010",
          "2015",
          "2020",
        ],
        datasets: [
          {
            label: "White",
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [65, 78, 66, 44, 56, 67, 75,85],
            fill: false,
          },
          {
            label: "Asian",
            fill: false,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: [10, 30, 20, 40, 30, 50, 57,70],
          },
          {
            label: "Middle Eastern",
            fill: false,
            backgroundColor: "#00ff00",
            borderColor: "#00ff00",
            data: [8, 15, 20, 25, 22, 28, 38,50],
          },
          {
            label: "Black",
            fill: false,
            backgroundColor: "#6666ff",
            borderColor: "#6666ff",
            data: [5, 10, 12, 18, 20, 30, 32,45],
          },
          {
            label: "Latin",
            fill: false,
            backgroundColor: "#ff0000",
            borderColor: "#ff0000",
            data: [3, 5, 8, 15, 16, 18, 20,25],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Diversity Performance",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("ethinicity-line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-white text-xl font-semibold">Ethinicity Till Date</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="ethinicity-line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
