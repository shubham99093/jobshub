import { useState, useEffect } from "react";
import moment from "moment";
import { IExtendedJob } from "../../utils/types";
import { useSeeker } from "../../contexts/SeekerContext";
import { BACKEND_URL } from "../../config";
function RejectJob() {
  const { accesstoken } = useSeeker();
  const [rejectedJobs, setRejectedJobs] = useState<IExtendedJob[] | null>(null);

  useEffect(() => {
    callhistory();
  }, []);

  const callhistory = async () => {
    const configOption = {
      methodP: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const data = await fetch(`${BACKEND_URL}/jobhistoryreject`, configOption);
    const result = await data.json();
    setRejectedJobs(result);
  };

  return (
    <>
      <div>
        <>
          {/* ======================= Start Page Title ===================== */}
          {/* <div className="page-title">
                    <div className="container">
                        <div className="page-caption">
                            <h2><Typewriter
                                options={{
                                    autoStart: true,
                                    loop: true,
                                }}
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString("Job History")
                                        .pauseFor(2000)
                                        .start()
                                }}

                            /></h2>
                            <p>
                                <a href="#" title="Home">
                                    Home
                                </a>{" "}
                                <i className="ti-angle-double-right" /> Job History
                            </p>
                        </div>
                    </div>
                </div>*/}
          {/* ======================= End Page Title ===================== */}

          <section className="utf_manage_jobs_area padd-top-80 padd-bot-80">
            <div className="container">
              <div className="table-responsive">
                <table className="table table-lg table-hover">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Reject Date</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectedJobs &&
                      rejectedJobs.map((item) => (
                        <tr>
                          <td>
                            <i className="ti-credit-card" />
                            {item?.rec_id?.cmp_name}
                          </td>
                          <td>
                            {moment(item?.rec_id?.createdAt).format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                          <td>
                            {item?.accept === 1 ? (
                              <div>
                                {" "}
                                <p style={{ color: "#0fb76b" }}>Accepted</p>
                              </div>
                            ) : item?.accept === 2 ? (
                              <div>
                                {/* <p style={{ color: "green" }}>Accepted</p> */}
                                <p style={{ color: "red" }}>Rejected</p>
                              </div>
                            ) : item?.accept === 0 ? (
                              <div>
                                <p style={{ color: "blue" }}>Pending</p>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      </div>
    </>
  );
}

export default RejectJob;
