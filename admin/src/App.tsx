import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Dashboard,
  Error,
  ManageSeeker,
  ManageRecruiter,
  ViewIndustry,
  AddIndustry,
  RecruiterContect,
  SeekerContect,
  SeekerReview,
  RecruiterReview,
  PaymentDetail,
  BackUp,
  Login,
  UpdateIndustry,
} from "./Router";
import AdminUnProtected from "./components/wrappers/AdminUnProtected";
import AdminProtected from "./components/wrappers/AdminProtected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route element={<AdminUnProtected />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AdminProtected />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-recruiter" element={<ManageRecruiter />} />
          <Route path="/manage-seeker" element={<ManageSeeker />} />
          <Route path="/view-industry" element={<ViewIndustry />} />
          <Route path="/add-industry" element={<AddIndustry />} />
          <Route path="/update-industry" element={<UpdateIndustry />} />
          <Route
            path="/view-recruiter-contect"
            element={<RecruiterContect />}
          />
          <Route path="/view-seeker-contect" element={<SeekerContect />} />
          <Route path="/recruiter-review" element={<RecruiterReview />} />
          <Route path="/seeker-review" element={<SeekerReview />} />
          <Route path="/payment-detail" element={<PaymentDetail />} />
          <Route path="/backup" element={<BackUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
