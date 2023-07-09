import React from "react";
import Layout from "./Layout";
import { useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    Location: "mumbai",
    Moist: 0,
    Soil: 0,
    Crop: 0,
    N: 0,
    K: 0,
    P: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [output, setOutput] = useState(null);
  const handleChange = (event) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDisabled(true);
    setIsLoading(true);
    console.log(formData);
  };
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="flex-auto px-4 lg:px-10 py-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="mb-3 mr-2">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                required
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="ml-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                required
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="mr-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="mobile"
              >
                Mobile Number
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="mobile"
                type="tel"
                placeholder="Mobile Number"
                name="mobile"
                required
                onChange={handleChange}
                value={formData.mobile}
              />
            </div>
            <div className="ml-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="age"
                type="number"
                placeholder="Age"
                name="age"
                required
                onChange={handleChange}
                value={formData.age}
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="mb-3 mr-2">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="department"
              >
                Department
              </label>
              <select
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="department"
                name="department"
                required
                onChange={handleChange}
                value={formData.department}
              >
                <option value="IT" selected>
                  IT
                </option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
                <option value="RD">RD</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div className="mb-3 ml-2">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="position"
              >
                Position
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="position"
                type="text"
                placeholder="Position"
                name="position"
                required
                onChange={handleChange}
                value={formData.position}
              />
            </div>
          </div>

          <div className="flex justify-evenly mt-6">
            <button
              type="submit"
              className="w-96 h-12 flex justify-center items-center text-md text-white bg-blueGray-800 hover:bg-blueGray-800 transition-all font-medium rounded-lg px-5 py-2.5 text-center"
            >
              Submit
            </button>
            <button
              type="button"
              className="w-96 h-12 flex justify-center items-center text-md text-white bg-red-600 hover:bg-blueGray-800 transition-all font-medium rounded-lg px-5 py-2.5 text-center"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
