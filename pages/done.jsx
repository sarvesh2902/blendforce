import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import Link from "next/link";
import DonutChart from "components/DoneRounds/DonutChart";
import EachRoundStat from "components/OngoingRounds/EachRoundStat";
import VendorBarChart from "components/OngoingRounds/VendorBarChart";
import axios from "axios";


export default function Done({candidatesGendorAndVendor,jobID}) {
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
      headerText="Analyze Completed Interviews"
      image={session.user.image}
    >


      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">


      <div className="flex-auto px-4 lg:px-10 py-10">

      <div className=" flex flex-wrap">
        <div className="w-6/12 mb-12 xl:mb-0 px-4">
        <DonutChart/>
        </div>
        <div className="  mb-12 xl:mb-0 w-6/12 px-4">
        <VendorBarChart vendor = {candidatesGendorAndVendor.vendor}/>
        </div>

      </div>




{/*---------------------------------------- Each Round Stats------------------------------------- */}

            <EachRoundStat title="Selected Candidates" Status="Completed" series={[2,2]} />

            <EachRoundStat title="HR Round" Status="Done" series={[4,4]} />

            <EachRoundStat title="Technical Interview 2" Status="Done" series={[6,4]} />

            <EachRoundStat title="Technical Interview 1" Status="Done" series={[10,8]} />

            <EachRoundStat title="Aptitude Round" Status="Done" series={[30,14,1]} />

            <EachRoundStat title="Applied Candidates" Status="Done" series={[55,29,1]} />




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
  let candidatesGendorAndVendor = {};
  let jobID = 123456

  await axios
    .post("http://127.0.0.1:8787/jobs/analysis", {
      job_id: "123456",
    })
    .then(function (response) {
      console.log(response);
      candidatesGendorAndVendor = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return {
    props: {
      session,
      userId,
      candidatesGendorAndVendor,
      jobID
    },
  };
}
