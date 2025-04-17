import { RecHeader, RecFooter } from "../../components/recruiterComponents";
import "react-responsive-modal/styles.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import Load from "../../Load";
import { useRecruiter } from "../../contexts/RecruiterContext";
import PageTitle from "../../components/PageTitle";
import DetailItem from "../../components/DetailItem";
import ManageProfileOption from "../../components/ManageProfileOption";
import { manageProfileOption } from "../../utils/recruiterInto";
import ChangepasswordModel from "../../components/ChangePasswordModel";

function ManageProfile() {
  const navigate = useNavigate();
  const { recruiter, accesstoken } = useRecruiter();

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
      "http://localhost:5000/recdeleteaccount",
      configOPtion
    );
    const result = await response.json();
    if (result.status === 201) {
      toast.success("Your Account Deleted");
      localStorage.removeItem("recruiterToken");
      navigate("/recruitersignup");
    }
  };

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <>
      <div>
        <>
          <ChangepasswordModel
            open={open}
            onCloseModal={onCloseModal}
            user="recruiter"
            accesstoken={accesstoken}
          />
          <Load />
          <RecHeader />
          <>
            <PageTitle title="Recruiter Profile" page="Company Profile" />
            {/* ======================= Start Create Company ===================== */}
            <section className="padd-top-80 padd-bot-80">
              <div className="container">
                <div className="row">
                  <ManageProfileOption
                    option={manageProfileOption}
                    onOpenModal={onOpenModal}
                    alt={recruiter?.cmp_name}
                    img={recruiter?.cmp_logo}
                    user="recruiter"
                    name={recruiter?.cmp_name}
                    active="Profile"
                    deleteaccount={deleteaccount}
                  />

                  <div className="col-md-9">
                    <div className="emp-des">
                      <h3 className="background">
                        <span>Company Details</span>
                      </h3>
                      <h3>{recruiter?.cmp_name}</h3>

                      <ul className="employer_detail_item">
                        <DetailItem
                          label="Company Email"
                          value={recruiter?.cmp_email}
                        />
                        <DetailItem
                          label="Company's Owner Name"
                          value={recruiter?.cmp_owner}
                        />
                        <DetailItem
                          label="Establishmet Date"
                          value={moment(recruiter?.esta_date).format(
                            "DD/MM/YYYY"
                          )}
                        />
                        <DetailItem
                          label="Owner Email"
                          value={recruiter?.cmp_email}
                        />
                      </ul>
                    </div>

                    <div className="emp-des">
                      <ul className="employer_detail_item">
                        <h3 className="background">
                          <span>Company Contact</span>
                        </h3>
                        <DetailItem
                          label="Company Contact No"
                          value={recruiter?.rec_mno?.toString()}
                        />
                        <DetailItem
                          label="Company Address"
                          value={`${
                            recruiter?.cmp_address
                              ? `${recruiter?.cmp_address} ,`
                              : ""
                          } ${recruiter?.city ? `${recruiter?.city} -` : ""} ${
                            recruiter?.zipcode ? `${recruiter?.zipcode} ,` : ""
                          } ${recruiter?.state ? `${recruiter?.state} ` : ""} ${
                            recruiter?.country ? `${recruiter?.country} ,` : ""
                          }`}
                        />
                        <DetailItem
                          label="Company's Landline No."
                          value={recruiter?.landline}
                        />
                        <DetailItem
                          label="Company Websitelink."
                          value={recruiter?.websitelink}
                        />
                        <DetailItem
                          label="No. Of Emplooyees"
                          value={recruiter?.employess?.toString()}
                        />
                        <DetailItem
                          label="Company Hour's"
                          value={recruiter?.worktime}
                        />
                      </ul>
                    </div>

                    <div className="emp-des">
                      <ul className="employer_detail_item">
                        <h3 className="background">
                          <span>Company on Social Media</span>
                        </h3>
                        <DetailItem
                          label="Google Account"
                          value={recruiter?.google}
                        />
                        <DetailItem
                          label="Twitter Account"
                          value={recruiter?.twitter}
                        />
                        <DetailItem
                          label="Linkdin Account"
                          value={recruiter?.linkdin}
                        />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* ====================== End Create Company ================ */}
          </>
          <RecFooter />
        </>
      </div>
    </>
  );
}

export default ManageProfile;
