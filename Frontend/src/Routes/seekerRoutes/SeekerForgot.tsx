import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import PageTitle from "../../components/PageTitle";

function SeekerForgot() {
  const [isLoading, setIsLoading] = useState(true);
  const { id, token } = useParams();
  const [pwd, setPwd] = useState({ newpwd: "" });
  const navigate = useNavigate();

  useEffect(() => {
    userValid();
    // simulate an API call with a delay of 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd({
      newpwd: e.target.value,
    });
  };

  const userValid = async () => {
    const res = await fetch(
      `http://localhost:5000/seekerforgot/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.status == 201) {
      // toast.sus
      console.log("useer valid");
    } else {
      navigate("/*");
    }
  };

  const submit = async () => {
    const configOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pwd),
    };

    const data = await fetch(
      `http://localhost:5000/seekerforgot/${id}/${token}`,
      configOption
    );
    const result = await data.json();
    if (result.status === 201) {
      toast.success("Password Change Success");
      navigate("/seekerlogin");
      setPwd({ newpwd: "" });
    } else {
      toast.error("Your Token Expire Create New Link");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <>
            <PageTitle title="Change Password" page="Forgot Password" />
            {/* ================ Change Password ======================= */}
            <section className="padd-top-80 padd-bot-80">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile_detail_block">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label>New Password</label>
                          <input
                            type="password"
                            name="newpwd"
                            onChange={handleInput}
                            className="form-control"
                            placeholder="***********"
                          />
                        </div>
                      </div>

                      <div className="clearfix" />
                      <div className="col-md-12 padd-top-10 text-center">
                        {" "}
                        <a
                          href="#"
                          className="btn btn-m theme-btn full-width"
                          onClick={submit}
                        >
                          Submit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        </div>
      )}
    </>
  );
}

export default SeekerForgot;
