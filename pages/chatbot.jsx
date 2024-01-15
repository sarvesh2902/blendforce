import React, { useEffect, useState, useRef } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import Chatbot from "../components/Chatbot";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
import Admin from "layouts/Admin.js";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
//pdf viewer
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { AiFillFolderOpen } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";

export default function Chatbot2() {
  const [selectedText, setSelectedText] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);
  const [isList, setIsList] = useState(false);
  const [question, setquestion] = useState("");
  const [output, setoutput] = useState("");
  const [highlight, sethighlight] = useState(false);
  const [type, setType] = useState("qna");
  const [arziveTopic, setArzive] = useState(null);
  const [arziveQuestion, setArziveQuestion] = useState(null);
  const [showArziveQuestion, setShowArziveQuestion] = useState(false);
  const [webLink, setwebLink] = useState(null);
  const [webQuestion, setwebQuestion] = useState(null);
  const [showWebQuestion, setShowWebQuestion] = useState(false);
  const show = useRef(null);

  const { data: session, status } = useSession();
  console.log(session);
  const [loading, setLoading] = useState(true);

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

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  // save highlighted text.
  const handleSelection = () => {
    const selection = window.getSelection();
    setSelectedText(selection.toString());
  };

  // const handleScrollClick = (item) => {
  //   show.current.scrollIntoView({
  //     behavior: 'smooth'
  //   });
  // };

  const handleAskedQuestion = async () => {
    const formData2 = new FormData();
    formData2.append("query", question);

    setoutput("Asking AI the question you asked....");

    try {
      const response = await fetch("http://127.0.0.1:5000/qna", {
        method: "POST",
        body: formData2,
      });
      const data = await response.json();
      console.log(data.res);
      setoutput(data.res);
    } catch (error) {
      console.error(error);
      setoutput("Error answering the query");
      return;
    }
  };

  const handleHighlightQuestion = async () => {
    if (selectedText) {
      const formData2 = new FormData();
      formData2.append("query", selectedText);
      formData2.append("context", "jkwdbciwb");

      setoutput("Asking AI the question you asked....");

      try {
        const response = await fetch("http://localhost:8000/queryhighlight", {
          method: "POST",
          body: formData2,
        });
        const data = await response.json();
        console.log(data.response);
        setoutput(data.response);
      } catch (error) {
        console.error(error);
        setoutput("Error answering the query");
        return;
      }
    } else {
      setoutput("Select some text first!");
    }
  };

  const handleArziveClicked = async () => {
    if (arziveTopic) {
      const formData = new FormData();
      formData.append("topic", arziveTopic);

      setoutput("Processing the Topic....");
      try {
        console.log("hello Arzive");
        const response = await fetch("http://localhost:8000/arxiv", {
          method: "POST",
          body: formData,
        });
        console.log("bye Arzive");
        const data = await response.json();
        console.log(data.response);
        setoutput(data.response);
        setShowArziveQuestion(true);
      } catch (error) {
        console.error(error);
        setoutput("Error Proccessing the Topic!");
        return;
      }
    } else {
      setoutput("Add an Arzive Topic!");
    }
  };

  const handleArziveOutput = async () => {
    if (arziveQuestion) {
      const formData = new FormData();
      formData.append("question", arziveQuestion);
      setoutput("Asking AI the question you asked....");

      try {
        const response = await fetch("http://localhost:8000/arxiv_query", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data.response);
        setoutput(data.response);
      } catch (error) {
        console.error(error);
        setoutput("Error answering the Arzive Question :-(");
        return;
      }
    } else {
      setoutput("Ask an Arzive Question First!");
    }
  };

  const handleWebClicked = async () => {
    if (webLink) {
      const formData = new FormData();
      formData.append("link", webLink);

      setoutput("Processing the Link....");
      try {
        console.log("hello Link");
        const response = await fetch("http://localhost:8000/url", {
          method: "POST",
          body: formData,
        });
        console.log("bye Link");
        const data = await response.json();
        console.log(data.response);
        setoutput(data.response);
        setShowWebQuestion(true);
      } catch (error) {
        console.error(error);
        setoutput("Error Proccessing the Link!");
        return;
      }
    } else {
      setoutput("Add a Web Link!");
    }
  };

  const handleWebOutput = async () => {
    if (webQuestion) {
      const formData = new FormData();
      formData.append("question", webQuestion);
      setoutput("Asking AI the question you asked....");

      try {
        const response = await fetch("http://localhost:8000/url_query", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data.response);
        setoutput(data.response);
      } catch (error) {
        console.error(error);
        setoutput("Error answering the Web Link Question :-(");
        return;
      }
    } else {
      setoutput("Ask a Web Link Question First!");
    }
  };
  ///////////// pdf viewer ///////////

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");

  // for submit event
  const [viewPdf, setViewPdf] = useState(null);
  const [filename, setFileName] = useState(null);

  // onchange event
  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setFileName(selectedFile.name);
      setIsList(!isList);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    setFile(null);
    setPdfFile(null);
    setFile(e.dataTransfer.files[0]);

    console.log(file);
    if (file) {
      setFileName(file.name);
      setIsList(!isList);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        setPdfFile(e.target.result);
        setPdfFileError("");
      };
    } else {
      setPdfFile(null);
      alert("Try Again");
    }
  };

  // form submit
  const handlePdfFileSubmit = async (e) => {
    e.preventDefault();
    // handleScrollClick();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
      console.log(file);
      const formData = new FormData();
      formData.append("filetype", "pdf");
      formData.append("files", file);
      // formData.append("embed_model", "HF")
      formData.append("embed_model", "Openai");
      formData.append("llm_model", "Openai");
      formData.append("ocr", "false");

      setoutput("Proccessing the Document....");
      try {
        console.log("hello");
        console.log(formData);
        const response = await fetch("http://localhost:8000/process", {
          method: "POST",
          body: formData,
        });
        console.log("bye");
        const data = await response.json();
        console.log(data.response);
        setoutput(data.response);
      } catch (error) {
        console.error(error);
        setoutput("Error Proccessing the pdf");
        return;
      }
      setFile(null);
      // setPdfFile(null);
    } else {
      setViewPdf(null);
      setFile(null);
      setPdfFile(null);
    }
  };

  if (loading) {
    return <h2 style={{ marginTop: 100, textAlign: "center" }}>LOADING...</h2>;
  }
  return (
    <Admin
      title="Chatbot"
      headerText="Ask anything to the chatbot"
      image={session.user.image}
    >
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="flex-auto px-4 lg:px-10 py-10">
              <div className="flex">
                <div className="pt-[5rem] pr-20 pl-10 w-full">
                  <h1 className="p-3 text-2xl">Ask a Question:</h1>

                  <div className="mb-3 flex justify-between p-3">
                    <div className="w-[92%] rounded border p-2">
                      <input
                        placeholder="Ask a question here..."
                        className="bg-slate-200 h-[2.5rem] w-full p-3 "
                        onChange={(e) => setquestion(e.target.value)}
                      />
                    </div>

                    <button
                      onClick={handleAskedQuestion}
                      type="button"
                      className="from-green-400 to-blue-600 focus:ring-green-200 dark:focus:ring-green-800 mr-2 mb-2 rounded-lg bg-gradient-to-br px-7 py-2.5 text-center text-sm font-medium text-indigo hover:bg-gradient-to-bl focus:outline-none focus:ring-4 dark:text-white"
                    >
                      Ask
                    </button>
                  </div>

                  <h1 className="p-3 text-2xl">AI Output: </h1>
                  <div className="rounded border">
                    <Chatbot
                      text={output ? output : "Hello! Ask Me Anything ?"}
                    />
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
