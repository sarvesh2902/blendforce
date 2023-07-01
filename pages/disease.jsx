import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import DiseaseForm from "components/DiseaseForm";
import axios from "axios";

export default function Disease() {
  const { data: session, status } = useSession();
  console.log(session);
  const [loading, setLoading] = useState(true);
  // console.log(noOfReq);
  let userData = null;

  useEffect(() => {
    const securePage = async () => {
      if (status === "unauthenticated") {
        await signIn();

        await axios
          .post("http://localhost:3000/api/user-profile", {
            email: session.user.email,
          })
          .then(function (response) {
            console.log(response);
            userData = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

        console.log(userData);

        localStorage.setItem("noOfReq", userData.noOfReq);
        localStorage.setItem("sub", userData.sub);
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
      title="Disease Detection"
      headerText="Upload Image to detect crop disease"
      image={session.user.image}
    >
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <DiseaseForm email={session.user.email} />
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
