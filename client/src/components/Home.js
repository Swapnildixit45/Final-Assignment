import React,{useEffect,useState} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { server_url } from "../config.js";
import { useNavigate } from "react-router-dom";

import AddEmployee from "./AddEmployee.js";

const Home = () => {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [toggle,setToggle] = useState(false);

  const [employees,setEmployees] = useState([])

  useEffect(() => {
    axios
      .get(`${server_url}/employee/`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(async (data) => {
        console.log(data);
        setEmployees(data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  
    return (
        <>
          <div className=" bg-bg-back1 h-screen">
            <div className=" flex flex-row justify-end">
              <div className=" w-[500px] bg-white p-20 rounded-xl mt-[100px] mr-10 shadow-lg space-y-10">
                <div className=" flex flex-row justify-evenly items-center ">
                  <button
                    onClick={() => {
                      navigate("/register");
                    }}
                    className=" bg-blue-400 p-5 rounded-lg text-white font-sans shadow-md hover:opacity-90"
                  >
                    Sign up for free
                  </button>
                  <h1 className=" text-gray-400">or</h1>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className=" text-blue-400 font-sans hover:text-blue-500"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
 
};

export default Home;