/* eslint-disable @next/next/no-img-element */
import { BiBriefcase, BiMap } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const FeaturedCompanies = () => {

  const [companies,setcompanies] = useState([
    {
      id: 1,
      name: "Nomura Kakushin",
      location: "Powai, Mumbai",
      number_of_vacancies: 142,
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 2,
      name: "Nomura Kakushin",
      location: "Powai, Mumbai",
      number_of_vacancies: 233,
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 3,
      name: "Nomura Kakushin",
      location: "Powai, Mumbai",
      number_of_vacancies: 112,
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 4,
      name: "Nomura Kakushin",
      location: "Powai, Mumbai",
      number_of_vacancies: 124,
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 5,
      name: "Nomura Kakushin",
      location: "Powai, Mumbai",
      number_of_vacancies: 86,
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 6,
      name: "Nomura Kakushin",
      location: "Powai, Mumbai",
      number_of_vacancies: 26,
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
  ])

  return (
    <div className="mt-8">
      <h1 className="text-xl font-bold">Feauted Companies</h1>
      <div className="flex gap-3 flex-wrap mt-4">
        {companies.map((company) => (
          <div className="flex-1 basis-[12rem] card p-3" key={company.id}>
            <div className="flex-align-center gap-3">
              <img
                src={company?.logo_url || "/images/twitter.png"}
                alt=""
                className="w-10 rounded-lg"
              />
              <div>
                <h1>{company?.name}</h1>
                <div className="flex-align-center gap-2">
                  <FaStar className="text-yellow-500 text-sm" />
                  <span className="text-muted text-sm">4.8k</span>
                </div>
              </div>
            </div>
            <div className="flex-align-center gap-2 mt-2">
              <BiMap className="text-muted" />
              <span className="text-muted">{company?.location}</span>
            </div>
            <div className="flex-align-center gap-2 mt-2">
              <BiBriefcase className="text-muted" />
              <span className="text-muted">
                {company?.number_of_vacancies} Job Vacancies
              </span>
            </div>
            <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 transition-a dark:bg-hover-color rounded-md capitalize mt-3">
              more details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCompanies;