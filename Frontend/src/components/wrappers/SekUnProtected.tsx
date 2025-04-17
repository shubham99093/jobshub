import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Loader from "../Loader";
import { useSeeker } from "../../contexts/SeekerContext";

const SekUnProtected = () => {
  const { seeker, loading } = useSeeker();

  if (loading) {
    return <Loader />;
  }

  if (!loading && seeker) {
    return <Navigate to="/seekerhome" replace />;
  }

  return <Outlet />;
};

export default SekUnProtected;
