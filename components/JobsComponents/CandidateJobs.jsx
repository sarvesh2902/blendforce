/* eslint-disable @next/next/no-img-element */
import { BiBriefcase } from "react-icons/bi";
import { FiClock, FiUsers } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";

const Jobs = ({ jobs, jobCount }) => {
  return (
    <div className="rounded flex flex-wrap gap-3 mx-10">
      {jobs.map((job) => (
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
              {/* <JobSkillTags skills={job?.skills} /> */}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm">{job?.description.slice(0, 200)}...</p>
            <div className="flex-align-center gap-x-2 mb-2 mt-4">
              <div className=" bg-slate-200 rounded-sm flex-align-center flex-col sm:flex-row gap-2 px-2 py-1 dark:bg-hover-color flex align-middle">
                <div className="my-auto">
                  {" "}
                  <BiBriefcase />
                </div>
                <span className="text-muted sm:text-sm flex-shrink-0">
                  {job?.type_of_employment}
                </span>
              </div>
              <div className=" bg-slate-200 rounded-sm flex-align-center flex-col sm:flex-row gap-2 px-2 py-1 dark:bg-hover-color flex align-middle">
                <div className="my-auto">
                  <FiClock />
                </div>
                <span className="text-muted  sm:text-sm flex-shrink-0">
                  3 days left
                </span>
              </div>
            </div>
            <div className=" mt-4">
              <h1>
                {job?.salary_range}/
                <span className="text-sm text-muted">month</span>
              </h1>
              <div className="flex justify-center">
                <Link href="/apply">
                  <button
                    className="bg-indigo-500 text-white  active:bg-indigo-600 text-sm font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mt-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Apply
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

export default Jobs;
