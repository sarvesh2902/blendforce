import React from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ProfileForm = ({ candidate }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: candidate?.name ?? "",
    email: candidate?.email ?? "",
    mobile: candidate?.mobile ?? "",
    gender: candidate?.gender ?? "",
    ethnicity: candidate?.ethnicity ?? "",
    resume: null,
  });

  const handleChange = (event) => {
    if (event.target.type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        resume: event.target.files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("ethnicity", formData.ethnicity);
    formDataToSend.append("resume", formData.resume);

    await axios
      .post("http://localhost:8787/candidate/save-profile", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type as multipart/form-data
        },
      })
      .then(function (response) {
        console.log(response);
        router.push("/view-jobs");
      })
      .catch(function (error) {
        console.log(error);
        alert("Failed to save profile");
      });
  };
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="flex-auto px-4 lg:px-10 py-10">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
          <div className="grid grid-cols-2">
            <div className="mr-2 mb-3">
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
            <div className="ml-2 mb-3">
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
          </div>

          <div className="grid grid-cols-2">
            <div className="mr-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                onChange={handleChange}
                value={formData.gender}
                id="gender"
                name="gender"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option value="">--Please choose an option--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mr-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="ethnicity"
              >
                Ethinicity
              </label>
              <select
                onChange={handleChange}
                value={formData.ethnicity}
                id="ethnicity"
                name="ethnicity"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              >
                <option value="">--Please choose an option--</option>
                <option value="White">White</option>
                <option value="Asian">Asian</option>
                <option value="Black">Black</option>
                <option value="Middle Eastern">Middle Eastern</option>
                <option value="Latin">Latin</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="resume"
            >
              Resume
            </label>
            <input
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="resume"
              type="file"
              placeholder="Resume"
              name="resume"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-96 h-12 flex justify-center items-center text-md text-white bg-blueGray-800 hover:bg-blueGray-800 transition-all font-medium rounded-lg px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
