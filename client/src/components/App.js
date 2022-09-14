import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../actions/authAction";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./Dashboard";
import AddEmployee from "./AddEmployee";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <div className="App">
       
        <Routes>
        <Route element={<ProtectedRoutes />}>

            <Route
              exact
              path="/dashboard/addemp"
              element={<AddEmployee />}
            />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

export default App;