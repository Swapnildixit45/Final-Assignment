import { React, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../actions/authAction";
const validate = (state) => {
  return state.email && state.password && state.username && state.name;
};

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [user, setuser] = useState({
    name: "",
    username: "",
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

    
    console.log(user);
    dispatch(signUp(user, navigate));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showpasswordConfirm, setShowpasswordConfirm] = useState(false);

  return (
    <>
      <div
        id="Register"
        className="flex flex-col h-screen bg-blue-200 justify-center lg:px-[150px]"
      >
        <div
          id="part1"
          className="flex flex-col md:flex-row  md:space-x-5  md:items-center md:justify-center bg-white rounded-3xl mx-5 py-10"
        >
          <div id="brnd" className="flex flex-col text-center md:w-1/3 ">
            {/* <div id="brndname">
              <h1 className="brnd-h1 text-3xl md:text-4xl">AoRent</h1>
            </div> */}
            <div id="profileimage" className=" text-center self-center">
              <img
                className=" md:w-[25vw]"
                src={require("../assets/register.jpg")}
                alt=""
              />
            </div>
          </div>
          <div id="details" className="flex flex-col md:w-1/2">
            <form
              action=""
              className="flex flex-col  space-y-5 items-center md:w-[35vw]"
              onSubmit={handleSubmit}
            >
              <div className="flex relative w-4/5 md:w-full md:text-xl">
                <input
                  value={user.name}
                  onChange={handleInput}
                  name="name"
                  type="text"
                  placeholder="Name"
                  className=" ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 text-black"
                />
              </div>
              <div className="flex relative w-4/5 md:w-full md:text-xl">
                <input
                  value={user.username}
                  onChange={handleInput}
                  name="username"
                  type="text"
                  placeholder="Username"
                  className=" ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 text-black"
                />
              </div>
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
              <div className=" flex relative w-4/5 md:w-full md:text-xl">
                <input
                  value={user.passwordConfirm}
                  onChange={handleInput}
                  name="passwordConfirm"
                  type={showpasswordConfirm ? "text" : "password"}
                  placeholder="Confirm your Password"
                  className="ring-1 ring-gray-300 w-full  rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300 text-black"
                />
                {showpasswordConfirm ? (
                  <label className=" self-center absolute right-1">
                    {" "}
                    <Icon
                      icon="bx:bxs-show"
                      width="30"
                      height="30"
                      className=" opacity-50"
                      onClick={() => {
                        setShowpasswordConfirm(false);
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
                        setShowpasswordConfirm(true);
                      }}
                    />
                  </label>
                )}
              </div>

              {user.password !== user.passwordConfirm &&
              user.passwordConfirm ? (
                <div
                  id="forget"
                  className=" text-red-500 w-4/5 md:w-full px-1 self-center md:text-xl"
                >
                  <label>Please make sure password match</label>
                </div>
              ) : (
                <div id="forget" className=""></div>
              )}

              <button
                disabled={!validate(user)}
                className={`md:text-xl w-4/5 md:w-full inline-block  text-white    rounded-lg px-6 py-2 uppercase text-sm font-semibold  transition duration-400 ease-in-out bg-blue-300 opacity-80 ${
                  validate(user)
                    ? "hover:bg-blue-500 hover:opacity-100  hover:shadow-lg"
                    : null
                } `}
              >
                Register
              </button>
              <h1 className=" text-gray-400 text-center text-xl">
                Already have an account?{" "}
                <Link to={"/login"}>
                  <button className=" text-gray-500 text-2xl  hover:scale-105">
                    Sign in
                  </button>
                </Link>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;