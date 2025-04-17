import { Link } from "react-router-dom";
import Load from "../Load";
function Header() {
  return (
    <>
      {/* ======================= Start Navigation ===================== */}
      <nav className="navbar navbar-default navbar-mobile navbar-fixed white bootsnav on no-background">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbar-menu"
            >
              {" "}
              <i className="fa fa-bars" />{" "}
            </button>
            <a className="navbar-brand" href="index-2.html">
              {" "}
              <img
                src="assets/img/whwhole.png"
                className="logo logo-display"
                alt=""
              />{" "}
              <img
                src="assets/img/blwhole.png"
                className="logo logo-scrolled"
                alt=""
              />{" "}
            </a>
          </div>
          <div className="collapse navbar-collapse" id="navbar-menu">
            <ul className="nav navbar-nav navbar-right">
              <li className="br-right">
                <Link className="btn-signup red-btn" to="/recruitersignup">
                  <i className="login-icon ti-briefcase"></i>I am Recruiter
                </Link>
              </li>
              <li className="sign-up">
                <Link className="btn-signup red-btn" to="/seekersignup">
                  <span className="login-icon ti-user"></span> &nbsp; I am
                  Seeker
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* ======================= End Navigation ===================== */}
      {/* Signup Code */}
      <Load />
    </>
  );
}

export default Header;
