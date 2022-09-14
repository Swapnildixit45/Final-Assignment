import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { signOut } from '../actions/authAction';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [navbarOpen, setNavbarOpen] = useState(false)
    const dispatch = useDispatch();

    const navigate = useNavigate();

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-sky-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="/"
            >
              Home
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fa fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                {
                    localStorage.getItem("token")?
                    (
                        <a
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        href="/"
                      >
                        <span className="ml-2 ">Logout</span>
                      </a>
                    ):(
                        <a
                        onClick={() => {
                          dispatch(signOut());
                          navigate("/");
                        }}
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        href="/login"
                      >
                        <span className="ml-2">Login</span>
                      </a>
                    )
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar