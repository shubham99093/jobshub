import { Navigate, Outlet } from "react-router-dom";
import { useRecruiter } from "../../contexts/RecruiterContext";
import Loader from "../Loader";

const RecruterUnprotected = () => {
  const { recruiter, loading } = useRecruiter();

  if (loading) {
    return <Loader />;
  }

  if (!loading && recruiter) {
    return <Navigate to="/recruiterhome" replace />;
  }

  return <Outlet />;
};

export default RecruterUnprotected;
