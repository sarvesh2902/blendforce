import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import ApplicationForm from "components/ApplicationForm";
import { useRouter } from "next/router";
import axios from "axios";

export default function Apply({ candidate }) {
  const router = useRouter();
  const job = router.query;
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
      headerText="Job Details"
      image={session.user.image}
    >
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <ApplicationForm job={job} candidate={candidate} />
        </div>
      </div>
    </Admin>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  let userId = null;
  let candidate;
  await axios
    .post("http://localhost:8787/candidate/get-candidate-details", {
      email: session.user.email,
    })
    .then(function (response) {
      console.log(response);
      candidate = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return {
    props: {
      session,
      userId,
      candidate,
    },
  };
}
