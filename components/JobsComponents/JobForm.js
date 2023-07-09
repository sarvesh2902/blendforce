import React from "react";
import { useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

const JobForm = () => {
  const [formData, setFormData] = useState({
    job_id: "",
    job_title: "",
    company_name: "",
    company_location: "",
    skills: "",
    experience_level: "",
    type_of_employment: "",
    salary_range: "",
    experience: "",
    education: "",
    description: "",
    requirements_and_responsibilities:"",

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
    let data = null;

    await axios
      .post("http://127.0.0.1:8787/jobs/create", {
        job_id: Number(formData.job_id),
        job_title: formData.job_title,
        company_name: formData.company_name,
        company_location: formData.company_location,
        skills: formData.skills.split(','),
        experience_level: formData.experience_level,
        type_of_employment: formData.type_of_employment,
        salary_range: formData.salary_range,
        experience: formData.experience,
        education: formData.education,
        description: formData.description,
        requirements_and_responsibilities:formData.requirements_and_responsibilities,

      })
      .then(function (response) {
        setIsDisabled(false);
        setIsLoading(false);
        data = response.data;
        console.log(data);
        setOutput(data);
        console.log(output);
      })
      .catch(function (error) {
        console.log(error);
      });
    setFormData({
    job_id: 0,
    job_title: "",
    company_name: "",
    company_location:"",
    skills: "",
    experience_level: "",
    type_of_employment: "",
    salary_range: "",
    experience: "",
    education: "",
    description: "",
    requirements_and_responsibilities:"",
    });
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">


      <div className="flex-auto px-4 lg:px-10 py-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="mr-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="job_id"
              >
                Job_id
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="job_id"
                type="number"
                placeholder="123456"
                name="job_id"
                required
                onChange={handleChange}
                value={formData.job_id}
              />
            </div>

            <div className="ml-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="job_title"
              >
                Job_title
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="job_title"
                type="text"
                placeholder="Software Developer 1"
                name="job_title"
                required
                min="0"
                max="100"
                onChange={handleChange}
                value={formData.job_title}
              />
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="mr-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="company_name"
              >
                Company_Name
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="company_name"
                type="text"
                placeholder="Nomura"
                name="company_name"
                required
                min="0"
                max="100"
                onChange={handleChange}
                value={formData.company_name}
              />
            </div>

            <div className="ml-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="company_location"
              >
                Company_Location
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="company_location"
                type="text"
                placeholder="Powai, Mumbai"
                name="company_location"
                required
                min="0"
                max="100"
                onChange={handleChange}
                value={formData.company_location}
              />
            </div>
          </div>

          <div className="grid grid-cols-2">
          <div className="mb-3 mr-2">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="experience_level"
            >
              Experience_Level
            </label>
            <select
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="experience_level"
              name="experience_level"
              required
              onChange={handleChange}
              value={formData.experience_level}
            >
              <option value="Entry Level">Entry Level</option>
              <option value="Senior Level" selected>
                Senior Level
              </option>
            </select>
          </div>
          <div className="mb-3 mr-2">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="type_of_employment"
            >
              Type of Employment
            </label>
            <select
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="type_of_employment"
              name="type_of_employment"
              required
              onChange={handleChange}
              value={formData.type_of_employment}
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time" selected>
                Part Time
              </option>
              <option value="Internship" selected>
                Internship
              </option>
            </select>
          </div>
          </div>

          <div className="grid grid-cols-2">
          <div className="mb-3 mr-2">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="experience"
            >
              Experience
            </label>
            <select
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="experience"
              name="experience"
              required
              onChange={handleChange}
              value={formData.experience}
            >
              <option value="0-1 years">0-1 years</option>
              <option value="1-2 years" selected>
                1-2 years
              </option>
            </select>
          </div>
          <div className="mb-3 mr-2">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="Education"
            >
              Education
            </label>
            <select
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="education"
              name="education"
              required
              onChange={handleChange}
              value={formData.education}
            >
              <option value="Bachelors Degree">Bachelors Degree</option>
              <option value="Masters Degree" selected>
              Masters Degree
              </option>
              <option value="MBA Degree" selected>
              MBA Degree
              </option>
            </select>
          </div>
          </div>


          <div className="mb-3 mr-2">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="skills"
            >
              Skills (separate with comma , )
            </label>
            <input
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="skills"
              name="skills"
              required
              placeholder="Java, JavaScript, MongoDB"
              onChange={handleChange}
              value={formData.skills}
            >

            </input>
          </div>


          <div className="mb-3 mr-2">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="description"
              name="description"
              required
              placeholder="Nomura is seeking a highly motivated Software Engineer to join our team...."
              onChange={handleChange}
              value={formData.description}
            >

            </textarea>
          </div>

          <div className="mb-3 mr-2">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="requirements_and_responsibilities"
            >
              Requirements and Responsibilities
            </label>
            <textarea
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="requirements_and_responsibilities"
              name="requirements_and_responsibilities"
              required
              placeholder={`Design, develop, and maintain software for Google products, \nWork with a team of engineers to implement new features,...`}
              onChange={handleChange}
              value={formData.requirements_and_responsibilities}
            >

            </textarea>
          </div>

          <div className="mb-3 mr-2">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="salary_range"
            >
              Salary Range
            </label>
            <input
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="salary_range"
              name="salary_range"
              required
              placeholder="10-15 LPA"
              onChange={handleChange}
              value={formData.salary_range}
            >

            </input>
          </div>




          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isDisabled}
              className="w-96 h-12 flex justify-center items-center text-md text-white bg-blueGray-800 hover:bg-blueGray-800 transition-all font-medium rounded-lg px-5 py-2.5 text-center"
            >
              {isLoading ? (
                <ReactLoading
                  type="bars"
                  color="#ffffff"
                  height={25}
                  width={25}
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>

          {output ? (
            <div className="px-6 py-4 border-0 rounded relative my-4">
              <div
                class="bg-blue-100 border-t-4 border-blue-500 rounded-b flex text-blue-900 px-4 py-3 shadow-md"
                role="alert"
              >
                <div class="flex">
                  <div class="py-1">
                    <svg
                      class="fill-current h-6 w-6 text-blue-500 mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center">
                  <p class="font-bold text-xl">Created Job with job_id : </p>
                  <p class="text-lg ml-4">{output.msg.job_id}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <img src="https://res.cloudinary.com/sarveshp46/image/upload/v1673158646/nothing-here_w38mzj.webp" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobForm;