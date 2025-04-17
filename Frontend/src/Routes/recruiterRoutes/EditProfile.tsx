import { useEffect, useState } from "react";
import { RecHeader } from "../../components/recruiterComponents";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import PageTitle from "../../components/PageTitle";
import {
  employessOption,
  manageProfileOption,
  worktimeOption,
} from "../../utils/recruiterInto";
import { useRecruiter } from "../../contexts/RecruiterContext";
import { ICategoryry } from "../../utils/types";
import TextBox from "../../components/TextBox";
import SelectBox from "../../components/SelectBox";
import ManageProfileOption from "../../components/ManageProfileOption";
import ChangepasswordModel from "../../components/ChangePasswordModel";
import { BACKEND_URL } from "../../config";

function EditProfile() {
  const [categorydata, setCategorydata] = useState<ICategoryry[] | null>(null);
  const { recruiter, setRecruiter, accesstoken } = useRecruiter();
  const [inputdata, setInputdata] = useState(recruiter);
  const navigate = useNavigate();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "includes",
        Authorization: `Bearer ${accesstoken?.replace(/"/g, "")}`,
      },
    };

    const fetchcategory = async () => {
      const response = await fetch(`${BACKEND_URL}/industry`, requestOptions);
      const categoryres: { data: { _id: string; ind_name: string }[] } =
        await response.json();
      const category_list: ICategoryry[] = [];
      categoryres?.data?.map((item) => {
        category_list.push({ value: item._id, label: item.ind_name });
      });
      setCategorydata(category_list);
    };
    fetchcategory();
  }, [accesstoken]);

  const update1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputdata({
      ...inputdata,
      [e.target.name]:
        e.target.type == "file" ? e?.target?.files?.[0] : e.target.value,
    });
  };

  const update2 = ({ name, value }: { name: string; value: string }) => {
    setInputdata({ ...inputdata, [name]: value });
    console.log(inputdata);
  };

  // ***** profile updatre handler********
  const UpdateProfilecmp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confiOption = {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "includes",
        Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(inputdata),
    };
    const response = await fetch(`${BACKEND_URL}/createcmp`, confiOption);
    const result = await response.json();
    if (result.status === 200) {
      setRecruiter(inputdata);
      toast.success("profile update successfully");
      navigate("/payment");
    } else {
      toast.error("something wrong");
    }
  };

  const profilepic = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files?.[0]) {
      toast.error("Please select a file");
      return;
    }
    const selectedFile = event?.target?.files[0];
    const formdata = new FormData();
    formdata.append("cmp_logo", selectedFile);
    const configOption = {
      method: "PUT",
      headers: {
        credentials: "includes",
        Authorization: `Bearer ${accesstoken}`,
      },
      body: formdata,
    };
    const response = await fetch(`${BACKEND_URL}/cmpupdatelogo`, configOption);
    const result = await response.json();
    if (result.status === 201) {
      toast.success("Profile Picture Update");
      setRecruiter({ ...recruiter, cmp_logo: result?.cmp_logo });
      navigate("/manageprofile");
    } else {
      toast.error("Profile Picture not Update yet");
    }
  };

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const today = moment().add(-1, "d").format("YYYY-MM-DD");
  return (
    <>
      <div>
        <ChangepasswordModel
          open={open}
          onCloseModal={onCloseModal}
          user="recruiter"
          accesstoken={accesstoken}
        />
        <RecHeader />
        <>
          <PageTitle title="Edit Profile" page="Edit Profile" />
          {/* ======================= Start Create Company ===================== */}

          <section className="padd-top-80 padd-bot-80">
            <div className="container">
              <div className="row">
                <ManageProfileOption
                  option={manageProfileOption}
                  onOpenModal={onOpenModal}
                  profilepic={profilepic}
                  alt={inputdata?.cmp_name}
                  img={inputdata?.cmp_logo}
                  user="recruiter"
                  name={inputdata?.cmp_name}
                  active="Edit Profile"
                />
                <div className="col-md-9">
                  <div className="profile_detail_block">
                    <form
                      onSubmit={UpdateProfilecmp}
                      method="PUT"
                      className="log-form"
                    >
                      {/* General Information */}
                      <div className="box">
                        <div className="box-header">
                          <h4>General Information</h4>
                        </div>

                        <div className="box-body">
                          <div className="row">
                            <TextBox
                              label="Company Name"
                              onChange={update1}
                              value={inputdata?.cmp_name}
                              placeholder="Company Name"
                              name="cmp_name"
                            />

                            <TextBox
                              label="Owner Name"
                              onChange={update1}
                              value={inputdata?.cmp_owner}
                              placeholder="Owner Name"
                              name="cmp_owner"
                            />

                            <SelectBox
                              label="Category"
                              onChange={(e) => update2(e.target)}
                              data={categorydata}
                              selected={inputdata?.industry_cat}
                              name="industry_cat"
                            />

                            <div className="col-md-6 col-sm-6 col-xs-12">
                              <div className="form-group">
                                <label>Date Of Birth</label>
                                <input
                                  type="date"
                                  id="esta_date"
                                  name="esta_date"
                                  max={today}
                                  className="form-control"
                                  placeholder="YYYY/MM/DD"
                                  value={
                                    inputdata?.esta_date
                                      ? new Date(inputdata.esta_date)
                                          .toISOString()
                                          .split("T")[0]
                                      : new Date().toISOString().split("T")[0]
                                  }
                                  onChange={update1}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Company Address */}
                      <div className="box">
                        <div className="box-header">
                          <h4>Company Address</h4>
                        </div>

                        <div className="box-body">
                          <div className="row">
                            <TextBox
                              type="email"
                              label="Email"
                              onChange={update1}
                              value={inputdata?.cmp_email}
                              placeholder="Company Name"
                              name="cmp_email"
                            />

                            <TextBox
                              type="tele"
                              label="Phone Number"
                              onChange={update1}
                              value={inputdata?.rec_mno}
                              name="rec_mno"
                            />

                            <TextBox
                              label="Landline"
                              onChange={update1}
                              value={inputdata?.landline}
                              name="landline"
                            />

                            <TextBox
                              label="Address"
                              onChange={update1}
                              value={inputdata?.cmp_address}
                              name="cmp_address"
                            />

                            <TextBox
                              label="Zip Code"
                              onChange={update1}
                              value={inputdata?.zipcode}
                              name="cmp_zipcode"
                            />

                            <TextBox
                              label="State"
                              onChange={update1}
                              value={inputdata?.state}
                              name="state"
                            />

                            <TextBox
                              label="City"
                              onChange={update1}
                              value={inputdata?.city}
                              name="city"
                              placeholder="Enter Your City"
                            />

                            <SelectBox
                              label="Employees"
                              onChange={(e) => update2(e.target)}
                              data={employessOption}
                              selected={inputdata?.employess}
                              name="employess"
                            />

                            <SelectBox
                              label="Working Time"
                              onChange={(e) => update2(e.target)}
                              data={worktimeOption}
                              selected={inputdata?.worktime}
                              name="worktime"
                              full
                            />
                          </div>
                        </div>
                      </div>
                      {/* Social Accounts */}
                      <div className="box">
                        <div className="box-header">
                          <h4>Social Accounts</h4>
                        </div>
                        <div className="box-body">
                          <div className="row">
                            <TextBox
                              label="Website Link"
                              name="websitelink"
                              onChange={update1}
                              value={inputdata?.websitelink}
                            />
                            <TextBox
                              label="Google +"
                              name="google"
                              onChange={update1}
                              value={inputdata?.google}
                              placeholder="https://www.gmail.com/"
                            />
                            <TextBox
                              label="Twitter"
                              name="twitter"
                              onChange={update1}
                              value={inputdata?.twitter}
                              placeholder="https://twitter.com/"
                            />
                            <TextBox
                              label="LinkedIn"
                              name="linkdin"
                              onChange={update1}
                              value={inputdata?.linkdin}
                              placeholder="https://www.linkedin.com/"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="clearfix" />
                      <div className="col-md-6 padd-top-10 text-center">
                        {" "}
                        <button
                          type="button"
                          className="btn btn-m them-btn  full-width"
                          onClick={() => {
                            navigate("/manageprofile");
                          }}
                        >
                          Cancle
                        </button>
                      </div>
                      <div className="col-md-6 padd-top-10 text-center">
                        {" "}
                        <button
                          type="submit"
                          className="btn btn-m theme-btn full-width"
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
          {/* ====================== End Create Company ================ */}
        </>
        <Footer />
      </div>
    </>
  );
}
export default EditProfile;
