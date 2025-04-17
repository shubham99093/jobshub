import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "../LoadingPage";
import { useAdmin } from "../../context/adminContext";

const AdminUnProtected = () => {
  const { accesstoken, loading } = useAdmin();

  if (loading) {
    return <LoadingPage />;
  }

  if (!loading && accesstoken) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminUnProtected;
