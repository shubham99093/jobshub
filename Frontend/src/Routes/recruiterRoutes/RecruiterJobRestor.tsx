import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Typewriter from "typewriter-effect";
import { RecFooter, RecHeader } from "../../components/recruiterComponents";
import moment from "moment";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Swal from "sweetalert2";
import { IJobPost } from "../../utils/types";
import { BACKEND_URL } from "../../config";
function RecruiterJobRestor() {
  const navigate = useNavigate();
  const [recruiterpost, setRecruiterpost] = useState<IJobPost[] | null>(null);
  const [del, setDel] = useState<{ _id: string } | null>(null);
  const [open, setOpen] = useState(false);

  const [accesstoken] = useState(localStorage.getItem("recruiterToken"));

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    calldata();
  }, []);

  const calldata = async () => {
    const configOption = {
      methodP: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const data = await fetch(`${BACKEND_URL}/trashgetOwnJobpost`, configOption);
    const result = await data.json();
    setRecruiterpost(result);
  };

  const delHandle = (item: string) => {
    setDel({
      _id: item,
    });
  };

  const deleteJobHandler = async () => {
    const configOption = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const data = await fetch(
      `${BACKEND_URL}/deletejobPost/${del?._id}`,
      configOption
    );
    const result = await data.json();
    if (result.status === 201) {
      toast.success("Your Application Delete");
      calldata();
    } else {
      toast.error("Your Posted Job Not Deleted");
    }
  };

  const restoreHandle = async (id: string) => {
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };

    const restore = await fetch(
      `${BACKEND_URL}/updaterestorejobpost/${id}`,
      config
    );
    const data = await restore.json();
    if (data.status === 201) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Your Job Post Restore",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/managejob");
    } else {
      toast.error("Please Try Again");
    }
  };

  return (
    <>
      <div>
        <>
          <RecHeader />
          <Modal open={open} onClose={onCloseModal} center>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                <h3>Are You Sure Want To Delete? </h3>
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

          {/* ======================= Page Title ===================== */}

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
                      typewriter
                        .typeString("Recruiter Job Post Restore")
                        .pauseFor(2000)
                        .start();
                    }}
                  />
                </h2>
                <p>
                  <Link to="/recruiterhome" title="Home">
                    Home
                  </Link>{" "}
                  <i className="ti-angle-double-right" />{" "}
                  <Link to="/manage" title="Home">
                    Recruiter Profile
                  </Link>{" "}
                  <i className="ti-angle-double-right" /> Recruiter Job Post
                  Restore
                </p>
              </div>
            </div>
          </div>
          {/* ======================= End Page Title ===================== */}

          {/* ======================== Manage Job ========================= */}
          <section className="utf_manage_jobs_area padd-top-80 padd-bot-80">
            <div className="container">
              <div className="table-responsive">
                <table className="table table-lg table-hover">
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Trashed Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recruiterpost?.map((item) => (
                      <tr>
                        <td>{item.jobtitle}</td>
                        <td>{moment(item.updatedAt).format("DD/MM/yyyy")}</td>
                        <td>
                          {/*<Link to={`updatejob/${item._id}`} className="cl-success mrg-5" > <i className="fa fa-edit" /> </Link>*/}
                          <button
                            className="cl-success mrg-5 fa fa-edit"
                            data-toggle="tooltip"
                            data-original-title="Update"
                            onClick={() => restoreHandle(item._id)}
                          ></button>
                          {/*<Link to="/seekerjobrestor" className="cl-danger mrg-5" data-toggle="tooltip" onClick={() => deleteJobHandler(item._id)} > <i className="fa fa-trash-o" /> </Link>*/}
                          <button
                            className="cl-danger mrg-5 fa fa-trash-o"
                            data-toggle="tooltip"
                            data-original-title="Delete"
                            onClick={() => {
                              onOpenModal();
                              delHandle(item._id);
                            }}
                          ></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/*<div className="utf_flexbox_area padd-10">
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
                                </div>*/}
              </div>
            </div>
          </section>
          {/* ====================== End Manage Company ======  ========== */}
        </>
        <RecFooter />
      </div>
    </>
  );
}

export default RecruiterJobRestor;
