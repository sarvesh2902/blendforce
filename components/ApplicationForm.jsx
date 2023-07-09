import React from "react";
import { useState } from "react";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    resume: null,
  });
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    console.log(formData);
  };
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="flex-auto px-4 lg:px-10 py-10">
        <div>
          <p className="font-bold text-center">
            Job Description: Fresher Software Development Engineer (SDE-1)
          </p>
          <br />
          <b>Company Overview:</b> We are a dynamic and innovative technology
          company that specializes in developing cutting-edge software
          solutions. As part of our commitment to fostering talent and nurturing
          future leaders in the field, we are seeking a highly motivated and
          skilled Fresher Software Development Engineer (SDE-1) to join our
          team.
          <br />
          <br />
          <b>Job Summary:</b> As a Fresher Software Development Engineer
          (SDE-1), you will be responsible for designing, coding, testing, and
          debugging software applications. You will work closely with a team of
          experienced software engineers and be involved in the entire software
          development lifecycle. This is an exciting opportunity for a talented
          individual to kickstart their career in software development and gain
          hands-on experience in a fast-paced, collaborative environment.
          <br />
          <br />
        </div>
        <h3 className="font-bold text-center">
          Apply for the role through the form below
        </h3>
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
              placeholder="resume"
              name="resume"
              required
              onChange={handleChange}
              value={formData.resume}
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

export default ApplicationForm;
