import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import Loader from "../../components/Loader";
import { useForm } from "react-hook-form";
import PageTitle from "../../components/PageTitle";
import { useRecruiter } from "../../contexts/RecruiterContext";

// import toast, { Toaster } from 'react-hot-toast';
function RecruiterLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setAccesstoken } = useRecruiter();
  const [isLoading, setIsLoading] = useState(true);
  const [newData1, setnew1] = useState({
    cmp_email: "",
    cmp_pwd: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // simulate an API call with a delay of 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  function update1(e: React.ChangeEvent<HTMLInputElement>) {
    setnew1({ ...newData1, [e.target.name]: e.target.value });
  }

  async function loginapi() {
    if (newData1.cmp_email && newData1.cmp_pwd) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData1),
      };

      const response = await fetch(
        "http://localhost:5000/reclogin",
        requestOptions
      );
      const result = await response.json();
      if (result.status !== 8) {
        if (result.status === 200) {
          localStorage.setItem("recruiterToken", result.token);
          setAccesstoken(result.token);
          toast.success("Sign In Successfully");
          if (result.exist === 1) {
            navigate("/editprofile");
          } else if (result.exist === 3) {
            navigate("/payment");
          } else {
            navigate("/recruiterhome");
          }
        } else {
          toast.error("Invalid Credentials");
        }
      } else {
        toast.error(result.err);
        navigate("/recruitersignup");
      }
    } else {
      toast.error("All Feild Required");
    }
  }
  return (
    <>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <>
              <PageTitle title="Login An Account" page="Login" />
              {/* ======================= End Page Title ===================== */}

              <section className="padd-top-80 padd-bot-80">
                <div className="container">
                  <div className="log-box">
                    <form
                      className="log-form"
                      onSubmit={handleSubmit(loginapi)}
                    >
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            {...register("cmp_email", {
                              required: true,
                              pattern:
                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            })}
                            onChange={(e) => update1(e)}
                          />
                          {errors.cmp_email && (
                            <p className="err">Please Provide Your Email</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="******"
                            {...register("cmp_pwd", {
                              required: true,
                              minLength: 6,
                            })}
                            onChange={(e) => update1(e)}
                          />
                          {errors.cmp_pwd && (
                            <p className="err">Please Provide Your Password</p>
                          )}
                        </div>
                        <div className="form-group">
                          <Link
                            to="/recruiterforgot"
                            title="Forget"
                            className="fl-right"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group text-center mrg-top-15">
                          <button
                            type="submit"
                            className="btn theme-btn btn-m full-width"
                          >
                            Sign In
                          </button>
                        </div>
                        Don't Have an account ?{" "}
                        <Link
                          to="/recruitersignup"
                          title="Home"
                          className="login"
                        >
                          Sign Up
                        </Link>
                      </div>
                      <div className="clearfix" />
                    </form>
                  </div>
                </div>
              </section>
              <div className="row">
                <div className="col-md-12">
                  <div className="copyright text-center">
                    <p>Copyright © 2023 All Rights Reserved.</p>
                  </div>
                </div>
              </div>
            </>
          </div>
        )}
      </>
    </>
  );
}

export default RecruiterLogin;
