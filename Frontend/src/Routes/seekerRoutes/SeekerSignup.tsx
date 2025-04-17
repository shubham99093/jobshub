import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { useForm } from "react-hook-form";
import { useSeeker } from "../../contexts/SeekerContext";
import PageTitle from "../../components/PageTitle";

function SeekerSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const { setAccesstoken } = useSeeker();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // simulate an API call with a delay of 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  //registration api
  const [user, setUser] = useState({
    js_name: "",
    js_email: "",
    js_pwd: "",
    js_cpwd: "",
    js_mno: "",
  });

  const handleInputs = ({ name, value }: { name: string; value: string }) => {
    setUser({ ...user, [name]: value });
  };

  // data send from the front to backend using fetch function
  const userData = async () => {
    // const result = await signup(user);
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await response.json();
    if (
      user.js_name &&
      user.js_email &&
      user.js_pwd &&
      user.js_cpwd &&
      user.js_mno
    ) {
      if (result.status === 200) {
        toast.success("Seeker Signup Successfully");
        localStorage.setItem("seeker", JSON.stringify(result));
        setAccesstoken(result.token);
        navigate("/seekerlogin");
      } else {
        if (result.status === 3) {
          toast.error("Email Id is Already Exist");
        } else {
          toast.error(result.err);
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
          <Header />
          <>
            <PageTitle title="Create an Account" page="SignUp" />
            {/* ====================== Start Signup Form ============= */}
            <section className="padd-top-80 padd-bot-80">
              <div className="container">
                <div className="log-box">
                  <form className="log-form" onSubmit={handleSubmit(userData)}>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          {...register("js_name", { required: true })}
                          onChange={(e) => handleInputs(e.target)}
                        />
                        {errors.js_name && (
                          <p className="err">Please check the First Name</p>
                        )}
                      </div>
                    </div>
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
                          onChange={(e) => handleInputs(e.target)}
                        />
                        {errors.js_email && (
                          <p className="err">Please check the Email</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
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
                          onChange={(e) => handleInputs(e.target)}
                        />
                        {errors.js_pwd && (
                          <p className="err">Password must be 6 length</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="********"
                          {...register("js_cpwd", {
                            required: true,
                            minLength: 6,
                            validate: (value) =>
                              value === user.js_pwd || "Password not match",
                          })}
                          onChange={(e) => handleInputs(e.target)}
                        />
                        {errors.js_cpwd && (
                          <p className="err">Password not match</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Whatsapp No.</label>
                        <input
                          type="tele"
                          defaultValue="91"
                          maxLength={12}
                          className="form-control"
                          placeholder="Phone Number"
                          {...register("js_mno", {
                            required: true,
                            minLength: 12,
                            maxLength: 12,
                          })}
                          onChange={(e) => handleInputs(e.target)}
                        />
                        {errors.js_mno && (
                          <p className="err">Please check the Whatsapp No</p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group text-center mrg-top-15">
                        <button
                          type="submit"
                          className="btn theme-btn btn-m full-width"
                        >
                          Sign Up
                        </button>
                      </div>
                      Alredy have an account?{" "}
                      <Link to="/seekerlogin" title="Home" className="login">
                        Sign In
                      </Link>{" "}
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

export default SeekerSignup;
