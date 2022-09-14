import axios from "axios";
import React, { useEffect, useState } from "react";
import { server_url } from "../config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AddEmployee() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [salary, setSalary] = useState(0);
  const [designation, setDesignation] = useState("");
  const [city,setCity] = useState("");
  const [phone_number,setPhoneNumber] = useState(null);

  const [call, setCall] = useState(false);

  useEffect(() => {
    axios
      .post(
        `${server_url}/employee/`,
        { name,salary,designation,city,phone_number},
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      )
      .then(async () => {
        console.log("added successfully");
        navigate(-1);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [call]);

  return (
    <div>
      <Navbar/>
      <div className="h-fit w-1/2 m-auto shadow-md rounded-3xl p-10 flex flex-col justify-start bg-[#acdffa]">
        <div className=" text-lg font-bold self-center">Add Employee</div>

        <div className="flex flex-col align-middle space-y-2">
          <label htmlFor="inp1" className=" text-gray-400">
            Name
          </label>
          <input
            id="inp1"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            name="name"
            type="text"
            className=" ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 text-black"
          />
        </div>
        <div className="flex flex-col align-middle space-y-2">
          <label htmlFor="inp2" className=" text-gray-400">
            Salary
          </label>
          <input
            id="inp2"
            value={salary}
            onChange={(e) => {
              setSalary(e.target.value);
            }}
            name="salary"
            type="number"
            className=" ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 text-black"
          />
        </div>
        <div className="flex flex-col align-middle space-y-2">
          <label htmlFor="inp3" className=" text-gray-400">
            Designation
          </label>
          <input
            id="inp3"
            value={designation}
            onChange={(e) => {
              setDesignation(e.target.value);
            }}
            name="designation"
            type="text"
            className=" ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 text-black"
          />
        </div>
        <div className="flex flex-col align-middle space-y-2">
          <label htmlFor="inp4" className=" text-gray-400">
            City
          </label>
          <input
            id="inp4"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            name="city"
            type="text"
            className=" ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 text-black"
          />
        </div>
        <div className="flex flex-col align-middle space-y-2">
          <label htmlFor="inp5" className=" text-gray-400">
            Phone Number
          </label>
          <input
            id="inp5"
            value={phone_number}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            name="phone_number"
            type="tel"
            className=" ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 text-black"
          />
        </div>
        <div>
          <button
            onClick={() => {
              setCall(true);
            }}
            className="mt-5 p-3 bg-blue-400 text-white font-bold text-lg rounded-md hover:bg-blue-500 px-10"
          >
            submit
          </button>
        </div>
      </div>
      </div>
  );
}

export default AddEmployee;