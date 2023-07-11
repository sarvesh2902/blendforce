// import CandidatesTable from "components/OngoingRounds/CandidatesTable";
import EachBarChart from "components/Vendor/EachBarChart";
import { useRouter } from "next/router";

const EachVendorStat = ({ hiredSeries, appliedSeries, title, Status }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
        <button
          className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => router.push("/vendor/campus")}
        >
          Analyse
        </button>
      </div>

      <hr className="my-4 md:min-w-full" />

      <div className="flex flex-wrap mt-4">
        <div className=" mb-12 xl:mb-0 xl:w-6/12 px-4">
          <EachBarChart title="Hired Candidates" series={hiredSeries} />
        </div>
        <div className=" mb-12 xl:mb-0 xl:w-6/12  px-4">
          <EachBarChart title="Applied Candidates" series={appliedSeries} />
        </div>
      </div>
    </>
  );
};

export default EachVendorStat;
