import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Load from "../Load";
import Loader from "../components/Loader";
import creaters from "../utils/creaters";
import useIndustries from "../hooks/useIndustries";
import IndustryCards from "../components/IndustryCards";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { industries } = useIndustries();

  useEffect(() => {
    // simulate an API call with a delay of 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <>
            <Header />
            {/* ======================= Start Banner ===================== */}
            <div
              className="utf_main_banner_area"
              style={{ backgroundImage: "url(assets/img/jobbg2.jpeg)" }}
              data-overlay={8}
            >
              <div className="container">
                <div className="col-md-8 col-sm-10">
                  <div className="caption cl-white home_two_slid">
                    <h2>
                      Join The Workforce{" "}
                      <span className="theme-cl">Revolution</span>{" "}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            {/* ======================= End Banner ===================== */}
            {/* ================= Category start ========================= */}
            {industries?.length && (
              <section className="padd-top-80 padd-bot-60">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                      <div className="heading">
                        <h2>Following Industry Available</h2>
                      </div>
                    </div>
                    <div className="col-md-12">
                      {industries?.map((item) => (
                        <IndustryCards item={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ================= footer start ========================= */}

            {/* Signup Code */}
            <>
              <div
                className="container"
                style={{
                  height: 150,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2>Our Teams </h2>
              </div>
              <div className="container">
                <div className="row">
                  {creaters?.map((item) => {
                    return (
                      <div
                        className="col-12 col-sm-6 col-md-4 col-lg-4"
                        key={item.id}
                      >
                        <div className="our-team">
                          <div className="picture">
                            <img className="img-fluid" src={item.img} />
                          </div>
                          <div className="team-content">
                            <h3 className="name">{item.name}</h3>
                            <h4 className="title">{item.title}</h4>
                          </div>
                          <ul className="social">
                            <li>
                              <a
                                href={item.linkedin}
                                className="fa fa-linkedin"
                                aria-hidden="true"
                              />
                            </li>
                            <li>
                              <a
                                href={item.github}
                                className="fa fa-github"
                                aria-hidden="true"
                              />
                            </li>

                            <li>
                              <a
                                href={item.github}
                                className="fa fa-instagram"
                                aria-hidden="true"
                              />
                            </li>
                            <li>
                              <a
                                href={item.facebook}
                                className="fa fa-facebook"
                                aria-hidden="true"
                              />
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
            <Footer />
            <Load />
          </>
        </div>
      )}
    </>
  );
}

export default Home;
