import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import axios from "axios";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Layout from "components/Layout";
import HeaderEmployees from "components/Headers/HeaderEmployees";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

export default function Dashboard({ employees }) {
  const { data: session, status } = useSession();
  console.log(session);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // console.log(noOfReq);
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

  const handleDownloadClick = () => {
    fetch("http://localhost:8787/employee/download-employees-csv")
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "employees.csv";
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error(error));
  };

  if (loading) {
    return <h2 style={{ marginTop: 100, textAlign: "center" }}>LOADING...</h2>;
  }
  return (
    <>
      <Layout title={Dashboard}>
        <Sidebar role={role} />
        <div className="relative md:ml-48 bg-blueGray-100">
          <AdminNavbar title={Dashboard} image={session.user.image} />
          {/* Header */}
          <HeaderEmployees handleExport={handleDownloadClick} />
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <div className="flex flex-wrap mt-4 justify-center">
              <div className="w-full mb-12 xl:mb-0 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">
                          Employees
                        </h3>
                      </div>
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                        <button
                          className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            router.push("/employee-details");
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead className="thead-light">
                        <tr>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Name
                          </th>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Department
                          </th>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Position
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((employee) => {
                          return (
                            <tr>
                              <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                <div className="cursor-pointer">
                                  {employee.name}
                                </div>
                              </th>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {employee.department.toUpperCase()}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {employee.position.toUpperCase()}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* <button onClick={handleDownloadClick}>Export</button> */}
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

  let employees;
  await axios
    .get("http://localhost:8787/employee/get-all-employees")
    .then(function (response) {
      console.log(response);
      employees = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return {
    props: {
      session,
      userId,
      employees,
    },
  };
}
