import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Home";

const ProtectedRoutes = () => {
  const auth = useSelector((state) => state.auth);
  return auth._id ? <Outlet /> : <Home />;
};

export default ProtectedRoutes;
