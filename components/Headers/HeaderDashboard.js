import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderDashboard() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-24 pb-32 pt-12">
        <div className="px-4 md:px-4 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL EMPLOYEES"
                  statTitle="13,000"
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last year"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="NEW EMPLOYEES"
                  statTitle="756"
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since last year"
                  statIconName="fas fa-users"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Men : Women"
                  statTitle="60 : 40"
                  statArrow="up"
                  statPercent="12.50"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since last year"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="57.83%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last year"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
