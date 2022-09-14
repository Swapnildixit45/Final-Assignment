import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, signIn } from "../actions/authAction";
import { Icon } from "@iconify/react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const validate = (state) => {
  return state.email && state.password;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signIn(user.email, user.password, navigate));

    setuser({ email: "", password: "" });
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [auth]);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {auth._id ? (
        <Navigate to="/dashboard" />
      ) : (
        <div
          id="Login"
          className="flex flex-col h-screen bg-blue-200 justify-center lg:px-[150px]"
        >
          <div
            id="part1"
            className="flex flex-col md:flex-row  md:space-x-5  md:items-center md:justify-center bg-white rounded-3xl mx-5 py-10"
          >
            <div id="brnd" className="flex flex-col text-center md:w-1/3 ">
              {/* <div id="brndname">
                <h1 className="brnd-h1 text-3xl md:text-4xl mt-5">AoRent</h1>
              </div> */}
              <div id="profileimage" className=" text-center self-center">
                <img
                  className=" md:w-[25vw]"
                  src={require("../assets/profile2.webp")}
                  alt=""
                />
              </div>
            </div>
            <div
              id="details"
              className="flex flex-col md:w-1/2 md:items-center space-y-10 "
            >
              <form
                action=""
                className="flex flex-col  space-y-6 items-center md:w-[35vw] "
                onSubmit={handleSubmit}
              >
                <div className="flex relative w-4/5 md:w-full md:text-xl">
                  <input
                    value={user.email}
                    onChange={handleInput}
                    name="email"
                    type="text"
                    placeholder="Emai Address"
                    className=" ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 text-black"
                  />
                </div>

                <div className=" flex relative w-4/5 md:w-full md:text-xl">
                  <input
                    value={user.password}
                    onChange={handleInput}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="ring-1 ring-gray-300 w-full  rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 text-black"
                  />
                  {showPassword ? (
                    <label className=" self-center absolute right-1">
                      {" "}
                      <Icon
                        icon="bx:bxs-show"
                        width="30"
                        height="30"
                        className=" opacity-50"
                        onClick={() => {
                          setShowPassword(false);
                        }}
                      />
                    </label>
                  ) : (
                    <label className=" self-center absolute right-1">
                      {" "}
                      <Icon
                        icon="bx:bxs-hide"
                        width="30"
                        height="30"
                        className=" opacity-50"
                        onClick={() => {
                          setShowPassword(true);
                        }}
                      />
                    </label>
                  )}
                </div>

                <div
                  id="forget"
                  className=" text-aorentgray w-4/5 md:w-full px-1 self-center md:text-xl"
                >
                  <h1> Forget Password ?</h1>
                </div>

                <button
                  disabled={!validate(user)}
                  className={`md:text-xl w-4/5 md:w-full inline-block  text-white    rounded-lg px-6 py-2 uppercase text-sm font-semibold  transition duration-400 ease-in-out bg-blue-300 opacity-80 ${
                    validate(user)
                      ? "hover:bg-blue-500 hover:opacity-100 transform   hover:shadow-lg"
                      : null
                  } `}
                >
                  Login
                </button>
              </form>
              <h1 className=" text-gray-400 text-center text-xl  self-center ">
                Dont have an account?{" "}
                <Link to={"/register"}>
                  <button className=" text-gray-600 text-xl  hover:scale-105">
                    Sign up
                  </button>
                </Link>
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;