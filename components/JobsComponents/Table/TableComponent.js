import React, { useState } from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table'
import Table, { AvatarCell, StatusPill } from './Table'  // new
// import moment from 'moment';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2, FiDownloadCloud } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import axios from "axios";




const getData = () => {
  const Demodata = [
    {
      id:1,
      name: 'Jane Cooper',
      email: 'jane.cooper@example.com'

    },
    {
      id:2,
      name: 'Cody Fisher',
      email: 'cody.fisher@example.com'
    },
    {
      id:3,
      name: 'Esther Howard',
      email: 'esther.howard@example.com'
    },
    {
      id:4,
      name: 'Jenny Wilson',
      email: 'jenny.wilson@example.com'
    },
    {
      id:5,
      name: 'Kristin Watson',
      email: 'kristin.watson@example.com'
    },
    {
      id:6,
      name: 'Cameron Williamson',
      email: 'cameron.williamson@example.com'
    },
  ]
  return [...Demodata]
}


const TableComponent = ({candidates}) => {
  // const [data,setData] = useState([...fetchdata])

  const columns = React.useMemo(() => [

    {
      Header: "Name",
      accessor: 'name',
      Cell: ({ value})=> {

        return (

            <div className="ml-1">
              <div className="text-sm text-left font-medium text-gray-900">{value}</div>
            </div>
        )
      }
    },
    {
      Header: "Email",
      accessor: 'email',
      Cell: ({ value})=> {

        return (

            <div className="ml-1">
              <div className="text-sm text-gray-500">{value}</div>
          </div>
        )
      }
    },
    {
      Header: "Mobile Number",
      accessor: 'mobile',
      Cell: ({ value})=> {

        return (

            <div className="ml-1">
              <div className="text-sm text-gray-500">{value}</div>
          </div>
        )
      }
    },
    {
      Header: "Gender",
      accessor: 'gender',
      Cell: ({ value})=> {

        return (

            <div className="ml-1">
              <div className="text-sm text-left font-medium text-gray-900">{value}</div>
            </div>
        )
      }
    },
    {
      Header: "Score",
      accessor: 'ats_score',
      Cell: ({ value})=> {

        return (

              <div className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">{value}%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                        <div
                          style={{ width: `${value}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
        )
      }
    },
    {
      Header: " Select",
      accessor: "_id",
      roundAccessor : "lastClearedRound",
      Cell: ({ value, column, row  }) => {
        const selectCan = async(email) => {

          await axios
          .post(`http://127.0.0.1:8787/candidate/updateRound`,{
            candidateId:value,
            round:row.original[column.roundAccessor]
          })
          .then(function (response) {
            console.log(response);
            document.getElementById(`canSelectBtn${value}`).innerText = "Selected ☑️";
          })
          .catch(function (error) {
            console.log(error);
          });

        }
        return  <div className=' text-left'><button
        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 mr-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button" id={`canSelectBtn${value}`} onClick={selectCan}
      >
        Select
      </button></div>

      },
    },
    {
      Header: " Resume ",
      accessor: "resume",
      Cell: ({ value }) => {
        const getResume = async (email) => {
          await axios
          .get(`http://127.0.0.1:8787/resume/${value}`)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        return  <div className=' text-left'><button
        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 mr-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button" onClick={getResume}
      >
        <a href={`http://127.0.0.1:8787/resume/${value}`} download='resume.pdf' >
                   Download ⬇️
         </a>
        </button></div>

      },
    }

  ], [])



  const Demodata = React.useMemo(() => getData(), [])


  return (
    <div class=" mx-5 my-5 rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div >

        {/* head of table  */}
        <div className='flex justify-between'>
          <div class="flex flex-col">
            <div class="flex">
              <div class="mb-1 text-medium font-medium text-black dark:text-white">
                Users
              </div>
              <div>
                <span
                  className=
                  "mx-3 px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm bg-gray-200 text-green-600"
                >
                  {candidates.length} Candidates
                </span>
              </div>
            </div>

          </div>




        </div>

        {/* table start */}
        <Table columns={columns} data={candidates}  />


      </div>
    </div>
  )
}

export default TableComponent