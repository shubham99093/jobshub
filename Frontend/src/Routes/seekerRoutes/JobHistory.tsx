import { SeekerHeader, SeekerFooter } from "../../components/seekerComponents";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pic from "../../../img/company_logo_1.png";
import moment from "moment";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import nodata from "../../../img/nodata.png";
import { useSeeker } from "../../contexts/SeekerContext";
import { IExtendedJob } from "../../utils/types";
import PageTitle from "../../components/PageTitle";

function JobHistory() {
  const navigate = useNavigate();
  const { accesstoken } = useSeeker();
  const [appliedJobs, setAppliedJobs] = useState<IExtendedJob[] | null>(null);
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState({
    _id: "",
  });

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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

    const data = await fetch("http://localhost:5000/jobhistory", configOption);

    const result = await data.json();
    setAppliedJobs(result);
  };

  const delHandle = (item: string) => {
    setDel({
      _id: item,
    });
  };

  const deleteJobHandler = async () => {
    const configOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const data = await fetch(
      `http://localhost:5000/jobbackup/${del?._id}`,
      configOption
    );
    const result = await data.json();
    if (result.status === 201) {
      toast.success("Your Application In Trash");
      callhistory();
      navigate("/seekerhome");
    }
  };
  return (
    <>
      <div>
        <>
          <SeekerHeader />
          <Modal open={open} onClose={onCloseModal} center>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <h3>Are You Sure Want To Trash? </h3>
              </span>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "0 10px 0 10px",
                }}
              >
                <span>
                  <button
                    className="btn btn-m theme-btn3"
                    onClick={() => {
                      deleteJobHandler();
                      onCloseModal();
                    }}
                  >
                    {" "}
                    <i className="glyphicon glyphicon-ok" />
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-m theme-btn2"
                    onClick={() => {
                      onCloseModal();
                    }}
                  >
                    {" "}
                    <i className=" ti-close" />
                  </button>
                </span>
              </div>
            </div>
          </Modal>

          <PageTitle title="Job History" page="Job History" />

          <section className="utf_manage_jobs_area padd-top-80 padd-bot-80">
            <div className="container">
              <div className="table-responsive">
                <table className="table table-lg table-hover">
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Applied Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {appliedJobs && appliedJobs.length > 0 ? (
                    <tbody>
                      {appliedJobs.map((item) => (
                        <tr>
                          <td>
                            <img
                              // src={`http://localhost:5000/public/uploads1/companylogo/${item?.rec_id?.cmp_logo}`}
                              src={
                                item?.rec_id?.cmp_logo
                                  ? `http://localhost:5000/public/uploads1/companylogo/${item?.rec_id?.cmp_logo}`
                                  : pic
                              }
                              className="avatar-lg"
                              alt="Avatar"
                            />
                            {item?.rec_id?.cmp_name}
                          </td>
                          <td>
                            {moment(item?.createdAt).format("DD/MM/YYYY")}
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
                          <td>
                            {item?.accept ? (
                              ""
                            ) : (
                              <Link
                                to="/jobhistory"
                                className="cl-danger mrg-5"
                                data-toggle="tooltip"
                                onClick={() => {
                                  onOpenModal();
                                  delHandle(item._id);
                                }}
                              >
                                <i className="fa fa-trash-o" />
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      <img src={nodata} style={{ width: "400px" }} />
                    </td>
                  )}
                </table>
                {appliedJobs && appliedJobs.length > 10 ? (
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
                ) : (
                  ""
                )}
              </div>
            </div>
          </section>
        </>
        <SeekerFooter />
      </div>
    </>
  );
}

export default JobHistory;
