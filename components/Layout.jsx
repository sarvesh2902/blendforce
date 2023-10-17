import React, { FC } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ title, content, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        {/* <link
          rel="icon"
          href="https://res.cloudinary.com/sarveshp46/image/upload/v1696653667/Blue_Red_Modern_Team_Galaxy_Space_Voyager_Circle_Sticker_esm1lx.png"
        /> */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="">{children}</div>
    </>
  );
};

export default Layout;
