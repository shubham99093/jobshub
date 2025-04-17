import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
const PageTitle = ({ title, page }: { title: string; page: string }) => (
  <div className="page-title">
    <div className="container">
      <div className="page-caption">
        <h2>
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter.typeString(title).pauseFor(2000).start();
            }}
          />
        </h2>
        <p>
          <Link to="/" title="Home">
            Home
          </Link>{" "}
          <i className="ti-angle-double-right" /> {page}
        </p>
      </div>
    </div>
  </div>
);

export default PageTitle;
