import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPInput from "react-otp-input";
import Loader from "../../components/Loader";
import PageTitle from "../../components/PageTitle";

function SeekerSendMail() {
  const [isLoading, setIsLoading] = useState(true);
  const [OTP, setOTP] = useState("");
  const [step, setstep] = useState(0);
  const [data, setData] = useState({
    js_email: "",
    newpwd: "",
    conpwd: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const OtpRequestFunction = async (e: React.MouseEvent) => {
    //  form Validation
    e.preventDefault();
    const res = await fetch("http://localhost:5000/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.status !== 201 || !result) {
      toast.error(result.err);
    } else {
      toast.success("Mail Send For Forgot Password");
      setstep(step + 1);
    }
  };

  const verifyOtpf = async () => {
    if (OTP == "") {
      toast.error("Plaese Enter OTP");
    } else {
      const veri = {
        otp: OTP,
        js_email: data.js_email,
      };
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(veri),
      };
      const resp = await fetch("http://localhost:5000/seekerotpverify", config);
      const result = await resp.json();
      if (result.status === 201) {
        toast.success(result.msg);
        setstep(step + 1);
      } else {
        toast.error(result.msg);
      }
    }
  };

  const changepassword = async () => {
    if (data.newpwd == data.conpwd) {
      const config = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        "http://localhost:5000/seekerforgot",
        config
      );
      const result = await response.json();
      if (result.status === 201) {
        toast.success(result.msg);
        navigate("/seekerlogin");
      } else {
        toast.error(result.msg);
      }
    } else {
      toast.error("New Password & Confirm Password Always Same");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <PageTitle title="Forgot Password" page="Forgot Password" />
          {/* ================ Change Password ======================= */}
          {step == 0 ? (
            <>
              <section className="padd-top-80 padd-bot-80">
                <div className="container">
                  <center>
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div
                          className="profile_detail_block"
                          style={{ width: "50%" }}
                        >
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group">
                              <label>Enter Your Email</label>
                              <input
                                type="text"
                                name="js_email"
                                className="form-control"
                                placeholder="Enter Your Email"
                                onChange={(e) => handleChange(e)}
                              />
                            </div>
                          </div>

                          <div className="clearfix" />
                          <div className="col-md-12 padd-top-10 text-center">
                            {" "}
                            <button
                              className="btn btn-m theme-btn full-width"
                              type="button"
                              onClick={OtpRequestFunction}
                            >
                              Send Otp
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </center>
                </div>
              </section>
            </>
          ) : step == 1 ? (
            <>
              <section className="padd-top-80 padd-bot-80">
                <div className="container">
                  <center>
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div
                          className="profile_detail_block"
                          style={{ width: "50%" }}
                        >
                          <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group">
                              <label>Enter Your Otp</label>
                              <div className="otp">
                                <OTPInput
                                  value={OTP}
                                  numInputs={6}
                                  renderSeparator={<span>-</span>}
                                  onChange={setOTP}
                                  inputType="number"
                                  inputStyle={{
                                    textAlign: "center",
                                    color: "black",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "45px",
                                    height: "45px",
                                    margin: "0 10px",
                                    fontSize: "20px",
                                  }}
                                  renderInput={(props) => <input {...props} />}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="clearfix" />
                          <div className="col-md-12 padd-top-10 text-center">
                            {" "}
                            <button
                              className="btn btn-m theme-btn full-width"
                              type="button"
                              onClick={() => verifyOtpf()}
                            >
                              Verify
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </center>
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="padd-top-80 padd-bot-80">
                <div className="container">
                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-9 ">
                      <div className="profile_detail_block">
                        <center>
                          <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                              <label>New Password</label>
                              <input
                                type="password"
                                name="newpwd"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                className="form-control"
                                placeholder="*****"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                              <label>Confirm Password</label>
                              <input
                                type="password"
                                name="conpwd"
                                className="form-control"
                                placeholder="*****"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                          </div>
                          <div className="clearfix" />
                          <div className="col-md-12 padd-top-10 text-center">
                            {" "}
                            <button
                              className="btn btn-m theme-btn full-width"
                              type="button"
                              onClick={changepassword}
                            >
                              Update
                            </button>
                          </div>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default SeekerSendMail;
