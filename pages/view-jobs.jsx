import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import axios from "axios";
import Jobs from "components/JobsComponents/CandidateJobs";

export default function ViewJobs({ jobs }) {
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
      title="Jobs"
      headerText="View Job Postings"
      image={session.user.image}
    >
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="flex-auto px-4 lg:px-10">
              {/*---------------------------------------- Featured & Latest Jobs------------------------------------- */}
              <div>
                <div className="mb-8">
                  <div className="flex flex-wrap mt-4">
                    {/*---------------------------------------- Featured & Latest Jobs------------------------------------- */}
                    <div className="md:col-span-2 h-fit sm:sticky top-0">
                      <hr className="my-4 md:min-w-full" />
                      <div className="flex justify-between mb-4">
                        <h1 className="text-xl font-bold">Latest Job Posts</h1>
                      </div>
                      <hr className="my-4 md:min-w-full" />

                      <Jobs jobs={jobs} />
                    </div>
                  </div>
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
  let jobs;
  await axios
    .get("http://localhost:8787/candidate/get-all-jobs")
    .then(function (response) {
      console.log(response);
      jobs = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return {
    props: {
      session,
      userId,
      jobs,
    },
  };
}
