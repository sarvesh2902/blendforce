import React, { useState } from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table'
import Table, { AvatarCell, StatusPill } from './Table'  // new
// import moment from 'moment';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2, FiDownloadCloud } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";



const getData = () => {
  const data = [
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
  return [...data]
}


const TableComponent = () => {
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
    // {
    //   Header: "Status",
    //   accessor: 'status',
    //   Cell: StatusPill,
    // },
    // {
    //   Header: "Score",
    //   accessor: 'score',
    //   Cell:({value})=>{
    //       return <div className="flex items-center w-[160px]">
    //       <span className="mr-2">  {value}%</span>
    //       <div className="relative w-full">
    //         <div className="overflow-hidden h-2 text-xs flex rounded bg-orange-200">
    //           <div
    //             style={{ width: `${value}%` }}
    //             className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
    //           ></div>
    //         </div>
    //       </div>
    //     </div>
    //   }
    // },
    {
      Header: " Select / Unselect ",
      accessor: "id",
      Cell: ({ value }) => {
        const selectCan = (email) => {
          let selected_candidates = []
          selected_candidates = JSON.parse(localStorage.getItem("selected_candidates"))
          console.log(selected_candidates);

          if(selected_candidates != null){
            selected_candidates.push(value);
            document.getElementById(`canSelectBtn${value}`).innerText = "Selected ☑️";
            localStorage.setItem('selected_candidates',JSON.stringify(selected_candidates));
          }else{
            document.getElementById(`canSelectBtn${value}`).innerText = "Selected ☑️";
            localStorage.setItem('selected_candidates',JSON.stringify([value]));
          }






        }
        const rejectCan = (email) => {
          console.log(value)
          alert(value+" deleted successfully");
        }
        return  <div className=' text-left'><button
        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 mr-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button" id={`canSelectBtn${value}`} onClick={selectCan}
      >
        Select
      </button></div>

      },
    }

  ], [])



  const data = React.useMemo(() => getData(), [])


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
                  48 Candidates
                </span>
              </div>
            </div>

          </div>

          <div>
            <div className="flex justify-center">
              <button
                className=" rounded-lg border border-gray-200 mx-2 px-4 py-1 flex justify-center items-center text-md text-white font-medium bg-blue-400 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                 <span className='ml-2'>Update All</span>

              </button>
            </div>
          </div>


        </div>

        {/* table start */}
        <Table columns={columns} data={data} />


      </div>
    </div>
  )
}

export default TableComponent