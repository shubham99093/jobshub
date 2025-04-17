import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import PageTitle from "../../components/PageTitle";
import { BACKEND_URL } from "../../config";

function Recruitersendmail() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState({});
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    // simulate an API call with a delay of 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  const send = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res = await fetch(`${BACKEND_URL}/recmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
    const data = await res.json();
    if (data.status === 401 || !data) {
      window.alert("error");
    } else {
      setEmail("");
      setMsg(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <>
            <PageTitle title="Forgot Password" page="Send Mail" />
            {/* ================ Change Password ======================= */}
            {/**/}{" "}
            <section className="padd-top-80 padd-bot-80">
              <div className="container">
                <div className="row">
                  <div
                    className="col-md-12 col-sm-12 col-xs-12"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div
                      className="profile_detail_block"
                      style={{ width: "50%" }}
                    >
                      {msg ? (
                        <p style={{ color: "green", fontWeight: "bold" }}>
                          Password reset Link Send Successfully in Your Email
                        </p>
                      ) : (
                        ""
                      )}
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label>Send Email</label>
                          <input
                            type="text"
                            name="cmp_email"
                            className="form-control"
                            onChange={handle}
                            placeholder="Email Id"
                          />
                        </div>
                      </div>

                      <div className="clearfix" />
                      <div className="col-md-12 padd-top-10 text-center">
                        {" "}
                        <a
                          className="btn btn-m theme-btn full-width"
                          onClick={send}
                        >
                          Send Link
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <></>
          </>
        </div>
      )}
    </>
  );
}

export default Recruitersendmail;
