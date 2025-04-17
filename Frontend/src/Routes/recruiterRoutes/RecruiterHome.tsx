import { RecHeader } from "../../components/recruiterComponents";
import { RecFooter } from "../../components/recruiterComponents";
import ReactWhatsapp from "react-whatsapp";
import "react-toastify/dist/ReactToastify.css";
import { postJobHelp } from "../../utils/recruiterInto";
import InfoCard from "../../components/InfoCard";
function Recruiterhome() {
  return (
    <>
      <div>
        <RecHeader />
        <>
          <div
            className="utf_main_banner_area"
            style={{ backgroundImage: "url(assets/img/slider_bg.jpg)" }}
            data-overlay={8}
          >
            <div className="container">
              <div className="col-md-8 col-sm-10">
                <div className="caption cl-white home_two_slid">
                  <h2>
                    Connect With Top <span className="theme-cl">Talent</span> In
                    No Time.
                  </h2>
                </div>
              </div>
            </div>
          </div>
          {/* ================= How to post job ========================= */}
          <section className="utf_job_category_area">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2">
                  <div className="heading">
                    <h2>How to Post a Job?</h2>
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
          {/* ================= Category start ========================= */}

          <ReactWhatsapp
            number="910000000000"
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
        </>
        <RecFooter />
      </div>
    </>
  );
}

export default Recruiterhome;
