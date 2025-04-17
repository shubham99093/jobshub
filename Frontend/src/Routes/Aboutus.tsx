function Aboutus() {
  return (
    <>
      <>
        <div id="overlayer" />
        <div className="loader">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="site-wrap">
          <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
              <div className="site-mobile-menu-close mt-3">
                <span className="icon-close2 js-menu-toggle" />
              </div>
            </div>
            <div className="site-mobile-menu-body" />
          </div>{" "}
          {/* .site-mobile-menu */}
          {/* NAVBAR */}
          {/* HOME */}
          <section
            className="section-hero overlay inner-page bg-image"
            style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
            id="home-section"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <h1 className="text-white font-weight-bold">About Us</h1>
                  <div className="custom-breadcrumbs">
                    <a href="#">Home</a> <span className="mx-2 slash">/</span>
                    <span className="text-white">
                      <strong>About Us</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className="py-5 bg-image overlay-primary fixed overlay"
            id="next-section"
            style={{ backgroundImage: 'url("images/hero_1.jpg")' }}
          >
            <div className="container">
              <div className="row mb-5 justify-content-center">
                <div className="col-md-7 text-center">
                  <h2 className="section-title mb-2 text-white">
                    JobBoard Site Stats
                  </h2>
                  <p className="lead text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Expedita unde officiis recusandae sequi excepturi corrupti.
                  </p>
                </div>
              </div>
              <div className="row pb-0 block__19738 section-counter">
                <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <strong className="number" data-number={1930}>
                      0
                    </strong>
                  </div>
                  <span className="caption">Candidates</span>
                </div>
                <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <strong className="number" data-number={54}>
                      0
                    </strong>
                  </div>
                  <span className="caption">Jobs Posted</span>
                </div>
                <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <strong className="number" data-number={120}>
                      0
                    </strong>
                  </div>
                  <span className="caption">Jobs Filled</span>
                </div>
                <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <strong className="number" data-number={550}>
                      0
                    </strong>
                  </div>
                  <span className="caption">Companies</span>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section pb-0">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <a
                    data-fancybox=""
                    data-ratio={2}
                    href="https://vimeo.com/317571768"
                    className="block__96788"
                  >
                    <span className="play-icon">
                      <span className="icon-play" />
                    </span>
                    <img
                      src="images/sq_img_6.jpg"
                      alt="Image"
                      className="img-fluid img-shadow"
                    />
                  </a>
                </div>
                <div className="col-lg-5 ml-auto">
                  <h2 className="section-title mb-3">
                    JobBoard For Freelancers, Web Developers
                  </h2>
                  <p className="lead">
                    Eveniet voluptatibus voluptates suscipit minima, cum
                    voluptatum ut dolor, sed facere corporis qui, ea quisquam
                    quis odit minus nulla vitae. Sit, voluptatem.
                  </p>
                  <p>
                    Ipsum harum assumenda in eum vel eveniet numquam, cumque
                    vero vitae enim cupiditate deserunt eligendi officia modi
                    consectetur. Expedita tempora quos nobis earum hic ex
                    asperiores quisquam optio nostrum sit!
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section pt-0">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0 order-md-2">
                  <a
                    data-fancybox=""
                    data-ratio={2}
                    href="https://vimeo.com/317571768"
                    className="block__96788"
                  >
                    <span className="play-icon">
                      <span className="icon-play" />
                    </span>
                    <img
                      src="images/sq_img_8.jpg"
                      alt="Image"
                      className="img-fluid img-shadow"
                    />
                  </a>
                </div>
                <div className="col-lg-5 mr-auto order-md-1  mb-5 mb-lg-0">
                  <h2 className="section-title mb-3">JobBoard For Workers</h2>
                  <p className="lead">
                    Eveniet voluptatibus voluptates suscipit minima, cum
                    voluptatum ut dolor, sed facere corporis qui, ea quisquam
                    quis odit minus nulla vitae. Sit, voluptatem.
                  </p>
                  <p>
                    Ipsum harum assumenda in eum vel eveniet numquam, cumque
                    vero vitae enim cupiditate deserunt eligendi officia modi
                    consectetur. Expedita tempora quos nobis earum hic ex
                    asperiores quisquam optio nostrum sit!
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section">
            <div className="container">
              <div className="row mb-5">
                <div className="col-12 text-center" data-aos="fade">
                  <h2 className="section-title mb-3">Our Team</h2>
                </div>
              </div>
              <div className="row align-items-center block__69944">
                <div className="col-md-6">
                  <img
                    src="images/person_6.jpg"
                    alt="Image"
                    className="img-fluid mb-4 rounded"
                  />
                </div>
                <div className="col-md-6">
                  <h3>Elisabeth Smith</h3>
                  <p className="text-muted">Creative Director</p>
                  <p>
                    Soluta quasi cum delectus eum facilis recusandae nesciunt
                    molestias accusantium libero dolores repellat id in dolorem
                    laborum ad modi qui at quas dolorum voluptatem voluptatum
                    repudiandae voluptatibus ut? Ex vel ad explicabo iure ipsa
                    possimus consectetur neque rem molestiae eligendi velit?.
                  </p>
                  <div className="social mt-4">
                    <a href="#">
                      <span className="icon-facebook" />
                    </a>
                    <a href="#">
                      <span className="icon-twitter" />
                    </a>
                    <a href="#">
                      <span className="icon-instagram" />
                    </a>
                    <a href="#">
                      <span className="icon-linkedin" />
                    </a>
                  </div>
                </div>
                <div className="col-md-6 order-md-2 ml-md-auto">
                  <img
                    src="images/person_5.jpg"
                    alt="Image"
                    className="img-fluid mb-4 rounded"
                  />
                </div>
                <div className="col-md-6">
                  <h3>Chintan Patel</h3>
                  <p className="text-muted">Creative Director</p>
                  <p>
                    Soluta quasi cum delectus eum facilis recusandae nesciunt
                    molestias accusantium libero dolores repellat id in dolorem
                    laborum ad modi qui at quas dolorum voluptatem voluptatum
                    repudiandae voluptatibus ut? Ex vel ad explicabo iure ipsa
                    possimus consectetur neque rem molestiae eligendi velit?.
                  </p>
                  <div className="social mt-4">
                    <a href="#">
                      <span className="icon-facebook" />
                    </a>
                    <a href="#">
                      <span className="icon-twitter" />
                    </a>
                    <a href="#">
                      <span className="icon-instagram" />
                    </a>
                    <a href="#">
                      <span className="icon-linkedin" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="site-footer">
            <a href="#top" className="smoothscroll scroll-top">
              <span className="icon-keyboard_arrow_up" />
            </a>
            <div className="container">
              <div className="row mb-5">
                <div className="col-6 col-md-3 mb-4 mb-md-0">
                  <h3>Search Trending</h3>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Web Design</a>
                    </li>
                    <li>
                      <a href="#">Graphic Design</a>
                    </li>
                    <li>
                      <a href="#">Web Developers</a>
                    </li>
                    <li>
                      <a href="#">Python</a>
                    </li>
                    <li>
                      <a href="#">HTML5</a>
                    </li>
                    <li>
                      <a href="#">CSS3</a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 col-md-3 mb-4 mb-md-0">
                  <h3>Company</h3>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Career</a>
                    </li>
                    <li>
                      <a href="#">Blog</a>
                    </li>
                    <li>
                      <a href="#">Resources</a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 col-md-3 mb-4 mb-md-0">
                  <h3>Support</h3>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Support</a>
                    </li>
                    <li>
                      <a href="#">Privacy</a>
                    </li>
                    <li>
                      <a href="#">Terms of Service</a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 col-md-3 mb-4 mb-md-0">
                  <h3>Contact Us</h3>
                  <div className="footer-social">
                    <a href="#">
                      <span className="icon-facebook" />
                    </a>
                    <a href="#">
                      <span className="icon-twitter" />
                    </a>
                    <a href="#">
                      <span className="icon-instagram" />
                    </a>
                    <a href="#">
                      <span className="icon-linkedin" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="row text-center">
                <div className="col-12">
                  <p className="copyright">
                    <small>
                      {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                      Copyright © All rights reserved | This template is made
                      with{" "}
                      <i
                        className="icon-heart text-danger"
                        aria-hidden="true"
                      />{" "}
                      by{" "}
                      <a href="https://colorlib.com" target="_blank">
                        Colorlib
                      </a>
                      {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
        {/* SCRIPTS */}
      </>
    </>
  );
}

export default Aboutus;
