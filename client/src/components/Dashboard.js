import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

import { Link } from "react-router-dom";
import { server_url } from "../config";
function Dashboard() {
  const [Data1, setData1] = useState([]);
  const [rem, setRem] = useState(false);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    axios
      .get(`${server_url}/employee/`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(async (data) => {
        console.log(data);
        setData1(data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [rem]);

  const remove = (post_ID) => {
    axios
      .delete(`${server_url}/employee/${post_ID}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(async (res) => {
        console.log("Sucessfully removed !");
        rem ? setRem(false) : setRem(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (

    <div className="">
    <div id="main" className="">
      <Navbar/>
      <div
        id="nav"
        className="m-10 space-x-2  flex flex-col  w-3/2 font-semibold text-lg  align-baseline text-gray-600"
      >
        <div className="w-fit"><Link to={"/dashboard/addemp"}>
          {" "}
          <div className=" bg-blue-400 rounded-lg  p-4 text-white hover:bg-blue-500 shadow-lg">
            Add Employee
          </div>
        </Link></div>
        
        <div>
        {Data1.length === 0 ? (
          () => {
            return (
              <div>
                <h1 className="">Not Found</h1>
              </div>
            );
          }
        ) : (
          <div className="flex flex-col space-y-10 p-10 outline outline-2 outline-blue-200 m-16 rounded-lg shadow-md shadow-blue-300">
            <div className="grid grid-cols-4   p-4   bg-blue-300 text-white text-xl font-bold rounded-lg w-full">
              <div id="desc">name</div>
              <div id="amount">salary</div>
              <div id="date">city</div>
              <div id="level">number</div>
            </div>
            {Data1.map((elem) => {
              return (
                <div className="bg-blue-100 shadow-md rounded-lg p-4 text-md flex flex-row justify-between align-baseline">
                  <div className="grid grid-cols-4 gap-4    w-full">
                    <div id="desc">{elem.name}</div>
                    <div id="amount">{elem.salary}</div>
                    <div id="date">{elem.city?.slice(0, 15)}</div>
                    <div id="level">{elem.phone_number}</div>
                  </div>
                  <div>
                    <Icon
                      icon="ic:baseline-delete"
                      width={30}
                      className="hover"
                      onClick={() => {
                        remove(elem._id);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      </div>
    </div>
  </div>

  );
}

export default Dashboard;
