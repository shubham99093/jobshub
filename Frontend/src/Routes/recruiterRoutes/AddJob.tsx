import { useState } from "react";
import { RecHeader, RecFooter } from "../../components/recruiterComponents";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typewriter from "typewriter-effect";
import Alert from "react-bootstrap/Alert";
import {
  qualificationOption,
  genderOption,
  salaryoption,
  experienceOption,
  jobtypeOption,
  interviewtypeOption,
} from "../../utils/recruiterInto";
import { useRecruiter } from "../../contexts/RecruiterContext";
import { IJobPost } from "../../utils/types";
import { BACKEND_URL } from "../../config";

function AddJob() {
  const navigate = useNavigate();
  const { accesstoken } = useRecruiter();

  const [jobdata, setjobdata] = useState<IJobPost>({
    jobtitle: "",
    gender: "",
    degree: "",
    salaryrange: "",
    vacancy: 0,
    experience: "",
    jobtype: "",
    qualification: "",
    skill: "",
    languageknown: "",
    interviewtype: "",
    description: "",
    designation: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setjobdata({
      ...jobdata,
      [e.target.name]: e.target.value,
    });
  };

  const selectHandler = ({ name, value }: { name: string; value: string }) => {
    setjobdata({
      ...jobdata,
      [name]: value,
    });
    console.log(name, value);
    console.log(jobdata);
  };

  const [show, setShow] = useState(true);
  const alshow = () => {
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      );
    }
  };

  const jobPostHandler = async () => {
    if (
      jobdata.jobtitle &&
      jobdata.gender &&
      jobdata.degree &&
      jobdata.salaryrange &&
      jobdata.vacancy &&
      jobdata.experience &&
      jobdata.jobtype &&
      jobdata.qualification &&
      jobdata.skill &&
      jobdata.languageknown &&
      jobdata.interviewtype &&
      jobdata.description &&
      jobdata.designation
    ) {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          credentials: "includes",
          Authorization: `Bearer ${accesstoken}`,
        },
        body: JSON.stringify(jobdata),
      };
      const response = await fetch(`${BACKEND_URL}/jobpost`, requestOptions);
      const result = await response.json();
      if (result.status === 200) {
        toast.success("job post successfully");
        navigate("/Managejob");
      } else if (result.status === 400) {
        toast.error(result.msg);
        navigate("/payment");
      } else if (result.status === 101) {
        toast.error(result.msg);
        navigate("/editprofile");
      } else if (result.status === 100) {
        alshow();
        toast.error(result.msg);
        navigate("/payment");
      } else {
        toast.error("Try After Some Time");
      }
    } else {
      toast.error("All Fields Required");
    }
  };

  return (
    <>
      <div>
        <RecHeader />
        {/* ======================= Start Page Title ===================== */}
        <div className="page-title">
          <div className="container">
            <div className="page-caption">
              <h2>
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                  }}
                  onInit={(typewriter) => {
                    typewriter.typeString("Add Job").pauseFor(2000).start();
                  }}
                />
              </h2>
              <p>
                <Link to="/recruiterhome" title="Home">
                  Home
                </Link>{" "}
                <i className="ti-angle-double-right" /> Add Job
              </p>
            </div>
          </div>
        </div>
        {/* ======================= End Page Title ===================== */}
        {/* ======================= Create Job ===================== */}
        <section className="create-job padd-top-80 padd-bot-80">
          <div className="container">
            <form className="c-form">
              {/* General Information */}
              <div className="box">
                <div className="box-header">
                  <h4>General Information</h4>
                </div>
                <div className="box-body">
                  <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <label>Job Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Job Title"
                        name="jobtitle"
                        value={jobdata.jobtitle}
                        onChange={(e) => inputHandler(e)}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <label>Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Designation"
                        name="designation"
                        value={jobdata.designation}
                        onChange={(e) => inputHandler(e)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          className="wide form-control"
                          name="gender"
                          onChange={(e) => selectHandler(e.target)}
                          value={jobdata.gender}
                        >
                          <option disabled value="">
                            select
                          </option>
                          {genderOption.map((item, index) => (
                            <option key={index} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <label>Salary Range</label>
                      <select
                        className="wide form-control"
                        name="salaryrange"
                        onChange={(e) => selectHandler(e.target)}
                        value={jobdata.salaryrange}
                      >
                        <option disabled value="">
                          Select
                        </option>
                        {salaryoption.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12 m-clear">
                      <label>No. Of Vacancy</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="No. Of Vacancy"
                        name="vacancy"
                        value={jobdata.vacancy}
                        onChange={(e) => inputHandler(e)}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12 m-clear">
                      <label>Experience</label>
                      <select
                        className="wide form-control"
                        name="experience"
                        onChange={(e) => selectHandler(e.target)}
                        value={jobdata.experience}
                      >
                        <option disabled value="">
                          Select
                        </option>
                        {experienceOption.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12 m-clear">
                      <label>Job Type</label>
                      <select
                        className="wide form-control"
                        name="jobtype"
                        onChange={(e) => selectHandler(e.target)}
                        value={jobdata.jobtype}
                      >
                        <option disabled value="">
                          Select
                        </option>
                        {jobtypeOption.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <label>Language known</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Language known"
                        name="languageknown"
                        value={jobdata.languageknown}
                        onChange={(e) => inputHandler(e)}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12 m-clear">
                      <label>Qualification Required</label>
                      <select
                        className="wide form-control"
                        name="qualification"
                        onChange={(e) => selectHandler(e.target)}
                        value={jobdata.qualification}
                      >
                        <option disabled value="">
                          Select
                        </option>
                        {qualificationOption.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <label>Degree</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your Degree"
                        name="degree"
                        value={jobdata.degree}
                        onChange={(e) => inputHandler(e)}
                      />
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <label>Skills(Seperate with Comma)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Skills"
                        name="skill"
                        value={jobdata.skill}
                        onChange={(e) => inputHandler(e)}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <label>Types of Interview</label>
                      <select
                        className="wide form-control"
                        name="interviewtype"
                        onChange={(e) => selectHandler(e.target)}
                        value={jobdata.interviewtype}
                      >
                        <option disabled value="">
                          Select
                        </option>
                        {interviewtypeOption.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.label}{" "}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12 m-clear">
                      <label>Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        name="description"
                        value={jobdata.description}
                        onChange={(e) => inputHandler(e)}
                      />
                    </div>
                  </div>
                  &nbsp;
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-m theme-btn full-width"
                      onClick={() => {
                        jobPostHandler();
                      }}
                    >
                      Job Post
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
        {/* ====================== End Create Job ================ */}
        <RecFooter />
      </div>
    </>
  );
}

export default AddJob;
