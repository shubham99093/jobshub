import { SeekerFooter, SeekerHeader } from "../../components/seekerComponents";
import axios from "axios";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { useSeeker } from "../../contexts/SeekerContext";
import PageTitle from "../../components/PageTitle";

function Resumedetail() {
  const { seeker } = useSeeker();

  const downloadresume = async () => {
    console.log("seeekerData in resume component before ===>", seeker);
    console.log("seeekerData in resume component before ===>", seeker);
    axios
      .post("http://localhost:5000/createresume", seeker)
      .then(() =>
        axios.get("http://localhost:5000/downloadresume", {
          responseType: "blob",
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        console.log("during download", res.data);
        saveAs(pdfBlob, `${seeker?.js_name}Resume.pdf`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("hyy");
      });
  };
  return (
    <>
      <div>
        <>
          <SeekerHeader />
          <PageTitle title="Resume Detail" page="Resume Detail" />
          {/* ====================== Resume Detail ================ */}
          <section className="padd-top-80 padd-bot-80">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-sm-7">
                  <div className="detail-wrapper">
                    <div className="detail-wrapper-body">
                      <div className="row">
                        <div className="col-md-4 text-center user_profile_img mrg-bot-30">
                          {" "}
                          <img
                            src={`http://localhost:5000/public/uploads1/seekerprofile/${
                              seeker?.js_profile
                                ? seeker?.js_profile
                                : "default.jpg"
                            }`}
                            className="img-circle width-100"
                            alt=""
                          />
                          <h4 className="meg-0">{seeker?.js_name}</h4>
                          {/*<span>{seeker?.js_exp_company}</span>*/}
                        </div>
                        <div className="col-md-8 user_job_detail">
                          <div className="col-md-12 mrg-bot-10">
                            {" "}
                            <i className="ti-location-pin padd-r-10" />
                            {seeker?.js_address}{" "}
                          </div>
                          <div className="col-md-12 mrg-bot-10">
                            {" "}
                            <i className="ti-email padd-r-10" />
                            {seeker?.js_email}{" "}
                          </div>
                          <div className="col-md-12 mrg-bot-10">
                            {" "}
                            <i className="ti-mobile padd-r-10" />
                            {seeker?.js_mno}{" "}
                          </div>
                          <div className="col-md-12 mrg-bot-10">
                            {" "}
                            <i className="ti-user padd-r-10" />
                            {seeker?.js_exp_company} (Experience Company)
                          </div>
                          <div className="col-md-12 mrg-bot-10">
                            {" "}
                            <i className="ti-shield padd-r-10" />
                            {seeker?.js_expierience} Year Exp.
                          </div>
                          <div className="col-md-12 mrg-bot-10">
                            {" "}
                            <span className="skill-tag">
                              {seeker?.js_skill}
                            </span>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sidebar */}
                <div className="col-md-4 col-sm-5">
                  <div className="sidebar">
                    <div className="widget-boxed">
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-m btn-primary"
                          onClick={downloadresume}
                        >
                          Download Resume
                        </button>
                      </div>
                    </div>
                    <div className="widget-boxed">
                      <div className="widget-boxed-header">
                        <h4>
                          <i className="ti-location-pin padd-r-10" />
                          Details
                        </h4>
                      </div>
                      <div className="widget-boxed-body">
                        <div className="side-list no-border">
                          <ul>
                            <li>
                              <i className="ti-location-pin padd-r-10" />
                              {seeker?.js_address}
                            </li>
                            <li>
                              <i className="ti-mobile padd-r-10" />
                              {seeker?.js_mno}
                            </li>
                            <li>
                              <i className="ti-email padd-r-10" />
                              {seeker?.js_email}
                            </li>
                            <li>
                              <i className="ti-pencil-alt padd-r-10" />
                              {seeker?.js_quli}
                            </li>
                            <li>
                              <i className="ti-shield padd-r-10" />
                              {seeker?.js_expierience} Year Exp.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Sidebar */}
              </div>
              {/* End Row */}
            </div>
          </section>
          {/* ====================== End Resume Detail ================ */}
        </>
        <SeekerFooter />
      </div>
    </>
  );
}

export default Resumedetail;
