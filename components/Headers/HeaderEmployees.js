import React from "react";

// components

import CardStats from "components/Cards/CardStatsEmployee";

export default function HeaderEmployees({ handleExport }) {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-24 pb-32 pt-12">
        <div className="px-4 md:px-4 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <CardStats
                  statSubtitle="Import Employee Data"
                  buttonTitle="Import"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <CardStats
                  handleExport={handleExport}
                  statSubtitle="Export Employee Data"
                  buttonTitle="Export"
                  statIconName="fas fa-users"
                  statIconColor="bg-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
