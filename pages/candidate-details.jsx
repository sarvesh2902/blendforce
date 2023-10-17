import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import axios from "axios";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderCards from "components/DepartmentComponents/HeaderCards";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

export default function Departments() {
  const router = useRouter();
  const data = router.query;
  console.log(data);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  let userData = null;
  const role = getCookie("role");

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
    <>
      <Layout title={Departments}>
        <Sidebar role={role} />
        <div className="relative md:ml-48 bg-blueGray-100">
          <AdminNavbar title={Departments} image={session.user.image} />
          {/* Header */}
          <HeaderCards />
          <div className="px-4 md:px-10 mx-auto w-full -m-20">
            <div className="flex flex-wrap mt-4">
              <div className="w-full px-4">
                <>
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                      <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3 className="font-semibold text-base text-blueGray-700">
                            Candidate Details
                          </h3>
                        </div>
                        {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div> */}
                      </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                      {/* Projects table */}
                      <table className="items-center w-full bg-transparent border-collapse">
                        <thead className="thead-light">
                          <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Property
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Name
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {data.Name}
                            </td>
                          </tr>
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Surname
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {data.Surname}
                            </td>
                          </tr>
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Score
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {data.ats_score}
                            </td>
                          </tr>
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Gender
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {data.Gender}
                            </td>
                          </tr>

                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Date of Birth
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {data["Date of Birth"]}
                            </td>
                          </tr>
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Disability
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {data.Disability}
                            </td>
                          </tr>
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Division
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {data.Division}
                            </td>
                          </tr>
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Email
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {data.Email}
                            </td>
                          </tr>
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Indigenous
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {data.Indigenous}
                            </td>
                          </tr>
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Minority
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {data.Minority}
                            </td>
                          </tr>
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Mobile Number
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {data["Mobile Number"]}
                            </td>
                          </tr>
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              Nationality
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {data.Nationality}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              </div>
            </div>

            <FooterAdmin />
          </div>
        </div>
      </Layout>
    </>
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
