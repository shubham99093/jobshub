import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPInput from "react-otp-input";
import Loader from "../../components/Loader";
import PageTitle from "../../components/PageTitle";
import { BACKEND_URL } from "../../config";

function RecruiterForgot() {
  const [OTP, setOTP] = useState(""); //for otp input
  const [data, setData] = useState({
    cmp_email: "",
    newpwd: "",
    conpwd: "",
  });
  const navigate = useNavigate();
  const [step, setstep] = useState(0);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const OtpRequestFunction = async (e: React.MouseEvent) => {
    //     //  form Validation
    e.preventDefault();
    const res = await fetch(`${BACKEND_URL}/recmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!result || result.error) {
      toast.error(result.error);
    } else {
      // window.alert("send");
      toast.success("Mail Send For Forgot Password");
      setstep(step + 1);
    }
  };

  const verifyOtpf = async () => {
    //     //  form Validation\
    if (OTP == "") {
      toast.error("Plaese Enter OTP");
    } else {
      const veri = {
        otp: OTP,
        cmp_email: data.cmp_email,
      };
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(veri),
      };
      const resp = await fetch(`${BACKEND_URL}/recruiterverifyotp`, config);
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
      const response = await fetch(`${BACKEND_URL}/recruiterforgot`, config);
      const result = await response.json();
      if (result.status === 201) {
        toast.success(result.msg);
        navigate("/recruiterlogin");
      } else {
        toast.error(result.msg);
      }
    } else {
      toast.error("New Password & Confirm Password Always Same");
    }
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <PageTitle title="Forgot Password" page="Forgot Password" />
          {/* ======================= End Page Title ===================== */}
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
                                name="cmp_email"
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
                              <div
                                className="otp"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <OTPInput
                                  value={OTP}
                                  numInputs={6}
                                  onChange={setOTP}
                                  renderSeparator={<span>-</span>}
                                  renderInput={(props) => <input {...props} />}
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
                                  shouldAutoFocus={true}
                                  // secure
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

export default RecruiterForgot;
