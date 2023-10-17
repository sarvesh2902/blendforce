import React, { useEffect } from "react";
import Link from "next/link";

export default function Navbar(props) {
  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       autoDisplay: false,
  //     },
  //     "google_translate_element"
  //   );
  // };
  // useEffect(() => {
  //   var addScript = document.createElement("script");
  //   addScript.setAttribute(
  //     "src",
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //   );
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = googleTranslateElementInit;
  //   console.log("kjnkas");
  // }, []);
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="flex flex-row justify-around space-x-1">
              <img
                src="https://res.cloudinary.com/sarveshp46/image/upload/v1696653667/Blue_Red_Modern_Team_Galaxy_Space_Voyager_Circle_Sticker_esm1lx.png"
                alt="up"
                className="w-16 h-16 object-cover rounded-full cursor-pointer mt-1"
              />
              <Link href="/" className="pt-2">
                <a
                  className="text-blueGray-700 text-xl font-bold leading-relaxed inline-block mr-4 py-4 whitespace-nowrap uppercase px-2"
                  href="#pablo"
                >
                  BlendForce
                </a>
              </Link>
            </div>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link href="/dashboard">
                  <a className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold">
                    Dashboard
                    {/* <span className="lg:hidden inline-block ml-2">Share</span> */}
                  </a>
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/departments">
                  <a className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold">
                    Departments
                    {/* <span className="lg:hidden inline-block ml-2">Share</span> */}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
