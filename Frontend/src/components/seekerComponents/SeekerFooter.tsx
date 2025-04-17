import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
// import ReactStars from 'react-stars'
import Load from "../../Load";
// import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";

function SeekerFooter() {
  useEffect(() => {
    callreview();
  }, []);

  const [rating, setrating] = useState(0);
  const [accesstoken] = useState(localStorage.getItem("seekerToken"));
  const [rev, setRev] = useState("");

  //   const handlechange = (newrating) => {
  //     setrating(newrating);
  //   };

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

    const response = await fetch(
      "http://localhost:5000/getseekerreview",
      config
    );
    const result = await response.json();

    setRev(result.review);
    setrating(result.ratingstar);
  };
  const rate = async () => {
    const data = new FormData();
    data.append("ratingstars", rating.toString());
    data.append("review", rev);
    const r = { ratingstar: rating, review: rev };
    const config = {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: "includes",
        Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(r),
    };

    const response = await fetch("http://localhost:5000/seekerreview", config);
    const result = await response.json();

    if (result.status === 201) {
      toast.success("Review Post ");
    } else {
      toast.error("Review is not Psot");
    }
  };

  return (
    <>
      <Load />
      {/* ================= footer start ========================= */}

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-4">
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

            <div className="col-md-9 col-sm-8">
              <div className="row">
                <div className="col-md-3 col-sm-6">
                  <h4>Quick Links</h4>
                  <ul>
                    <li>
                      <Link to="/seekerhome">
                        <i className="fa fa-angle-double-right" /> Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/searchjob">
                        <i className="fa fa-angle-double-right" /> Search Job
                      </Link>
                    </li>
                    <li>
                      <Link to="/seekerprofile">
                        <i className="fa fa-angle-double-right" /> Seeker
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/resumedetail">
                        <i className="fa fa-angle-double-right" /> Resume Detail
                      </Link>
                    </li>
                    <li>
                      <Link to="/contactuss">
                        <i className="fa fa-angle-double-right" /> Contact us
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 col-sm-6">
                  <h4>Our Services</h4>

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
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                  /> */}
                  <div>
                    <br />
                    <textarea
                      className="form-control"
                      placeholder="feedback"
                      onChange={inputHandle}
                      value={rev}
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

export default SeekerFooter;
