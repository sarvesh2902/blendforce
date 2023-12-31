import React from "react";
import Router from "next/router";

export default function Recommendations({ recommendations }) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Recommendations
              </h3>
            </div>
            {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div> */}
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Gender
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((item) => {
                return (
                  <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          Router.push(
                            {
                              pathname: "/candidate-details",
                              query: item,
                            },
                            "/candidate-details"
                          );
                        }}
                      >
                        {item.name}
                      </div>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.gender}
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="mr-2">{item.ats_score}%</span>
                        <div className="relative w-full">
                          <div
                            className={`overflow-hidden h-2 text-xs flex rounded ${
                              item.ats_score >= 50 && "bg-emerald-200"
                            } ${
                              item.ats_score >= 20 &&
                              item.ats_score < 50 &&
                              "bg-orange-200"
                            } ${item.ats_score < 20 && "bg-red-200"}`}
                          >
                            <div
                              style={{ width: `${item.ats_score}%` }}
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                item.ats_score >= 50 && "bg-emerald-500"
                              } ${
                                item.ats_score >= 20 &&
                                item.ats_score < 50 &&
                                "bg-orange-500"
                              } ${item.ats_score < 20 && "bg-red-500"}`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
