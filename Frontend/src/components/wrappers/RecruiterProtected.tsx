import { Outlet, Navigate } from "react-router-dom";
import { useRecruiter } from "../../contexts/RecruiterContext";
import Loader from "../Loader";

const RecruterProtected = () => {
  const { recruiter, loading } = useRecruiter();

  if (loading) {
    return <Loader />;
  }

  if (!loading && !recruiter) {
    return <Navigate to="/recruiterlogin" replace />;
  }

  return <Outlet />;
};

export default RecruterProtected;
