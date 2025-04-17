import { Link, useNavigate } from "react-router-dom";
import avtar from "../../img/loginpic.png";
import { useRecruiter } from "../contexts/RecruiterContext";
import { useSeeker } from "../contexts/SeekerContext";

interface IManageProfileOption {
  option: { title: string; to: string; icon: string }[];
  onOpenModal: () => void;
  profilepic?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  alt: string | undefined;
  img: string | undefined;
  user: "recruiter" | "seeker";
  name: string | undefined;
  active: string;
  deleteaccount?: () => void;
}

const ManageProfileOption = ({
  option,
  onOpenModal,
  profilepic,
  alt,
  img,
  user,
  name,
  active,
  deleteaccount,
}: IManageProfileOption) => {
  const navigate = useNavigate();
  const { setRecruiter, setAccesstoken: setRecruiterAccesstoken } =
    useRecruiter();
  const { setSeeker, setAccesstoken: setSeekerAccesstoken } = useSeeker();

  const mystyle = { cursor: "pointer", fontSize: "3rem" };

  const logout = async () => {
    localStorage.removeItem("recruiterToken");
    if (user === "recruiter") {
      setRecruiterAccesstoken(null);
      setRecruiter(null);
    }
    if (user === "seeker") {
      setSeekerAccesstoken(null);
      setSeeker(null);
    }
    navigate(`/${user}login`);
  };

  return (
    <div className="col-md-3">
      <div id="leftcol_item">
        <div className="user_dashboard_pic">
          <label
            htmlFor="file"
            style={active === "Edit Profile" ? mystyle : {}}
          >
            {" "}
            <img
              src={`http://localhost:5000/public/uploads1/${
                user === "recruiter" ? "companylogo" : "seekerprofile"
              }/${img ? img : "default.jpg"}`}
              alt={alt}
            />{" "}
          </label>
          {active === "Edit Profile" && (
            <input
              type="file"
              id="file"
              name={name}
              style={{ display: "none" }}
              onChange={profilepic ? profilepic : undefined}
            />
          )}
        </div>
      </div>
      <div className="dashboard_nav_item">
        <ul>
          {option?.map((item) => (
            <li className={`${active === item.title ? "active" : ""}`}>
              <Link to={item.to}>
                <i className={`login-icon ${item.icon}`} /> {item.title}
              </Link>
            </li>
          ))}
          <li>
            <label htmlFor="chpass">
              <i className="login-icon ti-key" /> Change Password
            </label>

            <button
              onClick={onOpenModal}
              style={{ display: "none" }}
              id="chpass"
            ></button>
          </li>
          <button className="btn btn-primary btn-lg" onClick={logout}>
            <i className="login-icon ti-power-off" /> Logout
          </button>
          {(active === "Profile" || active === "Seeker Profile") && (
            <button className="btn btn-danger btn-lg" onClick={deleteaccount}>
              <i className=" ti-trash" /> Delete Account
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};
export default ManageProfileOption;
