import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Error404 from "./components/Error404";
import Aboutus from "./Routes/Aboutus";
import { Suspense } from "react";
import {
  RecruiterSignup,
  RecruiterLogin,
  RecruiterSendMail,
  Recruiterforgot,
  Recruiterhome,
  AddJob,
  ApplicationList,
  Updatejob,
  Recruiterchangepass,
  ManageJob,
  ManageProfile,
  Editprofile,
  Recruiterjobrestor,
  Notification,
  Payment,
} from "./Routes/recruiterRoutes";

import {
  RecruterProtected,
  RecruterUnprotected,
  SekProtected,
  SekUnProtected,
} from "./components/wrappers";

import Recruitercontact from "./Routes/recruiterRoutes/RecruiterContact";
import AcceptList from "./components/recruiterComponents/AcceptList";
import RejectList from "./components/recruiterComponents/RejectList";
import {
  SeekerLogin,
  SeekerSignup,
  SeekerSendMail,
  SeekerForgot,
  Apply,
  SearchJob,
  JobHistory,
  SeekerContact,
  SeekerProfile,
  SeditProfile,
  JobDetail,
  AcceptJob,
  RejectJob,
  BrowseCategory,
  ResumeDetail,
  SeekerJobRestor,
  ChangePassword,
  SeekerHome,
} from "./Routes/seekerRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route element={<RecruterUnprotected />}>
            <Route
              path="/recruitersignup"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <RecruiterSignup />
                </Suspense>
              }
            />

            <Route path="/recruiterlogin" element={<RecruiterLogin />} />

            <Route path="/recruitersendmail" element={<RecruiterSendMail />} />
            <Route path="/recruiterforgot" element={<Recruiterforgot />} />
            <Route
              path="/recruiterforgot/:id/:token"
              element={<Recruiterforgot />}
            />
          </Route>
          <Route element={<RecruterProtected />}>
            <Route path="/recruiterhome" element={<Recruiterhome />} />
            <Route path="/addjob" element={<AddJob />} />
            <Route path="/applicantlist" element={<ApplicationList />} />
            <Route path="/updatejob/:id" element={<Updatejob />} />
            <Route path="/updatejob" element={<Updatejob />} />
            {/* <Route path="/viewjob/:id" element={<Viewjob />} /> */}
            <Route path="/recchangepass" element={<Recruiterchangepass />} />
            <Route path="/managejob" element={<ManageJob />} />
            <Route path="/recruitercontact" element={<Recruitercontact />} />
            <Route path="/manageprofile" element={<ManageProfile />} />
            <Route path="/editprofile" element={<Editprofile />} />
            <Route
              path="/recruiterjobrestor"
              element={<Recruiterjobrestor />}
            />

            <Route path="/notification" element={<Notification />} />
            <Route path="/acceptlist" element={<AcceptList />} />
            <Route path="/rejectlist" element={<RejectList />} />

            <Route path="/payment" element={<Payment />} />
          </Route>

          <Route element={<SekUnProtected />}>
            <Route path="/seekersignup" element={<SeekerSignup />} />
            <Route path="/seekerlogin" element={<SeekerLogin />} />
            <Route path="/seekersendmail" element={<SeekerSendMail />} />
            <Route path="/seekerforgot/:id/:token" element={<SeekerForgot />} />
          </Route>

          <Route element={<SekProtected />}>
            <Route path="/seekerhome" element={<SeekerHome />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/apply/:id" element={<Apply />} />
            <Route path="/jobhistory" element={<JobHistory />} />
            <Route path="/acceptjob" element={<AcceptJob />} />
            <Route path="/rejectjob" element={<RejectJob />} />
            <Route path="/searchjob" element={<SearchJob />} />
            <Route path="/seekerprofile" element={<SeekerProfile />} />
            <Route path="/seekercontact" element={<SeekerContact />} />
            <Route path="/browsecategory" element={<BrowseCategory />} />
            <Route path="/resumedetail" element={<ResumeDetail />} />
            <Route path="/seditprofile" element={<SeditProfile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/seekerjobrestor" element={<SeekerJobRestor />} />
            <Route path="/seekerforgot/:id/:token" element={<SeekerForgot />} />
            <Route path="/jobdetail" element={<JobDetail />} />
            <Route path="/jobdetail/:id" element={<JobDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
