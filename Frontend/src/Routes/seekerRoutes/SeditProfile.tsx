import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SeekerHeader, SeekerFooter } from "../../components/seekerComponents";
import { toast } from "react-toastify";
import moment from "moment";
import { useForm } from "react-hook-form";

import "react-responsive-modal/styles.css";
import PageTitle from "../../components/PageTitle";
import ChangepasswordModel from "../../components/ChangePasswordModel";
import ManageProfileOption from "../../components/ManageProfileOption";
import { manageProfileOption } from "../../utils/seekerinto";
import { useSeeker } from "../../contexts/SeekerContext";
import { BACKEND_URL } from "../../config";
function SeditProfile() {
  const [open, setOpen] = useState(false);
  const { seeker, setSeeker, accesstoken } = useSeeker();
  const [inputdata, setInputdata] = useState(seeker);

  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const genderOption = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const updateHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    setInputdata({
      ...inputdata,
      [e.target.name]: e.target.value,
    });
    console.log(inputdata);
  };

  const profileUpdate = async () => {
    const configOption = {
      method: "put",
      body: JSON.stringify(inputdata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "includes",
        Authorization: `Bearer ${accesstoken}`,
      },
    };

    const response = await fetch(`${BACKEND_URL}/updateprofile`, configOption);
    const result = await response.json();
    if (result.status === 201) {
      toast("Seeker Profile Update Success");
      setSeeker({ ...seeker, ...inputdata });
      navigate("/seekerhome");
    } else {
      toast.error("Seeker Profile is Not Update");
    }
  };

  const profilepic = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files?.[0]) {
      toast.error("Please select a file");
      return;
    }
    const selectedFile = event?.target?.files?.[0];
    const formdata = new FormData();
    formdata.append("js_profile", selectedFile);
    const configOption = {
      method: "PUT",
      headers: {
        credentials: "includes",
        Authorization: `Bearer ${accesstoken}`,
      },
      body: formdata,
    };

    const response = await fetch(`${BACKEND_URL}/updateimage`, configOption);
    const result = await response.json();
    if (result.status === 201) {
      toast.success("Profile Picture Update");
      setSeeker({ ...seeker, js_profile: result?.js_profile });
      navigate("/seekerprofile");
    } else toast.error("Profile Picture not Update yet");
  };

  const today = moment().add(-18, "y").format("YYYY-MM-DD");

  return (
    <>
      <div>
        <SeekerHeader />
        <ChangepasswordModel
          open={open}
          onCloseModal={onCloseModal}
          user="seeker"
          accesstoken={accesstoken}
        />
        <>
          <PageTitle title="Profile Settings" page="Upload profile" />
          {/* ================ Profile Settings ======================= */}
          <section className="padd-top-80 padd-bot-80">
            <div className="container">
              <div className="row">
                <ManageProfileOption
                  option={manageProfileOption}
                  onOpenModal={onOpenModal}
                  alt="Seeker Profile"
                  img={seeker?.js_profile}
                  user="seeker"
                  name={seeker?.js_name}
                  profilepic={profilepic}
                  active="Edit Profile"
                />
                <div className="col-md-9">
                  <div className="profile_detail_block">
                    <form
                      className="log-form"
                      method="PUT"
                      onSubmit={handleSubmit(profileUpdate)}
                    >
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label>Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="js_name"
                            placeholder="Your Full Name"
                            value={inputdata?.js_name}
                            onChange={updateHandler}
                          />
                          {errors.js_name && (
                            <p className="err">Please check the First Name</p>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="text"
                            className="form-control"
                            name="js_email"
                            placeholder="mail@example.com"
                            value={inputdata?.js_email}
                            onChange={updateHandler}
                          />
                          {errors.js_email && (
                            <p className="err">Please check the Email</p>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label>Phone</label>
                          <input
                            type="text"
                            className="form-control"
                            name="js_mno"
                            maxLength={13}
                            placeholder="123 214 13247"
                            value={inputdata?.js_mno}
                            onChange={updateHandler}
                          />
                          {errors.js_mno && (
                            <p className="err">Please check the Password</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            name="js_address"
                            placeholder="Address"
                            value={inputdata?.js_address}
                            onChange={updateHandler}
                          />
                          {errors.js_address && (
                            <p className="err">Please check the Password</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label>Language</label>
                          <input
                            type="text"
                            className="form-control"
                            name="js_language"
                            placeholder="Gujarati Hindi English...."
                            value={inputdata?.js_language}
                            onChange={updateHandler}
                          />
                          {errors.js_language && (
                            <p className="err">Please check the Password</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <label>Gender</label>
                        <select
                          className="wide form-control"
                          name="js_gender"
                          onChange={updateHandler}
                        >
                          <option value="">Select Gender</option>
                          {genderOption.map((item) => (
                            <option
                              value={item.value}
                              selected={item.value === inputdata?.js_gender}
                            >
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label>Date Of Birth</label>
                          <input
                            type="date"
                            id="js_dob"
                            name="js_dob"
                            max={today}
                            className="form-control"
                            placeholder="YYYY/MM/DD"
                            value={
                              // inputdata?.js_dob?.slice(0, 10)
                              moment(inputdata?.js_dob).format("YYYY-MM-DD")
                            }
                            onChange={updateHandler}
                          />
                          {errors.js_dob && (
                            <p className="err">Please check the Password</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label>Education</label>
                          <input
                            type="text"
                            className="form-control"
                            name="js_quli"
                            placeholder="10th 12th B.com BCA BBA CA"
                            value={inputdata?.js_quli}
                            onChange={updateHandler}
                          />
                          {errors.js_quli && (
                            <p className="err">Please check the Password</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label>Specialization Skill</label>
                          <input
                            type="text"
                            className="form-control"
                            name="js_skill"
                            placeholder="According to Your Education"
                            value={inputdata?.js_skill}
                            onChange={updateHandler}
                          />
                          {errors.js_skill && (
                            <p className="err">Please check the Password</p>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label>University Detail</label>
                          <input
                            type="text"
                            className="form-control"
                            name="uni_detail"
                            placeholder="Eg. National Institute of Technology (NIT)"
                            value={inputdata?.uni_detail}
                            onChange={updateHandler}
                          />
                          {errors.uni_detail && (
                            <p className="err">Please check the Password</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label>Course Type</label>
                          <input
                            type="text"
                            className="form-control"
                            name="js_course_type"
                            placeholder="Eg. Full Time,Part Time, Distance Learning"
                            value={inputdata?.js_course_type}
                            onChange={updateHandler}
                          />
                          {errors.js_course_type && (
                            <p className="err">Please check the Password</p>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label>Experience</label>
                          <input
                            type="text"
                            className="form-control"
                            name="js_expierience"
                            placeholder="1,2,3,..etc"
                            value={inputdata?.js_expierience}
                            onChange={updateHandler}
                            autoComplete="off"
                          />
                          {errors.js_expierience && (
                            <p className="err">Please check the Password</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label>Name of Company Experience</label>
                          <input
                            type="text"
                            className="form-control"
                            name="js_exp_company"
                            placeholder="Tech Mehindra like"
                            value={inputdata?.js_exp_company}
                            onChange={updateHandler}
                          />
                          {errors.js_exp_company && (
                            <p className="err">Please check the Password</p>
                          )}
                        </div>
                      </div>
                      <div className="clearfix" />
                      <div className="col-md-6 padd-top-6 text-center">
                        {" "}
                        <button
                          type="button"
                          className="btn btn-m them-btn  full-width"
                          onClick={() => {
                            navigate("/seekerprofile");
                          }}
                        >
                          Cancle
                        </button>
                      </div>
                      <div className="col-md-6 padd-top-6 text-center">
                        {" "}
                        <button
                          type="submit"
                          className="btn theme-btn btn-m full-width"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* ================ End Profile Settings ======================= */}
        </>
        <SeekerFooter />
      </div>
    </>
  );
}

export default SeditProfile;
