import React from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Layout from "components/Layout";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

export default function Admin({ children, title, headerText, image }) {
  const role = getCookie("role");
  return (
    <Layout title={title}>
      <Sidebar role={role} />
      <div className="relative md:ml-48 bg-blueGray-100">
        <AdminNavbar title={title} image={image} />
        {/* Header */}
        <HeaderStats headerText={headerText} />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </Layout>
  );
}
