
// import CandidatesTable from "components/OngoingRounds/CandidatesTable";
import EachBarChart from "components/Vendor/EachBarChart";

const EachVendorStat = ({hiredSeries,appliedSeries, title, Status}) => {


  return (
    <>
              <h1 className="text-xl font-bold">{title} </h1>

              <hr className="my-4 md:min-w-full" />

            <div className="flex flex-wrap mt-4">
              <div className=" mb-12 xl:mb-0 xl:w-6/12 px-4">
                 <EachBarChart title="Hired Candidates" series={hiredSeries}/>
              </div>
              <div className=" mb-12 xl:mb-0 xl:w-6/12  px-4">
                 <EachBarChart title="Applied Candidates" series={appliedSeries}/>
              </div>
            </div>
    </>
  );
};

export default EachVendorStat;