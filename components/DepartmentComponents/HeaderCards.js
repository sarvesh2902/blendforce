import React from "react";

// components
import Cards from "components/DepartmentComponents/Card"


export default function HeaderCards() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-24 pb-32 pt-12">
        <div className="px-4 md:px-4 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap overflow-scroll">
              <div className="w-full lg:w-4/12 xl:w-2/12 px-4">
                <Cards
                  statTitle="IT"
                  statEmployee="4,569"
                  statPercent="46.53"
                  statPercentColor="text-emerald-500"
                  statType="it"
                />
              </div>
              <div className="w-full lg:w-4/12 xl:w-2/12 px-4">

                <Cards
                  statTitle="Marketing"
                  statEmployee="3,985"
                  statPercent="46.53"
                  statPercentColor="text-orange-500"
                  statType="marketing"
                />
              </div>
              <div className="w-full lg:w-4/12 xl:w-2/12 px-4">
              <Cards
                  statTitle="Finance"
                  statEmployee="3,513"
                  statPercent="36.49"
                  statPercentColor="text-lightBlue-500"
                  statType="finance"
                />
              </div>
              <div className="w-full lg:w-4/12 xl:w-2/12 px-4">
              <Cards
                  statTitle="HR"
                  statEmployee="2,050"
                  statPercent="50.87"
                  statPercentColor="text-emerald-500"
                  statType="hr"
                />
              </div>
              <div className="w-full lg:w-4/12 xl:w-2/12 px-4">
              <Cards
                  statTitle="Sales"
                  statEmployee="1,795"
                  statPercent="46.53"
                  statPercentColor="text-orange-500"
                  statType="sales"
                />
              </div>
              <div className="w-full lg:w-4/12 xl:w-2/12 px-4">
              <Cards
                  statTitle="Designing"
                  statEmployee="1,265"
                  statPercent="66.53"
                  statPercentColor="text-red-500"
                  statType="designing"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
