import React from "react";
import PropTypes from "prop-types";

export default function Cards({

  statTitle,
  statEmployee,
  statPercent,
  statPercentColor,
  statType
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto py-4 px-2">
          <div className="flex flex-wrap justify-center align-center">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-700 uppercase font-bold text-sm text-center ">
                {statTitle}
              </h5>
              <p className="text-xs mt-1 text-blueGray-700 text-center">
                <span className={statPercentColor + " mr-2"}>
                  {statPercent}%
                </span>
              </p>
              <h5 className="font-semibold text-xl text-blueGray-700 uppercase text-center ">
              {statEmployee}
                <span className="text-[7px] text-blueGray-700 ml-1">
                  employees
                </span>
              </h5>

            </div>
            <button
                className="bg-indigo-500 text-white  active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mt-2 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Analyse
          </button>

          </div>

        </div>
      </div>
    </>
  );
}

Cards.defaultProps = {
  statTitle: "350,897",
  statEmployee: "Traffic",
  statPercent: "3.48",
  statPercentColor: "text-emerald-500",
  statType:"it"
};

Cards.propTypes = {
  statTitle: PropTypes.string,
  statEmployee: PropTypes.string,
  statPercent: PropTypes.string,
  // can be any of the text color utilities
  // from tailwindcss
  statPercentColor: PropTypes.string,
  statType: PropTypes.string,
  // statDescripiron: PropTypes.string,
  // statIconName: PropTypes.string,
  // can be any of the background color utilities
  // from tailwindcss
  // statIconColor: PropTypes.string,
};
