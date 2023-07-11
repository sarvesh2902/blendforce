import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import EachVendorStat from "components/Vendor/EachVendorStat";
import VendorBarChart from "components/Vendor/VendorBarChart";

export default function Vendor() {
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
    <Admin title="" headerText="Vendor Analysis" image={session.user.image}>
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="flex-auto px-4 lg:px-10 py-10">
              <div className="  mb-12 xl:mb-0  px-4">
                <VendorBarChart />
              </div>

              {/*---------------------------------------- Each Round Stats------------------------------------- */}

              <EachVendorStat
                title="On Campus"
                Status="Hired Employees"
                hiredSeries={{
                  men: [690, 680, 645, 715, 400, 700],
                  women: [105, 160, 150, 190, 375, 480],
                  others: [5, 10, 15, 15, 25, 20],
                }}
                appliedSeries={{
                  men: [1690, 1680, 1645, 1715, 1400, 1700],
                  women: [205, 360, 250, 490, 675, 980],
                  others: [8, 15, 18, 19, 35, 29],
                }}
              />

              {/* <EachRoundStat title="Technical Interview 2" Status="Done" series={[6,4]} />

            <EachRoundStat title="Technical Interview 1" Status="Done" series={[10,8]} />

            <EachRoundStat title="Aptitude Round" Status="Done" series={[30,14,1]} />

            <EachRoundStat title="Applied Candidates" Status="Done" series={[75,49,1]} /> */}
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
