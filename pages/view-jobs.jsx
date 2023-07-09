import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import Skeleton from "components/JobsComponents/Skeleton";
import Jobs from "components/JobsComponents/CandidateJobs";

export default function ViewJobs() {
  const { data: session, status } = useSession();
  console.log(session);
  const [loading, setLoading] = useState(true);
  const [jobCount, setJobCount] = useState(4);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Software Engineer",
      company_name: "Nomura",
      company_location: "Powai, Mumbai",
      skills: ["JavaScript", "Python", "React"],
      experience_level: "Senior Level",
      type_of_employment: "Full Time",
      salary_range: "$85k - 115k",
      experience: "1 - 2 Years",
      education: "Bachelor's Degree",
      overview:
        "An exciting opportunity to work as a Software Engineer at Google",
      description:
        "Nomura is seeking a highly motivated Software Engineer to join our team. The successful candidate will be responsible for developing, testing and deploying software for our products. This is an excellent opportunity to work with some of the brightest minds in the industry and to make a significant impact on the way people use technology.  As a Software Engineer, you will be responsible for designing, developing and maintaining software for our products. You will work with a team of engineers to implement new features, and improve the performance and scalability of existing systems. You will also be responsible for testing and debugging code, and for troubleshooting and resolving technical issues.The ideal candidate will have a strong background in software development, with experience in at least one programming language such as JavaScript, Python or React. A passion for technology and an aptitude for problem-solving is also essential. If you are excited by the prospect of working in a fast-paced and dynamic environment, and are ready to take your career to the next level, we would love to hear from you!",
      requirements_and_responsibilities: [
        "Design, develop, and maintain software for Google products",
        "Work with a team of engineers to implement new features",
        "Improve the performance and scalability of existing systems",
        "Test and debug code",
        "Troubleshoot and resolve technical issues",
        "Minimum of 2 years experience in software development",
        "Experience with at least one programming language such as JavaScript, Python or React",
      ],
      time_posted: "2022-09-01",
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
      banner_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 2,
      title: "Data Scientist",
      company_name: "Nomura",
      company_location: "Seattle, WA",
      skills: ["Python", "R", "Machine Learning"],
      experience_level: "Senior Level",
      type_of_employment: "Part Time",
      salary_range: "$115k - 145k",
      experience: "Over 6 Years",
      education: "Master's Degree",
      overview: "An exciting opportunity to work as a Data Scientist at Amazon",
      description:
        "Nomura is seeking a highly motivated Data Scientist to join our team. The successful candidate will be responsible for analyzing large data sets and using statistical and machine learning techniques to extract insights and inform business decisions. This is an excellent opportunity to work with some of the brightest minds in the industry and to make a significant impact on the way we use data at Amazon. As a Data Scientist, you will be responsible for designing and implementing experiments, analyzing data, and building models to inform business decisions. You will also be responsible for communicating your findings to stakeholders and collaborating with cross-functional teams to implement data-driven solutions. The ideal candidate will have a strong background in statistics, mathematics, and computer science, with experience in at least one programming language such as Python or R, and experience with machine learning techniques. Strong communication skills and the ability to work well in a team environment are also essential. If you are excited by the prospect of working with large data sets, and are ready to take your career to the next level, we would love to hear from you!",
      requirements_and_responsibilities: [
        "Analyze large data sets using statistical and machine learning techniques",
        "Design and implement experiments, analyze data, and build models",
        "Communicate findings to stakeholders and collaborate with cross-functional teams",
        "Minimum of 2 years experience in data science",
        "Experience with at least one programming language such as Python or R",
        "Experience with machine learning techniques",
        "Strong communication skills and ability to work well in a team environment",
      ],
      time_posted: "2022-09-01",
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
      banner_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 3,
      title: "Product Manager",
      company_name: "Nomura",
      company_location: "Menlo Park, CA",
      skills: [
        "Product Management",
        "Product Development",
        "Project Management",
      ],
      experience_level: "Director",
      type_of_employment: "Contract",
      salary_range: "$145k - 175k",
      experience: "Over 6 Years",
      education: "PHD",
      overview:
        "An exciting opportunity to work as a Product Manager at Facebook",
      description:
        "Nomura is seeking a highly motivated Product Manager to join our team. The successful candidate will be responsible for leading the development and launch of new products and features. This is an excellent opportunity to work with some of the brightest minds in the industry and to make a significant impact on the way people connect and share on Facebook. As a Product Manager, you will be responsible for defining and driving the product vision, gathering and prioritizing product and customer requirements, and working closely with cross-functional teams to deliver products and features on time and on budget. You will also be responsible for analyzing market trends, identifying new opportunities, and measuring the success of the products you launch. The ideal candidate will have a strong background in product management, product development, and project management, with experience in leading cross-functional teams. Strong communication skills and the ability to work well under pressure are also essential. If you are excited by the prospect of working in a fast-paced and dynamic environment, and are ready to take your career to the next level, we would love to hear from you!",
      requirements_and_responsibilities: [
        "Lead the development and launch of new products and features",
        "Define and drive the product vision, gather and prioritize product and customer requirements",
        "Work closely with cross-functional teams to deliver products and features on time and on budget",
        "Analyze market trends, identify new opportunities, and measure the success of the products you launch",
        "Minimum of 2 years experience in product management and product development",
        "Experience leading cross-functional teams",
        "Strong communication skills and ability to work well under pressure",
      ],
      time_posted: "20 22-09-01",
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
      banner_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 4,
      title: "Software Engineer",
      company_name: "Nomura",
      company_location: "Mountain View, CA",
      skills: ["Software Development", "JavaScript", "React"],
      experience_level: "Entry Level",
      type_of_employment: "Part Time",
      salary_range: "$40k -55k",
      experience: "1 - 2 Years",
      education: "Vocational Course",
      overview: "Join the Google team as a Software Engineer",
      description:
        "Nomura is looking for a Software Engineer to join our team. You will be responsible for designing, developing, and maintaining web applications and services. You will work in a fast-paced, collaborative environment and have the opportunity to make a significant impact on the way people access and use information. As a Software Engineer, you will be responsible for writing clean, efficient, and well-documented code. You will also be responsible for testing and debugging your code, and for collaborating with other engineers to deliver high-quality products and features.The ideal candidate will have a strong background in software development, with experience in at least one programming language such as JavaScript or React, and experience with web development. Strong problem-solving skills and the ability to work well in a team environment are also essential. If you are excited by the prospect of working at a company that is at the forefront of technology, and are ready to take your career to the next level, we would love to hear from you!",
      requirements_and_responsibilities: [
        "Design, develop, and maintain web applications and services",
        "Write clean, efficient, and well-documented code",
        "Test and debug code",
        "Collaborate with other engineers to deliver high-quality products and features",
        "Minimum of 2 years experience in software development",
        "Experience with at least one programming language such as JavaScript or React",
        "Strong problem-solving skills and ability to work well in a team environment",
      ],
      time_posted: "2022-09-01",
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
      banner_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 5,
      title: "Frontend Developer",
      company_name: "Nomura",
      company_location: "San Francisco, CA",
      skills: ["JavaScript", "React", "CSS"],
      experience_level: "Student Level",
      type_of_employment: "Internship",
      salary_range: "$40k -55k",
      experience: "Under 1 Year",
      education: "Graduated High School",
      overview: "Join the Uber team as a Frontend Developer",
      description:
        "Nomura is looking for a Frontend Developer to join our team. You will be responsible for developing and maintaining the user interface of our web and mobile applications. You will work in a fast-paced, collaborative environment and have the opportunity to make a significant impact on the user experience of our products. As a Frontend Developer, you will be responsible for building and implementing user interfaces using technologies such as JavaScript, React, and CSS. You will also be responsible for testing and debugging your code, and for collaborating with other engineers and designers to deliver high-quality products and features.The ideal candidate will have a strong background in Frontend development, with experience in technologies such as JavaScript, React, and CSS. Strong problem-solving skills and the ability to work well in a team environment are also essential. If you are excited by the prospect of working at a company that is at the forefront of technology, and are ready to take your career to the next level, we would love to hear from you!",
      requirements_and_responsibilities: [
        "Develop and maintain the user interface of web and mobile applications",
        "Build and implement user interfaces using technologies such as JavaScript, React, and CSS",
        "Test and debug code",
        "Collaborate with other engineers and designers to deliver high-quality products and features",
        "Minimum of 2 years experience in Frontend development",
        "Experience with technologies such as JavaScript, React, and CSS",
        "Strong problem-solving skills and ability to work well in a team environment",
      ],
      time_posted: "2022-09-01",
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
      banner_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 6,
      title: "Data Analyst",
      company_name: "Nomura",
      company_location: "Los Gatos, CA",
      skills: ["Data Analysis", "Python", "SQL"],
      experience_level: "Senior Level",
      type_of_employment: "Contract",
      salary_range: "$115k - 145k",
      experience: "2 - 6 Years",
      education: "PHD",
      overview: "Join the Netflix team as a Data Analyst",
      description:
        "Nomura is looking for a Data Analyst to join our team. You will be responsible for collecting, analyzing, and interpreting large sets of data to inform business decisions. You will work in a fast-paced, collaborative environment and have the opportunity to make a significant impact on the success of our company. As a Data Analyst, you will be responsible for using tools such as Python and SQL to collect and analyze data. You will also be responsible for creating reports and visualizations to communicate your findings to stakeholders. In addition, you will be responsible for identifying trends and patterns in the data and making recommendations for action. The ideal candidate will have a strong background in data analysis, with experience in tools such as Python and SQL. Strong problem-solving skills and the ability to work well in a team environment are also essential. If you are excited by the prospect of working at a company that is at the forefront of technology, and are ready to take your career to the next level, we would love to hear from you!",
      requirements_and_responsibilities: [
        "Collect, analyze, and interpret large sets of data",
        "Use tools such as Python and SQL to collect and analyze data",
        "Create reports and visualizations to communicate findings to stakeholders",
        "Identify trends and patterns in the data and make recommendations for action",
        "Minimum of 2 years experience in data analysis",
        "Experience with tools such as Python and SQL",
        "Strong problem-solving skills and ability to work well in a team environment",
      ],
      time_posted: "2022-09-01",
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
      banner_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 7,
      title: "DevOps Engineer",
      company_name: "Nomura",
      company_location: "Seattle, WA",
      skills: ["DevOps", "AWS", "Linux"],
      experience_level: "Senior Level",
      type_of_employment: "Remote",
      salary_range: "$85k - 115k",
      experience: "2 - 6 Years",
      education: "Associate Studies",
      overview: "Join the Amazon team as a DevOps Engineer",
      description:
        "Nomura is looking for a DevOps Engineer to join our team. You will be responsible for designing, implementing, and maintaining the infrastructure and tools that support the development, testing, and deployment of our products. You will work in a fast-paced, collaborative environment and have the opportunity to make a significant impact on the success of our company. As a DevOps Engineer, you will be responsible for designing and implementing infrastructure and tools using technologies such as AWS and Linux. You will also be responsible for automating the deployment process and ensuring the reliability and scalability of our systems. In addition, you will be responsible for collaborating with other engineers and stakeholders to deliver high-quality products and features. The ideal candidate will have a strong background in DevOps, with experience in technologies such as AWS and Linux. Strong problem-solving skills and the ability to work well in a team environment are also essential. If you are excited by the prospect of working at a company that is at the forefront of technology, and are ready to take your career to the next level, we would love to hear from you!",
      requirements_and_responsibilities: [
        "Design, implement, and maintain infrastructure and tools",
        "Use technologies such as AWS and Linux",
        "Automate the deployment process and ensure reliability and scalability of systems",
        "Collaborate with other engineers and stakeholders to deliver high-quality products and features",
        "Minimum of 2 years experience in DevOps",
        "Experience with technologies such as AWS and Linux",
        "Strong problem-solving skills and ability to work well in a team environment",
      ],
      time_posted: "2022-09-01",
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
      banner_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 8,
      title: "Java Developer",
      company_name: "Nomura",
      company_location: "Mountain View, CA",
      skills: ["Java", "Spring", "Agile"],
      experience_level: "Mid Level",
      type_of_employment: "Freelance",
      salary_range: "$40k -55k",
      experience: "1 - 2 Years",
      education: "Bachelor's Degree",
      overview: "Join the Google team as a Java Developer ",
      description:
        "Nomura is looking for a talented Java Developer to join our team. As a Java Developer, you will be responsible for designing, developing, and maintaining our core applications and services. You will work in a fast-paced, collaborative environment and have the opportunity to make a significant impact on the success of our company.As a Java Developer, you will be responsible for designing and implementing new features and functionality using Java and the Spring Framework. You will also be responsible for maintaining and improving existing codebase. Additionally, you will be responsible for collaborating with other engineers and stakeholders to deliver high-quality products and features. The ideal candidate will have a strong background in Java development, with experience in technologies such as Spring and Agile development methodologies. Strong problem-solving skills and the ability to work well in a team environment are also essential. If you are excited by the prospect of working at a company that is at the forefront of technology, and are ready to take your career to the next level, we would love to hear from you!",
      requirements_and_responsibilities: [
        "Design, develop, and maintain core applications and services",
        "Use Java and the Spring Framework",
        "Maintain and improve existing codebase",
        "Collaborate with other engineers and stakeholders to deliver high-quality products and features",
        "Minimum of 3 years experience in Java development",
        "Experience with technologies such as Spring and Agile development methodologies",
        "Strong problem-solving skills and ability to work well in a team environment",
      ],
      time_posted: "2022-09-01",
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
      banner_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 9,
      title: "Frontend Developer",
      company_name: "Nomura",
      company_location: "Stockholm, Sweden",
      skills: ["JavaScript", "React", "CSS"],
      experience_level: "Entry level",
      type_of_employment: "Part Time",
      salary_range: "$55k - 85k",
      experience: "1 - 2 Years",
      education: "Bachelor's Degree",
      overview: "Join the Spotify team as a Frontend Developer",
      description:
        "Nomura is looking for a Frontend Developer to join our team. You will be responsible for designing, developing, and maintaining our web applications. You will work in a fast-paced, collaborative environment and have the opportunity to make a significant impact on the success of our company. As a Frontend Developer, you will be responsible for designing and implementing new features and functionality using JavaScript, React, and CSS. You will also be responsible for maintaining and improving existing codebase. Additionally, you will be responsible for collaborating with other engineers and stakeholders to deliver high-quality products and features. The ideal candidate will have a strong background in Frontend development, with experience in technologies such as JavaScript, React, and CSS. Strong problem-solving skills and the ability to work well in a team environmentare also essential. If you are excited by the prospect of working at a company that is at the forefront of music streaming technology, and are ready to take your career to the next level, we would love to hear from you!",
      requirements_and_responsibilities: [
        "Design, develop, and maintain web applications",
        "Use JavaScript, React, and CSS",
        "Maintain and improve existing codebase",
        "Collaborate with other engineers and stakeholders to deliver high-quality products and features",
        "Minimum of 3 years experience in Frontend development",
        "Experience with technologies such as JavaScript, React, and CSS",
        "Strong problem-solving skills and ability to work well in a team environment",
      ],
      time_posted: "2022-09-01",
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
      banner_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
    {
      id: 10,
      title: "Data Scientist",
      company_name: "Nomura",
      company_location: "San Francisco, CA, USA",
      skills: ["Python", "R", "SQL", "Machine Learning"],
      experience_level: "Senior Level",
      type_of_employment: "Full Time",
      salary_range: "$145k - 175k",
      experience: "Over 6 Years",
      education: "Masters Degree",
      overview: "Join the Uber team as a Data Scientist",
      description:
        "Nomura is looking for a Data Scientist to join our team. You will be responsible for using data to inform and drive decision-making for our business. You will work in a fast-paced, collaborative environment and have the opportunity to make a significant impact on the success of our company. As a Data Scientist, you will be responsible for analyzing and interpreting complex data sets, developing and implementing machine learning models, and providing insights to inform business decisions. Additionally, you will be responsible for collaborating with cross-functional teams to identify and solve business problems. The ideal candidate will have a strong background in statistics and computer science, with experience in technologies such as Python, R, SQL, and machine learning. Strong problem-solving skills and the ability to work well in a team environment are also essential. If you are excited by the prospect of working at a company that is at the forefront of transportation technology, and are ready to take your career to the next level, we would love to hear from you!",
      requirements_and_responsibilities: [
        "Analyze and interpret complex data sets",
        "Develop and implement machine learning models",
        "Provide insights to inform business decisions",
        "Collaborate with cross-functional teams to identify and solve business problems",
        "Minimum of 3 years experience in data science",
        "Experience with technologies such as Python, R, SQL, and machine learning",
        "Strong problem-solving skills and ability to work well in a team environment",
      ],
      time_posted: "2022-09-01",
      logo_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
      banner_url:
        "https://www.graduatesfirst.com/wp-content/uploads/2022/10/nomura-logo-9906582.png",
    },
  ]);

  useEffect(() => {
    const securePage = () => {
      if (status === "unauthenticated") {
        signIn();
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
    <Admin
      title="Jobs"
      headerText="View Job Postings"
      image={session.user.image}
    >
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="flex-auto px-4 lg:px-10">
              {/*---------------------------------------- Featured & Latest Jobs------------------------------------- */}
              <div>
                <div className="mb-8">
                  <div className="flex flex-wrap mt-4">
                    {/*---------------------------------------- Featured & Latest Jobs------------------------------------- */}
                    <div className="md:col-span-2 h-fit sm:sticky top-0">
                      <hr className="my-4 md:min-w-full" />
                      <div className="flex justify-between mb-4">
                        <h1 className="text-xl font-bold">Latest Job Posts</h1>
                      </div>
                      <hr className="my-4 md:min-w-full" />

                      <Jobs jobCount={jobCount} jobs={jobs} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  let userId = null;

  return {
    props: {
      session,
      userId,
    },
  };
}
