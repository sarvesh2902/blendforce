import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import TableComponent from "components/JobsComponents/Table/TableComponent";
import axios from "axios";

export default function Vendor({ candidatesGendorAndVendor }) {
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
      headerText="All Candidates Table"
      image={session.user.image}
    >
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-2">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="flex-auto py-10">
              <div className="  mb-12 xl:mb-0">
                <TableComponent
                  candidates={candidatesGendorAndVendor.candidates}
                />
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

  let candidatesGendorAndVendor = {};

  await axios
    .post("http://127.0.0.1:8787/jobs/analysis", {
      job_id: context.params.candidateTable,
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
    },
  };
}
