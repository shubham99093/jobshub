import { Outlet, Navigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import { useAdmin } from "../../context/adminContext";

const RecruterProtected = () => {
  const { accesstoken, loading } = useAdmin();
  if (loading) {
    return <LoadingPage />;
  }
  if (!loading && !accesstoken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RecruterProtected;
