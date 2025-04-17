import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SeekerFooter, SeekerHeader } from "../../components/seekerComponents";
import pic from "../../../img/company_logo_1.png";
import "react-responsive-modal/styles.css";
import { useSeeker } from "../../contexts/SeekerContext";
import { IJobPost } from "../../utils/types";
import PageTitle from "../../components/PageTitle";

function SearchJob() {
  const [jobsData, setJobsData] = useState<IJobPost[] | null>(null);
  const { accesstoken } = useSeeker();
  const [search, setSearch] = useState("");
  const [gender, setgender] = useState("");
  const [sort, setSort] = useState("");
  const [salary, setSalary] = useState("");
  const [qualification, setqualification] = useState("");
  const [jobtype, setJobtype] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getpostedjob();
  }, [search, gender, jobtype, qualification, salary, sort]);

  const getpostedjob = async () => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/getjobpost?search=${search}&gender=${gender}&jobtype=${jobtype}&qualification=${qualification}&salaryrange=${salary}&sort=${JSON.stringify(
          sort
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );
      const data = await res.json();
      setJobsData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const jobinput = (item: string | undefined) => {
    navigate("/apply", { state: item });
  };

  const detailinput = (item: string | undefined) => {
    navigate("/jobdetail", { state: item });
  };

  const clears = () => {
    setSearch("");
    setgender("");
    setSort("");
    setqualification("");
    setSalary("");
    setJobtype("");
  };

  return (
    <>
      <div>
        <>
          <SeekerHeader />
          <>
            <PageTitle title="Browse Job" page="Browse Job" />
            {/* ====================== Start Job Detail 2 ================ */}
            <section className="padd-top-80 padd-bot-80">
              <div className="container">
                <div className="row">
                  <div className="col-md-3 col-sm-5">
                    <button className="btn-job light-gray-btn" onClick={clears}>
                      Clear
                    </button>
                    <div className="widget-boxed padd-bot-0">
                      <div className="widget-boxed-header">
                        <h4>Offerd Salary</h4>
                      </div>
                      <div className="widget-boxed-body">
                        <div className="side-list no-border">
                          <ul>
                            <li>
                              {" "}
                              <span className="checkbox">
                                <input
                                  type="radio"
                                  id={"1"}
                                  className="custom-checkbox"
                                  name="salaryrange"
                                  value={"5000 - 15,000"}
                                  onChange={(e) => setSalary(e.target.value)}
                                />
                                <label htmlFor={"1"} />
                              </span>{" "}
                              5000 - 15,000{" "}
                              <span className="pull-right"> </span>
                            </li>
                            <li>
                              {" "}
                              <span className="checkbox">
                                <input
                                  type="radio"
                                  name="salaryrange"
                                  onChange={(e) => setSalary(e.target.value)}
                                  value={"15,001 - 30,000"}
                                  id={"2"}
                                />
                                <label htmlFor={"2"} />
                              </span>{" "}
                              15,001 - 30,000{" "}
                              <span className="pull-right"></span>
                            </li>
                            <li>
                              {" "}
                              <span className="checkbox">
                                <input
                                  type="radio"
                                  name="salaryrange"
                                  onChange={(e) => setSalary(e.target.value)}
                                  value={"30,001 - 50,000"}
                                  id={"3"}
                                />
                                <label htmlFor={"3"} />
                              </span>{" "}
                              30,001 - 50,000{" "}
                              <span className="pull-right"></span>
                            </li>
                            <li>
                              {" "}
                              <span className="checkbox">
                                <input
                                  type="radio"
                                  name="salaryrange"
                                  onChange={(e) => setSalary(e.target.value)}
                                  value={"50,001 - 70,000"}
                                  id={"4"}
                                />
                                <label htmlFor={"4"} />
                              </span>{" "}
                              50,001 - 70,000{" "}
                              <span className="pull-right"></span>
                            </li>
                            <li>
                              {" "}
                              <span className="checkbox">
                                <input
                                  type="radio"
                                  name="salaryrange"
                                  onChange={(e) => setSalary(e.target.value)}
                                  value={"70,001 - 90,000"}
                                  id={"5"}
                                />
                                <label htmlFor={"5"} />
                              </span>{" "}
                              70,001 - 90,000{" "}
                              <span className="pull-right"></span>
                            </li>
                            <li>
                              {" "}
                              <span className="checkbox">
                                <input
                                  type="radio"
                                  name="salaryrange"
                                  onChange={(e) => setSalary(e.target.value)}
                                  value={"90,001 - 1,10,000"}
                                  id={"6"}
                                />
                                <label htmlFor={"6"} />
                              </span>{" "}
                              90,001 - 1,10,000{" "}
                              <span className="pull-right"></span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="widget-boxed padd-bot-0">
                      <div className="widget-boxed-header">
                        <h4>Job Type</h4>
                      </div>
                      <div className="widget-boxed-body">
                        <div className="side-list no-border">
                          <ul>
                            <li>
                              {" "}
                              <span className="custom-radio">
                                <input
                                  type="radio"
                                  name="jobtype"
                                  value="All Jobs"
                                  onChange={() => setJobtype("")}
                                  id="j1"
                                />
                                <label htmlFor="j1" />
                              </span>{" "}
                              All Jobs <span className="pull-right"></span>
                            </li>
                            <li>
                              {" "}
                              <span className="custom-radio">
                                <input
                                  type="radio"
                                  name="jobtype"
                                  value="Full Time"
                                  onChange={(e) => setJobtype(e.target.value)}
                                  id="a1"
                                />
                                <label htmlFor="a1" />
                              </span>{" "}
                              Full Time <span className="pull-right"></span>
                            </li>
                            <li>
                              {" "}
                              <span className="custom-radio">
                                <input
                                  type="radio"
                                  name="jobtype"
                                  value="Part Time"
                                  onChange={(e) => setJobtype(e.target.value)}
                                  id="b1"
                                />
                                <label htmlFor="b1" />
                              </span>{" "}
                              Part Time <span className="pull-right"></span>
                            </li>
                            <li>
                              {" "}
                              <span className="custom-radio">
                                <input
                                  type="radio"
                                  name="jobtype"
                                  value="Internship"
                                  onChange={(e) => setJobtype(e.target.value)}
                                  id="c1"
                                />
                                <label htmlFor="c1" />
                              </span>{" "}
                              Internship <span className="pull-right"></span>
                            </li>
                            <li>
                              {" "}
                              <span className="custom-radio">
                                <input
                                  type="radio"
                                  name="jobtype"
                                  value="Freelancer"
                                  onChange={(e) => setJobtype(e.target.value)}
                                  id="d1"
                                />
                                <label htmlFor="d1" />
                              </span>{" "}
                              Freelancer{" "}
                              <span className="pull-right">
                                {/* {jobtype === "Freelancer"
                                  ? jobsData?.jobtype?.length
                                  : ""} */}
                              </span>
                            </li>
                            <li>
                              {" "}
                              <span className="custom-radio">
                                <input
                                  type="radio"
                                  name="jobtype"
                                  value="Contract Base"
                                  onChange={(e) => setJobtype(e.target.value)}
                                  id="e1"
                                />
                                <label htmlFor="e1" />
                              </span>{" "}
                              Contract Base{" "}
                              <span className="pull-right"> </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="widget-boxed padd-bot-0">
                      <div className="widget-boxed-header">
                        <h4>qualification</h4>
                      </div>
                      <div className="widget-boxed-body">
                        <div className="side-list no-border">
                          <ul>
                            <li>
                              {" "}
                              <span className="custom-radio">
                                <input
                                  type="radio"
                                  name="qualification"
                                  value="All"
                                  onChange={() => setqualification("")}
                                  id="q1"
                                />
                                <label htmlFor="q1" />
                              </span>{" "}
                              All qualification{" "}
                              <span className="pull-right"></span>
                            </li>
                            <li>
                              {" "}
                              <span className="custom-radio">
                                <input
                                  type="radio"
                                  name="qualification"
                                  value="High School"
                                  onChange={(e) =>
                                    setqualification(e.target.value)
                                  }
                                  id="q2"
                                />
                                <label htmlFor="q2" />
                              </span>{" "}
                              High School <span className="pull-right"></span>
                            </li>
                            <li>
                              {" "}
                              <span className="custom-radio">
                                <input
                                  type="radio"
                                  name="qualification"
                                  value="Intermediate"
                                  onChange={(e) =>
                                    setqualification(e.target.value)
                                  }
                                  id="q3"
                                />
                                <label htmlFor="q3" />
                              </span>{" "}
                              Intermediate <span className="pull-right"></span>
                            </li>
                            <li>
                              {" "}
                              <span className="custom-radio">
                                <input
                                  type="radio"
                                  name="qualification"
                                  value="Graduation"
                                  onChange={(e) =>
                                    setqualification(e.target.value)
                                  }
                                  id="q4"
                                />
                                <label htmlFor="q4" />
                              </span>{" "}
                              Graduation<span className="pull-right"></span>
                            </li>
                            <li>
                              {" "}
                              <span className="custom-radio">
                                <input
                                  type="radio"
                                  name="qualification"
                                  value="Master Degree"
                                  onChange={(e) =>
                                    setqualification(e.target.value)
                                  }
                                  id="q5"
                                />
                                <label htmlFor="q5" />
                              </span>{" "}
                              Master Degree <span className="pull-right"></span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Start Job List */}
                  <div className="col-md-9 col-sm-7">
                    <div className="row mrg-bot-20">
                      <form>
                        <fieldset
                          className="utf_home_form_one"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="col-md-12 col-sm-12 padd-0">
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Search Keywords..."
                              onChange={(e) => setSearch(e.target.value)}
                            />
                          </div>
                        </fieldset>
                      </form>
                      <div className="col-md-4 col-sm-12 col-xs-12 browse_job_tlt">
                        <h4 className="job_vacancie">
                          {jobsData?.length} Jobs &amp; Vacancies
                        </h4>
                      </div>

                      <div className="col-md-8 col-sm-12 col-xs-12">
                        <ul
                          style={{
                            display: "flex",
                            position: "relative",
                            top: "29px",
                            left: "50%",
                            paddingBottom: "15px",
                          }}
                        >
                          <li style={{ listStyle: "none", margin: "10px" }}>
                            <span className="custom-radio">
                              <input
                                type="radio"
                                name="gender"
                                style={{ listStyleType: "none" }}
                                value="Male"
                                onChange={(e) => setgender(e.target.value)}
                                id="g1"
                              />
                              <label htmlFor="g1" />
                            </span>
                            Male
                          </li>
                          <li style={{ listStyle: "none", margin: "10px" }}>
                            <span className="custom-radio">
                              <input
                                type="radio"
                                name="gender"
                                style={{ listStyleType: "none" }}
                                value="Female"
                                onChange={(e) => setgender(e.target.value)}
                                id="g2"
                              />
                              <label htmlFor="g2" />
                            </span>
                            Female
                          </li>
                          <li style={{ listStyle: "none", margin: "10px" }}>
                            <span className="custom-radio">
                              <input
                                type="radio"
                                name="gender"
                                style={{ listStyleType: "none" }}
                                value="Both"
                                onChange={(e) => setgender(e.target.value)}
                                id="g3"
                              />
                              <label htmlFor="g3" />
                            </span>
                            Both
                          </li>
                        </ul>
                      </div>
                    </div>
                    {jobsData?.map((list, index) => (
                      <div className="job-verticle-list">
                        <div className="vertical-job-card">
                          <div className="vertical-job-header">
                            <div className="vrt-job-cmp-logo">
                              {" "}
                              <a href="#">
                                <img
                                  src={
                                    list?.postedby?.cmp_logo
                                      ? `${BACKEND_URL}/public/uploads1/companylogo/${list?.postedby?.cmp_logo}`
                                      : pic
                                  }
                                  className="img-responsive"
                                />
                              </a>{" "}
                            </div>
                            <h4>{list?.jobtitle}</h4>
                            <span className="com-tagline">
                              {list?.postedby?.designation}
                            </span>{" "}
                            <span className="pull-right vacancy-no">
                              No. <span className="v-count">{index + 1}</span>
                            </span>
                          </div>
                          <div className="vertical-job-body">
                            <div className="row">
                              <div className="col-md-9 col-sm-12 col-xs-12">
                                <ul className="can-skils">
                                  <li>
                                    <strong>Company Name: </strong>
                                    {list?.postedby?.cmp_name}
                                  </li>
                                  <li>
                                    <strong>Graduation: </strong>
                                    {list?.qualification}
                                  </li>
                                  <li>
                                    <strong>Job Type: </strong>
                                    {list?.jobtype}
                                  </li>

                                  <li>
                                    <strong>Experience: </strong>
                                    {list.experience}
                                  </li>
                                  <li>
                                    <strong>Gender: </strong>
                                    {list.gender}
                                  </li>
                                  <li>
                                    <strong>Location: </strong>
                                    {list?.postedby?.cmp_address}
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-3 col-sm-12 col-xs-12">
                                <div className="vrt-job-act">
                                  <button
                                    className="btn-job theme-btn job-apply"
                                    onClick={() =>
                                      jobinput(list?.postedby?._id)
                                    }
                                  >
                                    Apply Now
                                  </button>
                                  <button
                                    className="btn-job light-gray-btn"
                                    onClick={() => detailinput(list?._id)}
                                  >
                                    Job Detail
                                  </button>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="clearfix" />
                    {jobsData && jobsData?.length > 10 ? (
                      <div className="utf_flexbox_area padd-0">
                        <ul className="pagination">
                          <li className="page-item">
                            {" "}
                            <a
                              className="page-link"
                              href="#"
                              aria-label="Previous"
                            >
                              {" "}
                              <span aria-hidden="true">«</span>{" "}
                              <span className="sr-only">Previous</span>{" "}
                            </a>{" "}
                          </li>
                          <li className="page-item active">
                            <a className="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              2
                            </a>
                          </li>
                          <li className="page-item">
                            <a className="page-link" href="#">
                              3
                            </a>
                          </li>
                          <li className="page-item">
                            {" "}
                            <a className="page-link" href="#" aria-label="Next">
                              {" "}
                              <span aria-hidden="true">»</span>{" "}
                              <span className="sr-only">Next</span>{" "}
                            </a>{" "}
                          </li>
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* End Row */}
              </div>
            </section>
            {/* ====================== End Job Detail 2 ================ */}
          </>
          <SeekerFooter />
        </>
      </div>
    </>
  );
}

export default SearchJob;
