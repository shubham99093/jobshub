import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* ================= footer start ========================= */}
      <div
        className="modal fade"
        id="signin"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" id="myModalLabel1">
            <div className="modal-body">
              {/* Nav tabs */}
              <ul className="nav nav-tabs nav-advance theme-bg" role="tablist">
                <li className="nav-item active">
                  {" "}
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#employer"
                    role="tab"
                  >
                    {" "}
                    <i className="ti-user" /> Job Seeker
                  </a>{" "}
                </li>
                <li className="nav-item">
                  {" "}
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#candidate"
                    role="tab"
                  >
                    {" "}
                    <i className="ti-user" /> Job Provider
                  </a>{" "}
                </li>
              </ul>
              {/* Nav tabs */}
              {/* Tab panels */}
              <div className="tab-content">
                {/* Employer Panel 1*/}
                <div
                  className="tab-pane fade in show active"
                  id="employer"
                  role="tabpanel"
                >
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      {" "}
                      <span className="custom-checkbox">
                        <input type="checkbox" id={"4"} />
                        <label htmlFor={"4"} />
                        Remember Me{" "}
                      </span>{" "}
                      <a href="#" title="Forget" className="fl-right">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="form-group text-center">
                      <button
                        type="button"
                        className="btn theme-btn full-width btn-m"
                      >
                        LogIn
                      </button>
                    </div>
                  </form>
                  <div className="log-option">
                    <span>OR</span>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      {" "}
                      <a href="#" title="" className="fb-log-btn log-btn">
                        <i className="fa fa-facebook" /> Facebook
                      </a>{" "}
                    </div>
                    <div className="col-md-6">
                      {" "}
                      <a href="#" title="" className="gplus-log-btn log-btn">
                        <i className="fa fa-google" /> Google
                      </a>{" "}
                    </div>
                  </div>
                </div>
                {/*/.Panel 1*/}
                {/* Candidate Panel 2*/}
                <div className="tab-pane fade" id="candidate" role="tabpanel">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                      {" "}
                      <span className="custom-checkbox">
                        <input type="checkbox" id={"44"} />
                        <label htmlFor={"44"} />
                        Remember Me{" "}
                      </span>{" "}
                      <a href="#" title="Forget" className="fl-right">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="form-group text-center">
                      <button
                        type="button"
                        className="btn theme-btn full-width btn-m"
                      >
                        LogIn
                      </button>
                    </div>
                  </form>
                  <div className="log-option">
                    <span>OR</span>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      {" "}
                      <a href="#" title="" className="fb-log-btn log-btn">
                        <i className="fa fa-facebook" /> Facebook
                      </a>{" "}
                    </div>
                    <div className="col-md-6">
                      {" "}
                      <a href="#" title="" className="gplus-log-btn log-btn">
                        <i className="fa fa-google" /> Google
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </div>
              {/* Tab panels */}
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <a href="index-2.html">
                <img
                  className="footer-logo"
                  src="assets/img/blwhole.png"
                  alt=""
                />
              </a>
              <p>
                Job'sHub is company which provide online platform for you if you
                need any job or you want to hire someone for your work.
              </p>
              {/* Social Box */}
            </div>

            <div className="col-md-3 col-sm-6">
              <h4>For JobRecruiters</h4>

              <ul>
                <li>
                  <i className="fa fa-angle-double-right" /> Search Job
                </li>
                <li>
                  <i className="fa fa-angle-double-right" /> Apply For Job
                </li>
                <li>
                  <i className="fa fa-angle-double-right" /> Manage Profile
                </li>

                <li>
                  <i className="fa fa-angle-double-right" /> Contact Us
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4>For JobSeekers</h4>
              <ul>
                <li>
                  <i className="fa fa-angle-double-right" /> Post Job
                </li>
                <li>
                  <i className="fa fa-angle-double-right" /> Manage Job
                </li>
                <li>
                  <i className="fa fa-angle-double-right" /> Subscription
                  Package
                </li>
                <li>
                  <i className="fa fa-angle-double-right" /> Report a Problem
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6">
              <h4>Get In Touch</h4>
              <div className="f-social-box">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook facebook-cl" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-google google-plus-cl" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter twitter-cl" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram instagram-cl" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="copyright text-center">
              <p>Copyright © 2023 All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      <div>
        <Link to="/" className="scrollup">
          Scroll
        </Link>
      </div>
    </>
  );
}

export default Footer;
