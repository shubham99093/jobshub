import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pdf from "html-pdf";
import pdfTemplate from "./documentjs/document";

// database connnection
import "./db/conn";

// middleware
import jsauthenticate from "./middleware/authentication";
import recauthenticate from "./middleware/recauthentication";
import upload from "./middleware/fileupload";
import seekerimage from "./middleware/seekerprofile";
import resume from "./middleware/resumeupload";

// Route funtions
import {
  acceptmail,
  acceptRequest,
  AcceptUserList,
  checkpayment,
  cmpCreate,
  cmpLogin,
  cmpRegistration,
  cmpupdatelogo,
  getappliedUser,
  getrecruiter,
  getrecruiterreview,
  homeviewindustry,
  manageindustry,
  recchangepassword,
  reccontact,
  recdeleteaccount,
  recmail,
  recruiterforgot,
  recruiterreview,
  recruiterverify,
  recruiterverifyotp,
  rejectRequest,
  RejectUserList,
} from "./controller/recruiterController";

import {
  addindustry,
  adSignin,
  backup,
  createPaymentReceipt,
  downloadPaymentReceipt,
  getrecruiterreviewall,
  getseekercon,
  getseekerreviewall,
  industrydel,
  jobs,
  payment,
  reclist,
  recruiteractive,
  recruiterblock,
  recruitercon,
  recruiterdata,
  recruiterlist,
  recruiterlistdel,
  seekeractive,
  seekerblock,
  seekercon,
  seekerlist,
  seekerlistdel,
  seeklist,
  sendotp,
  totalrecruiterlist,
  totalseekerlist,
  updateindustry,
  viewindustry,
} from "./controller/adminController";

import {
  applyjob,
  seekerverify,
  Changepassword,
  get_contact,
  getjobedu,
  getjobpost,
  getseeker,
  getseekerreview,
  jobapplyrestore,
  jobbackup,
  jobhistory,
  jobhistoryaccept,
  jobhistoryreject,
  js_contact,
  mail,
  restorejob,
  seekerapplydel,
  seekerbackup,
  seekercontact,
  seekerforgot,
  seekerotpverify,
  seekerreview,
  sekdeleteaccount,
  sendmsg,
  signin,
  signup,
  updateimage,
  updateprofile,
  checkprofile,
} from "./controller/seekerController";

import {
  deletejobPost,
  exportcsv,
  getOwnJobpost,
  getperticularJob,
  jobpost,
  jobtype,
  location,
  order,
  restorejobPost,
  trashgetOwnJobpost,
  updatejob,
  updaterestorejobpost,
  verify,
} from "./controller/jobController";

import path from "path";

dotenv.config();
const option = {
  origin: "*",
  // Proxy: "https://jobshubback-19af.onrender.com",
  proxy: "http://localhost:3000/",
};

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use(cors(option));
app.use("/public", express.static("public"));
app.use("/files", express.static("./public/files"));

app.get("/resume", (req, res) => {
  res.render("resume.ejs");
});

// view industry on lending page
app.get("/homeviewindustry", homeviewindustry);

app.post("/createResume", (req, res) => {
  try {
    pdf
      .create(pdfTemplate(req.body), {})
      .toFile("public/resume/resumerezultati.pdf", (err) => {
        if (err) {
          return console.log("error", err);
        }
        res.send(Promise.resolve());
      });
  } catch (error) {
    console.log(`Error from the create Resume ==>${error}`);
  }
});

app.get("/downloadresume", (req, res) => {
  try {
    const filePath = path.join(__dirname, "../public/resume/rezultati.pdf");
    console.log(filePath);
    res.sendFile(filePath);
  } catch (error) {
    console.log(`Error from the Download Resume ==>${error}`);
  }
});

app.post("/createreceipt", recauthenticate, createPaymentReceipt);
app.get("/downloadreceipt", downloadPaymentReceipt);
app.post("/signup", signup); // Seeker Signup Api
app.post("/login", signin); // Seeker Sign Api
app.put("/updateprofile", jsauthenticate, updateprofile); // Seeker Update Profile Api
app.put("/seekerreview", jsauthenticate, seekerreview); // Seeker Update Profile Api
app.get("/getseekerreview", jsauthenticate, getseekerreview); // Seeker Update Profile Api

app.get("/getseeker", jsauthenticate, getseeker); // Get Seeker Api
app.get("/getseekercon", getseekercon); // Get Seeker Api
app.get("/seekerverify/", jsauthenticate, seekerverify); // Seeker Verify Api
app.get("/checkprofile", jsauthenticate, checkprofile); // check Seeker detail Api

app.post("/contact", jsauthenticate, js_contact); // Seeker Contact Api
app.post("/seekercontact", jsauthenticate, seekercontact); // Seeker Contact Api

app.post("/getcont", get_contact); // Seeker Get Contact  Api

// ****** Forgot Password ******

app.post("/mail", mail); // sending mail
app.post("/seekerotpverify", seekerotpverify); //  Get seeker detail on id & token
app.put("/seekerforgot", seekerforgot); // Seeker Forgot Password

app.post("/applyjob/:id", jsauthenticate, resume, applyjob); // Seeker Job Apply Api
app.post("/applyjob", jsauthenticate, resume, applyjob); // Seeker Job Apply Api
app.get("/jobdetail/:id", jsauthenticate, getperticularJob); // Seeker Job Apply Api

app.get("/getjobpost", jsauthenticate, getjobpost); // Seeker Get Job Post   Api
app.get("/getjobedu", jsauthenticate, getjobedu); // Seeker Get Job Post   Api

app.post("/changepass", jsauthenticate, Changepassword); // Seeker Password Change  Api

app.get("/jobhistory", jsauthenticate, jobhistory); //  Get Seeker Applied Job Data  who's pending
app.get("/jobhistoryreject", jsauthenticate, jobhistoryreject); //  Get Seeker Applied Job Data who's reject
app.get("/jobhistoryaccept", jsauthenticate, jobhistoryaccept); //  Get Seeker Applied Job Data who's accept

app.patch("/jobbackup/:id", jsauthenticate, jobbackup); //  Backup Seeker Applied Job Data
app.put("/jobapplyrestore/:id", jsauthenticate, jobapplyrestore); //  Backup Seeker Applied Job Data

app.get("/jobrestore", jsauthenticate, restorejob); // seeker job restore

app.delete("/seekerapplydel/:id", jsauthenticate, seekerapplydel); // seeker job Delete

app.post("/acceptmail/:id", acceptmail); // Accept mail send on seeker email id

app.post("/sendmsg", sendmsg);

app.put("/updateimage", jsauthenticate, seekerimage, updateimage);

app.delete("/sekdeleteaccount", jsauthenticate, sekdeleteaccount); // Seeker Account Delete

// // JOB SEARCH
app.get("/jobtype", jsauthenticate, jobtype);
app.get("/location", jsauthenticate, location);

//$$$$$$$$$$$$$$ Recruiter API for CRUD operation $$$$$$$$$$$$$$
app.post("/recsignup", upload, cmpRegistration); // Recruiter signup

app.post("/reclogin", cmpLogin); // Recruiter signin

app.put("/createcmp", recauthenticate, cmpCreate); // Recruiter Profile Update
app.delete("/recdeleteaccount", recauthenticate, recdeleteaccount); // Recruiter Account Delete

app.post("/jobpost", recauthenticate, jobpost); // Recruiter Add job

app.get("/getrecruiter", recauthenticate, getrecruiter); // Get Perticular Recruiter using token

app.get("/verifyrecruiter", recauthenticate, recruiterverify); // Recruiter Verify Api

app.get("/getownjobpost", recauthenticate, getOwnJobpost); // Get Perticular Recruiter Posted job

app.get("/trashgetOwnJobpost", recauthenticate, trashgetOwnJobpost); // Get Perticular Recruiter Posted job

app.delete("/deletejobPost/:id", deletejobPost); // Delete added job using id

app.put("/restorejobpost/:id", restorejobPost); // Delete added job using id

app.put("/updatejob/:id", updatejob); // Updated  job using id

app.get("/getperticularjob/:id", getperticularJob); //

app.put("/cmpupdatelogo", recauthenticate, upload, cmpupdatelogo);

// Passowrd Forgot
app.post("/recmail", recmail);
app.post("/recruiterverifyotp", recruiterverifyotp);
app.put("/recruiterforgot", recruiterforgot);

// ChangePassword
app.post("/recchangepass", recauthenticate, recchangepassword);

app.get("/industry", manageindustry);

app.get("/getapplieduser", recauthenticate, getappliedUser);

app.put("/acceptrequest/:id", recauthenticate, acceptRequest);

app.put("/rejectrequest/:id", recauthenticate, rejectRequest);

app.get("/acceptlist", recauthenticate, AcceptUserList);

app.get("/rejectlist", recauthenticate, RejectUserList);

app.get("/exportcsv/:token", exportcsv);

app.post("/order", order);

app.post("/verify", recauthenticate, verify);
app.post("/reccontact", recauthenticate, reccontact);

app.put("/recruiterreview", recauthenticate, recruiterreview); // Seeker Update Profile Api

app.put("/updaterestorejobpost/:id", recauthenticate, updaterestorejobpost); // Seeker Update Profile Api

app.get("/getrecruiterreview", recauthenticate, getrecruiterreview); // Seeker Update Profile Api
app.get("/checkpayment", recauthenticate, checkpayment); // Seeker Update Profile Api

//$$$$$$$$$$$$$$$$$  ADMIN SIDE API  $$$$$$$$$$$$$$$$$
app.get("/recruiterlist", recruiterlist);
app.get("/seekerlist", seekerlist);
app.get("/reclist", reclist);
app.get("/seeklist", seeklist);
app.get("/totalseekerlist", totalseekerlist);
app.get("/totalrecruiterlist", totalrecruiterlist);
app.delete("/recruiterlistdel/:id", recruiterlistdel);
app.delete("/seekerlistdel/:id", seekerlistdel);
app.delete("/industrydel/:id", industrydel);

app.post("/adsignin", adSignin);
app.post("/addindustry", addindustry);

app.put("/updateindustry/:id", updateindustry);

app.get("/recruiterdata", recruiterdata);
app.get("/getseekercon", getseekercon);
app.post("/sendotp", sendotp);

app.get("/viewindustry", viewindustry);
app.post("/sendotp", sendotp);
app.put("/seekerblock/:id", seekerblock);
app.put("/seekeractive/:id", seekeractive);
app.put("/recruiterblock/:id", recruiterblock);
app.put("/recruiteractive/:id", recruiteractive);

app.get("/getseekerreviewall", getseekerreviewall);
app.get("/getrecruiterreviewall", getrecruiterreviewall);
app.get("/payment", payment);
app.get("/recruitercon", recruitercon);
app.get("/seekercon", seekercon);
app.get("/backup", backup);

// // %%%%%%%%%%%%%%% Only For Showing Perpose %%%%%%%%%%%%%%%

app.get("/api/jobs", jsauthenticate, jobs);

// // %%%%%%%%%%%%%%% Back up  & Restore %%%%%%%%%%%%%%%
app.get("/seekerbackup", seekerbackup);

app.get("/", (req, res) => {
  res.send("Hello World from Jobshub Backend!");
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
