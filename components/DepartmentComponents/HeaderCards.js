import React from "react";

// components
import Cards from "components/DepartmentComponents/Card";

export default function HeaderCards({ data }) {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-24 pb-32 pt-12">
        <div className="px-4 md:px-4 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap overflow-scroll">
              {data.map((dept) => {
                return (
                  <div className="w-full lg:w-3/12 xl:w-3/12 px-4 my-2">
                    <Cards
                      statTitle={dept._id.toUpperCase()}
                      statEmployee={dept.count}
                      dept={dept._id}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
