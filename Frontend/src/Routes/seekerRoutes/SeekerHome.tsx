import { useEffect, useState } from "react";
import { SeekerHeader, SeekerFooter } from "../../components/seekerComponents";
import { Link } from "react-router-dom";
import ReactWhatsapp from "react-whatsapp";
import Load from "../../Load";
import { IJobPost } from "../../utils/types";
import { useSeeker } from "../../contexts/SeekerContext";
import { postJobHelp } from "../../utils/seekerinto";
import InfoCard from "../../components/InfoCard";

function Seekerhome() {
  const { accesstoken } = useSeeker();
  const [job, setJohb] = useState<IJobPost[] | []>([]);

  useEffect(() => {
    calljobs();
  }, []);

  const calljobs = async () => {
    try {
      const configOption = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          credentials: "includes",
          Authorization: `Bearer ${accesstoken}`,
        },
      };
      const res = await fetch("http://localhost:5000/getjobedu", configOption);
      const data = await res.json();
      console.log(data);
      setJohb(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Load />
        <SeekerHeader />
        <>
          <div
            className="utf_main_banner_area"
            style={{ backgroundImage: "url(assets/img/blog-banner.jpg)" }}
            data-overlay={8}
          >
            <div className="container">
              <div className="col-md-8 col-sm-10">
                <div className="caption cl-white home_two_slid">
                  <h2>
                    Find & Crack Your <span className="theme-cl">Dream</span>{" "}
                    Job.
                  </h2>
                </div>
              </div>
            </div>
          </div>
          {/* ======================= End Banner ===================== */}

          {/* ================= How to apply job ========================= */}
          <section className="utf_job_category_area">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <div className="heading">
                    <h2>How to Apply for Job?</h2>
                    <p>FOLLOW THIS STEPS</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {postJobHelp?.map((item, index) => (
                    <InfoCard key={index} {...item} />
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* ================= Job start ========================= */}
          <section className="padd-top-80 padd-bot-80">
            <div className="container">
              <div className="tab-content">
                <div
                  className="tab-pane fade in show active"
                  id="recent"
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                      <div className="heading">
                        <h2>According to Your Education</h2>
                      </div>
                    </div>
                    {/* Single Job */}
                    {job?.map((item) => (
                      <div className="col-md-3 col-sm-6">
                        <div className="utf_grid_job_widget_area">
                          {" "}
                          <span
                            className={
                              item?.jobtype === "Part Time"
                                ? "job-type part-type"
                                : item?.jobtype === "Full Time"
                                ? "job-type full-type "
                                : item?.jobtype === "Freelancer"
                                ? "job-type internship-type"
                                : item?.jobtype === "WorkFromHome"
                                ? "job-type workFromHome"
                                : ""
                            }
                          >
                            {item?.jobtype}
                          </span>
                          <div className="u-content">
                            <div className="avatar box-80">
                              {" "}
                              <a href="employer-detail.html">
                                {" "}
                                <img
                                  className="img-responsive"
                                  src="assets/img/company_logo_1.png"
                                  alt=""
                                />{" "}
                              </a>{" "}
                            </div>
                            <h5>
                              <a href="#">{item?.jobtitle}</a>
                            </h5>
                          </div>
                          <div className="utf_apply_job_btn_item">
                            {" "}
                            <Link
                              to="/searchjob"
                              className="btn job-browse-btn btn-radius br-light"
                            >
                              Apply Now
                            </Link>{" "}
                          </div>
                        </div>
                      </div>
                    ))}
                    <ReactWhatsapp
                      number="917016332838"
                      message="Hello!!! Can You Help Me ?"
                      style={{
                        background: "transparent",
                        border: "none",
                        position: "fixed",
                        left: "5px",
                        bottom: "24px",
                        zIndex: "999999",
                      }}
                    >
                      <img
                        src="assets/img/gif.gif"
                        className="logotext"
                        style={{
                          color: "#ffffff",
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </ReactWhatsapp>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mrg-top-20 text-center">
                <Link to="/searchjob" className="btn theme-btn btn-m">
                  Browse All Jobs
                </Link>
              </div>
            </div>
          </section>
        </>
        <SeekerFooter />
      </div>
    </>
  );
}

export default Seekerhome;
