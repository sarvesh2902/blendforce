
import { useEffect, useState } from "react";
import CandidatesTable from "components/OngoingRounds/CandidatesTable";
import EachRoundChart from "components/OngoingRounds/EachRoundChart";

const EachRoundStat = ({series, title, Status}) => {


  return (
    <>
     <div className="w-full flex my-4 ">
              <h1 className="text-xl font-bold">{title} </h1>
              <span className="mx-5 flex  bg-red-700 rounded text-white">
                        <p className="mx-2 text-sm font-bold"> {Status}</p>
                        </span>
            </div>
            <hr className="my-4 md:min-w-full" />

            <div className="flex flex-wrap mt-4">
              <div className=" mb-12 xl:mb-0 xl:w-8/12 px-4">
                 <EachRoundChart title="" series={series}/>
              </div>
              <div className=" mb-12 xl:mb-0 xl:w-4/12 px-4">
                <CandidatesTable Status={Status}/>
              </div>
            </div>
    </>
  );
};

export default EachRoundStat;