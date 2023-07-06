import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import Link from "next/link";
import DoughnutChart from "components/Applicants/DoughnutChart";
import TopApplicant from "components/Applicants/TopApplicant";
import VendorBarChart from "components/OngoingRounds/VendorBarChart";

export default function Applicants() {
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
      title="Job Details"
      headerText="Analyze Applicants"
      image={session.user.image}
    >


      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">


      <div className="flex-auto px-4 lg:px-10 py-10">

      <div className=" flex flex-wrap">
        <div className="w-6/12  mb-12 xl:mb-0 px-4">
        <DoughnutChart/>
        </div>
        <div className="  mb-12 xl:mb-0 w-6/12 px-4">
        <VendorBarChart/>
        </div>


      </div>




{/*---------------------------------------- Featured & Latest Jobs------------------------------------- */}

            <div className="w-full flex justify-between mb-4">
              <h1 className="text-xl font-bold"> Top Candidates </h1>
              <Link href="/search">
                <a className=" border rounded bg-blue-700 px-2 mx-12 flex justify-between flex-align-center gap-x-2 text-primary">
                  <span className="font-bold text-white">See All</span>


                </a>
              </Link>
            </div>
            <hr className="my-4 md:min-w-full" />

            <div className="flex flex-wrap mt-4">
              <div className="w-full mb-12 xl:mb-0 px-4">
                <TopApplicant />
              </div>
            </div>




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
