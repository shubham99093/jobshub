import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RecHeader, RecFooter } from "../../components/recruiterComponents";
import PageTitle from "../../components/PageTitle";
import { BACKEND_URL } from "../../config";
function RecruiterChangePass() {
  const navigate = useNavigate();

  const [newpass, setNewpass] = useState({
    oldpwd: "",
    updatedpass: "",
    updateconpass: "",
  });
  const [accesstoken] = useState(localStorage.getItem("recruiterToken"));
  const inputhandle = ({ name, value }: { name: string; value: string }) => {
    setNewpass({ ...newpass, [name]: value });
  };
  const changepass = async () => {
    if (newpass.oldpwd && newpass.updatedpass && newpass.updateconpass) {
      const configOPtion = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
        body: JSON.stringify(newpass),
      };
      const response = await fetch(
        `${BACKEND_URL}/recchangepass`,
        configOPtion
      );
      const result = await response.json();
      if (result.status === 201) {
        toast.success("Your Password Successfully Change");
        navigate("/recruiterlogin");
      } else {
        if (result.status === 401) {
          toast.error(`${result.err}`);
        }
      }
    } else {
      toast.error("All Feilds Required");
    }
  };
  return (
    <>
      <div>
        <RecHeader />
        <>
          <PageTitle title="Change Password" page="Change Password" />
          {/* ================ Change Password ======================= */}
          <section className="padd-top-80 padd-bot-80">
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <div id="leftcol_item">
                    <div className="user_dashboard_pic">
                      {" "}
                      <img
                        alt="user photo"
                        src="assets/img/user-profile.png"
                      />{" "}
                      <span className="user-photo-action">User Title</span>{" "}
                    </div>
                  </div>
                  <div className="dashboard_nav_item">
                    <ul>
                      <li className="active">
                        <a href="change-password.html">
                          <i className="login-icon ti-key" /> Change Password
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="login-icon ti-power-off" /> Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="profile_detail_block">
                    <InputData
                      label="Old Password"
                      name="oldpwd"
                      onChange={(e) => {
                        inputhandle(e.target);
                      }}
                    />
                    <InputData
                      label="Old Password"
                      name="oldpwd"
                      onChange={(e) => {
                        inputhandle(e.target);
                      }}
                    />
                    <InputData
                      label="Old Password"
                      name="oldpwd"
                      onChange={(e) => {
                        inputhandle(e.target);
                      }}
                    />
                    <div className="col-md-4 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label>Old Password</label>
                        <input
                          type="text"
                          name="oldpwd"
                          onChange={(e) => inputhandle(e.target)}
                          className="form-control"
                          placeholder="***********"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label>New Password</label>
                        <input
                          type="password"
                          name="updatedpass"
                          onChange={(e) => inputhandle(e.target)}
                          className="form-control"
                          placeholder="***********"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <label>Canform Password</label>
                        <input
                          type="password"
                          name="updateconpass"
                          onChange={(e) => inputhandle(e.target)}
                          className="form-control"
                          placeholder="***********"
                        />
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-md-12 padd-top-10 text-center">
                      {" "}
                      <button
                        type="button"
                        className="btn theme-btn btn-m full-width"
                        onClick={changepass}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>

        <RecFooter />
      </div>
    </>
  );
}

const InputData = ({
  label,
  name,
  onChange,
}: {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="col-md-4 col-sm-6 col-xs-12">
      <div className="form-group">
        <label>{label}</label>
        <input
          type="password"
          name={name}
          onChange={onChange}
          className="form-control"
          placeholder="***********"
        />
      </div>
    </div>
  );
};

export default RecruiterChangePass;
