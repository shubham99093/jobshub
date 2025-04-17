import { useState } from "react";
import Modal from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecruiter } from "../contexts/RecruiterContext";

interface IChangePassword {
  open: boolean;
  onCloseModal: () => void;
  user: "seeker" | "recruiter";
  accesstoken: string | null;
}

const ChangepasswordModel = ({
  open,
  onCloseModal,
  user,
  accesstoken,
}: IChangePassword) => {
  const navigate = useNavigate();
  const [newpass, setNewpass] = useState({
    oldpwd: "",
    updatedpass: "",
    updateconpass: "",
  });

  const logout = async () => {
    localStorage.removeItem("recruiterToken");
    navigate(`/${user}login`);
  };

  const inputhandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewpass({ ...newpass, [e.target.name]: e.target.value });
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
        `http://localhost:5000/${
          user === "seeker" ? "changepass" : "recchangepass"
        }`,
        configOPtion
      );
      const result = await response.json();
      if (result.status === 201) {
        toast.success("Your Password Successfully Change");
        logout();
      } else {
        if (result.status === 401) {
          toast.error(`${result.error}`);
        }
      }
    } else {
      toast.error("All Feilds Required");
    }
  };

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 20,
        }}
      >
        <span>
          <h3>Change Password...</h3>
        </span>
        <span></span>
      </div>
      <hr />
      <div className="scr" style={{ height: "450px", overflow: "auto" }}>
        <div className="col-md-12">
          <div className="profile_detail_block">
            <InputData
              label="Old Password"
              name="oldpwd"
              onChange={inputhandle}
            />
            <InputData
              label="New Password"
              name="updatedpass"
              onChange={inputhandle}
            />
            <InputData
              label="Confirm Password"
              name="updateconpass"
              onChange={inputhandle}
            />
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
    </Modal>
  );
};

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
    <>
      <div className="col-md-12 col-sm-12 col-xs-12">
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
    </>
  );
};

export default ChangepasswordModel;
