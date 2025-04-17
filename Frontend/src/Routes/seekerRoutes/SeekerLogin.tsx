import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import "react-responsive-modal/styles.css";
import Loader from "../../components/Loader";
import PageTitle from "../../components/PageTitle";
import { useSeeker } from "../../contexts/SeekerContext";

function SeekerLogin() {
  const [user, setUser] = useState({ js_email: "", js_pwd: "" });
  const [isLoading, setIsLoading] = useState(true);
  const { setAccesstoken } = useSeeker();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // simulate an API call with a delay of 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async () => {
    if (user.js_email && user.js_pwd) {
      const responce = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });

      const result: { err: string; status: number; token: string } =
        await responce.json();

      if (result.status === 11) {
        toast.error(result.err);
      } else {
        if (result.status === 8) {
          toast.error(result.err);
          navigate("/seekersignup");
        } else {
          if (result.status === 1) {
            localStorage.setItem("seekerToken", result.token);
            setAccesstoken(result.token);
            toast.success("Seeker Enter Successfully");
            navigate("/seditprofile");
          } else if (result.status === 2) {
            localStorage.setItem("seekerToken", result.token);
            setAccesstoken(result.token);
            toast.success("Seeker Signin ");
            navigate("/seekerhome");
          } else {
            toast.error("Invalid Credentails");
          }
        }
      }
    } else {
      toast.error("All Feild Required");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <>
            <PageTitle title="Sign In An Account" page="Sign In" />
            {/* ======================= End Page Title ===================== */}
            <section className="padd-top-80 padd-bot-80">
              <div className="container">
                <div className="log-box">
                  <form
                    className="log-form"
                    method="POST"
                    onSubmit={handleSubmit(loginUser)}
                  >
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          {...register("js_email", {
                            required: true,
                            pattern:
                              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          })}
                          onChange={handleInputs}
                          // onChange={(e) => update1(e)}
                        />
                        {errors.js_email && (
                          <p className="err">Please check the Email</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="********"
                          {...register("js_pwd", {
                            required: true,
                            minLength: 6,
                          })}
                          onChange={handleInputs}
                          // onChange={(e) => update1(e)}
                        />
                        {errors.js_pwd && (
                          <p className="err">Please check the Password</p>
                        )}
                      </div>
                      <div className="form-group">
                        {" "}
                        <Link
                          to="/seekersendmail"
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
                      <Link to="/seekersignup" title="Home" className="login">
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
  );
}
export default SeekerLogin;
