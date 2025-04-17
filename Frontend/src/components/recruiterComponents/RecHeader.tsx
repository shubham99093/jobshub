import { Link } from "react-router-dom";
import Load from "../../Load";
import { navbarMenu } from "../../utils/recruiterInto";

function RecHeader() {
  return (
    <>
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
            <Link className="navbar-brand" to="/recruiterhome">
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
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="navbar-menu">
            <ul
              className="nav navbar-nav navbar-center"
              data-in="fadeInDown"
              data-out="fadeOutUp"
            >
              {navbarMenu?.map((item, index) => (
                <li className="dropdown" key={index}>
                  {" "}
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <Load />
    </>
  );
}

export default RecHeader;
