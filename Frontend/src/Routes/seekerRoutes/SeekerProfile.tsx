import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Load from "../../Load";
import { SeekerHeader, SeekerFooter } from "../../components/seekerComponents";
import "react-responsive-modal/styles.css";
import PageTitle from "../../components/PageTitle";
import { useSeeker } from "../../contexts/SeekerContext";
import ChangepasswordModel from "../../components/ChangePasswordModel";
import ManageProfileOption from "../../components/ManageProfileOption";
import { manageProfileOption } from "../../utils/seekerinto";

function SeekerProfile() {
  const { seeker, accesstoken } = useSeeker();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const deleteaccount = async () => {
    const configOPtion = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "includes",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const response = await fetch(
      "http://localhost:5000/sekdeleteaccount",
      configOPtion
    );
    const result = await response.json();
    if (result.status === 201) {
      toast.success("Your Account Deleted");
      localStorage.removeItem("seekerToken");
      navigate("/seekersignup");
    }
  };

  return (
    <>
      <div>
        <ChangepasswordModel
          open={open}
          onCloseModal={onCloseModal}
          user="seeker"
          accesstoken={accesstoken}
        />
        <SeekerHeader />
        <>
          <PageTitle title="Seeker Profile" page="Seeker Profile" />
          {/* ======================= Start Create Company ===================== */}
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
                  active="Seeker Profile"
                  deleteaccount={deleteaccount}
                />
                <div className="col-md-9">
                  <h3 className="background">
                    <span>User Profile</span>
                  </h3>
                  <div className="emp-des">
                    <h3>{seeker?.js_name}</h3>

                    <ul className="employer_detail_item">
                      <li>
                        <div className="col-md-4 col-sm-4 col-xs-12 detail_tag">
                          Email
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          {seeker?.js_email}
                        </div>
                      </li>
                      <li>
                        <div className="col-md-4 col-sm-4 col-xs-12 detail_tag">
                          Mob No.
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          {seeker?.js_mno}
                        </div>
                      </li>
                      <li>
                        <div className="col-md-4 col-sm-4 col-xs-12 detail_tag">
                          Address
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          {seeker?.js_address}
                        </div>
                      </li>
                      <li>
                        <div className="col-md-4 col-sm-4 col-xs-12 detail_tag">
                          Gender
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          {seeker?.js_gender}
                        </div>
                      </li>
                      <li>
                        <div className="col-md-4 col-sm-4 col-xs-12 detail_tag">
                          Language
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          {seeker?.js_language}
                        </div>
                      </li>

                      <li>
                        <div className="col-md-4 col-sm-4 col-xs-12 detail_tag">
                          Date of Birth
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          {seeker?.js_dob?.toString()}
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="emp-des">
                    <h3 className="background">
                      <span>Education</span>
                    </h3>
                    <ul className="employer_detail_item">
                      <li>
                        <div className="col-md-4 col-sm-4 col-xs-12 detail_tag">
                          University or School Name
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          {seeker?.uni_detail}
                        </div>
                      </li>

                      <li>
                        <div className="col-md-4 col-sm-4 col-xs-12 detail_tag">
                          Skills
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          {seeker?.js_skill}
                        </div>
                      </li>
                      <li>
                        <div className="col-md-4 col-sm-4 col-xs-12 detail_tag">
                          Education
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          {seeker?.js_quli}
                        </div>
                      </li>
                      <li>
                        <div className="col-md-4 col-sm-4 col-xs-12 detail_tag">
                          Learning Type
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                          {seeker?.js_course_type}
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="emp-des">
                    <h3 className="background">
                      <span>Experience</span>
                    </h3>
                    <div className="row">
                      <ul className="employer_detail_item">
                        <li>
                          <div className="col-md-4 col-sm-4 col-xs-12 detail_tag">
                            Years of Experience
                          </div>
                          <div className="col-md-4 col-sm-4 col-xs-12">
                            {seeker?.js_expierience}
                          </div>
                        </li>
                        <li>
                          <div className="col-md-4 col-sm-4 col-xs-12 detail_tag">
                            Last Company Name
                          </div>
                          <div className="col-md-4 col-sm-4 col-xs-12">
                            {seeker?.js_exp_company}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* ====================== End Create Company ================ */}
        </>
        <SeekerFooter />
        <Load />
      </div>
    </>
  );
}

export default SeekerProfile;
