import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
// import ReactStars from "react-rating-star-with-type";
import { toast } from "react-toastify";
import Load from "../../Load";
import { BACKEND_URL } from "../../config";

function RecFooter() {
  const [rating, setrating] = useState(0);
  const [accesstoken] = useState(localStorage.getItem("recruiterToken"));
  useEffect(() => {
    callreview();
  }, []);

  // const handlechange = (newrating: React.SetStateAction<number>) => {
  //   setrating(newrating);
  // };
  const [rev, setRev] = useState("");
  const inputHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRev(e.target.value);
  };

  const callreview = async () => {
    const config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "includes",
        Authorization: `Bearer ${accesstoken}`,
      },
    };

    const response = await fetch(`${BACKEND_URL}/getrecruiterreview`, config);
    const result = await response.json();
    if (result.status == 1) {
      setRev(result.review);
      setrating(Number.parseInt(result.ratingstar));
    } else {
      setRev("");
      setrating(0);
    }
  };
  const rate = async () => {
    const data = new FormData();
    data.append("ratingstars", rating.toString());
    data.append("review", rev);
    const r = { ratingstar: rating.toString(), review: rev };
    const config = {
      method: "put",
      headers: {
        Accept: "application/json",
        credentials: "includes",
        Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(r),
    };

    const response = await fetch(`${BACKEND_URL}/recruiterreview`, config);
    const result = await response.json();

    if (result.status === 201) {
      toast.success("Your Review ");
    } else {
      toast.error("Not");
    }
  };

  return (
    <>
      <Load />
      {/* ================= footer start ========================= */}
      <div
        className="modal fade"
        id="signin"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myModalLabel1"
        aria-hidden="true"
      ></div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-4">
              <Link to="/recruiterhome">
                <img
                  className="footer-logo"
                  src="assets/img/blwhole.png"
                  alt=""
                />
              </Link>
              <p>
                Job'sHub is company which provide online platform for you if you
                need any job or you want to hire someone for your work.
              </p>
              {/* Social Box */}
            </div>

            <div className="col-md-9 col-sm-8">
              <div className="row">
                <div className="col-md-3 col-sm-6">
                  <h4>Quick Links</h4>
                  <ul>
                    <li>
                      <Link to="/recruiterhome">
                        <i className="fa fa-angle-double-right" /> Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/addjob">
                        <i className="fa fa-angle-double-right" /> Add Job
                      </Link>
                    </li>
                    <li>
                      <Link to="/recruiterprofile">
                        <i className="fa fa-angle-double-right" /> Rectruiter
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/managejob">
                        <i className="fa fa-angle-double-right" /> Manage Job
                      </Link>
                    </li>
                    <li>
                      <Link to="/contactusr">
                        <i className="fa fa-angle-double-right" /> Contact us
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 col-sm-6">
                  <h4>Our Services</h4>

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
                      <i className="fa fa-angle-double-right" /> Report a
                      Problem
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
                <div className="col-md-3 col-sm-6">
                  <h4>Rate Us</h4>
                  {/* <ReactStars
                    count={5}
                    name="ratingstar"
                    onChange={handlechange}
                    value={rating}
                    size={35}
                    activeColor="#ffd700"
                    isHalf={true}
                    emptyIcon={<i className="fa fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                  /> */}

                  <div>
                    <br />

                    <textarea
                      className="form-control"
                      value={rev ? rev : ""}
                      placeholder="feedback"
                      onChange={(e) => inputHandle(e)}
                      name="review"
                      rows={2}
                      cols={5}
                    />
                  </div>
                  <br />
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-m theme-btn full-width"
                      onClick={() => rate()}
                    >
                      Rate Us
                    </button>
                  </div>
                </div>
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

export default RecFooter;
