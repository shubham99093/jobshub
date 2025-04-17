import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SeekerFooter, SeekerHeader } from "../../components/seekerComponents";
import "react-responsive-modal/styles.css";
import PageTitle from "../../components/PageTitle";
import { IExtendedJob } from "../../utils/types";

function JobDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.state;
  const [jobdata, setJobdata] = useState<IExtendedJob | null>(null);
  const [accesstoken] = useState(localStorage.getItem("seekerToken"));
  useEffect(() => {
    call();
  }, []);

  const call = async () => {
    if (!id) {
      navigate("/searchjob");
    }

    const configOption = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const response = await fetch(
      `http://localhost:5000/jobdetail/${id}`,
      configOption
    );
    const result = await response.json();

    setJobdata(result.data);
  };

  const applyHandle = (id: string) => {
    navigate("/apply", { state: id });
  };

  return (
    <>
      <div>
        <>
          <SeekerHeader />
          <PageTitle title="Job Detail" page="Job Detail" />
          {/* ================ Profile Settings ======================= */}
          <section className="padd-top-80 padd-bot-60">
            <div className="container">
              {/* row */}
              <div className="row">
                <div className="col-md-8 col-sm-7">
                  <div className="detail-wrapper">
                    <div className="detail-wrapper-body">
                      <div className="row">
                        <div className="col-md-4 text-center user_profile_img">
                          {" "}
                          <img
                            src={`http://localhost:5000/public/uploads1/companylogo/${jobdata?.postedby?.cmp_logo}`}
                            className="width-100"
                            alt="No image"
                          />
                          <h4 className="meg-0">{jobdata?.jobtitle}</h4>
                          <span>512 Big Tower, New Delhi</span>
                          <div className="text-center">
                            <button
                              onClick={() => {
                                applyHandle(id);
                              }}
                              type="button"
                              data-toggle="modal"
                              data-target="#signin"
                              className="btn-job theme-btn job-apply"
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                        <div className="col-md-8 user_job_detail">
                          <div className="col-sm-12 mrg-bot-10">
                            {" "}
                            <i className="ti-credit-card padd-r-10" />
                            {jobdata?.salaryrange}/Month{" "}
                          </div>
                          <div className="col-sm-12 mrg-bot-10">
                            {" "}
                            <i className="ti-mobile padd-r-10" />
                            {jobdata?.postedby?.rec_mno}{" "}
                          </div>
                          <div className="col-sm-12 mrg-bot-10">
                            {" "}
                            <i className="ti-email padd-r-10" />
                            {jobdata?.postedby?.cmp_email}{" "}
                          </div>
                          <div className="col-sm-12 mrg-bot-10">
                            {" "}
                            <i className="ti-calendar padd-r-10" />
                            <span
                              className={
                                jobdata?.jobtype === "Part Time"
                                  ? "job-type part-type"
                                  : jobdata?.jobtype === "Full Time"
                                  ? "job-type full-type "
                                  : jobdata?.jobtype === "Freelancer"
                                  ? "job-type internship-type"
                                  : jobdata?.jobtype === "WorkFromHome"
                                  ? "job-type workFromHome"
                                  : ""
                              }
                            >
                              {jobdata?.jobtype}
                            </span>{" "}
                          </div>
                          <div className="col-sm-12 mrg-bot-10">
                            {" "}
                            <i className="ti-user padd-r-10" />
                            <span className="cl-danger">
                              {jobdata?.vacancy} Open Position
                            </span>{" "}
                          </div>
                          <div className="col-sm-12 mrg-bot-10">
                            {" "}
                            <i className="ti-shield padd-r-10" />
                            {jobdata?.experience} Exp.{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="detail-wrapper">
                    <div className="detail-wrapper-header">
                      <h4>Job Skill</h4>
                    </div>
                    <div className="detail-wrapper-body">
                      <ul className="detail-list">
                        <li>{jobdata?.skill}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Sidebar */}
                <div className="col-md-4 col-sm-5">
                  <div className="sidebar">
                    {/* Start: Job Overview */}
                    <div className="widget-boxed">
                      <div className="widget-boxed-header">
                        <h4>
                          <i className="ti-location-pin padd-r-10" />
                          Location
                        </h4>
                      </div>
                      <div className="widget-boxed-body">
                        <div className="side-list no-border">
                          <ul>
                            <li>
                              <i className="ti-credit-card padd-r-10" />
                              Package: {jobdata?.salaryrange}/Month
                            </li>
                            <li>
                              <i className="ti-world padd-r-10" />
                              {jobdata?.postedby?.linkdin}
                            </li>
                            <li>
                              <i className="ti-mobile padd-r-10" />
                              {jobdata?.postedby?.twitter}
                            </li>
                            <li>
                              <i className="ti-email padd-r-10" />
                              {jobdata?.postedby?.google}
                            </li>
                            <li>
                              <i className="ti-pencil-alt padd-r-10" />
                              Bachelor Degree
                            </li>
                            <li>
                              <i className="ti-shield padd-r-10" />3 Year Exp.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* End: Job Overview */}
                    {/* Start: Opening hour */}
                    <div className="widget-boxed">
                      <div className="widget-boxed-header">
                        <h4>
                          <i className="ti-time padd-r-10" />
                          Opening Hours
                        </h4>
                      </div>
                      <div className="widget-boxed-body">
                        <div className="side-list">
                          <ul>
                            <li>
                              Monday <span>{jobdata?.postedby?.worktime}</span>
                            </li>
                            <li>
                              Tuesday <span>{jobdata?.postedby?.worktime}</span>
                            </li>
                            <li>
                              Wednesday{" "}
                              <span>{jobdata?.postedby?.worktime}</span>
                            </li>
                            <li>
                              Thursday{" "}
                              <span>{jobdata?.postedby?.worktime}</span>
                            </li>
                            <li>
                              Friday <span>{jobdata?.postedby?.worktime}</span>
                            </li>
                            <li>
                              Saturday <span>10:00 AM - 3:00 PM</span>
                            </li>
                            <li>
                              Sunday <span>Closed</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Row */}
            </div>
          </section>
          <SeekerFooter />
        </>
      </div>
    </>
  );
}

export default JobDetail;
