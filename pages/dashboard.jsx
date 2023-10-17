import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import axios from "axios";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderDashboard from "components/Headers/HeaderDashboard.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Layout from "components/Layout";
import { getCookie } from "cookies-next";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardPieChart from "components/Cards/CardPieChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

import GenderPieChart from "components/DashboardComponents/GenderPieChart";
import EthnicityPieChart from "components/DashboardComponents/EthnicityPieChart";
import MenToFemaleLineChart from "components/DashboardComponents/MenToFemaleLineChart";
import SexualityPieChart from "components/DashboardComponents/SexualityPieChart";
import LGBTQPieChart from "components/DashboardComponents/LGBTQPieChart";
import IndigenousPieChart from "components/DashboardComponents/IndigineousPieChart";
import DisabilityPieChart from "components/DashboardComponents/DisabilityPieChart";
import EthinicityLineChart from "components/DashboardComponents/EthnicityLineChart";

export default function Dashboard({ employeeData }) {
  const { data: session, status } = useSession();
  console.log(session);
  const [loading, setLoading] = useState(true);
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
          <HeaderDashboard />
          <div className="px-4 md:px-10 mx-auto w-full -m-24">
            <div className=" flex flex-wrap">
              <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                <MenToFemaleLineChart />
              </div>

              <div className=" w-full xl:w-4/12 px-1">
                <div className=" w-full px-2">
                  <GenderPieChart data={employeeData.genderCounts} />
                </div>
                <div className="w-full  px-2">
                  <IndigenousPieChart data={employeeData.indigenousCounts} />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap mt-4">
              <div className="w-full mb-12 xl:mb-0 px-4">
                <CardPageVisits />
              </div>
            </div>

            <div className="flex flex-wrap mt-4">
              <div className="w-full px-4">
                <CardSocialTraffic />
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

  let employeeData;
  await axios
    .post("http://localhost:8787/employee/get-employees-count", {})
    .then(function (response) {
      console.log(response);
      employeeData = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return {
    props: {
      session,
      userId,
      employeeData,
    },
  };
}
