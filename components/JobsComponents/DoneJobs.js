/* eslint-disable @next/next/no-img-element */
import { BiBriefcase } from "react-icons/bi";
import { FiClock, FiUsers } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";


const DoneJobs = ({ jobs, jobCount }) => {
  const[count,setCount] = useState(4)
  useEffect(() => setCount(count+2),[jobCount])
  return (
    <div className="rounded flex flex-wrap gap-3 mx-10">
      {jobs?.slice(0, jobCount).map((job) => (
        <div
          className=" mx-8 min-w-[40%] rounded border card p-3 flex-1 basis-[16rem] sm:cursor-pointer"
          key={job.id}
        >
          <div className="rounded flex-align-center gap-3">
            <img
              src={job?.logo_url || "/images/whatsapp.png"}
              alt="logo"
              className="w-16 rounded-lg h-16"
            />
            <div>
              <Link href="/jobs/[id]" as={`/jobs/${job?.id}`}>
                <a className="!opacity-100 group-hover:text-primary">
                  <h1 className="text-xl font-semibold">{job?.title}</h1>
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm">{job?.description.slice(0, 200)}...</p>
            <div className="flex-align-center gap-x-2 mb-2 mt-4">
              <div className=" bg-slate-200 rounded-sm flex-align-center flex-col sm:flex-row gap-2 px-2 py-1 dark:bg-hover-color">
                <BiBriefcase />
                <span className="text-muted sm:text-sm flex-shrink-0">
                  {job?.type_of_employment}
                </span>
              </div>
              <div className=" bg-slate-200 rounded-sm flex-align-center flex-col sm:flex-row gap-2 px-2 py-1 dark:bg-hover-color">
                <FiUsers />
                <span className="text-muted sm:text-sm flex-shrink-0">
                  45 ShortListed
                </span>
              </div>
              <div className=" bg-slate-200 rounded-sm flex-align-center flex-col sm:flex-row gap-2 px-2 py-1 dark:bg-hover-color">
                <FiClock />
                <span className="text-muted  sm:text-sm flex-shrink-0">
                  Completed
                </span>
              </div>
            </div>
            <div className=" mt-4">
              <h1>
                {job?.salary_range}/
                <span className="text-sm text-muted">month</span>
              </h1>
              <div className="flex justify-center">
                <Link href="/done">
              <button
                className="bg-indigo-500 text-white  active:bg-indigo-600 text-sm font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mt-2 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Analyse Interviews
          </button>
          </Link>
          </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoneJobs;