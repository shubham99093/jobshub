import { useState, useEffect } from "react";
import moment from "moment";
import { IExtendedJob } from "../../utils/types";
import { useSeeker } from "../../contexts/SeekerContext";
import { BACKEND_URL } from "../../config";
function Acceptjob() {
  const { accesstoken } = useSeeker();
  const [acceptedJob, setAcceptedJob] = useState<IExtendedJob[] | null>(null);

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
    const data = await fetch(`${BACKEND_URL}/jobhistoryaccept`, configOption);
    const result = await data.json();
    setAcceptedJob(result);
  };

  return (
    <>
      <div>
        <>
          {/* ======================= End Page Title ===================== */}

          <section className="utf_manage_jobs_area padd-top-80 padd-bot-80">
            <div className="container">
              <div className="table-responsive">
                <table className="table table-lg table-hover">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Accepted Date</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acceptedJob &&
                      acceptedJob.map((item) => (
                        <tr>
                          <td>
                            <i className="ti-user" />
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
                <div className="utf_flexbox_area padd-10">
                  <ul className="pagination">
                    <li className="page-item">
                      {" "}
                      <a className="page-link" href="#" aria-label="Previous">
                        {" "}
                        <span aria-hidden="true">«</span>{" "}
                        <span className="sr-only">Previous</span>{" "}
                      </a>{" "}
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      {" "}
                      <a className="page-link" href="#" aria-label="Next">
                        {" "}
                        <span aria-hidden="true">»</span>{" "}
                        <span className="sr-only">Next</span>{" "}
                      </a>{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      </div>
    </>
  );
}

export default Acceptjob;
