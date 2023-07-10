import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import axios from "axios";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderCards from "components/DepartmentComponents/HeaderCards";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Layout from "components/Layout";
import { getCookie } from "cookies-next";
import GenderPieChart from "components/DashboardComponents/GenderPieChart";
import EthnicityPieChart from "components/DashboardComponents/EthnicityPieChart";
import SexualityPieChart from "components/DashboardComponents/SexualityPieChart";
import LGBTQPieChart from "components/DashboardComponents/LGBTQPieChart";
import IndigenousPieChart from "components/DashboardComponents/IndigineousPieChart";
import DisabilityPieChart from "components/DashboardComponents/DisabilityPieChart";
import Recommendations from "components/Cards/Recommendations";

export default function Departments({
  recommendations,
  employeeData,
  deptName,
}) {
  const { data: session, status } = useSession();
  console.log(session);
  const [loading, setLoading] = useState(true);
  console.log(recommendations);
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
          <HeaderCards data={employeeData.departmentCounts} />
          <div className="px-4 md:px-10 mx-auto w-full -m-20">
            <div className="flex flex-wrap mt-2 justify-center">
              <div className=" mb-8 xl:mb-0 px-8">
                <div className="relative px-8 flex flex-col min-w-0 break-words bg-white mb-6 shadow-lg rounded">
                  <div>
                    <h3 className="font-bold text-xl text-emerald-700 uppercase text-center">
                      {deptName.toUpperCase()} Department
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex flex-wrap">
              <div className=" w-full xl:w-4/12 px-1">
                <div className=" w-full px-2 ">
                  <GenderPieChart data={employeeData.genderCounts} />
                </div>
                <div className="w-full  px-2">
                  <LGBTQPieChart data={employeeData.lgbtqCounts} />
                </div>
              </div>
              <div className=" w-full xl:w-4/12 px-1">
                <div className=" w-full px-2 ">
                  <EthnicityPieChart data={employeeData.ethnicityCounts} />
                </div>
                <div className="w-full  px-2">
                  <IndigenousPieChart data={employeeData.indigenousCounts} />
                </div>
              </div>

              <div className=" w-full xl:w-4/12 px-1">
                <div className=" w-full px-2">
                  <SexualityPieChart
                    data={employeeData.sexualOrientationCounts}
                  />
                </div>
                <div className="w-full  px-2">
                  <DisabilityPieChart data={employeeData.disabilityCounts} />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap mt-4">
              <div className="w-full px-4">
                <Recommendations recommendations={recommendations} />
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

  let employeeData;
  await axios
    .post("http://localhost:8787/employee/get-employees-dept", {
      department: context.params.department,
    })
    .then(function (response) {
      console.log(response);
      employeeData = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  let userId = null;

  let candidates;
  await axios
    .post("http://localhost:8787/candidate/get-candidates-dept", {
      department: context.params.department,
    })
    .then(function (response) {
      console.log(response);
      candidates = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  const recommendations = await axios.post(
    "http://127.0.0.1:5000/get-recommendations",
    candidates
  );

  return {
    props: {
      session,
      userId,
      deptName: context.params.department,
      recommendations: recommendations.data.recommendations,
      employeeData,
    },
  };
}
