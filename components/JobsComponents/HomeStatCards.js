import React, { useState } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
// import { stats } from "../../data/stats";
import { BiEnvelope, BiFile } from "react-icons/bi";
import { FiBriefcase, FiUsers } from "react-icons/fi";

const HomeStatCards = () => {

  const [stats,setStats]= useState([
    {
      id: 1,
      icon: <FiBriefcase />,
      number: 256,
      title: "Job Views",
      percentage: 15,
      increment: true,
      cardBg: "#C7F4C2",
    },
    {
      id: 2,
      icon: <FiUsers />,
      number: 1245,
      title: "Job Applications",
      percentage: 4,
      increment: true,
      cardBg: "#D7D0FF",
    },
    {
      id: 3,
      icon: <BiFile />,
      number: 23365,
      title: "Posted Jobs",
      percentage: 10,
      increment: false,
      cardBg: "#FDDD8C",
    },
    {
      id: 4,
      icon: <BiEnvelope />,
      number: 123,
      title: "Unread Messages",
      percentage: 10,
      increment: false,
      cardBg: "#FFBBD7",
    },
  ])


  return (
    <div className="grid sm:grid-cols-2 gap-4 dark:text-slate-700">
      {stats.map(
        ({ id, icon, number, title, increment, percentage, cardBg }) => (
          <div
            className="p-2 rounded-md card-shadow dark:shadow-none"
            key={id}
            style={{ backgroundColor: cardBg }}
          >
            <div className="icon-box bg-dark-card hover:bg-dark-main text-white text-muted transition-a">
              {icon}
            </div>
            <div className="mt-2 flex-center-between">
              <div className="flex-1">
                <h1 className="text-2xl">{number}</h1>
                <p>{title}</p>
              </div>
              <div className="flex-1">
                <div className="flex-align-center space-x-2">
                  {increment ? (
                    <>
                      <p> +{percentage}</p>
                      <FiTrendingUp />
                    </>
                  ) : (
                    <>
                      <p> +{percentage}</p>
                      <FiTrendingDown />
                    </>
                  )}
                </div>
                <div className="w-full h-2 bg-primary-light mt-2 rounded-lg">
                  <div
                    className={`h-full w-1/2 rounded-lg ${
                      increment ? "bg-secondaryGreen" : "bg-secondaryRed"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default HomeStatCards;