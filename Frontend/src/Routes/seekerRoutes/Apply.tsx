import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { SeekerFooter, SeekerHeader } from "../../components/seekerComponents";
import Typewriter from "typewriter-effect";
import { useSeeker } from "../../contexts/SeekerContext";
import { BACKEND_URL } from "../../config";
function Apply() {
  const location = useLocation();
  const navigate = useNavigate();
  const { seeker } = useSeeker();
  const [apply, setApply] = useState({
    js_name: "",
    js_email: "",
    js_mno: "",
    resume: "",
    js_address: "",
  });
  const { accesstoken } = useSeeker();

  useEffect(() => {
    setApply({
      ...apply,
      js_name: seeker?.js_name || "",
      js_email: seeker?.js_email || "",
      js_mno: seeker?.js_mno?.toString() || "",
      js_address: seeker?.js_address || "",
    });
  }, []);

  const inputHandle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;

    setApply({
      ...apply,
      [name]:
        type === "file" &&
        e.target instanceof HTMLInputElement &&
        e.target.files
          ? e.target.files[0]
          : value,
    });
  };

  const applyFrom = async () => {
    try {
      const data = new FormData();
      const id = location.state;
      data.append("js_name", apply.js_name);
      data.append("js_email", apply.js_email);
      data.append("js_mno", apply.js_mno);
      data.append("resume", apply.resume);
      const confiOption = {
        method: "post",
        headers: {
          credentials: "includes",
          Authorization: `Bearer ${accesstoken}`,
        },
        body: data,
      };

      const response = await fetch(
        `${BACKEND_URL}/applyjob/${id}`,
        confiOption
      );
      const result = await response.json();
      if (result.status === 201) {
        toast.success("Job Apply ");
        navigate("/jobhistory");
      } else {
        toast.error("Job Not Apply ");
      }
    } catch (error) {
      console.log(error);
      toast.error("Only .pdf, .doc, and .docx files are allowed");
    }
  };

  return (
    <>
      <div>
        <>
          <SeekerHeader />
          {/* ======================= Page Title ===================== */}
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
                      typewriter.typeString("Apply Job").pauseFor(2000).start();
                    }}
                  />
                </h2>
                <p>
                  <a href="#" title="Home">
                    Home
                  </a>{" "}
                  <i className="ti-angle-double-right" /> Apply Job
                </p>
              </div>
            </div>
          </div>
          {/* ======================= End Page Title ===================== */}
          {/* ================ Apply Job ======================= */}
          <section className="padd-top-80 padd-bot-80">
            <div className="container">
              <div style={{ padding: "0 15%" }}>
                <div className="profile_detail_block">
                  <div className="text-center mrg-bot-20">
                    <h4 className="mrg-0">Front End Designer</h4>
                    <span>{apply?.js_address}</span>
                  </div>
                  <form>
                    <div className="col-md-6 col-sm-6">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={apply.js_name}
                        name="js_name"
                        onChange={inputHandle}
                      />
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <label>Email</label>
                      <input
                        type="email"
                        name="jsemail"
                        className="form-control"
                        placeholder="Email"
                        value={apply.js_email}
                        onChange={inputHandle}
                      />
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <label>Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="js_mno"
                        name="js_mno"
                        value={apply.js_mno}
                        onChange={inputHandle}
                      />
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <label>Upload CV</label>
                      <div className="custom-file-upload">
                        <input
                          type="file"
                          id="file"
                          name="resume"
                          multiple
                          onChange={inputHandle}
                        />
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-md-12">
                      <label>Pase CV</label>
                      <textarea
                        className="form-control height-120"
                        placeholder="Pase CV"
                        name="pasecv"
                        onChange={inputHandle}
                        defaultValue={""}
                      />
                    </div>
                    <div className="col-md-12 text-center">
                      <button
                        type="button"
                        className="btn theme-btn btn-m full-width"
                        onClick={applyFrom}
                      >
                        Save
                      </button>
                    </div>
                    <div className="clearfix" />
                  </form>
                </div>
              </div>
            </div>
          </section>
          <SeekerFooter />
        </>
      </div>
    </>
  );
}

export default Apply;
