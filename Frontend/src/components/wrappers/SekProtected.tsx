import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSeeker } from "../../contexts/SeekerContext";
import Loader from "../Loader";

const SekProtected = () => {
  const { seeker, loading } = useSeeker();

  if (loading) {
    return <Loader />;
  }

  if (!loading && !seeker) {
    return <Navigate to="/seekerlogin" replace />;
  }

  return <Outlet />;
};

export default SekProtected;
