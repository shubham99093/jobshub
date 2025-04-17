import { useState } from "react";
import { RecHeader, RecFooter } from "../../components/recruiterComponents";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typewriter from "typewriter-effect";
import {
  qualificationOption,
  genderOption,
  salaryoption,
  experienceOption,
  jobtypeOption,
  interviewtypeOption,
} from "../../utils/recruiterInto";

function UpdateJob() {
  const location = useLocation();
  const id = location.state;

  // useEffect(() => {
  //   fetchcategory();
  //   fetchjobData();
  // }, []);

  const navigate = useNavigate();
  // const [accesstoken] = useState(localStorage.getItem("recruiterToken"));
  // const [categorydata, setcategorydata] = useState<[]>([]);
  const [jobdata, setjobdata] = useState({
    jobtitle: "",
    gender: "",
    degree: "",
    salaryrange: "",
    vacancy: "",
    experience: "",
    jobtype: "",
    qualification: "",
    skill: "",
    languageknown: "",
    interviewtype: "",
    joblocation: "",
    description: "",
    designation: "",
  });

  // const requestOptions = {
  //   method: "GET",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     credentials: "includes",
  //     Authorization: `Bearer ${accesstoken.replace(/"/g, "")}`,
  //   },
  // };

  const inputHandler = ({ name, value }: { name: string; value: string }) => {
    setjobdata({
      ...jobdata,
      [name]: value,
    });
  };

  const selectHandler = ({ name, value }: { name: string; value: string }) => {
    setjobdata({
      ...jobdata,
      [name]: value,
    });
  };

  const jobUpdateHandler = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobdata),
    };
    const response = await fetch(
      `http://localhost:5000/updatejob/${id}`,
      requestOptions
    );
    const result = await response.json();

    if (result.status === 200) {
      toast.success("Update successfully");
      navigate("/Managejob");
    } else {
      toast.error("something wrong");
    }
  };

  /* *********** fetch jobdata *********  */
  // const fetchjobData = async () => {
  //   const response = await fetch(
  //     `http://localhost:5000/getperticularjob/${id}`,
  //     requestOptions
  //   );
  //   const result = await response.json();
  //   setjobdata(result.data);
  // };
  /* *********** fetch category *********  */
  // const fetchcategory = async () => {
  //   const response = await fetch(
  //     "http://localhost:5000/industry",
  //     requestOptions
  //   );
  //   const categoryres = await response.json();
  //   const category_list = [];
  //   categoryres.map((item) => {
  //     category_list.push({ value: item.ind_name, label: item.ind_name });
  //   });
  //   setcategorydata(category_list);
  // };

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
                    typewriter.typeString("Update Job").pauseFor(2000).start();
                  }}
                />
              </h2>
              <p>
                <Link to="/home" title="Home">
                  Home
                </Link>{" "}
                <i className="ti-angle-double-right" />
                <Link to="/managejob" title="Home">
                  Manage Job Post
                </Link>{" "}
                <i className="ti-angle-double-right" /> Update Job
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
                        onChange={(e) => inputHandler(e.target)}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <label>Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Job Title"
                        name="designation"
                        value={jobdata.designation}
                        onChange={(e) => inputHandler(e.target)}
                      />
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          className="wide form-control"
                          name="gender"
                          onChange={(e) => selectHandler(e.target)}
                        >
                          <option value="">select</option>
                          {genderOption.map((item) => (
                            <option
                              value={item.value}
                              selected={item.value === jobdata?.gender}
                            >
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
                      >
                        <option value="">Select</option>
                        {salaryoption.map((item) => (
                          <option
                            value={item.value}
                            selected={item.value === jobdata?.salaryrange}
                          >
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
                        onChange={(e) => inputHandler(e.target)}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12 m-clear">
                      <label>Experience</label>
                      <select
                        className="wide form-control"
                        name="experience"
                        onChange={(e) => selectHandler(e.target)}
                      >
                        <option value="">Select</option>
                        {experienceOption.map((item) => (
                          <option
                            value={item.value}
                            selected={item.value === jobdata.experience}
                          >
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
                      >
                        <option value="">Select</option>
                        {jobtypeOption.map((item) => (
                          <option
                            value={item.value}
                            selected={item.value === jobdata.jobtype}
                          >
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
                        onChange={(e) => inputHandler(e.target)}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12 m-clear">
                      <label>Qualification Required</label>
                      <select
                        className="wide form-control"
                        name="qualification"
                        onChange={(e) => selectHandler(e.target)}
                      >
                        <option value="">Select</option>
                        {qualificationOption.map((item) => (
                          <option
                            value={item.value}
                            selected={item.value === jobdata.qualification}
                          >
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
                        onChange={(e) => inputHandler(e.target)}
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
                        onChange={(e) => inputHandler(e.target)}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <label>Types of Interview</label>
                      <select
                        className="wide form-control"
                        name="interviewtype"
                        onChange={(e) => selectHandler(e.target)}
                      >
                        <option value="">Select</option>
                        {interviewtypeOption.map((item) => (
                          <option
                            value={item.value}
                            selected={item.value === jobdata?.interviewtype}
                          >
                            {item.label}
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
                        onChange={(e) => inputHandler(e.target)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 padd-top-10 text-center">
                    {" "}
                    <button
                      type="button"
                      className="btn btn-m them-btn  full-width"
                      onClick={() => {
                        navigate("/managejob");
                      }}
                    >
                      Cancle
                    </button>
                  </div>

                  <div className="col-md-6 padd-top-10 text-center">
                    <button
                      type="button"
                      className="btn btn-m theme-btn full-width"
                      onClick={() => {
                        jobUpdateHandler();
                      }}
                    >
                      Update
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

export default UpdateJob;
