import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import Link from "next/link";
import DonutChart from "components/OngoingRounds/DonutChart";
import CandidatesTable from "components/OngoingRounds/CandidatesTable";
import EachRoundChart from "components/OngoingRounds/EachRoundChart";
import EachRoundStat from "components/OngoingRounds/EachRoundStat";
import VendorBarChart from "components/OngoingRounds/VendorBarChart";

export default function Ongoing() {
  const { data: session, status } = useSession();
  console.log(session);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const securePage = () => {
      if (status === "unauthenticated") {
        signIn();
      } else {
        setLoading(false);
      }
    };
    securePage();
  });

  if (loading) {
    return <h2 style={{ marginTop: 100, textAlign: "center" }}>LOADING...</h2>;
  }
  return (
    <Admin
      title=""
      headerText="Analyze Ongoing Interviews"
      image={session.user.image}
    >


      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">


      <div className="flex-auto px-4 lg:px-10 py-10">

      <div className=" flex flex-wrap">
        <div className="  mb-12 xl:mb-0 w-6/12 px-4">
        <DonutChart/>
        </div>
        <div className="  mb-12 xl:mb-0 w-6/12 px-4">
        <VendorBarChart/>
        </div>
      </div>




{/*---------------------------------------- Each Round Stats------------------------------------- */}

            <EachRoundStat title="HR Round" Status="Ongoing.." series={[4,4]} />

            <EachRoundStat title="Technical Interview 2" Status="Done" series={[6,4]} />

            <EachRoundStat title="Technical Interview 1" Status="Done" series={[10,8]} />

            <EachRoundStat title="Aptitude Round" Status="Done" series={[30,14,1]} />

            <EachRoundStat title="Applied Candidates" Status="Done" series={[75,49,1]} />




          </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  let userId = null;

  return {
    props: {
      session,
      userId,
    },
  };
}
