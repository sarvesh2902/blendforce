import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import ProfileForm from "components/ProfileForm";

export default function Apply() {
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
      title="Candidate Profile"
      headerText="Candidate Profile"
      image={session.user.image}
    >
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <ProfileForm email={session.user.email} />
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
